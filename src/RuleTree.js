import { RuleParser } from './parsers/RuleParser';
import { DataSelector } from './selectors/DataSelector';

import { EqualsValidator } from './validators/EqualsValidator';

export class RuleTree {
    constructor(schema, options = {}) {
        this.schema = schema;
        
        this.dataSelector = options.dataSelector;
        this.ruleParser = options.ruleParser;
        this.validators = options.validators;
    }
    
    getValidator(name) {
        const validatorFactory = this.validators[name];
        
        if (!validatorFactory) {
            throw new SyntaxError(`No validator "${name}" found`);
        }
        
        return validatorFactory(this);
    }

    validate(data) {
        const rule = this.ruleParser.parse(this.schema);
        const validator = this.getValidator(rule.condition);
        
        return validator.validate(data, rule);
    }
}
