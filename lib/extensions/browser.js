
// entry point for browserify

var config      = require('../configuration');
var utils       = require('../utils');

var Application = require('../application');
var Translator  = require('../translator');

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
}


var tr8n = {

  application:null,

  init: function(key, secret, options, callback) {

    var 
      data                = utils.decodeAndVerifyParams(utils.getCookie(key)),
      current_translator  = (data && data.translator) ? new Translator(data.translator) : null,
      default_locale      = "en-US",
      current_locale      = (data && data.locale) ? data.locale : default_locale,
      current_source      = "/";

    options = utils.extend(config, {
      host: "http://translationexchange.com",
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
      includeTools(app, callback);
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
  }  

}

window.tr8n = tr8n;
window.tr   = tr8n.translate;
