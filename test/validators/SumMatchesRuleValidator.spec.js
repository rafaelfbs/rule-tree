import { SUM_MATCHES_RULE_CONDITION } from "../../src";
import { SumMatchesRuleValidator } from "../../src/validators/SumMatchesRuleValidator";

describe('SumMatchesRuleValidator', () => {
    describe('#validate', () => {
        describe('when sum of data selected matches rule', () => {
            it('returns true', () => {
                const data = [ 1, 2, 3 ];
                const rule = {
                    condition: SUM_MATCHES_RULE_CONDITION,
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

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const sumMatchesRuleValidator = new SumMatchesRuleValidator(ruleTree);

                expect(sumMatchesRuleValidator.validate(data, rule)).toBe(true);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(validator.validate.mock.calls[0][0]).toBe(6);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });

        describe('when sum of data selected does not match rule', () => {
            it('returns false', () => {
                const data = [ 1, 2, 3 ];
                const rule = {
                    condition: SUM_MATCHES_RULE_CONDITION,
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

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const sumMatchesRuleValidator = new SumMatchesRuleValidator(ruleTree);

                expect(sumMatchesRuleValidator.validate(data, rule)).toBe(false);
                expect(ruleTree.getValidator.mock.calls[0][0]).toBe(rule.options.rule.condition);
                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(validator.validate.mock.calls[0][0]).toBe(6);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });

        describe('when list selector is defined', () => {
            it('calls data selector', () => {
                const data = { items: [ 1, 2, 3 ] };
                const rule = {
                    condition: SUM_MATCHES_RULE_CONDITION,
                    options: {
                        list: 'items',
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data.items)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const sumMatchesRuleValidator = new SumMatchesRuleValidator(ruleTree);
                sumMatchesRuleValidator.validate(data, rule);

                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(rule.options.list);
            });
        });

        describe('when filter rule is defined', () => {
            it('filters selected items from list', () => {
                const data = [ 1, 2, 3 ];
                const rule = {
                    condition: SUM_MATCHES_RULE_CONDITION,
                    options: {
                        filter: {
                            condition: 'condition'
                        },
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator1 = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                        .mockReturnValueOnce(false)
                        .mockReturnValueOnce(false)
                };

                const validator2 = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator1)
                        .mockReturnValueOnce(validator2),
                    dataSelector
                };

                const sumMatchesRuleValidator = new SumMatchesRuleValidator(ruleTree);
                sumMatchesRuleValidator.validate(data, rule);

                expect(validator1.validate.mock.calls[0][0]).toBe(1);
                expect(validator1.validate.mock.calls[0][1]).toBe(rule.options.filter);
                expect(validator1.validate.mock.calls[1][0]).toBe(2);
                expect(validator1.validate.mock.calls[1][1]).toBe(rule.options.filter);
                expect(validator1.validate.mock.calls[2][0]).toBe(3);
                expect(validator1.validate.mock.calls[2][1]).toBe(rule.options.filter);
                expect(validator2.validate.mock.calls[0][0]).toBe(1);
                expect(validator2.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });

        describe('when data selector is defined', () => {
            it('maps selected items from list', () => {
                const data = [ { value: 1 }, { value: 2 }, { value: 3 } ];
                const rule = {
                    condition: SUM_MATCHES_RULE_CONDITION,
                    options: {
                        data: 'value',
                        rule: {
                            condition: 'condition'
                        }
                    }
                };

                const validator = {
                    validate: jest.fn()
                        .mockReturnValueOnce(true)
                };

                const dataSelector = {
                    select: jest.fn()
                        .mockReturnValueOnce(data)
                        .mockReturnValueOnce(data[0].value)
                        .mockReturnValueOnce(data[1].value)
                        .mockReturnValueOnce(data[2].value)
                };

                const ruleTree = {
                    getValidator: jest.fn()
                        .mockReturnValueOnce(validator),
                    dataSelector
                };

                const sumMatchesRuleValidator = new SumMatchesRuleValidator(ruleTree);
                sumMatchesRuleValidator.validate(data, rule);

                expect(dataSelector.select.mock.calls[0][0]).toBe(data);
                expect(dataSelector.select.mock.calls[0][1]).toBe(undefined);
                expect(dataSelector.select.mock.calls[1][0]).toBe(data[0]);
                expect(dataSelector.select.mock.calls[1][1]).toBe(rule.options.data);
                expect(dataSelector.select.mock.calls[2][0]).toBe(data[1]);
                expect(dataSelector.select.mock.calls[2][1]).toBe(rule.options.data);
                expect(dataSelector.select.mock.calls[3][0]).toBe(data[2]);
                expect(dataSelector.select.mock.calls[3][1]).toBe(rule.options.data);
                expect(validator.validate.mock.calls[0][0]).toBe(6);
                expect(validator.validate.mock.calls[0][1]).toBe(rule.options.rule);
            });
        });
    });
});
