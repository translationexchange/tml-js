var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.TranslationKey', function(){
  describe('creation', function(){
    it('should correctly create a key', function() {
      helper.fixtures.load("languages/en-US", function(data) {
        var language = new Tr8n.Language(data);

        var tkey = new Tr8n.TranslationKey({
          label: "Hello World"
        });

        assert.equal("Hello World", tkey.translate(language));

        var tkey = new Tr8n.TranslationKey({
          label: "Hello {user}"
        });

//        assert.equal("Hello Michael", tkey.translate(language, {user: "Michael"}));
      });

    });
  });
});
