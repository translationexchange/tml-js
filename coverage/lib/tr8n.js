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
'',
'Tr8n.Utils.unique = function(elements) {',
'  return elements.reverse().filter(function (e, i, arr) {',
'    return arr.indexOf(e, i+1) === -1;',
'  }).reverse();',
'};',
'',
'Tr8n.Utils.extend = function(destination, source) {',
'  for (var property in source)',
'    destination[property] = source[property];',
'  return destination;',
'};;',
'Tr8n.Configuration = function() {',
'  this.initDefaultTokens();',
'  this.initTranslatorOptions();',
'  this.currentLanguage = new Tr8n.Language();',
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
';',
'Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {',
'  this.label = label;',
'  this.context = context || {};',
'  this.options = options || {};',
'  this.tokens = [];',
'};',
'',
'Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {',
'  return [',
'    [/(\\{[^_:][\\w]*(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Data],',
'    [/(\\{[^_:.][\\w]*(\\.[\\w]+)(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Method],',
'    [/(\\{[^_:|][\\w]*(:[\\w]+)*(::[\\w]+)*\\s*\\|\\|?[^{^}]+\\})/, Tr8n.Tokens.Piped]',
'  ];',
'};',
'',
'Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {',
'  var self = this;',
'  self.tokens = [];',
'  self.supportedTokens().forEach(function(tokenInfo) {',
'    var matches = self.label.match(tokensInfo[0]);',
'    if (matches) {',
'      Tr8n.Utils.unique(matches).forEach(function(match) {',
'        self.tokens.push(new tokenInfo[1](self.label, match));',
'      });',
'    }',
'  });',
'};',
'',
'Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {',
'  if (this.options["allowed_tokens"] == null) return true;',
'  return (this.options["allowed_tokens"].indexOf(token.name) != -1);',
'};',
'',
'Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {',
'  var label = this.label;',
'  var self = this;',
'  self.tokens.forEach(function(token) {',
'    if (self.isTokenAllowed(token)) {',
'      label = token.substitute(label, self.context, language, options);',
'    }',
'  });',
'  return label;',
'};',
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
'  var padding = new Array(depth+1).join(\'=\');',
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
';;;;;;;;;',
'Tr8n.Language = function(attrs) {',
'  this.attrs = attrs;',
'};',
'',
'Tr8n.Language.prototype.translate = function(label, description, tokens, options) {',
'  return label;',
'};',
';;;;;var program = require(\'commander\');',
'',
'program.version(\'0.1.1\')',
'  .option(\'-l, --label\', \'Label to be translated\')',
'  .option(\'-d, --description\', \'Description of the label\')',
'  .option(\'-t, --tokens\', \'Tokens to be substituted\')',
'  .option(\'-o, --options\', \'Options\')',
'  .parse(process.argv);',
'',
'',
'Tr8n.config = new Tr8n.Configuration();',
'',
'exports.RulesEngine = Tr8n.RulesEngine;',
'exports.Tokenizers = Tr8n.Tokenizers;',
'exports.Decorators = Tr8n.Decorators;',
'exports.Utils = Tr8n.Utils;',
'',
'',
'exports.configure = Tr8n.configure;',
''];
_$jscoverage['lib/tr8n.js'][441]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][442]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][446]=0;
_$jscoverage['lib/tr8n.js'][17]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][449]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][28]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][23]=0;
_$jscoverage['lib/tr8n.js'][26]=0;
_$jscoverage['lib/tr8n.js'][459]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][457]=0;
_$jscoverage['lib/tr8n.js'][51]=0;
_$jscoverage['lib/tr8n.js'][47]=0;
_$jscoverage['lib/tr8n.js'][50]=0;
_$jscoverage['lib/tr8n.js'][46]=0;
_$jscoverage['lib/tr8n.js'][48]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][467]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][122]=0;
_$jscoverage['lib/tr8n.js'][52]=0;
_$jscoverage['lib/tr8n.js'][53]=0;
_$jscoverage['lib/tr8n.js'][57]=0;
_$jscoverage['lib/tr8n.js'][56]=0;
_$jscoverage['lib/tr8n.js'][123]=0;
_$jscoverage['lib/tr8n.js'][123]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][136]=0;
_$jscoverage['lib/tr8n.js'][135]=0;
_$jscoverage['lib/tr8n.js'][125]=0;
_$jscoverage['lib/tr8n.js'][129]=0;
_$jscoverage['lib/tr8n.js'][129]=0;
_$jscoverage['lib/tr8n.js'][130]=0;
_$jscoverage['lib/tr8n.js'][131]=0;
_$jscoverage['lib/tr8n.js'][132]=0;
_$jscoverage['lib/tr8n.js'][128]=0;
_$jscoverage['lib/tr8n.js'][484]=0;
_$jscoverage['lib/tr8n.js'][174]=0;
_$jscoverage['lib/tr8n.js'][168]=0;
_$jscoverage['lib/tr8n.js'][170]=0;
_$jscoverage['lib/tr8n.js'][170]=0;
_$jscoverage['lib/tr8n.js'][171]=0;
_$jscoverage['lib/tr8n.js'][172]=0;
_$jscoverage['lib/tr8n.js'][173]=0;
_$jscoverage['lib/tr8n.js'][173]=0;
_$jscoverage['lib/tr8n.js'][174]=0;
_$jscoverage['lib/tr8n.js'][167]=0;
_$jscoverage['lib/tr8n.js'][169]=0;
_$jscoverage['lib/tr8n.js'][475]=0;
_$jscoverage['lib/tr8n.js'][187]=0;
_$jscoverage['lib/tr8n.js'][175]=0;
_$jscoverage['lib/tr8n.js'][176]=0;
_$jscoverage['lib/tr8n.js'][177]=0;
_$jscoverage['lib/tr8n.js'][179]=0;
_$jscoverage['lib/tr8n.js'][179]=0;
_$jscoverage['lib/tr8n.js'][181]=0;
_$jscoverage['lib/tr8n.js'][182]=0;
_$jscoverage['lib/tr8n.js'][183]=0;
_$jscoverage['lib/tr8n.js'][184]=0;
_$jscoverage['lib/tr8n.js'][185]=0;
_$jscoverage['lib/tr8n.js'][186]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][204]=0;
_$jscoverage['lib/tr8n.js'][202]=0;
_$jscoverage['lib/tr8n.js'][199]=0;
_$jscoverage['lib/tr8n.js'][188]=0;
_$jscoverage['lib/tr8n.js'][189]=0;
_$jscoverage['lib/tr8n.js'][190]=0;
_$jscoverage['lib/tr8n.js'][193]=0;
_$jscoverage['lib/tr8n.js'][193]=0;
_$jscoverage['lib/tr8n.js'][192]=0;
_$jscoverage['lib/tr8n.js'][195]=0;
_$jscoverage['lib/tr8n.js'][197]=0;
_$jscoverage['lib/tr8n.js'][200]=0;
_$jscoverage['lib/tr8n.js'][200]=0;
_$jscoverage['lib/tr8n.js'][511]=0;
_$jscoverage['lib/tr8n.js'][231]=0;
_$jscoverage['lib/tr8n.js'][209]=0;
_$jscoverage['lib/tr8n.js'][206]=0;
_$jscoverage['lib/tr8n.js'][212]=0;
_$jscoverage['lib/tr8n.js'][211]=0;
_$jscoverage['lib/tr8n.js'][214]=0;
_$jscoverage['lib/tr8n.js'][219]=0;
_$jscoverage['lib/tr8n.js'][218]=0;
_$jscoverage['lib/tr8n.js'][222]=0;
_$jscoverage['lib/tr8n.js'][223]=0;
_$jscoverage['lib/tr8n.js'][227]=0;
_$jscoverage['lib/tr8n.js'][226]=0;
_$jscoverage['lib/tr8n.js'][225]=0;
_$jscoverage['lib/tr8n.js'][518]=0;
_$jscoverage['lib/tr8n.js'][250]=0;
_$jscoverage['lib/tr8n.js'][236]=0;
_$jscoverage['lib/tr8n.js'][235]=0;
_$jscoverage['lib/tr8n.js'][241]=0;
_$jscoverage['lib/tr8n.js'][245]=0;
_$jscoverage['lib/tr8n.js'][239]=0;
_$jscoverage['lib/tr8n.js'][246]=0;
_$jscoverage['lib/tr8n.js'][246]=0;
_$jscoverage['lib/tr8n.js'][247]=0;
_$jscoverage['lib/tr8n.js'][247]=0;
_$jscoverage['lib/tr8n.js'][248]=0;
_$jscoverage['lib/tr8n.js'][248]=0;
_$jscoverage['lib/tr8n.js'][249]=0;
_$jscoverage['lib/tr8n.js'][249]=0;
_$jscoverage['lib/tr8n.js'][532]=0;
_$jscoverage['lib/tr8n.js'][279]=0;
_$jscoverage['lib/tr8n.js'][254]=0;
_$jscoverage['lib/tr8n.js'][256]=0;
_$jscoverage['lib/tr8n.js'][255]=0;
_$jscoverage['lib/tr8n.js'][257]=0;
_$jscoverage['lib/tr8n.js'][277]=0;
_$jscoverage['lib/tr8n.js'][258]=0;
_$jscoverage['lib/tr8n.js'][263]=0;
_$jscoverage['lib/tr8n.js'][264]=0;
_$jscoverage['lib/tr8n.js'][265]=0;
_$jscoverage['lib/tr8n.js'][266]=0;
_$jscoverage['lib/tr8n.js'][262]=0;
_$jscoverage['lib/tr8n.js'][270]=0;
_$jscoverage['lib/tr8n.js'][269]=0;
_$jscoverage['lib/tr8n.js'][278]=0;
_$jscoverage['lib/tr8n.js'][543]=0;
_$jscoverage['lib/tr8n.js'][303]=0;
_$jscoverage['lib/tr8n.js'][295]=0;
_$jscoverage['lib/tr8n.js'][281]=0;
_$jscoverage['lib/tr8n.js'][284]=0;
_$jscoverage['lib/tr8n.js'][283]=0;
_$jscoverage['lib/tr8n.js'][282]=0;
_$jscoverage['lib/tr8n.js'][280]=0;
_$jscoverage['lib/tr8n.js'][291]=0;
_$jscoverage['lib/tr8n.js'][291]=0;
_$jscoverage['lib/tr8n.js'][292]=0;
_$jscoverage['lib/tr8n.js'][290]=0;
_$jscoverage['lib/tr8n.js'][296]=0;
_$jscoverage['lib/tr8n.js'][297]=0;
_$jscoverage['lib/tr8n.js'][300]=0;
_$jscoverage['lib/tr8n.js'][299]=0;
_$jscoverage['lib/tr8n.js'][298]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][316]=0;
_$jscoverage['lib/tr8n.js'][306]=0;
_$jscoverage['lib/tr8n.js'][307]=0;
_$jscoverage['lib/tr8n.js'][308]=0;
_$jscoverage['lib/tr8n.js'][309]=0;
_$jscoverage['lib/tr8n.js'][310]=0;
_$jscoverage['lib/tr8n.js'][311]=0;
_$jscoverage['lib/tr8n.js'][312]=0;
_$jscoverage['lib/tr8n.js'][313]=0;
_$jscoverage['lib/tr8n.js'][314]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][345]=0;
_$jscoverage['lib/tr8n.js'][343]=0;
_$jscoverage['lib/tr8n.js'][326]=0;
_$jscoverage['lib/tr8n.js'][334]=0;
_$jscoverage['lib/tr8n.js'][335]=0;
_$jscoverage['lib/tr8n.js'][325]=0;
_$jscoverage['lib/tr8n.js'][339]=0;
_$jscoverage['lib/tr8n.js'][339]=0;
_$jscoverage['lib/tr8n.js'][340]=0;
_$jscoverage['lib/tr8n.js'][338]=0;
_$jscoverage['lib/tr8n.js'][344]=0;
_$jscoverage['lib/tr8n.js'][344]=0;
_$jscoverage['lib/tr8n.js'][317]=0;
_$jscoverage['lib/tr8n.js'][318]=0;
_$jscoverage['lib/tr8n.js'][319]=0;
_$jscoverage['lib/tr8n.js'][320]=0;
_$jscoverage['lib/tr8n.js'][321]=0;
_$jscoverage['lib/tr8n.js'][322]=0;
_$jscoverage['lib/tr8n.js'][576]=0;
_$jscoverage['lib/tr8n.js'][374]=0;
_$jscoverage['lib/tr8n.js'][372]=0;
_$jscoverage['lib/tr8n.js'][362]=0;
_$jscoverage['lib/tr8n.js'][373]=0;
_$jscoverage['lib/tr8n.js'][349]=0;
_$jscoverage['lib/tr8n.js'][357]=0;
_$jscoverage['lib/tr8n.js'][351]=0;
_$jscoverage['lib/tr8n.js'][350]=0;
_$jscoverage['lib/tr8n.js'][353]=0;
_$jscoverage['lib/tr8n.js'][352]=0;
_$jscoverage['lib/tr8n.js'][354]=0;
_$jscoverage['lib/tr8n.js'][348]=0;
_$jscoverage['lib/tr8n.js'][358]=0;
_$jscoverage['lib/tr8n.js'][360]=0;
_$jscoverage['lib/tr8n.js'][359]=0;
_$jscoverage['lib/tr8n.js'][363]=0;
_$jscoverage['lib/tr8n.js'][365]=0;
_$jscoverage['lib/tr8n.js'][367]=0;
_$jscoverage['lib/tr8n.js'][368]=0;
_$jscoverage['lib/tr8n.js'][366]=0;
_$jscoverage['lib/tr8n.js'][370]=0;
_$jscoverage['lib/tr8n.js'][364]=0;
_$jscoverage['lib/tr8n.js'][599]=0;
_$jscoverage['lib/tr8n.js'][406]=0;
_$jscoverage['lib/tr8n.js'][378]=0;
_$jscoverage['lib/tr8n.js'][379]=0;
_$jscoverage['lib/tr8n.js'][383]=0;
_$jscoverage['lib/tr8n.js'][382]=0;
_$jscoverage['lib/tr8n.js'][387]=0;
_$jscoverage['lib/tr8n.js'][388]=0;
_$jscoverage['lib/tr8n.js'][388]=0;
_$jscoverage['lib/tr8n.js'][390]=0;
_$jscoverage['lib/tr8n.js'][402]=0;
_$jscoverage['lib/tr8n.js'][391]=0;
_$jscoverage['lib/tr8n.js'][395]=0;
_$jscoverage['lib/tr8n.js'][394]=0;
_$jscoverage['lib/tr8n.js'][393]=0;
_$jscoverage['lib/tr8n.js'][399]=0;
_$jscoverage['lib/tr8n.js'][386]=0;
_$jscoverage['lib/tr8n.js'][403]=0;
_$jscoverage['lib/tr8n.js'][403]=0;
_$jscoverage['lib/tr8n.js'][404]=0;
_$jscoverage['lib/tr8n.js'][404]=0;
_$jscoverage['lib/tr8n.js'][612]=0;
_$jscoverage['lib/tr8n.js'][438]=0;
_$jscoverage['lib/tr8n.js'][424]=0;
_$jscoverage['lib/tr8n.js'][434]=0;
_$jscoverage['lib/tr8n.js'][437]=0;
_$jscoverage['lib/tr8n.js'][431]=0;
_$jscoverage['lib/tr8n.js'][410]=0;
_$jscoverage['lib/tr8n.js'][409]=0;
_$jscoverage['lib/tr8n.js'][432]=0;
_$jscoverage['lib/tr8n.js'][413]=0;
_$jscoverage['lib/tr8n.js'][412]=0;
_$jscoverage['lib/tr8n.js'][416]=0;
_$jscoverage['lib/tr8n.js'][430]=0;
_$jscoverage['lib/tr8n.js'][415]=0;
_$jscoverage['lib/tr8n.js'][418]=0;
_$jscoverage['lib/tr8n.js'][429]=0;
_$jscoverage['lib/tr8n.js'][408]=0;
_$jscoverage['lib/tr8n.js'][421]=0;
_$jscoverage['lib/tr8n.js'][425]=0;
_$jscoverage['lib/tr8n.js'][428]=0;
_$jscoverage['lib/tr8n.js'][425]=0;
_$jscoverage['lib/tr8n.js'][427]=0;
_$jscoverage['lib/tr8n.js'][635]=0;
_$jscoverage['lib/tr8n.js'][475]=0;
_$jscoverage['lib/tr8n.js'][474]=0;
_$jscoverage['lib/tr8n.js'][443]=0;
_$jscoverage['lib/tr8n.js'][447]=0;
_$jscoverage['lib/tr8n.js'][448]=0;
_$jscoverage['lib/tr8n.js'][445]=0;
_$jscoverage['lib/tr8n.js'][470]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][452]=0;
_$jscoverage['lib/tr8n.js'][458]=0;
_$jscoverage['lib/tr8n.js'][460]=0;
_$jscoverage['lib/tr8n.js'][464]=0;
_$jscoverage['lib/tr8n.js'][466]=0;
_$jscoverage['lib/tr8n.js'][473]=0;
_$jscoverage['lib/tr8n.js'][469]=0;
_$jscoverage['lib/tr8n.js'][463]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][495]=0;
_$jscoverage['lib/tr8n.js'][477]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][479]=0;
_$jscoverage['lib/tr8n.js'][482]=0;
_$jscoverage['lib/tr8n.js'][481]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][488]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][485]=0;
_$jscoverage['lib/tr8n.js'][491]=0;
_$jscoverage['lib/tr8n.js'][652]=0;
_$jscoverage['lib/tr8n.js'][516]=0;
_$jscoverage['lib/tr8n.js'][499]=0;
_$jscoverage['lib/tr8n.js'][496]=0;
_$jscoverage['lib/tr8n.js'][515]=0;
_$jscoverage['lib/tr8n.js'][504]=0;
_$jscoverage['lib/tr8n.js'][503]=0;
_$jscoverage['lib/tr8n.js'][514]=0;
_$jscoverage['lib/tr8n.js'][506]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][507]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][511]=0;
_$jscoverage['lib/tr8n.js'][502]=0;
_$jscoverage['lib/tr8n.js'][667]=0;
_$jscoverage['lib/tr8n.js'][533]=0;
_$jscoverage['lib/tr8n.js'][531]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][519]=0;
_$jscoverage['lib/tr8n.js'][520]=0;
_$jscoverage['lib/tr8n.js'][532]=0;
_$jscoverage['lib/tr8n.js'][522]=0;
_$jscoverage['lib/tr8n.js'][523]=0;
_$jscoverage['lib/tr8n.js'][526]=0;
_$jscoverage['lib/tr8n.js'][527]=0;
_$jscoverage['lib/tr8n.js'][528]=0;
_$jscoverage['lib/tr8n.js'][661]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][551]=0;
_$jscoverage['lib/tr8n.js'][551]=0;
_$jscoverage['lib/tr8n.js'][538]=0;
_$jscoverage['lib/tr8n.js'][537]=0;
_$jscoverage['lib/tr8n.js'][541]=0;
_$jscoverage['lib/tr8n.js'][540]=0;
_$jscoverage['lib/tr8n.js'][550]=0;
_$jscoverage['lib/tr8n.js'][536]=0;
_$jscoverage['lib/tr8n.js'][547]=0;
_$jscoverage['lib/tr8n.js'][546]=0;
_$jscoverage['lib/tr8n.js'][548]=0;
_$jscoverage['lib/tr8n.js'][684]=0;
_$jscoverage['lib/tr8n.js'][570]=0;
_$jscoverage['lib/tr8n.js'][569]=0;
_$jscoverage['lib/tr8n.js'][555]=0;
_$jscoverage['lib/tr8n.js'][556]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][561]=0;
_$jscoverage['lib/tr8n.js'][560]=0;
_$jscoverage['lib/tr8n.js'][563]=0;
_$jscoverage['lib/tr8n.js'][566]=0;
_$jscoverage['lib/tr8n.js'][693]=0;
_$jscoverage['lib/tr8n.js'][590]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][573]=0;
_$jscoverage['lib/tr8n.js'][577]=0;
_$jscoverage['lib/tr8n.js'][571]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][581]=0;
_$jscoverage['lib/tr8n.js'][582]=0;
_$jscoverage['lib/tr8n.js'][580]=0;
_$jscoverage['lib/tr8n.js'][586]=0;
_$jscoverage['lib/tr8n.js'][701]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][601]=0;
_$jscoverage['lib/tr8n.js'][598]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][595]=0;
_$jscoverage['lib/tr8n.js'][593]=0;
_$jscoverage['lib/tr8n.js'][599]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][628]=0;
_$jscoverage['lib/tr8n.js'][609]=0;
_$jscoverage['lib/tr8n.js'][613]=0;
_$jscoverage['lib/tr8n.js'][605]=0;
_$jscoverage['lib/tr8n.js'][604]=0;
_$jscoverage['lib/tr8n.js'][621]=0;
_$jscoverage['lib/tr8n.js'][620]=0;
_$jscoverage['lib/tr8n.js'][625]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][719]=0;
_$jscoverage['lib/tr8n.js'][644]=0;
_$jscoverage['lib/tr8n.js'][643]=0;
_$jscoverage['lib/tr8n.js'][638]=0;
_$jscoverage['lib/tr8n.js'][630]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][633]=0;
_$jscoverage['lib/tr8n.js'][639]=0;
_$jscoverage['lib/tr8n.js'][640]=0;
_$jscoverage['lib/tr8n.js'][639]=0;
_$jscoverage['lib/tr8n.js'][725]=0;
_$jscoverage['lib/tr8n.js'][647]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][650]=0;
_$jscoverage['lib/tr8n.js'][651]=0;
_$jscoverage['lib/tr8n.js'][653]=0;
_$jscoverage['lib/tr8n.js'][654]=0;
_$jscoverage['lib/tr8n.js'][655]=0;
_$jscoverage['lib/tr8n.js'][734]=0;
_$jscoverage['lib/tr8n.js'][678]=0;
_$jscoverage['lib/tr8n.js'][664]=0;
_$jscoverage['lib/tr8n.js'][665]=0;
_$jscoverage['lib/tr8n.js'][669]=0;
_$jscoverage['lib/tr8n.js'][674]=0;
_$jscoverage['lib/tr8n.js'][670]=0;
_$jscoverage['lib/tr8n.js'][677]=0;
_$jscoverage['lib/tr8n.js'][671]=0;
_$jscoverage['lib/tr8n.js'][668]=0;
_$jscoverage['lib/tr8n.js'][745]=0;
_$jscoverage['lib/tr8n.js'][689]=0;
_$jscoverage['lib/tr8n.js'][679]=0;
_$jscoverage['lib/tr8n.js'][680]=0;
_$jscoverage['lib/tr8n.js'][681]=0;
_$jscoverage['lib/tr8n.js'][685]=0;
_$jscoverage['lib/tr8n.js'][686]=0;
_$jscoverage['lib/tr8n.js'][683]=0;
_$jscoverage['lib/tr8n.js'][737]=0;
_$jscoverage['lib/tr8n.js'][703]=0;
_$jscoverage['lib/tr8n.js'][694]=0;
_$jscoverage['lib/tr8n.js'][690]=0;
_$jscoverage['lib/tr8n.js'][696]=0;
_$jscoverage['lib/tr8n.js'][698]=0;
_$jscoverage['lib/tr8n.js'][699]=0;
_$jscoverage['lib/tr8n.js'][697]=0;
_$jscoverage['lib/tr8n.js'][755]=0;
_$jscoverage['lib/tr8n.js'][718]=0;
_$jscoverage['lib/tr8n.js'][709]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][704]=0;
_$jscoverage['lib/tr8n.js'][711]=0;
_$jscoverage['lib/tr8n.js'][713]=0;
_$jscoverage['lib/tr8n.js'][712]=0;
_$jscoverage['lib/tr8n.js'][716]=0;
_$jscoverage['lib/tr8n.js'][758]=0;
_$jscoverage['lib/tr8n.js'][729]=0;
_$jscoverage['lib/tr8n.js'][728]=0;
_$jscoverage['lib/tr8n.js'][724]=0;
_$jscoverage['lib/tr8n.js'][721]=0;
_$jscoverage['lib/tr8n.js'][722]=0;
_$jscoverage['lib/tr8n.js'][720]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][743]=0;
_$jscoverage['lib/tr8n.js'][740]=0;
_$jscoverage['lib/tr8n.js'][733]=0;
_$jscoverage['lib/tr8n.js'][742]=0;
_$jscoverage['lib/tr8n.js'][738]=0;
_$jscoverage['lib/tr8n.js'][732]=0;
_$jscoverage['lib/tr8n.js'][775]=0;
_$jscoverage['lib/tr8n.js'][753]=0;
_$jscoverage['lib/tr8n.js'][752]=0;
_$jscoverage['lib/tr8n.js'][751]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][744]=0;
_$jscoverage['lib/tr8n.js'][778]=0;
_$jscoverage['lib/tr8n.js'][760]=0;
_$jscoverage['lib/tr8n.js'][759]=0;
_$jscoverage['lib/tr8n.js'][756]=0;
_$jscoverage['lib/tr8n.js'][782]=0;
_$jscoverage['lib/tr8n.js'][761]=0;
_$jscoverage['lib/tr8n.js'][785]=0;
_$jscoverage['lib/tr8n.js'][773]=0;
_$jscoverage['lib/tr8n.js'][766]=0;
_$jscoverage['lib/tr8n.js'][767]=0;
_$jscoverage['lib/tr8n.js'][772]=0;
_$jscoverage['lib/tr8n.js'][763]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][779]=0;
_$jscoverage['lib/tr8n.js'][783]=0;
_$jscoverage['lib/tr8n.js'][787]=0;
_$jscoverage['lib/tr8n.js'][795]=0;
_$jscoverage['lib/tr8n.js'][797]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][799]=0;
_$jscoverage['lib/tr8n.js'][800]=0;
_$jscoverage['lib/tr8n.js'][803]=0;
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

