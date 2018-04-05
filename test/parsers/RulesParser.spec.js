import { RulesParser } from "../../src/parsers/RulesParser";

describe('RulesParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const targetNodes = [{}, {}];
            const targetRules = [{}, {}];

            const node = { condition: 'condition', rules: targetNodes };

            const targetParser = jest.fn()
                .mockReturnValueOnce(targetRules[0])
                .mockReturnValueOnce(targetRules[1]);

            const expectedRule = {
                condition: node.condition,
                options: {
                    rules: targetRules,
                }
            };

            const parser = new RulesParser({ parse: targetParser });
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
            expect(targetParser.mock.calls[0][0]).toBe(targetNodes[0]);
            expect(targetParser.mock.calls[1][0]).toBe(targetNodes[1]);
        });
    });
});
