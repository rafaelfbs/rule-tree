
export class RuleParser {
    parse(node) {
        const { condition, ...options } = node;
        return {
            condition,
            options
        };
    }
}
