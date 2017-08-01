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

var Language = require("../../lib/language.js");
var MethodToken = require("../../lib/tokens/method.js");

var assert = require("assert");
var helper = require("./../test_helper");


describe('Tokens.Method', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      var token = new MethodToken("{user.name}");
      assert.deepEqual("Michael", token.getTokenValue({user: {name: "Michael"}}));
      assert.deepEqual("method", token.getDecorationName());
    });
  });


  describe('substitution', function(){
    it('should correctly substitute a token', function(done) {
      helper.fixtures.loadJSON("languages/en", function(err, data) {
        var language = new Language(data);

        var label = "{user} is {user.age} years old";
        var token = new MethodToken("{user.age}");

        var user = new function() {
          this.age = 5;
          this.name = "Michael";
          this.gender = "male";

          this.getAge = function() {
            return this.age;
          }.bind(this);

          return this;
        };
        assert.deepEqual("{user} is 5 years old", token.substitute(label, {user: user}, language));
        assert.deepEqual("{user} is {user.age} years old", token.substitute(label, {user1: user}, language));

        label = "{user} is {user.getAge} years old";
        token = new MethodToken("{user.getAge}");
        assert.deepEqual("{user} is 5 years old", token.substitute(label, {user: user}, language));

        done();
      });
    });
  });

});