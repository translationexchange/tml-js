if (typeof _$jscoverage === 'undefined') _$jscoverage = {};
if (typeof _$jscoverage['lib/tr8n.js'] === 'undefined'){_$jscoverage['lib/tr8n.js']=[];
_$jscoverage['lib/tr8n.js'].source=['',
'var MD5 = function (string) {',
' ',
'  function RotateLeft(lValue, iShiftBits) {',
'    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));',
'  }',
' ',
'  function AddUnsigned(lX,lY) {',
'    var lX4,lY4,lX8,lY8,lResult;',
'    lX8 = (lX & 0x80000000);',
'    lY8 = (lY & 0x80000000);',
'    lX4 = (lX & 0x40000000);',
'    lY4 = (lY & 0x40000000);',
'    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);',
'    if (lX4 & lY4) {',
'      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);',
'    }',
'    if (lX4 | lY4) {',
'      if (lResult & 0x40000000) {',
'        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);',
'      } else {',
'        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);',
'      }',
'    } else {',
'      return (lResult ^ lX8 ^ lY8);',
'    }',
'  }',
' ',
'  function F(x,y,z) { return (x & y) | ((~x) & z); }',
'  function G(x,y,z) { return (x & z) | (y & (~z)); }',
'  function H(x,y,z) { return (x ^ y ^ z); }',
'  function I(x,y,z) { return (y ^ (x | (~z))); }',
' ',
'  function FF(a,b,c,d,x,s,ac) {',
'    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));',
'    return AddUnsigned(RotateLeft(a, s), b);',
'  };',
' ',
'  function GG(a,b,c,d,x,s,ac) {',
'    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));',
'    return AddUnsigned(RotateLeft(a, s), b);',
'  };',
' ',
'  function HH(a,b,c,d,x,s,ac) {',
'    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));',
'    return AddUnsigned(RotateLeft(a, s), b);',
'  };',
' ',
'  function II(a,b,c,d,x,s,ac) {',
'    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));',
'    return AddUnsigned(RotateLeft(a, s), b);',
'  };',
' ',
'  function ConvertToWordArray(string) {',
'    var lWordCount;',
'    var lMessageLength = string.length;',
'    var lNumberOfWords_temp1=lMessageLength + 8;',
'    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;',
'    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;',
'    var lWordArray=Array(lNumberOfWords-1);',
'    var lBytePosition = 0;',
'    var lByteCount = 0;',
'    while ( lByteCount < lMessageLength ) {',
'      lWordCount = (lByteCount-(lByteCount % 4))/4;',
'      lBytePosition = (lByteCount % 4)*8;',
'      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));',
'      lByteCount++;',
'    }',
'    lWordCount = (lByteCount-(lByteCount % 4))/4;',
'    lBytePosition = (lByteCount % 4)*8;',
'    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);',
'    lWordArray[lNumberOfWords-2] = lMessageLength<<3;',
'    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;',
'    return lWordArray;',
'  };',
' ',
'  function WordToHex(lValue) {',
'    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;',
'    for (lCount = 0;lCount<=3;lCount++) {',
'      lByte = (lValue>>>(lCount*8)) & 255;',
'      WordToHexValue_temp = "0" + lByte.toString(16);',
'      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);',
'    }',
'    return WordToHexValue;',
'  };',
' ',
'  function Utf8Encode(string) {',
'    string = string.replace(/\\r\\n/g,"\\n");',
'    var utftext = "";',
' ',
'    for (var n = 0; n < string.length; n++) {',
' ',
'      var c = string.charCodeAt(n);',
' ',
'      if (c < 128) {',
'        utftext += String.fromCharCode(c);',
'      }',
'      else if((c > 127) && (c < 2048)) {',
'        utftext += String.fromCharCode((c >> 6) | 192);',
'        utftext += String.fromCharCode((c & 63) | 128);',
'      }',
'      else {',
'        utftext += String.fromCharCode((c >> 12) | 224);',
'        utftext += String.fromCharCode(((c >> 6) & 63) | 128);',
'        utftext += String.fromCharCode((c & 63) | 128);',
'      }',
' ',
'    }',
' ',
'    return utftext;',
'  };',
' ',
'  var x=Array();',
'  var k,AA,BB,CC,DD,a,b,c,d;',
'  var S11=7, S12=12, S13=17, S14=22;',
'  var S21=5, S22=9 , S23=14, S24=20;',
'  var S31=4, S32=11, S33=16, S34=23;',
'  var S41=6, S42=10, S43=15, S44=21;',
' ',
'  string = Utf8Encode(string);',
' ',
'  x = ConvertToWordArray(string);',
' ',
'  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;',
' ',
'  for (k=0;k<x.length;k+=16) {',
'    AA=a; BB=b; CC=c; DD=d;',
'    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);',
'    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);',
'    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);',
'    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);',
'    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);',
'    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);',
'    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);',
'    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);',
'    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);',
'    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);',
'    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);',
'    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);',
'    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);',
'    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);',
'    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);',
'    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);',
'    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);',
'    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);',
'    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);',
'    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);',
'    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);',
'    d=GG(d,a,b,c,x[k+10],S22,0x2441453);',
'    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);',
'    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);',
'    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);',
'    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);',
'    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);',
'    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);',
'    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);',
'    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);',
'    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);',
'    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);',
'    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);',
'    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);',
'    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);',
'    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);',
'    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);',
'    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);',
'    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);',
'    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);',
'    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);',
'    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);',
'    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);',
'    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);',
'    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);',
'    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);',
'    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);',
'    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);',
'    a=II(a,b,c,d,x[k+0], S41,0xF4292244);',
'    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);',
'    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);',
'    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);',
'    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);',
'    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);',
'    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);',
'    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);',
'    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);',
'    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);',
'    c=II(c,d,a,b,x[k+6], S43,0xA3014314);',
'    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);',
'    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);',
'    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);',
'    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);',
'    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);',
'    a=AddUnsigned(a,AA);',
'    b=AddUnsigned(b,BB);',
'    c=AddUnsigned(c,CC);',
'    d=AddUnsigned(d,DD);',
'  }',
' ',
'  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);',
' ',
'  return temp.toLowerCase();',
'};',
'var Tr8n = {',
'  "Tokenizers": {},',
'  "Tokens": {},',
'  "RulesEngine": {},',
'  "Decorators": {},',
'  "Utils": {}',
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
';;;;',
'Tr8n.Tokens.Data = function(label, name) {',
'  this.label = label;',
'  this.fullName = name;',
'  this.parseElements();',
'};',
'',
'Tr8n.Tokens.Data.prototype.parseElements = function() {',
'  var nameWithoutParens = this.fullName.substring(1, this.fullName.length-2);',
'  var nameWithoutCaseKeys = nameWithoutParens.split(\'::\')[0].trim();',
'',
'  this.shortName = nameWithoutParens.split(\':\')[0].trim();',
'    this.caseKeys = nameWithoutParens.match(/(::\\w+)/g);',
'  this.contextKeys = nameWithoutCaseKeys.match(/(:\\w+)/g);',
'};',
'',
'Tr8n.Tokens.Data.prototype.contextForLanguage = function(language, opts) {',
'  if (this.contextKeys.length > 0)',
'    return language.contextByKeyword(this.contextKeys[0]);',
'',
'  return language.contextByTokenName(this.shortName);',
'};',
'',
'Tr8n.Tokens.Data.prototype.tokenObject = function(tokenValues, tokenName) {',
'  if (tokenValues == null) return null;',
'  ',
'  var tokenObject = tokenValues[tokenName];',
'  if (typeof tokeObject === \'array\')',
'    return tokenObject[0];',
'',
'  return tokenObject.object || tokenObject;',
'};',
'',
'Tr8n.Tokens.Data.prototype.error = function(msg) {',
'  console.log(this.fullName + " in \\"" + this.label + "\\" : " + msg);',
'  return this.fullName;',
'};',
'',
'',
'Tr8n.Tokens.Data.prototype.tokenValueFromArrayParam = function(arr, language, options) {',
'  options = options || {};',
'  if (arr.lenght == 0)',
'    return this.error("Invalid number of params of an array");',
'',
'  var object = arr[0];',
'  var method = arr.lenght > 1 ? arr[1] : null;',
'',
'  if (typeof object === "array")',
'    return this.tokenValueFromArray(tokenValues, language, options);',
'',
'  if (method == null)',
'    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));',
'',
'  if (method.match(/^@@/))',
'    return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));',
'',
'  if (method.match(/^@/))',
'    return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'',
'    return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));',
'};',
'',
'',
'',
'Tr8n.Tokens.Data.prototype.tokenValueFromHashParam = function(hash, language, options) {',
'  options = options || {};',
'  var value = hash.value;',
'  var object = hash.object;',
'',
'  if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));',
'',
'  if (object == null || typeof object === "undefined")',
'    return this.error("No object or value are provided in the hash");',
'',
'  var attr = hash.attribute;',
'',
'  if (attr == null || typeof attr === "undefined")',
'    return this.error("Missing value for hash token");',
'',
'  return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'};',
'',
'',
'',
'Tr8n.Tokens.Data.prototype.tokenValueFromArray = function(params, language, options) {',
'  var listOptions = {',
'    description: "List joiner",',
'    limit: 4,',
'    separator: ", ",',
'    joiner: \'and\',',
'    less: \'{laquo} less\',',
'    expandable: true,',
'    collapsable: true',
'  };',
'',
'  var objects = params[0];',
'  var method = (params.length > 1 ? params[1] : null);',
'',
'  if (params.length > 2)',
'    listOptions = Tr8n.Utils.merge(listOptions, params[2]);',
'',
'  if (options["skip_decorations"])',
'    listOptions.expandable = false;',
'',
'  var values = [];',
'  for (var obj in objects) {',
'    if (method == null) {',
'      values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'    } else if (typeof method === "string") {',
'      if (method.match(/^@@/))',
'        values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'      else if (method.match(/^@/))',
'        values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'      else',
'        values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));',
'    } else if (typeof method === "object") {',
'      var attribute = method.attribute;',
'      var value = method.value;',
'',
'      if (attribute == null)',
'        return this.error("No attribute is provided for the hash object in the array");',
'',
'      if (!object[attribute])',
'        return this.error("Hash object in the array does not contain such attribute");',
'',
'      attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'',
'      if (value)',
'        values.push(value.replace("{$0}", attribute));',
'      else',
'        values.push(attribute);',
'    } else if (typeof method === "function") {',
'      values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));',
'    }',
'  }',
'',
'  if (values.lenght == 1)',
'    return values[0];',
'',
'  if (!listOptions.joiner || listOptions.joiner == "")',
'    return values.join(listOptions.separator);',
'',
'  var joiner = language.translate(listOptions.joiner, listOptions.description, {}, options);',
'',
'  if (values.length <= listOptions.limit) {',
'    var last = values.pop();',
'    return values.join(listOptions.separator) + " " + joiner + " " + last;',
'  }',
'',
'  var displayedValues = values.slice(0, listOptions.limit);',
'  var remainingValues = values.slice(listOptions.limit);',
'',
'  var result = displayedValues.join(listOptions.separator);',
'  var otherValues = language.translate("{count||other}", listOptions.description, {count: remainingValues.length}, options);',
'',
'  if (listOptions.expandable) {',
'    result = result + " " + joiner + " ";',
'    if (listOptions.remainder && typeof listOptions.remainder === "function")',
'      return result + listOptions.remainder(remainingValues);',
'    return result + otherValues;',
'  }',
'',
'  var key = listOptions.key ? listOptions.key : Tr8n.Utils.generateKey(this.label, values.join(","));',
'',
'  result = result + \'<span id="tr8n_other_link_\' + key + \'"> \' + joiner + \' \';',
'  result = result + \'<a href="#" class="tr8n_other_list_link" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'none\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'inline\'; return false;" + \'">\';',
'',
'  if (listOptions.remainder && typeof listOptions.remainder === "function")',
'    result = result + listOptions.remainder(remainingValues);',
'  else',
'    result = result + otherValues;',
'',
'  result = result + "</a></span>";',
'',
'  result = result + \'<span id="tr8n_other_elements_\' + key + \'" style="display:none">\' + listOptions.separator;',
'  var lastRemaining = remainingValues.pop();',
'  result = result + remainingValues.join(listOptions.separator);',
'  result = result + " " + joiner + " " + lastRemaining;',
'',
'  if (listOptions.collapsable) {',
'    result = result + \' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'inline\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'none\'; return false;" + \'">\';',
'    result = result + language.translate(listOptions.less, listOptions["description"], {}, options);',
'    result = result + "</a>";',
'  }',
'',
'  result = result + "</span>";',
'  return result;',
'};',
'',
'Tr8n.Tokens.Data.prototype.tokenValue = function(tokenValues, language, options) {',
'  options = options || {};',
'  var object = null;',
'',
'  if (tokenValues[this.shortName])',
'    object = tokenValues[this.shortName];',
'  else',
'    object = Tr8n.config.defaultToken(this.shortName);',
'',
'  if (!object)',
'    return this.error("Missing token value");',
'',
'  if (typeof object === "array") {',
'    return this.tokenValueFromArrayParam(object, language, options);',
'  }',
'',
'  if (typeof object === "object") {',
'    return this.tokenValueFromHashParam(object, language, options);',
'  }',
'',
'  return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));',
'};',
'',
'Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {',
'  var lcase = language.languageCase(key);',
'  if (!lcase) return value;',
'  return lcase.apply(value, object, options);',
'};',
'',
'Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {',
'  value = "" . value;',
'',
'  if (!options.safe) {',
'        value = htmlspecialchars(value);',
'  }',
'',
'  if (this.caseKeys.length > 0) {',
'    var self = this;',
'    this.caseKeys.forEach(function(lcase) {',
'      value = self.applyCase(lcase, value, object, language, options);',
'    });',
'  }',
'',
'  return value;',
'};',
'',
'Tr8n.Tokens.Data.prototype.substitute = function(label, tokenValues, language, options) {',
'  var tokenValue = this.tokenValue(tokenValues, language, options);',
'  return label.replace(this.fullName, tokenValue);',
'};',
'',
';Tr8n.Tokens.Method = function() {',
'',
'};',
'',
'',
';;;;;;;',
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
'',
'',
'exports.RulesEngine = Tr8n.RulesEngine;',
'exports.Tokenizers = Tr8n.Tokenizers;',
'exports.Decorators = Tr8n.Decorators;',
'exports.Utils = Tr8n.Utils;',
'',
'',
'exports.configure = function(callback) {',
'  callback(Tr8n.config);',
'};',
'',
'exports.tr = function(label, description, tokens, options) {',
'  return label;',
'};',
''];
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][5]=0;
_$jscoverage['lib/tr8n.js'][4]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][630]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][9]=0;
_$jscoverage['lib/tr8n.js'][10]=0;
_$jscoverage['lib/tr8n.js'][8]=0;
_$jscoverage['lib/tr8n.js'][623]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][640]=0;
_$jscoverage['lib/tr8n.js'][18]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][641]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][20]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][25]=0;
_$jscoverage['lib/tr8n.js'][647]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][651]=0;
_$jscoverage['lib/tr8n.js'][50]=0;
_$jscoverage['lib/tr8n.js'][49]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][46]=0;
_$jscoverage['lib/tr8n.js'][44]=0;
_$jscoverage['lib/tr8n.js'][663]=0;
_$jscoverage['lib/tr8n.js'][62]=0;
_$jscoverage['lib/tr8n.js'][51]=0;
_$jscoverage['lib/tr8n.js'][55]=0;
_$jscoverage['lib/tr8n.js'][56]=0;
_$jscoverage['lib/tr8n.js'][57]=0;
_$jscoverage['lib/tr8n.js'][58]=0;
_$jscoverage['lib/tr8n.js'][59]=0;
_$jscoverage['lib/tr8n.js'][60]=0;
_$jscoverage['lib/tr8n.js'][61]=0;
_$jscoverage['lib/tr8n.js'][54]=0;
_$jscoverage['lib/tr8n.js'][674]=0;
_$jscoverage['lib/tr8n.js'][74]=0;
_$jscoverage['lib/tr8n.js'][73]=0;
_$jscoverage['lib/tr8n.js'][64]=0;
_$jscoverage['lib/tr8n.js'][65]=0;
_$jscoverage['lib/tr8n.js'][66]=0;
_$jscoverage['lib/tr8n.js'][67]=0;
_$jscoverage['lib/tr8n.js'][63]=0;
_$jscoverage['lib/tr8n.js'][69]=0;
_$jscoverage['lib/tr8n.js'][70]=0;
_$jscoverage['lib/tr8n.js'][71]=0;
_$jscoverage['lib/tr8n.js'][72]=0;
_$jscoverage['lib/tr8n.js'][680]=0;
_$jscoverage['lib/tr8n.js'][96]=0;
_$jscoverage['lib/tr8n.js'][78]=0;
_$jscoverage['lib/tr8n.js'][80]=0;
_$jscoverage['lib/tr8n.js'][81]=0;
_$jscoverage['lib/tr8n.js'][82]=0;
_$jscoverage['lib/tr8n.js'][79]=0;
_$jscoverage['lib/tr8n.js'][95]=0;
_$jscoverage['lib/tr8n.js'][91]=0;
_$jscoverage['lib/tr8n.js'][84]=0;
_$jscoverage['lib/tr8n.js'][87]=0;
_$jscoverage['lib/tr8n.js'][77]=0;
_$jscoverage['lib/tr8n.js'][88]=0;
_$jscoverage['lib/tr8n.js'][89]=0;
_$jscoverage['lib/tr8n.js'][93]=0;
_$jscoverage['lib/tr8n.js'][674]=0;
_$jscoverage['lib/tr8n.js'][117]=0;
_$jscoverage['lib/tr8n.js'][99]=0;
_$jscoverage['lib/tr8n.js'][100]=0;
_$jscoverage['lib/tr8n.js'][103]=0;
_$jscoverage['lib/tr8n.js'][104]=0;
_$jscoverage['lib/tr8n.js'][105]=0;
_$jscoverage['lib/tr8n.js'][98]=0;
_$jscoverage['lib/tr8n.js'][110]=0;
_$jscoverage['lib/tr8n.js'][113]=0;
_$jscoverage['lib/tr8n.js'][114]=0;
_$jscoverage['lib/tr8n.js'][115]=0;
_$jscoverage['lib/tr8n.js'][116]=0;
_$jscoverage['lib/tr8n.js'][703]=0;
_$jscoverage['lib/tr8n.js'][129]=0;
_$jscoverage['lib/tr8n.js'][118]=0;
_$jscoverage['lib/tr8n.js'][120]=0;
_$jscoverage['lib/tr8n.js'][122]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][124]=0;
_$jscoverage['lib/tr8n.js'][127]=0;
_$jscoverage['lib/tr8n.js'][127]=0;
_$jscoverage['lib/tr8n.js'][127]=0;
_$jscoverage['lib/tr8n.js'][127]=0;
_$jscoverage['lib/tr8n.js'][128]=0;
_$jscoverage['lib/tr8n.js'][126]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][144]=0;
_$jscoverage['lib/tr8n.js'][130]=0;
_$jscoverage['lib/tr8n.js'][131]=0;
_$jscoverage['lib/tr8n.js'][132]=0;
_$jscoverage['lib/tr8n.js'][133]=0;
_$jscoverage['lib/tr8n.js'][134]=0;
_$jscoverage['lib/tr8n.js'][135]=0;
_$jscoverage['lib/tr8n.js'][136]=0;
_$jscoverage['lib/tr8n.js'][137]=0;
_$jscoverage['lib/tr8n.js'][138]=0;
_$jscoverage['lib/tr8n.js'][139]=0;
_$jscoverage['lib/tr8n.js'][140]=0;
_$jscoverage['lib/tr8n.js'][141]=0;
_$jscoverage['lib/tr8n.js'][142]=0;
_$jscoverage['lib/tr8n.js'][143]=0;
_$jscoverage['lib/tr8n.js'][722]=0;
_$jscoverage['lib/tr8n.js'][160]=0;
_$jscoverage['lib/tr8n.js'][145]=0;
_$jscoverage['lib/tr8n.js'][146]=0;
_$jscoverage['lib/tr8n.js'][147]=0;
_$jscoverage['lib/tr8n.js'][148]=0;
_$jscoverage['lib/tr8n.js'][149]=0;
_$jscoverage['lib/tr8n.js'][150]=0;
_$jscoverage['lib/tr8n.js'][151]=0;
_$jscoverage['lib/tr8n.js'][152]=0;
_$jscoverage['lib/tr8n.js'][153]=0;
_$jscoverage['lib/tr8n.js'][154]=0;
_$jscoverage['lib/tr8n.js'][155]=0;
_$jscoverage['lib/tr8n.js'][156]=0;
_$jscoverage['lib/tr8n.js'][157]=0;
_$jscoverage['lib/tr8n.js'][158]=0;
_$jscoverage['lib/tr8n.js'][159]=0;
_$jscoverage['lib/tr8n.js'][730]=0;
_$jscoverage['lib/tr8n.js'][177]=0;
_$jscoverage['lib/tr8n.js'][161]=0;
_$jscoverage['lib/tr8n.js'][162]=0;
_$jscoverage['lib/tr8n.js'][163]=0;
_$jscoverage['lib/tr8n.js'][164]=0;
_$jscoverage['lib/tr8n.js'][165]=0;
_$jscoverage['lib/tr8n.js'][166]=0;
_$jscoverage['lib/tr8n.js'][167]=0;
_$jscoverage['lib/tr8n.js'][168]=0;
_$jscoverage['lib/tr8n.js'][169]=0;
_$jscoverage['lib/tr8n.js'][170]=0;
_$jscoverage['lib/tr8n.js'][171]=0;
_$jscoverage['lib/tr8n.js'][172]=0;
_$jscoverage['lib/tr8n.js'][173]=0;
_$jscoverage['lib/tr8n.js'][174]=0;
_$jscoverage['lib/tr8n.js'][175]=0;
_$jscoverage['lib/tr8n.js'][176]=0;
_$jscoverage['lib/tr8n.js'][749]=0;
_$jscoverage['lib/tr8n.js'][195]=0;
_$jscoverage['lib/tr8n.js'][194]=0;
_$jscoverage['lib/tr8n.js'][178]=0;
_$jscoverage['lib/tr8n.js'][193]=0;
_$jscoverage['lib/tr8n.js'][179]=0;
_$jscoverage['lib/tr8n.js'][180]=0;
_$jscoverage['lib/tr8n.js'][181]=0;
_$jscoverage['lib/tr8n.js'][182]=0;
_$jscoverage['lib/tr8n.js'][183]=0;
_$jscoverage['lib/tr8n.js'][184]=0;
_$jscoverage['lib/tr8n.js'][185]=0;
_$jscoverage['lib/tr8n.js'][186]=0;
_$jscoverage['lib/tr8n.js'][187]=0;
_$jscoverage['lib/tr8n.js'][188]=0;
_$jscoverage['lib/tr8n.js'][189]=0;
_$jscoverage['lib/tr8n.js'][190]=0;
_$jscoverage['lib/tr8n.js'][191]=0;
_$jscoverage['lib/tr8n.js'][192]=0;
_$jscoverage['lib/tr8n.js'][759]=0;
_$jscoverage['lib/tr8n.js'][221]=0;
_$jscoverage['lib/tr8n.js'][198]=0;
_$jscoverage['lib/tr8n.js'][200]=0;
_$jscoverage['lib/tr8n.js'][202]=0;
_$jscoverage['lib/tr8n.js'][211]=0;
_$jscoverage['lib/tr8n.js'][212]=0;
_$jscoverage['lib/tr8n.js'][214]=0;
_$jscoverage['lib/tr8n.js'][215]=0;
_$jscoverage['lib/tr8n.js'][215]=0;
_$jscoverage['lib/tr8n.js'][216]=0;
_$jscoverage['lib/tr8n.js'][213]=0;
_$jscoverage['lib/tr8n.js'][218]=0;
_$jscoverage['lib/tr8n.js'][210]=0;
_$jscoverage['lib/tr8n.js'][772]=0;
_$jscoverage['lib/tr8n.js'][249]=0;
_$jscoverage['lib/tr8n.js'][234]=0;
_$jscoverage['lib/tr8n.js'][235]=0;
_$jscoverage['lib/tr8n.js'][233]=0;
_$jscoverage['lib/tr8n.js'][240]=0;
_$jscoverage['lib/tr8n.js'][239]=0;
_$jscoverage['lib/tr8n.js'][238]=0;
_$jscoverage['lib/tr8n.js'][246]=0;
_$jscoverage['lib/tr8n.js'][245]=0;
_$jscoverage['lib/tr8n.js'][247]=0;
_$jscoverage['lib/tr8n.js'][244]=0;
_$jscoverage['lib/tr8n.js'][222]=0;
_$jscoverage['lib/tr8n.js'][225]=0;
_$jscoverage['lib/tr8n.js'][229]=0;
_$jscoverage['lib/tr8n.js'][227]=0;
_$jscoverage['lib/tr8n.js'][784]=0;
_$jscoverage['lib/tr8n.js'][334]=0;
_$jscoverage['lib/tr8n.js'][256]=0;
_$jscoverage['lib/tr8n.js'][255]=0;
_$jscoverage['lib/tr8n.js'][322]=0;
_$jscoverage['lib/tr8n.js'][322]=0;
_$jscoverage['lib/tr8n.js'][323]=0;
_$jscoverage['lib/tr8n.js'][323]=0;
_$jscoverage['lib/tr8n.js'][324]=0;
_$jscoverage['lib/tr8n.js'][321]=0;
_$jscoverage['lib/tr8n.js'][328]=0;
_$jscoverage['lib/tr8n.js'][328]=0;
_$jscoverage['lib/tr8n.js'][329]=0;
_$jscoverage['lib/tr8n.js'][250]=0;
_$jscoverage['lib/tr8n.js'][251]=0;
_$jscoverage['lib/tr8n.js'][252]=0;
_$jscoverage['lib/tr8n.js'][330]=0;
_$jscoverage['lib/tr8n.js'][331]=0;
_$jscoverage['lib/tr8n.js'][327]=0;
_$jscoverage['lib/tr8n.js'][804]=0;
_$jscoverage['lib/tr8n.js'][384]=0;
_$jscoverage['lib/tr8n.js'][367]=0;
_$jscoverage['lib/tr8n.js'][369]=0;
_$jscoverage['lib/tr8n.js'][369]=0;
_$jscoverage['lib/tr8n.js'][370]=0;
_$jscoverage['lib/tr8n.js'][371]=0;
_$jscoverage['lib/tr8n.js'][372]=0;
_$jscoverage['lib/tr8n.js'][372]=0;
_$jscoverage['lib/tr8n.js'][373]=0;
_$jscoverage['lib/tr8n.js'][373]=0;
_$jscoverage['lib/tr8n.js'][374]=0;
_$jscoverage['lib/tr8n.js'][375]=0;
_$jscoverage['lib/tr8n.js'][376]=0;
_$jscoverage['lib/tr8n.js'][378]=0;
_$jscoverage['lib/tr8n.js'][378]=0;
_$jscoverage['lib/tr8n.js'][368]=0;
_$jscoverage['lib/tr8n.js'][380]=0;
_$jscoverage['lib/tr8n.js'][366]=0;
_$jscoverage['lib/tr8n.js'][381]=0;
_$jscoverage['lib/tr8n.js'][382]=0;
_$jscoverage['lib/tr8n.js'][383]=0;
_$jscoverage['lib/tr8n.js'][335]=0;
_$jscoverage['lib/tr8n.js'][823]=0;
_$jscoverage['lib/tr8n.js'][417]=0;
_$jscoverage['lib/tr8n.js'][385]=0;
_$jscoverage['lib/tr8n.js'][386]=0;
_$jscoverage['lib/tr8n.js'][387]=0;
_$jscoverage['lib/tr8n.js'][388]=0;
_$jscoverage['lib/tr8n.js'][389]=0;
_$jscoverage['lib/tr8n.js'][408]=0;
_$jscoverage['lib/tr8n.js'][392]=0;
_$jscoverage['lib/tr8n.js'][392]=0;
_$jscoverage['lib/tr8n.js'][391]=0;
_$jscoverage['lib/tr8n.js'][394]=0;
_$jscoverage['lib/tr8n.js'][396]=0;
_$jscoverage['lib/tr8n.js'][399]=0;
_$jscoverage['lib/tr8n.js'][399]=0;
_$jscoverage['lib/tr8n.js'][398]=0;
_$jscoverage['lib/tr8n.js'][401]=0;
_$jscoverage['lib/tr8n.js'][403]=0;
_$jscoverage['lib/tr8n.js'][405]=0;
_$jscoverage['lib/tr8n.js'][411]=0;
_$jscoverage['lib/tr8n.js'][410]=0;
_$jscoverage['lib/tr8n.js'][413]=0;
_$jscoverage['lib/tr8n.js'][839]=0;
_$jscoverage['lib/tr8n.js'][455]=0;
_$jscoverage['lib/tr8n.js'][454]=0;
_$jscoverage['lib/tr8n.js'][421]=0;
_$jscoverage['lib/tr8n.js'][438]=0;
_$jscoverage['lib/tr8n.js'][422]=0;
_$jscoverage['lib/tr8n.js'][426]=0;
_$jscoverage['lib/tr8n.js'][425]=0;
_$jscoverage['lib/tr8n.js'][424]=0;
_$jscoverage['lib/tr8n.js'][430]=0;
_$jscoverage['lib/tr8n.js'][435]=0;
_$jscoverage['lib/tr8n.js'][434]=0;
_$jscoverage['lib/tr8n.js'][440]=0;
_$jscoverage['lib/tr8n.js'][444]=0;
_$jscoverage['lib/tr8n.js'][445]=0;
_$jscoverage['lib/tr8n.js'][445]=0;
_$jscoverage['lib/tr8n.js'][446]=0;
_$jscoverage['lib/tr8n.js'][446]=0;
_$jscoverage['lib/tr8n.js'][447]=0;
_$jscoverage['lib/tr8n.js'][447]=0;
_$jscoverage['lib/tr8n.js'][448]=0;
_$jscoverage['lib/tr8n.js'][448]=0;
_$jscoverage['lib/tr8n.js'][449]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][418]=0;
_$jscoverage['lib/tr8n.js'][846]=0;
_$jscoverage['lib/tr8n.js'][496]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][457]=0;
_$jscoverage['lib/tr8n.js'][462]=0;
_$jscoverage['lib/tr8n.js'][494]=0;
_$jscoverage['lib/tr8n.js'][463]=0;
_$jscoverage['lib/tr8n.js'][464]=0;
_$jscoverage['lib/tr8n.js'][465]=0;
_$jscoverage['lib/tr8n.js'][461]=0;
_$jscoverage['lib/tr8n.js'][469]=0;
_$jscoverage['lib/tr8n.js'][468]=0;
_$jscoverage['lib/tr8n.js'][477]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][480]=0;
_$jscoverage['lib/tr8n.js'][483]=0;
_$jscoverage['lib/tr8n.js'][482]=0;
_$jscoverage['lib/tr8n.js'][481]=0;
_$jscoverage['lib/tr8n.js'][479]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][490]=0;
_$jscoverage['lib/tr8n.js'][490]=0;
_$jscoverage['lib/tr8n.js'][491]=0;
_$jscoverage['lib/tr8n.js'][489]=0;
_$jscoverage['lib/tr8n.js'][495]=0;
_$jscoverage['lib/tr8n.js'][877]=0;
_$jscoverage['lib/tr8n.js'][524]=0;
_$jscoverage['lib/tr8n.js'][499]=0;
_$jscoverage['lib/tr8n.js'][498]=0;
_$jscoverage['lib/tr8n.js'][497]=0;
_$jscoverage['lib/tr8n.js'][502]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][506]=0;
_$jscoverage['lib/tr8n.js'][507]=0;
_$jscoverage['lib/tr8n.js'][508]=0;
_$jscoverage['lib/tr8n.js'][509]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][511]=0;
_$jscoverage['lib/tr8n.js'][512]=0;
_$jscoverage['lib/tr8n.js'][513]=0;
_$jscoverage['lib/tr8n.js'][516]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][518]=0;
_$jscoverage['lib/tr8n.js'][519]=0;
_$jscoverage['lib/tr8n.js'][520]=0;
_$jscoverage['lib/tr8n.js'][521]=0;
_$jscoverage['lib/tr8n.js'][515]=0;
_$jscoverage['lib/tr8n.js'][893]=0;
_$jscoverage['lib/tr8n.js'][567]=0;
_$jscoverage['lib/tr8n.js'][565]=0;
_$jscoverage['lib/tr8n.js'][563]=0;
_$jscoverage['lib/tr8n.js'][538]=0;
_$jscoverage['lib/tr8n.js'][538]=0;
_$jscoverage['lib/tr8n.js'][539]=0;
_$jscoverage['lib/tr8n.js'][561]=0;
_$jscoverage['lib/tr8n.js'][537]=0;
_$jscoverage['lib/tr8n.js'][543]=0;
_$jscoverage['lib/tr8n.js'][556]=0;
_$jscoverage['lib/tr8n.js'][543]=0;
_$jscoverage['lib/tr8n.js'][544]=0;
_$jscoverage['lib/tr8n.js'][542]=0;
_$jscoverage['lib/tr8n.js'][548]=0;
_$jscoverage['lib/tr8n.js'][550]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][552]=0;
_$jscoverage['lib/tr8n.js'][551]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][547]=0;
_$jscoverage['lib/tr8n.js'][557]=0;
_$jscoverage['lib/tr8n.js'][559]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][562]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][566]=0;
_$jscoverage['lib/tr8n.js'][525]=0;
_$jscoverage['lib/tr8n.js'][533]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][917]=0;
_$jscoverage['lib/tr8n.js'][612]=0;
_$jscoverage['lib/tr8n.js'][611]=0;
_$jscoverage['lib/tr8n.js'][569]=0;
_$jscoverage['lib/tr8n.js'][573]=0;
_$jscoverage['lib/tr8n.js'][607]=0;
_$jscoverage['lib/tr8n.js'][572]=0;
_$jscoverage['lib/tr8n.js'][601]=0;
_$jscoverage['lib/tr8n.js'][571]=0;
_$jscoverage['lib/tr8n.js'][577]=0;
_$jscoverage['lib/tr8n.js'][578]=0;
_$jscoverage['lib/tr8n.js'][582]=0;
_$jscoverage['lib/tr8n.js'][581]=0;
_$jscoverage['lib/tr8n.js'][608]=0;
_$jscoverage['lib/tr8n.js'][586]=0;
_$jscoverage['lib/tr8n.js'][609]=0;
_$jscoverage['lib/tr8n.js'][587]=0;
_$jscoverage['lib/tr8n.js'][605]=0;
_$jscoverage['lib/tr8n.js'][587]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][590]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][593]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][592]=0;
_$jscoverage['lib/tr8n.js'][598]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][939]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][657]=0;
_$jscoverage['lib/tr8n.js'][656]=0;
_$jscoverage['lib/tr8n.js'][652]=0;
_$jscoverage['lib/tr8n.js'][615]=0;
_$jscoverage['lib/tr8n.js'][614]=0;
_$jscoverage['lib/tr8n.js'][617]=0;
_$jscoverage['lib/tr8n.js'][620]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][644]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][626]=0;
_$jscoverage['lib/tr8n.js'][627]=0;
_$jscoverage['lib/tr8n.js'][628]=0;
_$jscoverage['lib/tr8n.js'][631]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][633]=0;
_$jscoverage['lib/tr8n.js'][637]=0;
_$jscoverage['lib/tr8n.js'][636]=0;
_$jscoverage['lib/tr8n.js'][642]=0;
_$jscoverage['lib/tr8n.js'][645]=0;
_$jscoverage['lib/tr8n.js'][655]=0;
_$jscoverage['lib/tr8n.js'][646]=0;
_$jscoverage['lib/tr8n.js'][960]=0;
_$jscoverage['lib/tr8n.js'][672]=0;
_$jscoverage['lib/tr8n.js'][668]=0;
_$jscoverage['lib/tr8n.js'][659]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][665]=0;
_$jscoverage['lib/tr8n.js'][666]=0;
_$jscoverage['lib/tr8n.js'][669]=0;
_$jscoverage['lib/tr8n.js'][966]=0;
_$jscoverage['lib/tr8n.js'][705]=0;
_$jscoverage['lib/tr8n.js'][704]=0;
_$jscoverage['lib/tr8n.js'][701]=0;
_$jscoverage['lib/tr8n.js'][695]=0;
_$jscoverage['lib/tr8n.js'][684]=0;
_$jscoverage['lib/tr8n.js'][694]=0;
_$jscoverage['lib/tr8n.js'][698]=0;
_$jscoverage['lib/tr8n.js'][675]=0;
_$jscoverage['lib/tr8n.js'][690]=0;
_$jscoverage['lib/tr8n.js'][702]=0;
_$jscoverage['lib/tr8n.js'][673]=0;
_$jscoverage['lib/tr8n.js'][676]=0;
_$jscoverage['lib/tr8n.js'][687]=0;
_$jscoverage['lib/tr8n.js'][675]=0;
_$jscoverage['lib/tr8n.js'][677]=0;
_$jscoverage['lib/tr8n.js'][678]=0;
_$jscoverage['lib/tr8n.js'][681]=0;
_$jscoverage['lib/tr8n.js'][683]=0;
_$jscoverage['lib/tr8n.js'][685]=0;
_$jscoverage['lib/tr8n.js'][980]=0;
_$jscoverage['lib/tr8n.js'][731]=0;
_$jscoverage['lib/tr8n.js'][731]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][714]=0;
_$jscoverage['lib/tr8n.js'][715]=0;
_$jscoverage['lib/tr8n.js'][716]=0;
_$jscoverage['lib/tr8n.js'][718]=0;
_$jscoverage['lib/tr8n.js'][719]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][709]=0;
_$jscoverage['lib/tr8n.js'][721]=0;
_$jscoverage['lib/tr8n.js'][713]=0;
_$jscoverage['lib/tr8n.js'][725]=0;
_$jscoverage['lib/tr8n.js'][726]=0;
_$jscoverage['lib/tr8n.js'][727]=0;
_$jscoverage['lib/tr8n.js'][993]=0;
_$jscoverage['lib/tr8n.js'][755]=0;
_$jscoverage['lib/tr8n.js'][732]=0;
_$jscoverage['lib/tr8n.js'][754]=0;
_$jscoverage['lib/tr8n.js'][737]=0;
_$jscoverage['lib/tr8n.js'][736]=0;
_$jscoverage['lib/tr8n.js'][740]=0;
_$jscoverage['lib/tr8n.js'][745]=0;
_$jscoverage['lib/tr8n.js'][739]=0;
_$jscoverage['lib/tr8n.js'][742]=0;
_$jscoverage['lib/tr8n.js'][748]=0;
_$jscoverage['lib/tr8n.js'][735]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][747]=0;
_$jscoverage['lib/tr8n.js'][750]=0;
_$jscoverage['lib/tr8n.js'][752]=0;
_$jscoverage['lib/tr8n.js'][750]=0;
_$jscoverage['lib/tr8n.js'][1006]=0;
_$jscoverage['lib/tr8n.js'][785]=0;
_$jscoverage['lib/tr8n.js'][779]=0;
_$jscoverage['lib/tr8n.js'][757]=0;
_$jscoverage['lib/tr8n.js'][760]=0;
_$jscoverage['lib/tr8n.js'][763]=0;
_$jscoverage['lib/tr8n.js'][762]=0;
_$jscoverage['lib/tr8n.js'][765]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][768]=0;
_$jscoverage['lib/tr8n.js'][781]=0;
_$jscoverage['lib/tr8n.js'][776]=0;
_$jscoverage['lib/tr8n.js'][775]=0;
_$jscoverage['lib/tr8n.js'][780]=0;
_$jscoverage['lib/tr8n.js'][1020]=0;
_$jscoverage['lib/tr8n.js'][808]=0;
_$jscoverage['lib/tr8n.js'][797]=0;
_$jscoverage['lib/tr8n.js'][789]=0;
_$jscoverage['lib/tr8n.js'][788]=0;
_$jscoverage['lib/tr8n.js'][793]=0;
_$jscoverage['lib/tr8n.js'][793]=0;
_$jscoverage['lib/tr8n.js'][800]=0;
_$jscoverage['lib/tr8n.js'][794]=0;
_$jscoverage['lib/tr8n.js'][792]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][801]=0;
_$jscoverage['lib/tr8n.js'][803]=0;
_$jscoverage['lib/tr8n.js'][802]=0;
_$jscoverage['lib/tr8n.js'][1029]=0;
_$jscoverage['lib/tr8n.js'][832]=0;
_$jscoverage['lib/tr8n.js'][812]=0;
_$jscoverage['lib/tr8n.js'][811]=0;
_$jscoverage['lib/tr8n.js'][820]=0;
_$jscoverage['lib/tr8n.js'][819]=0;
_$jscoverage['lib/tr8n.js'][824]=0;
_$jscoverage['lib/tr8n.js'][828]=0;
_$jscoverage['lib/tr8n.js'][828]=0;
_$jscoverage['lib/tr8n.js'][829]=0;
_$jscoverage['lib/tr8n.js'][827]=0;
_$jscoverage['lib/tr8n.js'][1042]=0;
_$jscoverage['lib/tr8n.js'][852]=0;
_$jscoverage['lib/tr8n.js'][838]=0;
_$jscoverage['lib/tr8n.js'][851]=0;
_$jscoverage['lib/tr8n.js'][838]=0;
_$jscoverage['lib/tr8n.js'][833]=0;
_$jscoverage['lib/tr8n.js'][834]=0;
_$jscoverage['lib/tr8n.js'][837]=0;
_$jscoverage['lib/tr8n.js'][843]=0;
_$jscoverage['lib/tr8n.js'][842]=0;
_$jscoverage['lib/tr8n.js'][847]=0;
_$jscoverage['lib/tr8n.js'][847]=0;
_$jscoverage['lib/tr8n.js'][849]=0;
_$jscoverage['lib/tr8n.js'][850]=0;
_$jscoverage['lib/tr8n.js'][833]=0;
_$jscoverage['lib/tr8n.js'][1053]=0;
_$jscoverage['lib/tr8n.js'][873]=0;
_$jscoverage['lib/tr8n.js'][867]=0;
_$jscoverage['lib/tr8n.js'][860]=0;
_$jscoverage['lib/tr8n.js'][853]=0;
_$jscoverage['lib/tr8n.js'][854]=0;
_$jscoverage['lib/tr8n.js'][857]=0;
_$jscoverage['lib/tr8n.js'][861]=0;
_$jscoverage['lib/tr8n.js'][861]=0;
_$jscoverage['lib/tr8n.js'][863]=0;
_$jscoverage['lib/tr8n.js'][864]=0;
_$jscoverage['lib/tr8n.js'][866]=0;
_$jscoverage['lib/tr8n.js'][868]=0;
_$jscoverage['lib/tr8n.js'][870]=0;
_$jscoverage['lib/tr8n.js'][869]=0;
_$jscoverage['lib/tr8n.js'][1074]=0;
_$jscoverage['lib/tr8n.js'][897]=0;
_$jscoverage['lib/tr8n.js'][896]=0;
_$jscoverage['lib/tr8n.js'][878]=0;
_$jscoverage['lib/tr8n.js'][879]=0;
_$jscoverage['lib/tr8n.js'][880]=0;
_$jscoverage['lib/tr8n.js'][884]=0;
_$jscoverage['lib/tr8n.js'][876]=0;
_$jscoverage['lib/tr8n.js'][883]=0;
_$jscoverage['lib/tr8n.js'][885]=0;
_$jscoverage['lib/tr8n.js'][882]=0;
_$jscoverage['lib/tr8n.js'][889]=0;
_$jscoverage['lib/tr8n.js'][888]=0;
_$jscoverage['lib/tr8n.js'][895]=0;
_$jscoverage['lib/tr8n.js'][892]=0;
_$jscoverage['lib/tr8n.js'][1090]=0;
_$jscoverage['lib/tr8n.js'][920]=0;
_$jscoverage['lib/tr8n.js'][919]=0;
_$jscoverage['lib/tr8n.js'][898]=0;
_$jscoverage['lib/tr8n.js'][900]=0;
_$jscoverage['lib/tr8n.js'][916]=0;
_$jscoverage['lib/tr8n.js'][903]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][915]=0;
_$jscoverage['lib/tr8n.js'][905]=0;
_$jscoverage['lib/tr8n.js'][909]=0;
_$jscoverage['lib/tr8n.js'][910]=0;
_$jscoverage['lib/tr8n.js'][911]=0;
_$jscoverage['lib/tr8n.js'][918]=0;
_$jscoverage['lib/tr8n.js'][912]=0;
_$jscoverage['lib/tr8n.js'][908]=0;
_$jscoverage['lib/tr8n.js'][1098]=0;
_$jscoverage['lib/tr8n.js'][945]=0;
_$jscoverage['lib/tr8n.js'][941]=0;
_$jscoverage['lib/tr8n.js'][936]=0;
_$jscoverage['lib/tr8n.js'][943]=0;
_$jscoverage['lib/tr8n.js'][921]=0;
_$jscoverage['lib/tr8n.js'][923]=0;
_$jscoverage['lib/tr8n.js'][924]=0;
_$jscoverage['lib/tr8n.js'][927]=0;
_$jscoverage['lib/tr8n.js'][944]=0;
_$jscoverage['lib/tr8n.js'][928]=0;
_$jscoverage['lib/tr8n.js'][932]=0;
_$jscoverage['lib/tr8n.js'][933]=0;
_$jscoverage['lib/tr8n.js'][942]=0;
_$jscoverage['lib/tr8n.js'][931]=0;
_$jscoverage['lib/tr8n.js'][937]=0;
_$jscoverage['lib/tr8n.js'][1084]=0;
_$jscoverage['lib/tr8n.js'][968]=0;
_$jscoverage['lib/tr8n.js'][951]=0;
_$jscoverage['lib/tr8n.js'][952]=0;
_$jscoverage['lib/tr8n.js'][950]=0;
_$jscoverage['lib/tr8n.js'][955]=0;
_$jscoverage['lib/tr8n.js'][954]=0;
_$jscoverage['lib/tr8n.js'][958]=0;
_$jscoverage['lib/tr8n.js'][962]=0;
_$jscoverage['lib/tr8n.js'][959]=0;
_$jscoverage['lib/tr8n.js'][957]=0;
_$jscoverage['lib/tr8n.js'][965]=0;
_$jscoverage['lib/tr8n.js'][1115]=0;
_$jscoverage['lib/tr8n.js'][988]=0;
_$jscoverage['lib/tr8n.js'][983]=0;
_$jscoverage['lib/tr8n.js'][972]=0;
_$jscoverage['lib/tr8n.js'][987]=0;
_$jscoverage['lib/tr8n.js'][971]=0;
_$jscoverage['lib/tr8n.js'][974]=0;
_$jscoverage['lib/tr8n.js'][978]=0;
_$jscoverage['lib/tr8n.js'][979]=0;
_$jscoverage['lib/tr8n.js'][969]=0;
_$jscoverage['lib/tr8n.js'][977]=0;
_$jscoverage['lib/tr8n.js'][984]=0;
_$jscoverage['lib/tr8n.js'][985]=0;
_$jscoverage['lib/tr8n.js'][1128]=0;
_$jscoverage['lib/tr8n.js'][999]=0;
_$jscoverage['lib/tr8n.js'][989]=0;
_$jscoverage['lib/tr8n.js'][994]=0;
_$jscoverage['lib/tr8n.js'][996]=0;
_$jscoverage['lib/tr8n.js'][992]=0;
_$jscoverage['lib/tr8n.js'][1134]=0;
_$jscoverage['lib/tr8n.js'][1017]=0;
_$jscoverage['lib/tr8n.js'][1003]=0;
_$jscoverage['lib/tr8n.js'][1010]=0;
_$jscoverage['lib/tr8n.js'][1011]=0;
_$jscoverage['lib/tr8n.js'][1009]=0;
_$jscoverage['lib/tr8n.js'][1016]=0;
_$jscoverage['lib/tr8n.js'][1000]=0;
_$jscoverage['lib/tr8n.js'][1004]=0;
_$jscoverage['lib/tr8n.js'][1000]=0;
_$jscoverage['lib/tr8n.js'][1002]=0;
_$jscoverage['lib/tr8n.js'][1015]=0;
_$jscoverage['lib/tr8n.js'][1141]=0;
_$jscoverage['lib/tr8n.js'][1035]=0;
_$jscoverage['lib/tr8n.js'][1032]=0;
_$jscoverage['lib/tr8n.js'][1021]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1023]=0;
_$jscoverage['lib/tr8n.js'][1027]=0;
_$jscoverage['lib/tr8n.js'][1026]=0;
_$jscoverage['lib/tr8n.js'][1018]=0;
_$jscoverage['lib/tr8n.js'][1033]=0;
_$jscoverage['lib/tr8n.js'][1030]=0;
_$jscoverage['lib/tr8n.js'][1150]=0;
_$jscoverage['lib/tr8n.js'][1055]=0;
_$jscoverage['lib/tr8n.js'][1040]=0;
_$jscoverage['lib/tr8n.js'][1041]=0;
_$jscoverage['lib/tr8n.js'][1043]=0;
_$jscoverage['lib/tr8n.js'][1045]=0;
_$jscoverage['lib/tr8n.js'][1052]=0;
_$jscoverage['lib/tr8n.js'][1045]=0;
_$jscoverage['lib/tr8n.js'][1048]=0;
_$jscoverage['lib/tr8n.js'][1047]=0;
_$jscoverage['lib/tr8n.js'][1050]=0;
_$jscoverage['lib/tr8n.js'][1158]=0;
_$jscoverage['lib/tr8n.js'][1086]=0;
_$jscoverage['lib/tr8n.js'][1083]=0;
_$jscoverage['lib/tr8n.js'][1060]=0;
_$jscoverage['lib/tr8n.js'][1085]=0;
_$jscoverage['lib/tr8n.js'][1061]=0;
_$jscoverage['lib/tr8n.js'][1071]=0;
_$jscoverage['lib/tr8n.js'][1072]=0;
_$jscoverage['lib/tr8n.js'][1075]=0;
_$jscoverage['lib/tr8n.js'][1078]=0;
_$jscoverage['lib/tr8n.js'][1080]=0;
_$jscoverage['lib/tr8n.js'][1081]=0;
_$jscoverage['lib/tr8n.js'][1082]=0;
_$jscoverage['lib/tr8n.js'][1077]=0;
_$jscoverage['lib/tr8n.js'][1170]=0;
_$jscoverage['lib/tr8n.js'][1103]=0;
_$jscoverage['lib/tr8n.js'][1087]=0;
_$jscoverage['lib/tr8n.js'][1091]=0;
_$jscoverage['lib/tr8n.js'][1088]=0;
_$jscoverage['lib/tr8n.js'][1092]=0;
_$jscoverage['lib/tr8n.js'][1101]=0;
_$jscoverage['lib/tr8n.js'][1093]=0;
_$jscoverage['lib/tr8n.js'][1096]=0;
_$jscoverage['lib/tr8n.js'][1095]=0;
_$jscoverage['lib/tr8n.js'][1099]=0;
_$jscoverage['lib/tr8n.js'][1178]=0;
_$jscoverage['lib/tr8n.js'][1118]=0;
_$jscoverage['lib/tr8n.js'][1108]=0;
_$jscoverage['lib/tr8n.js'][1107]=0;
_$jscoverage['lib/tr8n.js'][1106]=0;
_$jscoverage['lib/tr8n.js'][1104]=0;
_$jscoverage['lib/tr8n.js'][1116]=0;
_$jscoverage['lib/tr8n.js'][1113]=0;
_$jscoverage['lib/tr8n.js'][1112]=0;
_$jscoverage['lib/tr8n.js'][1165]=0;
_$jscoverage['lib/tr8n.js'][1132]=0;
_$jscoverage['lib/tr8n.js'][1121]=0;
_$jscoverage['lib/tr8n.js'][1131]=0;
_$jscoverage['lib/tr8n.js'][1122]=0;
_$jscoverage['lib/tr8n.js'][1120]=0;
_$jscoverage['lib/tr8n.js'][1129]=0;
_$jscoverage['lib/tr8n.js'][1125]=0;
_$jscoverage['lib/tr8n.js'][1126]=0;
_$jscoverage['lib/tr8n.js'][1191]=0;
_$jscoverage['lib/tr8n.js'][1143]=0;
_$jscoverage['lib/tr8n.js'][1133]=0;
_$jscoverage['lib/tr8n.js'][1135]=0;
_$jscoverage['lib/tr8n.js'][1138]=0;
_$jscoverage['lib/tr8n.js'][1140]=0;
_$jscoverage['lib/tr8n.js'][1198]=0;
_$jscoverage['lib/tr8n.js'][1156]=0;
_$jscoverage['lib/tr8n.js'][1144]=0;
_$jscoverage['lib/tr8n.js'][1155]=0;
_$jscoverage['lib/tr8n.js'][1148]=0;
_$jscoverage['lib/tr8n.js'][1146]=0;
_$jscoverage['lib/tr8n.js'][1153]=0;
_$jscoverage['lib/tr8n.js'][1151]=0;
_$jscoverage['lib/tr8n.js'][1152]=0;
_$jscoverage['lib/tr8n.js'][1201]=0;
_$jscoverage['lib/tr8n.js'][1167]=0;
_$jscoverage['lib/tr8n.js'][1157]=0;
_$jscoverage['lib/tr8n.js'][1161]=0;
_$jscoverage['lib/tr8n.js'][1162]=0;
_$jscoverage['lib/tr8n.js'][1166]=0;
_$jscoverage['lib/tr8n.js'][1212]=0;
_$jscoverage['lib/tr8n.js'][1177]=0;
_$jscoverage['lib/tr8n.js'][1172]=0;
_$jscoverage['lib/tr8n.js'][1169]=0;
_$jscoverage['lib/tr8n.js'][1174]=0;
_$jscoverage['lib/tr8n.js'][1175]=0;
_$jscoverage['lib/tr8n.js'][1216]=0;
_$jscoverage['lib/tr8n.js'][1190]=0;
_$jscoverage['lib/tr8n.js'][1189]=0;
_$jscoverage['lib/tr8n.js'][1188]=0;
_$jscoverage['lib/tr8n.js'][1190]=0;
_$jscoverage['lib/tr8n.js'][1185]=0;
_$jscoverage['lib/tr8n.js'][1182]=0;
_$jscoverage['lib/tr8n.js'][1181]=0;
_$jscoverage['lib/tr8n.js'][1226]=0;
_$jscoverage['lib/tr8n.js'][1204]=0;
_$jscoverage['lib/tr8n.js'][1202]=0;
_$jscoverage['lib/tr8n.js'][1203]=0;
_$jscoverage['lib/tr8n.js'][1194]=0;
_$jscoverage['lib/tr8n.js'][1197]=0;
_$jscoverage['lib/tr8n.js'][1195]=0;
_$jscoverage['lib/tr8n.js'][1239]=0;
_$jscoverage['lib/tr8n.js'][1211]=0;
_$jscoverage['lib/tr8n.js'][1208]=0;
_$jscoverage['lib/tr8n.js'][1244]=0;
_$jscoverage['lib/tr8n.js'][1222]=0;
_$jscoverage['lib/tr8n.js'][1213]=0;
_$jscoverage['lib/tr8n.js'][1245]=0;
_$jscoverage['lib/tr8n.js'][1229]=0;
_$jscoverage['lib/tr8n.js'][1223]=0;
_$jscoverage['lib/tr8n.js'][1227]=0;
_$jscoverage['lib/tr8n.js'][1231]=0;
_$jscoverage['lib/tr8n.js'][1243]=0;
_$jscoverage['lib/tr8n.js'][1246]=0;
_$jscoverage['lib/tr8n.js'][1249]=0;
_$jscoverage['lib/tr8n.js'][1250]=0;
_$jscoverage['lib/tr8n.js'][1253]=0;
_$jscoverage['lib/tr8n.js'][1254]=0;
}
_$jscoverage['lib/tr8n.js'][2]++;
var MD5 = function (string) {
 
  _$jscoverage['lib/tr8n.js'][4]++;
function RotateLeft(lValue, iShiftBits) {
    _$jscoverage['lib/tr8n.js'][5]++;
return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
 
  _$jscoverage['lib/tr8n.js'][8]++;
function AddUnsigned(lX,lY) {
    _$jscoverage['lib/tr8n.js'][9]++;
var lX4,lY4,lX8,lY8,lResult;
    _$jscoverage['lib/tr8n.js'][10]++;
lX8 = (lX & 0x80000000);
    _$jscoverage['lib/tr8n.js'][11]++;
lY8 = (lY & 0x80000000);
    _$jscoverage['lib/tr8n.js'][12]++;
lX4 = (lX & 0x40000000);
    _$jscoverage['lib/tr8n.js'][13]++;
lY4 = (lY & 0x40000000);
    _$jscoverage['lib/tr8n.js'][14]++;
lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    _$jscoverage['lib/tr8n.js'][15]++;
if (lX4 & lY4) {
      _$jscoverage['lib/tr8n.js'][16]++;
return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    _$jscoverage['lib/tr8n.js'][18]++;
if (lX4 | lY4) {
      _$jscoverage['lib/tr8n.js'][19]++;
if (lResult & 0x40000000) {
        _$jscoverage['lib/tr8n.js'][20]++;
return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        _$jscoverage['lib/tr8n.js'][22]++;
return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      _$jscoverage['lib/tr8n.js'][25]++;
return (lResult ^ lX8 ^ lY8);
    }
  }
 
  _$jscoverage['lib/tr8n.js'][29]++;
function F(x,y,z) { _$jscoverage['lib/tr8n.js'][29]++;
return (x & y) | ((~x) & z); }
  _$jscoverage['lib/tr8n.js'][30]++;
function G(x,y,z) { _$jscoverage['lib/tr8n.js'][30]++;
return (x & z) | (y & (~z)); }
  _$jscoverage['lib/tr8n.js'][31]++;
function H(x,y,z) { _$jscoverage['lib/tr8n.js'][31]++;
return (x ^ y ^ z); }
  _$jscoverage['lib/tr8n.js'][32]++;
function I(x,y,z) { _$jscoverage['lib/tr8n.js'][32]++;
return (y ^ (x | (~z))); }
 
  _$jscoverage['lib/tr8n.js'][34]++;
function FF(a,b,c,d,x,s,ac) {
    _$jscoverage['lib/tr8n.js'][35]++;
a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    _$jscoverage['lib/tr8n.js'][36]++;
return AddUnsigned(RotateLeft(a, s), b);
  };
 
  _$jscoverage['lib/tr8n.js'][39]++;
function GG(a,b,c,d,x,s,ac) {
    _$jscoverage['lib/tr8n.js'][40]++;
a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    _$jscoverage['lib/tr8n.js'][41]++;
return AddUnsigned(RotateLeft(a, s), b);
  };
 
  _$jscoverage['lib/tr8n.js'][44]++;
function HH(a,b,c,d,x,s,ac) {
    _$jscoverage['lib/tr8n.js'][45]++;
a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    _$jscoverage['lib/tr8n.js'][46]++;
return AddUnsigned(RotateLeft(a, s), b);
  };
 
  _$jscoverage['lib/tr8n.js'][49]++;
function II(a,b,c,d,x,s,ac) {
    _$jscoverage['lib/tr8n.js'][50]++;
a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    _$jscoverage['lib/tr8n.js'][51]++;
return AddUnsigned(RotateLeft(a, s), b);
  };
 
  _$jscoverage['lib/tr8n.js'][54]++;
function ConvertToWordArray(string) {
    _$jscoverage['lib/tr8n.js'][55]++;
var lWordCount;
    _$jscoverage['lib/tr8n.js'][56]++;
var lMessageLength = string.length;
    _$jscoverage['lib/tr8n.js'][57]++;
var lNumberOfWords_temp1=lMessageLength + 8;
    _$jscoverage['lib/tr8n.js'][58]++;
var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    _$jscoverage['lib/tr8n.js'][59]++;
var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    _$jscoverage['lib/tr8n.js'][60]++;
var lWordArray=Array(lNumberOfWords-1);
    _$jscoverage['lib/tr8n.js'][61]++;
var lBytePosition = 0;
    _$jscoverage['lib/tr8n.js'][62]++;
var lByteCount = 0;
    _$jscoverage['lib/tr8n.js'][63]++;
while ( lByteCount < lMessageLength ) {
      _$jscoverage['lib/tr8n.js'][64]++;
lWordCount = (lByteCount-(lByteCount % 4))/4;
      _$jscoverage['lib/tr8n.js'][65]++;
lBytePosition = (lByteCount % 4)*8;
      _$jscoverage['lib/tr8n.js'][66]++;
lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      _$jscoverage['lib/tr8n.js'][67]++;
lByteCount++;
    }
    _$jscoverage['lib/tr8n.js'][69]++;
lWordCount = (lByteCount-(lByteCount % 4))/4;
    _$jscoverage['lib/tr8n.js'][70]++;
lBytePosition = (lByteCount % 4)*8;
    _$jscoverage['lib/tr8n.js'][71]++;
lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    _$jscoverage['lib/tr8n.js'][72]++;
lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    _$jscoverage['lib/tr8n.js'][73]++;
lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    _$jscoverage['lib/tr8n.js'][74]++;
return lWordArray;
  };
 
  _$jscoverage['lib/tr8n.js'][77]++;
function WordToHex(lValue) {
    _$jscoverage['lib/tr8n.js'][78]++;
var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    _$jscoverage['lib/tr8n.js'][79]++;
for (lCount = 0;lCount<=3;lCount++) {
      _$jscoverage['lib/tr8n.js'][80]++;
lByte = (lValue>>>(lCount*8)) & 255;
      _$jscoverage['lib/tr8n.js'][81]++;
WordToHexValue_temp = "0" + lByte.toString(16);
      _$jscoverage['lib/tr8n.js'][82]++;
WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    _$jscoverage['lib/tr8n.js'][84]++;
return WordToHexValue;
  };
 
  _$jscoverage['lib/tr8n.js'][87]++;
function Utf8Encode(string) {
    _$jscoverage['lib/tr8n.js'][88]++;
string = string.replace(/\r\n/g,"\n");
    _$jscoverage['lib/tr8n.js'][89]++;
var utftext = "";
 
    _$jscoverage['lib/tr8n.js'][91]++;
for (var n = 0; n < string.length; n++) {
 
      _$jscoverage['lib/tr8n.js'][93]++;
var c = string.charCodeAt(n);
 
      _$jscoverage['lib/tr8n.js'][95]++;
if (c < 128) {
        _$jscoverage['lib/tr8n.js'][96]++;
utftext += String.fromCharCode(c);
      }
      else {
_$jscoverage['lib/tr8n.js'][98]++;
if((c > 127) && (c < 2048)) {
        _$jscoverage['lib/tr8n.js'][99]++;
utftext += String.fromCharCode((c >> 6) | 192);
        _$jscoverage['lib/tr8n.js'][100]++;
utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        _$jscoverage['lib/tr8n.js'][103]++;
utftext += String.fromCharCode((c >> 12) | 224);
        _$jscoverage['lib/tr8n.js'][104]++;
utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        _$jscoverage['lib/tr8n.js'][105]++;
utftext += String.fromCharCode((c & 63) | 128);
      }}

 
    }
 
    _$jscoverage['lib/tr8n.js'][110]++;
return utftext;
  };
 
  _$jscoverage['lib/tr8n.js'][113]++;
var x=Array();
  _$jscoverage['lib/tr8n.js'][114]++;
var k,AA,BB,CC,DD,a,b,c,d;
  _$jscoverage['lib/tr8n.js'][115]++;
var S11=7, S12=12, S13=17, S14=22;
  _$jscoverage['lib/tr8n.js'][116]++;
var S21=5, S22=9 , S23=14, S24=20;
  _$jscoverage['lib/tr8n.js'][117]++;
var S31=4, S32=11, S33=16, S34=23;
  _$jscoverage['lib/tr8n.js'][118]++;
var S41=6, S42=10, S43=15, S44=21;
 
  _$jscoverage['lib/tr8n.js'][120]++;
string = Utf8Encode(string);
 
  _$jscoverage['lib/tr8n.js'][122]++;
x = ConvertToWordArray(string);
 
  _$jscoverage['lib/tr8n.js'][124]++;
a = 0x67452301; _$jscoverage['lib/tr8n.js'][124]++;
b = 0xEFCDAB89; _$jscoverage['lib/tr8n.js'][124]++;
c = 0x98BADCFE; _$jscoverage['lib/tr8n.js'][124]++;
d = 0x10325476;
 
  _$jscoverage['lib/tr8n.js'][126]++;
for (k=0;k<x.length;k+=16) {
    _$jscoverage['lib/tr8n.js'][127]++;
AA=a; _$jscoverage['lib/tr8n.js'][127]++;
BB=b; _$jscoverage['lib/tr8n.js'][127]++;
CC=c; _$jscoverage['lib/tr8n.js'][127]++;
DD=d;
    _$jscoverage['lib/tr8n.js'][128]++;
a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    _$jscoverage['lib/tr8n.js'][129]++;
d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    _$jscoverage['lib/tr8n.js'][130]++;
c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    _$jscoverage['lib/tr8n.js'][131]++;
b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    _$jscoverage['lib/tr8n.js'][132]++;
a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    _$jscoverage['lib/tr8n.js'][133]++;
d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    _$jscoverage['lib/tr8n.js'][134]++;
c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    _$jscoverage['lib/tr8n.js'][135]++;
b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    _$jscoverage['lib/tr8n.js'][136]++;
a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    _$jscoverage['lib/tr8n.js'][137]++;
d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    _$jscoverage['lib/tr8n.js'][138]++;
c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    _$jscoverage['lib/tr8n.js'][139]++;
b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    _$jscoverage['lib/tr8n.js'][140]++;
a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    _$jscoverage['lib/tr8n.js'][141]++;
d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    _$jscoverage['lib/tr8n.js'][142]++;
c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    _$jscoverage['lib/tr8n.js'][143]++;
b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    _$jscoverage['lib/tr8n.js'][144]++;
a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    _$jscoverage['lib/tr8n.js'][145]++;
d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    _$jscoverage['lib/tr8n.js'][146]++;
c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    _$jscoverage['lib/tr8n.js'][147]++;
b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    _$jscoverage['lib/tr8n.js'][148]++;
a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    _$jscoverage['lib/tr8n.js'][149]++;
d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    _$jscoverage['lib/tr8n.js'][150]++;
c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    _$jscoverage['lib/tr8n.js'][151]++;
b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    _$jscoverage['lib/tr8n.js'][152]++;
a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    _$jscoverage['lib/tr8n.js'][153]++;
d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    _$jscoverage['lib/tr8n.js'][154]++;
c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    _$jscoverage['lib/tr8n.js'][155]++;
b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    _$jscoverage['lib/tr8n.js'][156]++;
a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    _$jscoverage['lib/tr8n.js'][157]++;
d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    _$jscoverage['lib/tr8n.js'][158]++;
c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    _$jscoverage['lib/tr8n.js'][159]++;
b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    _$jscoverage['lib/tr8n.js'][160]++;
a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    _$jscoverage['lib/tr8n.js'][161]++;
d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    _$jscoverage['lib/tr8n.js'][162]++;
c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    _$jscoverage['lib/tr8n.js'][163]++;
b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    _$jscoverage['lib/tr8n.js'][164]++;
a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    _$jscoverage['lib/tr8n.js'][165]++;
d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    _$jscoverage['lib/tr8n.js'][166]++;
c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    _$jscoverage['lib/tr8n.js'][167]++;
b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    _$jscoverage['lib/tr8n.js'][168]++;
a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    _$jscoverage['lib/tr8n.js'][169]++;
d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    _$jscoverage['lib/tr8n.js'][170]++;
c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    _$jscoverage['lib/tr8n.js'][171]++;
b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    _$jscoverage['lib/tr8n.js'][172]++;
a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    _$jscoverage['lib/tr8n.js'][173]++;
d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    _$jscoverage['lib/tr8n.js'][174]++;
c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    _$jscoverage['lib/tr8n.js'][175]++;
b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    _$jscoverage['lib/tr8n.js'][176]++;
a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    _$jscoverage['lib/tr8n.js'][177]++;
d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    _$jscoverage['lib/tr8n.js'][178]++;
c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    _$jscoverage['lib/tr8n.js'][179]++;
b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    _$jscoverage['lib/tr8n.js'][180]++;
a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    _$jscoverage['lib/tr8n.js'][181]++;
d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    _$jscoverage['lib/tr8n.js'][182]++;
c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    _$jscoverage['lib/tr8n.js'][183]++;
b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    _$jscoverage['lib/tr8n.js'][184]++;
a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    _$jscoverage['lib/tr8n.js'][185]++;
d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    _$jscoverage['lib/tr8n.js'][186]++;
c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    _$jscoverage['lib/tr8n.js'][187]++;
b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    _$jscoverage['lib/tr8n.js'][188]++;
a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    _$jscoverage['lib/tr8n.js'][189]++;
d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    _$jscoverage['lib/tr8n.js'][190]++;
c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    _$jscoverage['lib/tr8n.js'][191]++;
b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    _$jscoverage['lib/tr8n.js'][192]++;
a=AddUnsigned(a,AA);
    _$jscoverage['lib/tr8n.js'][193]++;
b=AddUnsigned(b,BB);
    _$jscoverage['lib/tr8n.js'][194]++;
c=AddUnsigned(c,CC);
    _$jscoverage['lib/tr8n.js'][195]++;
d=AddUnsigned(d,DD);
  }
 
  _$jscoverage['lib/tr8n.js'][198]++;
var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
  _$jscoverage['lib/tr8n.js'][200]++;
return temp.toLowerCase();
};
_$jscoverage['lib/tr8n.js'][202]++;
var Tr8n = {
  "Tokenizers": {},
  "Tokens": {},
  "RulesEngine": {},
  "Decorators": {},
  "Utils": {}
}
;
_$jscoverage['lib/tr8n.js'][210]++;
Tr8n.Utils.hashValue = function(hash, key, defaultValue) {
  _$jscoverage['lib/tr8n.js'][211]++;
defaultValue = defaultValue || null;
  _$jscoverage['lib/tr8n.js'][212]++;
var parts = key.split(".");
  _$jscoverage['lib/tr8n.js'][213]++;
for(var i=0; i<parts.length; i++) {
    _$jscoverage['lib/tr8n.js'][214]++;
var part = parts[i];
    _$jscoverage['lib/tr8n.js'][215]++;
if (typeof hash[part] === "undefined") {
_$jscoverage['lib/tr8n.js'][215]++;
return defaultValue;}

    _$jscoverage['lib/tr8n.js'][216]++;
hash = hash[part];
  }
  _$jscoverage['lib/tr8n.js'][218]++;
return hash;
};

_$jscoverage['lib/tr8n.js'][221]++;
Tr8n.Utils.stripTags = function(input, allowed) {
  _$jscoverage['lib/tr8n.js'][222]++;
allowed = (((allowed || '') + '')
    .toLowerCase()
    .match(/<[a-z][a-z0-9]*>/g) || [])
    .join('');   _$jscoverage['lib/tr8n.js'][225]++;
var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  _$jscoverage['lib/tr8n.js'][227]++;
return input.replace(commentsAndPhpTags, '')
    .replace(tags, function($0, $1) {
      _$jscoverage['lib/tr8n.js'][229]++;
return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
};

_$jscoverage['lib/tr8n.js'][233]++;
Tr8n.Utils.splitSentences = function(text) {
  _$jscoverage['lib/tr8n.js'][234]++;
var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
  _$jscoverage['lib/tr8n.js'][235]++;
return Tr8n.Utils.stripTags(text).match(sentenceRegex);
};

_$jscoverage['lib/tr8n.js'][238]++;
Tr8n.Utils.unique = function(elements) {
  _$jscoverage['lib/tr8n.js'][239]++;
return elements.reverse().filter(function (e, i, arr) {
    _$jscoverage['lib/tr8n.js'][240]++;
return arr.indexOf(e, i+1) === -1;
  }).reverse();
};

_$jscoverage['lib/tr8n.js'][244]++;
Tr8n.Utils.extend = function(destination, source) {
  _$jscoverage['lib/tr8n.js'][245]++;
for (var property in source)
    {
_$jscoverage['lib/tr8n.js'][246]++;
destination[property] = source[property];}

  _$jscoverage['lib/tr8n.js'][247]++;
return destination;
};;
_$jscoverage['lib/tr8n.js'][249]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][250]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][251]++;
this.initTranslatorOptions();
  _$jscoverage['lib/tr8n.js'][252]++;
this.currentLanguage = new Tr8n.Language();
};

_$jscoverage['lib/tr8n.js'][255]++;
Tr8n.Configuration.prototype.initDefaultTokens = function() {
  _$jscoverage['lib/tr8n.js'][256]++;
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

_$jscoverage['lib/tr8n.js'][321]++;
Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {
  _$jscoverage['lib/tr8n.js'][322]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][322]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][323]++;
if (typeof this.defaultTokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][323]++;
return null;}

  _$jscoverage['lib/tr8n.js'][324]++;
return new String(this.defaultTokens[format][type][token]);
};

_$jscoverage['lib/tr8n.js'][327]++;
Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  _$jscoverage['lib/tr8n.js'][328]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][328]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][329]++;
this.defaultTokens[format] = this.defaultTokens[format] || {};
  _$jscoverage['lib/tr8n.js'][330]++;
