/**
 * Copyright (c) 2014 Michael Berkovich, TranslationExchange.com
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

var RESERVED_TOKEN       = "tr8n";
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
var RE_SHORT_TOKEN_END   = "\\]";
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
var RE_TEXT              = "[^\\[\\]]+";
var TOKEN_TYPE_SHORT     = "short";
var TOKEN_TYPE_LONG      = "long";
var PLACEHOLDER          = "{$0}";

Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  this.context = context || {};
  this.opts = opts || {};
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  this.fragments = this.label.match(expression);
  return this.fragments;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  if (this.fragments.length == 0) return null;
  return this.fragments[0];
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  if (this.fragments.length == 0) return null;
  return this.fragments.shift();
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  var token = this.nextFragment();
  if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);
  if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);
  return token;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  var tree = [name];
  if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    this.tokens.push(name);

  if (type == TOKEN_TYPE_SHORT) {
    var first = true;
    while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      var value = this.parse();
      if (first && typeof value == "string") {
        value = value.replace(/^\s+/,'');
        first = false;
      }
      tree.push(value);
    }
  } else if (type == TOKEN_TYPE_LONG) {
    while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      tree.push(this.parse());
    }
  }

  this.nextFragment();
  return tree;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  if (defaultDecoration == null) return value;

  var decorationTokenValues = this.context[token];
  defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  if (decorationTokenValues instanceof Object) {
    Object.keys(decorationTokenValues).forEach(function (key) {
      defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  return defaultDecoration;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  if (token == RESERVED_TOKEN) return value;
  if (!this.isTokenAllowed(token)) return value;

  var method = this.context[token];

  if (method != null) {
    if (typeof method === 'string')
      return method.replace(PLACEHOLDER, value);

    if (typeof method === 'function')
      return method(value);

    if (typeof method === 'object')
      return this.defaultDecoration(token, value);

    return value;
  }

  return this.defaultDecoration(token, value);
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  if (!(expr instanceof Array)) return expr;

  var token = expr[0];
  expr.shift();
  var self = this;
  var value = [];
  expr.forEach(function(obj, index) {
    value.push(self.evaluate(obj));
  });
  return this.apply(token, value.join(''));
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  return this.evaluate(this.parse());
};
