import { DataRuleParser } from "../../src/parsers/DataRuleParser";

describe('DataRuleParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const targetNode = {};
            const targetRule = {};

            const node = { condition: 'condition', data: 'data', rule: targetNode };

            const targetParser = jest.fn().mockReturnValue(targetRule);

            const expectedRule = {
                condition: node.condition,
                options: {
                    data: node.data,
                    rule: targetRule,
                }
            };

            const parser = new DataRuleParser({ parse: targetParser });
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
            expect(targetParser.mock.calls[0][0]).toBe(targetNode);
        });
    });
});
