import { BaseValidator } from "./base/BaseValidator";

export class EmptyValidator extends BaseValidator {
    validate(data, rule) {
        const { data: selector } = rule.options;
        const selected = this.ruleTree.dataSelector.select(data, selector);
        return Array.isArray(selected) && selected.length === 0;
    }
}
