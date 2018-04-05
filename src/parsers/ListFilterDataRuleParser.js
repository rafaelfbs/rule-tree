
export class ListFilterDataRuleParser {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }

    parse(node) {
        const { condition, list, filter, data, rule } = node;
        return {
            condition,
            options: {
                list,
                filter: this.ruleTree.parse(filter),
                data,
                rule: this.ruleTree.parse(rule)
            }
        };
    }
}
