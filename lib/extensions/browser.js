
// entry point for browserify

var config      = require('../configuration');
var utils       = require('../utils');
var helpers     = require('../helpers/scripts');
var logger      = require('../logger');

var Application = require('../application');
var Translator  = require('../translator');
var DomTokenizer  = require('./dom');

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
  version: '0.3.3',

  application:null,
  block_options:[],
  root_element: null,
  options: {},

  init: function(token, options, callback) {
    options = options || {};
    tml.options = options;

    document.addEventListener("DOMContentLoaded", function(event) {

      if (options.translateElement || options.translateBody) {
        var container = (typeof options.translateElement === "string") ? document.getElementById(options.translateElement) : options.translateElement;
        if (options.translateBody) container = document.body;
        tml.root_element = {
          container: container,
          content: container.innerHTML
        };
      }

      var t0 = new Date();

      var current_source = options.source;
      if (!current_source) {
        var parser = document.createElement('a');
        parser.href = location.href;
        current_source = parser.pathname;
      }

      current_source = current_source.replace(/^\//, '');
      if (current_source.match(/\/$/))
        current_source = current_source + 'index';
      if (current_source === '')
        current_source = 'index';

      options = utils.merge(config, {
        host: options.host,
        delayed_flush: true,
        api: "ajax",
        current_source: current_source,
        cache: {
          enabled: true,
          adapter: "browser",
          cdn: options.cdn,
          version: options.version
        }
      }, options);

      config.initCache(token);

      app = tml.application = new Application({
        access_token: token,
        host: options.host
      });

      app.init(options, function (err) {
        if (err) {
          throw new Error(err);
        }

        if (tml.root_element) {
          // tml.tranlsateTextElements(browser_element);
          tml.translateElement(tml.root_element.container, tml.root_element.content);
        }

        var t1 = new Date();
        logger.debug("page render took " + (t1 - t0) + " mls");

        tml.updateLanguageSelector();

        // This should be optional
        // Maybe tools and tml should be separate for now?
        includeTools(app, function () {
          if (callback) callback();
        });

        if (typeof(tml.options.initialized) == "function")
          tml.options.initialized(app);
      });
    });

    console.log([
      " _______                  _       _   _             ______          _",
      "|__   __|                | |     | | (_)           |  ____|        | |",
      "   | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___",
      "   | | '__/ _` | '_ \\/ __| |/ _` | __| |/ _ \\| '_ \\|  __| \\ \\/ / __| '_ \\ / _` | '_ \\ / _` |/ _ \\",
      "   | | | | (_| | | | \\__ \\ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/",
      "   |_|_|  \\__,_|_| |_|___/_|\\__,_|\\__|_|\\___/|_| |_|______/_/\\_\\___|_| |_|\\__,_|_| |_|\\__, |\\___|",
      "                                                                                       __/ |",
      "                                                                                      |___/",
      "   version " + tml.version,
      " "
    ].join("\n"));

  },

  updateLanguageSelector: function() {
    var languageSelector = document.querySelectorAll("[data-tml-language-selector], [tml-language-selector]");

    if (languageSelector.length === 0) return;
    for (var i=0; i<languageSelector.length; i++) {
      var type = languageSelector[i].getAttribute("data-tml-language-selector");
      type = type || 'popup';
      var element = languageSelector[i].getAttribute("data-tml-language-selector-element");
      element = element || 'div';
      var toggle = languageSelector[i].getAttribute("data-tml-toggle") == 'true';
      var toggle_label = languageSelector[i].getAttribute("data-tml-toggle-label");
      languageSelector[i].innerHTML = tml.getLanguageSelector(type, {
        element: element,
        container: languageSelector[i],
        toggle: toggle,
        toggle_label: toggle_label
      });
      helpers.language_selector_init(app, type);
    }
  },

  changeLanguage: function(locale) {
    app.changeLanguage(locale, function() {
      if (tml.root_element) {
        config.currentLanguage = app.getCurrentLanguage();
        this.tokenizer.updateAllNodes();
      }
      tml.updateLanguageSelector();
      if (typeof(tml.options.languageChanged) == "function")
        tml.options.languageChanged(language);
    }.bind(this));
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
      current_locale: app.current_locale,
      current_source: app.current_source,
      current_translator: app.current_translator,
      block_options: (tml.block_options || [])
    }, options);

    return app.getCurrentLanguage().translate(label, description, tokens, options);
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

  translateElement: function(container, content) {
    container = (typeof container === "string") ? document.getElementById(container) : container;
    if (!content) content = container.innerHTML;

    config.currentLanguage = app.getCurrentLanguage();

    this.tokenizer = new DomTokenizer(container, {}, {
      debug: false,
      current_source: app.current_source || 'index',
      current_translator: app.current_translator
    });

    this.tokenizer.translateDOM(container);
  },

  translateTextNode: function(parent_node, text_node, label) {
    // we need to handle empty spaces better
    var sanitized_label = utils.sanitizeString(label);

    if (utils.isNumber(sanitized_label)) return;

    // no empty strings
    if (sanitized_label === null || sanitized_label.length === 0) return;

    var translation = this.translate(sanitized_label);
//    var translation = sanitized_label;

//    console.log(translation);

    if (/^\s/.test(label)) translation = " " + translation;
    if (/\s$/.test(label)) translation = translation + " ";

    var translated_node = document.createElement("span");
    // translated_node.style.border = '1px dotted green';
    translated_node.innerHTML = translation;

    // translated_node.style.border = '1px dotted red';
    parent_node.replaceChild(translated_node, text_node);
  },

  translateTextElements: function(element) {
    if (utils.element('tml_status_node')) return;

    console.log("Initializing text nodes...");

    // add node to the document so it is not processed twice
    var status_node = document.createElement('div');
    status_node.id = 'tml_status_node';
    status_node.style.display = 'none';
    document.body.appendChild(status_node);

    var text_nodes = [];
    var tree_walker = document.createTreeWalker(element || document.body, NodeFilter.SHOW_TEXT, null, false);
    while (tree_walker.nextNode()) {
      text_nodes.push(tree_walker.currentNode);
    }

    console.log("Found " + text_nodes.length + " text nodes");

    var disable_sentences = true;

    for (i = 0; i < text_nodes.length; i++) {
      var current_node = text_nodes[i];
      var parent_node = current_node.parentNode;

      if (!parent_node) continue;

      // no scripts
      if (parent_node.tagName == "script" || parent_node.tagName == "SCRIPT") continue;

      var label = current_node.nodeValue || "";

      // console.log(label);

      // no html image tags
      if (label.indexOf("<img") != -1) continue;

      // no comments
      if (label.indexOf("<!-") != -1) continue;

      var sentences = label.split(". ");

//      if (disable_sentences || sentences.length == 1) {
        this.translateTextNode(parent_node, current_node, label);

//      } else {
//        var node_replaced = false;
//
//        for (j=0; j<sentences.length; i++) {
//          var sanitized_sentence = utils.sanitizeString(sentences[j]);
//          if (sanitized_sentence.length === 0) continue;
//
//          sanitized_sentence = sanitized_sentence + ".";
//          var translated_node = document.createElement("span");
//          translated_node.style.border = '1px dotted green';
//          translated_node.innerHTML = sanitized_sentence; //this.translateLabel(sanitized_sentence);
//
//          if (node_replaced) {
//            parent_node.appendChild(translated_node);
//          } else {
//            parent_node.replaceChild(translated_node, current_node);
//            node_replaced = true;
//          }
//          parent_node.appendChild(document.createTextNode(" "));
//
//        }
//      }
    }
  },

  getApplication: function() {
    return app;
  },

  getCurrentSource: function() {
    return app.current_source;
  },

  getCurrentTranslator: function() {
    return app.current_translator;
  },

  getCurrentLanguage: function() {
    return app.getCurrentLanguage();
  },

  getLanguageSelector: function(type, options) {
    options = utils.merge(options || {}, {
      current_language: tml.getCurrentLanguage(),
      client_side: true
    });
    return helpers.language_selector(app, type, options);
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
  },

  clearCache: function() {
    config.getCache().clear();
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
