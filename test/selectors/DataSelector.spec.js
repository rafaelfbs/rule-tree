import { DataSelector } from "../../src/selectors/DataSelector";
import { Tokenizer } from "../../src/selectors/tokenizer/Tokenizer";
import { Parser } from "../../src/selectors/parser/Parser";

describe('DataSelector', () => {
    describe('#select', () => {
        it('returns data when no selector is passed', () => {
            const data = {};
            const selector = new DataSelector(new Parser(new Tokenizer()));

            expect(selector.select(data)).toBe(data);
        });

        it('throws a SyntaxError when selector syntax has no matches', () => {
            const selector = new DataSelector(new Parser(new Tokenizer()));

            expect(() => selector.select({}, '???')).toThrow('Unexpected token "?" at position "0"');
        });

        it('throws a SyntaxError when selector syntax is invalid', () => {
            const selector = new DataSelector(new Parser(new Tokenizer()));

            expect(() => selector.select({}, '?prop')).toThrow('Unexpected token "?" at position "0"');
        });

        describe('property accessors', () => {
            it('accepts a property accessor', () => {
                const data = { prop: 'value' };
                const value = data.prop;

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '.prop')).toBe(value);
            });

            it('accepts a nested property accessor', () => {
                const data = { prop1: { prop2: { prop3: 'value' } } };
                const value = data.prop1.prop2.prop3;

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '.prop1.prop2.prop3')).toBe(value);
            });

            it('accepts a flatMap modifier', () => {
                const data = [ { value: 1 }, { value: 2 }, { value: 3 } ];
                const value = [1, 2, 3];

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '.value[]')).toEqual(value);
            });

            it('throws a SyntaxError when data selected with flatMap is not an array', () => {
                const data = { prop: 1 };
                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(() => selector.select(data, '.prop[]')).toThrow('Data is not an array for flat map property (.prop[])');
            });
        });

        describe('method accessors', () => {
            it('accepts a method accessor', () => {
                const data = { prop: () => 'value' };
                const value = data.prop();

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '#prop')).toBe(value);
            });

            it('accepts a nested method accessor', () => {
                const data = { prop1: () => ({ prop2: () => ({ prop3: () => 'value' }) }) };
                const value = data.prop1().prop2().prop3();

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '#prop1#prop2#prop3')).toBe(value);
            });

            it('throws a SyntaxError when no property for selector exists', () => {
                const data = { prop2: 1 };
                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(() => selector.select(data, '#prop')).toThrow('No method "prop" in data (#prop)');
            });

            it('throws a SyntaxError when property for selector is not a function', () => {
                const data = { prop: 1 };
                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(() => selector.select(data, '#prop')).toThrow('Property "prop" is not a function (#prop)');
            });

            it('accepts a flatMap modifier', () => {
                const data = [ { value: () => 1 }, { value: () => 2 }, { value: () => 3 } ];
                const value = [1, 2, 3];

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, '#value[]')).toEqual(value);
            });

            it('throws a SyntaxError when data selected with flatMap is not an array', () => {
                const data = { prop: () => 1 };
                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(() => selector.select(data, '#prop[]')).toThrow('Data is not an array for flat map property (#prop[])');
            });
        });

        describe('default accessor', () => {
            it('assumes an empty starting accessor as property accessor', () => {
                const data = { prop1: { prop2: { prop3: () => 'value' } } };
                const value = data.prop1.prop2.prop3();

                const selector = new DataSelector(new Parser(new Tokenizer()));

                expect(selector.select(data, 'prop1.prop2#prop3')).toBe(value);
            });
        });
    });
});
