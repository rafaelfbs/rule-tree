
export class SumMatchesRuleValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }

    validate(data, rule) {
        const {
            list: listSelector,
            filter: filterNode,
            data: dataSelector,
            rule: dataNode
        } = rule.options;

        let listSelected = this.ruleTree.dataSelector.select(data, listSelector);

        if (filterNode) {
            const filterRule = this.ruleTree.ruleParser.parse(filterNode);
            listSelected = listSelected.filter(item => this.ruleTree.getValidator(filterRule.condition).validate(item, filterRule));
        }

        if (dataSelector) {
            listSelected = listSelected.map(item => this.ruleTree.dataSelector.select(item, dataSelector));
        }

        const dataRule = this.ruleTree.ruleParser.parse(dataNode);
        const dataSelected = listSelected.reduce((sum, value) => sum + value, 0);
        return this.ruleTree.getValidator(dataRule.condition).validate(dataSelected, dataRule);
    }
}