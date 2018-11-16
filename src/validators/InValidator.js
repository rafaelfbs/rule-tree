import { DataValueValidator } from "./base/DataValueValidator";

export class InValidator extends DataValueValidator {
    validate(data, rule) {
        return this.getValue(rule).includes(this.select(data, rule));
    }
}
