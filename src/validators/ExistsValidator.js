import { DataValueValidator } from "./base/DataValueValidator";

export class ExistsValidator extends DataValueValidator {
    validate(data, rule) {
        return this.getValue(rule) in this.select(data, rule);
    }
}
