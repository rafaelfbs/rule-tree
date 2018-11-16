import { DataRuleValidator } from "./base/DataRuleValidator";

export class SomeValidator extends DataRuleValidator {
    validate(data, rule) {
        return this.select(data, rule).some(item => this.validateItem(item, rule));
    }
}
