import { DataValueValidator } from "./base/DataValueValidator";

export class LesserThanValidator extends DataValueValidator {
    validateSelected(selected, value) {
        return selected < value;
    }
}
