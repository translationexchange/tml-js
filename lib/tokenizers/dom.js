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

var utils = require("../utils");
var config = require("../configuration");

var DomTokenizer = function (doc, context, options) {
  this.doc = doc;
  this.context = context || {};
  this.tokens = [];
  this.options = options || {};
};

DomTokenizer.prototype = {

  /**
   *
   * @returns {*}
   */
  translate: function () {
    return this.translateTree(this.doc);
  },

  /**
   *
   * @param node
   * @returns {*}
   */
  translateTree: function (node) {
    if (this.isNonTranslatableNode(node)) {
      //if (node.childNodes.length == 1)
      //  return node.childNodes[0].nodeValue;
      return node.innerHTML;
    }

    if (node.nodeType === 3)
      return this.translateTml(node.nodeValue);

    var html = "";
    var buffer = "";

    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];

      // console.log("Translating: " + child.nodeType + " " + child.nodeName + " " + child.tagName);

      if (child.nodeType === 3) {
        buffer = buffer + child.nodeValue;
      } else if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {  // inline nodes - tml
        buffer = buffer + this.generateTmlTags(child);
      } else if (this.isSeparatorNode(child)) {    // separators:  br or hr
        if (buffer !== '')
          html = html + this.translateTml(buffer);
        html = html + this.generateHtmlToken(child);
        buffer = "";
      } else {
        if (buffer !== '')
          html = html + this.translateTml(buffer);

        var containerValue = this.translateTree(child);
        if (this.isIgnoredNode(child)) {
          html = html + containerValue;
        } else {
          html = html + this.generateHtmlToken(child, containerValue);
        }

        buffer = "";
      }
    }

    if (buffer !== '') {
      html = html + this.translateTml(buffer);
    }

    return html;
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isNoTranslate: function (node) {
    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        if (node.attributes[i].name === 'notranslate')
          return true;
        if (node.attributes[i].name === 'class' && node.attributes[i].value.indexOf("notranslate") !== -1)
          return true;
      }
    }

    return false;
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isNonTranslatableNode: function (node) {
    if (!node) return false;

    if (node.nodeType === 8) return true;

    if (node.nodeType === 1) {
      if (this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) !== -1)
        return true;

      if (node.childNodes.length === 0 && node.nodeValue === '')
        return true;

      if (this.isNoTranslate(node))
        return true;
    }

    return false;
  },

  /**
   *
   * @param tml
   * @returns {*}
   */
  translateTml: function (tml) {
    if (this.isEmptyString(tml)) return tml;

    tml = this.generateDataTokens(tml);

    var current_language = this.options.current_language || config.currentLanguage;

    if (this.getOption("split_sentences")) {
      sentences = utils.splitSentences(tml);
      translation = tml;
      var self = this;
      sentences.forEach(function (sentence) {
        var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : current_language.translate(sentence, self.tokens, self.options);
        translation = translation.replace(sentence, sentenceTranslation);
      });
      this.resetContext();
      return translation;
    }

    tml = tml.replace(/[\n]/g, '').replace(/\s\s+/g, ' ').trim();

    // console.log(tml);
    // console.log(this.tokens);

    translation = this.getOption("debug") ? this.debugTranslation(tml) : current_language.translate(tml, this.tokens, this.options);
    this.resetContext();
    return translation;
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isBetweenSeparators: function (node) {
    if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
      return true;

    if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
      return true;

    return false;
  },

  /**
   *
   * @param node
   * @returns {*}
   */
  generateTmlTags: function (node) {
    var buffer = "";
    var self = this;

    if (this.isNoTranslate(node)) {
      var tokenName = this.contextualize(this.adjustName(node), node.innerHTML);
      return "{" + tokenName + "}";
    }

    var name = node.tagName.toLowerCase();
    if (name === 'var') {
      return this.registerDataTokenFromVar(node);
    }

    for (var i = 0; i < node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType === 3)                    // text node
        buffer = buffer + child.nodeValue;
      else
        buffer = buffer + self.generateTmlTags(child);
    }
    var tokenContext = self.generateHtmlToken(node);
    var token = this.contextualize(this.adjustName(node), tokenContext);

    var value = this.sanitizeValue(buffer);

    if (this.isSelfClosingNode(node))
      return '{' + token + '}';

    if (this.isShortToken(token, value))
      return '[' + token + ': ' + value + ']';

    return '[' + token + ']' + value + '[/' + token + ']';
  },

  /**
   *
   * @param node
   * @returns {string}
   */
  registerDataTokenFromVar: function (node) {
    var object = {};
    var tokenName = 'var';

    if (node.attributes) {
      for (var i = 0; i < node.attributes.length; i++) {
        var attr = node.attributes[i];
        if (attr.value === '')
          tokenName = attr.name;
        else
          object[attr.name] = attr.value;
      }
    }

    object.value = object.value || node.innerHTML;
    tokenName = this.contextualize(tokenName, node.innerHTML);
    return "{" + tokenName + "}";
  },

  /**
   *
   * @param name
   * @returns {*}
   */
  getOption: function (name) {
    if (typeof this.options[name] === 'undefined' || this.options[name] === null) {
      return utils.hashValue(config.translator_options, name);
    }
    return this.options[name];
  },

  /**
   *
   * @param translation
   * @returns {string|*|XML|void}
   */
  debugTranslation: function (translation) {
    return this.getOption("debug_format").replace('{$0}', translation);
  },

  /**
   *
   * @param tml
   * @returns {boolean}
   */
  isEmptyString: function (tml) {
    //  console.log("TML Before: [" + tml + "]");
    tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
    //  console.log("TML After: [" + tml + "]");
    return (tml === '');
  },

  /**
   *
   */
  resetContext: function () {
    this.tokens = [].concat(this.context);
  },

  /**
   *
   * @param token
   * @param value
   * @returns {boolean}
   */
  isShortToken: function (token, value) {
    return (this.getOption("nodes.short").indexOf(token.toLowerCase()) !== -1 || value.length < 20);
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isOnlyChild: function (node) {
    if (!node.parentNode) return false;
    return (node.parentNode.childNodes.length === 1);
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  hasInlineOrTextSiblings: function (node) {
    if (!node.parentNode) return false;

    for (var i = 0; i < node.parentNode.childNodes.length; i++) {
      var child = node.parentNode.childNodes[i];
      if (child !== node) {
        if (this.isInlineNode(child) || this.isValidTextNode(child))
          return true;
      }
    }

    return false;
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isInlineNode: function (node) {
    return (
      node.nodeType === 1 &&
      this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) !== -1 &&
      !this.isOnlyChild(node)
    );
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isContainerNode: function (node) {
    return (node.nodeType === 1 && !this.isInlineNode(node));
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isSelfClosingNode: function (node) {
    return (!node.firstChild);
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isIgnoredNode: function (node) {
    if (node.nodeType != 1) return true;
    return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isValidTextNode: function (node) {
    if (!node) return false;
    return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
  },

  /**
   *
   * @param node
   * @returns {boolean}
   */
  isSeparatorNode: function (node) {
    if (!node) return false;
    return (node.nodeType === 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) !== -1);
  },

  /**
   *
   * @param value
   * @returns {string|*|XML|void}
   */
  sanitizeValue: function (value) {
    return value.replace(/^\s+/, '');
  },

  /**
   *
   * @param text
   * @returns {*}
   */
  replaceSpecialCharacters: function (text) {
    if (!this.getOption("data_tokens.special.enabled")) return text;

    var matches = text.match(this.getOption("data_tokens.special.regex"));
    var self = this;
    matches.forEach(function (match) {
      token = match.substring(1, match.length - 2);
      self.context[token] = match;
      text = text.replace(match, "{" + token + "}");
    });

    return text;
  },

  /**
   *
   * @param text
   * @returns {*|string|XML|void}
   */
  generateDataTokens: function (text) {
    var self = this;

    text = this.sanitizeValue(text);
    //console.log("Data Tokens: [[" + text + "]]");
    var tokenName = null;

    if (this.getOption("data_tokens.date.enabled")) {
      tokenName = self.getOption("data_tokens.date.name");
      var formats = self.getOption("data_tokens.date.formats");
      formats.forEach(function (format) {
        var regex = format[0];
        var date_format = format[1];

        var matches = text.match(regex);
        if (matches) {
          matches.forEach(function (match) {
            var date = match;
            //var date = self.localizeDate(match, date_format);
            var token = self.contextualize(tokenName, date);
            var replacement = "{" + token + "}";
            text = text.replace(match, replacement);
          });
        }
      });
    }

    var rules = this.getOption("data_tokens.rules");
    if (rules) {
      rules.forEach(function (rule) {
        if (rule.enabled) {
          var matches = text.match(rule.regex);
          if (matches) {
            matches.forEach(function (match) {
              var value = match.trim();
              if (value !== '') {
                var token = self.contextualize(rule.name, value);
                var replacement = match.replace(value, "{" + token + "}");
                text = text.replace(match, replacement);
              }
            });
          }
        }
      });
    }

    return text;
  },

  /**
   *
   * @param node
   * @param value
   * @returns {string}
   */
  generateHtmlToken: function (node, value) {
    var name = node.tagName.toLowerCase();
    var attributes = node.attributes;
    var attributesHash = {};
    value = (!value ? '{$0}' : value);

    if (attributes.length === 0) {
      if (this.isSelfClosingNode(node)) {
        if (name == "br" || name == "hr")
          return '<' + name + '/>';
        else
          return '<' + name + '>' + '</' + name + '>';
      }
      return '<' + name + '>' + value + '</' + name + '>';
    }

    for (var i = 0; i < attributes.length; i++) {
      attributesHash[attributes[i].name] = attributes[i].value;
    }

    var keys = utils.keys(attributesHash);
    keys.sort();

    var attr = [];
    keys.forEach(function (key) {
      var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
      attr.push(key + '=' + quote + attributesHash[key] + quote);
    });
    attr = attr.join(' ');

    if (this.isSelfClosingNode(node))
      return '<' + name + ' ' + attr + '>' + '</' + name + '>';

    return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
  },

  /**
   *
   * @param node
   * @returns {string}
   */
  adjustName: function (node) {
    var name = node.tagName.toLowerCase();
    var map = this.getOption("name_mapping");
    name = map[name] ? map[name] : name;
    return name;
  },

  /**
   *
   * @param name
   * @param context
   * @returns {*}
   */
  contextualize: function (name, context) {
    if (this.tokens[name] && this.tokens[name] != context) {
      var index = 0;
      var matches = name.match(/\d+$/);
      if (matches && matches.length > 0) {
        index = parseInt(matches[matches.length - 1]);
        name = name.replace("" + index, '');
      }
      name = name + (index + 1);
      return this.contextualize(name, context);
    }

    this.tokens[name] = context;
    return name;
  },

  /**
   *
   * @param doc
   */
  debug: function (doc) {
    this.doc = doc;
    this.debugTree(doc, 0);
  },

  /**
   *
   * @param node
   * @param depth
   */
  debugTree: function (node, depth) {
    var padding = new Array(depth + 1).join('=');

    console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

    if (node.childNodes) {
      var self = this;
      for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        self.debugTree(child, depth + 1);
      }
    }
  },

  /**
   *
   * @param node
   * @returns {string}
   */
  nodeInfo: function (node) {
    var info = [];
    info.push(node.nodeType);

    if (node.nodeType === 1)
      info.push(node.tagName);

    if (this.isInlineNode(node)) {
      info.push("inline");
      if (this.hasInlineOrTextSiblings(node))
        info.push("sentence");
      else
        info.push("only translatable");
    }

    if (this.isSelfClosingNode(node))
      info.push("self closing");

    if (this.isOnlyChild(node))
      info.push("only child");

    if (node.nodeType === 3)
      return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';

    return "[" + info.join(", ") + "]";
  }

};

module.exports = DomTokenizer;