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

exports.header = function(app, options) {
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
    for (var i=0; i<keys.length; i++) {
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
};

exports.language_selector_script_tag = function() {
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
};

exports.language_name_tag = function(language, options) {
  options = options || {};
  if (language === null) language = tml_current_language();
  var html = [];
  if (options.flag) {
    html.push(this.language_flag_tag(language));
    html.push(' ');
  }
  html.push(language.native_name);
  return html.join('');
};

exports.language_flag_tag = function(language) {
  if (language === null) language = tml_current_language();
  return "<img src='" + language.flag_url + "' style='margin-right:3px;'>";
};

exports.language_selector = function(app, type, options) {
  type = type || 'default';
  options = options || {};

  var self = this;

  var html = [];
  if (type == 'default') {
    html.push("<a href='#' onclick='Tml.UI.LanguageSelector.show();'>");
    html.push("<img src='" + options.current_language.flag_url + "'> &nbsp;");
    html.push(options.current_language.english_name);
    html.push("</a>");
  } else if (type == 'bootstrap') {
    var element = options.element || 'div';
    var class_name = options.class_name || 'dropdown';
    var style = options.style || '';
    var name = options.language || 'english';
    var toggle = (options.toggle === null ? true : options.toggle);
    var toggle_label = options.toggle_label || 'Help Us Translate';

    html.push(this.language_selector_script_tag());
    html.push("<" + element + " class='" + class_name + "' style='" + style + "'>");
    html.push("  <a href='#' role='button' class='" + class_name + "-toggle' data-toggle='" + class_name+ "'>");

    html.push(self.language_name_tag(options.current_language, {flag: true, name: name}));

    html.push("</a>");

    html.push("<ul class='" + class_name + "-menu' role='menu'>");

    app.languages.forEach(function(lang) {
      html.push("<li role='presentation'><a href='javascript:void(0);' onclick='tml_change_locale(\"" + lang.locale + "\")'>");
      html.push(self.language_name_tag(lang, {flag: true, name: name}));
      html.push("</a></li>");
    });

    if (toggle) {
      html.push("<li role='presentation' class='divider'></li>");
      html.push("<li role='presentation'><a href='javascript:void(0);' onclick='Tml.Utils.toggleInlineTranslations()'>" + tr(toggle_label) + "</a></li>");
    }

    html.push("<li role='presentation' class='divider'></li>");

    html.push("<div style='font-size:8px;color:#ccc;text-align: center'>");
    html.push("<a href='http://translationexchange.com'>");
    html.push("<img style='padding: 10px;border: 0px;background-repeat: no-repeat;background-size: 14px 17px;");
    html.push("background-image:url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAABQCAYAAABCiMhGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCQTg4MTEyOEU0NkIxMUUzODhCMEJEOUNDRDQ0QkU0MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCQTg4MTEyOUU0NkIxMUUzODhCMEJEOUNDRDQ0QkU0MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkJBODgxMTI2RTQ2QjExRTM4OEIwQkQ5Q0NENDRCRTQyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkJBODgxMTI3RTQ2QjExRTM4OEIwQkQ5Q0NENDRCRTQyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+mszKSAAAAqFJREFUeNrsnE1IFVEYhr+53QiKEIkgpCBwJSH9SITkqkVELXJZ0iYIqRaBCZWgoWKikRBI1KVNmyg3gVKQ0CZE+9kHQYukaGP2I6iEP1ffc+dc7iwK5s5Mx3PPvC88zGxm5s4zc85853JmvNardwTxwC1wGuyWdGQGvARduaH23wUJkJHFcgoclnTmKzgIIT8yWOlNsQiVPeB+8c74hmWNMNXqzqimh0JqlIxVeigkr2Tk6aGQtQwdlEIZlEEZlEEZEZONuf0YmASLYNNGPRI1e8FFsHUjZNwAg5Zd3GHwHuw02Uw+WShCZRr0m+4zPljc9D+alpG1WMYW0zJsfgplxMGTYp1BGZRBGZRBGZRBGZRBGZRBGZRBGQxlUAZlUAZlUAZlUAZlUAZlUAZlUIbDMmyeYr3KO6OUJdMyGiyWcdS0DPV+ykMLRRwD16JuHGc60gV9Fd6KP/Vxs/hTEDvBbIT9nQLNEdp8XkpTH0/GMRl3bladJpi7EWQcB89dfLSW24EdAeOsM0T2gQkWXX4bf6P7mlTL2KFFbE97Ob4NvAO70j42UcdTbyHU2jo28Qwe7zXYb2nl6mXE3DzwF6DJ5kGrkjFv4EBP4laHBjKjZDz7zwfJgTOWi3iVG2qfVTKui//ZhMTaXmD9Hmi1XMSf4m9UMubAIfAY/Epg58t62QcuWyxhQfx37A7grvgcHKipgdU5UPWX538LuBlh8Deu+4oVS2X8BN8h4p+j1jlNMOW+5lQ8+QmpsIQpusr5vsYV8EUqNElWoKojHpYKTlIyusFtqfAkIWMA9IgDiStD/cXXIY4kjowHoE0cSlQZj8AlcSxRZDwF58XBhJGxFlgfBWfF0YSR4QXK62ZxOGFk1OtR7QlxPGFkjIBGSUHWBRgAlJNpO4bVinwAAAAASUVORK5CYII=);'/>");
    html.push("<br>");
    html.push("Powered By Translation Exchange");
    html.push("</a>");
    html.push("</div>");
    html.push("</ul>");
    html.push("</" + element + ">");
  }

  return html.join('');
};
