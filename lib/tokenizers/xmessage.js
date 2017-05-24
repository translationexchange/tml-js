/**
 * Copyright (c) 2017 Translation Exchange, Inc.
 *
 * Original author: from Georg Puchta, LinkedIn.com
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
 * XMessage tokenizer
 *
 * @param label
 * @constructor
 */
var XMessageTokenizer = function (label, options) {
  this.label = label;
  this.pos = 0;
  this.len = label ? label.length : 0;
  this.last = null;
  this.options = options || {};
  this.tokenize();
};

XMessageTokenizer.prototype = {

  /**
   * Expression cache
   */
  cache: {},

  /**
   *
   */
  optionalStyleFormatTypes: {
    'text': true,
    'date': true,
    'time': true,
    'number': true,
    'name': true,
    'list': true,
    'possessive': true,
    'salutation': true
  },

  /**
   *
   */
  updateLast: function () {
    this.last = this.pos > 0 ? this.label.charAt(this.pos - 1) : null;
  },

  /**
   *
   * @returns {*}
   */
  next: function () {
    if (this.len === 0 || this.pos >= this.len) {
      return null;
    }
    this.updateLast();
    return this.label.charAt(this.pos++);
  },

  /**
   *
   * @returns {*}
   */
  peek: function () {
    if (this.len === 0) {
      return null;
    }
    return this.label.charAt(this.pos);
  },

  /**
   *
   */
  revert: function () {
    if (this.pos > 0) {
      this.pos--;
      this.updateLast();
    }
  },

  /**
   *
   * @returns {null|*|boolean}
   */
  isEscaped: function () {
    return this.last && this.last == '\\';
  },

  /**
   *
   * @param result
   * @param c
   * @param argumentIndex
   * @param formatType
   */
  noFormatStyle: function (result, c, argumentIndex, formatType) {
    throw "no format style allowed for format type '" + formatType + "'";
  },

  /**
   *
   * @param result
   * @param c
   * @param argumentIndex
   * @param formatType
   */
  collectionFormatStyle: function (result, c, argumentIndex, formatType) {
    // register the format element
    var styles = [];
    var subtype = 'text'; // default

    if (c == ',') {
      // we have a sub-type
      subtype = '';
      c = this.next();
      while (c && ',}'.indexOf(c) == -1) {
        subtype += c;
        c = this.next();
        if (c == null) {
          throw "expected ',' or '}', but found end of string";
        }
      }
    }

    result.push({index: argumentIndex, type: formatType, subtype: subtype, styles: styles});

    if (c == '}') {
      return;
    }

    // parse format style
    while (c) {
      c = this.next();
      if (c == null) {
        throw "expected '}', '|' or format style value, but found end of string";
      }

      if (c == '}' && !this.isEscaped()) {
        return;
      }
      else if (c == '|') {
        continue;
      }

      var styleKey = '';
      while (c && '#<|}'.indexOf(c) == -1) {
        styleKey += c;
        c = this.next();
        if (c == null) {
          throw "expected '#', '<' or '|', but found end of string";
        }
      }
      if (c == '<')
        styleKey += c;

      var items = [];
      styles.push({key: styleKey, items: items});

      if ('#<'.indexOf(c) > -1) {
        this.traverseText(items);
      }
      else if ('|}'.indexOf(c) > -1) {
        // we found a key without value e.g. {0,param,possessive} and {0,param,prefix#.|possessive}
        this.revert();
      }
    }
  },

  /**
   *
   * @param result
   * @param c
   * @param argumentIndex
   * @param formatType
   */
  textFormatStyle: function (result, c, argumentIndex, formatType) {
    // parse format style
    var buffer = '';
    c = this.next();
    if (c == null) {
      throw "expected format style or '}', but found end of string";
    }
    while (c) {
      if (c == '}') {
        result.push({index: argumentIndex, type: formatType, value: buffer});
        return;
      }

      // keep adding to buffer
      buffer += c;
      c = this.next();
      if (c == null) {
        throw "expected '}', but found end of string";
      }
    }
  },

  /**
   *
   * @param result
   * @param c
   * @param argumentIndex
   * @param formatType
   */
  defaultFormatStyle: function (result, c, argumentIndex, formatType) {
    // register the format element
    var styles = [];
    result.push({index: argumentIndex, type: formatType, styles: styles});
    // parse format style
    while (c) {
      c = this.next();
      if (c == null) {
        throw "expected '}', '|' or format style value, but found end of string";
      }

      if (c == '}' && !this.isEscaped()) {
        return;
      }
      else if (c == '|') {
        continue;
      }

      var styleKey = '';
      while (c && '#<+|}'.indexOf(c) == -1) {
        styleKey += c;
        c = this.next();
        if (c == null) {
          throw "expected '#', '<', '+' or '|', but found end of string";
        }
      }
      if (c == '<' || c == '+')
        styleKey += c;

      var items = [];
      styles.push({key: styleKey, items: items});

      if ('#<+'.indexOf(c) > -1) {
        this.traverseText(items);
      }
      else if ('|}'.indexOf(c) > -1) {
        // we found a key without value e.g. {0,param,possessive} and {0,param,prefix#.|possessive}
        this.revert();
      }
    }
  },

  /**
   *
   * @param result
   */
  traverseFormatElement: function (result) {
    var argumentIndex = -1;
    var formatType = null;
    var formatStyle = null;
    var c = this.next();

    if (c == null) {
      throw "expected place holder index, but found end of string";
    }

    if (/[\d:]/.test(c)) {
      // process argument index
      var isKeyword = c == ':';
      var index = '';
      while (c && ',}'.indexOf(c) == -1) {
        index += c;
        c = this.next();
        if (c == null) {
          throw "expected ',' or '}', but found end of string";
        }
      }
      if (!isKeyword && !/\d+/.test(index))
        throw "argument index must be numeric: " + index;

      argumentIndex = isKeyword ? index : index * 1;
    }

    if (c != '}') {
      // process format type
      formatType = '';
      c = this.next();
      if (c == null) {
        throw "expected format type, but found end of string";
      }
      while (c && ',}'.indexOf(c) == -1 && !this.isEscaped()) {
        formatType += c;
        c = this.next();
        if (c == null) {
          throw "expected ',' or '}', but found end of string";
        }
      }
    }

    if (c == '}' && !this.isEscaped()) {
      if (formatType && this.optionalStyleFormatTypes[formatType]) {
        // we found {0,number} or {0,possessive} or {0,salutation}, which are valid expressions
        result.push({type: formatType, index: argumentIndex});
      }
      else {
        if (formatType) {
          // we found something like {0,<type>}, which is
          // invalid.
          throw "expected format style for format type '" + formatType + "'";
        }

        // push param format element
        result.push({type: 'param', index: argumentIndex});
      }
    }
    else if (c == ',') {
      var processors = {
        list: this.collectionFormatStyle,
        date: this.textFormatStyle,
        time: this.textFormatStyle,
        number: this.textFormatStyle,
        suffix: this.textFormatStyle,
        possessive: this.noFormatStyle,
        salutation: this.noFormatStyle,
        default: this.defaultFormatStyle
      };
      var processor = (processors[formatType] || processors.default).bind(this);
      processor(result, c, argumentIndex, formatType);
    }
    else {
      throw "expected ',' or '}', but found '" + c + "' at position " + this.pos();
    }
  },

  /**
   *
   * @param result
   * @returns {*}
   */
  traverseText: function (result) {
    var inQuotedString = false;
    var buffer = "";
    var c = this.next();
    while (c) {
      if (c == "'") {
        inQuotedString = !inQuotedString;
      }
      if (!inQuotedString && c == '{' && !this.isEscaped()) {
        if (buffer.length > 0) {
          result.push({type: 'trans', value: buffer});
          buffer = "";
        }
        this.traverseFormatElement(result);
      }
      else if (!inQuotedString && (c == '|' || c == '}') && !this.isEscaped()) {
        this.revert();
        break;
      }
      else {
        buffer += c;
      }
      c = this.next();
    }
    if (buffer.length > 0) {
      result.push({type: 'trans', value: buffer});
      buffer = "";
    }
    return result;
  },

  /**
   *
   */
  tokenize: function () {
    var result = [];
    try {
      this.traverseText(result);
      this.tree = result;
    } catch (ex) {
      console.log("Failed to parse the expression: " + this.label);
      this.tree = null;
    }
  },

  /**
   *
   * @param language
   * @param val
   * @returns {*}
   */

  choice: function (language, val) {
    if (language.locale == 'en')
      if (typeof val == 'number')
        return (val == 1) ? 'singular' : 'plural';

    if (language.locale == 'ru' && typeof val == 'number') {
      var ctx = language.getContextByKeyword('number');
      if (ctx) {
        var rule = ctx.findMatchingRule(val);
        if (rule) return rule.keyword;
      }
    }

    return 'other';
  },

  /**
   *
   * @param language
   * @param exp
   * @param buffer
   * @param params
   * @returns {*}
   */
  compile: function (language, exp, buffer, params) {
    var self = this;
    var style = null;
    exp.forEach(function (el) {
      var tokenValue = self.getTokenValue(params, el.index);

      if (el.styles) {
        if (el.type == 'choice') {
          var key = self.choice(language, tokenValue);
          style = el.styles.find(function (style) {
            return (style.key == key);
          });
          if (style) {
            self.compile(language, style.items, buffer, params);
          }
        } else if (el.type == 'map') {
          style = el.styles.find(function (style) {
            return (style.key == tokenValue);
          });
          self.compile(language, style.items, buffer, params);
        } else if (el.type == 'anchor') {
          buffer.push("<a href='" + tokenValue + "'>");
          self.compile(language, el.styles[0].items, buffer, params);
          buffer.push('</a>');
        } else {
          self.compile(language, el.styles[0].items, buffer, params);
        }
      } else {
        var val;
        if (el.type == 'param') {
          val = tokenValue;
        } else if (el.type == 'number') {
          val = Number(tokenValue);
        } else {
          val = el.value;
        }
        buffer.push(val);
      }
    });
    return buffer;
  },

  /**
   *
   * @param params
   * @param key
   * @returns {*}
   */
  getTokenValue: function(params, key) {
    if (typeof key == "string")
      key = key.replace(/^:/, '');
    return params[key];
  },

  /**
   *
   * @param language
   * @param tokens
   * @param options
   * @returns {*}
   */
  substitute: function (language, tokens, options) {
    if (!this.tree) return this.label;
    return this
      .compile(language, this.tree, [], tokens)
      .join('');
  }

};

module.exports = XMessageTokenizer;