
export class Parser {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
    }

    parse(selector) {
        this.tokenizer.setSelector(selector);

        const len = this.tokenizer.context.selector.length;
        const entries = [];

        while (this.tokenizer.context.pos < len) {
            entries.push(this.parseIdentifierWithAccessor());
        }

        return { type: 'selection', entries };
    }

    parseIdentifierWithAccessor() {
        const accessor = this.tokenizer.nextToken();

        if (accessor.type === 'property' || accessor.type === 'method') {
            this.tokenizer.consumeToken();
            return this.parseIdentifier(accessor);
        } else if (accessor.type === 'identifier') {
            return this.parseIdentifier({ type: 'property', start: accessor.start, end: accessor.start });
        }

        this.raiseException(accessor);
    }

    parseIdentifier(accessor) {
        const identifier = this.tokenizer.consumeToken();

        if (identifier.type === 'identifier') {
            const modifier = this.parseModifier();
            return {
                type: accessor.type,
                value: identifier.value,
                modifier,
                start: accessor.start,
                end: modifier ? modifier.end : identifier.end
            };
        }

        this.raiseException(identifier);
    }

    parseModifier() {
        const modifierStart = this.tokenizer.nextToken();

        if (modifierStart.type === 'bracket-start') {
            const modifierEnd = this.tokenizer.consumeAndNextToken();

            if (modifierEnd.type === 'bracket-end') {
                this.tokenizer.consumeToken();
                return { type: 'flat-map-modifier' };
            }

            this.raiseException(modifierEnd);
        }

        return null;
    }

    raiseException(token) {
        const tokenStr = this.tokenizer.context.selector.substring(token.start, token.end);
        throw new Error(`Unexpected token "${tokenStr}" at position "${token.start}"`);
    }
}