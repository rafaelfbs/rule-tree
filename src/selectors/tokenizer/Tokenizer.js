
const CHAR_IDENTIFIER_REGEX = /[a-zA-Z0-9_]/;

export class Tokenizer {
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
                this.raiseException(char, context.pos);
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

    isIdentifierChar(char) {
        return CHAR_IDENTIFIER_REGEX.test(char);
    }

    raiseException(char, position) {
        throw new Error(`Unexpected token "${char}" at position "${position}"`);
    }
}