_$jscoverage['lib/tr8n.js'][39]++;
Tr8n.Utils.unique = function(elements) {
  _$jscoverage['lib/tr8n.js'][40]++;
return elements.reverse().filter(function (e, i, arr) {
    _$jscoverage['lib/tr8n.js'][41]++;
return arr.indexOf(e, i+1) === -1;
  }).reverse();
};

_$jscoverage['lib/tr8n.js'][45]++;
Tr8n.Utils.extend = function(destination, source) {
  _$jscoverage['lib/tr8n.js'][46]++;
for (var property in source)
    {
_$jscoverage['lib/tr8n.js'][47]++;
destination[property] = source[property];}

  _$jscoverage['lib/tr8n.js'][48]++;
return destination;
};;
_$jscoverage['lib/tr8n.js'][50]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][51]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][52]++;
this.initTranslatorOptions();
  _$jscoverage['lib/tr8n.js'][53]++;
this.currentLanguage = new Tr8n.Language();
};

_$jscoverage['lib/tr8n.js'][56]++;
Tr8n.Configuration.prototype.initDefaultTokens = function() {
  _$jscoverage['lib/tr8n.js'][57]++;
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

_$jscoverage['lib/tr8n.js'][122]++;
Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {
  _$jscoverage['lib/tr8n.js'][123]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][123]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][124]++;
