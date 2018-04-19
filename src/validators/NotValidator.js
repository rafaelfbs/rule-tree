import { BaseValidator } from "./base/BaseValidator";

export class NotValidator extends BaseValidator {
    validate(data, rule) {
        const { rule: targetRule } = rule.options;
        const validator = this.ruleTree.getValidator(targetRule.condition);
        return !validator.validate(data, targetRule);
    }
}