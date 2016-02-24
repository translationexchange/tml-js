
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

var utils               = require('./utils');
var config              = require('./configuration');
var logger              = require('./logger');

var Tml = {
  version             : '0.4.2',

  Application         : require('./application'),
  Language            : require('./language'),
  LanguageContext     : require('./language_context'),
  LanguageContextRule : require('./language_context_rule'),
  LanguageCase        : require('./language_case'),
  LanguageCaseRule    : require('./language_case_rule'),
  TranslationKey      : require('./translation_key'),
  Translation         : require('./translation'),
  Translator          : require('./translator'),
  Source              : require('./source'),
  DomTokenizer        : require('./tokenizers/dom'),

  ApiAdapterBase      : require('./api_adapters/base'),
  CacheAdapterBase    : require('./cache_adapters/base'),

  logger              : logger,
  utils               : utils,
  config              : config,
  scripts             : require('./helpers/scripts'),

  init: function(options) {
    utils.merge(config, options);
    config.initCache();
  },

  translate: function(label, description, tokens, options) {
    var language = this.application.getLanguage(config.current_locale);
    language = language || this.application.getLanguage(config.default_locale);
    return language.translate(label, description, tokens, options);
  },

  configure: function(callback) {
    callback(config);
  },

  cache: function(callback) {
    var data = config.cache.data || {};
    data.languages = data.languages || {};
    data.sources = data.sources || {};
    config.cache.data = data;
    callback(config.cache.data);
  }

};

module.exports = Tml;


