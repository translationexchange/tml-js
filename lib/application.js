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
var logger    = require('./logger');

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

  extend: function(data) {
    utils.extend(this, data);
  },

  isKeyRegistrationEnabled: function() {
    return (this.secret != null);
  },

  /**
   * addLanguage
   *
   * @function
   * @param {Language} language - language to be added
   */
  addLanguage: function(language) {
    language.application = this;
    this.languages_by_locale[language.locale] = new Language(language);
    return this.getLanguage(language.locale);
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
    if (!source) return;
    source.application = this;
    this.sources_by_key[source.source] = new Source(source);
    return this.getSource(source.source);
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
    self.getApiClient().get("application", {definition: true}, {cache_key: self.key}, function (error, data) {
      if (error) {
        console.log(err);
        throw err;
      }

      self.extend(data);

      if (options.locales) {
        // init languages
        self.loadLanguages(options.locales, options, function() {
          if (options.sources) {
            // init main source
            self.loadSources(options.sources, options.current_locale, options, function(sources) {
              // init all sub-sources
              if (sources.length > 0 && sources[0] && sources[0].sources) {
                // console.log("Loading subsources: " + sources[0].sources);
                self.loadSources(sources[0].sources, options.current_locale, options, function (sources) {
                  callback(null);
                });
              } else callback(null);
            });
          } else callback(null);
        });
      } else callback(null);

    });
  },

  loadLanguages: function(locales, options, languages_callback) {
    if (utils.isFunction(options)) {
      languages_callback = options;
      options = {};
    }

    

    var data = {};
    var self = this;

    locales.forEach(function(locale) {
      data[locale] = function(callback) {
        self.getApiClient().get("language", {locale: locale, definition: true}, {cache_key: locale + "/language"}, function(error, data) {
//          console.log("Loading language: " +  error + " " + data);
          if (error) {
            callback(error, null);
            return;
          }
          callback(null, new Language(utils.extend(data, {application: self})));
        });
      };
    });

    utils.parallel(data, function(err, results) {
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

          callback(null, data);
        });
      };
    });

    utils.parallel(data, function(err, results) {
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

  getSourceKey: function(source, locale) {
    return locale + "/[" + source.replace("/", "-") + "]";
  },

  loadSources: function(sources, locale, options, sources_callback) {
    if (utils.isFunction(options)) {
      sources_callback = options;
      options = {};
    }


    var data = {};
    var self = this;

    sources.forEach(function(source) {
      data[source] = function(callback) {
//        console.log("loading " + source + " for locale " + locale);

        var api_options = {};
        if (!options.translator || !options.translator.inline)
          api_options.cache_key = self.getSourceKey(source, locale);
//        console.log("cache key " + api_options.cache_key);

        self.getApiClient().get("source", {source:source, locale:locale, translations:true, subsources:true}, api_options, function(error, data) {

          if (error) {
            callback(error, null);
            return;
          }

          callback(null, data);
        });
      };
    });

    utils.parallel(data, function(err, results) {
      if (err) {
        console.log(err);
        throw err;
      }

      var sources = [];
      Object.keys(results).forEach(function(key) {
        sources.push(results[key]);
        self.addSource(results[key]);
      });

      sources_callback(sources);
    });
  },

  registerMissingTranslationKey: function(source_key, translation_key) {
    if (!this.isKeyRegistrationEnabled()) return;

    logger.log("Registering missing translation key: " + source_key + " " + translation_key.label);
    if (!this.missing_keys_by_source)
      this.missing_keys_by_source = {};
    if (!this.missing_keys_by_source[source_key])
      this.missing_keys_by_source[source_key] = [];
    this.missing_keys_by_source[source_key][translation_key.key] = translation_key;

    var self = this;
    if (config.delayed_flush && !self.submit_scheduled) {
      self.submit_scheduled = true;
      setTimeout(function() {
        self.submitMissingTranslationKeys();
      }, 3000);
    }
  },

  submitMissingTranslationKeys: function(callback) {
    if (!this.isKeyRegistrationEnabled()) return;

    if (!this.missing_keys_by_source) {
      if (callback) callback(false);
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

    console.log(JSON.stringify(params));
//    callback(true);

    var self = this;
    self.missing_keys_by_source = null;

    this.getApiClient().post("source/register_keys", {source_keys: JSON.stringify(params)}, function() {
      utils.keys(self.languages_by_locale).forEach(function(locale) {
        source_keys.forEach(function(source_key) {
          // delete from cache source_key + locale
          source_key = source_key.split(config.source_separator);
          source_key.forEach(function(source) {
            // TODO: may not need to remove all sources in path from the cache
            config.getCache().del(self.getSourceKey(source, locale), function(){});
          });
        });
      });

      if (config.delayed_flush) {
        if (self.missing_keys_by_source) {
          self.submit_scheduled = true;
          self.submitMissingTranslationKeys(callback);
        } else {
          self.submit_scheduled = false;
          if (callback) callback();
        }
      } else if (callback) callback();
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
