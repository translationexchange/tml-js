// entry point for browserify
window.Tr8nSDK = require('../tr8n');

window.tr = function(label, description, tokens, options) {
  if (typeof description !== "string") {
    options = tokens || {};
    tokens  = description || {};
    description = "";
  }

  options = Tr8nSDK.utils.extend({}, options, {
    current_locale: Tr8nSDK.config.current_locale,
    current_source: Tr8nSDK.config.current_source,
    current_translator: Tr8nSDK.config.current_translator
  });

  return Tr8nSDK.translate(label, description, tokens, options);
};