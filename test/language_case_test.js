var LanguageCase = require("../lib/language_case.js");
var helper = require("./test_helper");
var assert = require("assert");

describe('LanguageCase', function(){
  describe('creation', function(){
    it('should correctly create a case', function() {
      helper.fixtures.loadJSON("cases/en-US/plural", function(data) {
        var lcase = new LanguageCase(data);
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
