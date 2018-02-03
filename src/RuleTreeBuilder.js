import { RuleTree } from './RuleTree';
import { RuleParser } from './parsers/RuleParser';
import { DataSelector } from './selectors/DataSelector';

export class RuleTreeBuilder {
    constructor() {
        this.options = {
            dataSelector: new DataSelector(),
            ruleParser: new RuleParser(),
            validators: {}
        };
    }
    
    addCondition(name, validatorFactory) {
        this.options.validators[name] = validatorFactory;
        return this;
    }
    
    build(schema) {
        return new RuleTree(schema, this.options);
    }
}