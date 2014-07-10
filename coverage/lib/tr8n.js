if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/tr8n.js'] === 'undefined'){_$jscoverage['lib/tr8n.js']=[];
_$jscoverage['lib/tr8n.js'].source=['',
'var Tr8n = {',
'  "Tokenizers": {',
'    "Tokens": {}',
'  },',
'  "Utils": {},',
'  "RulesEngine": {},',
'  "Decorators": {}',
'}',
';',
'Tr8n.Utils.hashValue = function(hash, key, defaultValue) {',
'  defaultValue = defaultValue || null;',
'  var parts = key.split(".");',
'  for(var i=0; i<parts.length; i++) {',
'    var part = parts[i];',
'    if (typeof hash[part] === "undefined") return defaultValue;',
'    hash = hash[part];',
'  }',
'  return hash;',
'};',
'',
'Tr8n.Utils.stripTags = function(input, allowed) {',
'  allowed = (((allowed || \'\') + \'\')',
'    .toLowerCase()',
'    .match(/<[a-z][a-z0-9]*>/g) || [])',
'    .join(\'\');   var tags = /<\\/?([a-z][a-z0-9]*)\\b[^>]*>/gi,',
'    commentsAndPhpTags = /<!--[\\s\\S]*?-->|<\\?(?:php)?[\\s\\S]*?\\?>/gi;',
'  return input.replace(commentsAndPhpTags, \'\')',
'    .replace(tags, function($0, $1) {',
'      return allowed.indexOf(\'<\' + $1.toLowerCase() + \'>\') > -1 ? $0 : \'\';',
'    });',
'};',
'',
'Tr8n.Utils.splitSentences = function(text) {',
'  var sentenceRegex = /[^.!?\\s][^.!?]*(?:[.!?](?![\\\'"]?\\s|$)[^.!?]*)*[.!?]?[\\\'"]?(?=\\s|$)/g;',
'  return Tr8n.Utils.stripTags(text).match(sentenceRegex);',
'};',
';',
'Tr8n.Configuration = function() {',
'  this.initDefaultTokens();',
'  this.initTranslatorOptions();',
'};',
'',
'Tr8n.Configuration.prototype.initDefaultTokens = function() {',
'  this.defaultTokens = {',
'      html : {',
'        data : {',
'          ndash  :  "&ndash;",                 mdash  :  "&mdash;",                 iexcl  :  "&iexcl;",                 iquest :  "&iquest;",                quot   :  "&quot;",                  ldquo  :  "&ldquo;",                 rdquo  :  "&rdquo;",                 lsquo  :  "&lsquo;",                 rsquo  :  "&rsquo;",                 laquo  :  "&laquo;",                 raquo  :  "&raquo;",                 nbsp   :  "&nbsp;",                  lsaquo :  "&lsaquo;",                rsaquo :  "&rsaquo;",                br     :  "<br/>",                   lbrace :  "{",',
'          rbrace :  "}",',
'          trade  :  "&trade;"               },',
'        decoration : {',
'          strong :  "<strong>{$0}</strong>",',
'          bold   :  "<strong>{$0}</strong>",',
'          b      :  "<strong>{$0}</strong>",',
'          em     :  "<em>{$0}</em>",',
'          italic :  "<i>{$0}</i>",',
'          i      :  "<i>{$0}</i>",',
'          link   :  "<a href=\'{$href}\'>{$0}</a>",',
'          br     :  "<br>{$0}",',
'          strike :  "<strike>{$0}</strike>",',
'          div    :  "<div id=\'{$id}\' class=\'{$class}\' style=\'{$style}\'>{$0}</div>",',
'          span   :  "<span id=\'{$id}\' class=\'{$class}\' style=\'{$style}\'>{$0}</span>",',
'          h1     :  "<h1>{$0}</h1>",',
'          h2     :  "<h2>{$0}</h2>",',
'          h3     :  "<h3>{$0}</h3>"',
'        }',
'      },',
'      text : {',
'        data : {',
'          ndash  :  "–",',
'          mdash  :  "-",',
'          iexcl  :  "¡",',
'          iquest :  "¿",',
'          quot   :  \'"\',',
'          ldquo  :  "“",',
'          rdquo  :  "”",',
'          lsquo  :  "‘",',
'          rsquo  :  "’",',
'          laquo  :  "«",',
'          raquo  :  "»",',
'          nbsp   :  " ",',
'          lsaquo :  "‹",',
'          rsaquo :  "›",',
'          br     :  "\\n",',
'          lbrace :  "{",',
'          rbrace :  "}",',
'          trade  :  "™"',
'        },',
'        decoration : {',
'          strong :  "{$0}",',
'          bold   :  "{$0}",',
'          b      :  "{$0}",',
'          em     :  "{$0}",',
'          italic :  "{$0}",',
'          i      :  "{$0}",',
'          link   :  "{$0}{$1}",',
'          br     :  "\\n{$0}",',
'          strike :  "{$0}",',
'          div    :  "{$0}",',
'          span   :  "{$0}",',
'          h1     :  "{$0}",',
'          h2     :  "{$0}",',
'          h3     :  "{$0}"',
'        }',
'      }',
'    };',
'',
'};',
'',
'Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {',
'  type = type || "data"; format = format || "html";',
'  if (typeof this.defaultTokens[format][type][token] === \'undefined\') return null;',
'  return new String(this.defaultTokens[format][type][token]);',
'};',
'',
'Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {',
'  type = type || "data"; format = format || "html";',
'  this.defaultTokens[format] = this.defaultTokens[format] || {};',
'  this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};',
'  this.defaultTokens[format][type][token] = value;',
'};',
'',
'Tr8n.Configuration.prototype.initTranslatorOptions = function() {',
'  this.translatorOptions = {',
'    "debug": true,',
'    "debug_format_html": "<span style=\'font-size:20px;color:red;\'>{<\\/span> {$0} <span style=\'font-size:20px;color:red;\'>}<\\/span>",',
'    "debug_format": "{{{{$0}}}}",',
'    "split_sentences": false,',
'    "nodes": {',
'      "ignored":    [],',
'      "scripts":    ["style", "script"],',
'      "inline":     ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup"],',
'      "short":      ["i", "b"],',
'      "splitters":  ["br", "hr"]',
'    },',
'    "attributes": {',
'      "labels": ["title", "alt"]',
'    },',
'    "name_mapping": {',
'      "b": "bold",',
'      "i": "italic",',
'      "a": "link",',
'      "img": "picture"',
'    },',
'    "data_tokens": {',
'      "special": false,',
'      "numeric": false,',
'      "numeric_name": "num"',
'    }',
'  }',
'};',
'',
'Tr8n.config = new Tr8n.Configuration();',
'',
';',
'Tr8n.RulesEngine.Evaluator = function(ctx) {',
'  this.vars = {};',
'  this.ctx = ctx || {',
'    \'label\'   : function(l, r)    { this.vars[l] = this.ctx[l] = r; return r; }.bind(this),',
'    \'quote\'   : function(expr)    { return expr; }.bind(this),',
'    \'car\'     : function(list)    { return list[1]; }.bind(this),',
'    \'cdr\'     : function(list)    { list.shift(); return list; }.bind(this),',
'    \'cons\'    : function(e, cell) { cell.unshift(e); return cell; }.bind(this),',
'    \'eq\'      : function(l, r)    { return (l == r); }.bind(this),',
'    \'atom\':     function(a)       { return !(typeof a in {\'object\':1, \'array\':1, \'function\':1}); }.bind(this),',
'    \'cond\'    : function(c, t, f) { return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),',
'  ',
'    \'set\':      function(l, r){ this.vars[l] = this.ctx[l] = r; return r; }.bind(this),',
'',
'    \'=\':        function(args){ return (args[0] == args[1]); }.bind(this),',
'    \'!=\':       function(args){ return (args[0] != args[1]); }.bind(this),',
'    \'<\':        function(args){ return (args[0] < args[1]); }.bind(this),',
'    \'>\':        function(args){ return (args[0] > args[1]); }.bind(this),',
'    \'+\':        function(args){ return (args[0] + args[1]); }.bind(this),',
'    \'-\':        function(args){ return (args[0] - args[1]); }.bind(this),',
'    \'*\':        function(args){ return (args[0] * args[1]); }.bind(this),',
'    \'/\':        function(args){ return (args[0] / args[1]); }.bind(this),',
'    \'!\':        function(args){ return (("" + args) == "true" ? false : true); }.bind(this),',
'    \'not\':      function(args){ return this.ctx[\'!\'](args); }.bind(this),',
'    \'&&\':       function(args){',
'      for (var index = 0; index < args.length; ++index) {',
'        if (!this.evaluate(args[index])) return false;',
'      }',
'      return true;',
'    }.bind(this),',
'    \'and\':      function(args){ return this.ctx[\'&&\'](args); }.bind(this),',
'    \'||\':       function(args){',
'      for (var index = 0; index < args.length; ++index) {',
'        if (this.evaluate(args[index])) return true;',
'      }',
'      return false;',
'    }.bind(this),',
'    \'or\':      function(args){ return this.ctx[\'||\'](args); }.bind(this)',
'  };',
'  return this;',
'}',
'',
'Tr8n.RulesEngine.Evaluator.prototype = {',
'  apply: function(fn, args) {',
'    if (typeof this.ctx[fn] == \'function\') {',
'      return this.ctx[fn](args);',
'    }',
'    return this.ctx[fn];',
'  },',
'',
'  evaluate: function(sexpr) {',
'    if (this.ctx[\'atom\'](sexpr)) {',
'      return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);',
'    }',
'',
'    var fn = sexpr[0];',
'    var args = sexpr.slice(1);',
'',
'    if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {',
'      args = args.map(function(arg) {',
'        return this.evaluate(arg);',
'      }.bind(this));',
'    }',
'',
'    return this.apply(fn, args);',
'  }',
'}',
';',
'Tr8n.RulesEngine.Parser = function(expression) {',
'  this.tokenize(expression);',
'}',
'',
'Tr8n.RulesEngine.Parser.prototype = {',
'  tokenize: function(expression) {',
'	  this.tokens = expression.match(/[()]|\\w+|@\\w+|[\\+\\-\\!\\|\\=>&<\\*\\/%]+|\\".*?\\"|\'.*?\'/g);',
'  },',
'',
'  parse: function() {',
'  	token = this.tokens.shift();',
'  	if (!token) return;',
'  	if (token == "(") return this.parseList();',
'  	if (token.match(/^[\'"].*/)) return token.slice(1, -1);',
'  	if (token.match(/\\d+/)) return parseInt(token);',
'  	return String(token);',
'  },',
'',
'  parseList: function() {',
'  	var list = [];',
'  	while (this.tokens.length > 0 && this.tokens[0] != \')\')',
'  		list.push(this.parse());',
'  	this.tokens.shift();',
'  	return list;',
'  }',
'}',
';var Tr8n = Tr8n || {};',
'',
'Tr8n.DataTokenizer = function() {',
'',
'}',
'',
'Tr8n.DataTokenizer.prototype.doSomething = function() {',
'',
'}',
';',
'var RESERVED_TOKEN       = "tr8n";',
'var RE_SHORT_TOKEN_START = "\\\\[[\\\\w]*:";',
'var RE_SHORT_TOKEN_END   = "\\\\]";',
'var RE_LONG_TOKEN_START  = "\\\\[[\\\\w]*\\\\]";',
'var RE_LONG_TOKEN_END    = "\\\\[\\\\/[\\\\w]*\\\\]";',
'var RE_TEXT              = "[^\\\\[\\\\]]+";',
'var TOKEN_TYPE_SHORT     = "short";',
'var TOKEN_TYPE_LONG      = "long";',
'var PLACEHOLDER          = "{$0}";',
'',
'Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {',
'  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";',
'  this.context = context || {};',
'  this.opts = opts || {};',
'  this.fragments = [];',
'  this.tokens = [];',
'  this.tokenize();',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {',
'  var expression = new RegExp([',
'    RE_SHORT_TOKEN_START,',
'    RE_SHORT_TOKEN_END,',
'    RE_LONG_TOKEN_START,',
'    RE_LONG_TOKEN_END,',
'    RE_TEXT',
'  ].join("|"), "g");',
'',
'  this.fragments = this.label.match(expression);',
'  return this.fragments;',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {',
'  if (this.fragments.length == 0) return null;',
'  return this.fragments[0];',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {',
'  if (this.fragments.length == 0) return null;',
'  return this.fragments.shift();',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {',
'  var token = this.nextFragment();',
'  if (token.match(new RegExp(RE_SHORT_TOKEN_START)))',
'    return this.parseTree(token.replace(/[\\[:]/g, \'\'), TOKEN_TYPE_SHORT);',
'  if (token.match(new RegExp(RE_LONG_TOKEN_START)))',
'    return this.parseTree(token.replace(/[\\[\\]]/g, \'\'), TOKEN_TYPE_LONG);',
'  return token;',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {',
'  var tree = [name];',
'  if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)',
'    this.tokens.push(name);',
'',
'  if (type == TOKEN_TYPE_SHORT) {',
'    var first = true;',
'    while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {',
'      var value = this.parse();',
'      if (first && typeof value == "string") {',
'        value = value.replace(/^\\s+/,\'\');',
'        first = false;',
'      }',
'      tree.push(value);',
'    }',
'  } else if (type == TOKEN_TYPE_LONG) {',
'    while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {',
'      tree.push(this.parse());',
'    }',
'  }',
'',
'  this.nextFragment();',
'  return tree;',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {',
'  return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {',
'  var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");',
'  if (defaultDecoration == null) return value;',
'',
'  var decorationTokenValues = this.context[token];',
'  defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);',
'',
'  if (decorationTokenValues instanceof Object) {',
'    Object.keys(decorationTokenValues).forEach(function (key) {',
'      defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);',
'    });',
'  }',
'',
'  return defaultDecoration;',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {',
'  if (token == RESERVED_TOKEN) return value;',
'  if (!this.isTokenAllowed(token)) return value;',
'',
'  var method = this.context[token];',
'',
'  if (method != null) {',
'    if (typeof method === \'string\')',
'      return method.replace(PLACEHOLDER, value);',
'',
'    if (typeof method === \'function\')',
'      return method(value);',
'',
'    if (typeof method === \'object\')',
'      return this.defaultDecoration(token, value);',
'',
'    return value;',
'  }',
'',
'  return this.defaultDecoration(token, value);',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {',
'  if (!(expr instanceof Array)) return expr;',
'',
'  var token = expr[0];',
'  expr.shift();',
'  var self = this;',
'  var value = [];',
'  expr.forEach(function(obj, index) {',
'    value.push(self.evaluate(obj));',
'  });',
'  return this.apply(token, value.join(\'\'));',
'};',
'',
'Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {',
'  return this.evaluate(this.parse());',
'};',
';',
'var HTML_SPECIAL_CHAR_REGEX = \'/(&[^;]*;)/\';',
'var INDEPENDENT_NUMBER_REGEX = \'/^(\\\\d+)$|^(\\\\d+[,;\\\\s])|(\\\\s\\\\d+)$|(\\\\s\\\\d+[,;\\\\s])/\';',
'var VERBOSE_DATE_REGEX = \'/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\\\s\\\\d+(,\\\\s\\\\d+)*(,*\\\\sat\\\\s\\\\d+:\\\\d+(\\\\sUTC))*)/\';',
'',
'Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {',
'  this.doc = doc;',
'  this.context = context || {};',
'  this.tokens = [];',
'  this.options = options || {};',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {',
'  return this.translateTree(this.doc);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {',
'  if (this.isNonTranslatableNode(node)) {',
'    if (node.childNodes.length == 1)',
'      return node.childNodes[0].nodeValue;',
'    return "";',
'  }',
'',
'  if (node.nodeType == 3)',
'    return this.translateTml(node.nodeValue);',
'',
'  var html = "";',
'  var buffer = "";',
'',
'  for(var i=0; i<node.childNodes.length; i++) {',
'    var child = node.childNodes[i];',
'',
'',
'    if (child.nodeType == 3) {',
'      buffer = buffer + child.nodeValue;',
'    } else if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        buffer = buffer + this.generateTmlTags(child);',
'    } else if (this.isSeparatorNode(child)) {          if (buffer != "")',
'        html = html + this.translateTml(buffer);',
'      html = html + this.generateHtmlToken(child);',
'      buffer = "";',
'    } else {',
'      if (buffer != "")',
'        html = html + this.translateTml(buffer);',
'',
'      var containerValue = this.translateTree(child);',
'      if (this.isIgnoredNode(child)) {',
'        html = html + containerValue;',
'      } else {',
'        html = html + this.generateHtmlToken(child, containerValue);',
'      }',
'',
'      buffer = "";',
'    }',
'  }',
'',
'  if (buffer != "") {',
'    html = html + this.translateTml(buffer);',
'  }',
'',
'  return html;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {',
'  if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)',
'    return true;',
'  if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")',
'    return true;',
'  return false;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {',
'  if (this.isEmptyString(tml)) return tml;',
'',
'',
'  if (this.getOption("split_sentences")) {',
'    sentences = Tr8n.Utils.splitSentences(tml);',
'    translation = tml;',
'    var self = this;',
'    sentences.forEach(function(sentence) {',
'      var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);',
'      translation = translation.replace(sentence, sentenceTranslation);',
'    });',
'    this.resetContext();',
'    return translation;',
'  }',
'',
'  translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);',
'  this.resetContext();',
'  return translation;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {',
'  if (!node.childNodes) return false;',
'  return (node.childNodes.length > 0);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {',
'  if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))',
'    return true;',
'',
'  if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))',
'    return true;',
'',
'  return false;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {',
'  var buffer = "";',
'  var self = this;',
'  for(var i=0; i<node.childNodes.length; i++) {',
'    var child = node.childNodes[i];',
'    if (child.nodeType == 3)                          buffer = buffer + child.nodeValue;',
'    else',
'      buffer = buffer + self.generateTmlTags(child);',
'  }',
'  var tokenContext = self.generateHtmlToken(node);',
'  var token = this.contextualize(this.adjustName(node), tokenContext);',
'',
'  var value = this.sanitizeValue(buffer);',
'',
'  if (this.isSelfClosingNode(node))',
'    return \'{\' + token + \'}\';',
'',
'  if (this.isShortToken(token, value))',
'    return \'[\' + token + \': \' + value + \']\';',
'',
'  return \'[\' + token + \']\' + value + \'[/\' + token + \']\';',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {',
'  if (this.options[name]) {',
'    return this.options[name];',
'  }',
'  return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {',
'  return this.getOption("debug_format").replace(\'{$0}\', translation);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {',
'  tml = tml.replace(/[\\s\\n\\r\\t\\0\\x0b\\xa0\\xc2]/g, \'\');',
'  return (tml == \'\');',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {',
'  this.debugTokens = this.tokens;',
'  this.tokens = [].concat(this.context);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {',
'  return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {',
'  if (node.parentNode == null) return false;',
'  return (node.parentNode.childNodes.length == 1);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {',
'  if (node.parentNode == null) return false;',
'',
'  for (var i=0; i < node.parentNode.childNodes.length; i++) {',
'    var child = node.parentNode.childNodes[i];',
'    if (child != node) {',
'      if (this.isInlineNode(child) || this.isValidTextNode(child))',
'        return true;',
'    }',
'  }',
'',
'  return false;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {',
'  return (',
'    node.nodeType == 1',
'    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1',
'    && !this.isOnlyChild(node)',
'  );',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {',
'  return (node.nodeType == 1 && !this.isInlineNode(node));',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {',
'  return (node.firstChild == null);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {',
'  if (node.nodeType != 1) return true;',
'  return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {',
'  if (node == null) return false;',
'  return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {',
'  if (node == null) return false;',
'  return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {',
'  return value.replace(/^\\s+/,\'\');',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {',
'  if (!this.getOption("data_tokens.special")) return text;',
'',
'  var matches = text.match(HTML_SPECIAL_CHAR_REGEX);',
'  var self = this;',
'  matches.forEach(function(match) {',
'    token = match.substring(1, match.length - 2);',
'    self.context[token] = match;',
'    text = text.replace(match, "{" + token + "}");',
'  });',
'',
'  return text;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {',
'  if (!this.getOption("data_tokens.numeric")) return text;',
'',
'  var matches = text.match(INDEPENDENT_NUMBER_REGEX);',
'  var tokenName = this.getOption("data_tokens.numeric_name");',
'',
'  var self = this;',
'  matches.forEach(function(match) {',
'    value = match.replace(/[,;]\\s/, \'\');',
'    token = self.contextualize(tokenName, value);',
'    text = text.replace(match, match.replace(value, "{" + token + "}"));',
'  });',
'',
'  return text;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {',
'  var name = node.tagName.toLowerCase();',
'  var attributes = node.attributes;',
'  var attributesHash = {};',
'  value = ((value == null) ? \'{0}\' : value);',
'',
'  if (attributes.length == 0) {',
'    if (this.isSelfClosingNode(node))',
'      return \'<\' + name + \'/>\';',
'    return \'<\' + name + \'>\' + value + \'</\' + name + \'>\';',
'  }',
'',
'  for(var i=0; i<attributes.length; i++) {',
'    attributesHash[attributes[i].name] = attributes[i].value;',
'  }',
'',
'  var keys = Object.keys(attributesHash);',
'  keys.sort();',
'',
'  var attr = [];',
'  keys.forEach(function(key) {',
'    var quote = (attributesHash[key].indexOf("\'") != -1 ? \'"\' : "\'");',
'    attr.push(key  + \'=\' + quote + attributesHash[key] + quote);',
'  });',
'  attr = attr.join(\' \');',
'',
'  if (this.isSelfClosingNode(node))',
'    return \'<\' + name + \' \' + attr + \'/>\';',
'',
'  return \'<\' + name + \' \' + attr + \'>\' + value + \'</\' + name + \'>\';',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {',
'  var name = node.tagName.toLowerCase();',
'  var map = this.getOption("name_mapping");',
'  name = (map[name] != null) ? map[name] : name;',
'  return name;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {',
'  if (this.tokens[name] && this.tokens[name] != context) {',
'    var index = 0;',
'    var matches = name.match(/\\d+$/);',
'    if (matches && matches.length > 0) {',
'      index = parseInt(matches[matches.length-1]);',
'      name = name.replace("" + index, \'\');',
'    }',
'    name = name + (index + 1);',
'    return this.contextualize(name, context);',
'  }',
'',
'  this.tokens[name] = context;',
'  return name;',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {',
'  this.doc = doc;',
'  this.debugTree(doc, 0);',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {',
'  var padding = Array(depth+1).join(\'=\');',
'',
'  console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));',
'',
'  if (node.childNodes) {',
'    var self = this;',
'    for(var i=0; i<node.childNodes.length; i++) {',
'      var child = node.childNodes[i];',
'      self.debugTree(child, depth+1);',
'    }',
'  }',
'};',
'',
'Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {',
'  var info = [];',
'  info.push(node.nodeType);',
'',
'  if (node.nodeType == 1)',
'    info.push(node.tagName);',
'',
'  if (this.isInlineNode(node)) {',
'    info.push("inline");',
'    if (this.hasInlineOrTextSiblings(node))',
'      info.push("sentence");',
'    else',
'      info.push("only translatable");',
'  }',
'',
'  if (this.isSelfClosingNode(node))',
'    info.push("self closing");',
'',
'  if (this.isOnlyChild(node))',
'    info.push("only child");',
'',
'  if (node.nodeType == 3)',
'    return "[" + info.join(", ") + "]" + \': "\' + node.nodeValue + \'"\';',
'',
'  return "[" + info.join(", ") + "]";',
'};',
';;;;;;;;;;;;;;;;;;;var program = require(\'commander\');',
'',
'program.version(\'0.1.1\')',
'  .option(\'-l, --label\', \'Label to be translated\')',
'  .option(\'-d, --description\', \'Description of the label\')',
'  .option(\'-t, --tokens\', \'Tokens to be substituted\')',
'  .option(\'-o, --options\', \'Options\')',
'  .parse(process.argv);',
'',
'',
'',
'exports.RulesEngine = Tr8n.RulesEngine;',
'exports.Tokenizers = Tr8n.Tokenizers;',
'exports.Decorators = Tr8n.Decorators;',
'exports.Utils = Tr8n.Utils;',
'',
'',
'exports.configure = Tr8n.configure;',
''];
_$jscoverage['lib/tr8n.js'][411]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][418]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][420]=0;
_$jscoverage['lib/tr8n.js'][17]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][428]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][28]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][23]=0;
_$jscoverage['lib/tr8n.js'][26]=0;
_$jscoverage['lib/tr8n.js'][432]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][435]=0;
_$jscoverage['lib/tr8n.js'][112]=0;
_$jscoverage['lib/tr8n.js'][110]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][44]=0;
_$jscoverage['lib/tr8n.js'][111]=0;
_$jscoverage['lib/tr8n.js'][111]=0;
_$jscoverage['lib/tr8n.js'][112]=0;
_$jscoverage['lib/tr8n.js'][439]=0;
_$jscoverage['lib/tr8n.js'][116]=0;
_$jscoverage['lib/tr8n.js'][113]=0;
_$jscoverage['lib/tr8n.js'][430]=0;
_$jscoverage['lib/tr8n.js'][153]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][123]=0;
_$jscoverage['lib/tr8n.js'][117]=0;
_$jscoverage['lib/tr8n.js'][117]=0;
_$jscoverage['lib/tr8n.js'][118]=0;
_$jscoverage['lib/tr8n.js'][119]=0;
_$jscoverage['lib/tr8n.js'][120]=0;
_$jscoverage['lib/tr8n.js'][450]=0;
_$jscoverage['lib/tr8n.js'][163]=0;
_$jscoverage['lib/tr8n.js'][157]=0;
_$jscoverage['lib/tr8n.js'][159]=0;
_$jscoverage['lib/tr8n.js'][159]=0;
_$jscoverage['lib/tr8n.js'][160]=0;
_$jscoverage['lib/tr8n.js'][161]=0;
_$jscoverage['lib/tr8n.js'][162]=0;
_$jscoverage['lib/tr8n.js'][162]=0;
_$jscoverage['lib/tr8n.js'][163]=0;
_$jscoverage['lib/tr8n.js'][156]=0;
_$jscoverage['lib/tr8n.js'][158]=0;
_$jscoverage['lib/tr8n.js'][460]=0;
_$jscoverage['lib/tr8n.js'][176]=0;
_$jscoverage['lib/tr8n.js'][164]=0;
_$jscoverage['lib/tr8n.js'][165]=0;
_$jscoverage['lib/tr8n.js'][166]=0;
_$jscoverage['lib/tr8n.js'][168]=0;
_$jscoverage['lib/tr8n.js'][168]=0;
_$jscoverage['lib/tr8n.js'][170]=0;
_$jscoverage['lib/tr8n.js'][171]=0;
_$jscoverage['lib/tr8n.js'][172]=0;
_$jscoverage['lib/tr8n.js'][173]=0;
_$jscoverage['lib/tr8n.js'][174]=0;
_$jscoverage['lib/tr8n.js'][175]=0;
_$jscoverage['lib/tr8n.js'][470]=0;
_$jscoverage['lib/tr8n.js'][193]=0;
_$jscoverage['lib/tr8n.js'][191]=0;
_$jscoverage['lib/tr8n.js'][188]=0;
_$jscoverage['lib/tr8n.js'][177]=0;
_$jscoverage['lib/tr8n.js'][178]=0;
_$jscoverage['lib/tr8n.js'][179]=0;
_$jscoverage['lib/tr8n.js'][182]=0;
_$jscoverage['lib/tr8n.js'][182]=0;
_$jscoverage['lib/tr8n.js'][181]=0;
_$jscoverage['lib/tr8n.js'][184]=0;
_$jscoverage['lib/tr8n.js'][186]=0;
_$jscoverage['lib/tr8n.js'][189]=0;
_$jscoverage['lib/tr8n.js'][189]=0;
_$jscoverage['lib/tr8n.js'][468]=0;
_$jscoverage['lib/tr8n.js'][220]=0;
_$jscoverage['lib/tr8n.js'][198]=0;
_$jscoverage['lib/tr8n.js'][195]=0;
_$jscoverage['lib/tr8n.js'][201]=0;
_$jscoverage['lib/tr8n.js'][200]=0;
_$jscoverage['lib/tr8n.js'][203]=0;
_$jscoverage['lib/tr8n.js'][208]=0;
_$jscoverage['lib/tr8n.js'][207]=0;
_$jscoverage['lib/tr8n.js'][211]=0;
_$jscoverage['lib/tr8n.js'][212]=0;
_$jscoverage['lib/tr8n.js'][216]=0;
_$jscoverage['lib/tr8n.js'][215]=0;
_$jscoverage['lib/tr8n.js'][214]=0;
_$jscoverage['lib/tr8n.js'][487]=0;
_$jscoverage['lib/tr8n.js'][239]=0;
_$jscoverage['lib/tr8n.js'][225]=0;
_$jscoverage['lib/tr8n.js'][224]=0;
_$jscoverage['lib/tr8n.js'][230]=0;
_$jscoverage['lib/tr8n.js'][234]=0;
_$jscoverage['lib/tr8n.js'][228]=0;
_$jscoverage['lib/tr8n.js'][235]=0;
_$jscoverage['lib/tr8n.js'][235]=0;
_$jscoverage['lib/tr8n.js'][236]=0;
_$jscoverage['lib/tr8n.js'][236]=0;
_$jscoverage['lib/tr8n.js'][237]=0;
_$jscoverage['lib/tr8n.js'][237]=0;
_$jscoverage['lib/tr8n.js'][238]=0;
_$jscoverage['lib/tr8n.js'][238]=0;
_$jscoverage['lib/tr8n.js'][490]=0;
_$jscoverage['lib/tr8n.js'][265]=0;
_$jscoverage['lib/tr8n.js'][243]=0;
_$jscoverage['lib/tr8n.js'][245]=0;
_$jscoverage['lib/tr8n.js'][244]=0;
_$jscoverage['lib/tr8n.js'][246]=0;
_$jscoverage['lib/tr8n.js'][247]=0;
_$jscoverage['lib/tr8n.js'][250]=0;
_$jscoverage['lib/tr8n.js'][252]=0;
_$jscoverage['lib/tr8n.js'][256]=0;
_$jscoverage['lib/tr8n.js'][260]=0;
_$jscoverage['lib/tr8n.js'][261]=0;
_$jscoverage['lib/tr8n.js'][262]=0;
_$jscoverage['lib/tr8n.js'][263]=0;
_$jscoverage['lib/tr8n.js'][264]=0;
_$jscoverage['lib/tr8n.js'][509]=0;
_$jscoverage['lib/tr8n.js'][293]=0;
_$jscoverage['lib/tr8n.js'][293]=0;
_$jscoverage['lib/tr8n.js'][292]=0;
_$jscoverage['lib/tr8n.js'][266]=0;
_$jscoverage['lib/tr8n.js'][267]=0;
_$jscoverage['lib/tr8n.js'][268]=0;
_$jscoverage['lib/tr8n.js'][271]=0;
_$jscoverage['lib/tr8n.js'][272]=0;
_$jscoverage['lib/tr8n.js'][273]=0;
_$jscoverage['lib/tr8n.js'][274]=0;
_$jscoverage['lib/tr8n.js'][275]=0;
_$jscoverage['lib/tr8n.js'][276]=0;
_$jscoverage['lib/tr8n.js'][270]=0;
_$jscoverage['lib/tr8n.js'][280]=0;
_$jscoverage['lib/tr8n.js'][288]=0;
_$jscoverage['lib/tr8n.js'][289]=0;
_$jscoverage['lib/tr8n.js'][279]=0;
_$jscoverage['lib/tr8n.js'][525]=0;
_$jscoverage['lib/tr8n.js'][317]=0;
_$jscoverage['lib/tr8n.js'][294]=0;
_$jscoverage['lib/tr8n.js'][298]=0;
_$jscoverage['lib/tr8n.js'][298]=0;
_$jscoverage['lib/tr8n.js'][299]=0;
_$jscoverage['lib/tr8n.js'][297]=0;
_$jscoverage['lib/tr8n.js'][303]=0;
_$jscoverage['lib/tr8n.js'][305]=0;
_$jscoverage['lib/tr8n.js'][304]=0;
_$jscoverage['lib/tr8n.js'][316]=0;
_$jscoverage['lib/tr8n.js'][307]=0;
_$jscoverage['lib/tr8n.js'][306]=0;
_$jscoverage['lib/tr8n.js'][311]=0;
_$jscoverage['lib/tr8n.js'][308]=0;
_$jscoverage['lib/tr8n.js'][302]=0;
_$jscoverage['lib/tr8n.js'][312]=0;
_$jscoverage['lib/tr8n.js'][314]=0;
_$jscoverage['lib/tr8n.js'][313]=0;
_$jscoverage['lib/tr8n.js'][540]=0;
_$jscoverage['lib/tr8n.js'][344]=0;
_$jscoverage['lib/tr8n.js'][319]=0;
_$jscoverage['lib/tr8n.js'][321]=0;
_$jscoverage['lib/tr8n.js'][322]=0;
_$jscoverage['lib/tr8n.js'][320]=0;
_$jscoverage['lib/tr8n.js'][340]=0;
_$jscoverage['lib/tr8n.js'][324]=0;
_$jscoverage['lib/tr8n.js'][318]=0;
_$jscoverage['lib/tr8n.js'][328]=0;
_$jscoverage['lib/tr8n.js'][327]=0;
_$jscoverage['lib/tr8n.js'][326]=0;
_$jscoverage['lib/tr8n.js'][332]=0;
_$jscoverage['lib/tr8n.js'][333]=0;
_$jscoverage['lib/tr8n.js'][337]=0;
_$jscoverage['lib/tr8n.js'][336]=0;
_$jscoverage['lib/tr8n.js'][341]=0;
_$jscoverage['lib/tr8n.js'][342]=0;
_$jscoverage['lib/tr8n.js'][342]=0;
_$jscoverage['lib/tr8n.js'][554]=0;
_$jscoverage['lib/tr8n.js'][362]=0;
_$jscoverage['lib/tr8n.js'][356]=0;
_$jscoverage['lib/tr8n.js'][345]=0;
_$jscoverage['lib/tr8n.js'][349]=0;
_$jscoverage['lib/tr8n.js'][348]=0;
_$jscoverage['lib/tr8n.js'][347]=0;
_$jscoverage['lib/tr8n.js'][353]=0;
_$jscoverage['lib/tr8n.js'][357]=0;
_$jscoverage['lib/tr8n.js'][357]=0;
_$jscoverage['lib/tr8n.js'][358]=0;
_$jscoverage['lib/tr8n.js'][358]=0;
_$jscoverage['lib/tr8n.js'][360]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][392]=0;
_$jscoverage['lib/tr8n.js'][391]=0;
_$jscoverage['lib/tr8n.js'][375]=0;
_$jscoverage['lib/tr8n.js'][379]=0;
_$jscoverage['lib/tr8n.js'][379]=0;
_$jscoverage['lib/tr8n.js'][381]=0;
_$jscoverage['lib/tr8n.js'][382]=0;
_$jscoverage['lib/tr8n.js'][383]=0;
_$jscoverage['lib/tr8n.js'][384]=0;
_$jscoverage['lib/tr8n.js'][386]=0;
_$jscoverage['lib/tr8n.js'][385]=0;
_$jscoverage['lib/tr8n.js'][388]=0;
_$jscoverage['lib/tr8n.js'][378]=0;
_$jscoverage['lib/tr8n.js'][364]=0;
_$jscoverage['lib/tr8n.js'][372]=0;
_$jscoverage['lib/tr8n.js'][369]=0;
_$jscoverage['lib/tr8n.js'][363]=0;
_$jscoverage['lib/tr8n.js'][370]=0;
_$jscoverage['lib/tr8n.js'][367]=0;
_$jscoverage['lib/tr8n.js'][366]=0;
_$jscoverage['lib/tr8n.js'][583]=0;
_$jscoverage['lib/tr8n.js'][424]=0;
_$jscoverage['lib/tr8n.js'][395]=0;
_$jscoverage['lib/tr8n.js'][396]=0;
_$jscoverage['lib/tr8n.js'][421]=0;
_$jscoverage['lib/tr8n.js'][397]=0;
_$jscoverage['lib/tr8n.js'][400]=0;
_$jscoverage['lib/tr8n.js'][417]=0;
_$jscoverage['lib/tr8n.js'][401]=0;
_$jscoverage['lib/tr8n.js'][402]=0;
_$jscoverage['lib/tr8n.js'][403]=0;
_$jscoverage['lib/tr8n.js'][414]=0;
_$jscoverage['lib/tr8n.js'][399]=0;
_$jscoverage['lib/tr8n.js'][412]=0;
_$jscoverage['lib/tr8n.js'][407]=0;
_$jscoverage['lib/tr8n.js'][406]=0;
_$jscoverage['lib/tr8n.js'][423]=0;
_$jscoverage['lib/tr8n.js'][413]=0;
_$jscoverage['lib/tr8n.js'][410]=0;
_$jscoverage['lib/tr8n.js'][599]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][449]=0;
_$jscoverage['lib/tr8n.js'][429]=0;
_$jscoverage['lib/tr8n.js'][427]=0;
_$jscoverage['lib/tr8n.js'][431]=0;
_$jscoverage['lib/tr8n.js'][430]=0;
_$jscoverage['lib/tr8n.js'][433]=0;
_$jscoverage['lib/tr8n.js'][436]=0;
_$jscoverage['lib/tr8n.js'][438]=0;
_$jscoverage['lib/tr8n.js'][440]=0;
_$jscoverage['lib/tr8n.js'][429]=0;
_$jscoverage['lib/tr8n.js'][442]=0;
_$jscoverage['lib/tr8n.js'][445]=0;
_$jscoverage['lib/tr8n.js'][609]=0;
_$jscoverage['lib/tr8n.js'][474]=0;
_$jscoverage['lib/tr8n.js'][472]=0;
_$jscoverage['lib/tr8n.js'][458]=0;
_$jscoverage['lib/tr8n.js'][473]=0;
_$jscoverage['lib/tr8n.js'][457]=0;
_$jscoverage['lib/tr8n.js'][459]=0;
_$jscoverage['lib/tr8n.js'][461]=0;
_$jscoverage['lib/tr8n.js'][464]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][465]=0;
_$jscoverage['lib/tr8n.js'][471]=0;
_$jscoverage['lib/tr8n.js'][465]=0;
_$jscoverage['lib/tr8n.js'][469]=0;
_$jscoverage['lib/tr8n.js'][619]=0;
_$jscoverage['lib/tr8n.js'][491]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][477]=0;
_$jscoverage['lib/tr8n.js'][480]=0;
_$jscoverage['lib/tr8n.js'][481]=0;
_$jscoverage['lib/tr8n.js'][482]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][485]=0;
_$jscoverage['lib/tr8n.js'][626]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][503]=0;
_$jscoverage['lib/tr8n.js'][495]=0;
_$jscoverage['lib/tr8n.js'][494]=0;
_$jscoverage['lib/tr8n.js'][497]=0;
_$jscoverage['lib/tr8n.js'][492]=0;
_$jscoverage['lib/tr8n.js'][501]=0;
_$jscoverage['lib/tr8n.js'][502]=0;
_$jscoverage['lib/tr8n.js'][504]=0;
_$jscoverage['lib/tr8n.js'][500]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][635]=0;
_$jscoverage['lib/tr8n.js'][524]=0;
_$jscoverage['lib/tr8n.js'][523]=0;
_$jscoverage['lib/tr8n.js'][507]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][512]=0;
_$jscoverage['lib/tr8n.js'][515]=0;
_$jscoverage['lib/tr8n.js'][514]=0;
_$jscoverage['lib/tr8n.js'][520]=0;
_$jscoverage['lib/tr8n.js'][518]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][645]=0;
_$jscoverage['lib/tr8n.js'][545]=0;
_$jscoverage['lib/tr8n.js'][544]=0;
_$jscoverage['lib/tr8n.js'][527]=0;
_$jscoverage['lib/tr8n.js'][531]=0;
_$jscoverage['lib/tr8n.js'][530]=0;
_$jscoverage['lib/tr8n.js'][535]=0;
_$jscoverage['lib/tr8n.js'][539]=0;
_$jscoverage['lib/tr8n.js'][536]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][541]=0;
_$jscoverage['lib/tr8n.js'][653]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][556]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][550]=0;
_$jscoverage['lib/tr8n.js'][548]=0;
_$jscoverage['lib/tr8n.js'][554]=0;
_$jscoverage['lib/tr8n.js'][557]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][584]=0;
_$jscoverage['lib/tr8n.js'][584]=0;
_$jscoverage['lib/tr8n.js'][560]=0;
_$jscoverage['lib/tr8n.js'][559]=0;
_$jscoverage['lib/tr8n.js'][568]=0;
_$jscoverage['lib/tr8n.js'][567]=0;
_$jscoverage['lib/tr8n.js'][576]=0;
_$jscoverage['lib/tr8n.js'][575]=0;
_$jscoverage['lib/tr8n.js'][580]=0;
_$jscoverage['lib/tr8n.js'][579]=0;
_$jscoverage['lib/tr8n.js'][668]=0;
_$jscoverage['lib/tr8n.js'][593]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][590]=0;
_$jscoverage['lib/tr8n.js'][588]=0;
_$jscoverage['lib/tr8n.js'][674]=0;
_$jscoverage['lib/tr8n.js'][608]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][607]=0;
_$jscoverage['lib/tr8n.js'][595]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][598]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][605]=0;
_$jscoverage['lib/tr8n.js'][606]=0;
_$jscoverage['lib/tr8n.js'][672]=0;
_$jscoverage['lib/tr8n.js'][625]=0;
_$jscoverage['lib/tr8n.js'][623]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][616]=0;
_$jscoverage['lib/tr8n.js'][610]=0;
_$jscoverage['lib/tr8n.js'][613]=0;
_$jscoverage['lib/tr8n.js'][622]=0;
_$jscoverage['lib/tr8n.js'][617]=0;
_$jscoverage['lib/tr8n.js'][617]=0;
_$jscoverage['lib/tr8n.js'][620]=0;
_$jscoverage['lib/tr8n.js'][687]=0;
_$jscoverage['lib/tr8n.js'][641]=0;
_$jscoverage['lib/tr8n.js'][639]=0;
_$jscoverage['lib/tr8n.js'][638]=0;
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][633]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][640]=0;
_$jscoverage['lib/tr8n.js'][632]=0;
_$jscoverage['lib/tr8n.js'][636]=0;
_$jscoverage['lib/tr8n.js'][701]=0;
_$jscoverage['lib/tr8n.js'][656]=0;
_$jscoverage['lib/tr8n.js'][652]=0;
_$jscoverage['lib/tr8n.js'][644]=0;
_$jscoverage['lib/tr8n.js'][654]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][649]=0;
_$jscoverage['lib/tr8n.js'][651]=0;
_$jscoverage['lib/tr8n.js'][707]=0;
_$jscoverage['lib/tr8n.js'][667]=0;
_$jscoverage['lib/tr8n.js'][664]=0;
_$jscoverage['lib/tr8n.js'][666]=0;
_$jscoverage['lib/tr8n.js'][659]=0;
_$jscoverage['lib/tr8n.js'][661]=0;
_$jscoverage['lib/tr8n.js'][665]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][679]=0;
_$jscoverage['lib/tr8n.js'][675]=0;
_$jscoverage['lib/tr8n.js'][673]=0;
_$jscoverage['lib/tr8n.js'][676]=0;
_$jscoverage['lib/tr8n.js'][671]=0;
_$jscoverage['lib/tr8n.js'][677]=0;
_$jscoverage['lib/tr8n.js'][715]=0;
_$jscoverage['lib/tr8n.js'][689]=0;
_$jscoverage['lib/tr8n.js'][688]=0;
_$jscoverage['lib/tr8n.js'][680]=0;
_$jscoverage['lib/tr8n.js'][683]=0;
_$jscoverage['lib/tr8n.js'][684]=0;
_$jscoverage['lib/tr8n.js'][721]=0;
_$jscoverage['lib/tr8n.js'][700]=0;
_$jscoverage['lib/tr8n.js'][697]=0;
_$jscoverage['lib/tr8n.js'][692]=0;
_$jscoverage['lib/tr8n.js'][698]=0;
_$jscoverage['lib/tr8n.js'][699]=0;
_$jscoverage['lib/tr8n.js'][693]=0;
_$jscoverage['lib/tr8n.js'][695]=0;
_$jscoverage['lib/tr8n.js'][727]=0;
_$jscoverage['lib/tr8n.js'][714]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][711]=0;
_$jscoverage['lib/tr8n.js'][713]=0;
_$jscoverage['lib/tr8n.js'][708]=0;
_$jscoverage['lib/tr8n.js'][732]=0;
_$jscoverage['lib/tr8n.js'][722]=0;
_$jscoverage['lib/tr8n.js'][718]=0;
_$jscoverage['lib/tr8n.js'][716]=0;
_$jscoverage['lib/tr8n.js'][724]=0;
_$jscoverage['lib/tr8n.js'][725]=0;
_$jscoverage['lib/tr8n.js'][728]=0;
_$jscoverage['lib/tr8n.js'][730]=0;
_$jscoverage['lib/tr8n.js'][734]=0;
_$jscoverage['lib/tr8n.js'][743]=0;
_$jscoverage['lib/tr8n.js'][744]=0;
_$jscoverage['lib/tr8n.js'][745]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][749]=0;
}
_$jscoverage['lib/tr8n.js'][2]++;
var Tr8n = {
  "Tokenizers": {
    "Tokens": {}
  },
  "Utils": {},
  "RulesEngine": {},
  "Decorators": {}
}
;
_$jscoverage['lib/tr8n.js'][11]++;
Tr8n.Utils.hashValue = function(hash, key, defaultValue) {
  _$jscoverage['lib/tr8n.js'][12]++;
defaultValue = defaultValue || null;
  _$jscoverage['lib/tr8n.js'][13]++;
var parts = key.split(".");
  _$jscoverage['lib/tr8n.js'][14]++;
for(var i=0; i<parts.length; i++) {
    _$jscoverage['lib/tr8n.js'][15]++;
var part = parts[i];
    _$jscoverage['lib/tr8n.js'][16]++;
if (typeof hash[part] === "undefined") {
_$jscoverage['lib/tr8n.js'][16]++;
return defaultValue;}

    _$jscoverage['lib/tr8n.js'][17]++;
hash = hash[part];
  }
  _$jscoverage['lib/tr8n.js'][19]++;
return hash;
};

