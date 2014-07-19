/**
 * Copyright (c) 2014 Michael Berkovich, TranslationExchange.com
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

var HTMLDecorator = {

  decorate: function(translated_label, translation_language, target_language, translation_key, options) {
    options = options || {};

    if (
         options.skip_decorations
      || translation_key.language == target_language
      || !options.current_translator
      || !options.current_translator.inline
      || (translation_key.locked && !options.current_translator.manager)
    ) return translated_label;

    var element = 'tr8n:tr';
    var classes = ['tr8n_translatable'];

    if (translation_key.locked) {
      if (!options.current_translator.isFeatureEnabled("show_locked_keys"))
          return translated_label;
      classes.push('tr8n_locked');
    } else if (translation_language.locale == target_language.locale) {
      classes.push('tr8n_translated');
    } else {
      classes.push('tr8n_not_translated');
    }

    var html = [];
    html.push("<" + element + " class='" + classes.join(' ') + "' data-translation_key='" + translation_key.key + "'>");
    html.push(translated_label);
    html.push("</" + element + ">");
    return html.join("");
  }

};

module.exports = HTMLDecorator;



