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


  describe("decodeAndVerifyParams", function() {
    it("should correctly parse out data", function() {
      
      var cookie = "bTdpV01KaG1jN0VMVDlhNlhZTWYzQitKcnozTzRFdlVxc2xhYzZBVm0xbz0K"
      var data = utils.decodeAndVerifyParams();
    });
  });

});