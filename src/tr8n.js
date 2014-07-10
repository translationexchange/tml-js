var program = require('commander');

program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);

//function translate(label, description, tokens, options) {
//  label = label || process.argv[2];
//  console.log(label);
//  return label;
//}

Tr8n.config = new Tr8n.Configuration();

//
Tr8n.cache = new Tr8n.Cache();

//
Tr8n.api = new Tr8n.ApiClient();

// Exporting classes
exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;


// Exporting methods
exports.configure = function(callback) {
  callback(Tr8n.config);
};


exports.tr = function(label,....) {
  callback(Tr8n.config);
};

exports.tr = function(label,....) {
  callback(Tr8n.config);
};

tr8n = require("tr8n");

tr8n.configure(function(config) {
  config.key = "";
  config.secret = ""; // only for dev/translation
  config.bla = bla;
});

require('tr8n')