this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};
  _$jscoverage['lib/tr8n.js'][331]++;
this.defaultTokens[format][type][token] = value;
};

_$jscoverage['lib/tr8n.js'][334]++;
Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  _$jscoverage['lib/tr8n.js'][335]++;
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
_$jscoverage['lib/tr8n.js'][366]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][367]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][368]++;
this.ctx = ctx || {
    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][369]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][369]++;
return r; }.bind(this),
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][370]++;
return expr; }.bind(this),
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][371]++;
return list[1]; }.bind(this),
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][372]++;
list.shift(); _$jscoverage['lib/tr8n.js'][372]++;
return list; }.bind(this),
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][373]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][373]++;
return cell; }.bind(this),
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][374]++;
return (l == r); }.bind(this),
    'atom':     function(a)       { _$jscoverage['lib/tr8n.js'][375]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][376]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ _$jscoverage['lib/tr8n.js'][378]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][378]++;
return r; }.bind(this),

    '=':        function(args){ _$jscoverage['lib/tr8n.js'][380]++;
return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ _$jscoverage['lib/tr8n.js'][381]++;
return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ _$jscoverage['lib/tr8n.js'][382]++;
return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ _$jscoverage['lib/tr8n.js'][383]++;
return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ _$jscoverage['lib/tr8n.js'][384]++;
return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ _$jscoverage['lib/tr8n.js'][385]++;
return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ _$jscoverage['lib/tr8n.js'][386]++;
return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ _$jscoverage['lib/tr8n.js'][387]++;
return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ _$jscoverage['lib/tr8n.js'][388]++;
return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ _$jscoverage['lib/tr8n.js'][389]++;
return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      _$jscoverage['lib/tr8n.js'][391]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][392]++;
if (!this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][392]++;
return false;}

      }
      _$jscoverage['lib/tr8n.js'][394]++;
