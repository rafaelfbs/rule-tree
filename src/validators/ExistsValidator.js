import { DataValueValidator } from "./base/DataValueValidator";

export class ExistsValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return value in selected;
    }
}
