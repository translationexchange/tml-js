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

var utils   = require('../utils');
var Base    = require('./base');

var Redis = function(config) {
  this.initialize(config);
};

Redis.prototype = utils.extend(new Base(), {

  name: "redis",
  read_only: false,

  create: function() {
    var redis   = require("redis");
    return redis.createClient(this.config.port, this.config.host, this.config.options || {});
  },

  fetch: function(key, def, callback) {
    callback = callback || function(){};
    this.cache.get(this.getVersionedKey(key), function(err, data) {
      if (data) {
//        this.info("cache hit " + key + ": " + data);
        this.info("cache hit " + key);
        callback(null, data);
      } else {
        this.info("cache miss " + key);
        if (utils.isFunction(def)) {
          def(function(err, data) {
            if (data) {
//              console.log(data);
              this.store(key, data, function () {
                callback(null, data);
              });
            } else callback("no data", null);
          }.bind(this));
        } else if (def) {
          this.store(key, def, function(data) {
            callback(null, data);
          });
        }
      }
    }.bind(this));
  },

  store: function(key, value, callback) {
//    this.info("cache store " + key + " " + value);
    this.info("cache store " + key);
    return this.cache.set(this.getVersionedKey(key), value, callback);
  },

  del: function(key, callback) {
    this.info("cache del " + key);
    this.cache.del(this.getVersionedKey(key), callback);
  },

  exists: function(key, callback){
    this.cache.get(this.getVersionedKey(key), function(err, data) {
      if (callback) callback(!(err || !data));
    });
  }

});

module.exports = Redis;