return true;
    }.bind(this),
    'and':      function(args){ _$jscoverage['lib/tr8n.js'][396]++;
return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      _$jscoverage['lib/tr8n.js'][398]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][399]++;
if (this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][399]++;
return true;}

      }
      _$jscoverage['lib/tr8n.js'][401]++;
return false;
    }.bind(this),
    'or':      function(args){ _$jscoverage['lib/tr8n.js'][403]++;
return this.ctx['||'](args); }.bind(this)
  };
  _$jscoverage['lib/tr8n.js'][405]++;
return this;
}

_$jscoverage['lib/tr8n.js'][408]++;
Tr8n.RulesEngine.Evaluator.prototype = {
  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][410]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][411]++;
return this.ctx[fn](args);
    }
    _$jscoverage['lib/tr8n.js'][413]++;
return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    _$jscoverage['lib/tr8n.js'][417]++;
if (this.ctx['atom'](sexpr)) {
      _$jscoverage['lib/tr8n.js'][418]++;
return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    _$jscoverage['lib/tr8n.js'][421]++;
var fn = sexpr[0];
    _$jscoverage['lib/tr8n.js'][422]++;
var args = sexpr.slice(1);

    _$jscoverage['lib/tr8n.js'][424]++;
if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][425]++;
args = args.map(function(arg) {
        _$jscoverage['lib/tr8n.js'][426]++;
return this.evaluate(arg);
      }.bind(this));
    }

    _$jscoverage['lib/tr8n.js'][430]++;
