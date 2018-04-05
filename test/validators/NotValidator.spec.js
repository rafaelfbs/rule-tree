import { NOT_CONDITION } from "../../src";
import { NotValidator } from "../../src/validators/NotValidator";

describe('NotValidator', () => {
    describe('#validate', () => {
        describe('when rule is invalid', () => {
            it('returns true', () => {
                const data = {};
                const rule = {
                    condition: NOT_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(false)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator)
                };

                const notValidator = new NotValidator(ruleTree);

                expect(notValidator.validate(data, rule)).toBe(true);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(validator.validate.mock.calls[0][0]).toBe(data);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });

        describe('when rule is valid', () => {
            it('returns false', () => {
                const data = {};
                const rule = {
                    condition: NOT_CONDITION,
                    options: {
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator)
                };

                const notValidator = new NotValidator(ruleTree);

                expect(notValidator.validate(data, rule)).toBe(false);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(validator.validate.mock.calls[0][0]).toBe(data);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });
    });
});
