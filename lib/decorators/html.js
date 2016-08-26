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

var utils = require('../utils');

var HTMLDecorator = {

  isEnabled: function(options) {
    if (!options) return false;
    if (options.skip_decorations) return false;
    if (options.ignored) return false;

    return (
      options.current_translator &&
      options.current_translator.inline
    );
  },

  getDecorationElement: function(defaultElement, options) {
    if (options.use_span)
      return 'span';

    if (options.use_div)
      return 'div';

    return defaultElement;
  },

  decorate: function(translated_label, translation_language, target_language, translation_key, options) {
    options = options || {};
    if (!this.isEnabled(options)) return translated_label;

    if (
      (translation_key.application && translation_key.application.isFeatureEnabled("lock_original_content") && translation_key.language == target_language) ||
      (translation_key.locked && !options.current_translator.manager)
    ) return translated_label;

    var element = this.getDecorationElement('tml:label', options);
    var classes = ['tml_translatable'];

    if (options.locked) {
      if (options.current_translator && !options.current_translator.isFeatureEnabled("show_locked_keys"))
          return translated_label;
      classes.push('tml_locked');
    } else if (translation_language.locale === translation_key.locale) {
      if (options.pending)
        classes.push('tml_pending');
      else
        classes.push('tml_not_translated');
    } else if (translation_language.locale === target_language.locale) {
      classes.push('tml_translated');
    } else {
      classes.push('tml_fallback');
    }

    var html = [];
    html.push("<" + element + " class='" + classes.join(' ') + "' data-translation_key='" + translation_key.key + "' draggable='true' data-target_locale='" + target_language.locale + "'>");
    html.push(translated_label);
    html.push("</" + element + ">");
    return html.join("");
  },

  decorateLanguageCase: function(language_case, rule, original, transformed, options) {
    options = options || {};
    if (!this.isEnabled(options)) return transformed;

    var data = {
      'keyword': language_case.keyword,
      'language_name': language_case.language.english_name,
      'latin_name': language_case.latin_name,
      'native_name': language_case.native_name,
      'conditions': (rule ? rule.conditions : ''),
      'operations': (rule ? rule.operations : ''),
      'original': original,
      'transformed': transformed
    };

    var payload = new Buffer(JSON.stringify(data)).toString('base64').trim().replace("\n", "");

    var attributes = {
      'class': 'tml_language_case',
      'data-locale': language_case.language.locale,
      'data-rule': encodeURIComponent(payload)
    };

    var query = [];
    var keys = utils.keys(attributes);
    for (var i=0; i<keys.length; i++) {
      query.push("" + keys[i] + "=\"" +  attributes[keys[i]] + "\"");
    }

    var element = this.getDecorationElement('tml:case', options);

    var html = [];
    html.push("<" + element + " " + query.join(" ") + ">");
    html.push(transformed);
    html.push("</" + element + ">");

    return html.join("");
  },

  decorateToken: function(token, value, options) {
    if (!this.isEnabled(options)) return value;

    var element = this.getDecorationElement('tml:token', options);

    var classes = ['tml_token', "tml_token_" + token.getDecorationName()];

    var html = [];
    html.push("<" + element + " class='" + classes.join(' ') + "' data-name='" + token.short_name + "'");
    if (token.context_keys && token.context_keys.length > 0)
      html.push(" data-context='" + token.context_keys.join(',') + "'");

    if (token.case_keys && token.case_keys.length > 0)
      html.push(" data-case='" + token.case_keys.join(',') + "'");

    html.push('>');
    html.push(value);
    html.push("</" + element + ">");

    return html.join("");
  },

  decorateElement: function(token, value, options) {
    if (!this.isEnabled(options)) return value;

    var element = this.getDecorationElement('tml:element', options);

    var html = [];
    html.push("<" + element + ">");
    html.push(value);
    html.push("</" + element + ">");

    return html.join("");
  }

};

module.exports = HTMLDecorator;