return this.apply(fn, args);
  }
}
;
_$jscoverage['lib/tr8n.js'][434]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][435]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][438]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][440]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][444]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][445]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][445]++;
return;}

  	_$jscoverage['lib/tr8n.js'][446]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][446]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][447]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][447]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][448]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][448]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][449]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][453]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][454]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][455]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][456]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][457]++;
return list;
  }
}
;
_$jscoverage['lib/tr8n.js'][461]++;
Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {
  _$jscoverage['lib/tr8n.js'][462]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][463]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][464]++;
this.options = options || {};
  _$jscoverage['lib/tr8n.js'][465]++;
this.tokens = [];
};

_$jscoverage['lib/tr8n.js'][468]++;
Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {
  _$jscoverage['lib/tr8n.js'][469]++;
return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

_$jscoverage['lib/tr8n.js'][476]++;
Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][477]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][478]++;
self.tokens = [];
  _$jscoverage['lib/tr8n.js'][479]++;
self.supportedTokens().forEach(function(tokenInfo) {
    _$jscoverage['lib/tr8n.js'][480]++;
var matches = self.label.match(tokensInfo[0]);
    _$jscoverage['lib/tr8n.js'][481]++;
if (matches) {
      _$jscoverage['lib/tr8n.js'][482]++;
Tr8n.Utils.unique(matches).forEach(function(match) {
        _$jscoverage['lib/tr8n.js'][483]++;
self.tokens.push(new tokenInfo[1](self.label, match));
      });
    }
  });
};

