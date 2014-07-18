exports.header = function(app, options) {
  options = options || {};

  var html = "";
  html = html + "<script>";
  html = html + "\nfunction tr8n_add_css(doc, value, inline) {";
  html = html + "\n  var css = null;";
  html = html + "\n  if (inline) {";
  html = html + "\n    css = doc.createElement('style'); css.type = 'text/css';";
  html = html + "\n    if (css.styleSheet) css.styleSheet.cssText = value;";
  html = html + "\n    else css.appendChild(document.createTextNode(value));";
  html = html + "\n  } else {";
  html = html + "\n    css = doc.createElement('link'); css.setAttribute('type', 'text/css');";
  html = html + "\n    css.setAttribute('rel', 'stylesheet'); css.setAttribute('media', 'screen');";
  html = html + "\n    if (value.indexOf('//') != -1) css.setAttribute('href', value);";
  html = html + "\n    else css.setAttribute('href', '" + app.host + "' + value);";
  html = html + "\n  }";
  html = html + "\n  doc.getElementsByTagName('head')[0].appendChild(css);";
  html = html + "\n  return css;";
  html = html + "\n}";

  html = html + "\nfunction tr8n_add_script(doc, id, src, onload) {";
  html = html + "\n  var script = doc.createElement('script');";
  html = html + "\n  script.setAttribute('id', id); script.setAttribute('type', 'application/javascript');";
  html = html + "\n  if (src.indexOf('//') != -1)  script.setAttribute('src', src);";
  html = html + "\n  else script.setAttribute('src', '" + app.host + "' + src);";
  html = html + "\n  script.setAttribute('charset', 'UTF-8');";
  html = html + "\n  if (onload) script.onload = onload;";
  html = html + "\n  doc.getElementsByTagName('head')[0].appendChild(script);";
  html = html + "\n  return script;";
  html = html + "\n}";

  html = html + "\n(function() {";
  html = html + "\n  if (window.addEventListener) window.addEventListener('load', tr8n_init, false);";
  html = html + "\n  else if (window.attachEvent) window.attachEvent('onload', tr8n_init);";
  html = html + "\n  window.setTimeout(function() {tr8n_init();}, 1000);";
  html = html + "\n  function tr8n_init() {";
  html = html + "\n    if (window.tr8n_already_initialized) return;";
  html = html + "\n    window.tr8n_already_initialized = true;";
  html = html + "\n    tr8n_add_css(window.document, '/assets/tr8n/tools.css', false);";
  html = html + "\n    tr8n_add_css(window.document, \"" + app.css + "\", true);";
  html = html + "\n    tr8n_add_script(window.document, 'tr8n-jssdk', '/assets/tr8n/tools.js', function() {";
  html = html + "\n      Tr8n.app_key = '" + app.key + "';";
  html = html + "\n      Tr8n.host = '" + app.host + "';";
  html = html + "\n      Tr8n.sources = [];";
  html = html + "\n      Tr8n.default_locale = '" + app.default_locale + "';";
  html = html + "\n      Tr8n.page_locale = '" + options.current_language.locale + "';";
  html = html + "\n      Tr8n.locale = '" + options.current_language.locale + "';";

  if (app.isFeatureEnabled("shortcuts")) {
    var keys = Object.keys(app.shortcuts || {});
    for (var i=0; i<keys.length; i++) {
      html = html + "\n       shortcut.add('" + keys[i] + "', function() {";
      html = html + "\n         " + app.shortcuts[keys[i]];
      html = html + "\n       });";
    }
  }

  html = html + "\n      if (typeof(tr8n_on_ready) === 'function') tr8n_on_ready();";
  html = html + "\n      if (typeof(tr8n_footer_scripts) === 'function') tr8n_footer_scripts();";
  html = html + "\n    })";
  html = html + "\n  }";
  html = html + "\n})();";
  html = html + "</script>";
  return html;
};