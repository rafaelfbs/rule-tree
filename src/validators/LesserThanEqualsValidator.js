
export class LesserThanEqualsValidator {
    constructor(dataSelector) {
        this.dataSelector = dataSelector;
    }
    
    validate(data, rule) {
        const { data: selector, value } = rule.options;
        const selected = this.dataSelector.select(data, selector);
        return selected <= value;
    }
}