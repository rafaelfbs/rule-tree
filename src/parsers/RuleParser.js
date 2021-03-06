
export class RuleParser {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }

    parse(node) {
        const { condition, rule } = node;
        return {
            condition,
            options: {
                rule: this.ruleTree.parse(rule)
            }
        };
    }
}
