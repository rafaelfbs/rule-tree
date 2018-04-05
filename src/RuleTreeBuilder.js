import { RuleTree } from './RuleTree';
import { DataSelector } from './selectors/DataSelector';

export class RuleTreeBuilder {
    constructor() {
        this.options = {
            dataSelector: new DataSelector(),
            validators: {},
            parsers: {}
        };
    }
    
    addCondition(name, ruleParserFactory, validatorFactory) {
        this.options.parsers[name] = ruleParserFactory;
        this.options.validators[name] = validatorFactory;

        return this;
    }
    
    build(schema) {
        return new RuleTree(schema, this.options);
    }
}