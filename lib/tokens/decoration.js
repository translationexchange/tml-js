/**
 * Copyright (c) 2017 Translation Exchange, Inc.
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
var logger = require('../logger');
var config = require('../configuration');

var RESERVED_TOKEN = "tml";
var TOKEN_PLACEHOLDER = "{$0}";

/**
 * Tokens.Decoration
 *
 * @description
 * Decoration token
 *
 * @constructor
 * @param name
 * @param label
 */

function DecorationToken(name, label) {
  if (!name) return;
  this.label = label;
  this.full_name = name;
  this.short_name = this.full_name;

  // removing the numbers at the end - default tokens don't need them
  this.default_name = this.short_name.replace(/(\d)*$/, '');
}

DecorationToken.prototype = {

  /**
   * Check if token is allowed in the label
   *
   * @param token_name
   * @param allowed_tokens
   * @returns {boolean}
   */
  isTokenAllowed: function (token_name, allowed_tokens) {
    return (!allowed_tokens || allowed_tokens.indexOf(token_name) !== -1);
  },

  /**
   * Get default decoration
   *
   * @param token_content
   * @param decoration_token_values
   * @returns {*}
   */
  getDefaultDecoration: function (token_content, decoration_token_values) {
    var default_decoration = config.getDefaultToken(this.default_name, "decoration");

    // need to think a bit more about this
    if (default_decoration === null) {
      return "<" + this.short_name + ">" + token_content + "</" + this.short_name + ">";
    }

    default_decoration = default_decoration.replace(TOKEN_PLACEHOLDER, token_content);

    if (utils.isObject(decoration_token_values)) {
      var keys = utils.keys(decoration_token_values);
      keys.forEach(function (key) {
        default_decoration = default_decoration.replace("{$" + key + "}", decoration_token_values[key]);
      });
    } else if (utils.isArray(decoration_token_values)) {
      var index = 1;
      decoration_token_values.forEach(function (value) {
        default_decoration = default_decoration.replace("{$" + (index++) + "}", value);
      });
    }

    default_decoration = default_decoration.replace(/[\w]*=['"]\{\$[^\}]*\}['"]/g, "").replace(/\s*>/, '>').trim();
    return default_decoration;
  },

  /**
   * Apply decoration token
   *
   * @param token_values
   * @param token_content
   * @param allowed_tokens
   * @returns {*}
   */
  apply: function (token_values, token_content, allowed_tokens) {
    if (this.short_name === RESERVED_TOKEN) return token_content;
    if (!this.isTokenAllowed(this.short_name, allowed_tokens)) return token_content;

    var method = token_values[this.short_name];

    if (!!method) {
      if (typeof method === 'string')
        return method.replace(TOKEN_PLACEHOLDER, token_content);

      if (typeof method === 'function')
        return method(token_content);

      if (utils.isArray(method) || utils.isObject(method))
        return this.getDefaultDecoration(token_content, method);

      return token_content;
    }

    return this.getDefaultDecoration(token_content);
  },

  getTokenObject: function(token_values, name) {
    token_values = token_values || {};

    name = name || this.short_name;

    if (name && utils.isString(name))
      name = name.replace(/:/, '');

    return token_values[name];
  },

  getTokenValue: function(token_values, language, options) {
    return this.getTokenObject(token_values, this.short_name);
  }

};

module.exports = DecorationToken;