_$jscoverage['lib/tr8n.js'][489]++;
Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][490]++;
if (this.options["allowed_tokens"] == null) {
_$jscoverage['lib/tr8n.js'][490]++;
return true;}

  _$jscoverage['lib/tr8n.js'][491]++;
return (this.options["allowed_tokens"].indexOf(token.name) != -1);
};

_$jscoverage['lib/tr8n.js'][494]++;
Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {
  _$jscoverage['lib/tr8n.js'][495]++;
var label = this.label;
  _$jscoverage['lib/tr8n.js'][496]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][497]++;
self.tokens.forEach(function(token) {
    _$jscoverage['lib/tr8n.js'][498]++;
if (self.isTokenAllowed(token)) {
      _$jscoverage['lib/tr8n.js'][499]++;
label = token.substitute(label, self.context, language, options);
    }
  });
  _$jscoverage['lib/tr8n.js'][502]++;
return label;
};
;
_$jscoverage['lib/tr8n.js'][505]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][506]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][507]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][508]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][509]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][510]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][511]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][512]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][513]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][515]++;
Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][516]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][517]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][518]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][519]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][520]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][521]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][524]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][525]++;
var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  _$jscoverage['lib/tr8n.js'][533]++;
this.fragments = this.label.match(expression);
  _$jscoverage['lib/tr8n.js'][534]++;
