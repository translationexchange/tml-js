var LanguageContextRule = require("../lib/language_context_rule.js");

var assert = require("assert");

describe('LanguageContextRule', function(){
  describe('creation', function(){
    it('test fallback', function() {
      var rule = new LanguageContextRule({keyword: "other"});
      assert.ok(rule.isFallback());

      rule = new LanguageContextRule({conditions: "(= 1 @var)"});
      assert.deepEqual(["=",1,"@var"], rule.getConditionsExpression());

      rule = new LanguageContextRule({conditions: "(= 1 @var)", conditions_expression: ["=",1,"@var"]});
      assert.deepEqual(["=",1,"@var"], rule.getConditionsExpression());
    });
  });
  describe('evaluation', function(){
    it('test fallback', function() {
      var rule = new LanguageContextRule({keyword: "other"});
      assert.ok(rule.evaluate());

      rule = new LanguageContextRule({conditions: "(= 1 @var)"});
      assert.ok(rule.evaluate({"@var": "1"}));

      rule = new LanguageContextRule({conditions: "(= (+ @n 10) 15)"});
      assert.ok(rule.evaluate({"@n": 5}));
    });
  });
});
