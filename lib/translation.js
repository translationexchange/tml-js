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

var utils           = require('./utils');

var DataToken       = require('./tokens/data');

/**
 * Translation
 *
 * @constructor
 * @param {object} attrs - options
 */
var Translation = function(attrs) {
  utils.extend(this, attrs);
  if (attrs.language)
    this.locale = attrs.language.locale;
};

Translation.prototype = {

  hasContextRules: function() {
    return (this.context && utils.keys(this.context).length > 0);
  },

  isValidTranslation: function(tokens) {
    if (!this.hasContextRules())
      return true;

    var token_names = utils.keys(this.context);
    for(var i=0; i<token_names.length; i++) {
      var token_name = token_names[i];
      var rules = this.context[token_name];
      var object = DataToken.prototype.getTokenObject(tokens, token_name);

      if (!object) return false;

      var rule_keys = utils.keys(rules);

      for(var j=0; j<rule_keys.length; j++) {
        var context_key = rule_keys[j];
        var rule_key = rules[rule_keys[j]];

        if (rule_key != "other") {
          var context = this.language.getContextByKeyword(context_key);
          if (!context) return false; // unsupported context type

          var rule = context.findMatchingRule(object);
          if (!rule || rule.keyword != rule_key)
            return false;
        }
      }
    }

    return true;
  }

};

module.exports = Translation;


