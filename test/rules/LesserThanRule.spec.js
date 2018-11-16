import { createRuleTree, LESSER_THAN_CONDITION } from "../../src";

describe('LesserThan', () => {
    it('returns false when data selected is greater than value', () => {
        const data = 10;
        const rule = {
            condition: LESSER_THAN_CONDITION,
            value: 9.999999
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });

    it('returns false when data selected is equals value', () => {
        const data = 10;
        const rule = {
            condition: LESSER_THAN_CONDITION,
            value: 10
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });

    it('returns true when data selected is lower than value', () => {
        const data = 10;
        const rule = {
            condition: LESSER_THAN_CONDITION,
            value: 10.000001
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(true);
    });
});
