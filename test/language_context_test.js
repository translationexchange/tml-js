var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.LanguageContext', function(){
  describe('creation', function(){
    it('should correctly create a context', function() {
      helper.fixtures.load("contexts/ru/number", function(data) {
        var context = new Tr8n.LanguageContext(data);
        assert.ok(context.isAppliedToToken("num"));

        assert.ok(context.getFallbackRule() != null);
        assert.ok(context.getFallbackRule().isFallback());

        assert.deepEqual(["@n"], context.variables);
        assert.deepEqual({"@n": 5}, context.getVars(5));

        context.getConfig().variables["@n"] = 1;
        assert.deepEqual({"@n": 5}, context.getVars(5));

      });

      helper.fixtures.load("contexts/ru/gender", function(data) {
        var context = new Tr8n.LanguageContext(data);
        assert.ok(context.isAppliedToToken("user"));

        assert.deepEqual(["@gender"], context.variables);
        assert.deepEqual({"@gender": "male"}, context.getVars({gender: "male"}));

        context.getConfig().variables["@gender"] = function(obj) {
          return (obj.g == 0 ? "female" : "male");
        };

        assert.deepEqual({"@gender": "male"}, context.getVars({g: 1}));
        assert.deepEqual({"@gender": "female"}, context.getVars({g: 0}));

        assert.deepEqual("male", context.findMatchingRule({g: 1}).keyword);
        assert.deepEqual("female", context.findMatchingRule({g: 0}).keyword);
        assert.deepEqual("male", context.findMatchingRule({g: 2}).keyword);
      });

    });
  });
});
