
export class NotValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }
    
    validate(data, rule) {
        const { rule: targetRule } = rule.options;
        const validator = this.ruleTree.getValidator(targetRule.condition);
        return !validator.validate(data, targetRule);
    }
}