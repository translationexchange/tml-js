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

var request = require("request");

var utils     = require("./utils");


var API_HOST = "https://translationexchange.com";
var API_PATH = "/tr8n/api/";

var ApiClient = function(app) {
  this.application = app;
};

ApiClient.prototype = {

  getHost: function() {
    return this.application.host || API_HOST;
  },

  getAccessToken: function(callback) {
    if (this.application.access_token) {
      callback(error, this.application.access_token);
      return;
    }

    this.api("oauth/request_token", {
      client_id: this.application.key,
      client_secret: this.application.secret,
      grant_type: "client_credentials"
    }, function(error, data) {
      if (!error) {
        this.application.access_token = data;
      }
      callback(error, data);
    }.bind(this));
  },

  get: function(path, params, options, callback) {
    options = options || {};
    options.method = "get";
    this.api(path, params, options, callback);
  },

  post: function(path, params, options, callback) {
    options = options || {};
    options.method = "post";
    this.api(path, params, options, callback);
  },

  api: function(path, params, options, callback) {
    options = options || {};

    if (utils.isFunction(params)) {
      callback = params;
      params = {};
    } else if (utils.isFunction(options)) {
      callback = options;
      options = {};
    }

    var request_callback = function(error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(error, JSON.parse(body));
      } else {
        callback(error, body);
      }
    };

    utils.extend(params, {key: this.application.key});

    var url = this.getHost() + API_PATH + path;
    console.log("Requesting " + url + " with params: ");
    console.log(params);

    if (options.method == "post") {
      this.getAccessToken(function(error, token_info) {
        utils.extend(params, {access_token: token_info.access_token});
        request.post(url, {qs: params}, request_callback);
      }.bind(this));
    } else {
      request.get(url, {qs: params}, request_callback);
    }
  }

};

module.exports = ApiClient;
