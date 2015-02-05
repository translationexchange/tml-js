exports.header = function(app, options) {
  options = options || {};

  var html = "";
  html = html + "<script>";
  html = html + "\nfunction tml_add_css(doc, value, inline) {";
  html = html + "\n  var css = null;";
  html = html + "\n  if (inline) {";
  html = html + "\n    css = doc.createElement('style'); css.type = 'text/css';";
  html = html + "\n    if (css.styleSheet) css.styleSheet.cssText = value;";
  html = html + "\n    else css.appendChild(document.createTextNode(value));";
  html = html + "\n  } else {";
  html = html + "\n    css = doc.createElement('link'); css.setAttribute('type', 'text/css');";
  html = html + "\n    css.setAttribute('rel', 'stylesheet'); css.setAttribute('media', 'screen');";
  html = html + "\n    if (value.indexOf('//') != -1) css.setAttribute('href', value);";
  html = html + "\n    else css.setAttribute('href', '" + app.getHost() + "' + value);";
  html = html + "\n  }";
  html = html + "\n  doc.getElementsByTagName('head')[0].appendChild(css);";
  html = html + "\n  return css;";
  html = html + "\n}";

  html = html + "\nfunction tml_add_script(doc, id, src, onload) {";
  html = html + "\n  var script = doc.createElement('script');";
  html = html + "\n  script.setAttribute('id', id); script.setAttribute('type', 'application/javascript');";
  html = html + "\n  if (src.indexOf('//') != -1)  script.setAttribute('src', src);";
  html = html + "\n  else script.setAttribute('src', '" + app.getHost() + "' + src);";
  html = html + "\n  script.setAttribute('charset', 'UTF-8');";
  html = html + "\n  if (onload) script.onload = onload;";
  html = html + "\n  doc.getElementsByTagName('head')[0].appendChild(script);";
  html = html + "\n  return script;";
  html = html + "\n}";

  html = html + "\n(function() {";
  html = html + "\n  if (window.addEventListener) window.addEventListener('load', tml_init, false);";
  html = html + "\n  else if (window.attachEvent) window.attachEvent('onload', tml_init);";
  html = html + "\n  window.setTimeout(function() {tml_init();}, 1000);";
  html = html + "\n  function tml_init() {";
  html = html + "\n    if (window.tml_already_initialized) return;";
  html = html + "\n    window.tml_already_initialized = true;";
  html = html + "\n    tml_add_css(window.document, '\"" + app.tools.stylesheets + "\"', false);";
  html = html + "\n    tml_add_css(window.document, \"" + app.css + "\", true);";
  html = html + "\n    tml_add_script(window.document, 'tml-jssdk', '\"" + app.tools.javascripts + "\"', function() {";
  html = html + "\n      Tml.app_key = '" + app.key + "';";
  html = html + "\n      Tml.host = '" + app.tools.host + "';";
  html = html + "\n      Tml.sources = [];";
  html = html + "\n      Tml.default_locale = '" + app.default_locale + "';";
  html = html + "\n      Tml.page_locale = '" + options.current_language.locale + "';";
  html = html + "\n      Tml.locale = '" + options.current_language.locale + "';";

  if (app.isFeatureEnabled("shortcuts")) {
    var keys = Object.keys(app.shortcuts || {});
    for (var i=0; i<keys.length; i++) {
      html = html + "\n       shortcut.add('" + keys[i] + "', function() {";
      html = html + "\n         " + app.shortcuts[keys[i]];
      html = html + "\n       });";
    }
  }

  html = html + "\n      if (typeof(tml_on_ready) === 'function') tml_on_ready();";
  html = html + "\n      if (typeof(tml_footer_scripts) === 'function') tml_footer_scripts();";
  html = html + "\n    })";
  html = html + "\n  }";
  html = html + "\n})();";
  html = html + "</script>";
  return html;
};

exports.language_selector = function(app, options) {
  var html = "";
  html = html + "<a href='#' onclick='Tml.UI.LanguageSelector.show();'>";
  html = html + "<img src='" + options.current_language.flag_url + "'> &nbsp;";
  html = html + options.current_language.english_name;
  html = html + "</a>";
  return html;
};
