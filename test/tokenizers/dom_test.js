//var Tml = require('../../lib/tml');
var DomTokenizer = require('../../lib/tokenizers/dom.js');
var assert = require('assert');
var helper = require("../test_helper");

describe('Dom', function() {
  describe('parsing', function() {
    it('should properly parse the document', function(){
      var jsdom = require('node-jsdom');

      var original = "<html><head></head><body><p><a class='the-link' href='https://github.com/tmpvar/jsdom'>Welcome to TML testing!</a></p></body></html>";
      var doc = jsdom.jsdom(original);
      var tokenizer = new DomTokenizer(doc);
      var result = tokenizer.translate();
      assert.deepEqual(result, "<html><head></head><body><p><a class='the-link' href='https://github.com/tmpvar/jsdom'>{{{Welcome to TML testing!}}}</a></p></body></html>");

      [
        ["<html><head></head><body>Hello World</body></html>", "<html><head></head><body>{{{Hello World}}}</body></html>"],
        ["<html><head></head><body><div>Hello World</div></body></html>", "<html><head></head><body><div>{{{Hello World}}}</div></body></html>"],
        ["<html><head></head><body>Hello <a href='google.com'>World</a></body></html>", "<html><head></head><body>{{{Hello [link: World]}}}</body></html>"],
        ["<html><head></head><body>Hello <a href='google.com'>World</a><div><p>This is <strong>cool</strong>!</p></div></body></html>", "<html><head></head><body>{{{Hello [link: World]}}}<div><p>{{{This is [strong: cool]!}}}</p></div></body></html>"],
        ["<html><head></head><body><p>This is awesome!</p> <div>How does <strong>this work</strong>?</div></body></html>", "<html><head></head><body><p>{{{This is awesome!}}}</p> <div>{{{How does [strong: this work]?}}}</div></body></html>"],
        ["<html><head></head><body><span>Hello</span><span>World</span></body></html>", "<html><head></head><body>{{{[span: Hello][span: World]}}}</body></html>"]

      ].forEach(function(data) {
        var tokenizer = new DomTokenizer(jsdom.jsdom(data[0]));
        var result = tokenizer.translate();
        assert.deepEqual(result, data[1]);
      });

      [
        "example1"
      ].forEach(function(test) {
        helper.fixtures.load("translator/" + test + ".html", function (original) {
          helper.fixtures.load("translator/" + test + ".tml", function (expectation) {
            var tokenizer = new DomTokenizer(jsdom.jsdom(original));
            var result = tokenizer.translate();
            assert.deepEqual(result, expectation);
          });
        });
      });

    });
  });
});