if (typeof this.defaultTokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][124]++;
return null;}

  _$jscoverage['lib/tr8n.js'][125]++;
return new String(this.defaultTokens[format][type][token]);
};

_$jscoverage['lib/tr8n.js'][128]++;
Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  _$jscoverage['lib/tr8n.js'][129]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][129]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][130]++;
this.defaultTokens[format] = this.defaultTokens[format] || {};
  _$jscoverage['lib/tr8n.js'][131]++;
this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};
  _$jscoverage['lib/tr8n.js'][132]++;
this.defaultTokens[format][type][token] = value;
};

_$jscoverage['lib/tr8n.js'][135]++;
Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  _$jscoverage['lib/tr8n.js'][136]++;
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


;
_$jscoverage['lib/tr8n.js'][167]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][168]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][169]++;
this.ctx = ctx || {
    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][170]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][170]++;
return r; }.bind(this),
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][171]++;
return expr; }.bind(this),
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][172]++;
return list[1]; }.bind(this),
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][173]++;
list.shift(); _$jscoverage['lib/tr8n.js'][173]++;
return list; }.bind(this),
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][174]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][174]++;
return cell; }.bind(this),
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][175]++;
return (l == r); }.bind(this),
    'atom':     function(a)       { _$jscoverage['lib/tr8n.js'][176]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][177]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ _$jscoverage['lib/tr8n.js'][179]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][179]++;
