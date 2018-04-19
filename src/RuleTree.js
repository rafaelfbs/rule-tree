
export class RuleTree {
    constructor(schema, options = {}) {
        this.schema = schema;
        
        this.dataSelector = options.dataSelector;
        this.validators = options.validators;
        this.parsers = options.parsers;

        this.rootRule = this.parse(this.schema);
    }

    createOrGetDependency(dependencyType, dependencies, name, createDependencyObject) {
        const factory = dependencies[name];

        if (!factory) {
            this.raiseDependencyCreationError(dependencyType, name)
        }

        const dependency = factory(this);

        if (!dependency) {
            this.raiseDependencyCreationError(dependencyType, name)
        }

        return typeof dependency === 'function'
            ? createDependencyObject(dependency)
            : dependency;
    }

    raiseDependencyCreationError(dependencyType, name) {
        throw new SyntaxError(`No ${dependencyType} "${name}" found`);
    }
    
    getValidator(name) {
        return this.createOrGetDependency('validator', this.validators, name, validate => ({ validate }));
    }

    getParser(name) {
        return this.createOrGetDependency('parser', this.parsers, name, parse => ({ parse }));
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
