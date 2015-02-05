//var Tml = require("../../lib/tml");

var Evaluator = require("../../lib/rules_engine/evaluator.js");
var assert = require("assert");

describe('RulesEngine.Evaluator', function(){
  
  describe('evaluating', function(){
    it('should generate correct arrays', function(){

      var e = new Evaluator();
      
      e.evaluate(["label", "greeting", "hello world"]);
      assert.deepEqual({"greeting": "hello world"}, e.vars);

      assert.deepEqual(e.evaluate(["quote", [1,2,3]]), [1,2,3]);
      assert.deepEqual(e.evaluate(["quote", ["a","b","c"]]), ["a","b","c"]);

      assert.deepEqual(e.evaluate(["car", ["+", 1, 2]]), 1);
      assert.deepEqual(e.evaluate(["cdr", ["+", 1, 2]]), [1, 2]);
      assert.deepEqual(e.evaluate(["cons", 1, ["quote", [2, 3]]]), [1, 2, 3]);

      assert.deepEqual(e.evaluate(["eq", 1, 1]), true);

      assert.deepEqual(e.evaluate(["atom", "hello"]), true);
      assert.deepEqual(e.evaluate(["atom", 1]), true);
      assert.deepEqual(e.evaluate(["atom", 1.4]), true);

      assert.deepEqual(e.evaluate(["cond", ["eq", 1, 1], 1, 0]), 1);
      assert.deepEqual(e.evaluate(["cond", ["eq", 1, 2], 1, 0]), 0);

      e.evaluate(["set", "greeting", "hello world"]);
      assert.deepEqual(e.vars.greeting, "hello world");

    });
  });

  describe('setting variables', function(){
    it('should set and get vars', function(){
      var e = new Evaluator();

      e.setVars({a: "a", "@b": "b"});
      assert.deepEqual({a: "a", "@b": "b"}, e.getVars());

      assert.deepEqual(e.evaluate(["=", "a", "a"]), true);
      assert.deepEqual(e.evaluate(["=", "@b", "b"]), true);
    });
  });

  describe('evaluating extensions', function(){
    it('should generate correct arrays', function(){

      var e = new Evaluator();
      assert.deepEqual(e.evaluate(["=", 1,1]), true);
      assert.deepEqual(e.evaluate(["=", 2,1]), false);

      assert.deepEqual(e.evaluate(["!=", 2,1]), true);
      assert.deepEqual(e.evaluate(["!=", 2,2]), false);

      assert.deepEqual(e.evaluate([">", 3,2]), true);
      assert.deepEqual(e.evaluate([">", 3,5]), false);

      assert.deepEqual(e.evaluate(["<", 3,5]), true);
      assert.deepEqual(e.evaluate(["<", 3,2]), false);

      assert.deepEqual(e.evaluate(["+", 1,2]), 3);
      assert.deepEqual(e.evaluate(["+", -1,2]), 1);

      assert.deepEqual(e.evaluate(["*", 2,10]), 20);

      assert.deepEqual(e.evaluate(["true"]), true);
      assert.deepEqual(e.evaluate(["false"]), false);

      assert.deepEqual(e.evaluate(["!", ["=", 1,2]]), true);

      assert.deepEqual(e.evaluate(["&&", ["=", 1, 1], ["=", 10, ["/", 20, 2]]]), true);
      assert.deepEqual(e.evaluate(["||", ["=", 1, 2], ["=", 10, ["/", 20, 2]]]), true);
      assert.deepEqual(e.evaluate(["and", ["=", 1, 1], ["=", 10, ["/", 20, 2]]]), true);
      assert.deepEqual(e.evaluate(["or", ["=", 1, 2], ["=", 10, ["/", 20, 2]]]), true);


      assert.deepEqual(e.evaluate(["if", ["=", 1, 2], 1, 0]), 0);
      assert.deepEqual(e.evaluate(["%", 23, 10]), 3);
      assert.deepEqual(e.evaluate(["mod", 23, 10]), 3);
    
      assert.deepEqual(e.evaluate(["match", "hello", "hello world"]), true);

      assert.deepEqual(e.evaluate(["match", "/hello/", "hello world"]), true);
      assert.deepEqual(e.evaluate(["match", "/^h/", "hello world"]), true);
      assert.deepEqual(e.evaluate(["match", "/^h.*d$/", "hello world"]), true);
      assert.deepEqual(e.evaluate(["match", "/^e/", "hello world"]), false);
      
      assert.deepEqual(e.evaluate(["in", "1,2", "1"]), true);
      assert.deepEqual(e.evaluate(["in", "1,2", 1]), true);
      assert.deepEqual(e.evaluate(["in", "1..10", 5]), true);
      assert.deepEqual(e.evaluate(["in", "1..10", 15]), false);      
      assert.deepEqual(e.evaluate(["in", "a,b,c", 'a']), true);
      assert.deepEqual(e.evaluate(["in", "a..c, d..z", 'h']), true);
      assert.deepEqual(e.evaluate(["in", "a..c, e..g", 'd']), false);
      
      assert.deepEqual(e.evaluate(["within", "0..3", 1.5]), true);
      assert.deepEqual(e.evaluate(["within", "0..3", "1.5"]), true);
      assert.deepEqual(e.evaluate(["within", "0..1", "1.5"]), false);
      
      assert.deepEqual(e.evaluate(["replace", "/^hello/", "hi", "hello world"]), "hi world");
      assert.deepEqual(e.evaluate(["replace", "o", "a", "hello world"]), "hella warld");
      assert.deepEqual(e.evaluate(["replace", "/world$/", "moon", "hello world"]), "hello moon");
      assert.deepEqual(e.evaluate(["replace", "/(vert|ind)ices$/i", "$1ex", "vertices"]), "vertex");

      assert.deepEqual(e.evaluate("hello world"), "hello world");

      assert.deepEqual(e.evaluate(["append", "world", "hello "]), "hello world");
      assert.deepEqual(e.evaluate(["prepend", "hello ", "world"]), "hello world");

      assert.deepEqual(e.evaluate(["count",[1,2,3,4,5]]), 5);
      assert.deepEqual(e.evaluate(["all",[1,2,3,4,5], 1]), false);
      assert.deepEqual(e.evaluate(["all",[1,1,1], 1]), true);

      assert.deepEqual(e.evaluate(["any",[1,2,3,4,5], 1]), true);
      assert.deepEqual(e.evaluate(["any",[2,3,4,5], 1]), true);

      assert.deepEqual(e.evaluate(["date","1/1/2010"]), new Date("1/1/2010"));
      assert.deepEqual(e.evaluate(["today"]), new Date());
      assert.deepEqual(e.evaluate(["time","1/1/2010 1:23:45"]), new Date("1/1/2010 1:23:45"));
      assert.deepEqual(e.evaluate(["now"]), Date.now());


    })
  })

});