return this.fragments;
};

_$jscoverage['lib/tr8n.js'][537]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  _$jscoverage['lib/tr8n.js'][538]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][538]++;
return null;}

  _$jscoverage['lib/tr8n.js'][539]++;
return this.fragments[0];
};

_$jscoverage['lib/tr8n.js'][542]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  _$jscoverage['lib/tr8n.js'][543]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][543]++;
return null;}

  _$jscoverage['lib/tr8n.js'][544]++;
return this.fragments.shift();
};

_$jscoverage['lib/tr8n.js'][547]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  _$jscoverage['lib/tr8n.js'][548]++;
var token = this.nextFragment();
  _$jscoverage['lib/tr8n.js'][549]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][550]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

  _$jscoverage['lib/tr8n.js'][551]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][552]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

  _$jscoverage['lib/tr8n.js'][553]++;
return token;
};

_$jscoverage['lib/tr8n.js'][556]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  _$jscoverage['lib/tr8n.js'][557]++;
var tree = [name];
  _$jscoverage['lib/tr8n.js'][558]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    {
_$jscoverage['lib/tr8n.js'][559]++;
this.tokens.push(name);}


  _$jscoverage['lib/tr8n.js'][561]++;
if (type == TOKEN_TYPE_SHORT) {
    _$jscoverage['lib/tr8n.js'][562]++;
var first = true;
    _$jscoverage['lib/tr8n.js'][563]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][564]++;
var value = this.parse();
      _$jscoverage['lib/tr8n.js'][565]++;
if (first && typeof value == "string") {
        _$jscoverage['lib/tr8n.js'][566]++;
value = value.replace(/^\s+/,'');
        _$jscoverage['lib/tr8n.js'][567]++;
first = false;
      }
      _$jscoverage['lib/tr8n.js'][569]++;
tree.push(value);
    }
  } else {
_$jscoverage['lib/tr8n.js'][571]++;
if (type == TOKEN_TYPE_LONG) {
    _$jscoverage['lib/tr8n.js'][572]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][573]++;
tree.push(this.parse());
    }
  }}


  _$jscoverage['lib/tr8n.js'][577]++;
this.nextFragment();
  _$jscoverage['lib/tr8n.js'][578]++;
return tree;
};

_$jscoverage['lib/tr8n.js'][581]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][582]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

_$jscoverage['lib/tr8n.js'][585]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  _$jscoverage['lib/tr8n.js'][586]++;
var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  _$jscoverage['lib/tr8n.js'][587]++;
if (defaultDecoration == null) {
_$jscoverage['lib/tr8n.js'][587]++;
return value;}


  _$jscoverage['lib/tr8n.js'][589]++;
var decorationTokenValues = this.context[token];
  _$jscoverage['lib/tr8n.js'][590]++;
defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  _$jscoverage['lib/tr8n.js'][592]++;
if (decorationTokenValues instanceof Object) {
    _$jscoverage['lib/tr8n.js'][593]++;
Object.keys(decorationTokenValues).forEach(function (key) {
      _$jscoverage['lib/tr8n.js'][594]++;
defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  _$jscoverage['lib/tr8n.js'][598]++;
return defaultDecoration;
};

_$jscoverage['lib/tr8n.js'][601]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  _$jscoverage['lib/tr8n.js'][602]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][602]++;
return value;}

  _$jscoverage['lib/tr8n.js'][603]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][603]++;
return value;}


  _$jscoverage['lib/tr8n.js'][605]++;
var method = this.context[token];

  _$jscoverage['lib/tr8n.js'][607]++;
if (method != null) {
    _$jscoverage['lib/tr8n.js'][608]++;
if (typeof method === 'string')
      {
_$jscoverage['lib/tr8n.js'][609]++;
return method.replace(PLACEHOLDER, value);}


    _$jscoverage['lib/tr8n.js'][611]++;
if (typeof method === 'function')
      {
_$jscoverage['lib/tr8n.js'][612]++;
return method(value);}


    _$jscoverage['lib/tr8n.js'][614]++;
if (typeof method === 'object')
      {
_$jscoverage['lib/tr8n.js'][615]++;
return this.defaultDecoration(token, value);}


    _$jscoverage['lib/tr8n.js'][617]++;
return value;
  }

  _$jscoverage['lib/tr8n.js'][620]++;
return this.defaultDecoration(token, value);
};

_$jscoverage['lib/tr8n.js'][623]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  _$jscoverage['lib/tr8n.js'][624]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][624]++;
return expr;}


  _$jscoverage['lib/tr8n.js'][626]++;
var token = expr[0];
  _$jscoverage['lib/tr8n.js'][627]++;
expr.shift();
  _$jscoverage['lib/tr8n.js'][628]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][629]++;
var value = [];
  _$jscoverage['lib/tr8n.js'][630]++;
expr.forEach(function(obj, index) {
    _$jscoverage['lib/tr8n.js'][631]++;
value.push(self.evaluate(obj));
  });
  _$jscoverage['lib/tr8n.js'][633]++;
return this.apply(token, value.join(''));
};

_$jscoverage['lib/tr8n.js'][636]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  _$jscoverage['lib/tr8n.js'][637]++;
return this.evaluate(this.parse());
};
;
_$jscoverage['lib/tr8n.js'][640]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][641]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][642]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][644]++;
Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][645]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][646]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][647]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][648]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][651]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {
  _$jscoverage['lib/tr8n.js'][652]++;
return this.translateTree(this.doc);
};

_$jscoverage['lib/tr8n.js'][655]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {
  _$jscoverage['lib/tr8n.js'][656]++;
if (this.isNonTranslatableNode(node)) {
    _$jscoverage['lib/tr8n.js'][657]++;
if (node.childNodes.length == 1)
      {
_$jscoverage['lib/tr8n.js'][658]++;
return node.childNodes[0].nodeValue;}

    _$jscoverage['lib/tr8n.js'][659]++;
return "";
  }

  _$jscoverage['lib/tr8n.js'][662]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][663]++;
return this.translateTml(node.nodeValue);}


  _$jscoverage['lib/tr8n.js'][665]++;
var html = "";
  _$jscoverage['lib/tr8n.js'][666]++;
var buffer = "";

  _$jscoverage['lib/tr8n.js'][668]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][669]++;
var child = node.childNodes[i];


    _$jscoverage['lib/tr8n.js'][672]++;
if (child.nodeType == 3) {
      _$jscoverage['lib/tr8n.js'][673]++;
buffer = buffer + child.nodeValue;
    } else {
_$jscoverage['lib/tr8n.js'][674]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        _$jscoverage['lib/tr8n.js'][674]++;
buffer = buffer + this.generateTmlTags(child);
    } else {
_$jscoverage['lib/tr8n.js'][675]++;
if (this.isSeparatorNode(child)) {          _$jscoverage['lib/tr8n.js'][675]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][676]++;
html = html + this.translateTml(buffer);}

      _$jscoverage['lib/tr8n.js'][677]++;
html = html + this.generateHtmlToken(child);
      _$jscoverage['lib/tr8n.js'][678]++;
