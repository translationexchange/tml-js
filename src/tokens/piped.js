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
 * Piped Token Form
 *
 * {count:number || one: message, many: messages}
 * {count:number || one: сообщение, few: сообщения, many: сообщений, other: много сообщений}   in other case the number is not displayed*
 *
 * {count | message}   - will not include {count}, resulting in "messages" with implied {count}
 * {count | message, messages}
 *
 * {count:number | message, messages}
 *
 * {user:gender | he, she, he/she}
 *
 * {user:gender | male: he, female: she, other: he/she}
 *
 * {now:date | did, does, will do}
 * {users:list | all male, all female, mixed genders}
 *
 * {count || message, messages}  - will include count:  "5 messages"
 *
 */

Tr8n.Tokens.Piped = function() {
  Tr8n.Tokens.Data.apply(this, arguments);
};

Tr8n.Tokens.Piped.prototype = Tr8n.Tokens.Data.prototype;
Tr8n.Tokens.Piped.prototype.constructor = Tr8n.Tokens.Data;

Tr8n.Tokens.Piped.prototype.parseElements = function() {
  var name_without_parens = this.full_name.substring(1, this.full_name.length-1);
  var name_without_case_keys = name_without_parens.split('::')[0].trim();

  this.short_name = name_without_parens.split(':')[0].trim();
  this.case_keys = [];

  var keys = name_without_parens.match(/(::\s*\w+)/g) || [];
  for (var i=0; i<keys.length; i++) {
    this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
  }

  this.context_keys = [];
  keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
  for (i=0; i<keys.length; i++) {
    this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
  }
};

Tr8n.Tokens.Piped.prototype.isValueDisplayedInTranslation = function() {
  return (this.separator == '||');
};

/**
 * token:      {count|| one: message, many: messages}
 * results in: {"one": "message", "many": "messages"}
 *
 * token:      {count|| message}
 * transform:  [{"one": "{$0}", "other": "{$0::plural}"}, {"one": "{$0}", "other": "{$1}"}]
 * results in: {"one": "message", "other": "messages"}
 *
 * token:      {count|| message, messages}
 * transform:  [{"one": "{$0}", "other": "{$0::plural}"}, {"one": "{$0}", "other": "{$1}"}]
 * results in: {"one": "message", "other": "messages"}
 *
 * token:      {user| Dorogoi, Dorogaya}
 * transform:  ["unsupported", {"male": "{$0}", "female": "{$1}", "other": "{$0}/{$1}"}]
 * results in: {"male": "Dorogoi", "female": "Dorogaya", "other": "Dorogoi/Dorogaya"}
 *
 * token:      {actors:|| likes, like}
 * transform:  ["unsupported", {"one": "{$0}", "other": "{$1}"}]
 * results in: {"one": "likes", "other": "like"}
 *
 *
 */

Tr8n.Tokens.Piped.prototype.generateValueMapForContext = function(context) {
  var values = {};

  if (this.parameters[0].indexOf(':') != -1) {
    for (var i=0; i<this.parameters.length; i++) {
      var name_value = this.parameters[i].split(":");
      values[name_value[0].trim()] = name_value[1].trim();
    }
    return values;
  }

  var token_mapping = context.token_mapping;

  if (!token_mapping) {
    this.error("The token context " + context.keyword + "does not support transformation for unnamed params");
    return null;
  }

  // "unsupported"
  if (typeof token_mapping == "string") {
    this.error("The token mapping " + token_mapping + " does not support the parameters.");
    return null;
  }

  // ["unsupported", {}]
  if (typeof token_mapping == "array") {
    if (this.parameters.length > token_mapping.length) {
      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      return null;
    }

    token_mapping = token_mapping[this.parameters.length-1];
    if (typeof token_mapping == "string") {
      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      return null;
    }
  }

  // {}
  var keys = Tr8n.Utils.keys(token_mapping);
  for (i=0; i<keys.length; i++) {
    var key = keys[i];
    var value = token_mapping[key];
    values[key] = value;

    // token form {$0::plural} - number followed by language cases
    keys = value.match(/{\$\d(::[\w]+)*\}/g);

    for (var j=0; j<keys.length; j++) {
      var token = keys[j];
      var token_without_parens = token.replace(/[\{\}]/g, '');
      var parts = token_without_parens.split('::');
      var index = parseInt(parts[0].replace(/[$]/, ''));

      if (this.parameters.length < index) {
        this.error("The index inside " + token_mapping + " is out of bound: " + this.full_name);
        return null;
      }

      var val = this.parameters[index];

      // TODO: check if language cases are enabled

      parts.pop();
      for (var k=0; k<parts.length; k++) {
        var language_case = context.language.getLanguageCaseByKeyword(parts[k]);
        if (language_case) val = language_case.apply(val);
      }

      values[key] = values[key].replace(tkey, val);
    }
  }

  return values;
};

Tr8n.Tokens.Piped.prototype.substitute = function(label, tokens, language, options) {
  if (!tokens[this.short_name]) {
    this.error("Missing value");
    return label;
  }

  var object = this.tokenObject(tokens, this.short_name);

  if (this.parameters.length == 0) {
    this.error("Piped params may not be empty");
    return label;
  }

  var context = this.getContextForLanguage(language);

  var piped_values = this.generateValueMapForContext(context);

  if (!piped_values) return label;

  var rule = context.findMatchingRule(object);

  if (rule == null) return label;

  var value = piped_values[rule.keyword];
  if (!value) {
    var fallback_rule = context.getFallbackRule();
    if (fallback_rule && piped_values[fallback_rule.keyword]) {
      value = piped_values[fallback_rule.keyword];
    } else {
      return label;
    }
  }

  var token_value = [];
  if (this.isValueDisplayedInTranslation()) {
    token_value.push(this.tokenValue(tokens, language, options));
    token_value.push(" ");
  } else {
    value = value.replace("#" + this.short_name + "#", this.tokenValue(tokens, language, options));
  }
  token_value.push(value);

  return label.replace(this.full_name, token_value.join(""));
};


