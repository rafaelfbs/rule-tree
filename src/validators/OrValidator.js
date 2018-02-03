
export class OrValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }
    
    validate(data, rule) {
        const { rules } = rule.options;
        
        return rules
            .map(rule => this.ruleTree.ruleParser.parse(rule))
            .some(rule => this.ruleTree.getValidator(rule.condition).validate(data, rule));
    }
}
