
// entry point for browserify

var config      = require('../configuration');
var utils       = require('../utils');
var helpers     = require('../helpers/scripts');

var Application = require('../application');
var Translator  = require('../translator');
var DomTokenizer  = require('../tokenizers/dom');

var app = null;

var includeTools = function(app, callback) {
  utils.addCSS(window.document, app.tools.stylesheet, false);
  utils.addCSS(window.document, app.css, true);      

  utils.addJS(window.document, 'tml-jssdk', app.tools.javascript, function() {
    Tml.app_key = app.key;
    Tml.host = app.tools.host;
    Tml.sources = [];
    Tml.default_locale = app.default_locale;
    Tml.page_locale = config.current_locale;
    Tml.locale = config.current_locale;

    var shortcutFn = function(sc){
      return function(){
        eval(app.shortcuts[sc]); // jshint ignore:line
      };
    };

    if (app.isFeatureEnabled("shortcuts")) {
      for (var sc in app.shortcuts) {
        shortcut.add(sc, shortcutFn(sc));
      }
    }

    if (callback) callback();

  });
};

var tml = {

  application:null,
  block_options:[],

  init: function(token, options, callback) {

    var
      data                = utils.decodeAndVerifyParams(utils.getCookie(options.key)),
      current_translator  = (data && data.translator) ? new Translator(data.translator) : null,
      default_locale      = "en",
      current_locale      = (data && data.locale) ? data.locale : default_locale,
      current_source      = options.source || "/";

    var browser_element = null;
    if (options.element) {
      browser_element = (typeof options.element === "string") ? document.getElementById(options.element) : options.element;
      browser_element.style.display = "none";
    }

    options = utils.merge(config, {
      host: options.host,
      default_locale: default_locale,
      current_locale: current_locale,
      current_source: current_source,
      current_translator: current_translator,
      delayed_flush: true,
      api: "ajax",
      cache: {
        enabled: true,
        adapter: "browser"
      }
    }, options);

    config.initCache();

    app = tml.application = new Application({
      access_token    : token,
      host            : options.host
    });

    var locales = [app.default_locale];
    if (current_locale) {
      locales.push(current_locale);
    } else {
      current_locale = app.default_locale;
    }

    app.init({
      current_locale  : current_locale,
      locales         : locales,
      sources         : [current_source],
      translator      : current_translator
    },
    function(err) {
      if(err) {
        throw new Error(err);
      }

      // This should be optionable
      // Maybe tools and tml should be separate for now?
      includeTools(app, function() {
        if (browser_element !== null) {
          tml.translateElement(browser_element);
          browser_element.style.display = "block";
        }
        if (callback) callback();
      });
    });
  },

  translate: function(label, description, tokens, options) {
    if(!app) {
      throw new Error("Invalid application.");
    }

    if (typeof description !== "string") {
      options = tokens || {};
      tokens  = description || {};
      description = "";
    }

    options = utils.extend({}, {
      current_locale: config.current_locale,
      current_source: config.current_source,
      current_translator: config.current_translator,
      block_options: (tml.block_options || [])
    }, options);

    return tml.getCurrentLanguage().translate(label, description, tokens, options);
  },

  translateLabel: function(label, description, tokens, options) {
    if (typeof description !== "string") {
      options = tokens || {};
      tokens  = description || {};
      description = "";
    }

    options = utils.extend({}, {
      skip_decorations: true
    }, options);

    return tml.translate(label, description, tokens, options);
  },

  translateElement: function(element) {
    var container = (typeof element === "string") ? document.getElementById(element) : element;
    config.currentLanguage = app.getLanguage(config.current_locale);

    var tokenizer = new DomTokenizer(container, {}, {
      "debug": false,
      "data_tokens.numeric": true,
      "current_source": config.current_source,
      "current_translator": config.current_translator
    });

    var result = tokenizer.translate();
  //        console.log(result);
    container.innerHTML = result;
  },

  getApplication: function() {
    return app;
  },

  getCurrentSource: function() {
    return config.current_source;
  },

  getCurrentTranslator: function() {
    return config.current_translator;
  },

  getCurrentLanguage: function() {
    return app.getLanguage(config.current_locale) || app.getLanguage(config.default_locale);
  },

  getLanguageSelector: function() {
    return helpers.language_selector(app, {current_language: tml.getCurrentLanguage()});
  },

  block: function(options, callback) {
    tml.block_options.unshift(options);
    callback();
    tml.block_options.pop();
  },

  beginBlock:  function(options) {
    tml.block_options.unshift(options);
  },

  endBlock: function() {
    tml.block_options.pop();
  }

};

window.tml = tml;

window.tr   = tml.translate;
window.trl  = tml.translateLabel;
window.tre  = tml.translateElement;

window.tml_application = tml.getApplication;
window.tml_current_source = tml.getCurrentSource;
window.tml_current_translator = tml.getCurrentTranslator;
window.tml_current_language = tml.getCurrentLanguage;
window.tml_language_selector = tml.getLanguageSelector;
window.tml_block = tml.block;
window.tml_begin_block = tml.beginBlock;
window.tml_end_block = tml.endBlock;