buffer = "";
    } else {
      _$jscoverage['lib/tr8n.js'][680]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][681]++;
html = html + this.translateTml(buffer);}


      _$jscoverage['lib/tr8n.js'][683]++;
var containerValue = this.translateTree(child);
      _$jscoverage['lib/tr8n.js'][684]++;
if (this.isIgnoredNode(child)) {
        _$jscoverage['lib/tr8n.js'][685]++;
html = html + containerValue;
      } else {
        _$jscoverage['lib/tr8n.js'][687]++;
html = html + this.generateHtmlToken(child, containerValue);
      }

      _$jscoverage['lib/tr8n.js'][690]++;
buffer = "";
    }}
}

  }

  _$jscoverage['lib/tr8n.js'][694]++;
if (buffer != "") {
    _$jscoverage['lib/tr8n.js'][695]++;
html = html + this.translateTml(buffer);
  }

  _$jscoverage['lib/tr8n.js'][698]++;
return html;
};

_$jscoverage['lib/tr8n.js'][701]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {
  _$jscoverage['lib/tr8n.js'][702]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    {
_$jscoverage['lib/tr8n.js'][703]++;
return true;}

  _$jscoverage['lib/tr8n.js'][704]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    {
_$jscoverage['lib/tr8n.js'][705]++;
return true;}

  _$jscoverage['lib/tr8n.js'][706]++;
return false;
};

_$jscoverage['lib/tr8n.js'][709]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {
  _$jscoverage['lib/tr8n.js'][710]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][710]++;
return tml;}



  _$jscoverage['lib/tr8n.js'][713]++;
if (this.getOption("split_sentences")) {
    _$jscoverage['lib/tr8n.js'][714]++;
sentences = Tr8n.Utils.splitSentences(tml);
    _$jscoverage['lib/tr8n.js'][715]++;
translation = tml;
    _$jscoverage['lib/tr8n.js'][716]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][717]++;
sentences.forEach(function(sentence) {
      _$jscoverage['lib/tr8n.js'][718]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      _$jscoverage['lib/tr8n.js'][719]++;
translation = translation.replace(sentence, sentenceTranslation);
    });
    _$jscoverage['lib/tr8n.js'][721]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][722]++;
return translation;
  }

  _$jscoverage['lib/tr8n.js'][725]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  _$jscoverage['lib/tr8n.js'][726]++;
this.resetContext();
  _$jscoverage['lib/tr8n.js'][727]++;
return translation;
};

_$jscoverage['lib/tr8n.js'][730]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {
  _$jscoverage['lib/tr8n.js'][731]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][731]++;
return false;}

  _$jscoverage['lib/tr8n.js'][732]++;
return (node.childNodes.length > 0);
};

_$jscoverage['lib/tr8n.js'][735]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {
  _$jscoverage['lib/tr8n.js'][736]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    {
_$jscoverage['lib/tr8n.js'][737]++;
return true;}


  _$jscoverage['lib/tr8n.js'][739]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    {
_$jscoverage['lib/tr8n.js'][740]++;
return true;}


  _$jscoverage['lib/tr8n.js'][742]++;
return false;
};

_$jscoverage['lib/tr8n.js'][745]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {
  _$jscoverage['lib/tr8n.js'][746]++;
var buffer = "";
  _$jscoverage['lib/tr8n.js'][747]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][748]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][749]++;
var child = node.childNodes[i];
    _$jscoverage['lib/tr8n.js'][750]++;
if (child.nodeType == 3)                          {
_$jscoverage['lib/tr8n.js'][750]++;
buffer = buffer + child.nodeValue;}

    else
      {
_$jscoverage['lib/tr8n.js'][752]++;
buffer = buffer + self.generateTmlTags(child);}

  }
  _$jscoverage['lib/tr8n.js'][754]++;
var tokenContext = self.generateHtmlToken(node);
  _$jscoverage['lib/tr8n.js'][755]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

  _$jscoverage['lib/tr8n.js'][757]++;
var value = this.sanitizeValue(buffer);

  _$jscoverage['lib/tr8n.js'][759]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][760]++;
return '{' + token + '}';}


  _$jscoverage['lib/tr8n.js'][762]++;
if (this.isShortToken(token, value))
    {
_$jscoverage['lib/tr8n.js'][763]++;
return '[' + token + ': ' + value + ']';}


  _$jscoverage['lib/tr8n.js'][765]++;
return '[' + token + ']' + value + '[/' + token + ']';
};

_$jscoverage['lib/tr8n.js'][768]++;
Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {
  _$jscoverage['lib/tr8n.js'][769]++;
if (this.options[name]) {
    _$jscoverage['lib/tr8n.js'][770]++;
return this.options[name];
  }
  _$jscoverage['lib/tr8n.js'][772]++;
return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);
};

_$jscoverage['lib/tr8n.js'][775]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][776]++;
return this.getOption("debug_format").replace('{$0}', translation);
};

_$jscoverage['lib/tr8n.js'][779]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {
  _$jscoverage['lib/tr8n.js'][780]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  _$jscoverage['lib/tr8n.js'][781]++;
return (tml == '');
};

_$jscoverage['lib/tr8n.js'][784]++;
Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {
  _$jscoverage['lib/tr8n.js'][785]++;
this.tokens = [].concat(this.context);
};

_$jscoverage['lib/tr8n.js'][788]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {
  _$jscoverage['lib/tr8n.js'][789]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

_$jscoverage['lib/tr8n.js'][792]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {
  _$jscoverage['lib/tr8n.js'][793]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][793]++;
return false;}

  _$jscoverage['lib/tr8n.js'][794]++;
return (node.parentNode.childNodes.length == 1);
};

_$jscoverage['lib/tr8n.js'][797]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {
  _$jscoverage['lib/tr8n.js'][798]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][798]++;
return false;}


  _$jscoverage['lib/tr8n.js'][800]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][801]++;
var child = node.parentNode.childNodes[i];
    _$jscoverage['lib/tr8n.js'][802]++;
if (child != node) {
      _$jscoverage['lib/tr8n.js'][803]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
        {
_$jscoverage['lib/tr8n.js'][804]++;
return true;}

    }
  }

  _$jscoverage['lib/tr8n.js'][808]++;
return false;
};

_$jscoverage['lib/tr8n.js'][811]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {
  _$jscoverage['lib/tr8n.js'][812]++;
return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

_$jscoverage['lib/tr8n.js'][819]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {
  _$jscoverage['lib/tr8n.js'][820]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
};

_$jscoverage['lib/tr8n.js'][823]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {
  _$jscoverage['lib/tr8n.js'][824]++;
return (node.firstChild == null);
};

_$jscoverage['lib/tr8n.js'][827]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {
  _$jscoverage['lib/tr8n.js'][828]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][828]++;
return true;}

  _$jscoverage['lib/tr8n.js'][829]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][832]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {
  _$jscoverage['lib/tr8n.js'][833]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][833]++;
return false;}

  _$jscoverage['lib/tr8n.js'][834]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

_$jscoverage['lib/tr8n.js'][837]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {
  _$jscoverage['lib/tr8n.js'][838]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][838]++;
return false;}

  _$jscoverage['lib/tr8n.js'][839]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][842]++;
Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {
  _$jscoverage['lib/tr8n.js'][843]++;
return value.replace(/^\s+/,'');
};

_$jscoverage['lib/tr8n.js'][846]++;
Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {
  _$jscoverage['lib/tr8n.js'][847]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][847]++;
return text;}


  _$jscoverage['lib/tr8n.js'][849]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  _$jscoverage['lib/tr8n.js'][850]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][851]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][852]++;
token = match.substring(1, match.length - 2);
    _$jscoverage['lib/tr8n.js'][853]++;
self.context[token] = match;
    _$jscoverage['lib/tr8n.js'][854]++;
text = text.replace(match, "{" + token + "}");
  });

  _$jscoverage['lib/tr8n.js'][857]++;
return text;
};

_$jscoverage['lib/tr8n.js'][860]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {
  _$jscoverage['lib/tr8n.js'][861]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][861]++;
return text;}


  _$jscoverage['lib/tr8n.js'][863]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  _$jscoverage['lib/tr8n.js'][864]++;
var tokenName = this.getOption("data_tokens.numeric_name");

  _$jscoverage['lib/tr8n.js'][866]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][867]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][868]++;
value = match.replace(/[,;]\s/, '');
    _$jscoverage['lib/tr8n.js'][869]++;
token = self.contextualize(tokenName, value);
    _$jscoverage['lib/tr8n.js'][870]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  _$jscoverage['lib/tr8n.js'][873]++;
return text;
};

_$jscoverage['lib/tr8n.js'][876]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {
  _$jscoverage['lib/tr8n.js'][877]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][878]++;
var attributes = node.attributes;
  _$jscoverage['lib/tr8n.js'][879]++;
var attributesHash = {};
  _$jscoverage['lib/tr8n.js'][880]++;
value = ((value == null) ? '{0}' : value);

  _$jscoverage['lib/tr8n.js'][882]++;
if (attributes.length == 0) {
    _$jscoverage['lib/tr8n.js'][883]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][884]++;
return '<' + name + '/>';}

    _$jscoverage['lib/tr8n.js'][885]++;
return '<' + name + '>' + value + '</' + name + '>';
  }

  _$jscoverage['lib/tr8n.js'][888]++;
for(var i=0; i<attributes.length; i++) {
    _$jscoverage['lib/tr8n.js'][889]++;
attributesHash[attributes[i].name] = attributes[i].value;
  }

  _$jscoverage['lib/tr8n.js'][892]++;
var keys = Object.keys(attributesHash);
  _$jscoverage['lib/tr8n.js'][893]++;
keys.sort();

  _$jscoverage['lib/tr8n.js'][895]++;
var attr = [];
  _$jscoverage['lib/tr8n.js'][896]++;
keys.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][897]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    _$jscoverage['lib/tr8n.js'][898]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  _$jscoverage['lib/tr8n.js'][900]++;
attr = attr.join(' ');

  _$jscoverage['lib/tr8n.js'][902]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][903]++;
return '<' + name + ' ' + attr + '/>';}


  _$jscoverage['lib/tr8n.js'][905]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

_$jscoverage['lib/tr8n.js'][908]++;
Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {
  _$jscoverage['lib/tr8n.js'][909]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][910]++;
var map = this.getOption("name_mapping");
  _$jscoverage['lib/tr8n.js'][911]++;
name = (map[name] != null) ? map[name] : name;
  _$jscoverage['lib/tr8n.js'][912]++;
return name;
};

_$jscoverage['lib/tr8n.js'][915]++;
Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {
  _$jscoverage['lib/tr8n.js'][916]++;
if (this.tokens[name] && this.tokens[name] != context) {
    _$jscoverage['lib/tr8n.js'][917]++;
var index = 0;
    _$jscoverage['lib/tr8n.js'][918]++;
var matches = name.match(/\d+$/);
    _$jscoverage['lib/tr8n.js'][919]++;
if (matches && matches.length > 0) {
      _$jscoverage['lib/tr8n.js'][920]++;
index = parseInt(matches[matches.length-1]);
      _$jscoverage['lib/tr8n.js'][921]++;
name = name.replace("" + index, '');
    }
    _$jscoverage['lib/tr8n.js'][923]++;
name = name + (index + 1);
    _$jscoverage['lib/tr8n.js'][924]++;
return this.contextualize(name, context);
  }

  _$jscoverage['lib/tr8n.js'][927]++;
this.tokens[name] = context;
  _$jscoverage['lib/tr8n.js'][928]++;
return name;
};

_$jscoverage['lib/tr8n.js'][931]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {
  _$jscoverage['lib/tr8n.js'][932]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][933]++;
this.debugTree(doc, 0);
};

_$jscoverage['lib/tr8n.js'][936]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {
  _$jscoverage['lib/tr8n.js'][937]++;
var padding = new Array(depth+1).join('=');

  _$jscoverage['lib/tr8n.js'][939]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  _$jscoverage['lib/tr8n.js'][941]++;
if (node.childNodes) {
    _$jscoverage['lib/tr8n.js'][942]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][943]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][944]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][945]++;
self.debugTree(child, depth+1);
    }
  }
};

_$jscoverage['lib/tr8n.js'][950]++;
Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {
  _$jscoverage['lib/tr8n.js'][951]++;
var info = [];
  _$jscoverage['lib/tr8n.js'][952]++;
info.push(node.nodeType);

  _$jscoverage['lib/tr8n.js'][954]++;
if (node.nodeType == 1)
    {
_$jscoverage['lib/tr8n.js'][955]++;
info.push(node.tagName);}


  _$jscoverage['lib/tr8n.js'][957]++;
if (this.isInlineNode(node)) {
    _$jscoverage['lib/tr8n.js'][958]++;
info.push("inline");
    _$jscoverage['lib/tr8n.js'][959]++;
if (this.hasInlineOrTextSiblings(node))
      {
_$jscoverage['lib/tr8n.js'][960]++;
info.push("sentence");}

    else
      {
_$jscoverage['lib/tr8n.js'][962]++;
info.push("only translatable");}

  }

  _$jscoverage['lib/tr8n.js'][965]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][966]++;
info.push("self closing");}


  _$jscoverage['lib/tr8n.js'][968]++;
if (this.isOnlyChild(node))
    {
_$jscoverage['lib/tr8n.js'][969]++;
info.push("only child");}


  _$jscoverage['lib/tr8n.js'][971]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][972]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


  _$jscoverage['lib/tr8n.js'][974]++;
return "[" + info.join(", ") + "]";
};
;;;;
_$jscoverage['lib/tr8n.js'][977]++;
Tr8n.Tokens.Data = function(label, name) {
  _$jscoverage['lib/tr8n.js'][978]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][979]++;
this.fullName = name;
  _$jscoverage['lib/tr8n.js'][980]++;
this.parseElements();
};

_$jscoverage['lib/tr8n.js'][983]++;
Tr8n.Tokens.Data.prototype.parseElements = function() {
  _$jscoverage['lib/tr8n.js'][984]++;
var nameWithoutParens = this.fullName.substring(1, this.fullName.length-2);
  _$jscoverage['lib/tr8n.js'][985]++;
var nameWithoutCaseKeys = nameWithoutParens.split('::')[0].trim();

  _$jscoverage['lib/tr8n.js'][987]++;
this.shortName = nameWithoutParens.split(':')[0].trim();
    _$jscoverage['lib/tr8n.js'][988]++;
this.caseKeys = nameWithoutParens.match(/(::\w+)/g);
  _$jscoverage['lib/tr8n.js'][989]++;
this.contextKeys = nameWithoutCaseKeys.match(/(:\w+)/g);
};

