import { createRuleTree } from "../src";

describe("RuleTree", () => {
    it("throws an error when parser for rule is not registered", () => {
        const b = b => b
            .addCondition('c1', () => _ => _, () => () => true)
            .addCondition('c2', tree => tree.getParser('c3'), tree => tree.getValidator('c1'));
        const schema = {
            condition: 'c2'
        };

        expect(() => createRuleTree(schema, b)).toThrow("No parser \"c3\" found")
    });

    it("throws an error when validator for rule is not registered", () => {
        const b = b => b
            .addCondition('c1', () => _ => _, () => () => true)
            .addCondition('c2', tree => tree.getParser('c1'), tree => tree.getValidator('c3'));
        const schema = {
            condition: 'c2'
        };

        const tree = createRuleTree(schema, b);

        expect(() => tree.validate({})).toThrow("No validator \"c3\" found")
    });

    it("throws an error when parser factory does not return a parser", () => {
        const b = b => b
            .addCondition('c1', () => null, () => () => true);
        const schema = {
            condition: 'c1'
        };

        expect(() => createRuleTree(schema, b)).toThrow("No parser \"c1\" found")
    });

    it("throws an error when validator factory does not return a validator", () => {
        const b = b => b
            .addCondition('c1', () => _ => _, () => null);
        const schema = {
            condition: 'c1'
        };

        const tree = createRuleTree(schema, b);

        expect(() => tree.validate({})).toThrow("No validator \"c1\" found")
    });
});
