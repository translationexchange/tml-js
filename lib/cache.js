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

var utils       = require("./utils");
var BaseAdapter = require('./cache_adapters/base');

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
    }
  }

};

Cache.prototype = {

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

  store: function(key, value, callback) {
    if (!this.adapter) {
      if (utils.isFunction(callback)) callback();
      return;
    }
    this.adapter.store(key, value, callback);
  },

  del: function(key, callback) {
    if (!this.adapter) {
      callback();
      return;
    }
    this.adapter.del(key, callback);
  },

  exists: function(key, callback) {
    if (!this.adapter) {
      callback();
      return;
    }
    this.adapter.exists(key, callback);
  },

  fetchVersion: function(callback) {
    if (!this.adapter) {
      callback(this.options.version || '0');
      return;
    }
    this.adapter.fetchVersion(callback);
  },

  storeVersion: function(version, callback) {
    this.version = version;
    if (!this.adapter) {
      if (callback) callback(version);
      return;
    }
    this.adapter.storeVersion(version, callback);
  },

  setVersion: function(new_version) {
    this.version = new_version;
    if (this.adapter) {
      this.adapter.version = new_version;
    }
  },

  resetVersion: function() {
    if (!this.adapter) return;
    this.version = null;
  },

  clear: function(callback) {
    if (!this.adapter) {
      if (callback) callback();
      return;
    }
    this.adapter.clear(callback);
  }
};

module.exports = Cache;