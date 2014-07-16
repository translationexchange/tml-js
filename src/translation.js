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

/**
 * Translation
 *
 * @constructor
 * @param {object} attrs - options
 */
Tr8n.Translation = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  if (!this.language && this.locale && this.translation_key) {
    this.language = this.translation_key.application.getLanguage(this.locale);
  }

};

Tr8n.Translation.prototype = {

  hasContextRules: function() {
    return (this.context && Tr8n.Utils.keys(this.context).length > 0);
  },

  isValidTranslation: function(tokens) {
    if (this.hasContextRules())
      return true;

    var token_names = Tr8n.Utils.keys(this.context);
    for(var i=0; i<token_names.length; i++) {
      var object = Tr8n.Configuration.prototype.tokenObject(tokens, token_names[i]);
      if (!object) return false;

      var rule_keys = Tr8n.Utils.keys(this.context[token_names[i]]);

      for(var j=0; j<rule_keys.length; j++) {
        if (rule_keys[j] != "other") {
          var context = this.language.getContextByKeyword(rule_keys[j]);
          if (context == null) return false; // unsupported context type

          var rule = context.findMatchingRule(object);
          if (!rule || rule.keyword != rule_keys[j])
            return false;
        }
      }
    }

    return true;
  }

};



