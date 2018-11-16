import { BaseValidator } from "./BaseValidator";

export class RulesValidator extends BaseValidator {
    getRules(rule) {
        return rule.options.rules;
    }

    validateRule(rule, data) {
        return this.ruleTree.getValidator(rule.condition).validate(data, rule);
    }

    validate(data, rule) {
        return this.validateSelected(
            this.getRules(rule),
            rule => this.validateRule(rule, data)
        );
    }
}