_$jscoverage['lib/tr8n.js'][22]++;
Tr8n.Utils.stripTags = function(input, allowed) {
  _$jscoverage['lib/tr8n.js'][23]++;
allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join('');   _$jscoverage['lib/tr8n.js'][26]++;
var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  _$jscoverage['lib/tr8n.js'][28]++;
return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      _$jscoverage['lib/tr8n.js'][30]++;
return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

_$jscoverage['lib/tr8n.js'][34]++;
Tr8n.Utils.splitSentences = function(text) {
  _$jscoverage['lib/tr8n.js'][35]++;
var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
  _$jscoverage['lib/tr8n.js'][36]++;
return Tr8n.Utils.stripTags(text).match(sentenceRegex);
};
;
_$jscoverage['lib/tr8n.js'][39]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][40]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][41]++;
this.initTranslatorOptions();
};

_$jscoverage['lib/tr8n.js'][44]++;
Tr8n.Configuration.prototype.initDefaultTokens = function() {
  _$jscoverage['lib/tr8n.js'][45]++;
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

_$jscoverage['lib/tr8n.js'][110]++;
Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {
  _$jscoverage['lib/tr8n.js'][111]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][111]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][112]++;
if (typeof this.defaultTokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][112]++;
return null;}

  _$jscoverage['lib/tr8n.js'][113]++;
