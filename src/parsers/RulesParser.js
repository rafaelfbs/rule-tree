
export class RulesParser {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }

    parse(node) {
        const { condition, rules } = node;
        return {
            condition,
            options: {
                rules: rules.map(node => this.ruleTree.parse(node))
            }
        };
    }
}
