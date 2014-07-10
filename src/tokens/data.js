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

Tr8n.Tokens.Data = function(label, name) {
  this.label = label;
  this.fullName = name;
  this.parseElements();
};

Tr8n.Tokens.Data.prototype = {
  parseElements: function() {

  }
};

Tr8n.Tokens.Data.prototype.parseElements = function() {
  var nameWithoutParens = this.fullName.substring(1, this.fullName.length-2);
  var nameWithoutCaseKeys = nameWithoutParens.split('::')[0].trim();

  this.shortName = nameWithoutParens.split(':')[0].trim();
  // TODO: remove prefixes
  this.caseKeys = nameWithoutParens.match(/(::\w+)/g);
  this.contextKeys = nameWithoutCaseKeys.match(/(:\w+)/g);
};

Tr8n.Tokens.Data.prototype.contextForLanguage = function(language, opts) {
  if (this.contextKeys.length > 0)
    return language.contextByKeyword(this.contextKeys[0]);

  return language.contextByTokenName(this.shortName);
};

Tr8n.Tokens.Data.prototype.tokenObject = function(tokenValues, tokenName) {
  if (tokenValues == null) return null;
  
  var tokenObject = tokenValues[tokenName];
  if (typeof tokeObject === 'array')
    return tokenObject[0];

  return tokenObject.object || tokenObject;
};

Tr8n.Tokens.Data.prototype.error = function(msg) {
  console.log(this.fullName + " in \"" + this.label + "\" : " + msg);
  return this.fullName;
};

/**
 *
 * gets the value based on various evaluation methods
 *
 * examples:
 *
 * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "Michael"]}}
 * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "@name"]}}
 * tr("Hello {user}", {user: [{name: "Michael", gender: "male"}, "@@method"]}}
 *
 */

Tr8n.Tokens.Data.prototype.tokenValueFromArrayParam = function(arr, language, options) {
  options = options || {};
  if (arr.lenght == 0)
    return this.error("Invalid number of params of an array");

  var object = arr[0];
  var method = arr.lenght > 1 ? arr[1] : null;

  if (typeof object === "array")
    return this.tokenValueFromArray(tokenValues, language, options);

  if (method == null)
    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));

  if (method.match(/^@@/))
    return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));

  if (method.match(/^@/))
    return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));

  // TODO: add other methods if needed
  return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
};


/**
 * examples:
 *
 * tr("Hello {user}", {user: {value: "Michael", gender: "male"}}}
 *
 * tr("Hello {user}", {user: {object: {gender: "male"}, value: "Michael"}}}
 * tr("Hello {user}", {user: {object: {name: "Michael", gender: "male"}, property: "name"}}}
 * tr("Hello {user}", {user: {object: {name: "Michael", gender: "male"}, attribute: "name"}}}
 *
 */

Tr8n.Tokens.Data.prototype.tokenValueFromHashParam = function(hash, language, options) {
  options = options || {};
  var value = hash.value;
  var object = hash.object;

  if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));

  if (object == null || typeof object === "undefined")
    return this.error("No object or value are provided in the hash");

  var attr = hash.attribute;

  if (attr == null || typeof attr === "undefined")
    return this.error("Missing value for hash token");

  return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
};


/**
 *
 * tr("Hello {user_list}!", {user_list: [[user1, user2, user3], "@name"]}}
 *
 * first element is an array, the rest of the elements are similar to the
 * regular tokens lambda, symbol, string, with parameters that follow
 *
 * if you want to pass options, then make the second parameter an array as well
 *
 * tr("{users} joined the site", {users: [[user1, user2, user3], "@name"]})
 *
 * tr("{users} joined the site", {users: [[user1, user2, user3], function(user) { return user.name; }]})
 *
 * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name"})
 *
 * tr("{users} joined the site", {users: [[user1, user2, user3], {attribute: "name", value: "<strong>{$0}</strong>"})
 *
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

Tr8n.Tokens.Data.prototype.tokenValueFromArray = function(params, language, options) {
  var listOptions = {
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
    listOptions = Tr8n.Utils.merge(listOptions, params[2]);

  if (options["skip_decorations"])
    listOptions.expandable = false;

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

  if (!listOptions.joiner || listOptions.joiner == "")
    return values.join(listOptions.separator);

  var joiner = language.translate(listOptions.joiner, listOptions.description, {}, options);

  if (values.length <= listOptions.limit) {
    var last = values.pop();
    return values.join(listOptions.separator) + " " + joiner + " " + last;
  }

  var displayedValues = values.slice(0, listOptions.limit);
  var remainingValues = values.slice(listOptions.limit);

  var result = displayedValues.join(listOptions.separator);
  var otherValues = language.translate("{count||other}", listOptions.description, {count: remainingValues.length}, options);

  if (listOptions.expandable) {
    result = result + " " + joiner + " ";
    if (listOptions.remainder && typeof listOptions.remainder === "function")
      return result + listOptions.remainder(remainingValues);
    return result + otherValues;
  }

  var key = listOptions.key ? listOptions.key : Tr8n.Utils.generateKey(this.label, values.join(","));

  result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
  result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';

  if (listOptions.remainder && typeof listOptions.remainder === "function")
    result = result + listOptions.remainder(remainingValues);
  else
    result = result + otherValues;

  result = result + "</a></span>";

  result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + listOptions.separator;
  var lastRemaining = remainingValues.pop();
  result = result + remainingValues.join(listOptions.separator);
  result = result + " " + joiner + " " + lastRemaining;

  if (listOptions.collapsable) {
    result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
    result = result + language.translate(listOptions.less, listOptions["description"], {}, options);
    result = result + "</a>";
  }

  result = result + "</span>";
  return result;
};

Tr8n.Tokens.Data.prototype.tokenValue = function(tokenValues, language, options) {
  options = options || {};
  var object = null;

  if (tokenValues[this.shortName])
    object = tokenValues[this.shortName];
  else
    object = Tr8n.config.defaultToken(this.shortName);

  if (!object)
    return this.error("Missing token value");

  if (typeof object === "array") {
    return this.tokenValueFromArrayParam(object, language, options);
  }

  if (typeof object === "object") {
    return this.tokenValueFromHashParam(object, language, options);
  }

  return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
};

Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {
  var lcase = language.languageCase(key);
  if (!lcase) return value;
  return lcase.apply(value, object, options);
};

Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {
  value = "" . value;

  if (!options.safe) {
    // TODO: escape special chars
    value = htmlspecialchars(value);
  }

  if (this.caseKeys.length > 0) {
    var self = this;
    this.caseKeys.forEach(function(lcase) {
      value = self.applyCase(lcase, value, object, language, options);
    });
  }

  return value;
};

Tr8n.Tokens.Data.prototype.substitute = function(label, tokenValues, language, options) {
  var tokenValue = this.tokenValue(tokenValues, language, options);
  return label.replace(this.fullName, tokenValue);
};

