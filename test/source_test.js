var Source = require("../lib/source.js");
var helper = require("./test_helper");

var assert = require("assert");

describe('Source', function(){
  describe('creation', function(){
    it('should correctly create a source with translations', function() {
      helper.fixtures.load("translations/ru/source1", function(data) {
        var source = new Source({source: "abc"});
        source.updateTranslations('ru', data);
        assert.ok(source.getTranslations('ru', 'b329f56db19684d04e032864c225c574') != null);
        assert.ok(source.getTranslations('ru', 'abc') == null);
        assert.ok(source.getTranslations('fr', 'abc') == null);
      });
    });
  });
});
