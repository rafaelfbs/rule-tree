import { BaseValidator } from "./BaseValidator";

export class DataRuleValidator extends BaseValidator {
    select(data, rule) {
        const { data: selector } = rule.options;
        return this.ruleTree.dataSelector.select(data, selector);
    }

    validateItem(item, rule) {
        const { rule: targetRule } = rule.options;
        return this.ruleTree.getValidator(targetRule.condition).validate(item, targetRule);
    }
}
