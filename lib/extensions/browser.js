// entry point for browserify
window.Tr8nSDK = require('../tr8n');

window.tr8n_init = function(key, secret, callback) {
  if (window.tr8n_already_initialized) return;
  window.tr8n_already_initialized = true;

  var data = Tr8nSDK.utils.decodeAndVerifyParams(Tr8nSDK.utils.getCookie(key));
  var current_translator = (data && data.translator) ? new Tr8nSDK.Translator(data.translator) : null;
  var default_locale = "en-US";
  var current_locale = (data && data.locale) ? data.locale : default_locale;
  var current_source = "/";

  Tr8nSDK.init(key, secret, {
    host: "http://localhost:3000",
    default_locale: default_locale,
    current_locale: current_locale,
    current_source: current_source,
    current_translator: current_translator,
    api: "ajax",
    cache: {
      enabled: true,
      adapter: "inline"
    }
  });

  var locales = [Tr8nSDK.application.default_locale];
  if (current_locale) {
    locales.push(current_locale);
  } else {
    current_locale = Tr8nSDK.application.default_locale;
  }

  Tr8nSDK.application.init({
    current_locale: current_locale,
    locales: locales,
    sources: [current_source],
    translator: current_translator
  }, function(error) {
    Tr8nSDK.utils.addCSS(window.document, Tr8nSDK.application.host + '/assets/tr8n/tools.css', false);
    Tr8nSDK.utils.addCSS(window.document, Tr8nSDK.application.css, true);
    Tr8nSDK.utils.addJS(window.document, 'tr8n-jssdk', Tr8nSDK.application.host + '/assets/tr8n/tools.js', function() {
      Tr8n.app_key = Tr8nSDK.application.key;
      Tr8n.host = Tr8nSDK.application.host;
      Tr8n.sources = [];
      Tr8n.default_locale = Tr8nSDK.application.default_locale;
      Tr8n.page_locale = Tr8nSDK.config.current_locale;
      Tr8n.locale = Tr8nSDK.config.current_locale;

      if (Tr8nSDK.application.isFeatureEnabled("shortcuts")) {
        for (var sc in Tr8nSDK.application.shortcuts) {
          shortcut.add(sc, (function(sc){
            return function(){
              eval(Tr8nSDK.application.shortcuts[sc]);
            }
          })(sc))
        }
      }
    });

    if (callback) callback();
  });
};

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

//  console.log(Tr8nSDK.config.current_translator);

  return Tr8nSDK.translate(label, description, tokens, options);
};