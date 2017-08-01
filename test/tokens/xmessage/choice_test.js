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

var ChoiceToken = require("../../../lib/tokens/xmessage/choice.js");

var assert = require("assert");

describe('Tokens.XMessage.Choice', function () {

  describe('creation', function () {
    it('should correctly create a token', function () {
      var label = "I have {0,choice,singular#an apple|plural# apples}";

      var element = {
        "index":0,"type":"choice","styles":[
          {"key":"singular","items":[{"type":"trans","value":"an apple"}]},
          {"key":"plural","items":[{"type":"trans","value":"apples"}]}
        ]
      };

      var token = new ChoiceToken(label, element);
      assert.deepEqual(label, token.label);
      assert.deepEqual(0, token.short_name);
      assert.deepEqual('{0}', token.full_name);
      assert.deepEqual([ ], token.case_keys);
      assert.deepEqual([ 'number' ], token.context_keys);
      assert.deepEqual([ 'singular', 'plural' ], token.rule_keys);


      label = "{0} tagged {0,choice,male#himself|female#herself}";

      element = {
        "index":0,"type":"choice","styles":[
          {"key":"male","items":[{"type":"trans","value":"himself"}]},
          {"key":"female","items":[{"type":"trans","value":"herself"}]}
        ]
      };

      token = new ChoiceToken(label, element);
      assert.deepEqual(label, token.label);
      assert.deepEqual(0, token.short_name);
      assert.deepEqual('{0}', token.full_name);
      assert.deepEqual([ ], token.case_keys);
      assert.deepEqual([ 'male', 'female' ], token.rule_keys);
      assert.deepEqual([ 'gender' ], token.context_keys);

      label = "{:user} birthday {:date,date,past#was|present#is|future#will be} on {:date}";

      element = {
        "index":':date',"type":"choice","styles":[
          {"key":"past","items":[{"type":"trans","value":"was"}]},
          {"key":"present","items":[{"type":"trans","value":"is"}]},
          {"key":"future","items":[{"type":"trans","value":"will be"}]}
        ]
      };

      token = new ChoiceToken(label, element);
      assert.deepEqual(label, token.label);
      assert.deepEqual(':date', token.short_name);
      assert.deepEqual('{:date}', token.full_name);
      assert.deepEqual([ ], token.case_keys);
      assert.deepEqual([ 'past', 'present', 'future' ], token.rule_keys);
      assert.deepEqual([ 'date' ], token.context_keys);

    });
  });

});

