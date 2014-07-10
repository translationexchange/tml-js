var sys = require('sys');
var jsdom = require("jsdom");
var request = require('request');
var fs = require('fs');
var Tr8n = require('./lib/tr8n');

desc('Download a url and ');
task('default', [], function () {

//  var doc = jsdom.jsdom(original, jsdom.level(3, "core"));
//  var tokenizer = new Tr8n.Tokenizers.DomTokenizer(doc, {});
//
//  console.log("");
//  console.log(original);
//
//  console.log("");
//  tokenizer.debug(doc);
//
//  console.log("");
//  console.log(tokenizer.translate());
//  console.log("");

//  jsdom.env(
//    "http://nodejs.org/",
//    [],
//    function (errors, window) {
//      console.log(window.document);
//    }
//  );

  translatePage('http://www.vitac.com/', 'vitac');
  translatePage('http://www.google.com/', 'google');

});


function translatePage(url, name) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      fs.writeFile("./tmp/" + name + ".before.html", body, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("The file was saved!");
        }
      });

      var doc = jsdom.jsdom(body, jsdom.level(3, "core"));
      var tokenizer = new Tr8n.Tokenizers.DomTokenizer(doc, {});

      fs.writeFile("./tmp/" + name + ".after.html", tokenizer.translate(), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("The file was saved!");
        }
      });

//      console.log(body) // Print the google web page.
    }
  });
}