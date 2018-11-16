import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanEqualsValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return selected >= value;
    }
}
