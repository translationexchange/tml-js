var Tr8n = require("../lib/tr8n");
var fs = require("fs");

var fixturePath = "./fixtures";

exports = {

  initLanguage: function(locale, callback) {
    fs.readFile(fixturePath + "/languages/" + locale + ".json", function (err, data) {
      if (err) throw err;
      callback(new Tr8n.Language(data));
    });
  },

  initApplication: function(callback) {
    fs.readFile(fixturePath + "/application.json", function (err, data) {
      if (err) throw err;
      callback(new Tr8n.Application(data));
    });
  }


};