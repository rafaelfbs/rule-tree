import { SOME_CONDITION } from "../../src";
import { SomeValidator } from "../../src/validators/SomeValidator";

describe('SomeValidator', () => {
    describe('#validate', () => {
        describe('when some item is valid for rule', () => {
            it('returns true', () => {
                const data = [ 'value1', 'value2' ];
                const rule = {
                    condition: SOME_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(false)
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

                const someValidator = new SomeValidator(ruleTree);

                expect(someValidator.validate(data, rule)).toBe(true);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(validator.validate.mock.calls[0][0]).toBe(data[0]);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
                expect(validator.validate.mock.calls[1][0]).toBe(data[1]);
                expect(validator.validate.mock.calls[1][1]).toBe(rule.options.rule);
            });
        });

        describe('when every item is invalid for rule', () => {
            it('returns false', () => {
                const data = [ 'value1', 'value2' ];
                const rule = {
                    condition: SOME_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(false)
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

                const someValidator = new SomeValidator(ruleTree);

                expect(someValidator.validate(data, rule)).toBe(false);
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
