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

var utils        = require("./utils");
var BaseAdapter  = require('./cache_adapters/base');

var Cache = function(options) {
  this.adapter = null;
  this.options = options;
  this.version = options.version;

  var adapter_class;
  
  if (options) {
    if(typeof options.adapter == "string") {
      var config = require("./configuration");
      adapter_class = config.getCacheAdapter(options.adapter);
    } else if (typeof options.adapter == "function") {
      adapter_class = options.adapter;
      delete options.adapter;
    }
    if (adapter_class) {
      adapter_class.prototype = utils.extend(new BaseAdapter(), adapter_class.prototype);
      this.adapter = new adapter_class(options);
      if (options.version_check_interval)
        this.adapter.version_check_interval = options.version_check_interval;
    }
  }

};

Cache.prototype = {

  /**
   * Fetches data from cache
   *
   * @param key
   * @param fallback
   * @param callback
   */
  fetch: function(key, fallback, callback) {
    if (!this.adapter) {
      if (utils.isFunction(fallback)) {
        fallback(function(err, data) {
          if (data) {
            callback(null, data);
          } else callback("no data", null);
        }.bind(this));
      } else {
          callback(null, fallback);
      }
      return;
    }
    this.adapter.fetch(key, fallback, callback);
  },

  /**
   * Stores data in the cache
   *
   * @param key
   * @param value
   * @param callback
   */
  store: function(key, value, callback) {
    if (!this.adapter) {
      if (utils.isFunction(callback)) callback();
      return;
    }
    this.adapter.store(key, value, callback);
  },

  /**
   * Deletes data from cache
   *
   * @param key
   * @param callback
   */
  del: function(key, callback) {
    if (!this.adapter) {
      callback();
      return;
    }
    this.adapter.del(key, callback);
  },

  /**
   * Checks if data exists in the cache
   *
   * @param key
   * @param callback
   */
  exists: function(key, callback) {
    if (!this.adapter) {
      callback();
      return;
    }
    this.adapter.exists(key, callback);
  },

  /**
   * Fetches current release version
   *
   * @param callback
   */
  fetchVersion: function(callback) {
    if (!this.adapter) {
      callback({version: this.options.version || '0'});
      return;
    }
    this.adapter.fetchVersion(callback);
  },

  /**
   * Stores release version in local cache
   *
   * @param version
   * @param callback
   */
  storeVersion: function(version, callback) {
    this.version = version;
    if (!this.adapter) {
      if (callback) callback(version);
      return;
    }
    this.adapter.storeVersion(version, callback);
  },

  /**
   * Sets internal version
   *
   * @param new_version
   */
  setVersion: function(new_version) {
    this.version = new_version;
    if (this.adapter) {
      this.adapter.version = new_version;
    }
  },

  /**
   * Resets internal version
   */
  resetVersion: function() {
    if (!this.adapter) return;
    this.version = null;
  },

  /**
   * Returns version check interval
   *
   * @returns {number}
   */
  getVersionCheckInterval: function() {
    if (!this.adapter) return 0;
    return this.adapter.version_check_interval * 1000;
  },

  /**
   * Clears cache
   *
   * @param callback
   */
  clear: function(callback) {
    if (!this.adapter) {
      if (callback) callback();
      return;
    }
    this.adapter.clear(callback);
  }
};

module.exports = Cache;