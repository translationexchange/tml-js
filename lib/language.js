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

var utils           = require('./utils');
var config          = require('./configuration');

var LanguageContext = require('./language_context');
var LanguageCase    = require('./language_case');
var TranslationKey  = require('./translation_key');

/**
 * Language
 *
 * @constructor
 * @param {object} attrs - options
 */
var Language = function(attrs) {
  utils.extend(this, attrs);

  this.contexts = {};
  var keys = utils.keys(attrs.contexts || {});
  for (var i=0; i<keys.length; i++) {
    this.contexts[keys[i]] = new LanguageContext(utils.extend(attrs.contexts[keys[i]], {language: this, keyword: keys[i]}));
  }

  this.cases = {};
  keys = utils.keys(attrs.cases || {});
  for (i=0; i<keys.length; i++) {
    this.cases[keys[i]] = new LanguageCase(utils.extend(attrs.cases[keys[i]], {language: this, keyword: keys[i]}));
  }
};

Language.prototype = {
  getContextByKeyword: function(key) {
    return this.contexts[key];
  },
  
  getContextByTokenName: function(token_name) {
    var keys = utils.keys(this.contexts || {});
    for (var i=0; i<keys.length; i++) {
      if (this.contexts[keys[i]].isAppliedToToken(token_name))
        return this.contexts[keys[i]];
    }
    return null;
  },
  
  getLanguageCaseByKeyword: function(key) {
    return this.cases[key];
  },

  isDefault: function() {
    return (this.locale == config.default_locale);
  },

  translate: function(label, description, tokens, options) {
    var params = utils.normalizeParams(label, description, tokens, options);
    if (!params.label)
      return '';
    
    var translation_key = new TranslationKey({
      label:        params.label,
      description:  params.description,
      language:     this.application ? this.application.getLanguage() : null,
      application:  this.application
    });

    if (this.application) {
      var source_path = this.getSourcePath(params.options);
      var current_source = source_path[source_path.length-1];
      source_path = source_path.join(config.source_separator);

      if (params.options.block_options && params.options.block_options.dynamic)
        source_path = current_source;
      else
        this.application.verifySourcePath(current_source, source_path);

      var source = this.application.getSource(current_source);
      if (source && source.isIgnoredKey(translation_key.key)) {
        params.options.ignored = true;
        return translation_key.translate(this, params.tokens, params.options);
      }

      var cached_translations = source ? source.getTranslations(this.locale, translation_key.key) : null;

      if (cached_translations) {
        translation_key.setTranslations(this.locale, cached_translations);
      } else {
        params.options.pending = true;
        this.application.registerMissingTranslationKey(source_path, translation_key);
        var local_key = this.application.getTranslationKey(translation_key.key);
        if (local_key) translation_key = local_key;
      }
    }

    return translation_key.translate(this, params.tokens, params.options);
  },

  align: function(dest) {
    if (this.isRightToLeft())
      return (dest == 'left' ? 'right' : 'left');
    return dest;
  },

  isRightToLeft: function() {
    return this.right_to_left;
  },

  direction: function() {
    return this.isRightToLeft() ? 'rtl' : 'ltr';
  },

  getSourceName: function(source) {
    var source_name = source.call && source() || source;
    // limit source name to no more than 60 characters
    if (source_name && source_name.length > 60)
      source_name = source_name.substring(0, 60);
    return source_name;
  },

  getSourcePath: function(options) {

    if (!options.block_options.length){
      return [this.getSourceName(options.current_source)];
    }

    var source_path = [];

    for(var i=0; i<options.block_options.length; i++) {
      var opts = options.block_options[i];
      if (opts.source) {
        source_path.push(this.getSourceName(opts.source));
      }
    }

    source_path = source_path.reverse();
    source_path.unshift(this.getSourceName(options.current_source));

    return source_path;
  }
};

module.exports = Language;
