import { BaseValidator } from "./base/BaseValidator";

export class AndValidator extends BaseValidator {
    validate(data, rule) {
        const { rules } = rule.options;
        
        return rules
            .every(rule => this.ruleTree.getValidator(rule.condition).validate(data, rule));
    }
}
