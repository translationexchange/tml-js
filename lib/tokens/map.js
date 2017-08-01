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

var utils           = require('../utils');
var decorator       = require('../decorators/html');

var DataToken       = require('./data');

function MapToken(name, label) {
  if (!name) return;
  this.full_name = name;
  this.label = label;
  this.params = [];
  this.context_keys = [];
  this.case_keys = [];
  this.parseElements();
}

MapToken.prototype = new DataToken();
MapToken.prototype.constructor = MapToken;

/**
 * Parses map configuration
 */
MapToken.prototype.parseElements = function() {
  var name_without_parens = this.full_name.replace(/[%\{\}]/g, "").trim();
  var parts = name_without_parens.split('@');
  this.short_name = parts[0].trim();

  var self = this;
  var params_parts = parts[1].trim();
  if (params_parts === '')
    return;

  params_parts.split(',').forEach(function(param) {
    self.params.push(param.trim());
  });

  if (this.params[0].indexOf(':') !== -1) {
    var hash = {};
    this.params.forEach(function(param) {
      parts = param.split(':');
      hash[parts[0].trim()] = parts[1].trim();
    });
    this.params = hash;
  }
};

/**
 *
 * @param label
 * @param tokens
 * @param language
 * @param options
 * @returns {string|*|XML|void}
 */
MapToken.prototype.substitute = function(label, tokens, language, options) {
  var object = this.getTokenObject(tokens);

  if (typeof(object) === 'undefined' || object === null) {
    this.error("Missing value for a token " + this.full_name);
    return label;
  }

  if (this.params.length === 0) {
    this.error("Params may not be empty for token " + this.full_name);
    return label;
  }

  var object_value = this.params[object];
  var decorated_token = decorator.decorateToken(this, object_value, options);
  return label.replace(this.full_name, decorated_token, options);
};

MapToken.prototype.getDecorationName = function() {
  return 'map';
};

module.exports = MapToken;

