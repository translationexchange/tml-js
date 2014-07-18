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
};

Application.prototype = {

  getApiClient: function() {
    // if (!this.api_client) this.api_client = new Config.api_client_class(this);
    return this.api_client;
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

  isFeatureEnabled: function(name) {
    return (this.features && this.features[name]);
  },

  getApiClient: function() {
    if (!this.api_client) {
      this.api_client = new Tr8n.ApiClient(this);
    }

    return this.api_client;
  },

  init: function(options, callback) {
    options = options || {};

    this.getApiClient().get("application", {definition: true}, function (error, data) {
      if (error) {
        console.log(err);
        throw err;
      }
      utils.extend(this, data);

      if (options.locales) {
        this.loadLanguages(options.locales, function() {
          callback(null);
        });
      } else {
        callback(null);
      }

    }.bind(this));
  },

  loadLanguages: function(locales, languages_callback) {
    var async = require('async');

    var data = {};
    var self = this;

    locales.forEach(function(locale) {
      data[locale] = function(callback) {
        self.getApiClient().get("language", {locale: locale, definition: true}, function(error, data) {
          if (error) {
            callback(error, null);
            return;
          }
          callback(null, new Language(data));
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

  loadDefaultLanguages: function(locales, languages_callback) {
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

          callback(null, new Language(JSON.parse(data)));
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

  submitMissingTranslationKeys: function(callback) {
    console.log("Submitting missing translation keys...");
    // TODO: finish it up
  }

};

module.exports = Application;