return new String(this.defaultTokens[format][type][token]);
};

_$jscoverage['lib/tr8n.js'][116]++;
Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  _$jscoverage['lib/tr8n.js'][117]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][117]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][118]++;
this.defaultTokens[format] = this.defaultTokens[format] || {};
  _$jscoverage['lib/tr8n.js'][119]++;
this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};
  _$jscoverage['lib/tr8n.js'][120]++;
this.defaultTokens[format][type][token] = value;
};

_$jscoverage['lib/tr8n.js'][123]++;
Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  _$jscoverage['lib/tr8n.js'][124]++;
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

_$jscoverage['lib/tr8n.js'][153]++;
Tr8n.config = new Tr8n.Configuration();

;
_$jscoverage['lib/tr8n.js'][156]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][157]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][158]++;
this.ctx = ctx || {
    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][159]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][159]++;
return r; }.bind(this),
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][160]++;
return expr; }.bind(this),
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][161]++;
return list[1]; }.bind(this),
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][162]++;
list.shift(); _$jscoverage['lib/tr8n.js'][162]++;
return list; }.bind(this),
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][163]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][163]++;
return cell; }.bind(this),
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][164]++;
return (l == r); }.bind(this),
    'atom':     function(a)       { _$jscoverage['lib/tr8n.js'][165]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][166]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ _$jscoverage['lib/tr8n.js'][168]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][168]++;
