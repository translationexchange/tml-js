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

Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {
  this.label = label;
  this.context = context || {};
  this.options = options || {};
  this.tokens = [];
};

Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {
  return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {
  var self = this;
  self.tokens = [];
  self.supportedTokens().forEach(function(tokenInfo) {
    var matches = self.label.match(tokensInfo[0]);
    if (matches) {
      Tr8n.Utils.unique(matches).forEach(function(match) {
        self.tokens.push(new tokenInfo[1](self.label, match));
      });
    }
  });
};

Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {
  if (this.options["allowed_tokens"] == null) return true;
  return (this.options["allowed_tokens"].indexOf(token.name) != -1);
};

Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {
  var label = this.label;
  var self = this;
  self.tokens.forEach(function(token) {
    if (self.isTokenAllowed(token)) {
      label = token.substitute(label, self.context, language, options);
    }
  });
  return label;
};
