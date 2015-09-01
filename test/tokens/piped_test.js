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

var Language = require("../../lib/language.js");
var PipedToken = require("../../lib/tokens/piped.js");

var assert = require("assert");
var helper = require("./../test_helper");


describe('Tokens.Piped', function(){
  describe('creation', function(){
    it('should correctly create a token', function(done) {
      helper.fixtures.loadJSON("languages/en-US", function(err, data) {
        if (err) return done(err);

        var language = new Language(data);

        var token = new PipedToken("{count || message}");

        assert.deepEqual("count", token.short_name);
        assert.deepEqual("||", token.separator);
        assert.deepEqual(["message"], token.parameters);

        assert.ok(token.isValueDisplayedInTranslation());

        var context = token.getContextForLanguage(language);
        assert.ok(context);

        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{count || message, messages}");
        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{count || one: message, other: messages}");
        assert.deepEqual({one: "message", other: "messages"}, token.generateValueMapForContext(context));

        token = new PipedToken("{user | He, She}");
        context = token.getContextForLanguage(language);
        assert.ok(context);

        assert.deepEqual({"male":"He","female":"She","other":"He/She"}, token.generateValueMapForContext(context));
        done();
      });
    });
  });

  describe('substitution', function(){
    it('should correctly substitute a token', function(done) {
      helper.fixtures.loadJSON("languages/en", function(err, data) {
        var language = new Language(data);

        var token = new PipedToken("{count || message}");
        assert.deepEqual("5 messages", token.substitute("{count || message}", {count: 5}, language));
        assert.deepEqual("1 message", token.substitute("{count || message}", {count: 1}, language));

        token = new PipedToken("{user | He, She}");
        var context = token.getContextForLanguage(language);
        assert.ok(context);
        assert.deepEqual({"male":"He","female":"She","other":"He/She"}, token.generateValueMapForContext(context));

        assert.deepEqual("He", token.substitute("{user | He, She}", {user: {gender: "male"}}, language));
        assert.deepEqual("She", token.substitute("{user | He, She}", {user: {gender: "female"}}, language));
        assert.deepEqual("He/She", token.substitute("{user | He, She}", {user: {gender: "unknown"}}, language));

        token = new PipedToken("{user | male: He, it: She}");
        var context = token.getContextForLanguage(language);
        assert.ok(context);
        assert.deepEqual({"male":"He","it":"She"}, token.generateValueMapForContext(context));

        assert.deepEqual("{user | male: He, it: She}", token.substitute("{user | male: He, it: She}", {user: {gender: "female"}}, language));
        done();
      });
    });
  });
});