return r; }.bind(this),

    '=':        function(args){ _$jscoverage['lib/tr8n.js'][170]++;
return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ _$jscoverage['lib/tr8n.js'][171]++;
return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ _$jscoverage['lib/tr8n.js'][172]++;
return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ _$jscoverage['lib/tr8n.js'][173]++;
return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ _$jscoverage['lib/tr8n.js'][174]++;
return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ _$jscoverage['lib/tr8n.js'][175]++;
return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ _$jscoverage['lib/tr8n.js'][176]++;
return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ _$jscoverage['lib/tr8n.js'][177]++;
return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ _$jscoverage['lib/tr8n.js'][178]++;
return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ _$jscoverage['lib/tr8n.js'][179]++;
return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      _$jscoverage['lib/tr8n.js'][181]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][182]++;
if (!this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][182]++;
return false;}

      }
      _$jscoverage['lib/tr8n.js'][184]++;
return true;
    }.bind(this),
    'and':      function(args){ _$jscoverage['lib/tr8n.js'][186]++;
return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      _$jscoverage['lib/tr8n.js'][188]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][189]++;
if (this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][189]++;
return true;}

      }
      _$jscoverage['lib/tr8n.js'][191]++;
return false;
    }.bind(this),
    'or':      function(args){ _$jscoverage['lib/tr8n.js'][193]++;
return this.ctx['||'](args); }.bind(this)
  };
  _$jscoverage['lib/tr8n.js'][195]++;
