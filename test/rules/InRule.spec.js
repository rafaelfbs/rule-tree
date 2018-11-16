import { createRuleTree, IN_CONDITION } from "../../src";

describe('In', () => {
    it('returns true when data selected is included in value', () => {
        const data = 'value';
        const rule = {
            condition: IN_CONDITION,
            value: [data]
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when data selected is not included in value', () => {
        const data = 'value';
        const rule = {
            condition: IN_CONDITION,
            value: ['other-value']
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });
});
