
export class DataRuleParser {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }

    parse(node) {
        const { condition, data, rule } = node;
        return {
            condition,
            options: {
                data,
                rule: this.ruleTree.parse(rule)
            }
        };
    }
}
