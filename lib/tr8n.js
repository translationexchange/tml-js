
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



//function translate(label, description, tokens, options) {
//  label = label || process.argv[2];
//  console.log(label);
//  return label;
//}

//Tr8n.config = new Tr8n.Configuration();

// Cache adapters
//Tr8n.cache = new Tr8n.Cache();

// Api Client
//Tr8n.api = new Tr8n.ApiClient();

// Exporting classes

/*
exports.Configuration = Tr8n.Configuration;
exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Tokens = Tr8n.Tokens;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;
exports.Language = Tr8n.Language;
exports.LanguageContext = Tr8n.LanguageContext;
exports.LanguageContextRule = Tr8n.LanguageContextRule;
exports.LanguageCase = Tr8n.LanguageCase;
exports.LanguageCaseRule = Tr8n.LanguageCaseRule;
exports.Application = Tr8n.Application;
exports.TranslationKey = Tr8n.TranslationKey;
exports.Translation = Tr8n.Translation;

exports.configure = function(callback) {
  callback(Tr8n.config);
};
*/

var utils       = require('./utils');
var config      = require('./configuration');

var Application = require('./application');
var Language = require('./language');
var LanguageContext = require('./language_context');
var LanguageContextRule = require('./language_context_rule');
var LanguageCase = require('./language_case');
var LanguageCaseRule = require('./language_case_rule');
var TranslationKey = require('./translation_key');
var Translation = require('./translation');
var Translator = require('./translator');
var Source = require('./source');

var Tr8n = {

  Application: Application,
  Language: Language,
  LanguageContext: LanguageContext,
  LanguageContextRule: LanguageContextRule,
  LanguageCase: LanguageCase,
  LanguageCaseRule: LanguageCaseRule,
  TranslationKey: TranslationKey,
  Translation: Translation,
  Translator: Translator,
  Source: Source,

  utils: utils,
  config: config,

  init: function(options) {
    utils.extend(config, options);
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

module.exports = Tr8n;


