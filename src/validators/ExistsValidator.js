import { BaseValidator } from "./base/BaseValidator";

export class ExistsValidator extends BaseValidator {
    validate(data, rule) {
        const { data: selector, value } = rule.options;
        const selected = this.ruleTree.dataSelector.select(data, selector);
        return value in selected;
    }
}