return r; }.bind(this),

    '=':        function(args){ _$jscoverage['lib/tr8n.js'][181]++;
return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ _$jscoverage['lib/tr8n.js'][182]++;
return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ _$jscoverage['lib/tr8n.js'][183]++;
return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ _$jscoverage['lib/tr8n.js'][184]++;
return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ _$jscoverage['lib/tr8n.js'][185]++;
return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ _$jscoverage['lib/tr8n.js'][186]++;
return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ _$jscoverage['lib/tr8n.js'][187]++;
return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ _$jscoverage['lib/tr8n.js'][188]++;
return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ _$jscoverage['lib/tr8n.js'][189]++;
return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ _$jscoverage['lib/tr8n.js'][190]++;
return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      _$jscoverage['lib/tr8n.js'][192]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][193]++;
if (!this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][193]++;
return false;}

      }
      _$jscoverage['lib/tr8n.js'][195]++;
return true;
    }.bind(this),
    'and':      function(args){ _$jscoverage['lib/tr8n.js'][197]++;
return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      _$jscoverage['lib/tr8n.js'][199]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][200]++;
if (this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][200]++;
return true;}

      }
      _$jscoverage['lib/tr8n.js'][202]++;
return false;
    }.bind(this),
    'or':      function(args){ _$jscoverage['lib/tr8n.js'][204]++;
return this.ctx['||'](args); }.bind(this)
  };
  _$jscoverage['lib/tr8n.js'][206]++;
