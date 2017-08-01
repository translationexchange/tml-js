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

var utils           = require('../utils');
var DecorationToken = require("../tokens/decoration");

var RESERVED_TOKEN       = "tml";
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";                      // [link:
var RE_SHORT_TOKEN_END   = "\\]";                             // ]
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";                    // [link]
var RE_LONG_TOKEN_END    = "\\[\\/\\s*[\\w]*\\s*\\]";         // [/link]
var RE_HTML_TOKEN_START  = "<[^\\>]*>";                       // <link>
var RE_HTML_TOKEN_END    = "<\\/\\s*[^\\>]*\\s*>";            // </link>
var RE_TEXT              = "[^\\[\\]<>]+";                    // anything that is left

var TOKEN_TYPE_SHORT     = "short";
var TOKEN_TYPE_LONG      = "long";
var TOKEN_TYPE_HTML      = "html";

var DecorationTokenizer = function(label) {
  this.label = label;
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};

DecorationTokenizer.prototype = {

  /**
   *
   * @returns {Array|{index: number, input: string}|*|Array}
   */
  tokenize: function() {
    var expression = [
      RE_SHORT_TOKEN_START,
      RE_SHORT_TOKEN_END,
      RE_LONG_TOKEN_START,
      RE_LONG_TOKEN_END,
      RE_HTML_TOKEN_START,
      RE_HTML_TOKEN_END,
      RE_TEXT
    ].join("|");
    expression = new RegExp(expression, "g");
    this.fragments = ("[" + RESERVED_TOKEN + "]" + this.label + "[/" + RESERVED_TOKEN + "]").match(expression);
    return this.fragments;
  },

  /**
   *
   * @returns {*}
   */
  peek: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments[0];
  },

  /**
   *
   * @returns {*}
   */
  getNextFragment: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments.shift();
  },

  /**
   *
   * @returns {*}
   */
  parse: function() {
    var token = this.getNextFragment(), name;
    if (token.match(new RegExp(RE_SHORT_TOKEN_START))) {
      name = token.replace(/[\[:]/g, '');
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_SHORT);
    } else if (token.match(new RegExp(RE_LONG_TOKEN_START))) {
      name = token.replace(/[\[\]]/g, '');
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_LONG);
    } else if (token.match(new RegExp(RE_HTML_TOKEN_START))) {
      if (token.indexOf("/>") !== -1) return token;
      name = token.replace(/[<>]/g, '').split(' ')[0];
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_HTML);
    }
    return token;
  },

  /**
   *
   * @param name
   * @param type
   *
   */
  parseTree: function(name, type) {
    var tree = [name];
    var endTag, endMatch;

    Object.defineProperty(tree, "tokenType", {
      value: type,
      configurable: true,
      enumerable: false,
      writable: true
    });

    if (this.tokens.indexOf(name) === -1 && name !== RESERVED_TOKEN)
      this.tokens.push(name);
    
    if (type === TOKEN_TYPE_SHORT) {
      var first = true;
      while (this.peek()!== null && !(endMatch = this.peek().match(new RegExp(RE_SHORT_TOKEN_END)))) {
        var value = this.parse();
        if (first && typeof value === "string") {
          value = value.replace(/^\s+/,'');
          first = false;
        }
        tree.push(value);
      }
    } else if (type === TOKEN_TYPE_LONG) {
      endTag = new RegExp("\\[\\/\\s*" + name + "\\s*\\]");
      while (this.peek()!==null && !(endMatch = this.peek().match(endTag))) {
        tree.push(this.parse());
      }
    } else if (type === TOKEN_TYPE_HTML) {
      endTag = new RegExp("<\\/\\s*" + name + "\\s*>");
      while (this.peek()!==null && !(endMatch = this.peek().match(endTag))) {
        tree.push(this.parse());
      }
    }
    
    if (!endMatch) {
      Object.defineProperty(tree, "tokenError", {
        value: 'noclose',
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
    
    this.getNextFragment();
    return tree;
  },

  /**
   *
   * @param token_name
   * @param value
   * @returns {*}
   */
  apply: function(token_name, value) {
    var token = new DecorationToken(token_name, this.label);
    return token.apply(this.context, value, this.options.allowed_tokens);
  },

  /**
   *
   * @param expr
   * @returns {*}
   */
  evaluate: function(expr) {
    if (!(expr instanceof Array)) return expr;

    var token = expr[0];
    expr.shift();
    var self = this;
    var value = [];
    for (var i=0; i<expr.length; i++) {
      value.push(self.evaluate(expr[i]));
    }
    return this.apply(token, value.join(''));
  },

  /**
   *
   * @param tokens
   * @param options
   * @returns {*}
   */
  substitute: function(tokens, options) {
    this.context = tokens || {};
    this.options = options || {};

    // fix broken HTML tags
    var result = this.evaluate(this.parse());
    result = result.replace('[/' + RESERVED_TOKEN + ']', '');
    return result;
  },

  /**
   * Returns metadata for the tokens
   */
  metadata: {
    short: {
      start: RE_SHORT_TOKEN_START,
      end: RE_SHORT_TOKEN_END
    },
    long: {
      start: RE_LONG_TOKEN_START, 
      end: RE_LONG_TOKEN_END
    },
    html: {
      start: RE_HTML_TOKEN_START,
      end: RE_HTML_TOKEN_END 
    }
  }
};

module.exports = DecorationTokenizer;