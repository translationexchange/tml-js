/**
 * Copyright (c) 2015 Translation Exchange, Inc.
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

var logger      = require('../logger');
var config      = require('../configuration');

var VERSION_KEY  = '__tml_version__';
var KEY_PREFIX   = 'tml';
// var CDN_URL      = 'http://cdn.translationexchange.com';
var CDN_URL      = 'https://trex-snapshots.s3-us-west-1.amazonaws.com';

var Base = function() {};

Base.prototype = {

  read_only         : true,
  cached_by_source  : true,
  name              : "",

  initialize: function(config) {
    this.config = config || {};
    this.cache = this.create();
  },

  create: function(){
    // should be overwritten
  },

  fetch: function() {
    // should be overwritten
  },

  store: function(key, value){
    // should be overwritten
  },

  del: function(key) {
    // should be overwritten
  },

  exists: function(key) {
    // should be overwritten
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

  fetchFromCdn: function(key, callback) {
    if (key == '__tml_version__' || !this.config.cdn_key) {
      callback(null, null);
      return;
    }

    var self = this;
    var cdn_url = CDN_URL + "/" + this.config.cdn_key + "/" + this.fileName(key);
    logger.log("fetching from cdn: " + cdn_url);
    var t0 = new Date();
    this.getRequest().get(cdn_url, {}, function (error, response, data) {
      var t1 = new Date();
      logger.debug("call took " + (t1-t0) + " mls");
      if (error || response.status != 200 || data === null) {
        callback(error, null);
      } else {
        self.store(key, data, function () {
          callback(null, data);
        });
      }
    });
  },

  incrementVersion: function(callback) {
    this.getVersion(function(version) {
      this.version = parseInt(version) + 1;
      this.store(VERSION_KEY, this.version, function() {
        if (callback) callback(this.version);
      }.bind(this));
    }.bind(this));
  },

  getVersion: function(callback) {
    var self = this;

    if (!self.version) {
      self.config.version = self.config.version || 1;
      self.fetch(VERSION_KEY, self.config.version, function(err, data) {
        if (self.config.version > data) {
          logger.log("Updating cache version to: " + self.config.version);
          self.setVersion(self.config.version, function(version) {
            self.version = version;
            self.info("Cache version: " + self.version);
            if (callback) callback(self.version);
          });
        } else {
          self.version = data;
          self.info("Cache version: " + self.version);
          if (callback) callback(self.version);
        }
      });
      return;
    }

    self.info("Cache version: " + self.version);
    if(callback) callback(self.version);
  },

  setVersion: function(version, callback) {
    this.version = version;
    this.store(VERSION_KEY, this.version, function() {
      if (callback) callback(this.version);
    }.bind(this));
  },

  resetVersion: function() {
    this.version = null;
  },

  getVersionedKey: function(key) {
    if (key == VERSION_KEY) return key;
    var parts = [
      KEY_PREFIX,
      this.config.namespace || '',
      'v' + (this.version || 0),
      key
    ];
    return parts.join('_');
  },

  getRequest: function() {
    // must be overloaded by cache adapters
    return null;
  },

  clear: function(callback) {
    if (callback) callback(null);
  }
};

module.exports = Base;