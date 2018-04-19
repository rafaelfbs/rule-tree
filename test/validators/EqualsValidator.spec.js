import { EQUALS_CONDITION } from "../../src";
import { EqualsValidator } from "../../src/validators/EqualsValidator";

describe('EqualsValidator', () => {
    describe('#validate', () => {
        describe('when data selected is equals value', () => {
            it('returns true', () => {
                const data = 'value';
                const rule = {
                    condition: EQUALS_CONDITION,
                    options: {
                        value: data
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new EqualsValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data select is not equals value', () => {
            it('returns false', () => {
                const data = 'value';
                const rule = {
                    condition: EQUALS_CONDITION,
                    options: {
                        value: 'other-value'
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new EqualsValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });
    });
});
