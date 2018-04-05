import { RuleParser } from "../../src/parsers/RuleParser";

describe('RuleParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const targetNode = {};
            const targetRule = {};

            const node = { condition: 'condition', rule: targetNode };

            const targetParser = jest.fn()
                .mockReturnValueOnce(targetRule);

            const expectedRule = {
                condition: node.condition,
                options: {
                    rule: targetRule,
                }
            };

            const parser = new RuleParser({ parse: targetParser });
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
            expect(targetParser.mock.calls[0][0]).toBe(targetNode);
        });
    });
});
