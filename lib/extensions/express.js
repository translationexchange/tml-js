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
var tr8n_scripts = require(__dirname + '/tr8n.helpers.js');

// Configuration
Tr8n.config = new Tr8n.Configuration();

// Cache adapters
//Tr8n.cache = new Tr8n.Cache();

// Api Client
//Tr8n.api = new Tr8n.ApiClient();

exports.configure = function(callback) {
  callback(Tr8n.config);
};

exports.init = function init(key, secret, options) {
  options = options || {};
  Tr8n.Utils.extend(Tr8n.config, options);

  return function init(req, res, next) {
    var data = Tr8n.Utils.decodeAndVerifyParams((new cookies( req, res )).get("tr8n_" + key), secret);
    console.log(data);

    var current_locale = data.locale;
    var current_translator = data.translator ? new Tr8n.Translator(data.translator) : null;

    // TODO: load application, languages, sources from api/cache
    // Make sure to fetch at least current_locale and app.default_locale
    // currently loading them from files
    var files = ["application", "en-US", "ru"];
    data = {};
    files.forEach(function(file) {
      data[file] = function(callback) {
        var path = __dirname + "/../config/data/" + file + ".json";
        console.log("Loading " + path + " ...");

        fs.readFile(path, function (err, data) {
          if (err) {
              console.log(err);
              throw err;
          }

          if (file == "application")
              callback(null, new Tr8n.Application(JSON.parse(data)));
          else
              callback(null, new Tr8n.Language(JSON.parse(data)));
        });
      };
    });

    async.parallel(data, function(err, results) {
      if (err) {
          console.log(err);
          throw err;
      }

      var app = results["application"];
      app.host = "https://translationexchange.com";
      app.host = "http://localhost:3001";
      app.addLanguage(results["en-US"]);
      app.addLanguage(results["ru"]);
      req.tr8n = app;
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
        if (app.getLanguage(current_locale))
          return app.getLanguage(current_locale).translate(label, description, tokens, options);

        return app.getLanguage(app.default_locale).translate(label, description, tokens, options);
      };

      res.locals.tr8n_scripts = function() {
        return tr8n_scripts.header(app, {
          current_language: app.getLanguage(current_locale) || app.getLanguage(app.default_locale)
        });
      };

      res.locals.tr8n_block_with_options = function(options, callback) {
        req.tr8n_block_options.unshift(options);
//        console.log(req.tr8n_block_options);
        callback();
        req.tr8n_block_options.pop();
      };

      function finishRequest(){
          res.removeListener('finish', finishRequest);
          res.removeListener('close', finishRequest);

          app.submitMissingTranslationKeys();
      }

      res.on("finish", finishRequest);
      res.on("close", finishRequest);

      next();
    });
  };
};