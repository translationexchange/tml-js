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

var config      = require('../configuration');
var logger      = require('../logger');
var utils       = require('../utils');

var VERSION_KEY  = 'current_version';
var KEY_PREFIX   = 'tml';
var CDN_URL      = 'http://cdn.translationexchange.com';
// var CDN_URL      = 'https://trex-snapshots.s3-us-west-1.amazonaws.com';

/**
 * Base cache adapter
 *
 * @constructor
 */
var Base = function() {};

/**
 * Base adapter methods
 */
Base.prototype = {

  read_only         : true,
  cached_by_source  : true,
  name              : "",

  // check for version every hour - store number in seconds
  version_check_interval: (60 * 60),

  initialize: function(config) {
    this.config = config || {};
    this.cache = this.create();
  },

  create: function(){
    logger.debug("Must be implemented by the extending class");
  },

  fetch: function() {
    logger.debug("Must be implemented by the extending class");
  },

  store: function(key, value){
    logger.debug("Must be implemented by the extending class");
  },

  del: function(key) {
    logger.debug("Must be implemented by the extending class");
  },

  exists: function(key) {
    logger.debug("Must be implemented by the extending class");
  },

  warn: function(msg) {
    logger.debug(this.name + " - " + msg);
  },

  info: function(msg) {
    logger.debug(this.name + " - " + msg);
  },

  fileName: function(key) {
    return key + '.json';
  },

  fetchDefault: function(key, fallback, callback) {
    var self = this;
    if (utils.isFunction(fallback)) {
      fallback(function(err, data) {
        if (data) {
          self.store(key, data, function () {
            callback(null, data);
          });
        } else callback("no data", null);
      }.bind(this));
    } else if (fallback) {
      self.store(key, fallback, function(err, data) {
        callback(null, data);
      });
    }
  },

  // pulls current stored version from cache
  fetchVersion: function(callback) {
    var self = this;

    if (self.config.version) {
      self.info("Cache version from config: " + self.config.version);
      callback(self.config.version);
    } else {
      var default_version = JSON.stringify({version: "undefined"});
      self.fetch(VERSION_KEY, default_version, function (err, data) {
        data = data || '';
        if (data.indexOf('{') != -1)
          data = JSON.parse(data);
        else
          data = {version: data};
        self.info("Cache version: " + data.version);
        callback(data);
      });
    }
  },

  storeVersion: function(version, callback) {
    var self = this;
    self.version = version;

    // store version with a timestamp when it was last updated
    var version_data = JSON.stringify({version: self.version, t: self.getVersionTimestamp()});
    //logger.debug("Storing version data " + version_data);

    self.store(VERSION_KEY, version_data, function() {
      if (callback) callback(self.version);
    });
  },

  /**
   * Returns timestamp based on the frequency interval
   */
  getVersionTimestamp: function() {
    var t = new Date().getTime();
    //t = t - (t % (this.version_check_interval * 1000));
    return t;
  },

  /**
   * Prefix key with a version
   *
   * @param key
   * @returns {string}
   */
  getVersionedKey: function(key) {
    var parts = [
      KEY_PREFIX,
      this.config.namespace || '',
      (key == VERSION_KEY) ? 'v' : 'v' + (this.version || this.config.version || '0'),
      key
    ];
    return parts.join('_');
  },

  /**
   * Remove extensions from data before putting it in cache
   *
   * @param data
   * @returns {*}
   */
  stripExtensions: function(data) {
    if (utils.isString(data) && data.match(/^\{/)) {
      data = JSON.parse(data);
      if (data.extensions)
        delete data.extensions;
      data = JSON.stringify(data);
    }
    return data;
  },

  /**
   * Get the API request object based on implementation
   *
   * @returns {null}
   */
  getRequest: function() {
    // must be overloaded by cache adapters
    return null;
  },

  /**
   * Clear cache
   *
   * @param callback
   */
  clear: function(callback) {
    if (callback) callback(null);
  }
};

module.exports = Base;