return this;
}

_$jscoverage['lib/tr8n.js'][209]++;
Tr8n.RulesEngine.Evaluator.prototype = {
  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][211]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][212]++;
return this.ctx[fn](args);
    }
    _$jscoverage['lib/tr8n.js'][214]++;
return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    _$jscoverage['lib/tr8n.js'][218]++;
if (this.ctx['atom'](sexpr)) {
      _$jscoverage['lib/tr8n.js'][219]++;
return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    _$jscoverage['lib/tr8n.js'][222]++;
var fn = sexpr[0];
    _$jscoverage['lib/tr8n.js'][223]++;
var args = sexpr.slice(1);

    _$jscoverage['lib/tr8n.js'][225]++;
if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][226]++;
args = args.map(function(arg) {
        _$jscoverage['lib/tr8n.js'][227]++;
return this.evaluate(arg);
      }.bind(this));
    }

    _$jscoverage['lib/tr8n.js'][231]++;
return this.apply(fn, args);
  }
}
;
_$jscoverage['lib/tr8n.js'][235]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][236]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][239]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][241]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][245]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][246]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][246]++;
return;}

  	_$jscoverage['lib/tr8n.js'][247]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][247]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][248]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][248]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][249]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][249]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][250]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][254]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][255]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][256]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][257]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][258]++;
return list;
  }
}
;
_$jscoverage['lib/tr8n.js'][262]++;
Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {
  _$jscoverage['lib/tr8n.js'][263]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][264]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][265]++;
this.options = options || {};
  _$jscoverage['lib/tr8n.js'][266]++;
this.tokens = [];
};

_$jscoverage['lib/tr8n.js'][269]++;
Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {
  _$jscoverage['lib/tr8n.js'][270]++;
return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

_$jscoverage['lib/tr8n.js'][277]++;
Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][278]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][279]++;
self.tokens = [];
  _$jscoverage['lib/tr8n.js'][280]++;
self.supportedTokens().forEach(function(tokenInfo) {
    _$jscoverage['lib/tr8n.js'][281]++;
var matches = self.label.match(tokensInfo[0]);
    _$jscoverage['lib/tr8n.js'][282]++;
if (matches) {
      _$jscoverage['lib/tr8n.js'][283]++;
Tr8n.Utils.unique(matches).forEach(function(match) {
        _$jscoverage['lib/tr8n.js'][284]++;
self.tokens.push(new tokenInfo[1](self.label, match));
      });
    }
  });
};

_$jscoverage['lib/tr8n.js'][290]++;
Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][291]++;
if (this.options["allowed_tokens"] == null) {
_$jscoverage['lib/tr8n.js'][291]++;
return true;}

  _$jscoverage['lib/tr8n.js'][292]++;
return (this.options["allowed_tokens"].indexOf(token.name) != -1);
};

_$jscoverage['lib/tr8n.js'][295]++;
Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {
  _$jscoverage['lib/tr8n.js'][296]++;
var label = this.label;
  _$jscoverage['lib/tr8n.js'][297]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][298]++;
self.tokens.forEach(function(token) {
    _$jscoverage['lib/tr8n.js'][299]++;
if (self.isTokenAllowed(token)) {
      _$jscoverage['lib/tr8n.js'][300]++;
label = token.substitute(label, self.context, language, options);
    }
  });
  _$jscoverage['lib/tr8n.js'][303]++;
return label;
};
;
_$jscoverage['lib/tr8n.js'][306]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][307]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][308]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][309]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][310]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][311]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][312]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][313]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][314]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][316]++;
Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][317]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][318]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][319]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][320]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][321]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][322]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][325]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][326]++;
var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  _$jscoverage['lib/tr8n.js'][334]++;
this.fragments = this.label.match(expression);
  _$jscoverage['lib/tr8n.js'][335]++;
return this.fragments;
};

_$jscoverage['lib/tr8n.js'][338]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  _$jscoverage['lib/tr8n.js'][339]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][339]++;
return null;}

  _$jscoverage['lib/tr8n.js'][340]++;
return this.fragments[0];
};

_$jscoverage['lib/tr8n.js'][343]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  _$jscoverage['lib/tr8n.js'][344]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][344]++;
return null;}

  _$jscoverage['lib/tr8n.js'][345]++;
return this.fragments.shift();
};

