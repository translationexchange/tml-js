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