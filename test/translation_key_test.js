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

        tkey = new Tr8n.TranslationKey({
          label: "Hello {user}"
        });

        assert.equal("Hello Michael", tkey.translate(language, {user: "Michael"}));

        tkey = new Tr8n.TranslationKey({
          label: "Hello {user.name}"
        });

        assert.equal("Hello Michael", tkey.translate(language, {user: {name: "Michael"}}));

        tkey = new Tr8n.TranslationKey({
          label: "Hello {user.name}, your emails is {user.email}"
        });

        assert.equal("Hello Michael, your emails is michael@test.com", tkey.translate(language, {user: {name: "Michael", email: "michael@test.com"}}));

        tkey = new Tr8n.TranslationKey({
          label: "Hello [bold: World]"
        });

        assert.equal("Hello <strong>World</strong>", tkey.translate(language, {bold: "<strong>{$0}</strong>"}));
        assert.equal("Hello <strong>World</strong>", tkey.translate(language));


        tkey = new Tr8n.TranslationKey({
          label: "You have [bold: {count} messages]"
        });

        assert.equal("You have <strong>5 messages</strong>", tkey.translate(language, {count: 5}));

        tkey = new Tr8n.TranslationKey({
          label: "You have [bold: {count || message}]"
        });

        assert.equal("You have <strong>5 messages</strong>", tkey.translate(language, {count: 5}));

        tkey = new Tr8n.TranslationKey({
          label: "[link: You] have [bold: {count || message, messages}]"
        });

        assert.equal("<a href='google.com'>You</a> have <strong>5 messages</strong>", tkey.translate(language, {count: 5, link: {href: "google.com"}}));

      });

    });
  });
});
