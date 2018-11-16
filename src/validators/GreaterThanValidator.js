import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return selected > value;
    }
}
