var Tr8n = require("../lib/tr8n");
var assert = require("assert");

describe('Utils', function(){
  describe('splitBySentence', function(){
    it('should correctly split text into sentences', function(){
      var matches = Tr8n.Utils.splitSentences("Hello World");
      assert.deepEqual("Hello World", matches[0]);

      var matches = Tr8n.Utils.splitSentences("This is the first sentence. Followed by the second one.");
      assert.deepEqual(["This is the first sentence.","Followed by the second one."], matches);

      var text = "This is the first sentence. Followed by the second one.";
      var matches = Tr8n.Utils.splitSentences(text);
      assert.deepEqual(["This is the first sentence.","Followed by the second one."], matches);
    });
  });

  describe('stripTags', function(){
    it('should correctly remove all html tags', function(){
      var result = Tr8n.Utils.stripTags('<p><a class="the-link" href="https://github.com/tmpvar/jsdom">jsdom\'s Homepage</a></p>');
      assert.deepEqual("jsdom's Homepage", result);
    });
  });

  describe('hashValue', function(){
    it('should return value from a hash', function(){
      var result = Tr8n.Utils.hashValue({a: {b: {c: "hello"}}}, "a.b.c");
      assert.deepEqual("hello", result);
      var result = Tr8n.Utils.hashValue({a: {b: {c: "hello"}}}, "a.b");
      assert.deepEqual({"c":"hello"}, result);
      var result = Tr8n.Utils.hashValue({a: {b: {c: "hello"}}}, "a.b.f");
      assert.deepEqual(null, result);
      var result = Tr8n.Utils.hashValue({f: "a"}, "a.b");
      assert.deepEqual(null, result);
    });
  });

});