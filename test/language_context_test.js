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

var LanguageContext = require("../lib/language_context.js");
var helper = require("./test_helper");
var assert = require("assert");

describe('LanguageContext', function(){
  describe('creation', function(){
    it('should correctly create a context', function(done)
    {
      helper.fixtures.loadJSON("contexts/ru/number", function (err, data)
      {
        if (err) return done(err);
        var context = new LanguageContext(data);
        assert.ok(context.isAppliedToToken("num"));

        assert.ok(context.getFallbackRule() != null);
        assert.ok(context.getFallbackRule().isFallback());

        assert.deepEqual(["@n"], context.variables);
        assert.deepEqual({"@n": 5}, context.getVars(5));

        context.getConfig().variables["@n"] = 1;
        assert.deepEqual({"@n": 5}, context.getVars(5));
        done();
      });
    });

    it('should correctly create a context 2', function(done) {
      helper.fixtures.loadJSON("contexts/ru/gender", function(err, data)
      {
        if (err) return done(err);
        var context = new LanguageContext(data);
        assert.ok(context.isAppliedToToken("user"));

        assert.deepEqual(["@gender"], context.variables);
        assert.deepEqual({"@gender": "male"}, context.getVars({gender: "male"}));

        var temp = context.getConfig().variables["@gender"];
        context.getConfig().variables["@gender"] = function(obj) {
          return (obj.g == 0 ? "female" : "male");
        };

        assert.deepEqual({"@gender": "male"}, context.getVars({g: 1}));
        assert.deepEqual({"@gender": "female"}, context.getVars({g: 0}));

        assert.deepEqual("male", context.findMatchingRule({g: 1}).keyword);
        assert.deepEqual("female", context.findMatchingRule({g: 0}).keyword);
        assert.deepEqual("male", context.findMatchingRule({g: 2}).keyword);

        context.getConfig().variables["@gender"] = temp;
        done();
      });

    });
  });
});
