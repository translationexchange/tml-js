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

var LanguageCaseRule = require("../lib/language_case_rule.js");
var helper = require("./test_helper");
var assert = require("assert");

describe('LanguageCaseRule', function(){
  describe('creation', function(){
    it('should correctly create a case', function(done) {
      var rule = new LanguageCaseRule({
        "description":"Irregular word",
        "conditions":"(= 'move' @value)",
        "conditions_expression":[
          "=",
          "move",
          "@value"
        ],
        "operations":"(quote 'moves')",
        "operations_expression":[
          "quote",
          "moves"
        ]
      });
      assert.deepEqual(["=","move","@value"], rule.getConditionsExpression());
      assert.deepEqual(["quote", "moves"], rule.getOperationsExpression());

      assert.ok(rule.evaluate("move"));
      assert.equal("moves", rule.apply("move"));

      assert.ok(!rule.evaluate("moves"));

      rule = new LanguageCaseRule({
        "description":"Irregular word",
        "conditions":"(&& (= 'male' @gender) (= 'Michael' @name))",
        "operations":"(quote 'Hello Michael')"
      });

      assert.deepEqual(["&&",["=","male","@gender"],["=","Michael","@name"]], rule.getConditionsExpression());
      assert.deepEqual(["quote","Hello Michael"], rule.getOperationsExpression());

      rule = new LanguageCaseRule({
        "description":"Irregular word"
      });

      assert.ok(!rule.evaluate("move"));
      assert.equal("move", rule.apply("move"));

      done();
    });
  });
});
