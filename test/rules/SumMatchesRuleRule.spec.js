import { createRuleTree, SUM_MATCHES_RULE_CONDITION } from "../../src";

describe('SumMatchesRule', () => {
    it('returns true when sum of data selected matches rule', () => {
        const data = { items: [ 1, 2, 3 ] };
        const rule = {
            condition: SUM_MATCHES_RULE_CONDITION,
            list: 'items',
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => (data) => data === 6)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('returns false when sum of data selected does not match rule', () => {
        const data = { items: [ 1, 2, 3 ] };
        const rule = {
            condition: SUM_MATCHES_RULE_CONDITION,
            list: 'items',
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => (data) => data !== 6)
        );

        expect(tree.validate(data)).toBe(false);
    });

    it('filters selected items from list when filter rule is defined', () => {
        const data = { items: [ 1, 2, 3 ] };
        const rule = {
            condition: SUM_MATCHES_RULE_CONDITION,
            list: 'items',
            filter: {
                condition: 'condition1'
            },
            rule: {
                condition: 'condition2'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition1', () => _ => _, () => (data) => data < 2)
            .addCondition('condition2', () => _ => _, () => (data) => data === 1)
        );

        expect(tree.validate(data)).toBe(true);
    });

    it('maps selected items from list when data selector is defined', () => {
        const data = [ { value: 1 }, { value: 2 }, { value: 3 } ];
        const rule = {
            condition: SUM_MATCHES_RULE_CONDITION,
            data: 'value',
            rule: {
                condition: 'condition'
            }
        };

        const tree = createRuleTree(rule, b => b
            .addCondition('condition', () => _ => _, () => (data) => data === 6)
        );

        expect(tree.validate(data)).toBe(true);
    });
});
