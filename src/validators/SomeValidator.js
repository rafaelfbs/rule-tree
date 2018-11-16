import { DataRuleValidator } from "./base/DataRuleValidator";

export class SomeValidator extends DataRuleValidator {
    validateSelected(selected, predicate) {
        return selected.some(predicate);
    }
}
