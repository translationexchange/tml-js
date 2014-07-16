var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.LanguageCase', function(){
  describe('creation', function(){
    it('should correctly create a case', function() {
      helper.fixtures.load("cases/en-US/plural", function(data) {
        var context = new Tr8n.LanguageCase(data);
//        assert.ok(context.isAppliedToToken("num"));

      });
    });
  });
});
