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

var utils           = require('../utils');
var logger          = require('../logger');
var config          = require('../configuration');
var decorator       = require('../decorators/html');

/**
 * Tokens.Data
 *
 * @description
 * Data token
 *
 * @constructor
 * @param name
 * @param label
 */

function DataToken(name, label) {
  if (!name) return;
  this.full_name = name;
  this.label = label;
  this.parseElements();
}

DataToken.prototype = {

  /**
   *  parseElements
   */
  parseElements: function() {
    var name_without_parens = this.full_name.replace(/[%\{\}]/g, "").trim();
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
  },

  /**
   * getContextForLanguage
   *
   * @param language
   * @returns {*}
   */
  getContextForLanguage: function(language) {
    if (this.context_keys.length > 0)
      return language.getContextByKeyword(this.context_keys[0]);
  
    return language.getContextByTokenName(this.short_name);
  },

  /**
   * tokenObject
   *
   * @param tokens
   * @param name
   * @returns {*}
   */
  getTokenObject: function(tokens, name) {
    if (!tokens) return null;

    name = name || this.short_name;

    var object = tokens[name];
    if (utils.isArray(object))
      return object[0];
  
    return object && object.object || object;
  },

  /**
   * error
   *
   * @param msg
   * @returns {*}
   */
  error: function(msg) {
    // console.log(this.full_name + " in \"" + this.label + "\" : " + msg);
    return this.full_name;
  },
  
  /**
   * getTokenValueFromArrayParam
   *
   * @description
   * gets the value based on various evaluation methods
   *
   * @example
   *
   * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "Michael"]}}
   * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, function(text) { return tr(text); }]}}
   *
   */
  
  getTokenValueFromArrayParam: function(arr, language, options) {
    options = options || {};
    if (arr.length === 0)
      return this.error("Invalid number of params of an array");
  
    var object = arr[0];
    var method = arr.length > 1 ? arr[1] : null;

    if (utils.isArray(object))
      return this.getTokenValueFromArray(arr, language, options);

    if (method && utils.isFunction(method)) {
      return this.sanitize(method(object), object, language, utils.extend(options, {safe: true}));
    }

    if (!method)
      return this.sanitize("" + object, object, language, utils.extend(options, {safe: false}));

    return this.sanitize(method.toString(), object, language, utils.extend(options, {safe: true}));
  },
  
  
  /**
   * getTokenValueFromHashParam
   *
   * @example
   *
   * tr("Hello {user}", {user: {value: "Michael", gender: "male"}}}
   * tr("Hello {user}", {user: {object: {gender: "male"}, value: "Michael"}}}
   * tr("Hello {user}", {user: {object: {name: "Michael", gender: "male"}, property: "name"}}}
   * tr("Hello {user}", {user: {object: {name: "Michael", gender: "male"}, attribute: "name"}}}
   * tr("Hello {user}", {user: {object: {name: "Michael", gender: "male"}, method: ()}}}
   *
   */
  
  getTokenValueFromHashParam: function(hash, language, options) {
    options = options || {};
    var value = hash.value || hash.name || hash.first_name || hash.username;
    var method = hash.method;
    var object = hash.object;

    if (method && utils.isFunction(method)) {
      return this.sanitize(method(object), object, language, utils.extend(options, {safe: true}));
    }

    if (value)
      return this.sanitize(value, object || hash, language, utils.extend(options, {safe: true}));

    if (!object)
      return this.sanitize(hash.toString(), object, language, utils.extend(options, {safe: false}));

    var attr = hash.attribute;
  
    if (!attr) return this.error("Missing value for hash token");
  
    return this.sanitize(object[attr], object, language, utils.extend(options, {safe: false}));
  },
  
  
  /**
   * getTokenValueFromArray
   *
   * @description
   * first element is an array, the rest of the elements are similar to the
   * regular tokens lambda, symbol, string, with parameters that follow
   *
   * if you want to pass options, then make the second parameter an array as well
   *
   * @example
   *
   * tr("Hello {user_list}!", {user_list: [[user1, user2, user3], "{$0}", {}]}}
   * tr("{users} joined the site", {users: [[user1, user2, user3], "@name"]})
   * tr("{users} joined the site", {users: [[user1, user2, user3], function(user) { return tr(user.name); }]})
   * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name"})
   * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name", value: "<strong>{$0}</strong>"})
   * tr("{users} joined the site", {users: [[user1, user2, user3], "<strong>{$0}</strong>")

   var user_func = function(user) {}

   tokens = {users: [someArr]}

   <p tml-tr users="someArr" users-format='{attribute: "name"}' users-options=''>
      {users} joined the site
   </p>

   * tr("{count || message}", {user: [1234, function(value) { return tml_localize(value); }]})
   *
   * tr("{users} joined the site", {users: [[user1, user2, user3], "@name", {
   *   limit: 4,
   *   separator: ', ',
   *   joiner: 'and',
   *   remainder: function(elements) { return tr("{count||other}", count: elements.size); },
   *   expandable: true,
   *   collapsable: true
   * })
   *
   */
  
  getTokenValueFromArray: function(params, language, options) {
    var list_options = {
      description: "List joiner",
      limit: 4,
      separator: ", ",
      joiner: 'and',
      less: '{laquo} less',
      translate: false,
      expandable: false,
      collapsable: true
    };

    options = options || {};
    var objects = params[0];
    var method = (params.length > 1 ? params[1] : null);
  
    if (params.length > 2)
      list_options = utils.extend(list_options, params[2]);
  
    if (options.skip_decorations)
      list_options.expandable = false;

    var target_language = options.target_language || language;

    var values = [];
    var value;
    for (var i=0; i<objects.length; i++) {
      var obj = objects[i];
      if (method === null) {
        value = this.getTokenValueFromHashParam(obj, language, options);

        if (list_options.translate && target_language)
          value = target_language.translate(value, '', {}, options);

        values.push(decorator.decorateElement(this, value, options));
      } else if (utils.isFunction(method)) {
        values.push(decorator.decorateElement(this, this.sanitize(method(obj), obj, language, utils.extend(options, {safe: true})), options));

      } else if (typeof method === "string") {
        if (method.match(/^@/)) {
          var attr = method.replace(/^@/, "");
          value = obj[attr] || obj[attr]();

          if (list_options.translate && target_language)
            value = target_language.translate(value, '', {}, options);

          values.push(decorator.decorateElement(this, this.sanitize(value, obj, language, utils.extend(options, {safe: false})), options));
        } else {
          value = "" + obj;

          if (list_options.translate && target_language)
            value = target_language.translate(value, '', {}, options);

          values.push(decorator.decorateElement(this, method.replace("{$0}", this.sanitize(value, obj, language, utils.extend(options, {safe: false}))), options));
        }
      } else if (utils.isObject(method)) {
        var attribute = method.attribute || method.property;

        if (attribute && obj[attribute]) {
          attribute = this.sanitize(obj[attribute], obj, language, utils.extend(options, {safe: false}));

          if (list_options.translate && target_language)
            attribute = target_language.translate(attribute, '', {}, options);

          if (method.value)
            values.push(decorator.decorateElement(this, method.value.replace("{$0}", attribute), options));
          else
            values.push(decorator.decorateElement(this, attribute || "" + obj, options));
        } else {
          value = this.getTokenValueFromHashParam(obj, language, options);

          if (list_options.translate && target_language)
            value = target_language.translate(value, '', {}, options);

          values.push(decorator.decorateElement(this, value, options));
        }
      }
    }
  
    if (values.length == 1)
      return values[0];
  
    if (!list_options.joiner || list_options.joiner === "")
      return values.join(list_options.separator);

    var joiner = target_language.translate(list_options.joiner, list_options.description, {}, options);
  
    if (values.length <= list_options.limit) {
      var last = values.pop();
      return values.join(list_options.separator) + " " + joiner + " " + last;
    }
  
    var displayed_values = values.slice(0, list_options.limit);
    var remaining_values = values.slice(list_options.limit);

    var result = displayed_values.join(list_options.separator);
    var other_values = target_language.translate("{count || other}", list_options.description, {count: remaining_values.length}, options);
  
    if (!list_options.expandable) {
      result = result + " " + joiner + " ";
      if (utils.isFunction(list_options))
        return result + list_options.remainder(remaining_values);
      return result + other_values;
    }
  
    var key = list_options.key ? list_options.key : utils.generateKey(this.label, values.join(","));
  
    result = result + '<span id="tml_other_link_' + key + '"> ' + joiner + ' ';
    result = result + '<a href="#" class="tml_other_list_link" onClick="' + "document.getElementById('tml_other_link_" + key + "').style.display='none'; document.getElementById('tml_other_elements_" + key + "').style.display='inline'; return false;" + '">';
  
    if (list_options.remainder && typeof list_options.remainder === "function")
      result = result + list_options.remainder(remaining_values);
    else
      result = result + other_values;
  
    result = result + "</a></span>";
  
    result = result + '<span id="tml_other_elements_' + key + '" style="display:none">' + list_options.separator;
    var last_remaining = remaining_values.pop();
    result = result + remaining_values.join(list_options.separator);
    result = result + " " + joiner + " " + last_remaining;
  
    if (list_options.collapsable) {
      result = result + ' <a href="#" class="tml_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tml_other_link_" + key + "').style.display='inline'; document.getElementById('tml_other_elements_" + key + "').style.display='none'; return false;" + '">';
      result = result + target_language.translate(list_options.less, list_options.description, {}, options);
      result = result + "</a>";
    }
  
    result = result + "</span>";
    return result;
  },
  
  getTokenValue: function(tokens, language, options) {
    tokens = tokens || {};
    options = options || {};

    var hasToken = (this.short_name in tokens);

    var object = hasToken ? tokens[this.short_name] : config.getDefaultToken(this.short_name);
    if (typeof object === 'undefined' || object === null) return this.error("Missing token value");

    if (typeof object == "string")
      return this.sanitize(object.toString(), object, language, utils.extend(options, {safe: true}));

    if (utils.isArray(object))
      return this.getTokenValueFromArrayParam(object, language, options);

    if (utils.isObject(object))
      return this.getTokenValueFromHashParam(object, language, options);

    return this.sanitize(object.toString(), object, language, utils.extend(options, {safe: false}));
  },
  
  applyCase: function(key, value, object, language, options) {
    var lcase = language.getLanguageCaseByKeyword(key);
    if (!lcase) return value;
    return lcase.apply(value, object, options);
  },
  
  sanitize: function(value, object, language, options) {
    options = options || {};
    value = "" + value;

    if (!options.safe) value = utils.escapeHTML(value);

    if (this.case_keys.length > 0) {
      for (var i=0; i<this.case_keys.length; i++) {
        value = this.applyCase(this.case_keys[i], value, object, language, options);
      }
    }
  
    return value;
  },
  
  substitute: function(label, tokens, language, options) {
    return label.replace(this.full_name, decorator.decorateToken(this, this.getTokenValue(tokens, language, options), options));
  },

  getDecorationName: function() {
    return 'data';
  }
  
};

module.exports = DataToken;