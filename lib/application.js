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

var utils       = require("./utils");
var config      = require("./configuration");
var logger      = require('./logger');

var Language    = require("./language");
var Source      = require("./source");
var ApiClient   = require("./api_client");

var API_HOST = "https://api.translationexchange.com";
var CDN_HOST = "https://cdn.translationexchange.com";

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

  /**
   * Returns application host
   *
   * @returns {*|string}
   */
  getHost: function() {
    return this.host || API_HOST;
  },

  /**
   * Returns CDN host
   *
   * @returns {*|string}
   */
  getCdnHost: function() {
    return this.cdn_host || CDN_HOST;
  },

  /**
   * Extends current object
   *
   * @param data
   */
  extend: function(data) {
    utils.extend(this, data);
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
    var lang = this.languages_by_locale[locale];
    if (lang) lang.application = this;
    return lang;
  },

  /**
   * changes current language
   *
   * @param locale
   * @param callback
   */
  changeLanguage: function(locale, callback) {
    var self = this;
    self.current_locale = locale;
    self.sources_by_key = {};
    this.initData([self.current_locale], [self.current_source], function() {
      if (callback) callback(self.getLanguage(self.current_locale));
    });
  },

  /**
   * Returns current language
   *
   * @returns {*}
   */
  getCurrentLanguage: function() {
    var locale = this.current_locale;

    if (!locale)
      return this.getDefaultLanguage();

    var language = this.getLanguage(locale);
    if (language) return language;

    locale = locale.split('-')[0];
    language = this.getLanguage(locale);

    return language || this.getDefaultLanguage();
  },

  /**
   *
   * @returns {*|Language}
   */
  getDefaultLanguage: function() {
    var language = this.getLanguage(this.default_locale);
    if (!language) {
      if (!this.configDefaultLanguage)
        this.configDefaultLanguage = new Language(config.getDefaultLanguage());
      
      language = this.configDefaultLanguage;
    }
    language.application = this;
    return language;
  },

  /**
   * Adds a source
   *
   * @param source
   * @param locale
   * @param translations
   * @returns {*}
   */
  addSource: function(source, locale, translations) {
    if (!source) return;

    source = new Source({source: source});
    source.application = this;
    source.updateTranslations(locale, translations);
    this.sources_by_key[source.source] = source;

    return this.getSource(source.source);
  },

  /**
   * Returns a source
   *
   * @param key
   * @returns {*}
   */
  getSource: function(key) {
    return this.sources_by_key[key];
  },

  removeSource: function(key) {
    delete this.sources_by_key[key];
  },

  /**
   * Returns current source
   *
   * @returns {*}
   */
  getCurrentSource: function() {
    if (!this.current_source) return null;
    return this.sources_by_key[this.current_source];
  },

  /**
   * Checks if feature is enabled
   *
   * @param name
   * @returns {*|translator.features|{fallback_language, show_locked_keys}}
   */
  isFeatureEnabled: function(name) {
    return (this.features && this.features[name]);
  },

  /**
   * Returns Api Client object
   *
   * @returns {ApiClient|exports|module.exports|*}
   */
  getApiClient: function() {
    if (!this.api_client) {
      this.api_client = new ApiClient(this);
    }

    return this.api_client;
  },

  /**
   * Initializes the application
   *
   * @param options
   * @param callback
   */
  init: function(options, callback) {
    options = options || {};

    var self = this;

    self.current_translator = options.current_translator;
    self.current_source = options.current_source;

    if (utils.isFunction(self.current_source)) {
      self.current_source = self.current_source();
    }

    self.getApiClient().get("projects/" + self.key + "/definition", {
      locale: options.current_locale || (options.accepted_locales ? options.accepted_locales.join(',') : 'en'),
      source: self.current_source,
      ignored: true
    }, {
        cache_key: 'application'
    }, function (err, data) {

      self.default_locale = self.default_locale || "en";

      // missing release
      if (err) {
        self.extend(config.getDefaultApplication());
        self.addLanguage(config.getDefaultLanguage());
        callback(null);
        return;
      }

      self.extend(data);

      if (data.settings) {
        utils.merge(config, data.settings);
      }

      self.loadExtension(data);
      
      // /es-LA/article
      // self.current_locale = (
      //   options.current_locale ||
      //   self.getPreferredLocale(options.accepted_locales, self.languages) ||
      //   self.default_locale
      // );
      //
      // if (!self.isSupportedLocale(self.current_locale)) {
      //   self.current_locale = self.default_locale;
      // }

      self.current_locale = self.getSupportedLocale(options.current_locale, options.accepted_locales, self.default_locale);
      
      var locales = [self.default_locale];
      if (self.current_locale != self.default_locale) {
        locales.push(self.current_locale);
      }

      //console.log("Current locale: ", self.current_locale);

      var sources = [self.current_source || 'index'];
      self.initData(locales, sources, callback);
    });
  },

  /**
   * 
   * @param requested_locale
   * @param accepted_locales
   * @param default_locale
   * @returns {*}
   */
  getSupportedLocale: function(requested_locale, accepted_locales, default_locale) {
    // /es-LA/article
    if (this.isSupportedLocale(requested_locale))
      return requested_locale;
    
    return this.getPreferredLocale(accepted_locales, this.languages) || default_locale;
  },
  
  /**
   * Checks if the locale is part of the application
   *
   * @param locale
   * @returns {boolean}
   */
  isSupportedLocale: function(locale) {
    if (!this.languages) return false;
    for(var i=0; i<this.languages.length; i++) {
      if (this.languages[i].locale == locale)
        return true;
    }
    return false;
  },

  /**
   * Loads application extensions: locales, sources
   *
   * @param data
   */
  loadExtension: function(data) {
    data = data.extensions;
    if (!data) return;

    var self = this;
    var sourceLocale = self.default_locale;
    var cache = config.getCache();
    if (self.isInlineModeEnabled()) cache = null;

    if (data.languages) {
      Object.keys(data.languages).forEach(function(locale) {
        if (locale != self.default_locale)
          sourceLocale = locale;
        if (cache) cache.store(self.getLanguageKey(locale), JSON.stringify(data.languages[locale]));
        self.addLanguage(new Language(data.languages[locale]));
      });
    }

    if (data.sources) {
      Object.keys(data.sources).forEach(function(key) {
        if (cache) cache.store(self.getSourceKey(key, sourceLocale), JSON.stringify(data.sources[key]));
        self.addSource(key, sourceLocale, data.sources[key]);
      });
    }
  },

  /**
   * Inits internal application data
   *
   * @param locales
   * @param sources
   * @param callback
   */
  initData: function(locales, sources, callback) {
    var self = this;

    // init languages
    self.loadLanguages(locales, function() {
      if (sources) {
        // init main source
        self.loadSources(sources, self.current_locale, function(sources) {
          // init all sub-sources
          if (sources.length > 0 && sources[0] && sources[0].sources && sources[0].sources.length > 0) {
            // logger.log("Loading subsources: " + sources[0].sources);
            self.loadSources(sources[0].sources, self.current_locale, function (sources) {
              callback(null);
            });
          } else callback(null);
        });
      } else callback(null);
    });
  },

  /**
   * Returns user preferred locale
   *
   * @param preferredLocales
   * @param languages
   * @returns {*}
   */
  getPreferredLocale: function(preferredLocales, languages){
    var match;
    var appLocales = (languages || []).map(function(l){return l.locale;});

    (preferredLocales || []).forEach(function(plocale){
      var regx = new RegExp(plocale+"|"+plocale.replace(/-\w+$/,''));
      appLocales.forEach(function(alocale) {
        if(!match && alocale.match(regx)) match = alocale;
      });
    });
    return match;
  },

  /**
   * Loads languages
   *
   * @param locales
   * @param languages_callback
   */
  loadLanguages: function(locales, languages_callback) {
    var data = {};
    var self = this;

    locales.forEach(function(locale) {
      if (!self.languages_by_locale[locale]) {
        data[locale] = function (callback) {
          self.getApiClient().get("languages/" + locale + "/definition", {}, {cache_key: self.getLanguageKey(locale)}, function (error, data) {
            if (error) {
              callback(error, null);
              return;
            }
            callback(null, new Language(utils.extend(data, {application: self})));
          });
        };
      }
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

  /**
   * Returns language cache key
   *
   * @param locale
   * @returns {string}
   */
  getLanguageKey: function(locale) {
    return locale + "/language";
  },

  /**
   * Returns source by source key
   *
   * @param source
   * @param locale
   * @returns {string}
   */
  getSourceKey: function(source, locale) {
    return locale + "/sources/" + source;
  },

  getSourceName: function(source) {
    return source.call && source() || source;
  },  

  /**
   * Loads sources
   *
   * @param sources
   * @param locale
   * @param sources_callback
   */
  loadSources: function(sources, locale, sources_callback) {
    var data = {};
    var self = this;

    sources.forEach(function(source) {
      source = self.getSourceName(source);
      if (!self.sources_by_key[source]) {
        data[source] = function(callback) {

          var key = utils.generateSourceKey(source);
          self.getApiClient().get("sources/" + key + '/translations', {
            locale: locale,
            ignored: true,
            all: true,
            app_id: self.key
          }, {
            cache_key: locale + '/sources' + utils.normalizePath(source)
          }, function(error, data) {
            if (error) {
              callback(error, null);
              return;
            }

            callback(null, data);
          });
        };
      }
    });

    utils.parallel(data, function(err, results) {
      var sources = [];

      if (results) {
        Object.keys(results).forEach(function (key) {
          sources.push(results[key]);
          self.addSource(key, locale, results[key]);
        });
      }

      sources_callback(sources);
    });
  },

  isInlineModeEnabled: function() {
    // TODO: ensure that if token is provided in the initial settings - application token
    // we should still be able to submit missing keys

    if (!this.current_translator) return false;
    return this.current_translator.inline;
  },

  addMissingElement: function(source_key, translation_key) {
    // do not register keys if file cache is used and not in the inline translation mode
    // otherwise keys will always be sent for registration as cache is not renewed automatically

    if (config.isFileCache() && !this.isInlineModeEnabled())
      return;

    if (!this.missing_keys_by_source)
      this.missing_keys_by_source = {};
    if (!this.missing_keys_by_source[source_key])
      this.missing_keys_by_source[source_key] = {};
    if (translation_key !== null)
      this.missing_keys_by_source[source_key][translation_key.key] = translation_key;
  },

  verifySourcePath: function(source_key, source_path) {
    if (!this.extensions || !this.extensions.sources || this.extensions.sources[source_key] !== null)
      return;

    this.addMissingElement(source_path, null);
  },

  registerMissingTranslationKey: function(source_key, translation_key) {
    //console.log("Registering missing translation key: " + source_key + " " + translation_key.label);

    this.addMissingElement(source_key, translation_key);

    var self = this;
    if (config.delayed_flush && !self.submit_scheduled) {
      self.submit_scheduled = true;
      setTimeout(function() {
        self.submitMissingTranslationKeys();
      }, 3000);
    }
  },

  /**
   * Submits missing keys to the server
   *
   * @param callback
   */
  submitMissingTranslationKeys: function(callback) {
    if (!this.missing_keys_by_source) {
      if (callback) callback(false);
      return;
    }

    // only submit keys if no snapshots were configured or
    // in inline translation mode

    if (!this.isInlineModeEnabled()) {
      if (callback) callback(false);
      return;
    }

    var source_keys = utils.keys(this.missing_keys_by_source);
    if (source_keys.length === 0) {
      if (callback) callback(false);
      return;
    }

    logger.debug("Submitting missing translation keys...");

    var params = [];

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

    // logger.debug(JSON.stringify(params));

    var self = this;
    self.missing_keys_by_source = null;

    this.getApiClient().post("sources/register_keys", {source_keys: JSON.stringify(params), app_id: self.key}, function () {
      utils.keys(self.languages_by_locale).forEach(function (locale) {
        source_keys.forEach(function (source_key) {
          // delete from cache source_key + locale
          source_key = source_key.split(config.source_separator);
          source_key.forEach(function (source) {
            // console.log("Removing " + locale + '/sources/' + source + " from cache");
            // TODO: may not need to remove all sources in path from the cache
            self.removeSource(source);
            config.getCache().del(locale + '/sources/' + source, function () {});
          });
        });
      });

      if (false && config.delayed_flush) {
        if (self.missing_keys_by_source) {
          self.submit_scheduled = true;
          self.submitMissingTranslationKeys(callback);
        } else {
          self.submit_scheduled = false;
          if (callback) callback(true);
        }
      } else if (callback) callback(true);
    });
  },

  /**
   * Returns translation key from local cache
   *
   * @param key
   * @returns {*}
   */
  getTranslationKey: function(key) {
    return this.translation_keys[key];
  },

  /**
   * temporary / per request cache
   * @param translation_key
   * @returns {*}
   */
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
