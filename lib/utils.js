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

var md5 = require('./md5');

module.exports = {

  /**
   * hashValue
   *
   * @param {object} hash - hash to look for data
   * @param {string} key - dot separated nested key
   * @param {string} default_value - value to be returned if nothing is found
   */
  hashValue: function(hash, key, default_value) {
    default_value = default_value || null;
    var parts = key.split(".");
    for(var i=0; i<parts.length; i++) {
      var part = parts[i];
      if (typeof hash[part] === "undefined") return default_value;
      hash = hash[part];
    }
    return hash;
  },
  
  stripTags: function(input, allowed) {
    allowed = (((allowed || '') + '')
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '')
      .replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
  },

  escapeHtml: function(label) {
    return label
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  },

  sanitizeString: function(string) {
    if (!string) return "";
    return string.replace(/^\s+|\s+$/g,"");
  },

  splitSentences: function(text) {
    var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
    return text.match(sentenceRegex);
    //return this.stripTags(text).match(sentenceRegex);
  },
  
  unique: function(elements) {
    return elements.reverse().filter(function (e, i, arr) {
      return arr.indexOf(e, i+1) === -1;
    }).reverse();
  },
  
  clone: function(obj) {
    if(obj === null || typeof obj == 'undefined' || typeof(obj) != 'object')
      return obj;
  
    var temp = obj.constructor(); // changed
  
    for(var key in obj)
      temp[key] = clone(obj[key]);
    return temp;
  },
  
  keys: function(obj) {
  //  var keys = []; for (k in obj) {keys.push(k)}
  //  return keys;
    return Object.keys(obj);
  },

  swapKeys: function (obj) {
    var ret = {};
    for(var key in obj){
      ret[obj[key]] = key;
    }
    return ret;
  },

  generateSourceKey: function(label) {
    if (this.isFunction(label)){
      label = label();
    }
    return md5(label);
  },

  generateKey: function(label, description) {
    description = description || "";
    return md5(label + ";;;" + description);
  },

  escapeHTML: function(str) {
    return str.replace(/[&<>]/g, function(tag) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;'
      }[tag] || tag;
    });
  },

  encode: function(params) {
    if (!params) return null;
    var data = new Buffer(JSON.stringify(params), 'utf-8').toString('base64');
    return encodeURIComponent(data);
  },

  decode: function(data) {
    if (!data) return null;
    try {
      return JSON.parse(new Buffer(decodeURIComponent(data), 'base64').toString('utf-8'));
    } catch (err) {
      // for backwards compatibility - some SDKs were doing double encoding
      return JSON.parse(new Buffer(decodeURIComponent(decodeURIComponent(data)), 'base64').toString('utf-8'));
    }
  },

  normalizeSource: function(url) {
    var parts = url.split("?");
    return parts[0];
  },

  normalizeParams: function(label, description, tokens, options) {
    if (typeof label === "object") {
      return label;
    }

    if (typeof description !== "string") {
      options     = tokens || {};
      tokens      = description || {};
      description = '';
    }

    options = options || {};

    return {
      label: label,
      description: description,
      tokens: this.merge({}, tokens),
      options: this.merge({}, options)
    };
  },

  normalizePath: function(path) {
    return (path[0] == '/' ? '' : '/') + path;
  },

  assign: function(destination, source, deep) {  
    for (var key in source) {
      if (hasOwnProperty.call(source, key)) {
        if (deep && key in destination && typeof(destination[key]) == 'object' && typeof(source[key]) == 'object') {
          this.assign(destination[key], source[key], deep);
        } else {
          destination[key] = source[key];
        }
      }
    }
    return destination;
  },

  extend: function(destination) {
    for(var i=1; i<arguments.length; i++) {
      destination = this.assign(destination, arguments[i]);
    }
    return destination;
  },

  merge: function(destination) {
    for(var i=1; i<arguments.length; i++) {
      destination = this.assign(destination, arguments[i], true);
    }
    return destination;
  },

  addCSS: function(doc, value, inline) {
    var css = null;
    if (inline) {
      css = doc.createElement('style'); css.type = 'text/css';
      if (css.styleSheet) css.styleSheet.cssText = value;
      else css.appendChild(document.createTextNode(value));
    } else {
      css = doc.createElement('link'); css.setAttribute('type', 'text/css');
      css.setAttribute('rel', 'stylesheet'); css.setAttribute('media', 'screen');
      css.setAttribute('href', value);
    }
    doc.getElementsByTagName('head')[0].appendChild(css);
    return css;
  },

  addJS: function(doc, id, src, onload) {
    var script = doc.createElement('script');
    script.setAttribute('id', id); script.setAttribute('type', 'application/javascript');
    script.setAttribute('src', src);
    script.setAttribute('charset', 'UTF-8');
    if (onload) script.onload = onload;
    doc.getElementsByTagName('head')[0].appendChild(script);
    return script;
  },

  getCookieName: function(key) {
    return "trex_" + key;
  },

  getCookie: function(key) {
    var cname = this.getCookieName(key);
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length,c.length);
    }
    return "";
  },

  setCookie: function(key, data) {
    var cname = this.getCookieName(key);
    document.cookie = cname + "=" + data + "; path=/";
  },

  // Simple JavaScript Templating
  // John Resig - http://ejohn.org/ - MIT Licensed
  /* jshint ignore:start */
  templateCache: {},
  template: function(str, data) {
    var cache = this.templateCache;
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
      this.template(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

          // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
        + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  },
  /* jshint ignore:end */

  element: function(element_id) {
    if (typeof element_id == 'string') return document.getElementById(element_id);
    return element_id;
  },

  isNumber: function(str) {
    return str.search(/^\s*\d+\s*$/) != -1;
  },

  isArray: function(obj) {
    if (obj === null || typeof obj == 'undefined') return false;
    return (obj.constructor.toString().indexOf("Array") !== -1);
  },

  isObject: function(obj) {
    if (obj === null || typeof obj == 'undefined') return false;
    return (typeof obj == 'object');
  },

  isFunction: function(object) {
    return (typeof object === "function");
  },

  isString: function(obj) {
    return (typeof obj === 'string');
  },

  isURL: function(str) {
    str = "" + str;
    return (str.indexOf("http://") != -1) || (str.indexOf("https://") != -1);
  },

  toQueryParams: function (obj) {
    if (typeof obj == 'undefined' || obj === null) return "";
    if (typeof obj == 'string') return obj;

    var qs = [];
    for(var p in obj) {
      qs.push(p + "=" + encodeURIComponent(obj[p]));
    }
    return qs.join("&");
  },

  /**
   * Replaces values only in the range specified, leaving all other values as they are.
   *
   * For example:
   *
   * replaceBetween(6, 10, "I have 5 apples and 5 oranges.", "5", "9");
   *
   * will result in "I have 9 apples and 5 oranges."
   *
   * @param start
   * @param end
   * @param string
   * @param searchValue
   * @param replaceValue
   * @returns {*}
   */
  replaceBetween: function(string, start, end, replaceValue, searchValue) {
    var prefix = string.substring(0, start);
    var focus = string.substring(start, end);
    var suffix = string.substring(end);

    if (searchValue!=null)
      return  prefix + focus.replace(searchValue, replaceValue) + suffix;

    return  prefix + replaceValue + suffix;
  },

  /**
   * Use regular expression to extract matches from a string
   *
   * @param value
   * @param regex
   * @returns {Array}
   */
  extractMatches: function(value, regex) {
    var match, matches= [];
    while (match = regex.exec(value)) {
      var info = {
        start: match.index,
        end: match.index + match[0].length

      };
      info.value = value.substring(info.start, info.end);
      matches.push(info);
    }

    return matches;
  },

  parallel: function(funcs, callback) {
    var k,i,l=0,c=0,r={},e = null;
    var cb = function(k){
      funcs[k](function(err, data){
        if(err) return callback(err);
        if(data) r[k] = data;
        c++;
        if(c == l) {
          callback(null, r);
        }
      });
    };
    for(k in funcs) l++;
    if(!l) callback(null,r);
    for(k in funcs) {cb(k);}
  },

  localizeDate: function(date, format) {
    return date;
  }

};
