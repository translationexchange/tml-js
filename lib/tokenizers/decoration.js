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
var config          = require('../configuration');

var RESERVED_TOKEN       = "tml";
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";                      // [link:
var RE_SHORT_TOKEN_END   = "\\]";                             // ]
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";                    // [link]
var RE_LONG_TOKEN_END    = "\\[\\/\\s*([\\w]*)\\s*\\]";         // [/link]
var RE_HTML_TOKEN_START  = "<[^\\/][^\\>]*>";                       // <link>
var RE_HTML_TOKEN_END    = "<\\/\\s*([^\\>]*)\\s*>";            // </link>
var RE_TEXT              = "(?=[\\[\\]<>]).+?(?=[\\[\\]<>])|[^\\[\\]<>]+";                    // anything that is left

var TOKEN_TYPE_SHORT     = "short";
var TOKEN_TYPE_LONG      = "long";
var TOKEN_TYPE_HTML      = "html";
var PLACEHOLDER          = "{$0}";

var DecorationTokenizer = function(label) {
  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};
var ___debug = 0;
DecorationTokenizer.prototype = {

  tokenize: function() {
    var expression = [
      RE_SHORT_TOKEN_START,
      RE_SHORT_TOKEN_END,
      RE_LONG_TOKEN_START,
      RE_LONG_TOKEN_END,
      RE_HTML_TOKEN_START,
      RE_HTML_TOKEN_END,
      RE_TEXT
    ].join("|");
    expression = new RegExp(expression, "g");
    this.fragments = this.label.match(expression);
    return this.fragments;
  },

  peek: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments[0];
  },

  getNextFragment: function() {
    if (this.fragments.length === 0) return null;
    return this.fragments.shift();
  },

  parse: function(parentNode) {
    var token = this.getNextFragment(), name;
    //console.log('parsing %s', token);

    if (token.match(new RegExp(RE_SHORT_TOKEN_START))) {
      name = token.replace(/[\[:]/g, '');
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_SHORT, parentNode, token);
    } else if (token.match(new RegExp(RE_LONG_TOKEN_START))) {
      name = token.replace(/[\[\]]/g, '');
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_LONG, parentNode, token);
    } else if (token.match(new RegExp(RE_HTML_TOKEN_START))) {
      if (token.indexOf("/>") != -1) return token;
      name = token.replace(/[<>]/g, '').split(' ')[0];
      if (!name) return token;
      return this.parseTree(name, TOKEN_TYPE_HTML, parentNode, token);
    }
    return token;
  },

  parseTree: function(name, type, parentNode, origToken) {
    var tree = [name];
    ___debug > 2 && console.log('working on %s (%s)', name, type);
    var endTag, endMatch;
    utils.assignPrivate(tree, "tokenType", type);
    utils.assignPrivate(tree, "fullToken", type + '.' + name);
    utils.assignPrivate(tree, "parentNode", parentNode);
    utils.assignPrivate(tree, "origToken", origToken);

    var haveShortParents = false;
    var tempParent = parentNode;
    while (tempParent) {
      if (tempParent.tokenType === 'short') {
        haveShortParents = true;
        break;
      }
      tempParent = tempParent.parentNode;
    }
     
    if (type === TOKEN_TYPE_HTML) {
      endTag = new RegExp("<\\/\\s*" + name + "\\s*>");
    }
    else if (type === TOKEN_TYPE_LONG) {
      endTag = new RegExp("\\[\\/\\s*" + name + "\\s*\\]");
    }
    else if (type === TOKEN_TYPE_SHORT) {
      endTag = new RegExp(RE_SHORT_TOKEN_END);
    }
    
    var getTagType = function (fragment, preferredPattern) {
      var match;
      if (!fragment) 
        return;
      
      if (preferredPattern && (match = fragment.match(preferredPattern))) {
        ___debug > 3 && console.log('found expected pattern: ', match);
        return {match: match, type: 'preferred'};
      }
      var defaultMatches = Object.keys(this.metadata);
      for (var i = 0; i < defaultMatches.length; i++) {
        var tokenType = defaultMatches[i];
        //short matches opening tags like [link] and whatnot, can't use it to detect unclosed tags
        if (tokenType === 'short' && !haveShortParents) {
          continue; 
        } 
        
        var closer = this.metadata[tokenType].endRegex;
        if (!closer) {
          this.metadata[tokenType].endRegex = new RegExp(this.metadata[tokenType].end);
          closer = this.metadata[tokenType].endRegex;
        }
        if ((match = fragment.match(closer))) {
          return {match: match, type: tokenType };
        }
      }
    }.bind(this);
    
    var matchAnyEnd = function (pattern) {
      var current = this.peek();
      ___debug > 3 && console.log('checking %s', current);
      var tag = getTagType(current, pattern || endTag);
      if (tag) {
        //console.log('matched end %s', tag.type, tag.match[1]);
        if (tag.type == 'preferred') {
          return tag.match;
        }
        else {
          var parent = tree.parentNode;
          while (parent) {
            var fullName = tag.type + '.' + tag.match[1]; //doesn't work with short!
            var matchedParent = tag.type !== 'short' ? fullName === parent.fullToken : parent.tokenType === 'short';  
            
            if (matchedParent) {
              var err = new Error('Matched parent close "' + fullName + '"');
              err.fullToken = tag.match[1] ? fullName : parent.fullToken;
              err.errTree = tree;
              err.errTree[0] = tree.origToken;
              throw err;
            }
            parent = parent.parentNode;
          }

          ___debug > 4 && console.log('found close but have not open %s', tag.match[0]);
        }
      }
    }.bind(this);
    
    var addTreeToTree = function(target, tree) {
      target.push.apply(target, tree);
    };
    
    if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
      this.tokens.push(name);
    var endMatched = false;
    var hadError;
    try {
      if (type == TOKEN_TYPE_SHORT) {
        //debugger;
        var first = true;
        while (this.peek()!==null && !(endMatch = matchAnyEnd(/^\]$/))) {
          var value = this.parse(tree);
          if (first && typeof value == "string") {
            first = false;
            value = value.replace(/^\s+/,'');
          }
          tree.push(value);
        }
        if (endMatch) endMatched = true;
      } 
      else {
        while (this.peek()!==null && !(endMatch = matchAnyEnd())) {
          tree.push(this.parse(tree));
        }
        if (endMatch) endMatched = true;
      }
    }
    catch(err) {
      hadError = err;
      //catch up to the right fragment
      if (err.fullToken === tree.fullToken && tree !== err.errTree) {
        ___debug > 0 && console.log('could not find end of %s, embedding into: %s', err.errTree.origToken, tree.origToken);
        addTreeToTree(tree, err.errTree);
      }
      else {
        ___debug > 0 && console.log('did not find end of %s, propagating error in %s', err.errTree.origToken, tree.origToken, err.fullToken);
        if (err.errTree !== tree) {
          addTreeToTree(tree, err.errTree);
        }
        err.errTree = tree;
        throw err;
      }
    }
    if (!endMatched) {
      ___debug > 1 && console.log('at end without match', tree.origToken, hadError);
      return tree;
    }
    if (___debug > 0)
      console.log('eating', this.getNextFragment());
    else
      this.getNextFragment();
    
    return tree;
  },

  isTokenAllowed: function(token) {
    return (!this.options.allowed_tokens || this.options.allowed_tokens.indexOf(token) != -1);
  },

  getDefaultDecoration: function(token, value) {
    var default_decoration = config.getDefaultToken(token, "decoration");

    // need to think a bit more about this
    if (default_decoration === null) {
      return "<" + token + ">" + value + "</" + token + ">";
    }

    var decoration_token_values = this.context[token];
    default_decoration = default_decoration.replace(PLACEHOLDER, value);

    if (utils.isObject(decoration_token_values)) {
      var keys = utils.keys(decoration_token_values);
      for (var i = 0; i < keys.length; i++) {
        default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);
      }
      default_decoration = default_decoration.replace(/[\w]*=['"]\{\$[^\}]*\}['"]/g, "").replace(/\s*>/, '>').trim();
    }

    return default_decoration;
  },

  apply: function(token, value) {
    if (token == RESERVED_TOKEN) return value;
    if (!this.isTokenAllowed(token)) return value;

    var method = this.context[token];

    if (!!method) {
      if (typeof method === 'string')
        return method.replace(PLACEHOLDER, value);

      if (typeof method === 'function')
        return method(value);

      if (typeof method === 'object')
        return this.getDefaultDecoration(token, value);

      return value;
    }

    return this.getDefaultDecoration(token, value);
  },

  evaluate: function(expr) {
    if (!(expr instanceof Array)) return expr;

    var token = expr[0];
    expr.shift();
    var self = this;
    var value = [];
    for (var i=0; i<expr.length; i++) {
      value.push(self.evaluate(expr[i]));
    }
    return this.apply(token, value.join(''));
  },

  substitute: function(tokens, options) {
    this.context = tokens || {};
    this.options = options || {};

    // fix broken HTML tags
    var result = this.evaluate(this.parse());
    result = result.replace('[/tml]', '');
    return result;
  },
  metadata: {
    short: {
      start: RE_SHORT_TOKEN_START,
      end: RE_SHORT_TOKEN_END
    },
    long: {
      start: RE_LONG_TOKEN_START, 
      end: RE_LONG_TOKEN_END
    },
    html: {
      start: RE_HTML_TOKEN_START,
      end: RE_HTML_TOKEN_END 
    }
  }
};


module.exports = DecorationTokenizer;