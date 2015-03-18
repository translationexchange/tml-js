/**
 * Copyright (c) 2015 Translation Exchange, Inc.
 *
 *  _______                  _       _   _             ______          _
 * |__   __|                | |     | | (_)           |  ____|        | |
 *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___
 *    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \|  __| \ \/ / __| '_ \ / _` | '_ \ / _` |/ _ \
 *    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/
 *    |_|_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_|______/_/\_\___|_| |_|\__,_|_| |_|\__, |\___|
 *                                                                                        __/ |
 *                                                                                       |___/
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var scripts = {

  header: function (app, options) {
    options = options || {};

    var html = [];
    html.push("<script>");
    html.push("function tml_add_css(doc, value, inline) {");
    html.push("  var css = null;");
    html.push("  if (inline) {");
    html.push("    css = doc.createElement('style'); css.type = 'text/css';");
    html.push("    if (css.styleSheet) css.styleSheet.cssText = value;");
    html.push("    else css.appendChild(document.createTextNode(value));");
    html.push("  } else {");
    html.push("    css = doc.createElement('link'); css.setAttribute('type', 'text/css');");
    html.push("    css.setAttribute('rel', 'stylesheet'); css.setAttribute('media', 'screen');");
    html.push("    css.setAttribute('href', value);");
    html.push("  }");
    html.push("  doc.getElementsByTagName('head')[0].appendChild(css);");
    html.push("  return css;");
    html.push("}");

    html.push("function tml_add_script(doc, id, src, onload) {");
    html.push("  var script = doc.createElement('script');");
    html.push("  script.setAttribute('id', id); script.setAttribute('type', 'application/javascript');");
    html.push("  script.setAttribute('src', src);");
    html.push("  script.setAttribute('charset', 'UTF-8');");
    html.push("  if (onload) script.onload = onload;");
    html.push("  doc.getElementsByTagName('head')[0].appendChild(script);");
    html.push("  return script;");
    html.push("}");

    html.push("(function() {");
    html.push("  if (window.addEventListener) window.addEventListener('load', tml_init, false);");
    html.push("  else if (window.attachEvent) window.attachEvent('onload', tml_init);");
    html.push("  window.setTimeout(function() {tml_init();}, 1000);");
    html.push("  function tml_init() {");
    html.push("    if (window.tml_already_initialized) return;");
    html.push("    window.tml_already_initialized = true;");
    html.push("    tml_add_css(window.document, '" + app.tools.stylesheet + "', false);");
    html.push("    tml_add_css(window.document, \"" + app.css + "\", true);");
    html.push("    tml_add_script(window.document, 'tml-jssdk', '" + app.tools.javascript + "', function() {");
    html.push("      Tml.app_key = '" + app.key + "';");
    html.push("      Tml.host = '" + app.tools.host + "';");
    html.push("      Tml.sources = [];");
    html.push("      Tml.default_locale = '" + app.default_locale + "';");
    html.push("      Tml.page_locale = '" + options.current_language.locale + "';");
    html.push("      Tml.locale = '" + options.current_language.locale + "';");

    if (app.isFeatureEnabled("shortcuts")) {
      var keys = Object.keys(app.shortcuts || {});
      for (var i = 0; i < keys.length; i++) {
        html.push("shortcut.add('" + keys[i] + "', function() {");
        html.push(app.shortcuts[keys[i]]);
        html.push("});");
      }
    }

    html.push("      if (typeof(tml_on_ready) === 'function') tml_on_ready();");
    html.push("      if (typeof(tml_footer_scripts) === 'function') tml_footer_scripts();");
    html.push("    })");
    html.push("  }");
    html.push("})();");
    html.push("</script>");
    return html.join('');
  },

  language_selector_script_tag: function () {
    var html = [];
    html.push("<script>");
    html.push("function tml_change_locale(locale) {");
    html.push("  var query_parts = window.location.href.split('#');");
    html.push("  var anchor = query_parts.length > 1 ? query_parts[1] : null;");
    html.push("  query_parts = query_parts[0].split('?');");
    html.push("  var query = query_parts.length > 1 ? query_parts[1] : null;");
    html.push("  var params = {};");
    html.push("  if (query) {");
    html.push("    var vars = query.split('&');");
    html.push("    for (var i = 0; i < vars.length; i++) {");
    html.push("      var pair = vars[i].split('=');");
    html.push("      params[pair[0]] = pair[1];");
    html.push("    }");
    html.push("  }");
    html.push("  params['locale'] = locale;");
    html.push("  query = [];");
    html.push("  var keys = Object.keys(params);");
    html.push("  for (i = 0; i < keys.length; i++) {");
    html.push("    query.push(keys[i] + '=' + params[keys[i]]);");
    html.push("  }");
    html.push("  var destination = query_parts[0];");
    html.push("  if (query.length > 0)");
    html.push("    destination = destination + '?' + query.join('&');");
    html.push("  if (anchor)");
    html.push("    destination = destination + '#' + anchor;");
    html.push("  window.location = destination;");
    html.push("}");
    html.push("</script>");
    return html.join('');
  },

  language_name_tag: function (language, options) {
    options = options || {};
    if (language === null) language = tml_current_language();
    var html = [];
    if (options.flag) {
      html.push(this.language_flag_tag(language));
      html.push(' ');
    }
    html.push(language.native_name);
    return html.join('');
  },

  language_flag_tag: function (language) {
    if (language === null) language = tml_current_language();
    return "<img src='" + language.flag_url + "' style='margin-right:3px;'>";
  },

  language_selector_bootstrap: function (app, options) {
    options = options || {};

    var element = options.element || 'div';
    var class_name = options.class_name || 'dropdown';
    var style = options.style || '';
    var name = options.language || 'english';
    var toggle = (options.toggle === null ? true : options.toggle);
    var toggle_label = options.toggle_label || 'Help Us Translate';

    var html = [];

    if (!options.client_side)
      html.push(this.language_selector_script_tag());

    if (element != 'none') {
      html.push("<" + element + " class='" + class_name + "' style='" + style + "'>");
    }

    html.push("  <a href='#' role='button' class='" + class_name + "-toggle' data-toggle='" + class_name + "'>");

    html.push(scripts.language_name_tag(options.current_language, {flag: true, name: name}));

    html.push("</a>");

    html.push("<ul class='" + class_name + "-menu' role='menu'>");

    app.languages.forEach(function (lang) {
      html.push("<li role='presentation'>");

      if (options.current_language.locale == lang.locale) {
        html.push("<div style='right: 5px;font-weight: bold;font-size: 16px;margin: 0px 5px 0px 0px;color: #13CF80;position: absolute;'>✓</div>");
      }

      if (options.client_side) {
        html.push("<a href='javascript:void(0);' onclick='tml.changeLanguage(\"" + lang.locale + "\")'>");
      } else {
        html.push("<a href='javascript:void(0);' onclick='tml_change_locale(\"" + lang.locale + "\")'>");
      }
      html.push(scripts.language_name_tag(lang, {flag: true, name: name}));
      html.push("</a></li>");
    });

    if (toggle) {
      html.push("<li role='presentation' class='divider'></li>");
      html.push("<li role='presentation'><a href='javascript:void(0);' onclick='Tml.Utils.toggleInlineTranslations()'>" + tr(toggle_label) + "</a></li>");
    }

    html.push("<li role='presentation' class='divider'></li>");

    html.push("<div style='padding: 0px 20px; font-size:11px; white-space: nowrap;'>");
    html.push("<a href='http://translationexchange.com' style='color:#888;'>");
    html.push("Powered By Translation Exchange");
    html.push("</a>");
    html.push("</div>");
    html.push("</ul>");

    if (element != 'none') {
      html.push("</" + element + ">");
    }

    return html.join('');
  },

  language_selector_default: function (app, options) {
    options = options || {};
    var html = [];
    html.push("<a href='#' onclick='Tml.UI.LanguageSelector.show();'>");
    html.push("<img src='" + options.current_language.flag_url + "'> &nbsp;");
    html.push(options.current_language.english_name);
    html.push("</a>");
    return html.join('');
  },

  language_selector_popup: function (app, options) {
    options = options || {};
    var element = options.element || 'div';
    var class_name = options.class_name || 'dropdown';
    var toggle = (options.toggle === null ? true : options.toggle);
    var toggle_label = options.toggle_label || 'Help Us Translate';
    var html = [];

    html.push("<style>");
    html.push(".trex-language-selector {position: relative;display: inline-block;vertical-align: middle;}");
    html.push(".trex-language-toggle,");
    html.push(".trex-language-toggle:hover,");
    html.push(".trex-language-toggle:focus {cursor:pointer;text-decoration:none;outline:none;}");
    html.push(".trex-dropup .trex-dropdown-menu {top: auto;bottom: 100%;margin-bottom: 1px;-webkit-transform: scale(0.8) translateY(10%);transform: scale(0.8) translateY(10%);}");
    html.push(".trex-dropleft .trex-dropdown-menu {left: auto; right: 0;}");
    html.push(".trex-dropdown-menu {");
    html.push("   -webkit-transform: scale(0.8) translateY(10%);transform: scale(0.8) translateY(10%);transition: 0.13s cubic-bezier(0.3, 0, 0, 1.3);opacity: 0;pointer-events: none;");
    html.push("   display: block;font-family:Arial, sans-serif;position: absolute;");
    html.push("   top: 100%;left: 0;z-index: 1000;float: left;list-style: none;background-color: #FFF;height:0px;width:0px;padding:0;overflow:hidden;");
    html.push("}");
    html.push(".trex-language-selector[dir=rtl] .trex-dropdown-menu {left: auto; right: 0;}");
    html.push(".trex-language-selector.trex-dropleft[dir=rtl] .trex-dropdown-menu {left:0; right:auto;}");
    html.push(".trex-language-selector.trex-open .trex-dropdown-menu {");
    html.push("   opacity: 1;height:auto;width:auto;overflow:hidden;min-width: 250px;margin: 2px 0 0;font-size: 13px;");
    html.push("   background-clip: padding-box;border: 1px solid rgba(0, 0, 0, 0.15);box-shadow: 0 2px 0 rgba(0, 0, 0, 0.05);");
    html.push("   border-radius: 4px;color: #6D7C88;text-align: left;padding: 5px 0;");
    html.push("   display:block;pointer-events: auto;-webkit-transform: none;transform: none;");
    html.push("}");
    html.push(".trex-dropdown-menu > li {");
    html.push("text-align:" + options.current_language.align('left') + ";");
    html.push("}");
    html.push(".trex-dropdown-menu > li > a {");
    html.push("  display: block; text-decoration:none !important; padding: 3px 10px;margin:0 5px;clear: both;font-weight: normal;line-height: 1.42857143;color: #333;border-radius:3px;white-space: nowrap;cursor:pointer;");
    html.push("}");
    html.push(".trex-dropdown-menu > li > a .trex-flag {margin-right:3px;width:23px;}");
    html.push(".trex-dropdown-menu > li.trex-language-item > a:hover,");
    html.push(".trex-dropdown-menu > li.trex-language-item > a:focus {text-decoration:none !important;background: #F0F2F4;}");
    html.push(".trex-dropdown-menu > li.trex-language-item > a .trex-native-name {font-size: 11px;color: #A9AFB8;margin-left: 3px;}");
    html.push(".trex-dropdown-menu > li.trex-selected a:after {content: '✓';right: 5px;font-weight: bold;font-size: 16px;margin: 0px 5px 0px 0px;color: #13CF80;position: absolute;}");
    html.push(".trex-dropdown-menu[dir=rtl] > li.trex-selected a:after {left: 5px; right:auto !important; margin: 0px 0 0px 5px;}");
    html.push(".trex-dropdown-menu .trex-credit a {border-top: solid 1px #DDD;font-size: 13px;padding: 7px 0 0;margin: 5px 15px 5px;color: #9FA7AE;font-weight: 400;}");
    html.push("</style>");

    if (options.element == 'self') {
      options.container.className += ' trex-language-selector';
      options.container.dir = options.current_language.direction();
    } else {
      html.push("<" + options.element + " class='trex-language-selector' dir='" + options.current_language.direction() + "'>");
    }
    html.push("<a class='trex-language-toggle' data-toggle='tml-language-selector' tabindex='0' dir='" + options.current_language.direction() + "'>");
    html.push(scripts.language_name_tag(options.current_language, {flag: true, name: name}));
    html.push("</a>");

    html.push("<ul class='trex-dropdown-menu' dir='" + options.current_language.direction() + "'>");

    app.languages.forEach(function (lang) {
      html.push("<li class='trex-language-item " + (options.current_language.locale == lang.locale ? "trex-selected" : '') + "' dir='" + options.current_language.direction() + "'>");

      if (options.client_side) {
        html.push("<a href='javascript:void(0);' onclick='tml.changeLanguage(\"" + lang.locale + "\")'>");
      } else {
        html.push("<a href='javascript:void(0);' onclick='tml_change_locale(\"" + lang.locale + "\")'>");
      }
      html.push(scripts.language_name_tag(lang, {flag: true, name: name}));
      html.push("</a></li>");
    });

    if (toggle) {
      html.push("<li class='trex-credit' dir='" + options.current_language.direction() + "'>");
      html.push("<a href='javascript:void(0);' onclick='Tml.Utils.toggleInlineTranslations()'>");
      html.push(toggle_label);
      html.push("</a>");
      html.push("</li>");
    }

    html.push("<li class='trex-credit' dir='" + options.current_language.direction() + "'>");
    html.push("<a href='http://translationexchange.com'>");
    html.push("Powered by Translation Exchange");
    html.push("</a>");
    html.push("</li>");

    html.push("</ul>");

    if (options.element != 'self') {
      html.push("</" + options.element + ">");
    }

    if (!options.client_side) {
      html.push("<script>");
      html.push(scripts.language_selector_popup_script.toString());
      html.push("</script>");
    }

    return html.join('\n');
  },

  language_selector_popup_script: function() {
    (function () {
      'use strict';

      function addEvent(evnt, elem, func) {
        if (elem.addEventListener) elem.addEventListener(evnt, func, false);
        else if (elem.attachEvent) elem.attachEvent('on' + evnt, func);
        else elem[evnt] = func;
      }

      function hasClass(elem, cls) {
        return elem.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
      }

      function addClass(elem, cls) {
        if (!hasClass(elem, cls)) elem.className += ' ' + cls;
      }

      function removeClass(elem, cls) {
        if (hasClass(elem, cls)) {
          var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
          elem.className = elem.className.replace(reg, ' ');
        }
      }

      function toggleClass(elem, cls) {
        if (!hasClass(elem, cls)) addClass(elem, cls);
        else removeClass(elem, cls);
      }

      var LanguageSelector = function (element) {
        this.element = element;
        this.element.setAttribute('tabindex', '0');
        addEvent('click', this.element, this.open.bind(this));
        addEvent('blur', this.element, this.close.bind(this));
      };

      LanguageSelector.VERSION = '0.1.0';
      LanguageSelector.prototype = {
        adjustMenu: function (parent) {
          removeClass(parent, 'trex-dropup');
          removeClass(parent, 'trex-dropleft');
          var
            menu = parent.querySelectorAll('.trex-dropdown-menu')[0],
            bounds = menu.getBoundingClientRect(),
            vHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
            vWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            buffer = 10;
          if (bounds.top + menu.offsetHeight + buffer > vHeight) addClass(parent, 'trex-dropup');
          if (bounds.left + menu.offsetWidth + buffer > vWidth)  addClass(parent, 'trex-dropleft');
        },
        open: function (e) {
          e = e || window.event;
          e.stopPropagation();
          e.preventDefault();
          var target = e.currentTarget || e.srcElement;
          if (hasClass(target.parentElement, 'trex-open')) {
            return this.close(e);
          }
          addClass(target.parentElement, 'trex-open');
          this.adjustMenu(target.parentElement);
          return false;
        },
        close: function (e) {
          e = e || window.event;
          var target = e.currentTarget || e.srcElement;
          setTimeout(function () {
            removeClass(target.parentElement, 'trex-open');
          }, 500);
        }
      };
      var selectorList = document.querySelectorAll('[data-toggle=tml-language-selector]');
      for (var i = 0, el, l = selectorList.length; i < l; i++) {
        el = selectorList[i];
        el.languageSelector = new LanguageSelector(el);
      }
    })();
  },

  language_selector_init: function(app, type, options) {
    type = type || 'default';
    if (type == 'popup') {
      scripts.language_selector_popup_script();
    }
  },

  language_selector: function (app, type, options) {
    type = type || 'default';

    if (type == 'default') {
      return scripts.language_selector_default(app, options);
    } else if (type == 'bootstrap') {
      return scripts.language_selector_bootstrap(app, options);
    } else if (type == 'popup') {
      return scripts.language_selector_popup(app, options);
    }

    return "";
  }
};

module.exports = {
  header: scripts.header,
  language_name_tag: scripts.language_name_tag,
  language_flag_tag: scripts.language_flag_tag,
  language_selector: scripts.language_selector,
  language_selector_init: scripts.language_selector_init
};