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

var Application = require('../application');

var config = require('../configuration');
var tr8n = require('../tr8n');
var utils = require('../utils');
var logger = require('../logger');

var tr8n_scripts = require('../helpers/header_scripts');
var Translator = require('../translator');

exports.init = function (key, secret, options) {
  
  tr8n.init(key, secret, options || {});

  return function (req, res, next) {
    var data = utils.decodeAndVerifyParams((new cookies( req, res )).get("tr8n_" + key), secret) || {};
    logger.log("Cookie:", data);

//    var application = tr8n.application;

    options = options || {};

    // Application must be initialized for each request - the internal app cache must be removed after each request
    var application = new Application({
      key: key,
      secret: secret,
      host: options.host
    });

    var current_locale = data.locale;

    if (!current_locale) {
      if (req.query.locale) {
        current_locale = req.query.locale;
        if (req.session) req.session.locale = current_locale;
      } else if (req.session && req.session.locale) {
        current_locale = req.session.locale;
      }
    }

    var current_translator = data.translator ? new Translator(data.translator) : null;
    var current_source = utils.normalizeSource(req.url);

    logger.log("request info: ", {current_source: current_source, current_locale: current_locale});

    req.tr8n_block_options = [];

    var translate = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options = tokens || {};
        tokens  = description || {};
        description = "";
      }

      tokens = utils.extend({}, tokens, {viewing_user:req.user});
      options = utils.extend({}, options, {
        current_locale: current_locale,
        current_source: current_source,
        current_translator: current_translator,
        block_options: req.tr8n_block_options || []
      });

      return application.getLanguage(current_locale).translate(label, description, tokens, options);
    };

    var translate_label = function(label, description, tokens, options) {
      if (typeof description !== "string") {
        options = tokens || {};
        tokens  = description || {};
        description = "";
      }

      tokens = utils.extend({}, tokens, {viewing_user:req.user});
      options = utils.extend({}, options, {
        current_locale: current_locale,
        current_source: current_source,
        current_translator: current_translator,
        block_options: req.tr8n_block_options || [],
        skip_decorations: true
      });

      return application.getLanguage(current_locale).translate(label, description, tokens, options);
    };

    req.tr = translate;
    req.trl = translate_label;
    res.locals.tr = translate;
    res.locals.trl = translate_label;

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

      config.getCache().resetVersion();

      application.submitMissingTranslationKeys(function(){
        logger.log("Tr8n Done");
      });
    };

    res.on("finish", finishRequest);
    res.on("close", finishRequest);

    var locales = [application.default_locale];
    if (current_locale) {
      locales.push(current_locale);
    } else {
      current_locale = application.default_locale;
    }

    config.getCache().getVersion(function(version) {
      logger.log("Cache version: " + version);

      application.init({
        // There may be more locales based on fallbacks
        current_locale: current_locale,
        locales: locales,
        sources: [current_source],
        translator: current_translator
      }, function(error) {

        res.locals.tr8n_application = application;
        res.locals.tr8n_default_language = application.getLanguage(application.default_locale);
        res.locals.tr8n_current_language = application.getLanguage(current_locale);

        next();
      });
    });
  };
};