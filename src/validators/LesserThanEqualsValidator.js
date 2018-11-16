import { DataValueValidator } from "./base/DataValueValidator";

export class LesserThanEqualsValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return selected <= value;
    }
}
