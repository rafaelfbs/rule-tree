import { ListFilterDataRuleParser } from "../../src/parsers/ListFilterDataRuleParser";

describe('ListFilterDataRuleParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const filterNode = {};
            const matcherNode = {};

            const filterRule = {};
            const matcherRule = {};

            const node = {
                condition: 'condition',
                list: 'list',
                filter: filterNode,
                data: 'data',
                rule: matcherNode
            };

            const expectedRule = {
                condition: node.condition,
                options: {
                    list: node.list,
                    filter: filterRule,
                    data: node.data,
                    rule: matcherRule
                }
            };

            const targetParser = jest.fn()
                .mockReturnValueOnce(filterRule)
                .mockReturnValueOnce(matcherRule);

            const parser = new ListFilterDataRuleParser({ parse: targetParser });
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
            expect(targetParser.mock.calls[0][0]).toBe(filterNode);
            expect(targetParser.mock.calls[1][0]).toBe(matcherNode);
        });
    });
});
