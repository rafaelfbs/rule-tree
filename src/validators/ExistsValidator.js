import { DataValueValidator } from "./base/DataValueValidator";

export class ExistsValidator extends DataValueValidator {
    validateItem(selected, value) {
        return value in selected;
    }
}
