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

Tr8n.Language = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.contexts = {};
  for(var key in Tr8n.Utils.keys(attrs.contexts || {})) {
    this.contexts[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[key], {language: this}));
  }

  this.cases = {};
  for(key in Tr8n.Utils.keys(attrs.cases || {})) {
    this.cases[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[key], {language: this}));
  }
};

Tr8n.Language.prototype.getContextByKeyword = function(key) {
  return this.contexts[key];
};

Tr8n.Language.prototype.getContextByTokenName = function(token_name) {
  for(var key in this.contexts) {
    if (this.contexts[key].isAppliedToToken(token_name))
      return this.contexts[key];
  }

  return null;
};

Tr8n.Language.prototype.getLanguageCaseByKeyword = function(key) {
  return this.cases[key];
};

Tr8n.Language.prototype.translate = function(label, description, tokens, options) {




  return label;
};


