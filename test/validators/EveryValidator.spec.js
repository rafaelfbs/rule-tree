import { EVERY_CONDITION } from "../../src";
import { EveryValidator } from "../../src/validators/EveryValidator";

describe('EveryValidator', () => {
    describe('#validate', () => {
        describe('when every item is valid for rule', () => {
            it('returns true', () => {
                const data = [ 'value1', 'value2' ];
                const rule = {
                    condition: EVERY_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                        .mockReturnValueOnce(true)
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const everyValidator = new EveryValidator(ruleTree);

                expect(everyValidator.validate(data, rule)).toBe(true);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(validator.validate.mock.calls[0][0]).toBe(data[0]);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
                expect(validator.validate.mock.calls[1][0]).toBe(data[1]);
                expect(validator.validate.mock.calls[1][1]).toBe(rule.options.rule);
            });
        });

        describe('when some item is invalid for rule', () => {
            it('returns false', () => {
                const data = [ 'value1', 'value2' ];
                const rule = {
                    condition: EVERY_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                        .mockReturnValueOnce(false)
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const everyValidator = new EveryValidator(ruleTree);

                expect(everyValidator.validate(data, rule)).toBe(false);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(validator.validate.mock.calls[0][0]).toBe(data[0]);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
                expect(validator.validate.mock.calls[1][0]).toBe(data[1]);
                expect(validator.validate.mock.calls[1][1]).toBe(rule.options.rule);
            });
        });
    });
});
