import { RuleTree } from './RuleTree';
import { DataSelector } from './selectors/DataSelector';
import { Parser } from "./selectors/parser/Parser";
import { Tokenizer } from "./selectors/tokenizer/Tokenizer";

export class RuleTreeBuilder {
    constructor() {
        this.options = {
            dataSelector: new DataSelector(new Parser(new Tokenizer())),
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