return this;
}

_$jscoverage['lib/tr8n.js'][198]++;
Tr8n.RulesEngine.Evaluator.prototype = {
  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][200]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][201]++;
return this.ctx[fn](args);
    }
    _$jscoverage['lib/tr8n.js'][203]++;
return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    _$jscoverage['lib/tr8n.js'][207]++;
if (this.ctx['atom'](sexpr)) {
      _$jscoverage['lib/tr8n.js'][208]++;
return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    _$jscoverage['lib/tr8n.js'][211]++;
var fn = sexpr[0];
    _$jscoverage['lib/tr8n.js'][212]++;
var args = sexpr.slice(1);

    _$jscoverage['lib/tr8n.js'][214]++;
if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][215]++;
args = args.map(function(arg) {
        _$jscoverage['lib/tr8n.js'][216]++;
return this.evaluate(arg);
      }.bind(this));
    }

    _$jscoverage['lib/tr8n.js'][220]++;
return this.apply(fn, args);
  }
}
;
_$jscoverage['lib/tr8n.js'][224]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][225]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][228]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][230]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][234]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][235]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][235]++;
return;}

  	_$jscoverage['lib/tr8n.js'][236]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][236]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][237]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][237]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][238]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][238]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][239]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][243]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][244]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][245]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][246]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][247]++;
