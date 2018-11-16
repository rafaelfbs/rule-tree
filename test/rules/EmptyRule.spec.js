import { createRuleTree, EMPTY_CONDITION } from "../../src";

describe('Empty', () => {
    it('returns true when data selected is empty', () => {
        const data = [];
        const rule = {
            condition: EMPTY_CONDITION
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when data selected is not empty', () => {
        const data = [{}];
        const rule = {
            condition: EMPTY_CONDITION
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });

    it('returns false when data selected is not array', () => {
        const data = {};
        const rule = {
            condition: EMPTY_CONDITION
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });
});
