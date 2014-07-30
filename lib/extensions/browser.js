
// entry point for browserify

var config      = require('../configuration');
var utils       = require('../utils');

var Application = require('../application');
var Translator  = require('../translator');
var DomTokenizer  = require('../tokenizers/dom');

var app = null;


var includeTools = function(app, callback) {
  utils.addCSS(window.document, app.host + '/assets/tr8n/tools.css', false);
  utils.addCSS(window.document, app.css, true);      

  utils.addJS(window.document, 'tr8n-jssdk', app.host + '/assets/tr8n/tools.js', function() {

    Tr8n.app_key = app.key;
    Tr8n.host = app.host;
    Tr8n.sources = [];
    Tr8n.default_locale = app.default_locale;
    Tr8n.page_locale = config.current_locale;
    Tr8n.locale = config.current_locale;

    if (app.isFeatureEnabled("shortcuts")) {
      for (var sc in app.shortcuts) {
        shortcut.add(sc, (function(sc){
          return function(){
            eval(app.shortcuts[sc]);
          }
        })(sc))
      }
    }

    if (callback) callback();

  })
};

var tr8n = {

  application:null,

  init: function(key, secret, options, callback) {

    var 
      data                = utils.decodeAndVerifyParams(utils.getCookie(key)),
      current_translator  = (data && data.translator) ? new Translator(data.translator) : null,
      default_locale      = "en-US",
      current_locale      = (data && data.locale) ? data.locale : default_locale,
      current_source      = options.source || "/";

    var browser_element = null;
    if (options.element) {
      browser_element = (typeof options.element === "string") ? document.getElementById(options.element) : options.element;
      browser_element.style.display = "none";
    }

    options = utils.extend(config, {
      host: options.host || "https://translationexchange.com",
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

    app = this.application = new Application({
      key     : key,
      secret  : secret,
      host    : options.host
    });

    var locales = [app.default_locale];
    if (current_locale) {
      locales.push(current_locale);
    } else {
      current_locale = app.default_locale;
    }

    var self = this;
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
      // Maybe tools and tr8n should be separate for now?
      includeTools(app, function() {
        if (browser_element != null) {
          self.translateElement(browser_element);
          browser_element.style.display = "block";
        }
        if (callback) callback();
      });
    })
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
      current_translator: config.current_translator
    }, options);

    var language = app.getLanguage(config.current_locale) || app.getLanguage(config.default_locale);
    return language.translate(label, description, tokens, options);
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

    return this.translate(label, description, tokens, options);
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
  }

};

window.tr8n = tr8n;
window.tr   = tr8n.translate;
window.trl  = tr8n.translateLabel;
window.tre  = tr8n.translateElement;