return list;
  }
}
;_$jscoverage['lib/tr8n.js'][250]++;
var Tr8n = Tr8n || {};

_$jscoverage['lib/tr8n.js'][252]++;
Tr8n.DataTokenizer = function() {

}

_$jscoverage['lib/tr8n.js'][256]++;
Tr8n.DataTokenizer.prototype.doSomething = function() {

}
;
_$jscoverage['lib/tr8n.js'][260]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][261]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][262]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][263]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][264]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][265]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][266]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][267]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][268]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][270]++;
Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][271]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][272]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][273]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][274]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][275]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][276]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][279]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][280]++;
var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  _$jscoverage['lib/tr8n.js'][288]++;
this.fragments = this.label.match(expression);
  _$jscoverage['lib/tr8n.js'][289]++;
return this.fragments;
};

_$jscoverage['lib/tr8n.js'][292]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  _$jscoverage['lib/tr8n.js'][293]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][293]++;
return null;}

  _$jscoverage['lib/tr8n.js'][294]++;
return this.fragments[0];
};

_$jscoverage['lib/tr8n.js'][297]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  _$jscoverage['lib/tr8n.js'][298]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][298]++;
return null;}

  _$jscoverage['lib/tr8n.js'][299]++;
return this.fragments.shift();
};

_$jscoverage['lib/tr8n.js'][302]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  _$jscoverage['lib/tr8n.js'][303]++;
var token = this.nextFragment();
  _$jscoverage['lib/tr8n.js'][304]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][305]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

  _$jscoverage['lib/tr8n.js'][306]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][307]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

  _$jscoverage['lib/tr8n.js'][308]++;
return token;
};

_$jscoverage['lib/tr8n.js'][311]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  _$jscoverage['lib/tr8n.js'][312]++;
var tree = [name];
  _$jscoverage['lib/tr8n.js'][313]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    {
_$jscoverage['lib/tr8n.js'][314]++;
this.tokens.push(name);}


  _$jscoverage['lib/tr8n.js'][316]++;
if (type == TOKEN_TYPE_SHORT) {
    _$jscoverage['lib/tr8n.js'][317]++;
var first = true;
    _$jscoverage['lib/tr8n.js'][318]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][319]++;
var value = this.parse();
      _$jscoverage['lib/tr8n.js'][320]++;
if (first && typeof value == "string") {
        _$jscoverage['lib/tr8n.js'][321]++;
value = value.replace(/^\s+/,'');
        _$jscoverage['lib/tr8n.js'][322]++;
first = false;
      }
      _$jscoverage['lib/tr8n.js'][324]++;
tree.push(value);
    }
  } else {
_$jscoverage['lib/tr8n.js'][326]++;
if (type == TOKEN_TYPE_LONG) {
    _$jscoverage['lib/tr8n.js'][327]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][328]++;
tree.push(this.parse());
    }
  }}


  _$jscoverage['lib/tr8n.js'][332]++;
this.nextFragment();
  _$jscoverage['lib/tr8n.js'][333]++;
return tree;
};

_$jscoverage['lib/tr8n.js'][336]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][337]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

