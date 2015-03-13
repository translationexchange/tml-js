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

var memcached    = require("memcached");

var MemcacheAdapter = function(config) {
  this.config = config || {};
  this.config.timeout = this.config.timeout || 3600;
  this.cache = this.create();
};

RedisAdapter.prototype = utils.extend(new Base(), {

  name : "memcache",
  read_only : false,
  cached_by_source : true,

  create: function() {
    return new memcached(this.config.hosts, this.config.options);
  },

  fetch: function(key, def, callback) {
    callback = callback || function(){};
    this.cache.get(this.getVersionedKey(key), function(err, data) {
      if (data) {
        this.info("cache hit " + key);
        callback(null, data);
      } else {
        this.info("cache miss " + key);
        if (typeof def === "function") {
          def(function(err, data) {
            if (data) {
              this.store(key, data, function () {
                callback(null, data);
              });
            } else callback("no data", null);
          }.bind(this));
        } else if (def) {
          this.store(key, def, function(data) {
            callback(null, data);
          });
        } else {
          callback(null, null);
        }
      }
    }.bind(this));
  },

  store: function(key, value, callback) {
    this.info("cache store " + key);
    return this.cache.set(this.getVersionedKey(key), value, this.config.timeout, callback);
  },

  del: function(key, callback) {
    this.info("cache del " + key);
    this.cache.del(this.getVersionedKey(key), callback);
  },

  exists: function(key, callback){
    this.cache.get(this.getVersionedKey(key), function(err, data) {
      if (callback) callback(!(err || !data));
    });
  },

  info: function(msg) {
    console.log(this.name + " - " + msg);
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
          self.info("Updating cache version to: " + self.config.version);
          self.setVersion(self.config.version, function(version) {
            self.version = version;
            if (callback) callback(self.version);
          });
        } else {
          self.version = data;
          if (callback) callback(self.version);
        }
      });
      return;
    }

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

  clear: function(callback) {
    if (callback) callback(null);
  }

});

module.exports = function(options) {
  options = options || {};
  options.adapter = MemcacheAdapter;
  return options;
};