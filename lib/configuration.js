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

var Cache     = require("./cache");

var utils     = require("./utils");
var defaults  = require("./../config/defaults.js");
var english  = require("./../config/english.js");
var application  = require("./../config/application.js");

var Configuration = function() {
  utils.merge(this, defaults);
};

Configuration.prototype = {

  /**
   * Initializes cache
   *
   * @param key
   * @returns {Cache|exports|module.exports|*}
   */
  initCache: function(key) {
    this.cache = this.cache || {};
    if (key) {
      this.cache.namespace = key.substring(0, 5);
    }
    this.cacheAdapter = new Cache(this.cache);
    return this.cacheAdapter;
  },

  /**
   * Returns default application
   *
   * @returns {Application}
   */
  getDefaultApplication: function() {
    return application;
  },

  /**
   * Returns default language
   *
   * @returns {Language}
   */
  getDefaultLanguage: function() {
    return english;
  },

  /**
   * Gets cache instance
   *
   * @returns {Cache|exports|module.exports|*}
   */
  getCache: function() {
    return this.cacheAdapter;
  },

  /**
   * Returns default token implementation
   *
   * @param token
   * @param type
   * @param format
   * @returns {*}
   */
  getDefaultToken: function(token, type, format) {
    type = type || "data"; format = format || "html";

    if (this.default_tokens[format][type][token])
      return this.default_tokens[format][type][token];

    var parts = token.split("_");
    token = parts[parts.length-1];
    token = token.replace(/_*\d+$/, '');

    if (this.default_tokens[format][type][token])
      return this.default_tokens[format][type][token];

    return null;
  },

  /**
   * Configures default token
   *
   * @param token
   * @param value
   * @param type
   * @param format
   */
  setDefaultToken: function(token, value, type, format) {
    type = type || "data"; format = format || "html";
    this.default_tokens[format] = this.default_tokens[format] || {};
    this.default_tokens[format][type] = this.default_tokens[format][type] || {};
    this.default_tokens[format][type][token] = value;
  },

  /**
   * Returns context rules
   *
   * @param key
   * @returns {*|{}}
   */
  getContextRules: function(key) {
    return this.context_rules[key] || {};
  },

  /**
   * Sets context rules
   *
   * @param key
   * @param variable
   * @param rule
   * @returns {boolean}
   */
  setContextRules: function(key, variable, rule) {
    if(!this.context_rules[key]) return false;
    this.context_rules[key].variables[variable] = rule;
  },

  /**
   * Checks if disabled
   *
   * @returns {boolean}
   */
  isDisabled: function() {
    return !this.isEnabled();
  },

  /**
   * Checks if enabled
   *
   * @returns {boolean|at.selectors.pseudos.enabled|Function}
   */
  isEnabled: function() {
    return this.enabled;
  },

  /**
   * Checks if file cache
   *
   * @returns {boolean}
   */
  isFileCache: function() {
    if (this.cache === null) return false;
    return this.cache.adapter == 'file';
  },

  /**
   * Registers custom cache adapter
   *
   * @param key
   * @param klass
   */
  registerCacheAdapter: function(key, klass) {
    this.cache_adapters = this.cache_adapters || {};
    this.cache_adapters[key] = klass;
  },

  /**
   * Registers multiple cache adapters
   *
   * @param adapters
   */
  registerCacheAdapters: function(adapters) {
    var self = this;
    Object.keys(adapters).forEach(function(key) {
      self.registerCacheAdapter(key, adapters[key]);
    });
  },

  /**
   * Returns specific cache adapter
   *
   * @param key
   * @returns {*}
   */
  getCacheAdapter: function (key) {
    if (!this.cache_adapters)
      return null;
    return this.cache_adapters[key];
  },

  /**
   * Registers API adapter
   *
   * @param key
   * @param klass
   */
  registerApiAdapter: function(key, klass) {
    this.api_adapters = this.api_adapters || {};
    this.api_adapters[key] = klass;
  },

  /**
   * Registers multiple api adapters
   *
   * @param adapters
   */
  registerApiAdapters: function(adapters) {
    var self = this;
    Object.keys(adapters).forEach(function(key) {
      self.registerApiAdapter(key, adapters[key][klass]);
    });
  },

  /**
   * Returns specific API adapter
   *
   * @param key
   * @returns {*}
   */
  getApiAdapter: function(key) {
    if (!this.api_adapters)
      return null;
    return this.api_adapters[key];
  }
};

module.exports = new Configuration();


