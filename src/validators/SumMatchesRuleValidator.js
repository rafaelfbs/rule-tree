import { BaseValidator } from "./base/BaseValidator";

export class SumMatchesRuleValidator extends BaseValidator {
    validate(data, rule) {
        const {
            list: listSelector,
            filter: filterRule,
            data: dataSelector,
            rule: dataRule
        } = rule.options;

        let listSelected = this.ruleTree.dataSelector.select(data, listSelector);

        if (filterRule) {
            const validator = this.ruleTree.getValidator(filterRule.condition);
            listSelected = listSelected.filter(item => validator.validate(item, filterRule));
        }

        if (dataSelector) {
            listSelected = listSelected.map(item => this.ruleTree.dataSelector.select(item, dataSelector));
        }

        const dataSelected = listSelected.reduce((sum, value) => sum + value, 0);
        return this.ruleTree.getValidator(dataRule.condition).validate(dataSelected, dataRule);
    }
}