
export class Tokenizer {
    setSelector(selector) {
        this.context = { pos: 0, selector };
    }

    consumeToken() {
        const token = this.nextToken();
        this.context.pos = token.end;
        return token;
    }

    nextToken() {
        const { pos, selector } = this.context;

        return pos < selector.length
            ? this.parseToken(selector.charAt(pos))
            : { type: 'eof', start: pos, end: pos };
    }

    consumeAndNextToken() {
        this.consumeToken();
        return this.nextToken();
    }

    parseToken(char) {
        switch (char) {
            case '.': return { type: 'property', start: this.context.pos, end: this.context.pos + 1 };
            case '#': return { type: 'method', start: this.context.pos, end: this.context.pos + 1 };
            case '[': return { type: 'bracket-start', start: this.context.pos, end: this.context.pos + 1 };
            case ']': return { type: 'bracket-end', start: this.context.pos, end: this.context.pos + 1 };
            default:
                if (this.isIdentifierChar(char)) return this.parseIdentifierToken();
                this.raiseException(char, this.context.pos);
        }
    }

    parseIdentifierToken() {
        let pos = this.context.pos;
        let selector = this.context.selector;
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
            value: this.context.selector.substring(this.context.pos, pos),
            start: this.context.pos,
            end: pos
        };
    }

    isIdentifierChar(char) {
        return (char >= 'a' && char <= 'z') ||
            (char >= 'A' && char <= 'Z') ||
            (char >= '0' && char <= '9');
    }

    raiseException(char, position) {
        throw new Error(`Unexpected token "${char}" at position "${position}"`);
    }
}