_$jscoverage['lib/tr8n.js'][340]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  _$jscoverage['lib/tr8n.js'][341]++;
var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  _$jscoverage['lib/tr8n.js'][342]++;
if (defaultDecoration == null) {
_$jscoverage['lib/tr8n.js'][342]++;
return value;}


  _$jscoverage['lib/tr8n.js'][344]++;
var decorationTokenValues = this.context[token];
  _$jscoverage['lib/tr8n.js'][345]++;
defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  _$jscoverage['lib/tr8n.js'][347]++;
if (decorationTokenValues instanceof Object) {
    _$jscoverage['lib/tr8n.js'][348]++;
Object.keys(decorationTokenValues).forEach(function (key) {
      _$jscoverage['lib/tr8n.js'][349]++;
defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  _$jscoverage['lib/tr8n.js'][353]++;
return defaultDecoration;
};

_$jscoverage['lib/tr8n.js'][356]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  _$jscoverage['lib/tr8n.js'][357]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][357]++;
return value;}

  _$jscoverage['lib/tr8n.js'][358]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][358]++;
return value;}


  _$jscoverage['lib/tr8n.js'][360]++;
var method = this.context[token];

  _$jscoverage['lib/tr8n.js'][362]++;
if (method != null) {
    _$jscoverage['lib/tr8n.js'][363]++;
if (typeof method === 'string')
      {
_$jscoverage['lib/tr8n.js'][364]++;
return method.replace(PLACEHOLDER, value);}


    _$jscoverage['lib/tr8n.js'][366]++;
if (typeof method === 'function')
      {
_$jscoverage['lib/tr8n.js'][367]++;
return method(value);}


    _$jscoverage['lib/tr8n.js'][369]++;
if (typeof method === 'object')
      {
_$jscoverage['lib/tr8n.js'][370]++;
return this.defaultDecoration(token, value);}


    _$jscoverage['lib/tr8n.js'][372]++;
return value;
  }

  _$jscoverage['lib/tr8n.js'][375]++;
return this.defaultDecoration(token, value);
};

_$jscoverage['lib/tr8n.js'][378]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  _$jscoverage['lib/tr8n.js'][379]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][379]++;
return expr;}


  _$jscoverage['lib/tr8n.js'][381]++;
var token = expr[0];
  _$jscoverage['lib/tr8n.js'][382]++;
expr.shift();
  _$jscoverage['lib/tr8n.js'][383]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][384]++;
var value = [];
  _$jscoverage['lib/tr8n.js'][385]++;
expr.forEach(function(obj, index) {
    _$jscoverage['lib/tr8n.js'][386]++;
value.push(self.evaluate(obj));
  });
  _$jscoverage['lib/tr8n.js'][388]++;
return this.apply(token, value.join(''));
};

_$jscoverage['lib/tr8n.js'][391]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  _$jscoverage['lib/tr8n.js'][392]++;
return this.evaluate(this.parse());
};
;
_$jscoverage['lib/tr8n.js'][395]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][396]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][397]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][399]++;
Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][400]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][401]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][402]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][403]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][406]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {
  _$jscoverage['lib/tr8n.js'][407]++;
return this.translateTree(this.doc);
};

_$jscoverage['lib/tr8n.js'][410]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {
  _$jscoverage['lib/tr8n.js'][411]++;
if (this.isNonTranslatableNode(node)) {
    _$jscoverage['lib/tr8n.js'][412]++;
if (node.childNodes.length == 1)
      {
_$jscoverage['lib/tr8n.js'][413]++;
return node.childNodes[0].nodeValue;}

    _$jscoverage['lib/tr8n.js'][414]++;
return "";
  }

  _$jscoverage['lib/tr8n.js'][417]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][418]++;
return this.translateTml(node.nodeValue);}


  _$jscoverage['lib/tr8n.js'][420]++;
var html = "";
  _$jscoverage['lib/tr8n.js'][421]++;
var buffer = "";

  _$jscoverage['lib/tr8n.js'][423]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][424]++;
var child = node.childNodes[i];


    _$jscoverage['lib/tr8n.js'][427]++;
if (child.nodeType == 3) {
      _$jscoverage['lib/tr8n.js'][428]++;
buffer = buffer + child.nodeValue;
    } else {
_$jscoverage['lib/tr8n.js'][429]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        _$jscoverage['lib/tr8n.js'][429]++;
buffer = buffer + this.generateTmlTags(child);
    } else {
_$jscoverage['lib/tr8n.js'][430]++;
if (this.isSeparatorNode(child)) {          _$jscoverage['lib/tr8n.js'][430]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][431]++;
html = html + this.translateTml(buffer);}

      _$jscoverage['lib/tr8n.js'][432]++;
html = html + this.generateHtmlToken(child);
      _$jscoverage['lib/tr8n.js'][433]++;
buffer = "";
    } else {
      _$jscoverage['lib/tr8n.js'][435]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][436]++;
html = html + this.translateTml(buffer);}


      _$jscoverage['lib/tr8n.js'][438]++;
var containerValue = this.translateTree(child);
      _$jscoverage['lib/tr8n.js'][439]++;
if (this.isIgnoredNode(child)) {
        _$jscoverage['lib/tr8n.js'][440]++;
html = html + containerValue;
      } else {
        _$jscoverage['lib/tr8n.js'][442]++;
html = html + this.generateHtmlToken(child, containerValue);
      }

      _$jscoverage['lib/tr8n.js'][445]++;
buffer = "";
    }}
}

  }

  _$jscoverage['lib/tr8n.js'][449]++;
if (buffer != "") {
    _$jscoverage['lib/tr8n.js'][450]++;
html = html + this.translateTml(buffer);
  }

  _$jscoverage['lib/tr8n.js'][453]++;
return html;
};

_$jscoverage['lib/tr8n.js'][456]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {
  _$jscoverage['lib/tr8n.js'][457]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    {
_$jscoverage['lib/tr8n.js'][458]++;
return true;}

  _$jscoverage['lib/tr8n.js'][459]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    {
_$jscoverage['lib/tr8n.js'][460]++;
return true;}

  _$jscoverage['lib/tr8n.js'][461]++;
return false;
};

_$jscoverage['lib/tr8n.js'][464]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {
  _$jscoverage['lib/tr8n.js'][465]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][465]++;
return tml;}



  _$jscoverage['lib/tr8n.js'][468]++;
if (this.getOption("split_sentences")) {
    _$jscoverage['lib/tr8n.js'][469]++;
sentences = Tr8n.Utils.splitSentences(tml);
    _$jscoverage['lib/tr8n.js'][470]++;
translation = tml;
    _$jscoverage['lib/tr8n.js'][471]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][472]++;
sentences.forEach(function(sentence) {
      _$jscoverage['lib/tr8n.js'][473]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      _$jscoverage['lib/tr8n.js'][474]++;
translation = translation.replace(sentence, sentenceTranslation);
    });
    _$jscoverage['lib/tr8n.js'][476]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][477]++;
return translation;
  }

  _$jscoverage['lib/tr8n.js'][480]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  _$jscoverage['lib/tr8n.js'][481]++;
this.resetContext();
  _$jscoverage['lib/tr8n.js'][482]++;
return translation;
};

_$jscoverage['lib/tr8n.js'][485]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {
  _$jscoverage['lib/tr8n.js'][486]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][486]++;
return false;}

  _$jscoverage['lib/tr8n.js'][487]++;
return (node.childNodes.length > 0);
};

_$jscoverage['lib/tr8n.js'][490]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {
  _$jscoverage['lib/tr8n.js'][491]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    {
_$jscoverage['lib/tr8n.js'][492]++;
return true;}


  _$jscoverage['lib/tr8n.js'][494]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    {
_$jscoverage['lib/tr8n.js'][495]++;
return true;}


  _$jscoverage['lib/tr8n.js'][497]++;
return false;
};

_$jscoverage['lib/tr8n.js'][500]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {
  _$jscoverage['lib/tr8n.js'][501]++;
var buffer = "";
  _$jscoverage['lib/tr8n.js'][502]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][503]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][504]++;
var child = node.childNodes[i];
    _$jscoverage['lib/tr8n.js'][505]++;
if (child.nodeType == 3)                          {
_$jscoverage['lib/tr8n.js'][505]++;
buffer = buffer + child.nodeValue;}

    else
      {
_$jscoverage['lib/tr8n.js'][507]++;
buffer = buffer + self.generateTmlTags(child);}

  }
  _$jscoverage['lib/tr8n.js'][509]++;
var tokenContext = self.generateHtmlToken(node);
  _$jscoverage['lib/tr8n.js'][510]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

  _$jscoverage['lib/tr8n.js'][512]++;
var value = this.sanitizeValue(buffer);

  _$jscoverage['lib/tr8n.js'][514]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][515]++;
return '{' + token + '}';}


  _$jscoverage['lib/tr8n.js'][517]++;
if (this.isShortToken(token, value))
    {
_$jscoverage['lib/tr8n.js'][518]++;
return '[' + token + ': ' + value + ']';}


  _$jscoverage['lib/tr8n.js'][520]++;
return '[' + token + ']' + value + '[/' + token + ']';
};

_$jscoverage['lib/tr8n.js'][523]++;
Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {
  _$jscoverage['lib/tr8n.js'][524]++;
if (this.options[name]) {
    _$jscoverage['lib/tr8n.js'][525]++;
return this.options[name];
  }
  _$jscoverage['lib/tr8n.js'][527]++;
return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);
};

