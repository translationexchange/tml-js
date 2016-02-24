/**
 * Copyright (c) 2016 Translation Exchange, Inc.
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

  agent_tag: function (app, options) {
    options = options || {};

    options.cache = options.cache || 864000000;
    var agent_host = options.host || "https://tools.translationexchange.com/agent/stable/agent.min.js";

    if (options.cache) {
      var t = new Date().getTime();
      t = t - (t % options.cache);
      agent_host += "?ts=" + t;
    }

    options.css = options.css || app.css;
    options.sdk = options.sdk || 'tml-js v0.4.16';
    options.languages = [];

    for (var l = 0; l < app.languages.length; l++) {
      var language = app.languages[l];
      options.languages.push({
        locale: language.locale,
        english_name: language.english_name,
        native_name: language.native_name,
        flag_url: language.flag_url
      });
    }

    //console.log(options);

    var html = [];
    html.push("<script>");
    html.push("(function() {");
    html.push("  var script = document.createElement('script');");
    html.push("  script.setAttribute('id', 'tml-agent'); script.setAttribute('type', 'application/javascript');");
    html.push("  script.setAttribute('src', '" + agent_host + "');");
    html.push("  script.setAttribute('charset', 'UTF-8');");
    html.push("  script.onload = function() {");
    html.push("       Trex.init('" + app.key + "', " + JSON.stringify(options) + ");");
    html.push("  };");
    html.push("  document.getElementsByTagName('head')[0].appendChild(script);");
    html.push("})();");
    html.push("</script>");
    return html.join("\n");
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

  language_flag_tag: function (language, options) {
    options = options || {};
    var name = language.english_name;
    if (options.language == 'native')
      name = language.native_name;

    if (language === null) language = tml_current_language();
    return "<img src='" + language.flag_url + "' style='margin-right:3px;' alt='" + name + "' title='" + name + "'>";
  },

  language_selector_tag: function (app, type, options) {
    type = type || 'default';

    var attrs = [];
    var keys = Object.keys(options);
    for (var i=1; i<keys.length; i++) {
      attrs.push("data-tml-" + keys[i] + "='" + options[keys[i]] + "'");
    }
    attrs = attrs.join(' ');

    return "<div data-tml-language-selector='" + type + "' " + attrs + "></div>";
  }
};

module.exports = {
  header: scripts.agent_tag, // deprecated
  agent_tag: scripts.agent_tag,
  language_name_tag: scripts.language_name_tag,
  language_flag_tag: scripts.language_flag_tag,
  language_selector: scripts.language_selector_tag
};