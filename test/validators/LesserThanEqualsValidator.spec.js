import { LESSER_THAN_EQUALS_CONDITION } from "../../src";
import { LesserThanEqualsValidator } from "../../src/validators/LesserThanEqualsValidator";

describe('LesserThanEqualsValidator', () => {
    describe('#validate', () => {
        describe('when data selected is greater than value', () => {
            it('returns false', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_EQUALS_CONDITION,
                    options: {
                        value: 9.999999
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanEqualsValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is equals value', () => {
            it('returns true', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_EQUALS_CONDITION,
                    options: {
                        value: 10
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanEqualsValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is lower than value', () => {
            it('returns true', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_EQUALS_CONDITION,
                    options: {
                        value: 10.000001
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanEqualsValidator(dataSelector);

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });
    });
});
