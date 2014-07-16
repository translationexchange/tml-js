var Tr8n = require("../lib/tr8n");
var fs = require("fs");
var path = require('path');

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
  language: function(locale, callback) {
    FixtureHelper.load("languages/" + locale, function (data) {
      callback(new Tr8n.Language(data));
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