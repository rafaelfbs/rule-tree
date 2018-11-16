import { Parser } from "../../../src/selectors/parser/Parser";
import { Tokenizer } from "../../../src/selectors/tokenizer/Tokenizer";

describe("Parser", () => {
    describe("#parse", () => {
        const tokenizer = new Tokenizer();
        const parser = new Parser(tokenizer);

        it("throws an exception when identifier is invalid", () => {
            expect(() => parser.parse("[prop")).toThrow("Unexpected token \"[\" at position \"0\"");
            expect(() => parser.parse("]prop")).toThrow("Unexpected token \"]\" at position \"0\"");
            expect(() => parser.parse("..prop")).toThrow("Unexpected token \".\" at position \"1\"");
            expect(() => parser.parse(".#prop")).toThrow("Unexpected token \"#\" at position \"1\"");
            expect(() => parser.parse(".[prop")).toThrow("Unexpected token \"[\" at position \"1\"");
            expect(() => parser.parse(".]prop")).toThrow("Unexpected token \"]\" at position \"1\"");
            expect(() => parser.parse("prop[.")).toThrow("Unexpected token \".\" at position \"5\"");
            expect(() => parser.parse("prop[#")).toThrow("Unexpected token \"#\" at position \"5\"");
            expect(() => parser.parse("prop[[")).toThrow("Unexpected token \"[\" at position \"5\"");
            expect(() => parser.parse("prop[x")).toThrow("Unexpected token \"x\" at position \"5\"");
            expect(() => parser.parse("prop.")).toThrow("Unexpected token \"\" at position \"5\"");
            expect(() => parser.parse("prop#")).toThrow("Unexpected token \"\" at position \"5\"");
            expect(() => parser.parse("prop[")).toThrow("Unexpected token \"\" at position \"5\"");
            expect(() => parser.parse("prop]")).toThrow("Unexpected token \"]\" at position \"4\"");
        });
    });
});
