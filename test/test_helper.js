var Tr8n = require("../lib/tr8n");
var fs = require("fs");
var path = require('path');
var async = require('async');
var fixture_path = "test/fixtures/";

var FixtureHelper = {
  load: function(filepath, callback) {
    fs.readFile(path.resolve(process.cwd(), fixture_path + filepath + ".json"), function (err, data) {
      if (err) throw err;
      callback(JSON.parse(data));
    });
  }
};

var ModelHelper = {
  languages: function(locales, main_callback) {
    var languages = {};

    locales.forEach(function(locale) {
      languages[locale] = function(callback) {
        FixtureHelper.load("languages/" + locale, function (data) {
          callback(null, new Tr8n.Language(data));
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
      callback(new Tr8n.Application(data));
    });
  }
};

exports.fixtures = FixtureHelper;
exports.models = ModelHelper;