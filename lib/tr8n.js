
var Tr8n = {
  "Tokenizers": {
    "Tokens": {}
  },
  "Utils": {},
  "RulesEngine": {},
  "Decorators": {}
}
;
Tr8n.Utils.hashValue = function(hash, key, defaultValue) {
  defaultValue = defaultValue || null;
  var parts = key.split(".");
  for(var i=0; i<parts.length; i++) {
    var part = parts[i];
    if (typeof hash[part] === "undefined") return defaultValue;
    hash = hash[part];
  }
  return hash;
};

Tr8n.Utils.stripTags = function(input, allowed) {
  allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join('');   var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

Tr8n.Utils.splitSentences = function(text) {
  var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
  return Tr8n.Utils.stripTags(text).match(sentenceRegex);
};
;
Tr8n.Configuration = function() {
  this.initDefaultTokens();
  this.initTranslatorOptions();
};

Tr8n.Configuration.prototype.initDefaultTokens = function() {
  this.defaultTokens = {
      html : {
        data : {
          ndash  :  "&ndash;",                 mdash  :  "&mdash;",                 iexcl  :  "&iexcl;",                 iquest :  "&iquest;",                quot   :  "&quot;",                  ldquo  :  "&ldquo;",                 rdquo  :  "&rdquo;",                 lsquo  :  "&lsquo;",                 rsquo  :  "&rsquo;",                 laquo  :  "&laquo;",                 raquo  :  "&raquo;",                 nbsp   :  "&nbsp;",                  lsaquo :  "&lsaquo;",                rsaquo :  "&rsaquo;",                br     :  "<br/>",                   lbrace :  "{",
          rbrace :  "}",
          trade  :  "&trade;"               },
        decoration : {
          strong :  "<strong>{$0}</strong>",
          bold   :  "<strong>{$0}</strong>",
          b      :  "<strong>{$0}</strong>",
          em     :  "<em>{$0}</em>",
          italic :  "<i>{$0}</i>",
          i      :  "<i>{$0}</i>",
          link   :  "<a href='{$href}'>{$0}</a>",
          br     :  "<br>{$0}",
          strike :  "<strike>{$0}</strike>",
          div    :  "<div id='{$id}' class='{$class}' style='{$style}'>{$0}</div>",
          span   :  "<span id='{$id}' class='{$class}' style='{$style}'>{$0}</span>",
          h1     :  "<h1>{$0}</h1>",
          h2     :  "<h2>{$0}</h2>",
          h3     :  "<h3>{$0}</h3>"
        }
      },
      text : {
        data : {
          ndash  :  "–",
          mdash  :  "-",
          iexcl  :  "¡",
          iquest :  "¿",
          quot   :  '"',
          ldquo  :  "“",
          rdquo  :  "”",
          lsquo  :  "‘",
          rsquo  :  "’",
          laquo  :  "«",
          raquo  :  "»",
          nbsp   :  " ",
          lsaquo :  "‹",
          rsaquo :  "›",
          br     :  "\n",
          lbrace :  "{",
          rbrace :  "}",
          trade  :  "™"
        },
        decoration : {
          strong :  "{$0}",
          bold   :  "{$0}",
          b      :  "{$0}",
          em     :  "{$0}",
          italic :  "{$0}",
          i      :  "{$0}",
          link   :  "{$0}{$1}",
          br     :  "\n{$0}",
          strike :  "{$0}",
          div    :  "{$0}",
          span   :  "{$0}",
          h1     :  "{$0}",
          h2     :  "{$0}",
          h3     :  "{$0}"
        }
      }
    };

};

Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {
  type = type || "data"; format = format || "html";
  if (typeof this.defaultTokens[format][type][token] === 'undefined') return null;
  return new String(this.defaultTokens[format][type][token]);
};

Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  type = type || "data"; format = format || "html";
  this.defaultTokens[format] = this.defaultTokens[format] || {};
  this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};
  this.defaultTokens[format][type][token] = value;
};

Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  this.translatorOptions = {
    "debug": true,
    "debug_format_html": "<span style='font-size:20px;color:red;'>{<\/span> {$0} <span style='font-size:20px;color:red;'>}<\/span>",
    "debug_format": "{{{{$0}}}}",
    "split_sentences": false,
    "nodes": {
      "ignored":    [],
      "scripts":    ["style", "script"],
      "inline":     ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup"],
      "short":      ["i", "b"],
      "splitters":  ["br", "hr"]
    },
    "attributes": {
      "labels": ["title", "alt"]
    },
    "name_mapping": {
      "b": "bold",
      "i": "italic",
      "a": "link",
      "img": "picture"
    },
    "data_tokens": {
      "special": false,
      "numeric": false,
      "numeric_name": "num"
    }
  }
};

Tr8n.config = new Tr8n.Configuration();

