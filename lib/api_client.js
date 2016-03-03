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

var logger = require("./logger");
var utils = require("./utils");
var config = require("./configuration");
var BaseAdapter = require('./api_adapters/base');

var API_PATH = "/v1/";

/**
 * API Client
 *
 * @param app
 * @constructor
 */
var ApiClient = function (app) {
  this.application = app;
  this.cache = config.getCache();
  var adapter_class = config.getApiAdapter(config.api);
  adapter_class.prototype = utils.extend(new BaseAdapter(), adapter_class.prototype);
  this.adapter = new adapter_class();
};

ApiClient.prototype = {

  /**
   * Normalizes API params
   *
   * @param path
   * @param params
   * @param options
   * @param callback
   * @returns {{path: *, params: *, options: (*|{}), callback: *}}
   */
  normalizeParams: function (path, params, options, callback) {
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

  /**
   * Gets the latest release version from the CDN
   * @param callback
   */
  getReleaseVersion: function (callback) {
    var self = this;
    var t = new Date().getTime();

    var url = this.application.getCdnHost() + "/" + this.application.key + "/version.json";

    self.adapter.get(url, {t: t}, function (error, response, data) {
      if (response.status == 403 || error || !data) {
        callback('0');
      } else {
        try {
          data = JSON.parse(data);
          callback(data.version);
        } catch (err) {
          callback('0');
        }
      }
    });
  },

  /**
   * Pulls the latest release and update it in the cache
   * @param callback
   */
  updateReleaseVersion: function (current_version, callback) {
    var self = this;
    self.getReleaseVersion(function (new_version) {
      self.cache.storeVersion(new_version, function (updated_version) {
        if (current_version != updated_version) {
          logger.debug("Changing version from " + current_version + " to " + updated_version);
          self.cache.clear();
        }
        callback(updated_version);
      });
    });
  },

  /**
   * Checks local cache first, if the release is undefined, get it and update the local cache
   * @param callback
   */
  getCacheVersion: function (callback) {
    // check version in the memory cache first
    if (this.cache.version && this.cache.version != 'undefined') {
      callback(this.cache.version);
      return;
    }

    var self = this;

    // get version from local cache
    this.cache.fetchVersion(function (version_data) {

      // check timestamp for the version
      var needs_version_check = false;
      if (version_data.t) {
        var expires_at = version_data.t + self.cache.getVersionCheckInterval();
        var now = new Date().getTime();
        if (expires_at < now) {
          logger.debug("Cache version is outdated and needs a refresh now");
          needs_version_check = true;
        } else {
          var delta = Math.round((expires_at - now) / 1000);
          logger.debug("Cache version is up to date, will be checked in: " + delta + "s");
        }
      } else {
        logger.debug("Cache version has no timestamp, needs a refresh");
        needs_version_check = true;
      }

      //logger.debug(version_data);

      if (needs_version_check) {
        // update local cache version from CDN
        self.updateReleaseVersion(version_data.version, function (new_version) {
          callback(new_version);
        });
      } else {
        // if version is defined in the cache use it.
        self.cache.setVersion(version_data.version);
        callback(version_data.version);
      }
    });
  },

  /**
   * Fetches data from CDN
   *
   * @param key
   * @param callback
   */
  fetchFromCdn: function (key, callback) {
    var self = this;

    if (self.cache.version == '0') {
      callback(null, null);
      return;
    }

    var cdn_url = this.application.getCdnHost() + "/" + this.application.key + "/" + this.cache.version + utils.normalizePath(key) + ".json";
    self.adapter.get(cdn_url, {}, function (error, response, data) {
      if (!data || data.match(/xml/)) error = 'Not found';

      if (error || !data) {
        callback(error, null);
      } else {
        callback(null, data);
      }
    });
  },

  /**
   * Gets data from URL
   *
   * @param path
   * @param params
   * @param options
   * @param callback
   */
  get: function (path, params, options, callback) {
    var opts = this.normalizeParams(path, params, options, callback);
    opts.options.method = "get";
    this.api(opts.path, opts.params, opts.options, opts.callback);
  },

  /**
   * Posts data to URL
   *
   * @param path
   * @param params
   * @param options
   * @param callback
   */
  post: function (path, params, options, callback) {
    var opts = this.normalizeParams(path, params, options, callback);
    opts.options.method = "post";
    this.api(opts.path, opts.params, opts.options, opts.callback);
  },

  isLiveApiRequest: function() {
    if (!this.application.token) return false;
    return this.application.isInlineModeEnabled();
  },

  isCacheEnabled: function(options) {
    if (options.method == "post") return false;
    return options.cache_key && this.cache;
  },

  /**
   * Internal - should never be used directly
   *
   * @param path
   * @param params
   * @param options
   * @param callback
   */
  api: function (path, params, options, callback) {
    utils.extend(params, {access_token: this.application.token});

    var url = this.application.getHost() + API_PATH + path;
    var self = this;

    var request_callback = function (error, response, body) {
      if (!error && body) {
        callback(error, JSON.parse(body));
      } else {
        callback(error, body);
      }
    };

    if (self.isLiveApiRequest()) {
      if (options.method == "post") {
        self.adapter.post(url, params, request_callback);
      } else {
        self.adapter.get(url, params, request_callback);
      }
      return;
    }

    if (!self.isCacheEnabled(options)) {
      request_callback('Cache is disabled');
      return;
    }

    self.getCacheVersion(function (version) {
      if (parseInt(version) === 0) {
        request_callback('No release has been published');
      } else {
        self.cache.fetch(options.cache_key, function (cache_callback) {
          self.fetchFromCdn(options.cache_key, cache_callback);
        }, function (error, data) {
          if (!error && data) {
            try {
              data = JSON.parse(data);
            } catch (e) {
              return callback(e);
            }
            callback(null, data);
          } else
            callback(error);
        });
      }
    });
  }

};

module.exports = ApiClient;
