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

var logger    = require("./logger");
var utils     = require("./utils");
var config    = require("./configuration");

//var API_PATH = "/api/v1";
var API_PATH = "/v1/";

var CDN_URL   = 'https://cdn.translationexchange.com';
// var CDN_URL      = 'https://trex-snapshots.s3-us-west-1.amazonaws.com';

var ApiClient = function(app) {
  this.application = app;
  this.cache = config.getCache();

  if (config.api == "ajax") {
    this.request = require("./api/ajax");
  } else {
    this.request = require("./api/request");
  }
};

ApiClient.prototype = {

  normalizeParams: function(path, params, options, callback) {
    if (utils.isFunction(params)) {
      callback = params;
      params = {};
    } else if (utils.isFunction(options)) {
      callback = options;
      options = {};
    }
    options = options || {};
    return {path: path, params: params, options: options, callback: callback};
  },

  fetchReleaseVersion: function(callback) {
    // we only need to do this once per request
    // so if there are multiple API calls from a single request,
    // we only do the version check once
    if (this.cache.version && this.cache.version != 'undefined') {
      callback(this.cache.version);
      return;
    }

    var self = this;
    this.cache.getVersion(function(version) {
      // if version is defined in the cache use it.
      if (version != 'undefined') {
        self.cache.version = version;
        callback(version);
        return;
      }

      // fetch the current version from the server and set it in the cache
      var url = self.application.getHost() + API_PATH + 'applications/current/version';
      logger.log("fetching release version: " + url);

      var t0 = new Date();
      self.request.get(url, {access_token: self.application.access_token}, function (error, response, data) {
        var t1 = new Date();
        logger.debug("  cdn version call took " + (t1-t0) + " mls");

        if (error || !data) {
          callback('0');
          return;
        }

        // set the new version in the cache
        self.cache.setVersion(data, function(version) {
          logger.log("Setting release version to: " + version);
          callback(version);
        });
      });
    });
  },

  fetchFromCdn: function(key, callback) {
    var self = this;

    // when no snapshots are configured, don't use CDN
    if (('' + self.cache.version) == '0') {
      callback(null, null);
      return;
    }

    var cdn_url = CDN_URL + "/" + self.application.access_token + "/" + this.cache.version + "/" + key + ".json";
    logger.log("fetching from cdn: " + cdn_url);
    var t0 = new Date();
    self.request.get(cdn_url, {}, function (error, response, data) {
      var t1 = new Date();
      logger.debug("  cdn call took " + (t1-t0) + " mls");

      // S3 returns xml error when object is not found
      if (data.match(/xml/)) error = 'Not found';

      if (error || !data) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  },

  get: function(path, params, options, callback) {
    var opts = this.normalizeParams(path, params, options, callback);
    opts.options.method = "get";
    this.api(opts.path, opts.params, opts.options, opts.callback);
  },

  post: function(path, params, options, callback) {
    var opts = this.normalizeParams(path, params, options, callback);
    opts.options.method = "post";
    this.api(opts.path, opts.params, opts.options, opts.callback);
  },

  // internal - should never be used directly
  api: function(path, params, options, callback) {
    var t0 = new Date();

    utils.extend(params, {access_token: this.application.access_token});

    var url = this.application.getHost() + API_PATH + path;
    var self = this;

    var request_callback = function(error, response, body) {
      var t1 = new Date();

      logger.debug("api took " + (t1-t0) + " mls");

      if (!error && body) {
        callback(error, JSON.parse(body));
      } else {
        callback(error, body);
      }
    };

    if (options.method == "post") {
      self.request.post(url, params, request_callback);
    } else {
      if (options.cache_key && this.cache) {
        self.fetchReleaseVersion(function(version) {
          self.cache.fetch(options.cache_key, function(cache_callback) {
            self.fetchFromCdn(options.cache_key, function(error, data) {
              if (data) {
                cache_callback(error, data);
              } else {
                //logger.debug("api " + options.method + " " + url, params);
                logger.debug("api " + options.method + " " + url);
                self.request.get(url, params, function (error, response, body) {
                  var t1 = new Date();
                  logger.debug("  api call took " + (t1 - t0) + " mls");

                  if (error)
                    logger.debug("  api error: " + error);

                  cache_callback(error, body);
                });
              }
            });
          }, function(error, data) {
            if (!error && data) {
              try {
                data = JSON.parse(data);
              } catch (e) {
                error = e;
                data = null;
              }
              callback(error, data);
            } else
              callback(error, null);
          });
        });
      } else {
//        logger.debug("api " + options.method + " " + url, params);
        logger.debug("api " + options.method + " " + url);
        self.request.get(url, params, request_callback);
      }
    }
  }

};

module.exports = ApiClient;
