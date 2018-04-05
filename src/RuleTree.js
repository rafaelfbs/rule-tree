
export class RuleTree {
    constructor(schema, options = {}) {
        this.schema = schema;
        
        this.dataSelector = options.dataSelector;
        this.validators = options.validators;
        this.parsers = options.parsers;

        this.rootRule = this.parse(this.schema);
    }
    
    getValidator(name) {
        const validatorFactory = this.validators[name];
        
        if (!validatorFactory) {
            throw new SyntaxError(`No validator "${name}" found`);
        }
        
        return validatorFactory(this);
    }

    getParser(name) {
        const parserFactory = this.parsers[name];

        if (!parserFactory) {
            throw new SyntaxError(`No parser "${name}" found`);
        }

        return parserFactory(this);
    }

    parse(node) {
        return this.getParser(node.condition).parse(node);
    }

    validate(data) {
        const rule = this.rootRule;
        const validator = this.getValidator(rule.condition);
        
        return validator.validate(data, rule);
    }
}
