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

var Translation     = require("./translation");

/**
 * Source
 *
 * @constructor
 * @param {object} attrs - options
 */
var Source = function(attrs) {
  utils.extend(this, attrs);

  this.key = utils.generateSourceKey(attrs.source);
  this.translations = {};
  this.ignored_keys = [];
};

Source.prototype = {

  isIgnoredKey: function(key) {
    return this.ignored_keys.indexOf(key) != -1;
  },

  getTranslations: function(locale, key) {
    if (!this.translations[locale]) return null;
    return this.translations[locale][key];
  },

  updateTranslations: function(locale, results) {
    this.ignored_keys = results && results.ignored_keys ? results.ignored_keys : [];
    results = results && results.results ? results.results : results;

    // check if results is an array
    // build keys from the label + description

    var keys = utils.keys(results);

    this.translations[locale] = this.translations[locale] || [];

    for (var i=0; i<keys.length; i++) {
      var key = keys[i];
      this.translations[locale][key] = [];

      var data = results[key];
      if (!utils.isArray(data) && data.translations)
        data = data.translations;

      for (var j=0; j<data.length; j++) {
        var translation = data[j];
        this.translations[locale][key].push(new Translation({
          locale:   translation.locale || locale,
          label:    translation.label,
          locked:   translation.locked,
          context:  translation.context
        }));
      }
    }
  }

};

module.exports = Source;