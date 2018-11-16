import { createRuleTree, EXISTS_CONDITION } from "../../src";

describe('Exists', () => {
    it('returns true when value property exists in data selected', () => {
        const data = { prop: true };
        const rule = {
            condition: EXISTS_CONDITION,
            value: 'prop'
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when value property exists in data selected', () => {
        const data = { prop: true };
        const rule = {
            condition: EXISTS_CONDITION,
            value: 'otherProp'
        };

        const tree = createRuleTree(rule);

        expect(tree.validate(data)).toBe(false);
    });
});
