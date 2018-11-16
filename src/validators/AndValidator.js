import { RulesValidator } from "./base/RulesValidator";

export class AndValidator extends RulesValidator {
    validateSelected(selected, predicate) {
        return selected.every(predicate);
    }
}
