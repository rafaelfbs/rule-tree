import { BaseValidator } from "./base/BaseValidator";

export class EveryValidator extends BaseValidator {
    validate(data, rule) {
        const { data: selector, rule: targetRule } = rule.options;
        const selected = this.ruleTree.dataSelector.select(data, selector);
        const validator = this.ruleTree.getValidator(targetRule.condition);
        
        return selected.every(item => validator.validate(item, targetRule));
    }
}