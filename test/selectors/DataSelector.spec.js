import { DataSelector } from "../../src/selectors/DataSelector";

describe('DataSelector', () => {
    describe('#select', () => {
        it('returns data when no selector is passed', () => {
            const data = {};
            const selector = new DataSelector();

            expect(selector.select(data)).toBe(data);
        });

        it('throws a SyntaxError when selector syntax has no matches', () => {
            const selector = new DataSelector();

            expect(() => selector.select({}, '???')).toThrow(SyntaxError);
            expect(() => selector.select({}, '???')).toThrow('Wrong selector syntax in "???"');
        });

        it.skip('throws a SyntaxError when selector syntax is invalid', () => {
            const selector = new DataSelector();

            expect(() => selector.select({}, '?prop')).toThrow(SyntaxError);
            expect(() => selector.select({}, '?prop')).toThrow('Wrong selector syntax in "?prop"');
        });

        describe('property accessors', () => {
            it('accepts a property accessor', () => {
                const data = { prop: 'value' };
                const value = data.prop;

                const selector = new DataSelector();

                expect(selector.select(data, '.prop')).toBe(value);
            });

            it('accepts a nested property accessor', () => {
                const data = { prop1: { prop2: { prop3: 'value' } } };
                const value = data.prop1.prop2.prop3;

                const selector = new DataSelector();

                expect(selector.select(data, '.prop1.prop2.prop3')).toBe(value);
            });

            it('accepts a flatMap modifier', () => {
                const data = [ { value: 1 }, { value: 2 }, { value: 3 } ];
                const value = [1, 2, 3];

                const selector = new DataSelector();

                expect(selector.select(data, '.value[]')).toEqual(value);
            });

            it('throws a SyntaxError when data selected with flatMap is not an array', () => {
                const data = { prop: 1 };
                const selector = new DataSelector();

                expect(() => selector.select(data, '.prop[]')).toThrow(SyntaxError);
                expect(() => selector.select(data, '.prop[]')).toThrow('Data is not an array for flat map property (root)');
            });
        });

        describe('method accessors', () => {
            it('accepts a method accessor', () => {
                const data = { prop: () => 'value' };
                const value = data.prop();

                const selector = new DataSelector();

                expect(selector.select(data, '#prop')).toBe(value);
            });

            it('accepts a nested method accessor', () => {
                const data = { prop1: () => ({ prop2: () => ({ prop3: () => 'value' }) }) };
                const value = data.prop1().prop2().prop3();

                const selector = new DataSelector();

                expect(selector.select(data, '#prop1#prop2#prop3')).toBe(value);
            });

            it('accepts a flatMap modifier', () => {
                const data = [ { value: () => 1 }, { value: () => 2 }, { value: () => 3 } ];
                const value = [1, 2, 3];

                const selector = new DataSelector();

                expect(selector.select(data, '#value[]')).toEqual(value);
            });

            it('throws a SyntaxError when data selected with flatMap is not an array', () => {
                const data = { prop: () => 1 };
                const selector = new DataSelector();

                expect(() => selector.select(data, '#prop[]')).toThrow(SyntaxError);
                expect(() => selector.select(data, '#prop[]')).toThrow('Data is not an array for flat map property (root)');
            });
        });

        describe('default accessor', () => {
            it('assumes an empty starting accessor as property accessor', () => {
                const data = { prop1: { prop2: { prop3: () => 'value' } } };
                const value = data.prop1.prop2.prop3();

                const selector = new DataSelector();

                expect(selector.select(data, 'prop1.prop2#prop3')).toBe(value);
            });
        });
    });
});
