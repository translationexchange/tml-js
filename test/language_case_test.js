var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.LanguageCase', function(){
  describe('creation', function(){
    it('should correctly create a case', function() {
      helper.fixtures.load("cases/en-US/plural", function(data) {
        var lcase = new Tr8n.LanguageCase(data);
        lcase.getConfig();

        var rule = lcase.findMatchingRule("move");
        assert.equal(rule.description, "Irregular word");
        assert.equal("moves", rule.apply("move"));

        assert.equal("moves", lcase.apply("move"));

        assert.equal("<a>moves</a>", lcase.apply("<a>move</a>"));

        lcase.application = "word";
        assert.equal("<a>items moves</a>", lcase.apply("<a>item move</a>"));

      });
    });
  });
});
