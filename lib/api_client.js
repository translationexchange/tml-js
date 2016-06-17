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
var promise = require('promise');

var API_PATH = "/v1/";

var parseOrReject = function (body) {
  try {
    return JSON.parse(body);
  } catch (e) {
    return promise.reject(e);
  }
}

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
   * @returns {{path: *, params: *, options: (*|{})}}
   */
  normalizeParams: function (path, params, options) {
    options = options || {};
    return {path: path, params: params, options: options};
  },

  /**
   * Gets the latest release version from the CDN
   */
  getReleaseVersion: function () {
    var self = this;
    var t = new Date().getTime();

    var url = this.application.getCdnHost() + "/" + this.application.key + "/version.json";

    return self.adapter.get(url, {t: t})
        .then(function (data) {
          return JSON.parse(data).version;
        })
        .catch(function (err) {
          return 0;
        });
  },

  /**
   * Pulls the latest release and update it in the cache
   */
  updateReleaseVersion: function (current_version) {
    var self = this;
    return self.getReleaseVersion()
        .then(function (new_version) {
          return self.cache.storeVersion(new_version)
              .then(function (updated_version) {
                if (current_version != updated_version) {
                  logger.debug("Changing version from " + current_version + " to " + updated_version);
                  self.cache.clear();
                }
                return updated_version;
              });
        });
  },

  /**
   * Checks local cache first, if the release is undefined, get it and update the local cache
   */
  getCacheVersion: function () {
    // check version in the memory cache first
    if (this.cache.version && this.cache.version != 'undefined') {
      return promise.resolve(this.cache.version);
    }

    var self = this;

    // get version from local cache
    return this.cache.fetchVersion()
      .then(function (version_data) {
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
          return self.updateReleaseVersion(version_data.version);
        } else {
          // if version is defined in the cache use it.
          self.cache.setVersion(version_data.version);
          return promise.resolve(version_data.version);
        }
      });
  },

  /**
   * Fetches data from CDN
   *
   * @param key
   */
  fetchFromCdn: function (key) {
    var self = this;

    if (self.cache.version == '0') {
      return promise.resolve(null);
    }

    var cdn_url = this.application.getCdnHost() + "/" + this.application.key + "/" + this.cache.version + utils.normalizePath(key) + ".json";
    return self.adapter.get(cdn_url, {})
        .then(function (data) {
          if (!data || data.match(/xml/)) 
            throw new Error('Not found');
          
          return data;
      });
  },

  /**
   * Gets data from URL
   *
   * @param path
   * @param params
   * @param options
   */
  get: function (path, params, options) {
    var opts = this.normalizeParams(path, params, options);
    opts.options.method = "get";
    return this.api(opts.path, opts.params, opts.options);
  },

  /**
   * Posts data to URL
   *
   * @param path
   * @param params
   * @param options
   */
  post: function (path, params, options) {
    var opts = this.normalizeParams(path, params, options);
    opts.options.method = "post";
    return this.api(opts.path, opts.params, opts.options);
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
   */
  api: function (path, params, options) {
    utils.extend(params, {access_token: this.application.token});

    var url = this.application.getHost() + API_PATH + path;
    var self = this;
    
    if (self.isLiveApiRequest()) {
      if (options.method == "post") {
        return self.adapter.post(url, params)
            .then(parseOrReject);
      } else {
        return self.adapter.get(url, params)
            .then(parseOrReject);
      }
    }

    if (!self.isCacheEnabled(options)) {
      return promise.reject('Cache is disabled');
    }

    return self.getCacheVersion()
        .then(function (version) {
          if (parseInt(version) === 0) {
            return promise.reject(new Error('No release has been published'));
          } else {
            return self.cache.fetch(options.cache_key, function () {
              return self.fetchFromCdn(options.cache_key);
            })
            .then(parseOrReject);
          }
        });
  }

};

module.exports = ApiClient;
