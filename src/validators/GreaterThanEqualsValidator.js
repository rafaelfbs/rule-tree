import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanEqualsValidator extends DataValueValidator {
    validate(data, rule) {
        return this.select(data, rule) >= this.getValue(rule);
    }
}
