import { DataValueValidator } from "./base/DataValueValidator";

export class EqualsValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return selected === value;
    }
}
