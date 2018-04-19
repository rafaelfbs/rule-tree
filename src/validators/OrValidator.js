import { BaseValidator } from "./base/BaseValidator";

export class OrValidator extends BaseValidator {
    validate(data, rule) {
        const { rules } = rule.options;
        
        return rules
            .some(rule => this.ruleTree.getValidator(rule.condition).validate(data, rule));
    }
}
