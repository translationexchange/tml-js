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

var config          = require('../configuration');

var DataToken       = require("../tokens/data");
var MethodToken     = require("../tokens/method");
var PipedToken      = require("../tokens/piped");

var DataTokenizer = function(label) {
  this.label = label;
  this.tokenize();
};

DataTokenizer.prototype = {

  tokenize: function() {
    this.tokens = [];
    var tokens = this.getSupportedTokens();

    var label = "" + this.label;
    for (var i=0; i<tokens.length; i++) {
      var token = tokens[i];
      var matches = label.match(token[0]) || [];
      for (var j=0; j<matches.length; j++) {
        this.tokens.push(new token[1](matches[j], this.label));
      }
      label = label.replace(tokens[i][0], "");
    }
  },

  getSupportedTokens: function() {
    //TODO: Add ability to overload the syntax from config
    //TODO: Add ability to override token syntax in config

    return [
      [/(%?\{{1,2}\s*\w*\s*(:\s*\w+)*\s*(::\s*\w+)*\s*\}{1,2})/g, DataToken],
      [/(%?\{{1,2}\s*[\w]*\.\w*\s*(:\s*\w+)*\s*(::\s*\w+)*\s*\}{1,2})/g, MethodToken],
      [/(%?\{{1,2}\s*[\w]*\s*(:\s*\w+)*\s*\|\|?[^\{\}\|]+\}{1,2})/g, PipedToken]
    ];
  },

  isTokenAllowed: function(token, options) {
    if (!options.allowed_tokens) return true;
    return (options.allowed_tokens.indexOf(token) != -1);
  },

  substitute: function(language, context, options) {
    options = options || {};
    var label = this.label;

    for (var i=0; i<this.tokens.length; i++) {
      var token = this.tokens[i];
      if (this.isTokenAllowed(token.name, options)) {
        label = token.substitute(label, context, language, options);
      }
    }
    return label;
  },
  get metadata() {
    
    var tokenTypes = DataTokenizer.prototype.getSupportedTokens();
    return tokenTypes.reduce(function (result, value, index)
    {
      var name = value[1].name;
      if (!name)
          name = /function ([^(]*)/.exec( value[1]+"" )[1];
      
      if (name)
          result[name] = value[0];
      
      return result;
    }, {});
  }
};

module.exports = DataTokenizer;