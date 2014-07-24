// entry point for browserify
window.Tr8n = require('../tr8n');

window.tr = function(label, description, tokens, options) {
  options = utils.extend({}, options, {
    current_locale: config.current_locale,
    current_source: config.current_source,
    current_translator: config.current_translator
  });
  return Tr8n.translate(label, description, tokens, options);
};