_$jscoverage['lib/tr8n.js'][348]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  _$jscoverage['lib/tr8n.js'][349]++;
var token = this.nextFragment();
  _$jscoverage['lib/tr8n.js'][350]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][351]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

  _$jscoverage['lib/tr8n.js'][352]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][353]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

  _$jscoverage['lib/tr8n.js'][354]++;
return token;
};

_$jscoverage['lib/tr8n.js'][357]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  _$jscoverage['lib/tr8n.js'][358]++;
var tree = [name];
  _$jscoverage['lib/tr8n.js'][359]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    {
_$jscoverage['lib/tr8n.js'][360]++;
this.tokens.push(name);}


  _$jscoverage['lib/tr8n.js'][362]++;
if (type == TOKEN_TYPE_SHORT) {
    _$jscoverage['lib/tr8n.js'][363]++;
var first = true;
    _$jscoverage['lib/tr8n.js'][364]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][365]++;
var value = this.parse();
      _$jscoverage['lib/tr8n.js'][366]++;
if (first && typeof value == "string") {
        _$jscoverage['lib/tr8n.js'][367]++;
value = value.replace(/^\s+/,'');
        _$jscoverage['lib/tr8n.js'][368]++;
first = false;
      }
      _$jscoverage['lib/tr8n.js'][370]++;
tree.push(value);
    }
  } else {
_$jscoverage['lib/tr8n.js'][372]++;
if (type == TOKEN_TYPE_LONG) {
    _$jscoverage['lib/tr8n.js'][373]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][374]++;
tree.push(this.parse());
    }
  }}


  _$jscoverage['lib/tr8n.js'][378]++;
this.nextFragment();
  _$jscoverage['lib/tr8n.js'][379]++;
return tree;
};

_$jscoverage['lib/tr8n.js'][382]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][383]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

_$jscoverage['lib/tr8n.js'][386]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  _$jscoverage['lib/tr8n.js'][387]++;
var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  _$jscoverage['lib/tr8n.js'][388]++;
if (defaultDecoration == null) {
_$jscoverage['lib/tr8n.js'][388]++;
return value;}


  _$jscoverage['lib/tr8n.js'][390]++;
var decorationTokenValues = this.context[token];
  _$jscoverage['lib/tr8n.js'][391]++;
defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  _$jscoverage['lib/tr8n.js'][393]++;
if (decorationTokenValues instanceof Object) {
    _$jscoverage['lib/tr8n.js'][394]++;
Object.keys(decorationTokenValues).forEach(function (key) {
      _$jscoverage['lib/tr8n.js'][395]++;
defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  _$jscoverage['lib/tr8n.js'][399]++;
return defaultDecoration;
};

_$jscoverage['lib/tr8n.js'][402]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  _$jscoverage['lib/tr8n.js'][403]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][403]++;
return value;}

  _$jscoverage['lib/tr8n.js'][404]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][404]++;
return value;}


  _$jscoverage['lib/tr8n.js'][406]++;
var method = this.context[token];

  _$jscoverage['lib/tr8n.js'][408]++;
if (method != null) {
    _$jscoverage['lib/tr8n.js'][409]++;
if (typeof method === 'string')
      {
_$jscoverage['lib/tr8n.js'][410]++;
return method.replace(PLACEHOLDER, value);}


    _$jscoverage['lib/tr8n.js'][412]++;
if (typeof method === 'function')
      {
_$jscoverage['lib/tr8n.js'][413]++;
return method(value);}


    _$jscoverage['lib/tr8n.js'][415]++;
if (typeof method === 'object')
      {
_$jscoverage['lib/tr8n.js'][416]++;
return this.defaultDecoration(token, value);}


    _$jscoverage['lib/tr8n.js'][418]++;
return value;
  }

  _$jscoverage['lib/tr8n.js'][421]++;
return this.defaultDecoration(token, value);
};

_$jscoverage['lib/tr8n.js'][424]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  _$jscoverage['lib/tr8n.js'][425]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][425]++;
return expr;}


  _$jscoverage['lib/tr8n.js'][427]++;
var token = expr[0];
  _$jscoverage['lib/tr8n.js'][428]++;
expr.shift();
  _$jscoverage['lib/tr8n.js'][429]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][430]++;
var value = [];
  _$jscoverage['lib/tr8n.js'][431]++;
expr.forEach(function(obj, index) {
    _$jscoverage['lib/tr8n.js'][432]++;
value.push(self.evaluate(obj));
  });
  _$jscoverage['lib/tr8n.js'][434]++;
return this.apply(token, value.join(''));
};

_$jscoverage['lib/tr8n.js'][437]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  _$jscoverage['lib/tr8n.js'][438]++;
return this.evaluate(this.parse());
};
;
_$jscoverage['lib/tr8n.js'][441]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][442]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][443]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][445]++;
Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][446]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][447]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][448]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][449]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][452]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {
  _$jscoverage['lib/tr8n.js'][453]++;
return this.translateTree(this.doc);
};

_$jscoverage['lib/tr8n.js'][456]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {
  _$jscoverage['lib/tr8n.js'][457]++;
if (this.isNonTranslatableNode(node)) {
    _$jscoverage['lib/tr8n.js'][458]++;
if (node.childNodes.length == 1)
      {
_$jscoverage['lib/tr8n.js'][459]++;
return node.childNodes[0].nodeValue;}

    _$jscoverage['lib/tr8n.js'][460]++;
return "";
  }

  _$jscoverage['lib/tr8n.js'][463]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][464]++;
return this.translateTml(node.nodeValue);}


  _$jscoverage['lib/tr8n.js'][466]++;
var html = "";
  _$jscoverage['lib/tr8n.js'][467]++;
var buffer = "";

  _$jscoverage['lib/tr8n.js'][469]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][470]++;
var child = node.childNodes[i];


    _$jscoverage['lib/tr8n.js'][473]++;
if (child.nodeType == 3) {
      _$jscoverage['lib/tr8n.js'][474]++;
buffer = buffer + child.nodeValue;
    } else {
_$jscoverage['lib/tr8n.js'][475]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        _$jscoverage['lib/tr8n.js'][475]++;
buffer = buffer + this.generateTmlTags(child);
    } else {
_$jscoverage['lib/tr8n.js'][476]++;
if (this.isSeparatorNode(child)) {          _$jscoverage['lib/tr8n.js'][476]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][477]++;
html = html + this.translateTml(buffer);}

      _$jscoverage['lib/tr8n.js'][478]++;
html = html + this.generateHtmlToken(child);
      _$jscoverage['lib/tr8n.js'][479]++;
buffer = "";
    } else {
      _$jscoverage['lib/tr8n.js'][481]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][482]++;
html = html + this.translateTml(buffer);}


      _$jscoverage['lib/tr8n.js'][484]++;
var containerValue = this.translateTree(child);
      _$jscoverage['lib/tr8n.js'][485]++;
if (this.isIgnoredNode(child)) {
        _$jscoverage['lib/tr8n.js'][486]++;
html = html + containerValue;
      } else {
        _$jscoverage['lib/tr8n.js'][488]++;
html = html + this.generateHtmlToken(child, containerValue);
      }

      _$jscoverage['lib/tr8n.js'][491]++;
