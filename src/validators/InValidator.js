import { DataValueValidator } from "./base/DataValueValidator";

export class InValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return value.includes(selected);
    }
}
