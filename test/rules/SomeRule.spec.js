import { createRuleTree, SOME_CONDITION } from "../../src";

describe('Some', () => {
    it('returns true when some item is valid for rule', () => {
        const data = [ 'value1', 'value2' ];
        const rule = {
            condition: SOME_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => data => data === 'value1')
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when every item is invalid for rule', () => {
        const data = [ 'value1', 'value2' ];
        const rule = {
            condition: SOME_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => () => false)
        );

        expect(tree.validate(data)).toBe(false);
    });
});
