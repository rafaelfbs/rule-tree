import { LESSER_THAN_CONDITION } from "../../src";
import { LesserThanValidator } from "../../src/validators/LesserThanValidator";

describe('LesserThanValidator', () => {
    describe('#validate', () => {
        describe('when data selected is greater than value', () => {
            it('returns false', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_CONDITION,
                    options: {
                        value: 9.999999
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is equals value', () => {
            it('returns false', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_CONDITION,
                    options: {
                        value: 10
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is lower than value', () => {
            it('returns true', () => {
                const data = 10;
                const rule = {
                    condition: LESSER_THAN_CONDITION,
                    options: {
                        value: 10.000001
                    }
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new LesserThanValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });
    });
});
