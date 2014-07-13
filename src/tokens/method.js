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

Tr8n.Tokens.Method = function() {
  Tr8n.Tokens.Data.apply(this, arguments);
};

Tr8n.Tokens.Method.prototype = Tr8n.Tokens.Data.prototype;
Tr8n.Tokens.Method.prototype.constructor = Tr8n.Tokens.Data;

Tr8n.Tokens.Method.prototype.initObject = function() {
  var parts = this.short_name.split('.');
  this.object_name = parts[0];
  this.object_method = parts[1];
};

Tr8n.Tokens.Method.prototype.getObjectName = function() {
  if (!this.object_name) {
    this.initObject();
  }
  return this.object_name;
};

Tr8n.Tokens.Method.prototype.getObjectMethod = function() {
  if (!this.object_method) {
    this.initObject();
  }
  return this.object_method;
};

Tr8n.Tokens.Method.prototype.substitute = function(label, tokens, language, options) {
  var name = this.getObjectName();
  var object = Tr8n.Utils.tokenObject(tokens, name);
  if (!object) return this.error("Missing value for token");

  var method = this.getObjectMethod();

  return label.replace(this.full_name,
    this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}))
  );
};

