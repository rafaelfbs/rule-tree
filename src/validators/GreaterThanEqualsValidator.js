import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanEqualsValidator extends DataValueValidator {
    validateItem(selected, value) {
        return selected >= value;
    }
}
