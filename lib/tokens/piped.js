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

/**
 * Piped Token Form
 *
 * {count:number || one: message, many: messages}
 * {count:number || one: сообщение, few: сообщения, many: сообщений, other: много сообщений}
 * in other case the number is not displayed*
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
 * Dear {user} => {user <- Дорогой, Дорогая}
 * {user} uploaded => {user -> загрузил, загрузила}
 *
 */

var utils           = require('../utils');
var decorator       = require('../decorators/html');

var DataToken       = require('./data');

function PipedToken(name, label) {
  if (!name) return;
  this.full_name = name;
  this.label = label;
  this.parseElements();
}

PipedToken.prototype = new DataToken();
PipedToken.prototype.constructor = PipedToken;

PipedToken.prototype.parseElements = function() {
  var name_without_parens = this.full_name.replace(/[%\{\}]/g, "").trim();

  var parts = name_without_parens.split('|');
  var name_without_pipes = parts[0].trim();

  this.short_name = name_without_pipes.split(':')[0].trim();

  this.case_keys = [];
  var keys = name_without_pipes.match(/(::\s*\w+)/g) || [];
  for (var i=0; i<keys.length; i++) {
    this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
  }

  this.context_keys = [];
  var name_without_case_keys = name_without_pipes.split('::')[0].trim();
  keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
  for (i=0; i<keys.length; i++) {
    this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
  }

  this.separator = (this.full_name.indexOf("||") != -1 ? '||' : '|');

  this.parameters = [];
  parts = name_without_parens.split(this.separator);
  if (parts.length > 1) {
    parts = parts[1].split(',');
    for (i=0; i<parts.length; i++) {
      this.parameters.push(parts[i].trim());
    }
  }
};

PipedToken.prototype.isValueDisplayedInTranslation = function() {
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

PipedToken.prototype.generateValueMapForContext = function(context) {
  var values = {}, i, j;

  if (this.parameters[0].indexOf(':') != -1) {
    for (i=0; i<this.parameters.length; i++) {
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
  if (typeof token_mapping === "string") {
    this.error("The token mapping " + token_mapping + " does not support the parameters.");
    return null;
  }

  // ["unsupported", {}]
  if (utils.isArray(token_mapping)) {
    if (this.parameters.length > token_mapping.length) {
      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      return null;
    }

    token_mapping = token_mapping[this.parameters.length-1];

    if (typeof token_mapping === "string") {
      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      return null;
    }
  }

  // {}
  var keys = utils.keys(token_mapping);

  for (i=0; i<keys.length; i++) {
    var key = keys[i];
    var value = token_mapping[key];

    values[key] = value;

    // token form {$0::plural} - number followed by language cases

    var internal_keys = value.match(/{\$\d(::[\w]+)*\}/g) || [];

    for (j=0; j<internal_keys.length; j++) {
      var token = internal_keys[j];
      var token_without_parens = token.replace(/[\{\}]/g, '');
      var parts = token_without_parens.split('::');
      var index = parseInt(parts[0].replace(/[$]/, ''));

      if (this.parameters.length < index) {
        this.error("The index inside " + token_mapping + " is out of bound: " + this.full_name);
        return null;
      }

      var val = this.parameters[index];

      parts.shift();
      for (var k=0; k<parts.length; k++) {
        var language_case = context.language.getLanguageCaseByKeyword(parts[k]);
        if (language_case) val = language_case.apply(val);
      }

      values[key] = values[key].replace(internal_keys[j], val);
    }
  }

  return values;
};

PipedToken.prototype.substitute = function(label, tokens, language, options) {
  if (!(this.short_name in tokens)) {
    this.error("Missing value");
    return label;
  }

  var object = this.getTokenObject(tokens);

  if (this.parameters.length === 0) {
    this.error("Piped params may not be empty");
    return label;
  }

  var context = this.getContextForLanguage(language);

  var piped_values = this.generateValueMapForContext(context);

  if (!piped_values) return label;

  var rule = context.findMatchingRule(object);

  if (rule === null) return label;

  var value = piped_values[rule.keyword];
  if (!value) {
    var fallback_rule = context.getFallbackRule();
    if (fallback_rule && piped_values[fallback_rule.keyword]) {
      value = piped_values[fallback_rule.keyword];
    } else {
      this.error("No matching context rule found and no fallback provided");
      return label;
    }
  }

  var token_value = [];
  var decorated_token = decorator.decorateToken(this, this.getTokenValue(tokens, language, options), options);

  if (this.isValueDisplayedInTranslation()) {
    token_value.push(decorated_token);
    token_value.push(" ");
  } else {
    value = value.replace("#" + this.short_name + "#", decorated_token);
  }
  token_value.push(value);

  return label.replace(this.full_name, token_value.join(""));
};

PipedToken.prototype.getDecorationName = function() {
  return 'piped';
};

module.exports = PipedToken;

