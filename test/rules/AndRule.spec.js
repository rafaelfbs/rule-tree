import { AND_CONDITION, createRuleTree } from "../../src";

describe('And', () => {
    it('returns true when every rule is valid', () => {
        const data = {};
        const rule = {
            condition: AND_CONDITION,
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
            .addCondition('condition1', () => _ => _, () => () => true)
            .addCondition('condition2', () => _ => _, () => () => true)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when some rule is invalid', () => {
        const data = {};
        const rule = {
            condition: AND_CONDITION,
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
            .addCondition('condition1', () => _ => _, () => () => true)
            .addCondition('condition2', () => _ => _, () => () => false)
        );

        expect(tree.validate(data)).toBe(false);
    });
});
