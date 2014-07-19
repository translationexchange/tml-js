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

var fs = require("fs");
var path = require('path');
var async = require('async');
var cookies = require('cookies');

var config = require('../configuration');
var tr8n = require('../tr8n');
var utils = require('../utils');
var tr8n_scripts = require('../helpers/header_scripts');

var Translator = require('../translator');
var Application = require('../application');

exports.init = function init(key, secret, options) {
  options = options || {};
  utils.extend(config, options);

  return function init(req, res, next) {
    var data = utils.decodeAndVerifyParams((new cookies( req, res )).get("tr8n_" + key), secret);
    console.log("Got Cookie:");
    console.log(data);

    var current_locale = data.locale;
    var current_translator = data.translator ? new Translator(data.translator) : null;

    var application = new Application({
      key: key,
      secret: secret,
      host: options.host || "http://localhost:3001"
    });

    req.tr8n_block_options = [];

    res.locals.tr = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        tokens = description;
        description = "";
      }
      tokens = tokens || {};
      options = options || {};

      // TODO: make user method configurable
      tokens.viewing_user = req.user;

      options.current_translator = current_translator;
      options.block_options = req.tr8n_block_options;

      // for now - check if language was loaded from cache
      if (application.getLanguage(current_locale))
        return application.getLanguage(current_locale).translate(label, description, tokens, options);

      return application.getLanguage(application.default_locale).translate(label, description, tokens, options);
    };

    res.locals.tr8n_scripts = function() {
      return tr8n_scripts.header(application, {
        current_language: application.getLanguage(current_locale) || application.getLanguage(application.default_locale)
      });
    };

    res.locals.tr8n_block_with_options = function(options, callback) {
      req.tr8n_block_options.unshift(options);
//        console.log(req.tr8n_block_options);
      callback();
      req.tr8n_block_options.pop();
    };

    var finishRequest = function() {
      res.removeListener('finish', finishRequest);
      res.removeListener('close', finishRequest);

      application.submitMissingTranslationKeys();
    };

    res.on("finish", finishRequest);
    res.on("close", finishRequest);

    application.init({
      // There may be more locales based on fallbacks
      locales: [application.default_locale, current_locale],

      // TODO: load sources with translations
      sources: []
    }, function(error) {

      res.locals.tr8n_application = application;
      res.locals.tr8n_default_language = application.getLanguage(application.default_locale);
      res.locals.tr8n_current_language = application.getLanguage(current_locale);

      next();
    });
  };
};