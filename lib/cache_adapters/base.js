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

var logger    = require('../logger');

var VERSION_KEY  = '__tr8n_version__';
var KEY_PREFIX   = 'tr8n_v';


var Base = function() {

};

Base.prototype = {

  read_only         : true,
  cached_by_source  : true,
  name              : "",

  initialize: function(config) {
    this.config = config || {};
    this.cache = this.create();
    this.getVersion();
  },

  create: function(){

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
    logger.log(this.name + " - " + msg);
  },

  info: function(msg) {
    logger.log(this.name + " - " + msg);
  },

  getVersion: function(callback) {
    if (!this.version) {
      this.fetch(VERSION_KEY, 1, function(value) {
        this.version = value;
        if(callback) callback(this.version)
      }.bind(this))
    }
    if(callback) callback(this.version)
  },

  getVersionedKey: function(key) {
    if (key == VERSION_KEY) return key;
    return KEY_PREFIX + this.version + "_" + key;
  }

};

module.exports = Base;