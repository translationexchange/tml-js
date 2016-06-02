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

var utils           = require('../utils');
var config          = require('../configuration');

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
var PLACEHOLDER          = "{$0}";

var DecorationTokenizer = function(label) {
  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};

DecorationTokenizer.prototype = {

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
    this.fragments = this.label.match(expression);
    return this.fragments;
  },

  peek: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments[0];
  },

  getNextFragment: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments.shift();
  },

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
      if (token.indexOf("/>") != -1) return token;
      name = token.replace(/[<>]/g, '').split(' ')[0];
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_HTML);
    }
    return token;
  },

  parseTree: function(name, type) {
    var tree = [name];
    var endTag, endMatch;
    Object.defineProperty(tree, "tokenType", {
      value: type,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
      this.tokens.push(name);
    
    if (type == TOKEN_TYPE_SHORT) {
      var first = true;
      while (this.peek()!==null && !(endMatch = this.peek().match(new RegExp(RE_SHORT_TOKEN_END)))) {
        var value = this.parse();
        if (first && typeof value == "string") {
          value = value.replace(/^\s+/,'');
          first = false;
        }
        tree.push(value);
      }
    } else if (type == TOKEN_TYPE_LONG) {
      endTag = new RegExp("\\[\\/\\s*" + name + "\\s*\\]");
      while (this.peek()!==null && !(endMatch = this.peek().match(endTag))) {
        tree.push(this.parse());
      }
    } else if (type == TOKEN_TYPE_HTML) {
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

  isTokenAllowed: function(token) {
    return (!this.options.allowed_tokens || this.options.allowed_tokens.indexOf(token) != -1);
  },

  getDefaultDecoration: function(token, value) {
    var default_decoration = config.getDefaultToken(token, "decoration");

    // need to think a bit more about this
    if (default_decoration === null) {
      return "<" + token + ">" + value + "</" + token + ">";
    }

    var decoration_token_values = this.context[token];
    default_decoration = default_decoration.replace(PLACEHOLDER, value);

    if (utils.isObject(decoration_token_values)) {
      var keys = utils.keys(decoration_token_values);
      for (var i = 0; i < keys.length; i++) {
        default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);
      }
      default_decoration = default_decoration.replace(/[\w]*=['"]\{\$[^\}]*\}['"]/g, "").replace(/\s*>/, '>').trim();
    }

    return default_decoration;
  },

  apply: function(token, value) {
    if (token == RESERVED_TOKEN) return value;
    if (!this.isTokenAllowed(token)) return value;

    var method = this.context[token];

    if (!!method) {
      if (typeof method === 'string')
        return method.replace(PLACEHOLDER, value);

      if (typeof method === 'function')
        return method(value);

      if (typeof method === 'object')
        return this.getDefaultDecoration(token, value);

      return value;
    }

    return this.getDefaultDecoration(token, value);
  },

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

  substitute: function(tokens, options) {
    this.context = tokens || {};
    this.options = options || {};

    // fix broken HTML tags
    var result = this.evaluate(this.parse());
    result = result.replace('[/tml]', '');
    return result;
  },
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