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
var decorator       = require('../decorators/html');

var DataToken       = require('./data');

function MethodToken(name, label) {
  if (!name) return;
  this.full_name = name;
  this.label = label;
  this.parseElements();
  this.initObject();
}

MethodToken.prototype = new DataToken();
MethodToken.prototype.constructor = MethodToken;

MethodToken.prototype.initObject = function() {
  var parts = this.short_name.split('.');
  this.short_name = parts[0];
  this.object_method = parts[1];
};

MethodToken.prototype.getTokenValue = function(tokens, language, options) {
  tokens = tokens || {};

  var object = tokens[this.short_name];
  if (!object) return this.error("Missing token value");

  var value;
  if (utils.isFunction(object[this.object_method])) {
    value = object[this.object_method]();
  }
  else {
    value = object[this.object_method];
  }

  return value;
};

MethodToken.prototype.substitute = function(label, tokens, language, options) {
  return label.replace(this.full_name,
    decorator.decorateToken(this, this.sanitize(
        this.getTokenValue(tokens),
        this.getTokenObject(tokens),
        language,
        utils.extend(options, {safe: false})
      ),
      options
    )
  );
};

MethodToken.prototype.getDecorationName = function() {
  return 'method';
};

module.exports = MethodToken;

