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

/**
 * Translation Key
 *
 * @constructor
 * @param {object} attrs - options
 */
Tr8n.TranslationKey = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.key = this.key || Tr8n.Utils.generateKey(this.label, this.description);

  if (!this.locale && this.application)
      this.locale = this.application.default_locale;

  if (!this.language && this.application)
    this.language = this.application.language(this.locale);

  this.addTranslations(attrs.translations || {});
};

Tr8n.TranslationKey.prototype = {

  addTranslation: function(translation) {
    if (this.translations == null)
      this.translations = {};

    if (this.translations[translation.locale])
      this.translations[translation.locale] = [];

    this.translations[translation.locale].push(
      new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))
    );
  },

  addTranslations: function(translations_by_locale) {
    for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {
      for(var translation in translations_by_locale[locale]) {
        this.addTranslation(translation);
      }
    }
  },

  getTranslationsForLanguage: function(language) {
    if (!this.translations) return [];
    return (this.translations[language.locale] || []);
  },

  findFirstValidTranslation: function(language, tokens) {
    var translations = this.getTranslationsForLanguage(language);

    for(var i=0; i<translations.length; i++) {
      if (translations[i].isValidTranslation(tokens))
        return translations[i];
    }

    return null;
  },

  translate: function(language, tokens, options) {
    options = options || {}

    if (Tr8n.config.isDisabled())
      return this.substituteTokens(this.label, tokens, language, options);

    var translation = this.findFirstValidTranslation(language, tokens);
    var decorator = Tr8n.Decorators.Html;

    if (translation) {
      return decorator.decorate(
        this.substituteTokens(translation.label, tokens, translation.language, options),
        translation.language,
        language,
        this, options
      );
    }

    return decorator.decorate(
      this.substituteTokens(this.label, tokens, this.language, options),
      this.language,
      language,
      this, options
    );
  },

  getDataTokens: function() {
    if (!this.data_tokens) {
      var tokenizer = new Tr8n.Tokenizers.Data(this.label);
      this.data_tokens = tokenizer.tokens;
    }
    return this.data_tokens;
  },

  getDataTokenNames: function() {
    if (!this.data_token_names) {
      this.data_token_names = [];
      for (var token in this.getDataTokens())
        this.data_token_names.push(token.full_name);
    }
    return this.data_token_names;
  },

  getDecorationTokenNames: function() {
    if (!this.decoration_tokens) {
      var tokenizer = new Tr8n.Tokenizers.Decoration(this.label);
      this.decoration_tokens = tokenizer.tokens;
    }
    return this.decoration_tokens;
  },

  substituteTokens: function(label, tokens, language, options) {
    if (label.indexOf('{') != -1) {
      var tokenizer = new Tr8n.Tokenizers.Data(label);
      label = tokenizer.substitute(language, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDataTokenNames()}));
    }

    if (label.indexOf('[') != -1) {
      tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDecorationTokenNames()}));
      label = tokenizer.substitute(language, options);
    }
    return label;
  }

};

