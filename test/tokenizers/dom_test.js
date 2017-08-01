/**
 * Copyright (c) 2017 Translation Exchange, Inc.
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

//var Tml = require('../../lib/tml');
var DomTokenizer = require('../../lib/tokenizers/dom.js');
var assert = require('assert');
var helper = require('../test_helper');
var config = require('../../lib/configuration.js');

describe('Dom', function() {
  describe('parsing', function() {
    it('should properly parse the document', function(done){

      config.translator_options.debug = true;

      var jsdom = require("jsdom");

      var original = "<html><head></head><body><p><a class='the-link' href='https://github.com/tmpvar/jsdom'>Welcome to TML testing!</a></p></body></html>";
      var doc = new jsdom.JSDOM(original);
      var tokenizer = new DomTokenizer(doc.window.document);
      // tokenizer.debug(doc.window.document);

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
        var doc = new jsdom.JSDOM(data[0]);
        var tokenizer = new DomTokenizer(doc.window.document);
        var result = tokenizer.translate();
        assert.deepEqual(result, data[1]);
      });

      [
        "example1"
      ].forEach(function(test) {
        helper.fixtures.load("translator/" + test + ".html", function (err, original) {
          helper.fixtures.load("translator/" + test + ".tml", function (err, expectation) {
            var doc = new jsdom.JSDOM(original);
            var tokenizer = new DomTokenizer(doc.window.document);
            var result = tokenizer.translate();
            assert.equal(result, expectation);

            done();
          });
        });
      });

    });
  });
});