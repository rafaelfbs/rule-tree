import { IN_CONDITION } from "../../src";
import { InValidator } from "../../src/validators/InValidator";

describe('InValidator', () => {
    describe('#validate', () => {
        describe('when data selected is included in value', () => {
            it('returns true', () => {
                const data = 'value';
                const rule = {
                    condition: IN_CONDITION,
                    options: {
                        value: [data]
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new InValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is not included in value', () => {
            it('returns false', () => {
                const data = 'value';
                const rule = {
                    condition: IN_CONDITION,
                    options: {
                        value: ['other-value']
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new InValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });
    });
});
