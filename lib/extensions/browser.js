// entry point for browserify
window.Tr8n = require('../tr8n');

window.tr = function(label, description, tokens, options) {
  options = Tr8n.utils.extend({}, options, {
    current_locale: Tr8n.config.current_locale,
    current_source: Tr8n.config.current_source,
    current_translator: Tr8n.config.current_translator
  });
  return Tr8n.translate(label, description, tokens, options);
};