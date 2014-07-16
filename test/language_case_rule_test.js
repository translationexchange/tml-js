var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.LanguageCaseRule', function(){
  describe('creation', function(){
    it('should correctly create a case', function() {
      var rule = new Tr8n.LanguageCaseRule({
        "description":"Irregular word",
        "conditions":"(= 'move' @value)",
        "conditions_expression":[
          "=",
          "move",
          "@value"
        ],
        "operations":"(quote 'moves')",
        "operations_expression":[
          "quote",
          "moves"
        ]
      });

      assert.deepEqual(["=","move","@value"], rule.getConditionsExpression());
      assert.deepEqual(["quote", "moves"], rule.getOperationsExpression());

      assert.ok(rule.evaluate("move"));
      assert.equal("moves", rule.apply("move"));

      assert.ok(!rule.evaluate("moves"));

      rule = new Tr8n.LanguageCaseRule({
        "description":"Irregular word",
        "conditions":"(&& (= 'male' @gender) (= 'Michael' @name))",
        "operations":"(quote 'Hello Michael')"
      });

      assert.deepEqual(["&&",["=","male","@gender"],["=","Michael","@name"]], rule.getConditionsExpression());
      assert.deepEqual(["quote","Hello Michael"], rule.getOperationsExpression());

      rule = new Tr8n.LanguageCaseRule({
        "description":"Irregular word"
      });

      assert.ok(!rule.evaluate("move"));
      assert.equal("move", rule.apply("move"));

    });
  });
});
