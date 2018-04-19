import { DataParser } from "../../src/parsers/DataParser";

describe('DataParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const node = { condition: 'condition', data: 'data' };

            const expectedRule = {
                condition: node.condition,
                options: {
                    data: node.data,
                }
            };

            const parser = new DataParser();
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
        });
    });
});
