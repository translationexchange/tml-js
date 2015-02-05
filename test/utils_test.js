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
      
      var cookie = "eyJsb2NhbGUiOiJydSJ9%250A";
      var data = utils.decodeAndVerifyParams(cookie);
      assert.deepEqual(data, {"locale":"ru"});

      var cookie = "eyJsb2NhbGUiOm51bGwsInRyYW5zbGF0b3IiOnsiaWQiOjEsImVtYWlsIjoi%250AbWljaGFlbEB0cjhuaHViLmNvbSIsIm5hbWUiOiJiZXJrIiwiaW1hZ2VfdXJs%250AIjoiaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLzg3MzQ1YjIyNzEyNTll%250AMmVlZWEzYjAxMTQyZjlhZjU2LnBuZz9zPTY1IiwiaW5saW5lIjpmYWxzZSwi%250AbWFuYWdlciI6ZmFsc2UsImZlYXR1cmVzIjp7ImZhbGxiYWNrX2xhbmd1YWdl%250AIjpmYWxzZSwic2hvd19sb2NrZWRfa2V5cyI6ZmFsc2V9fX0%3D%250A";
      var data = utils.decodeAndVerifyParams(cookie);

      assert.deepEqual(data, { locale: null, translator: {
        id: 1,
        email: 'michael@tr8nhub.com',
        name: 'berk',
        image_url: 'https://gravatar.com/avatar/87345b2271259e2eeea3b01142f9af56.png?s=65',
        inline: false,
        manager: false,
        features: { fallback_language: false, show_locked_keys: false
        }
      }});

    });
  });

});