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

//function translate(label, description, tokens, options) {
//  label = label || process.argv[2];
//  console.log(label);
//  return label;
//}

Tr8n.config = new Tr8n.Configuration();

// Cache adapters
//Tr8n.cache = new Tr8n.Cache();

// Api Client
//Tr8n.api = new Tr8n.ApiClient();

// Exporting classes
exports.Configuration = Tr8n.Configuration;
exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Tokens = Tr8n.Tokens;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;
exports.Language = Tr8n.Language;
exports.LanguageContext = Tr8n.LanguageContext;
exports.LanguageContextRule = Tr8n.LanguageContextRule;
exports.LanguageCase = Tr8n.LanguageCase;
exports.LanguageCaseRule = Tr8n.LanguageCaseRule;
exports.Application = Tr8n.Application;
exports.TranslationKey = Tr8n.TranslationKey;
exports.Translation = Tr8n.Translation;


exports.configure = function(callback) {
  callback(Tr8n.config);
};

//exports.tr = function(label, description, tokens, options) {
//
//  return label;
//};

exports.init = function init(key, secret, options) {
    options = options || {};
    options.url = options.url || "https://translationexchange.com";

    return function init(req, res, next) {

        console.log("Getting " + req.url);
//        console.log(__dirname);

        var files = ["application", "en-US"];
        var data = {};

        // TODO: load languages, cache for sources
        // init cookies

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
            app.addLanguage(results["en-US"]);
            req.tr8n = app;

            res.locals.tr = function(label, description, tokens, options) {
                if (typeof description != "string") {
                    tokens = description;
                    description = "";
                }

                var value = app.getLanguage("en-US").translate(label, description, tokens, options);
                console.log(value);
                return value;
            };

            function finishRequest(){
                res.removeListener('finish', finishRequest);
                res.removeListener('close', finishRequest);
                // TODO: flush the missing translation keys
                console.log("Done");
            }

            res.on("finish", finishRequest);
            res.on("close", finishRequest);

            next();
        });
    };
};