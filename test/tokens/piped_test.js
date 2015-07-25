var Language = require("../../lib/language.js");
var PipedToken = require("../../lib/tokens/piped.js");

var assert = require("assert");
var helper = require("./../test_helper");


describe('Tokens.Piped', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      helper.fixtures.loadJSON("languages/en-US", function(data) {
        var language = new Language(data);

        var token = new PipedToken("{count || message}");

        assert.deepEqual("count", token.short_name);
        assert.deepEqual("||", token.separator);
        assert.deepEqual(["message"], token.parameters);

        assert.ok(token.isValueDisplayedInTranslation());

        var context = token.getContextForLanguage(language);
        assert.ok(context);

        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{count || message, messages}");
        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{count || one: message, other: messages}");
        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{user | He, She}");
        context = token.getContextForLanguage(language);
        assert.ok(context);

        assert.deepEqual({"male":"He","female":"She","other":"He/She"}, token.generateValueMapForContext(context));

      });
    });
  });

  describe('substitution', function(){
    it('should correctly substitute a token', function() {
      helper.fixtures.loadJSON("languages/en-US", function(data) {
        var language = new Language(data);

        var token = new PipedToken("{count || message}");
        assert.deepEqual("5 messages", token.substitute("{count || message}", {count: 5}, language));
        assert.deepEqual("1 message", token.substitute("{count || message}", {count: 1}, language));

        token = new PipedToken("{user | He, She}");
        var context = token.getContextForLanguage(language);
        assert.ok(context);
        assert.deepEqual({"male":"He","female":"She","other":"He/She"}, token.generateValueMapForContext(context));

        assert.deepEqual("He", token.substitute("{user | He, She}", {user: {gender: "male"}}, language));
        assert.deepEqual("She", token.substitute("{user | He, She}", {user: {gender: "female"}}, language));
        assert.deepEqual("He/She", token.substitute("{user | He, She}", {user: {gender: "unknown"}}, language));

        token = new PipedToken("{user | male: He, it: She}");
        var context = token.getContextForLanguage(language);
        assert.ok(context);
        assert.deepEqual({"male":"He","it":"She"}, token.generateValueMapForContext(context));

        assert.deepEqual("{user | male: He, it: She}", token.substitute("{user | male: He, it: She}", {user: {gender: "female"}}, language));

      });
    });
  });
});