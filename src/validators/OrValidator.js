import { RulesValidator } from "./base/RulesValidator";

export class OrValidator extends RulesValidator {
    validate(data, rule) {
        return this.getRules(rule).some(rule => this.validateRule(rule, data));
    }
}
