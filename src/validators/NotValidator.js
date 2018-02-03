
export class NotValidator {
    constructor(ruleTree) {
        this.ruleTree = ruleTree;
    }
    
    validate(data, rule) {
        const { rule: node } = rule.options;
        const validator = this.ruleTree.getValidator(targetRule.condition);
        const targetRule = this.ruleParser.parse(node);
        return !validator.validate(data, targetRule);
    }
}