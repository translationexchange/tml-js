var utils = require("../lib/utils.js");
var assert = require("assert");

describe('Utils', function(){
  describe('splitBySentence', function(){
    it('should correctly split text into sentences', function(){
      var matches = utils.splitSentences("Hello World");
      assert.deepEqual("Hello World", matches[0]);

      var matches = utils.splitSentences("This is the first sentence. Followed by the second one.");
      assert.deepEqual(["This is the first sentence.","Followed by the second one."], matches);

      var text = "This is the first sentence. Followed by the second one.";
      var matches = utils.splitSentences(text);
      assert.deepEqual(["This is the first sentence.","Followed by the second one."], matches);
    });
  });

  describe('stripTags', function(){
    it('should correctly remove all html tags', function(){
      var result = utils.stripTags('<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>');
      assert.deepEqual("jsdom's Homepage", result);
    });
  });

  describe('hashValue', function(){
    it('should return value from a hash', function(){
      var result = utils.hashValue({a: {b: {c: "hello"}}}, "a.b.c");
      assert.deepEqual("hello", result);
      var result = utils.hashValue({a: {b: {c: "hello"}}}, "a.b");
      assert.deepEqual({"c":"hello"}, result);
      var result = utils.hashValue({a: {b: {c: "hello"}}}, "a.b.f");
      assert.deepEqual(null, result);
      var result = utils.hashValue({f: "a"}, "a.b");
      assert.deepEqual(null, result);
    });
  });


  describe("extend", function() {
    it("should use extend", function() {
      assert.ok(utils.extend);
      var o = {prop: 10};
      o = utils.extend(o, { prop: 20 }, { prop: 30, name: "Foo" }, { prop: 40, address: "Bar" });
      assert.ok(o.name);
      assert.equal(o.address, 'Bar')
      assert.equal(o.prop,40);
    });
  });

});