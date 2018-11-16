import { DataValueValidator } from "./base/DataValueValidator";

export class LesserThanValidator extends DataValueValidator {
    validateItem(selected, value) {
        return selected < value;
    }
}
