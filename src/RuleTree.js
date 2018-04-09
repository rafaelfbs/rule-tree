
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

        const validator = validatorFactory(this);

        if (!validator) {
            throw new SyntaxError(`No validator "${name}" found`);
        }

        return typeof validator === 'function'
            ? ({ validate: validator })
            : validator;
    }

    getParser(name) {
        const parserFactory = this.parsers[name];

        if (!parserFactory) {
            throw new SyntaxError(`No parser "${name}" found`);
        }

        const parser = parserFactory(this);

        if (!parser) {
            throw new SyntaxError(`No parser "${name}" found`);
        }

        return typeof parser === 'function'
            ? ({ parse: parser })
            : parser;
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
