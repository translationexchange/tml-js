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

// Exporting classes
exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;


// Exporting methods
exports.configure = Tr8n.configure;
