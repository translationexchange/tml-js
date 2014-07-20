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


var utils     = require("./utils");
var config    = require("./configuration");

var Language  = require("./language");
var Source  = require("./source");
var ApiClient  = require("./api_client");

var DEFAULT_HOST = "https://translationexchange.com";

/**
 * Application
 *
 * @constructor
 * @param {object} options - options
 */
var Application = function(options) {
  utils.extend(this, options);

  this.languages = [];
  for(var lang in (options.languages || [])) {
    this.languages.push(new Language(utils.extend(lang, {application: this})));
  }

  this.default_locale = config.default_locale;
  this.languages_by_locale = {};
  this.sources_by_key = {};
  this.missing_keys_by_source = {};
  this.translation_keys = {};
};

Application.prototype = {

  getHost: function() {
    return this.host || DEFAULT_HOST;
  },

  /**
   * addLanguage
   *
   * @function
   * @param {Language} language - language to be added
   */
  addLanguage: function(language) {
    language.application = this;
    this.languages_by_locale[language.locale] = language;
  },

  /**
   * getLanguage
   *
   * @description
   * returns a language object for a given locale
   *
   * @function
   * @param {string} locale - locale for which to get a language
   */
  getLanguage: function(locale) {
    return this.languages_by_locale[locale || this.default_locale];
  },

  addSource: function(source) {
    this.sources_by_key[source.source] = source;
    return source;
  },

  getSource: function(key) {
    return this.sources_by_key[key];
  },

  isFeatureEnabled: function(name) {
    return (this.features && this.features[name]);
  },

  getApiClient: function() {
    if (!this.api_client) {
      this.api_client = new ApiClient(this);
    }

    return this.api_client;
  },

  init: function(options, callback) {
    options = options || {};

    var self = this;

    // load application
    self.getApiClient().get("application", {definition: true}, {cache_key: "application"}, function (error, data) {
      if (error) {
        console.log(err);
        throw err;
      }
      utils.extend(this, data);

      if (options.locales) {
        self.loadLanguages(options.locales, options, function() {
          if (options.sources) {
            self.loadSources(options.sources, options.current_locale, options, function() {
              callback(null);
            });
          } else callback(null);
        });
      } else callback(null);

    }.bind(this));
  },

  loadLanguages: function(locales, options, languages_callback) {
    if (utils.isFunction(options)) {
      languages_callback = options;
      options = {};
    }

    var async = require('async');

    var data = {};
    var self = this;

    locales.forEach(function(locale) {
      data[locale] = function(callback) {
        self.getApiClient().get("language", {locale: locale, definition: true}, {cache_key: "language_" + locale}, function(error, data) {
          if (error) {
            callback(error, null);
            return;
          }
          callback(null, new Language(utils.extend(data, {application: self})));
        });
      };
    });

    async.parallel(data, function(err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      Object.keys(results).forEach(function(key) {
        self.addLanguage(results[key]);
      });

      languages_callback();
    });
  },

  loadDefaultLanguages: function(locales, options, languages_callback) {
    if (utils.isFunction(options)) {
      languages_callback = options;
      options = {};
    }

    var async = require('async');
    var fs = require('fs');

    var data = {};
    var self = this;

    locales.forEach(function(locale) {
      data[locale] = function(callback) {
        var path = __dirname + "/../config/data/" + locale + ".json";
        console.log("Loading " + path + " ...");

        fs.readFile(path, function (err, data) {
          if (err) {
            console.log(err);
            throw err;
          }

          callback(null, new Language(utils.extend(data, {application: self})));
        });
      };
    });

    async.parallel(data, function(err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      Object.keys(results).forEach(function(key) {
        self.addLanguage(data[key]);
      });

      languages_callback();
    });
  },

  loadSources: function(sources, locale, options, sources_callback) {
    if (utils.isFunction(options)) {
      sources_callback = options;
      options = {};
    }

    var async = require('async');

    var data = {};
    var self = this;

    sources.forEach(function(source) {
      data[source] = function(callback) {
        console.log("loading " + source + " for locale " + locale);
        var api_options = {};
        if (!options.translator || !options.translator.inline) api_options.cache_key = source + "_" + locale;
        self.getApiClient().get("source", {source: source, locale: locale, translations: true}, api_options, function(error, data) {
          if (error) {
            callback(error, null);
            return;
          }
          callback(null, new Source(utils.extend(data, {application: self})));
        });
      };
    });

    async.parallel(data, function(err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      Object.keys(results).forEach(function(key) {
        self.addSource(results[key]);
      });

      sources_callback();
    });
  },

  registerMissingTranslationKey: function(source_key, translation_key) {
//    console.log("Registering missing translation key: " + source_key + " " + translation_key.label);
    if (!this.missing_keys_by_source[source_key])
      this.missing_keys_by_source[source_key] = [];
    this.missing_keys_by_source[source_key][translation_key.key] = translation_key;
  },

  submitMissingTranslationKeys: function(callback) {
    if (!this.missing_keys_by_source) {
      callback(false);
      return;
    }
    var source_keys = utils.keys(this.missing_keys_by_source);
    if (source_keys.length === 0) return;

    console.log("Submitting missing translation keys...");

    var params = [];

//    console.log(source_keys);

    var attributes = ["key", "label", "description", "locale", "level"];
    for(var i=0; i<source_keys.length; i++) {
      var source_key = source_keys[i];
      var keys = utils.keys(this.missing_keys_by_source[source_key]);
      var keys_data = [];
      for(var j=0; j<keys.length; j++) {
        var key = this.missing_keys_by_source[source_key][keys[j]];
        var json = {};
        for(var k=0; k<attributes.length; k++) {
          var attr = attributes[k];
          if (key[attr]) json[attr] = key[attr];
        }
        keys_data.push(json);
      }
      params.push({source: source_key, keys: keys_data});
    }

//    console.log(JSON.stringify(params));
//    callback(true);

    var self = this;
    this.getApiClient().post("source/register_keys", {source_keys: JSON.stringify(params)}, function() {
      self.missing_keys_by_source = null;
      utils.keys(self.languages_by_locale).forEach(function(locale) {
        source_keys.forEach(function(source_key) {
          // delete from cache source_key + locale
        });
      });

      callback();
    });
  },

  getTranslationKey: function(key) {
    return this.translation_keys[key];
  },

  // temporary / per request cache
  cacheTranslationKey: function(translation_key) {
    var cached_key = this.getTranslationKey(translation_key.key);

    if (cached_key) {
      // move all translations from the new key to the cached one
      var locales = utils.keys(translation_key.translations || {});
      for (var i=0; i<locales.length; i++) {
        var translations = translation_key.translations[locales[i]];
        var language = this.getLanguage(locales[i]);
        cached_key.setTranslationsForLanguage(language, translations);
      }
      return cached_key;
    }

    // cache the new translation key
    translation_key.setApplication(this);
    this.translation_keys[translation_key.key] = translation_key;
    return translation_key;
  }

};

module.exports = Application;
