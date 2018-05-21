import { EMPTY_CONDITION } from "../../src";
import { EmptyValidator } from "../../src/validators/EmptyValidator";

describe('EmptyValidator', () => {
    describe('#validate', () => {
        describe('when data selected is empty', () => {
            it('returns true', () => {
                const data = [];
                const rule = {
                    condition: EMPTY_CONDITION,
                    options: {}
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new EmptyValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(true);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

        describe('when data selected is not empty', () => {
            it('returns false', () => {
                const data = [{}];
                const rule = {
                    condition: EMPTY_CONDITION,
                    options: {}
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const validator = new EmptyValidator({ dataSelector });

                expect(validator.validate(data, rule)).toBe(false);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
            });
        });

      describe('when data selected is not array', () => {
        it('returns false', () => {
          const data = {};
          const rule = {
            condition: EMPTY_CONDITION,
            options: {}
          };

          const dataSelector = {
            select: jest.fn()
              .mockReturnValueOnce(data)
          };

          const validator = new EmptyValidator({ dataSelector });

          expect(validator.validate(data, rule)).toBe(false);
          expect(dataSelector.select.mock.calls[0][0]).toBe(data);
          expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
        });
      });
    });
});
