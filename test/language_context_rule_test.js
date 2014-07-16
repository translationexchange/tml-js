var Tr8n = require("../lib/tr8n");
var assert = require("assert");

describe('Tr8n.LanguageContextRule', function(){
  describe('creation', function(){
    it('test fallback', function() {
      var rule = new Tr8n.LanguageContextRule({keyword: "other"});
      assert.ok(rule.isFallback());

      rule = new Tr8n.LanguageContextRule({conditions: "(= 1 @var)"});
      assert.deepEqual(["=",1,"@var"], rule.getConditionsExpression());

      rule = new Tr8n.LanguageContextRule({conditions: "(= 1 @var)", conditions_expression: ["=",1,"@var"]});
      assert.deepEqual(["=",1,"@var"], rule.getConditionsExpression());
    });
  });
  describe('evaluation', function(){
    it('test fallback', function() {
      var rule = new Tr8n.LanguageContextRule({keyword: "other"});
      assert.ok(rule.evaluate());

      rule = new Tr8n.LanguageContextRule({conditions: "(= 1 @var)"});
      console.log(rule.evaluate({"var": "1"}));
//      assert.ok(rule.evaluate({"@var": "1"}));

    });
  });
});
