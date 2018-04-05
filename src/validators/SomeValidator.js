
export class SomeValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }
    
    validate(data, rule) {
        const { data: selector, rule: targetRule } = rule.options;
        const selected = this.ruleTree.dataSelector.select(data, selector);
        const validator = this.ruleTree.getValidator(targetRule.condition);
        
        return selected.some(item => validator.validate(item, targetRule));
    }
}