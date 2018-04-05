
export class OrValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }
    
    validate(data, rule) {
        const { rules } = rule.options;
        
        return rules
            .some(rule => this.ruleTree.getValidator(rule.condition).validate(data, rule));
    }
}
