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

var Inline = function(config) {
  this.initialize(config);
};

Inline.prototype = utils.extend(new Base(), {

  name: "inline",
  read_only: true,

  create: function() {
    window.Tr8nCache = window.Tr8nCache || {};
    return window.Tr8nCache;
  },

  fetch: function(key, def, callback) {
    var val = this.cache[key];

    if (val) {
      this.info("cache hit " + key);
      val = JSON.stringify(val);
      if (callback) callback(null, val);
      return;
    }

    this.info("cache miss " + key);

    if (utils.isFunction(def)) {
      def(function(err, data) {
        // the cache is readonly and cannot store anything
        callback(err, data);
      });
      return;
    }

    val = def || null;
    if (val) val = JSON.stringify(val);
    if (callback) callback(null, val);
  },

  store: function(key, value, callback) {
    this.info("the cache is readonly. can't store data");
    return value;
  },

  del: function(key, callback) {
    this.info("the cache is readonly. can't delete data");
  },

  exists: function(key, callback){
    if(callback) callback(!!this.cache[key]);
  }

});

module.exports = Inline;