_$jscoverage['lib/tr8n.js'][530]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][531]++;
return this.getOption("debug_format").replace('{$0}', translation);
};

_$jscoverage['lib/tr8n.js'][534]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {
  _$jscoverage['lib/tr8n.js'][535]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  _$jscoverage['lib/tr8n.js'][536]++;
return (tml == '');
};

_$jscoverage['lib/tr8n.js'][539]++;
Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {
  _$jscoverage['lib/tr8n.js'][540]++;
this.debugTokens = this.tokens;
  _$jscoverage['lib/tr8n.js'][541]++;
this.tokens = [].concat(this.context);
};

_$jscoverage['lib/tr8n.js'][544]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {
  _$jscoverage['lib/tr8n.js'][545]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

_$jscoverage['lib/tr8n.js'][548]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {
  _$jscoverage['lib/tr8n.js'][549]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][549]++;
return false;}

  _$jscoverage['lib/tr8n.js'][550]++;
return (node.parentNode.childNodes.length == 1);
};

_$jscoverage['lib/tr8n.js'][553]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {
  _$jscoverage['lib/tr8n.js'][554]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][554]++;
return false;}


  _$jscoverage['lib/tr8n.js'][556]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][557]++;
var child = node.parentNode.childNodes[i];
    _$jscoverage['lib/tr8n.js'][558]++;
if (child != node) {
      _$jscoverage['lib/tr8n.js'][559]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
        {
_$jscoverage['lib/tr8n.js'][560]++;
return true;}

    }
  }

  _$jscoverage['lib/tr8n.js'][564]++;
return false;
};

_$jscoverage['lib/tr8n.js'][567]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {
  _$jscoverage['lib/tr8n.js'][568]++;
return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

_$jscoverage['lib/tr8n.js'][575]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {
  _$jscoverage['lib/tr8n.js'][576]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
};

_$jscoverage['lib/tr8n.js'][579]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {
  _$jscoverage['lib/tr8n.js'][580]++;
return (node.firstChild == null);
};

_$jscoverage['lib/tr8n.js'][583]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {
  _$jscoverage['lib/tr8n.js'][584]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][584]++;
return true;}

  _$jscoverage['lib/tr8n.js'][585]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][588]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {
  _$jscoverage['lib/tr8n.js'][589]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][589]++;
return false;}

  _$jscoverage['lib/tr8n.js'][590]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

_$jscoverage['lib/tr8n.js'][593]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {
  _$jscoverage['lib/tr8n.js'][594]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][594]++;
return false;}

  _$jscoverage['lib/tr8n.js'][595]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][598]++;
Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {
  _$jscoverage['lib/tr8n.js'][599]++;
return value.replace(/^\s+/,'');
};

_$jscoverage['lib/tr8n.js'][602]++;
Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {
  _$jscoverage['lib/tr8n.js'][603]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][603]++;
return text;}


  _$jscoverage['lib/tr8n.js'][605]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  _$jscoverage['lib/tr8n.js'][606]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][607]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][608]++;
token = match.substring(1, match.length - 2);
    _$jscoverage['lib/tr8n.js'][609]++;
self.context[token] = match;
    _$jscoverage['lib/tr8n.js'][610]++;
text = text.replace(match, "{" + token + "}");
  });

  _$jscoverage['lib/tr8n.js'][613]++;
return text;
};

_$jscoverage['lib/tr8n.js'][616]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {
  _$jscoverage['lib/tr8n.js'][617]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][617]++;
return text;}


  _$jscoverage['lib/tr8n.js'][619]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  _$jscoverage['lib/tr8n.js'][620]++;
var tokenName = this.getOption("data_tokens.numeric_name");

  _$jscoverage['lib/tr8n.js'][622]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][623]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][624]++;
value = match.replace(/[,;]\s/, '');
    _$jscoverage['lib/tr8n.js'][625]++;
token = self.contextualize(tokenName, value);
    _$jscoverage['lib/tr8n.js'][626]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  _$jscoverage['lib/tr8n.js'][629]++;
return text;
};

_$jscoverage['lib/tr8n.js'][632]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {
  _$jscoverage['lib/tr8n.js'][633]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][634]++;
var attributes = node.attributes;
  _$jscoverage['lib/tr8n.js'][635]++;
var attributesHash = {};
  _$jscoverage['lib/tr8n.js'][636]++;
value = ((value == null) ? '{0}' : value);

  _$jscoverage['lib/tr8n.js'][638]++;
if (attributes.length == 0) {
    _$jscoverage['lib/tr8n.js'][639]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][640]++;
return '<' + name + '/>';}

    _$jscoverage['lib/tr8n.js'][641]++;
return '<' + name + '>' + value + '</' + name + '>';
  }

  _$jscoverage['lib/tr8n.js'][644]++;
for(var i=0; i<attributes.length; i++) {
    _$jscoverage['lib/tr8n.js'][645]++;
attributesHash[attributes[i].name] = attributes[i].value;
  }

  _$jscoverage['lib/tr8n.js'][648]++;
var keys = Object.keys(attributesHash);
  _$jscoverage['lib/tr8n.js'][649]++;
keys.sort();

  _$jscoverage['lib/tr8n.js'][651]++;
var attr = [];
  _$jscoverage['lib/tr8n.js'][652]++;
keys.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][653]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    _$jscoverage['lib/tr8n.js'][654]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  _$jscoverage['lib/tr8n.js'][656]++;
attr = attr.join(' ');

  _$jscoverage['lib/tr8n.js'][658]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][659]++;
return '<' + name + ' ' + attr + '/>';}


  _$jscoverage['lib/tr8n.js'][661]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

_$jscoverage['lib/tr8n.js'][664]++;
Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {
  _$jscoverage['lib/tr8n.js'][665]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][666]++;
var map = this.getOption("name_mapping");
  _$jscoverage['lib/tr8n.js'][667]++;
name = (map[name] != null) ? map[name] : name;
  _$jscoverage['lib/tr8n.js'][668]++;
return name;
};

_$jscoverage['lib/tr8n.js'][671]++;
Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {
  _$jscoverage['lib/tr8n.js'][672]++;
if (this.tokens[name] && this.tokens[name] != context) {
    _$jscoverage['lib/tr8n.js'][673]++;
var index = 0;
    _$jscoverage['lib/tr8n.js'][674]++;
var matches = name.match(/\d+$/);
    _$jscoverage['lib/tr8n.js'][675]++;
if (matches && matches.length > 0) {
      _$jscoverage['lib/tr8n.js'][676]++;
index = parseInt(matches[matches.length-1]);
      _$jscoverage['lib/tr8n.js'][677]++;
name = name.replace("" + index, '');
    }
    _$jscoverage['lib/tr8n.js'][679]++;
name = name + (index + 1);
    _$jscoverage['lib/tr8n.js'][680]++;
return this.contextualize(name, context);
  }

  _$jscoverage['lib/tr8n.js'][683]++;
this.tokens[name] = context;
  _$jscoverage['lib/tr8n.js'][684]++;
return name;
};

_$jscoverage['lib/tr8n.js'][687]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {
  _$jscoverage['lib/tr8n.js'][688]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][689]++;
this.debugTree(doc, 0);
};

_$jscoverage['lib/tr8n.js'][692]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {
  _$jscoverage['lib/tr8n.js'][693]++;
var padding = Array(depth+1).join('=');

  _$jscoverage['lib/tr8n.js'][695]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  _$jscoverage['lib/tr8n.js'][697]++;
if (node.childNodes) {
    _$jscoverage['lib/tr8n.js'][698]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][699]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][700]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][701]++;
self.debugTree(child, depth+1);
    }
  }
};

_$jscoverage['lib/tr8n.js'][706]++;
Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {
  _$jscoverage['lib/tr8n.js'][707]++;
var info = [];
  _$jscoverage['lib/tr8n.js'][708]++;
info.push(node.nodeType);

  _$jscoverage['lib/tr8n.js'][710]++;
if (node.nodeType == 1)
    {
_$jscoverage['lib/tr8n.js'][711]++;
info.push(node.tagName);}


  _$jscoverage['lib/tr8n.js'][713]++;
if (this.isInlineNode(node)) {
    _$jscoverage['lib/tr8n.js'][714]++;
info.push("inline");
    _$jscoverage['lib/tr8n.js'][715]++;
if (this.hasInlineOrTextSiblings(node))
      {
_$jscoverage['lib/tr8n.js'][716]++;
info.push("sentence");}

    else
      {
_$jscoverage['lib/tr8n.js'][718]++;
info.push("only translatable");}

  }

  _$jscoverage['lib/tr8n.js'][721]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][722]++;
info.push("self closing");}


  _$jscoverage['lib/tr8n.js'][724]++;
if (this.isOnlyChild(node))
    {
_$jscoverage['lib/tr8n.js'][725]++;
info.push("only child");}


  _$jscoverage['lib/tr8n.js'][727]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][728]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


  _$jscoverage['lib/tr8n.js'][730]++;
return "[" + info.join(", ") + "]";
};
;;;;;;;;;;;;;;;;;;;_$jscoverage['lib/tr8n.js'][732]++;
var program = require('commander');

_$jscoverage['lib/tr8n.js'][734]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);



_$jscoverage['lib/tr8n.js'][743]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][744]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][745]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][746]++;
exports.Utils = Tr8n.Utils;


_$jscoverage['lib/tr8n.js'][749]++;
exports.configure = Tr8n.configure;
