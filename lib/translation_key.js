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

var utils     = require("./utils");
var config    = require("./configuration");

var Translation         = require("./translation");
var HTMLDecorator       = require("./decorators/html");
var DataTokenizer       = require("./tokenizers/data");
var DecorationTokenizer = require("./tokenizers/decoration");

/**
 * Translation Key
 *
 * @constructor
 * @param {object} attrs - options
 */
var TranslationKey = function(attrs) {
  utils.extend(this, attrs);

  this.key = this.key || utils.generateKey(this.label, this.description);

  if (!this.locale && this.application)
      this.locale = this.application.default_locale;

  if (!this.language && this.application)
    this.language = this.application.getLanguage(this.locale);

  this.translations = {};
  this.addTranslations(attrs.translations || {});
};

TranslationKey.prototype = {

  addTranslations: function(translations_by_locale) {
    var locales = utils.keys(translations_by_locale);
    for (var i=0; i<locales.length; i++) {
      var locale = locales[i];
      var translations = translations_by_locale[locale];
      for (var j=0; j<translations.length; j++) {
        var translation = translations[j];
        this.addTranslation(new Translation(utils.extend(translation, {
          language: this.application.getLanguage(translation.locale),
          translation_key: this
        })));
      }
    }
  },

  addTranslation: function(translation) {
    var translations = this.translations[translation.locale];
    if (!translations) translations = [];
    translations.push(translation);
    this.translations[translation.locale] = translations;
  },

  setTranslations: function(locale, translations) {
    this.translations[locale] = [];

    for (var i=0; i<translations.length; i++) {
      var translation = translations[i];
      translation.translation_key = this;
      translation.language = this.application.getLanguage(translation.locale);
      this.translations[locale].push(translation);
    }
  },

  resetTranslations: function() {
    this.translations = {};
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
    options = options || {};

    if (config.isDisabled())
      return this.substituteTokens(this.label, tokens, language, options);

    var translation = this.findFirstValidTranslation(language, tokens);
    var decorator = HTMLDecorator;

    if (translation) {
      options.locked = translation.locked;
      return decorator.decorate(
        this.substituteTokens(translation.label, tokens, translation.language, options),
        translation.language,
        language,
        this,
        options
      );
    }

    // if translation key has sub-translations, they should use the target language
    // like in the case of list joiners, etc...
    options.target_language = language;

    return decorator.decorate(
      this.substituteTokens(this.label, tokens, this.language || language, options),
      this.language || language,
      language,
      this, options
    );
  },

  getDataTokens: function() {
    if (!this.data_tokens) {
      var tokenizer = new DataTokenizer(this.label);
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
      var tokenizer = new DecorationTokenizer(this.label);
      tokenizer.parse();
      this.decoration_tokens = tokenizer.tokens;
    }
    return this.decoration_tokens;
  },

  substituteTokens: function(label, tokens, language, options) {
    var tokenizer;

    if (label.indexOf('[') != -1 || label.indexOf('<') != -1) {
      tokenizer = new DecorationTokenizer(label);
      label = tokenizer.substitute(tokens, utils.extend(options, {allowed_tokens: this.getDecorationTokenNames()}));
    }

    if (label.indexOf('{') != -1) {
      tokenizer = new DataTokenizer(label);
      label = tokenizer.substitute(language, tokens, utils.extend(options, {allowed_tokens: this.getDataTokenNames()}));
    }

    return label;
  }

};

module.exports = TranslationKey;

