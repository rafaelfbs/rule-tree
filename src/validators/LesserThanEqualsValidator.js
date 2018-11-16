import { DataValueValidator } from "./base/DataValueValidator";

export class LesserThanEqualsValidator extends DataValueValidator {
    validateItem(selected, value) {
        return selected <= value;
    }
}
