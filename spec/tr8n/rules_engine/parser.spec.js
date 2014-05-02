var module = require("../../../src/tr8n/rules_engine/parser.js");

describe("Parser", function() {
    it("parses the expression", function() {
        expect(new module.Parser("(+ 1 1)").parse()).toEqual(["+", 1, 1]);
        expect(new module.Parser("(+ (+ 1 1) 1)").parse()).toEqual([ '+', [ '+', 1, 1 ], 1 ]);
    });
});