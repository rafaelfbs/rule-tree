import { createRuleTree, OR_CONDITION } from "../../src";

describe('Or', () => {
    it('returns true when some rule is valid', () => {
        const data = {};
        const rule = {
            condition: OR_CONDITION,
            rules: [
                {
                    condition: 'condition1'
                },
                {
                    condition: 'condition2'
                }
            ]
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition1', () => _ => _, () => () => false)
            .addCondition('condition2', () => _ => _, () => () => true)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when every rule is invalid', () => {
        const data = {};
        const rule = {
            condition: OR_CONDITION,
            rules: [
                {
                    condition: 'condition1'
                },
                {
                    condition: 'condition2'
                }
            ]
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition1', () => _ => _, () => () => false)
            .addCondition('condition2', () => _ => _, () => () => false)
        );

        expect(tree.validate(data)).toBe(false);
    });
});
