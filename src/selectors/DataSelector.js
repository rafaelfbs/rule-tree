
export class DataSelector {
    select(data, selector) {
        if (!selector) return data;

        const context = { pos: 0, selector };
        const node = this.parseSelection(context);

        return node.entries.reduce((data, entry) => {
            if (entry.type === 'property') return this.selectProperty(data, entry, selector);
            if (entry.type === 'method') return this.selectMethod(data, entry, selector);
            throw new SyntaxError(`Wrong selector syntax in "${selector.substring(entry.start, entry.end)}"`);
        }, data);
    }

    selectProperty(data, entry, selector) {
        if (entry.modifier && entry.modifier.type === 'flat-map-modifier') {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${selector.substring(entry.start, entry.end)})`);
            }

            return this.reduceData(data, entry, selector, this.getProperty.bind(this));
        }

        return this.getProperty(data, entry, selector);
    }

    getProperty(data, entry, selector) {
        const { value: path } = entry;

        if (path in data) {
            return data[path];
        }

        throw new SyntaxError(`No property "${path}" in data (${selector.substring(entry.start, entry.end)})`);
    }

    selectMethod(data, entry, selector) {
        if (entry.modifier && entry.modifier.type === 'flat-map-modifier') {
            if (!Array.isArray(data)) {
                throw new SyntaxError(`Data is not an array for flat map property (${selector.substring(entry.start, entry.end)})`);
            }

            return this.reduceData(data, entry, selector, this.getMethod.bind(this));
        }

        return this.getMethod(data, entry, selector);
    }

    getMethod(data, entry, selector) {
        const { value: path } = entry;

        if (path in data) {
            if (typeof data[path] === 'function') {
                return data[path]();
            }

            throw new SyntaxError(`Property "${path}" is not a function (${selector.substring(entry.start, entry.end)})`);
        }

        throw new SyntaxError(`No method "${path}" in data (${selector.substring(entry.start, entry.end)})`);
    }

    reduceData(data, entry, selector, reducer) {
        return data.reduce((arr, item) => arr.concat(reducer(item, entry, selector)), []);
    }

    parseSelection(context) {
        const len = context.selector.length;
        const entries = [];

        while (context.pos < len) {
            entries.push(this.parseIdentifierWithAccessor(context));
        }

        return { type: 'selection', entries };
    }

    parseIdentifierWithAccessor(context) {
        const accessor = this.nextToken(context);

        if (accessor.type === 'property' || accessor.type === 'method') {
            this.consumeToken(context);
            return this.parseIdentifier(context, accessor);
        } else if (accessor.type === 'identifier') {
            return this.parseIdentifier(context, { type: 'property', start: accessor.start, end: accessor.start });
        }

        this.raiseException(context, accessor.start);
    }

    parseIdentifier(context, accessor) {
        const identifier = this.consumeToken(context);

        if (identifier.type === 'identifier') {
            const modifier = this.parseModifier(context);
            return {
                type: accessor.type,
                value: identifier.value,
                modifier,
                start: accessor.start,
                end: modifier ? modifier.end : identifier.end
            };
        }

        this.raiseException(context, identifier.start);
    }

    parseModifier(context) {
        const modifierStart = this.nextToken(context);

        if (modifierStart.type === 'bracket-start') {
            const modifierEnd = this.consumeAndNextToken(context);

            if (modifierEnd.type === 'bracket-end') {
                this.consumeToken(context);
                return { type: 'flat-map-modifier' };
            }

            this.raiseException(context, modifierEnd.start);
        }

        return null;
    }

    raiseException(context, position) {
        throw new Error(`Unexpected token "${context.selector.charAt(position)}" at position "${position}"`);
    }

    isIdentifierChar(char) {
        return (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            (char >= '0' && char <= '9');
    }

    consumeToken(context) {
        const token = this.nextToken(context);
        context.pos = token.end;
        return token;
    }

    nextToken(context) {
        const { pos, selector } = context;

        return pos < selector.length
            ? this.parseToken(context, selector.charAt(pos))
            : { type: 'eof', start: pos, end: pos };
    }

    consumeAndNextToken(context) {
        this.consumeToken(context);
        return this.nextToken(context);
    }

    parseToken(context, char) {
        switch (char) {
            case '.': return { type: 'property', start: context.pos, end: context.pos + 1 };
            case '#': return { type: 'method', start: context.pos, end: context.pos + 1 };
            case '[': return { type: 'bracket-start', start: context.pos, end: context.pos + 1 };
            case ']': return { type: 'bracket-end', start: context.pos, end: context.pos + 1 };
            default:
                if (this.isIdentifierChar(char)) return this.parseIdentifierToken(context);
                throw new Error(`Unexpected token "${char}" at position "${context.pos}"`);
        }
    }

    parseIdentifierToken(context) {
        let pos = context.pos;
        let selector = context.selector;
        let len = selector.length;

        while (pos < len) {
            const char = selector.charAt(pos);

            if (!this.isIdentifierChar(char)) {
                break;
            }

            pos++;
        }

        return {
            type: 'identifier',
            value: context.selector.substring(context.pos, pos),
            start: context.pos,
            end: pos
        };
    }
}
