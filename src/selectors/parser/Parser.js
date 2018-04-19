import { TokenizerContext } from "../tokenizer/TokenizerContext";

export class Parser {
    constructor(tokenizer) {
        this.tokenizer = tokenizer;
    }

    parse(selector) {
        const context = new TokenizerContext(selector);

        const len = selector.length;
        const entries = [];

        while (context.pos < len) {
            entries.push(this.parseIdentifierWithAccessor(context));
        }

        return { type: 'selection', entries };
    }

    parseIdentifierWithAccessor(context) {
        const accessor = this.tokenizer.nextToken(context);

        if (accessor.type === 'property' || accessor.type === 'method') {
            this.tokenizer.consumeToken(context);
            return this.parseIdentifier(context, accessor);
        } else if (accessor.type === 'identifier') {
            return this.parseIdentifier(context, { type: 'property', start: accessor.start, end: accessor.start });
        }

        this.raiseException(accessor);
    }

    parseIdentifier(context, accessor) {
        const identifier = this.tokenizer.consumeToken(context);

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

        this.raiseException(identifier);
    }

    parseModifier(context) {
        const modifierStart = this.tokenizer.nextToken(context);

        if (modifierStart.type === 'bracket-start') {
            const modifierEnd = this.tokenizer.consumeAndNextToken(context);

            if (modifierEnd.type === 'bracket-end') {
                this.tokenizer.consumeToken(context);
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