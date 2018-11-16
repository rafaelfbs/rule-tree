import { createRuleTree, NOT_CONDITION } from "../../src";

describe('Not', () => {
    it('returns true when rule is invalid', () => {
        const data = {};
        const rule = {
            condition: NOT_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => () => false)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when rule is valid', () => {
        const data = {};
        const rule = {
            condition: NOT_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => () => false)
        );

        expect(tree.validate(data)).toBe(true);
    });
});
