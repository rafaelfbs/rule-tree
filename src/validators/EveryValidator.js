import { DataRuleValidator } from "./base/DataRuleValidator";

export class EveryValidator extends DataRuleValidator {
    validate(data, rule) {
        return this.select(data, rule).every(item => this.validateItem(item, rule));
    }
}