buffer = "";
    }}
}

  }

  _$jscoverage['lib/tr8n.js'][495]++;
if (buffer != "") {
    _$jscoverage['lib/tr8n.js'][496]++;
html = html + this.translateTml(buffer);
  }

  _$jscoverage['lib/tr8n.js'][499]++;
return html;
};

_$jscoverage['lib/tr8n.js'][502]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {
  _$jscoverage['lib/tr8n.js'][503]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    {
_$jscoverage['lib/tr8n.js'][504]++;
return true;}

  _$jscoverage['lib/tr8n.js'][505]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    {
_$jscoverage['lib/tr8n.js'][506]++;
return true;}

  _$jscoverage['lib/tr8n.js'][507]++;
return false;
};

_$jscoverage['lib/tr8n.js'][510]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {
  _$jscoverage['lib/tr8n.js'][511]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][511]++;
return tml;}



  _$jscoverage['lib/tr8n.js'][514]++;
if (this.getOption("split_sentences")) {
    _$jscoverage['lib/tr8n.js'][515]++;
sentences = Tr8n.Utils.splitSentences(tml);
    _$jscoverage['lib/tr8n.js'][516]++;
translation = tml;
    _$jscoverage['lib/tr8n.js'][517]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][518]++;
sentences.forEach(function(sentence) {
      _$jscoverage['lib/tr8n.js'][519]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      _$jscoverage['lib/tr8n.js'][520]++;
translation = translation.replace(sentence, sentenceTranslation);
    });
    _$jscoverage['lib/tr8n.js'][522]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][523]++;
return translation;
  }

  _$jscoverage['lib/tr8n.js'][526]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  _$jscoverage['lib/tr8n.js'][527]++;
this.resetContext();
  _$jscoverage['lib/tr8n.js'][528]++;
return translation;
};

_$jscoverage['lib/tr8n.js'][531]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {
  _$jscoverage['lib/tr8n.js'][532]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][532]++;
return false;}

  _$jscoverage['lib/tr8n.js'][533]++;
return (node.childNodes.length > 0);
};

_$jscoverage['lib/tr8n.js'][536]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {
  _$jscoverage['lib/tr8n.js'][537]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    {
_$jscoverage['lib/tr8n.js'][538]++;
return true;}


  _$jscoverage['lib/tr8n.js'][540]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    {
_$jscoverage['lib/tr8n.js'][541]++;
return true;}


  _$jscoverage['lib/tr8n.js'][543]++;
return false;
};

_$jscoverage['lib/tr8n.js'][546]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {
  _$jscoverage['lib/tr8n.js'][547]++;
var buffer = "";
  _$jscoverage['lib/tr8n.js'][548]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][549]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][550]++;
var child = node.childNodes[i];
    _$jscoverage['lib/tr8n.js'][551]++;
if (child.nodeType == 3)                          {
_$jscoverage['lib/tr8n.js'][551]++;
buffer = buffer + child.nodeValue;}

    else
      {
_$jscoverage['lib/tr8n.js'][553]++;
buffer = buffer + self.generateTmlTags(child);}

  }
  _$jscoverage['lib/tr8n.js'][555]++;
var tokenContext = self.generateHtmlToken(node);
  _$jscoverage['lib/tr8n.js'][556]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

  _$jscoverage['lib/tr8n.js'][558]++;
var value = this.sanitizeValue(buffer);

  _$jscoverage['lib/tr8n.js'][560]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][561]++;
return '{' + token + '}';}


  _$jscoverage['lib/tr8n.js'][563]++;
if (this.isShortToken(token, value))
    {
_$jscoverage['lib/tr8n.js'][564]++;
return '[' + token + ': ' + value + ']';}


  _$jscoverage['lib/tr8n.js'][566]++;
return '[' + token + ']' + value + '[/' + token + ']';
};

_$jscoverage['lib/tr8n.js'][569]++;
Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {
  _$jscoverage['lib/tr8n.js'][570]++;
if (this.options[name]) {
    _$jscoverage['lib/tr8n.js'][571]++;
return this.options[name];
  }
  _$jscoverage['lib/tr8n.js'][573]++;
return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);
};

_$jscoverage['lib/tr8n.js'][576]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][577]++;
return this.getOption("debug_format").replace('{$0}', translation);
};

_$jscoverage['lib/tr8n.js'][580]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {
  _$jscoverage['lib/tr8n.js'][581]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  _$jscoverage['lib/tr8n.js'][582]++;
return (tml == '');
};

_$jscoverage['lib/tr8n.js'][585]++;
Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {
  _$jscoverage['lib/tr8n.js'][586]++;
this.tokens = [].concat(this.context);
};

_$jscoverage['lib/tr8n.js'][589]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {
  _$jscoverage['lib/tr8n.js'][590]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

_$jscoverage['lib/tr8n.js'][593]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {
  _$jscoverage['lib/tr8n.js'][594]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][594]++;
return false;}

  _$jscoverage['lib/tr8n.js'][595]++;
return (node.parentNode.childNodes.length == 1);
};

_$jscoverage['lib/tr8n.js'][598]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {
  _$jscoverage['lib/tr8n.js'][599]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][599]++;
return false;}


  _$jscoverage['lib/tr8n.js'][601]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][602]++;
var child = node.parentNode.childNodes[i];
    _$jscoverage['lib/tr8n.js'][603]++;
if (child != node) {
      _$jscoverage['lib/tr8n.js'][604]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
        {
_$jscoverage['lib/tr8n.js'][605]++;
return true;}

    }
  }

  _$jscoverage['lib/tr8n.js'][609]++;
return false;
};

_$jscoverage['lib/tr8n.js'][612]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {
  _$jscoverage['lib/tr8n.js'][613]++;
return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

_$jscoverage['lib/tr8n.js'][620]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {
  _$jscoverage['lib/tr8n.js'][621]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
};

_$jscoverage['lib/tr8n.js'][624]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {
  _$jscoverage['lib/tr8n.js'][625]++;
return (node.firstChild == null);
};

_$jscoverage['lib/tr8n.js'][628]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {
  _$jscoverage['lib/tr8n.js'][629]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][629]++;
return true;}

  _$jscoverage['lib/tr8n.js'][630]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][633]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {
  _$jscoverage['lib/tr8n.js'][634]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][634]++;
return false;}

  _$jscoverage['lib/tr8n.js'][635]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

_$jscoverage['lib/tr8n.js'][638]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {
  _$jscoverage['lib/tr8n.js'][639]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][639]++;
return false;}

  _$jscoverage['lib/tr8n.js'][640]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][643]++;
Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {
  _$jscoverage['lib/tr8n.js'][644]++;
return value.replace(/^\s+/,'');
};

_$jscoverage['lib/tr8n.js'][647]++;
Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {
  _$jscoverage['lib/tr8n.js'][648]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][648]++;
return text;}


  _$jscoverage['lib/tr8n.js'][650]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  _$jscoverage['lib/tr8n.js'][651]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][652]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][653]++;
