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
 * Tokens.Data
 *
 * @description
 * Data token
 *
 * @constructor
 * @param name
 * @param label
 */

Tr8n.Tokens.Data = function(name, label) {
  this.full_name = name;
  this.label = label;
  this.parseElements();
};

Tr8n.Tokens.Data.prototype = {

  /**
   *  parseElements
   */
  parseElements: function() {
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
  tokenObject: function(tokens, name) {
    if (tokens == null) return null;
  
    var object = tokens[name];
    if (typeof object === 'array')
      return object[0];
  
    return object.object || object;
  },

  /**
   * error
   *
   * @param msg
   * @returns {*}
   */
  error: function(msg) {
    console.log(this.full_name + " in \"" + this.label + "\" : " + msg);
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
   * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "@name"]}}
   * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "@@method"]}}
   *
   */
  
  getTokenValueFromArrayParam: function(arr, language, options) {
    options = options || {};
    if (arr.lenght == 0)
      return this.error("Invalid number of params of an array");
  
    var object = arr[0];
    var method = arr.lenght > 1 ? arr[1] : null;
  
    if (typeof object === "array")
      return this.getTokenValueFromArray(arr, language, options);
  
    if (method == null)
      return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    if (method.match(/^@@/))
      return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    if (method.match(/^@/))
      return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
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
   *
   */
  
  getTokenValueFromHashParam: function(hash, language, options) {
    options = options || {};
    var value = hash.value;
    var object = hash.object;
  
    if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));
    if (!object) return this.error("No object or value are provided in the hash");
  
    var attr = hash.attribute;
  
    if (!attr) return this.error("Missing value for hash token");
  
    return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
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
   * tr("Hello {user_list}!", {user_list: [[user1, user2, user3], "@name"]}}
   * tr("{users} joined the site", {users: [[user1, user2, user3], "@name"]})
   * tr("{users} joined the site", {users: [[user1, user2, user3], function(user) { return user.name; }]})
   * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name"})
   * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name", value: "<strong>{$0}</strong>"})
   * tr("{users} joined the site", {users: [[user1, user2, user3], "<strong>{$0}</strong>")
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
      expandable: true,
      collapsable: true
    };
  
    var objects = params[0];
    var method = (params.length > 1 ? params[1] : null);
  
    if (params.length > 2)
      list_options = Tr8n.Utils.merge(list_options, params[2]);
  
    if (options["skip_decorations"])
      list_options.expandable = false;
  
    var values = [];
    for (var obj in objects) {
      if (method == null) {
        values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
      } else if (typeof method === "string") {
        if (method.match(/^@@/))
          values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));
        else if (method.match(/^@/))
          values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));
        else
          values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));
      } else if (typeof method === "object") {
        var attribute = method.attribute;
        var value = method.value;
  
        if (attribute == null)
          return this.error("No attribute is provided for the hash object in the array");
  
        if (!object[attribute])
          return this.error("Hash object in the array does not contain such attribute");
  
        attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));
  
        if (value)
          values.push(value.replace("{$0}", attribute));
        else
          values.push(attribute);
      } else if (typeof method === "function") {
        values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
      }
    }
  
    if (values.lenght == 1)
      return values[0];
  
    if (!list_options.joiner || list_options.joiner == "")
      return values.join(list_options.separator);
  
    var joiner = language.translate(list_options.joiner, list_options.description, {}, options);
  
    if (values.length <= list_options.limit) {
      var last = values.pop();
      return values.join(list_options.separator) + " " + joiner + " " + last;
    }
  
    var displayed_values = values.slice(0, list_options.limit);
    var remaining_values = values.slice(list_options.limit);
  
    var result = displayed_values.join(list_options.separator);
    var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);
  
    if (list_options.expandable) {
      result = result + " " + joiner + " ";
      if (list_options.remainder && typeof list_options.remainder === "function")
        return result + list_options.remainder(remaining_values);
      return result + other_values;
    }
  
    var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));
  
    result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
    result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';
  
    if (list_options.remainder && typeof list_options.remainder === "function")
      result = result + list_options.remainder(remaining_values);
    else
      result = result + other_values;
  
    result = result + "</a></span>";
  
    result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + list_options.separator;
    var last_remaining = remaining_values.pop();
    result = result + remaining_values.join(list_options.separator);
    result = result + " " + joiner + " " + last_remaining;
  
    if (list_options.collapsable) {
      result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
      result = result + language.translate(list_options.less, list_options["description"], {}, options);
      result = result + "</a>";
    }
  
    result = result + "</span>";
    return result;
  },
  
  getTokenValue: function(tokens, language, options) {
    options = options || {};
    var object = null;
  
    if (tokens[this.short_name])
      object = tokens[this.short_name];
    else
      object = Tr8n.config.getDefaultToken(this.short_name);
  
    if (!object)
      return this.error("Missing token value");
  
    if (typeof object === "array") {
      return this.getTokenValueFromArrayParam(object, language, options);
    }
  
    if (typeof object === "object") {
      return this.getTokenValueFromHashParam(object, language, options);
    }
  
    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
  },
  
  applyCase: function(key, value, object, language, options) {
    var lcase = language.getLanguageCaseByKeyword(key);
    if (!lcase) return value;
    return lcase.apply(value, object, options);
  },
  
  sanitize: function(value, object, language, options) {
    value = "" + value;
  
    if (!options.safe) {
      value = escape(value);
    }
  
    if (this.case_keys.length > 0) {
      for (var i=0; i<this.case_keys.length; i++) {
        value = this.applyCase(this.case_keys[i], value, object, language, options);
      }
    }
  
    return value;
  },
  
  substitute: function(label, tokens, language, options) {
    return label.replace(this.full_name, this.getTokenValue(tokens, language, options));
  }
  
};