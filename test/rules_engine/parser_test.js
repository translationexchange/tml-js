var Tr8n = require("../../lib/tr8n");
var assert = require("assert");

describe('RulesEngine.Parser', function(){
  describe('parsing', function(){
    it('should generate correct arrays', function(){
      var parser = new Tr8n.RulesEngine.Parser("(+ 1 1)");
      assert.deepEqual([ '(', '+', '1', '1', ')' ], parser.tokens);
      assert.deepEqual([ '+', 1, 1 ], parser.parse());

      var examples = {
        "@value" : '@value',
        "(= '1' @value)" : ["=", '1', '@value'],
        "(= 1 @value)" : ["=", 1, '@value'],
        "(= 1 1)" : ["=", 1, 1],
        "(+ 1 1)" : ["+", 1, 1],
        "(= 1 (mod n 10))" : ["=", 1, ["mod", "n", 10]],
        "(&& 1 1)" : ["&&", 1, 1],
        "(mod @n 10)" : ["mod", "@n", 10],
        "(&& (= 1 (mod @n 10)) (!= 11 (mod @n 100)))" : ["&&", ["=", 1, ["mod", "@n", 10]], ["!=", 11, ["mod", "@n", 100]]],
        "(&& (in '2..4' (mod @n 10)) (not (in '12..14' (mod @n 100))))" : ["&&", ["in", "2..4", ["mod", "@n", 10]], ["not", ["in", "12..14", ["mod", "@n", 100]]]],
        "(|| (= 0 (mod @n 10)) (in '5..9' (mod @n 10)) (in '11..14' (mod @n 100)))" : ["||", ["=", 0, ["mod", "@n", 10]], ["in", "5..9", ["mod", "@n", 10]], ["in", "11..14", ["mod", "@n", 100]]]
      };

      Object.keys(examples).forEach(function (key) {
//          console.log(key);
          var parser = new Tr8n.RulesEngine.Parser(key);
          assert.deepEqual(examples[key], parser.parse());
      });
      

    });
  });
});