token = match.substring(1, match.length - 2);
    _$jscoverage['lib/tr8n.js'][654]++;
self.context[token] = match;
    _$jscoverage['lib/tr8n.js'][655]++;
text = text.replace(match, "{" + token + "}");
  });

  _$jscoverage['lib/tr8n.js'][658]++;
return text;
};

_$jscoverage['lib/tr8n.js'][661]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {
  _$jscoverage['lib/tr8n.js'][662]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][662]++;
return text;}


  _$jscoverage['lib/tr8n.js'][664]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  _$jscoverage['lib/tr8n.js'][665]++;
var tokenName = this.getOption("data_tokens.numeric_name");

  _$jscoverage['lib/tr8n.js'][667]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][668]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][669]++;
value = match.replace(/[,;]\s/, '');
    _$jscoverage['lib/tr8n.js'][670]++;
token = self.contextualize(tokenName, value);
    _$jscoverage['lib/tr8n.js'][671]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  _$jscoverage['lib/tr8n.js'][674]++;
return text;
};

_$jscoverage['lib/tr8n.js'][677]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {
  _$jscoverage['lib/tr8n.js'][678]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][679]++;
var attributes = node.attributes;
  _$jscoverage['lib/tr8n.js'][680]++;
var attributesHash = {};
  _$jscoverage['lib/tr8n.js'][681]++;
value = ((value == null) ? '{0}' : value);

  _$jscoverage['lib/tr8n.js'][683]++;
if (attributes.length == 0) {
    _$jscoverage['lib/tr8n.js'][684]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][685]++;
return '<' + name + '/>';}

    _$jscoverage['lib/tr8n.js'][686]++;
return '<' + name + '>' + value + '</' + name + '>';
  }

  _$jscoverage['lib/tr8n.js'][689]++;
for(var i=0; i<attributes.length; i++) {
    _$jscoverage['lib/tr8n.js'][690]++;
attributesHash[attributes[i].name] = attributes[i].value;
  }

  _$jscoverage['lib/tr8n.js'][693]++;
var keys = Object.keys(attributesHash);
  _$jscoverage['lib/tr8n.js'][694]++;
keys.sort();

  _$jscoverage['lib/tr8n.js'][696]++;
var attr = [];
  _$jscoverage['lib/tr8n.js'][697]++;
keys.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][698]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    _$jscoverage['lib/tr8n.js'][699]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  _$jscoverage['lib/tr8n.js'][701]++;
attr = attr.join(' ');

  _$jscoverage['lib/tr8n.js'][703]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][704]++;
return '<' + name + ' ' + attr + '/>';}


  _$jscoverage['lib/tr8n.js'][706]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

_$jscoverage['lib/tr8n.js'][709]++;
Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {
  _$jscoverage['lib/tr8n.js'][710]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][711]++;
var map = this.getOption("name_mapping");
  _$jscoverage['lib/tr8n.js'][712]++;
name = (map[name] != null) ? map[name] : name;
  _$jscoverage['lib/tr8n.js'][713]++;
return name;
};

_$jscoverage['lib/tr8n.js'][716]++;
Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {
  _$jscoverage['lib/tr8n.js'][717]++;
if (this.tokens[name] && this.tokens[name] != context) {
    _$jscoverage['lib/tr8n.js'][718]++;
var index = 0;
    _$jscoverage['lib/tr8n.js'][719]++;
var matches = name.match(/\d+$/);
    _$jscoverage['lib/tr8n.js'][720]++;
if (matches && matches.length > 0) {
      _$jscoverage['lib/tr8n.js'][721]++;
index = parseInt(matches[matches.length-1]);
      _$jscoverage['lib/tr8n.js'][722]++;
name = name.replace("" + index, '');
    }
    _$jscoverage['lib/tr8n.js'][724]++;
name = name + (index + 1);
    _$jscoverage['lib/tr8n.js'][725]++;
return this.contextualize(name, context);
  }

  _$jscoverage['lib/tr8n.js'][728]++;
this.tokens[name] = context;
  _$jscoverage['lib/tr8n.js'][729]++;
return name;
};

_$jscoverage['lib/tr8n.js'][732]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {
  _$jscoverage['lib/tr8n.js'][733]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][734]++;
this.debugTree(doc, 0);
};

_$jscoverage['lib/tr8n.js'][737]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {
  _$jscoverage['lib/tr8n.js'][738]++;
var padding = new Array(depth+1).join('=');

  _$jscoverage['lib/tr8n.js'][740]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  _$jscoverage['lib/tr8n.js'][742]++;
if (node.childNodes) {
    _$jscoverage['lib/tr8n.js'][743]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][744]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][745]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][746]++;
self.debugTree(child, depth+1);
    }
  }
};

_$jscoverage['lib/tr8n.js'][751]++;
Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {
  _$jscoverage['lib/tr8n.js'][752]++;
var info = [];
  _$jscoverage['lib/tr8n.js'][753]++;
info.push(node.nodeType);

  _$jscoverage['lib/tr8n.js'][755]++;
if (node.nodeType == 1)
    {
_$jscoverage['lib/tr8n.js'][756]++;
info.push(node.tagName);}


  _$jscoverage['lib/tr8n.js'][758]++;
if (this.isInlineNode(node)) {
    _$jscoverage['lib/tr8n.js'][759]++;
info.push("inline");
    _$jscoverage['lib/tr8n.js'][760]++;
if (this.hasInlineOrTextSiblings(node))
      {
_$jscoverage['lib/tr8n.js'][761]++;
info.push("sentence");}

    else
      {
_$jscoverage['lib/tr8n.js'][763]++;
info.push("only translatable");}

  }

  _$jscoverage['lib/tr8n.js'][766]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][767]++;
info.push("self closing");}


  _$jscoverage['lib/tr8n.js'][769]++;
if (this.isOnlyChild(node))
    {
_$jscoverage['lib/tr8n.js'][770]++;
info.push("only child");}


  _$jscoverage['lib/tr8n.js'][772]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][773]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


  _$jscoverage['lib/tr8n.js'][775]++;
return "[" + info.join(", ") + "]";
};
;;;;;;;;;
_$jscoverage['lib/tr8n.js'][778]++;
Tr8n.Language = function(attrs) {
  _$jscoverage['lib/tr8n.js'][779]++;
this.attrs = attrs;
};

_$jscoverage['lib/tr8n.js'][782]++;
Tr8n.Language.prototype.translate = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][783]++;
return label;
};
;;;;;_$jscoverage['lib/tr8n.js'][785]++;
var program = require('commander');

_$jscoverage['lib/tr8n.js'][787]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


_$jscoverage['lib/tr8n.js'][795]++;
Tr8n.config = new Tr8n.Configuration();

_$jscoverage['lib/tr8n.js'][797]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][798]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][799]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][800]++;
exports.Utils = Tr8n.Utils;


_$jscoverage['lib/tr8n.js'][803]++;
exports.configure = Tr8n.configure;
