import { DataValueValidator } from "./base/DataValueValidator";

export class GreaterThanValidator extends DataValueValidator {
    validate(data, rule) {
        return this.select(data, rule) > this.getValue(rule);
    }
}
