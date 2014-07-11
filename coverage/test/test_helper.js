var fs = require("fs");

var fixturePath = "./fixtures";

exports = {

  initLanguage: function(locale, callback) {
    fs.readFile(fixturePath + "/" + locale + ".json", function (err, data) {
      if (err) throw err;
      callback(new Tr8n.Language(data));
    });
  }

};