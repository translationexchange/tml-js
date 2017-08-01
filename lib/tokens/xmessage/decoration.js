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

var utils = require('../../utils');
var logger = require('../../logger');
var BaseToken = require('../decoration');

var DEFAULT_DECORATION_PLACEHOLDER = '{!yield!}';

// {0} tagged himself/herself in {1,choice,singular#{1,number} {2,map,photo#photo|video#video}|plural#{1,number} {2,map,photo#photos|video#videos}}.

function DecorationToken(label, opts) {
  this.label = label;
  this.type = opts.type;
  this.short_name = opts.index;
  this.default_name = opts.type;
  this.full_name = "{" + opts.index + "}";
  this.case_keys = [];
  this.context_keys = [];
  this.template = null;
}

DecorationToken.prototype = new BaseToken();
DecorationToken.prototype.constructor = BaseToken;

DecorationToken.prototype.getTemplate = function(method) {
  if (method) {
    if (utils.isString(method)) {
      // backwards compatibility to legacy code
      if (this.type === 'anchor')
        return "<a href='" + method + "'>" + DEFAULT_DECORATION_PLACEHOLDER + "</a>";
      return method;
    }

    if (utils.isArray(method) || utils.isObject(method))
      return this.getDefaultDecoration(DEFAULT_DECORATION_PLACEHOLDER, method);

    return DEFAULT_DECORATION_PLACEHOLDER;
  }

  return this.getDefaultDecoration(DEFAULT_DECORATION_PLACEHOLDER);
};

DecorationToken.prototype.getOpenTag = function(method) {
  this.template = this.getTemplate(method);
  return this.template.split(DEFAULT_DECORATION_PLACEHOLDER)[0];
};

DecorationToken.prototype.getCloseTag = function() {
  var parts = this.template.split(DEFAULT_DECORATION_PLACEHOLDER);
  return parts[parts.length - 1];
};

module.exports = DecorationToken;