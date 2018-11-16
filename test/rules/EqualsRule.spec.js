import { createRuleTree, EQUALS_CONDITION } from "../../src";

describe('Equals', () => {
    it('returns true when data selected is equals value', () => {
        const data = 'value';
        const rule = {
            condition: EQUALS_CONDITION,
            value: data
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(true);
    });

    it('return false when data select is not equals value', () => {
        const data = 'value';
        const rule = {
            condition: EQUALS_CONDITION,
            value: 'other-value'
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });
});