;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  this.vars = {};
  this.ctx = ctx || {
    'label'   : function(l, r)    { this.vars[l] = this.ctx[l] = r; return r; }.bind(this),
    'quote'   : function(expr)    { return expr; }.bind(this),
    'car'     : function(list)    { return list[1]; }.bind(this),
    'cdr'     : function(list)    { list.shift(); return list; }.bind(this),
    'cons'    : function(e, cell) { cell.unshift(e); return cell; }.bind(this),
    'eq'      : function(l, r)    { return (l == r); }.bind(this),
    'atom':     function(a)       { return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ this.vars[l] = this.ctx[l] = r; return r; }.bind(this),

    '=':        function(args){ return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      for (var index = 0; index < args.length; ++index) {
        if (!this.evaluate(args[index])) return false;
      }
      return true;
    }.bind(this),
    'and':      function(args){ return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      for (var index = 0; index < args.length; ++index) {
        if (this.evaluate(args[index])) return true;
      }
      return false;
    }.bind(this),
    'or':      function(args){ return this.ctx['||'](args); }.bind(this)
  };
  return this;
}

Tr8n.RulesEngine.Evaluator.prototype = {
  apply: function(fn, args) {
    if (typeof this.ctx[fn] == 'function') {
      return this.ctx[fn](args);
    }
    return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    if (this.ctx['atom'](sexpr)) {
      return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    var fn = sexpr[0];
    var args = sexpr.slice(1);

    if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      args = args.map(function(arg) {
        return this.evaluate(arg);
      }.bind(this));
    }

    return this.apply(fn, args);
  }
}
;
Tr8n.RulesEngine.Parser = function(expression) {
  this.tokenize(expression);
}

Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	token = this.tokens.shift();
  	if (!token) return;
  	if (token == "(") return this.parseList();
  	if (token.match(/^['"].*/)) return token.slice(1, -1);
  	if (token.match(/\d+/)) return parseInt(token);
  	return String(token);
  },

  parseList: function() {
  	var list = [];
  	while (this.tokens.length > 0 && this.tokens[0] != ')')
  		list.push(this.parse());
  	this.tokens.shift();
  	return list;
  }
}
;var Tr8n = Tr8n || {};

Tr8n.DataTokenizer = function() {

}

Tr8n.DataTokenizer.prototype.doSomething = function() {

}
;
var RESERVED_TOKEN       = "tr8n";
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
var RE_SHORT_TOKEN_END   = "\\]";
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
var RE_TEXT              = "[^\\[\\]]+";
var TOKEN_TYPE_SHORT     = "short";
var TOKEN_TYPE_LONG      = "long";
var PLACEHOLDER          = "{$0}";

Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  this.context = context || {};
  this.opts = opts || {};
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  this.fragments = this.label.match(expression);
  return this.fragments;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  if (this.fragments.length == 0) return null;
  return this.fragments[0];
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  if (this.fragments.length == 0) return null;
  return this.fragments.shift();
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  var token = this.nextFragment();
  if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);
  if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);
  return token;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  var tree = [name];
  if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    this.tokens.push(name);

  if (type == TOKEN_TYPE_SHORT) {
    var first = true;
    while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      var value = this.parse();
      if (first && typeof value == "string") {
        value = value.replace(/^\s+/,'');
        first = false;
      }
      tree.push(value);
    }
  } else if (type == TOKEN_TYPE_LONG) {
    while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      tree.push(this.parse());
    }
  }

  this.nextFragment();
  return tree;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  if (defaultDecoration == null) return value;

  var decorationTokenValues = this.context[token];
  defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  if (decorationTokenValues instanceof Object) {
    Object.keys(decorationTokenValues).forEach(function (key) {
      defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  return defaultDecoration;
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  if (token == RESERVED_TOKEN) return value;
  if (!this.isTokenAllowed(token)) return value;

  var method = this.context[token];

  if (method != null) {
    if (typeof method === 'string')
      return method.replace(PLACEHOLDER, value);

    if (typeof method === 'function')
      return method(value);

    if (typeof method === 'object')
      return this.defaultDecoration(token, value);

    return value;
  }

  return this.defaultDecoration(token, value);
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  if (!(expr instanceof Array)) return expr;

  var token = expr[0];
  expr.shift();
  var self = this;
  var value = [];
  expr.forEach(function(obj, index) {
    value.push(self.evaluate(obj));
  });
  return this.apply(token, value.join(''));
};

Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  return this.evaluate(this.parse());
};
;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {
  this.doc = doc;
  this.context = context || {};
  this.tokens = [];
  this.options = options || {};
};

Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {
  return this.translateTree(this.doc);
};

Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {
  if (this.isNonTranslatableNode(node)) {
    if (node.childNodes.length == 1)
      return node.childNodes[0].nodeValue;
    return "";
  }

  if (node.nodeType == 3)
    return this.translateTml(node.nodeValue);

  var html = "";
  var buffer = "";

  for(var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes[i];


    if (child.nodeType == 3) {
      buffer = buffer + child.nodeValue;
    } else if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        buffer = buffer + this.generateTmlTags(child);
    } else if (this.isSeparatorNode(child)) {          if (buffer != "")
        html = html + this.translateTml(buffer);
      html = html + this.generateHtmlToken(child);
      buffer = "";
    } else {
      if (buffer != "")
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

  if (buffer != "") {
    html = html + this.translateTml(buffer);
  }

  return html;
};

Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {
  if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    return true;
  if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    return true;
  return false;
};

Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {
  if (this.isEmptyString(tml)) return tml;


  if (this.getOption("split_sentences")) {
    sentences = Tr8n.Utils.splitSentences(tml);
    translation = tml;
    var self = this;
    sentences.forEach(function(sentence) {
      var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      translation = translation.replace(sentence, sentenceTranslation);
    });
    this.resetContext();
    return translation;
  }

  translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  this.resetContext();
  return translation;
};

Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {
  if (!node.childNodes) return false;
  return (node.childNodes.length > 0);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {
  if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    return true;

  if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    return true;

  return false;
};

Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {
  var buffer = "";
  var self = this;
  for(var i=0; i<node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (child.nodeType == 3)                          buffer = buffer + child.nodeValue;
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
};

Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {
  if (this.options[name]) {
    return this.options[name];
  }
  return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);
};

Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {
  return this.getOption("debug_format").replace('{$0}', translation);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {
  tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  return (tml == '');
};

Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {
  this.debugTokens = this.tokens;
  this.tokens = [].concat(this.context);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {
  return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {
  if (node.parentNode == null) return false;
  return (node.parentNode.childNodes.length == 1);
};

Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {
  if (node.parentNode == null) return false;

  for (var i=0; i < node.parentNode.childNodes.length; i++) {
    var child = node.parentNode.childNodes[i];
    if (child != node) {
      if (this.isInlineNode(child) || this.isValidTextNode(child))
        return true;
    }
  }

  return false;
};

Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {
  return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {
  return (node.nodeType == 1 && !this.isInlineNode(node));
};

Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {
  return (node.firstChild == null);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {
  if (node.nodeType != 1) return true;
  return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {
  if (node == null) return false;
  return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {
  if (node == null) return false;
  return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {
  return value.replace(/^\s+/,'');
};

Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {
  if (!this.getOption("data_tokens.special")) return text;

  var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  var self = this;
  matches.forEach(function(match) {
    token = match.substring(1, match.length - 2);
    self.context[token] = match;
    text = text.replace(match, "{" + token + "}");
  });

  return text;
};

Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {
  if (!this.getOption("data_tokens.numeric")) return text;

  var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  var tokenName = this.getOption("data_tokens.numeric_name");

  var self = this;
  matches.forEach(function(match) {
    value = match.replace(/[,;]\s/, '');
    token = self.contextualize(tokenName, value);
    text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  return text;
};

Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {
  var name = node.tagName.toLowerCase();
  var attributes = node.attributes;
  var attributesHash = {};
  value = ((value == null) ? '{0}' : value);

  if (attributes.length == 0) {
    if (this.isSelfClosingNode(node))
      return '<' + name + '/>';
    return '<' + name + '>' + value + '</' + name + '>';
  }

  for(var i=0; i<attributes.length; i++) {
    attributesHash[attributes[i].name] = attributes[i].value;
  }

  var keys = Object.keys(attributesHash);
  keys.sort();

  var attr = [];
  keys.forEach(function(key) {
    var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  attr = attr.join(' ');

  if (this.isSelfClosingNode(node))
    return '<' + name + ' ' + attr + '/>';

  return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {
  var name = node.tagName.toLowerCase();
  var map = this.getOption("name_mapping");
  name = (map[name] != null) ? map[name] : name;
  return name;
};

Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {
  if (this.tokens[name] && this.tokens[name] != context) {
    var index = 0;
    var matches = name.match(/\d+$/);
    if (matches && matches.length > 0) {
      index = parseInt(matches[matches.length-1]);
      name = name.replace("" + index, '');
    }
    name = name + (index + 1);
    return this.contextualize(name, context);
  }

  this.tokens[name] = context;
  return name;
};

Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {
  this.doc = doc;
  this.debugTree(doc, 0);
};

Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {
  var padding = Array(depth+1).join('=');

  console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  if (node.childNodes) {
    var self = this;
    for(var i=0; i<node.childNodes.length; i++) {
      var child = node.childNodes[i];
      self.debugTree(child, depth+1);
    }
  }
};

Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {
  var info = [];
  info.push(node.nodeType);

  if (node.nodeType == 1)
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

  if (node.nodeType == 3)
    return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';

  return "[" + info.join(", ") + "]";
};
;;;;;;;;;;;;;;;;;;;var program = require('commander');

program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);



exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;


exports.configure = Tr8n.configure;
