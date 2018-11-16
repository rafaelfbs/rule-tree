import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanValidator extends DataValueValidator {
    validateItem(selected, value) {
        return selected > value;
    }
}
