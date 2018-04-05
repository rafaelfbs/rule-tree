import { OR_CONDITION } from "../../src";
import { OrValidator } from "../../src/validators/OrValidator";

describe('OrValidator', () => {
    describe('#validate', () => {
        describe('when some rule is valid', () => {
            it('returns true', () => {
                const data = {};
                const rule = {
                    condition: OR_CONDITION,
                    options: {
                        rules: [
                            {
                                condition: 'condition1'
                            },
                            {
                                condition: 'condition2'
                            }
                        ]
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(false)
                        .mockReturnValueOnce(true)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator)
                        .mockReturnValueOnce(validator)
                };

                const orValidator = new OrValidator(ruleTree);

                expect(orValidator.validate(data, rule)).toBe(true);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rules[0].condition);
                expect(ruleTree.getValidator.mock.calls[1][0]).toBe(rule.options.rules[1].condition);
                expect(validator.validate.mock.calls[0][0]).toBe(data);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rules[0]);
                expect(validator.validate.mock.calls[1][0]).toBe(data);
                expect(validator.validate.mock.calls[1][1]).toBe(rule.options.rules[1]);
            });
        });

        describe('when every rule is invalid', () => {
            it('returns false', () => {
                const data = {};
                const rule = {
                    condition: OR_CONDITION,
                    options: {
                        rules: [
                            {
                                condition: 'condition1'
                            },
                            {
                                condition: 'condition2'
                            }
                        ]
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(false)
                        .mockReturnValueOnce(false)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator)
                        .mockReturnValueOnce(validator)
                };

                const orValidator = new OrValidator(ruleTree);

                expect(orValidator.validate(data, rule)).toBe(false);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rules[0].condition);
                expect(ruleTree.getValidator.mock.calls[1][0]).toBe(rule.options.rules[1].condition);
                expect(validator.validate.mock.calls[0][0]).toBe(data);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rules[0]);
                expect(validator.validate.mock.calls[1][0]).toBe(data);
                expect(validator.validate.mock.calls[1][1]).toBe(rule.options.rules[1]);
            });
        });
    });
});
