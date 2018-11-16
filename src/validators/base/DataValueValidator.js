import { BaseValidator } from "./BaseValidator";

export class DataValueValidator extends BaseValidator {
    select(data, rule) {
        return this.ruleTree.dataSelector.select(data, rule.options.data);
    }

    getValue(rule) {
        return rule.options.value;
    }

    validate(data, rule) {
        return this.validateSelected(this.select(data, rule), this.getValue(rule));
    }
}
