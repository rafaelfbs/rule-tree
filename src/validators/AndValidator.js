import { RulesValidator } from "./base/RulesValidator";

export class AndValidator extends RulesValidator {
    validate(data, rule) {
        return this.getRules(rule).every(rule => this.validateRule(rule, data));
    }
}
