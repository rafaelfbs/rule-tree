import { RulesValidator } from "./base/RulesValidator";

export class OrValidator extends RulesValidator {
    validateSelected(selected, predicate) {
        return selected.some(predicate);
    }
}
