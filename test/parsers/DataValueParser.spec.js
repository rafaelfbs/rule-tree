import { DataValueParser } from "../../src/parsers/DataValueParser";

describe('DataValueParser', () => {
    describe('#parse', () => {
        it('returns a valid rule', () => {
            const node = { condition: 'condition', data: 'data', value: 'value' };

            const expectedRule = {
                condition: node.condition,
                options: {
                    data: node.data,
                    value: node.value,
                }
            };

            const parser = new DataValueParser();
            const result = parser.parse(node);

            expect(result).toEqual(expectedRule);
        });
    });
});
