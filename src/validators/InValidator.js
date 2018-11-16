import { DataValueValidator } from "./base/DataValueValidator";

export class InValidator extends DataValueValidator {
    validateItem(selected, value) {
        return value.includes(selected);
    }
}
