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

var Language = require("../lib/language.js");
var DataToken = require("../lib/application.js");

var fs = require("fs");
var path = require('path');
var async = require('async');
var fixture_path = "test/fixtures/";

var FixtureHelper = {
  loadJSON: function(filepath, callback) {
    fs.readFile(path.resolve(process.cwd(), fixture_path + filepath + ".json"), function (err, data) {
      if (err) throw err;
      callback(JSON.parse(data));
    });
  },
  load: function(filepath, callback) {
    fs.readFile(path.resolve(process.cwd(), fixture_path + filepath), 'utf8', function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }
};

var ModelHelper = {
  languages: function(locales, main_callback) {
    var languages = {};

    locales.forEach(function(locale) {
      languages[locale] = function(callback) {
        FixtureHelper.loadJSON("languages/" + locale, function (data) {
          callback(null, new Language(data));
        });
      };
    });

    async.parallel(languages, function(err, results) {
      if (err) throw err;

      main_callback(results);
    });
  },

  application: function(callback) {
    FixtureHelper.load("application", function (data) {
      callback(new Application(data));
    });
  }
};

exports.fixtures = FixtureHelper;
exports.models = ModelHelper;