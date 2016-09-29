/**
 * Copyright (c) 2015 Translation Exchange, Inc.
 *
 *  _______                  _       _   _             ______          _
 * |__   __|                | |     | | (_)           |  ____|        | |
 *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___
 *    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \|  __| \ \/ / __| '_ \ / _` | '_ \ / _` |/ _ \
 *    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/
 *    |_|_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_|______/_/\_\___|_| |_|\__,_|_| |_|\__, |\___|
 *                                                                                        __/ |
 *                                                                                       |___/
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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

  describe('replaceBetween', function(){
    it('should correctly replace only strings in a specific segment', function(){
      var result = utils.replaceBetween(6, 10, "I have 5 apples and 5 oranges.", "5", "9");
      assert.deepEqual("I have 9 apples and 5 oranges.", result);
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
      
      var cookie = decodeURIComponent("eyJsb2NhbGUiOiJydSJ9%250A");
      var data = utils.decode(cookie);
      assert.deepEqual(data, {"locale":"ru"});

      cookie = "eyJsb2NhbGUiOiJydSJ9%250A";
      data = utils.decode(cookie);
      assert.deepEqual(data, {"locale":"ru"});

      cookie = decodeURIComponent("eyJsb2NhbGUiOm51bGwsInRyYW5zbGF0b3IiOnsiaWQiOjEsImVtYWlsIjoi%250AbWljaGFlbEB0cjhuaHViLmNvbSIsIm5hbWUiOiJiZXJrIiwiaW1hZ2VfdXJs%250AIjoiaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLzg3MzQ1YjIyNzEyNTll%250AMmVlZWEzYjAxMTQyZjlhZjU2LnBuZz9zPTY1IiwiaW5saW5lIjpmYWxzZSwi%250AbWFuYWdlciI6ZmFsc2UsImZlYXR1cmVzIjp7ImZhbGxiYWNrX2xhbmd1YWdl%250AIjpmYWxzZSwic2hvd19sb2NrZWRfa2V5cyI6ZmFsc2V9fX0%3D%250A");
      data = utils.decode(cookie);
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

      cookie = "eyJsb2NhbGUiOm51bGwsInRyYW5zbGF0b3IiOnsiaWQiOjEsImVtYWlsIjoi%250AbWljaGFlbEB0cjhuaHViLmNvbSIsIm5hbWUiOiJiZXJrIiwiaW1hZ2VfdXJs%250AIjoiaHR0cHM6Ly9ncmF2YXRhci5jb20vYXZhdGFyLzg3MzQ1YjIyNzEyNTll%250AMmVlZWEzYjAxMTQyZjlhZjU2LnBuZz9zPTY1IiwiaW5saW5lIjpmYWxzZSwi%250AbWFuYWdlciI6ZmFsc2UsImZlYXR1cmVzIjp7ImZhbGxiYWNrX2xhbmd1YWdl%250AIjpmYWxzZSwic2hvd19sb2NrZWRfa2V5cyI6ZmFsc2V9fX0%3D%250A";
      data = utils.decode(cookie);
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