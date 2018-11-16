import { createRuleTree, EVERY_CONDITION } from "../../src";

describe('Every', () => {
    it('returns true when every item is valid for rule', () => {
        const data = [ 'value1', 'value2' ];
        const rule = {
            condition: EVERY_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => () => true)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when some item is invalid for rule', () => {
        const data = [ 'value1', 'value2' ];
        const rule = {
            condition: EVERY_CONDITION,
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => (data) => data === 'value1')
        );

        expect(tree.validate(data)).toBe(false);
    });
});
