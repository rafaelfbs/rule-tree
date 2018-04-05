import { EXISTS_CONDITION } from "../../src";
import { ExistsValidator } from "../../src/validators/ExistsValidator";

describe('ExistsValidator', () => {
    describe('#validate', () => {
        describe('when value property exists in data selected', () => {
            it('returns true', () => {
                const data = { prop: true };
                const rule = {
                    condition: EXISTS_CONDITION,
                    options: {
                        value: 'prop'
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new ExistsValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when value property exists in data selected', () => {
            it('returns false', () => {
                const data = { prop: true };
                const rule = {
                    condition: EXISTS_CONDITION,
                    options: {
                        value: 'otherProp'
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new ExistsValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });
    });
});
