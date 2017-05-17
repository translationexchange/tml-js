/**
 * Copyright (c) 2016 Translation Exchange, Inc.
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

var config = require('../configuration');
var xmessage_parser = require('../helpers/xmessage_parser');

/**
 * XMessage tokenizer
 *
 * @param label
 * @constructor
 */
var XMessageTokenizer = function (label) {
  this.label = label;
  this.tokenize();
};

XMessageTokenizer.prototype = {

  /**
   * Parses and prepares the string
   */
  tokenize: function () {
    this.tree = xmessage_parser.parse(this.label);
    console.log(this.tree);
  },


  choice: function (language, val) {
    if (language.locale == 'en')
      if (typeof val == 'number')
        return (val == 1) ? 'singular' : 'plural';

    if (language.locale == 'ru' && typeof val == 'number') {
        var ctx = language.getContextByKeyword('number');
        if (ctx) {
          var rule = ctx.findMatchingRule(val);
          if (rule) return rule.keyword;
        }
    }

    return 'other';
  },

  compile: function (language, exp, buffer, params) {
    var self = this;
    var style = null;
    exp.forEach(function (el) {
      if (el.styles) {
        if (el.type == 'choice') {
          var key = self.choice(language, params[el.index]);
          style = el.styles.find(function (style) {
            return (style.key == key);
          });
          if (style) {
            self.compile(language, style.items, buffer, params);
          }
        } else if (el.type == 'map') {
          style = el.styles.find(function (style) {
            return (style.key == params[el.index])
          });
          self.compile(language, style.items, buffer, params);
        } else if (el.type == 'anchor') {
          buffer.push("<a href='" + params[el.index] + "'>");
          self.compile(language, el.styles[0].items, buffer, params);
          buffer.push('</a>');
        } else {
          self.compile(language, el.styles[0].items, buffer, params);
        }
      } else {
        var val;
        if (el.type == 'param') {
          val = params[el.index];
        } else if (el.type == 'number') {
          val = Number(params[el.index]);
        } else {
          val = el.value;
        }
        buffer.push(val)
      }
    });
    return buffer;
  },

  substitute: function (language, tokens, options) {
    var results = [];
    this.compile(language, this.tree, results, tokens);
    // console.log(results);
    // console.log(tokens);
    return results.join('');
  }

};

module.exports = XMessageTokenizer;