_$jscoverage['lib/tr8n.js'][992]++;
Tr8n.Tokens.Data.prototype.contextForLanguage = function(language, opts) {
  _$jscoverage['lib/tr8n.js'][993]++;
if (this.contextKeys.length > 0)
    {
_$jscoverage['lib/tr8n.js'][994]++;
return language.contextByKeyword(this.contextKeys[0]);}


  _$jscoverage['lib/tr8n.js'][996]++;
return language.contextByTokenName(this.shortName);
};

_$jscoverage['lib/tr8n.js'][999]++;
Tr8n.Tokens.Data.prototype.tokenObject = function(tokenValues, tokenName) {
  _$jscoverage['lib/tr8n.js'][1000]++;
if (tokenValues == null) {
_$jscoverage['lib/tr8n.js'][1000]++;
return null;}

  
  _$jscoverage['lib/tr8n.js'][1002]++;
var tokenObject = tokenValues[tokenName];
  _$jscoverage['lib/tr8n.js'][1003]++;
if (typeof tokeObject === 'array')
    {
_$jscoverage['lib/tr8n.js'][1004]++;
return tokenObject[0];}


  _$jscoverage['lib/tr8n.js'][1006]++;
return tokenObject.object || tokenObject;
};

_$jscoverage['lib/tr8n.js'][1009]++;
Tr8n.Tokens.Data.prototype.error = function(msg) {
  _$jscoverage['lib/tr8n.js'][1010]++;
console.log(this.fullName + " in \"" + this.label + "\" : " + msg);
  _$jscoverage['lib/tr8n.js'][1011]++;
return this.fullName;
};


_$jscoverage['lib/tr8n.js'][1015]++;
Tr8n.Tokens.Data.prototype.tokenValueFromArrayParam = function(arr, language, options) {
  _$jscoverage['lib/tr8n.js'][1016]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][1017]++;
if (arr.lenght == 0)
    {
_$jscoverage['lib/tr8n.js'][1018]++;
return this.error("Invalid number of params of an array");}


  _$jscoverage['lib/tr8n.js'][1020]++;
var object = arr[0];
  _$jscoverage['lib/tr8n.js'][1021]++;
var method = arr.lenght > 1 ? arr[1] : null;

  _$jscoverage['lib/tr8n.js'][1023]++;
if (typeof object === "array")
    {
_$jscoverage['lib/tr8n.js'][1024]++;
return this.tokenValueFromArray(tokenValues, language, options);}


  _$jscoverage['lib/tr8n.js'][1026]++;
if (method == null)
    {
_$jscoverage['lib/tr8n.js'][1027]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][1029]++;
if (method.match(/^@@/))
    {
_$jscoverage['lib/tr8n.js'][1030]++;
return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][1032]++;
if (method.match(/^@/))
    {
_$jscoverage['lib/tr8n.js'][1033]++;
return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));}


    _$jscoverage['lib/tr8n.js'][1035]++;
return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
};



_$jscoverage['lib/tr8n.js'][1040]++;
Tr8n.Tokens.Data.prototype.tokenValueFromHashParam = function(hash, language, options) {
  _$jscoverage['lib/tr8n.js'][1041]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][1042]++;
var value = hash.value;
  _$jscoverage['lib/tr8n.js'][1043]++;
var object = hash.object;

  _$jscoverage['lib/tr8n.js'][1045]++;
if (value) {
_$jscoverage['lib/tr8n.js'][1045]++;
return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));}


  _$jscoverage['lib/tr8n.js'][1047]++;
if (object == null || typeof object === "undefined")
    {
_$jscoverage['lib/tr8n.js'][1048]++;
return this.error("No object or value are provided in the hash");}


  _$jscoverage['lib/tr8n.js'][1050]++;
var attr = hash.attribute;

  _$jscoverage['lib/tr8n.js'][1052]++;
if (attr == null || typeof attr === "undefined")
    {
_$jscoverage['lib/tr8n.js'][1053]++;
return this.error("Missing value for hash token");}


  _$jscoverage['lib/tr8n.js'][1055]++;
return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
};



_$jscoverage['lib/tr8n.js'][1060]++;
Tr8n.Tokens.Data.prototype.tokenValueFromArray = function(params, language, options) {
  _$jscoverage['lib/tr8n.js'][1061]++;
var listOptions = {
    description: "List joiner",
    limit: 4,
    separator: ", ",
    joiner: 'and',
    less: '{laquo} less',
    expandable: true,
    collapsable: true
  };

  _$jscoverage['lib/tr8n.js'][1071]++;
var objects = params[0];
  _$jscoverage['lib/tr8n.js'][1072]++;
var method = (params.length > 1 ? params[1] : null);

  _$jscoverage['lib/tr8n.js'][1074]++;
if (params.length > 2)
    {
_$jscoverage['lib/tr8n.js'][1075]++;
listOptions = Tr8n.Utils.merge(listOptions, params[2]);}


  _$jscoverage['lib/tr8n.js'][1077]++;
if (options["skip_decorations"])
    {
_$jscoverage['lib/tr8n.js'][1078]++;
listOptions.expandable = false;}


  _$jscoverage['lib/tr8n.js'][1080]++;
var values = [];
  _$jscoverage['lib/tr8n.js'][1081]++;
for (var obj in objects) {
    _$jscoverage['lib/tr8n.js'][1082]++;
if (method == null) {
      _$jscoverage['lib/tr8n.js'][1083]++;
values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
    } else {
_$jscoverage['lib/tr8n.js'][1084]++;
if (typeof method === "string") {
      _$jscoverage['lib/tr8n.js'][1085]++;
if (method.match(/^@@/))
        {
_$jscoverage['lib/tr8n.js'][1086]++;
values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else {
_$jscoverage['lib/tr8n.js'][1087]++;
if (method.match(/^@/))
        {
_$jscoverage['lib/tr8n.js'][1088]++;
values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else
        {
_$jscoverage['lib/tr8n.js'][1090]++;
values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));}
}

    } else {
_$jscoverage['lib/tr8n.js'][1091]++;
if (typeof method === "object") {
      _$jscoverage['lib/tr8n.js'][1092]++;
var attribute = method.attribute;
      _$jscoverage['lib/tr8n.js'][1093]++;
var value = method.value;

      _$jscoverage['lib/tr8n.js'][1095]++;
if (attribute == null)
        {
_$jscoverage['lib/tr8n.js'][1096]++;
return this.error("No attribute is provided for the hash object in the array");}


      _$jscoverage['lib/tr8n.js'][1098]++;
if (!object[attribute])
        {
_$jscoverage['lib/tr8n.js'][1099]++;
return this.error("Hash object in the array does not contain such attribute");}


      _$jscoverage['lib/tr8n.js'][1101]++;
attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));

      _$jscoverage['lib/tr8n.js'][1103]++;
if (value)
        {
_$jscoverage['lib/tr8n.js'][1104]++;
values.push(value.replace("{$0}", attribute));}

      else
        {
_$jscoverage['lib/tr8n.js'][1106]++;
values.push(attribute);}

    } else {
_$jscoverage['lib/tr8n.js'][1107]++;
if (typeof method === "function") {
      _$jscoverage['lib/tr8n.js'][1108]++;
values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
    }}
}
}

  }

  _$jscoverage['lib/tr8n.js'][1112]++;
if (values.lenght == 1)
    {
_$jscoverage['lib/tr8n.js'][1113]++;
return values[0];}


  _$jscoverage['lib/tr8n.js'][1115]++;
if (!listOptions.joiner || listOptions.joiner == "")
    {
_$jscoverage['lib/tr8n.js'][1116]++;
return values.join(listOptions.separator);}


  _$jscoverage['lib/tr8n.js'][1118]++;
var joiner = language.translate(listOptions.joiner, listOptions.description, {}, options);

  _$jscoverage['lib/tr8n.js'][1120]++;
if (values.length <= listOptions.limit) {
    _$jscoverage['lib/tr8n.js'][1121]++;
var last = values.pop();
    _$jscoverage['lib/tr8n.js'][1122]++;
return values.join(listOptions.separator) + " " + joiner + " " + last;
  }

  _$jscoverage['lib/tr8n.js'][1125]++;
var displayedValues = values.slice(0, listOptions.limit);
  _$jscoverage['lib/tr8n.js'][1126]++;
var remainingValues = values.slice(listOptions.limit);

  _$jscoverage['lib/tr8n.js'][1128]++;
var result = displayedValues.join(listOptions.separator);
  _$jscoverage['lib/tr8n.js'][1129]++;
var otherValues = language.translate("{count||other}", listOptions.description, {count: remainingValues.length}, options);

  _$jscoverage['lib/tr8n.js'][1131]++;
if (listOptions.expandable) {
    _$jscoverage['lib/tr8n.js'][1132]++;
result = result + " " + joiner + " ";
    _$jscoverage['lib/tr8n.js'][1133]++;
if (listOptions.remainder && typeof listOptions.remainder === "function")
      {
_$jscoverage['lib/tr8n.js'][1134]++;
return result + listOptions.remainder(remainingValues);}

    _$jscoverage['lib/tr8n.js'][1135]++;
return result + otherValues;
  }

  _$jscoverage['lib/tr8n.js'][1138]++;
var key = listOptions.key ? listOptions.key : Tr8n.Utils.generateKey(this.label, values.join(","));

  _$jscoverage['lib/tr8n.js'][1140]++;
result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
  _$jscoverage['lib/tr8n.js'][1141]++;
result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';

  _$jscoverage['lib/tr8n.js'][1143]++;
if (listOptions.remainder && typeof listOptions.remainder === "function")
    {
_$jscoverage['lib/tr8n.js'][1144]++;
result = result + listOptions.remainder(remainingValues);}

  else
    {
_$jscoverage['lib/tr8n.js'][1146]++;
result = result + otherValues;}


  _$jscoverage['lib/tr8n.js'][1148]++;
result = result + "</a></span>";

  _$jscoverage['lib/tr8n.js'][1150]++;
result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + listOptions.separator;
  _$jscoverage['lib/tr8n.js'][1151]++;
var lastRemaining = remainingValues.pop();
  _$jscoverage['lib/tr8n.js'][1152]++;
result = result + remainingValues.join(listOptions.separator);
  _$jscoverage['lib/tr8n.js'][1153]++;
result = result + " " + joiner + " " + lastRemaining;

  _$jscoverage['lib/tr8n.js'][1155]++;
if (listOptions.collapsable) {
    _$jscoverage['lib/tr8n.js'][1156]++;
result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
    _$jscoverage['lib/tr8n.js'][1157]++;
result = result + language.translate(listOptions.less, listOptions["description"], {}, options);
    _$jscoverage['lib/tr8n.js'][1158]++;
result = result + "</a>";
  }

  _$jscoverage['lib/tr8n.js'][1161]++;
result = result + "</span>";
  _$jscoverage['lib/tr8n.js'][1162]++;
return result;
};

_$jscoverage['lib/tr8n.js'][1165]++;
Tr8n.Tokens.Data.prototype.tokenValue = function(tokenValues, language, options) {
  _$jscoverage['lib/tr8n.js'][1166]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][1167]++;
var object = null;

  _$jscoverage['lib/tr8n.js'][1169]++;
if (tokenValues[this.shortName])
    {
_$jscoverage['lib/tr8n.js'][1170]++;
object = tokenValues[this.shortName];}

  else
    {
_$jscoverage['lib/tr8n.js'][1172]++;
object = Tr8n.config.defaultToken(this.shortName);}


  _$jscoverage['lib/tr8n.js'][1174]++;
if (!object)
    {
_$jscoverage['lib/tr8n.js'][1175]++;
return this.error("Missing token value");}


  _$jscoverage['lib/tr8n.js'][1177]++;
if (typeof object === "array") {
    _$jscoverage['lib/tr8n.js'][1178]++;
return this.tokenValueFromArrayParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][1181]++;
if (typeof object === "object") {
    _$jscoverage['lib/tr8n.js'][1182]++;
return this.tokenValueFromHashParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][1185]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
};

_$jscoverage['lib/tr8n.js'][1188]++;
Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][1189]++;
var lcase = language.languageCase(key);
  _$jscoverage['lib/tr8n.js'][1190]++;
if (!lcase) {
_$jscoverage['lib/tr8n.js'][1190]++;
return value;}

  _$jscoverage['lib/tr8n.js'][1191]++;
return lcase.apply(value, object, options);
};

_$jscoverage['lib/tr8n.js'][1194]++;
Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][1195]++;
value = "" . value;

  _$jscoverage['lib/tr8n.js'][1197]++;
if (!options.safe) {
        _$jscoverage['lib/tr8n.js'][1198]++;
value = htmlspecialchars(value);
  }

  _$jscoverage['lib/tr8n.js'][1201]++;
if (this.caseKeys.length > 0) {
    _$jscoverage['lib/tr8n.js'][1202]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1203]++;
this.caseKeys.forEach(function(lcase) {
      _$jscoverage['lib/tr8n.js'][1204]++;
value = self.applyCase(lcase, value, object, language, options);
    });
  }

  _$jscoverage['lib/tr8n.js'][1208]++;
return value;
};

_$jscoverage['lib/tr8n.js'][1211]++;
Tr8n.Tokens.Data.prototype.substitute = function(label, tokenValues, language, options) {
  _$jscoverage['lib/tr8n.js'][1212]++;
var tokenValue = this.tokenValue(tokenValues, language, options);
  _$jscoverage['lib/tr8n.js'][1213]++;
return label.replace(this.fullName, tokenValue);
};

;_$jscoverage['lib/tr8n.js'][1216]++;
Tr8n.Tokens.Method = function() {

};


;;;;;;;
_$jscoverage['lib/tr8n.js'][1222]++;
Tr8n.Language = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1223]++;
this.attrs = attrs;
};

_$jscoverage['lib/tr8n.js'][1226]++;
Tr8n.Language.prototype.translate = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1227]++;
return label;
};
;;;;;_$jscoverage['lib/tr8n.js'][1229]++;
var program = require('commander');

_$jscoverage['lib/tr8n.js'][1231]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


_$jscoverage['lib/tr8n.js'][1239]++;
Tr8n.config = new Tr8n.Configuration();



_$jscoverage['lib/tr8n.js'][1243]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][1244]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][1245]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][1246]++;
exports.Utils = Tr8n.Utils;


_$jscoverage['lib/tr8n.js'][1249]++;
exports.configure = function(callback) {
  _$jscoverage['lib/tr8n.js'][1250]++;
callback(Tr8n.config);
};

_$jscoverage['lib/tr8n.js'][1253]++;
exports.tr = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1254]++;
return label;
};
