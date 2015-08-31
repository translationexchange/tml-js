var TranslationKey  = require("../lib/translation_key.js");
var Translation     = require("../lib/translation.js");
var Language        = require("../lib/language.js");
var helper          = require("./test_helper");

var assert = require("assert");

describe('TranslationKey', function(){
  describe('creation', function(){
    it('should correctly create a key', function(done) {
      helper.fixtures.loadJSON("languages/en-US", function(data) {
        var language = new Language(data);

        var tkey = new TranslationKey({
          label: "Hello World"
        });

        assert.equal("Hello World", tkey.translate(language));

        tkey = new TranslationKey({
          label: "Hello {user}"
        });

        assert.equal("Hello Michael", tkey.translate(language, {user: "Michael"}));

        tkey = new TranslationKey({
          label: "Hello {user.name}"
        });

        assert.equal("Hello Michael", tkey.translate(language, {user: {name: "Michael"}}));

        tkey = new TranslationKey({
          label: "Hello {user.name}, your emails is {user.email}"
        });

        assert.equal("Hello Michael, your emails is michael@test.com", tkey.translate(language, {user: {name: "Michael", email: "michael@test.com"}}));

        tkey = new TranslationKey({
          label: "Hello [bold: World]"
        });

        assert.equal("Hello <strong>World</strong>", tkey.translate(language, {bold: "<strong>{$0}</strong>"}));
        assert.equal("Hello <strong>World</strong>", tkey.translate(language));


        tkey = new TranslationKey({
          label: "You have [bold: {count} messages]"
        });

        assert.equal("You have <strong>5 messages</strong>", tkey.translate(language, {count: 5}));

        tkey = new TranslationKey({
          label: "You have [bold: {count || message}]"
        });

        assert.equal("You have <strong>5 messages</strong>", tkey.translate(language, {count: 5}));

        tkey = new TranslationKey({
          label: "[link: You] have [bold: {count || message, messages}]"
        });

        assert.equal("<a href='google.com'>You</a> have <strong>5 messages</strong>", tkey.translate(language, {count: 5, link: {href: "google.com"}}));

        done();
      });
    });
  });

  describe('translations', function(){
    it('should correctly translate keys', function(done) {
      helper.models.languages(["en-US", "ru"], function(languages) {

        var tkey = new TranslationKey({
          label: "Hello World",
          locale: "en-US",
          language: languages["en-US"]
        });

        var translation = new Translation({
          label: "Привет Мир",
          locale: "ru",
          language: languages["ru"]
        });

        assert.equal("Hello World", tkey.translate(languages["ru"]));

        tkey.addTranslation(translation);
        assert.equal("Привет Мир", tkey.translate(languages["ru"]));


        tkey = new TranslationKey({
          label: "Hello [bold: World]",
          locale: "en-US",
          language: languages["en-US"]
        });

        assert.equal("Hello <strong>World</strong>", tkey.translate(languages["ru"]));

        tkey.addTranslation(new Translation({
          label: "Привет [bold: Мир]",
          locale: "ru",
          language: languages["ru"]
        }));

        assert.equal("Привет <strong>Мир</strong>", tkey.translate(languages["ru"]));


        tkey = new TranslationKey({
          label: "You have {count || message}",
          locale: "en-US",
          language: languages["en-US"]
        });

        assert.equal("You have 1 message", tkey.translate(languages["ru"], {count: 1}));
        assert.equal("You have 5 messages", tkey.translate(languages["ru"], {count: 5}));

        tkey.addTranslation(new Translation({
          label: "У вас есть {count || one: сообщение, few: сообщения, other: сообщений}",
          locale: "ru",
          language: languages["ru"]
        }));

        assert.equal("У вас есть 1 сообщение", tkey.translate(languages["ru"], {count: 1}));
        assert.equal("У вас есть 2 сообщения", tkey.translate(languages["ru"], {count: 2}));
        assert.equal("У вас есть 5 сообщений", tkey.translate(languages["ru"], {count: 5}));

        tkey.resetTranslations();

        tkey.addTranslation(new Translation({
          label: "У вас есть {count || сообщение, сообщения, сообщений}",
          locale: "ru",
          language: languages["ru"]
        }));

        assert.equal("У вас есть 1 сообщение", tkey.translate(languages["ru"], {count: 1}));
        assert.equal("У вас есть 2 сообщения", tkey.translate(languages["ru"], {count: 2}));
        assert.equal("У вас есть 5 сообщений", tkey.translate(languages["ru"], {count: 5}));

        tkey = new TranslationKey({
          label: "{user} has [bold: {count || message}] in {user | his, her} inbox.",
          locale: "en-US",
          language: languages["en-US"]
        });

        assert.equal("Michael has <strong>1 message</strong> in his inbox.", tkey.translate(languages["ru"], {user: {gender: "male", value: "Michael"}, count: 1}));

        tkey.addTranslation(new Translation({
          label: "У {user::gen} есть [bold: {count || сообщение, сообщения, сообщений}] в почтовом ящике.",
          locale: "ru",
          language: languages["ru"]
        }));

        assert.equal("У Михаила есть <strong>1 сообщение</strong> в почтовом ящике.", tkey.translate(languages["ru"], {user: {gender: "male", value: "Михаил"}, count: 1}));
        assert.equal("У Михаила есть <strong>2 сообщения</strong> в почтовом ящике.", tkey.translate(languages["ru"], {user: {gender: "male", value: "Михаил"}, count: 2}));
        assert.equal("У Михаила есть <strong>5 сообщений</strong> в почтовом ящике.", tkey.translate(languages["ru"], {user: {gender: "male", value: "Михаил"}, count: 5}));

        done();

      });
    });
  });

});
