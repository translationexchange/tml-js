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

Tr8n.LanguageCase = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.rules = [];
  attrs.rules = attrs.rules || [];
  for (var i=0; i<attrs.rules.length; i++) {
    this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(attrs.rules[i], {language_case: this})));
  }
};


Tr8n.LanguageCase.prototype = {

  findMatchingRule: function(value, object) {
    for (var i=0; i<this.rules.length; i++) {
      var rule = this.rules[i];
      if (rule.evaluate(value, object))
        return rule;
    }

    return null;
  },

  apply: function(value, object, options) {
    var tags = Tr8n.Utils.unique(value.match(/<\/?[^>]*>/g));
    var sanitized_value = value.replaceAll(/<\/?[^>]*>/, '');

    var elements = [sanitized_value];
    if (this.application != 'phrase')
      elements = Tr8n.Utils.unique(sanitized_value.split(/[\s\/]/));

    // replace html tokens with temporary placeholders {$h1}
    for(var i=0; i<tags.length; i++) {
      value = value.replaceAll(tags[i], '{$h' + i + '}');
    }

    // replace words with temporary placeholders {$w1}
    for(i=0; i<elements.length; i++) {
      value = value.replaceAll(elements[i], '{$w' + i + '}');
    }

    var transformed_elements = [];
    for(i=0; i<elements.length; i++) {
      var element = elements[i];
      var rule = this.findMatchingRule(element, object);
      var case_value = (rule ? rule.apply(element) : element);
      transformed_elements.push(this.decorate(element, case_value, rule, options));
    }

    // replace back temporary placeholders {$w1}
    for(i=0; i<elements.length; i++) {
      value = value.replaceAll('{$w' + i + '}', transformed_elements[i]);
    }

    // replace back temporary placeholders {$h1}
    for(var i=0; i<tags.length; i++) {
      value = value.replaceAll('{$h' + i + '}', tags[i]);
    }

    return value;
  },

  getConfig: function() {
    return Tr8n.config;
  },

  decorate: function(original, value, rule, options) {
    if (
        (options && options.skip_decoration) ||
        this.language == null ||
        this.language.isDefault() ||
        this.getConfig().current_translator == null ||
        !this.getConfig().current_translator.isInlineModeEnabled()
      ) return value;

    return "<tr8n:tr class='tr8n_language_case' data-original='" + original.replaceAll("'", "\'") + "'>" + value + "</tr8n:tr>";
  }

};

