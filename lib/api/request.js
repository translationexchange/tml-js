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

var request = require('request');
var utils   = require('../utils');
var logger  = require('../logger');

var Request = {

  // http://nickfishman.com/post/49533681471/nodejs-http-requests-with-gzip-deflate-compression
  get: function(url, params, callback){
    var t0 = new Date();

    if(!callback) callback = function(){};
    logger.debug("get " + url + "?" + utils.toQueryParams(params));
    //logger.debug("get " + url + "?" + utils.toQueryParams(params));
    request.get({
      url: url,
      qs: params || {},
      headers: {
        'User-Agent':       'tml-js v0.2.19 (request v2.60.0)'
        //'Accept':           'application/json',
        //'Accept-Encoding':  'gzip, deflate'
      }
    }, function(error, response, body) {
      var t1 = new Date();
      logger.debug(" call took " + (t1-t0) + " mls");

      // logger.debug(body);
      callback(error, response, body);
    });
  },

  post: function(url, params, callback) {
    if(!callback) callback = function(){};
    logger.debug("post " + url + "?" + utils.toQueryParams(params));
    request.post(url, {form: params || {}}, callback);
  }

};

module.exports = Request;