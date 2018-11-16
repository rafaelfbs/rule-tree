import { DataRuleValidator } from "./base/DataRuleValidator";

export class EveryValidator extends DataRuleValidator {
    validateSelected(selected, predicate) {
        return selected.every(predicate);
    }
}
