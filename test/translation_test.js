var Translation = require("../lib/translation.js");
var helper = require("./test_helper");

var assert = require("assert");

describe('Translation', function(){
  describe('creation', function(){
    it('should correctly create a key', function(done) {
      helper.models.languages(["en-US", "ru"], function(languages) {
//        console.log(languages);

        var translation = new Translation({
          label: "Hello {user}",
          language: languages["en-US"]
        });

        assert.ok(!translation.hasContextRules());
        assert.ok(translation.isValidTranslation({user: {gender: "male"}}));

        translation = new Translation({
          label: "Hello {user}", context: {user: {gender: "male"}},
          language: languages["en-US"]
        });

        assert.ok(translation.hasContextRules());
        assert.ok(translation.isValidTranslation({user: {gender: "male"}}));
        assert.ok(!translation.isValidTranslation({user: {gender: "female"}}));

        done();

      });
    });
  });
});
