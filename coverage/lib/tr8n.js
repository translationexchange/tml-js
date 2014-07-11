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
'};;',
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
'};',
'',
'Tr8n.Utils.clone = function(obj) {',
'  if(obj == null || typeof(obj) != \'object\')',
'    return obj;',
'',
'  var temp = obj.constructor(); ',
'  for(var key in obj)',
'    temp[key] = Tr8n.Utils.clone(obj[key]);',
'  return temp;',
'};',
'',
'Tr8n.Utils.keys = function(obj) {',
'  return Object.keys(obj);',
'};',
'',
'Tr8n.Utils.generateKey = function(label, description) {',
'  return MD5(label + ";;;" + description);',
'};',
';',
'Tr8n.Configuration = function() {',
'  this.initDefaultTokens();',
'  this.initTranslatorOptions();',
'  this.initContextRules();',
'  this.enabled = true;',
'  this.default_locale = "en-US";',
'};',
'',
'Tr8n.Configuration.prototype.initDefaultTokens = function() {',
'  this.default_tokens = {',
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
'Tr8n.Configuration.prototype.getDefaultToken = function(token, type, format) {',
'  type = type || "data"; format = format || "html";',
'  if (typeof this.default_tokens[format][type][token] === \'undefined\') return null;',
'  return new String(this.default_tokens[format][type][token]);',
'};',
'',
'Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {',
'  type = type || "data"; format = format || "html";',
'  this.default_tokens[format] = this.default_tokens[format] || {};',
'  this.default_tokens[format][type] = this.default_tokens[format][type] || {};',
'  this.default_tokens[format][type][token] = value;',
'};',
'',
'Tr8n.Configuration.prototype.initTranslatorOptions = function() {',
'  this.translator_options = {',
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
'Tr8n.Configuration.prototype.initContextRules = function() {',
'  this.context_rules = {',
'    number: {',
'      variables: {}',
'    },',
'    gender: {',
'      variables: {',
'        "@gender": "gender"',
'      }',
'    },',
'    genders: {',
'      variables: {',
'        "@genders": function(list) {',
'          var genders = [];',
'          list.forEach(function(obj) {',
'            genders.push(obj.gender);',
'          });',
'          return genders;',
'        }',
'      }',
'    },',
'    date: {',
'      variables: {}',
'    },',
'    time: {',
'      variables: {}',
'    }',
'  };',
'};',
'',
'Tr8n.Configuration.prototype.getContextRules = function(key) {',
'  return this.context_rules[key] || {};',
'};',
'',
'Tr8n.Configuration.prototype.isDisabled = function() {',
'  return !enabled;',
'};',
'',
'Tr8n.Configuration.prototype.isEnabled = function() {',
'  return enabled;',
'};',
';',
'Tr8n.Tokens.Data = function(name, label) {',
'  this.full_name = name;',
'  this.label = label;',
'  this.parseElements();',
'};',
'',
'Tr8n.Tokens.Data.prototype.parseElements = function() {',
'  var name_without_parens = this.full_name.substring(1, this.full_name.length-1);',
'  var name_without_case_keys = name_without_parens.split(\'::\')[0].trim();',
'',
'  this.short_name = name_without_parens.split(\':\')[0].trim();',
'  this.case_keys = [];',
'',
'  var keys = name_without_parens.match(/(::\\s*\\w+)/g) || [];',
'  for (var i=0; i<keys.length; i++) {',
'    this.case_keys.push(keys[i].replace(/[:]/g, "").trim());',
'  }',
'',
'  this.context_keys = [];',
'  keys = name_without_case_keys.match(/(:\\s*\\w+)/g) || [];',
'  for (i=0; i<keys.length; i++) {',
'    this.context_keys.push(keys[i].replace(/[:]/g, "").trim());',
'  }',
'};',
'',
'Tr8n.Tokens.Data.prototype.getContextForLanguage = function(language) {',
'  if (this.context_keys.length > 0)',
'    return language.getContextByKeyword(this.context_keys[0]);',
'',
'  return language.getContextByTokenName(this.short_name);',
'};',
'',
'Tr8n.Tokens.Data.prototype.tokenObject = function(tokens, name) {',
'  if (tokens == null) return null;',
'',
'  var object = tokens[name];',
'  if (typeof object === \'array\')',
'    return object[0];',
'',
'  return object.object || object;',
'};',
'',
'Tr8n.Tokens.Data.prototype.error = function(msg) {',
'  console.log(this.full_name + " in \\"" + this.label + "\\" : " + msg);',
'  return this.full_name;',
'};',
'',
'',
'Tr8n.Tokens.Data.prototype.getTokenValueFromArrayParam = function(arr, language, options) {',
'  options = options || {};',
'  if (arr.lenght == 0)',
'    return this.error("Invalid number of params of an array");',
'',
'  var object = arr[0];',
'  var method = arr.lenght > 1 ? arr[1] : null;',
'',
'  if (typeof object === "array")',
'    return this.getTokenValueFromArray(arr, language, options);',
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
'  return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));',
'};',
'',
'',
'',
'Tr8n.Tokens.Data.prototype.getTokenValueFromHashParam = function(hash, language, options) {',
'  options = options || {};',
'  var value = hash.value;',
'  var object = hash.object;',
'',
'  if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));',
'  if (!object) return this.error("No object or value are provided in the hash");',
'',
'  var attr = hash.attribute;',
'',
'  if (!attr) return this.error("Missing value for hash token");',
'',
'  return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'};',
'',
'',
'',
'Tr8n.Tokens.Data.prototype.getTokenValueFromArray = function(params, language, options) {',
'  var list_options = {',
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
'    list_options = Tr8n.Utils.merge(list_options, params[2]);',
'',
'  if (options["skip_decorations"])',
'    list_options.expandable = false;',
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
'  if (!list_options.joiner || list_options.joiner == "")',
'    return values.join(list_options.separator);',
'',
'  var joiner = language.translate(list_options.joiner, list_options.description, {}, options);',
'',
'  if (values.length <= list_options.limit) {',
'    var last = values.pop();',
'    return values.join(list_options.separator) + " " + joiner + " " + last;',
'  }',
'',
'  var displayed_values = values.slice(0, list_options.limit);',
'  var remaining_values = values.slice(list_options.limit);',
'',
'  var result = displayed_values.join(list_options.separator);',
'  var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);',
'',
'  if (list_options.expandable) {',
'    result = result + " " + joiner + " ";',
'    if (list_options.remainder && typeof list_options.remainder === "function")',
'      return result + list_options.remainder(remaining_values);',
'    return result + other_values;',
'  }',
'',
'  var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));',
'',
'  result = result + \'<span id="tr8n_other_link_\' + key + \'"> \' + joiner + \' \';',
'  result = result + \'<a href="#" class="tr8n_other_list_link" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'none\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'inline\'; return false;" + \'">\';',
'',
'  if (list_options.remainder && typeof list_options.remainder === "function")',
'    result = result + list_options.remainder(remaining_values);',
'  else',
'    result = result + other_values;',
'',
'  result = result + "</a></span>";',
'',
'  result = result + \'<span id="tr8n_other_elements_\' + key + \'" style="display:none">\' + list_options.separator;',
'  var last_remaining = remaining_values.pop();',
'  result = result + remaining_values.join(list_options.separator);',
'  result = result + " " + joiner + " " + last_remaining;',
'',
'  if (list_options.collapsable) {',
'    result = result + \' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'inline\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'none\'; return false;" + \'">\';',
'    result = result + language.translate(list_options.less, list_options["description"], {}, options);',
'    result = result + "</a>";',
'  }',
'',
'  result = result + "</span>";',
'  return result;',
'};',
'',
'Tr8n.Tokens.Data.prototype.getTokenValue = function(tokens, language, options) {',
'  options = options || {};',
'  var object = null;',
'',
'  if (tokens[this.short_name])',
'    object = tokens[this.short_name];',
'  else',
'    object = Tr8n.config.getDefaultToken(this.short_name);',
'',
'  if (!object)',
'    return this.error("Missing token value");',
'',
'  if (typeof object === "array") {',
'    return this.getTokenValueFromArrayParam(object, language, options);',
'  }',
'',
'  if (typeof object === "object") {',
'    return this.getTokenValueFromHashParam(object, language, options);',
'  }',
'',
'  return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));',
'};',
'',
'Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {',
'  var lcase = language.getLanguageCaseByKeyword(key);',
'  if (!lcase) return value;',
'  return lcase.apply(value, object, options);',
'};',
'',
'Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {',
'  value = "" + value;',
'',
'  if (!options.safe) {',
'        value = escape(value);',
'  }',
'',
'  if (this.case_keys.length > 0) {',
'    for (var key in this.case_keys) {',
'      value = this.applyCase(key, value, object, language, options);',
'    }',
'  }',
'',
'  return value;',
'};',
'',
'Tr8n.Tokens.Data.prototype.substitute = function(label, tokens, language, options) {',
'  return label.replace(this.full_name, this.getTokenValue(tokens, language, options));',
'};',
'',
';',
'Tr8n.Tokens.Method = function() {',
'',
'};',
'',
'',
';',
'Tr8n.Tokens.Piped = function() {',
'',
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
'  setVars: function(vars) {',
'    this.vars = vars;',
'  },',
'',
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
'Tr8n.Tokenizers.Data = function(label, context, options) {',
'  this.label = label;',
'  this.context = context || {};',
'  this.options = options || {};',
'  this.tokenize();',
'};',
'',
'Tr8n.Tokenizers.Data.prototype.supportedTokens = function() {',
'  return [',
'    [/(\\{[^_:][\\w]*(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Data],',
'    [/(\\{[^_:.][\\w]*(\\.[\\w]+)(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Method],',
'    [/(\\{[^_:|][\\w]*(:[\\w]+)*(::[\\w]+)*\\s*\\|\\|?[^{^}]+\\})/, Tr8n.Tokens.Piped]',
'  ];',
'};',
'',
'Tr8n.Tokenizers.Data.prototype.tokenize = function() {',
'  this.tokens = [];',
'  for (var tokenInfo in this.supportedTokens()) {',
'    var matches = this.label.match(tokenInfo[0]) || [];',
'    for (var i=0; i<matches.length; i++) {',
'        this.tokens.push(new tokenInfo[1](matches[i], this.label));',
'    }',
'  }',
'};',
'',
'Tr8n.Tokenizers.Data.prototype.isTokenAllowed = function(token) {',
'  if (this.options.allowed_tokens) return true;',
'  return (this.options.allowed_tokens.indexOf(token.name) != -1);',
'};',
'',
'Tr8n.Tokenizers.Data.prototype.substitute = function(language, options) {',
'  var label = this.label;',
'  for (var i=0; i<this.tokens.length; i++) {',
'    var token = this.tokens[i];',
'    if (this.isTokenAllowed(token)) {',
'      label = token.substitute(label, this.context, language, options);',
'    }',
'  }',
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
'Tr8n.Tokenizers.Decoration = function(label, context, opts) {',
'  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";',
'  this.context = context || {};',
'  this.opts = opts || {};',
'  this.fragments = [];',
'  this.tokens = [];',
'  this.tokenize();',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.tokenize = function() {',
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
'Tr8n.Tokenizers.Decoration.prototype.peek = function() {',
'  if (this.fragments.length == 0) return null;',
'  return this.fragments[0];',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.getNextFragment = function() {',
'  if (this.fragments.length == 0) return null;',
'  return this.fragments.shift();',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.parse = function() {',
'  var token = this.getNextFragment();',
'  if (token.match(new RegExp(RE_SHORT_TOKEN_START)))',
'    return this.parseTree(token.replace(/[\\[:]/g, \'\'), TOKEN_TYPE_SHORT);',
'  if (token.match(new RegExp(RE_LONG_TOKEN_START)))',
'    return this.parseTree(token.replace(/[\\[\\]]/g, \'\'), TOKEN_TYPE_LONG);',
'  return token;',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.parseTree = function(name, type) {',
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
'  this.getNextFragment();',
'  return tree;',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.isTokenAllowed = function(token) {',
'  return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.getDefaultDecoration = function(token, value) {',
'  var default_decoration = Tr8n.config.getDefaultToken(token, "decoration");',
'  if (default_decoration == null) return value;',
'',
'  var decoration_token_values = this.context[token];',
'  default_decoration = default_decoration.replace(PLACEHOLDER, value);',
'',
'  if (decoration_token_values instanceof Object) {',
'    var keys = Tr8n.Utils.keys(decoration_token_values);',
'    for (var i = 0; i < keys.length; i++) {',
'      default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);',
'    }',
'  }',
'',
'  return default_decoration;',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.apply = function(token, value) {',
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
'      return this.getDefaultDecoration(token, value);',
'',
'    return value;',
'  }',
'',
'  return this.getDefaultDecoration(token, value);',
'};',
'',
'Tr8n.Tokenizers.Decoration.prototype.evaluate = function(expr) {',
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
'Tr8n.Tokenizers.Decoration.prototype.substitute = function(language, options) {',
'  return this.evaluate(this.parse());',
'};',
';',
'var HTML_SPECIAL_CHAR_REGEX = \'/(&[^;]*;)/\';',
'var INDEPENDENT_NUMBER_REGEX = \'/^(\\\\d+)$|^(\\\\d+[,;\\\\s])|(\\\\s\\\\d+)$|(\\\\s\\\\d+[,;\\\\s])/\';',
'var VERBOSE_DATE_REGEX = \'/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\\\s\\\\d+(,\\\\s\\\\d+)*(,*\\\\sat\\\\s\\\\d+:\\\\d+(\\\\sUTC))*)/\';',
'',
'Tr8n.Tokenizers.Dom = function(doc, context, options) {',
'  this.doc = doc;',
'  this.context = context || {};',
'  this.tokens = [];',
'  this.options = options || {};',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.translate = function() {',
'  return this.translateTree(this.doc);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.translateTree = function(node) {',
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
'Tr8n.Tokenizers.Dom.prototype.isNonTranslatableNode = function(node) {',
'  if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)',
'    return true;',
'  if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")',
'    return true;',
'  return false;',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.translateTml = function(tml) {',
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
'Tr8n.Tokenizers.Dom.prototype.hasChildNodes = function(node) {',
'  if (!node.childNodes) return false;',
'  return (node.childNodes.length > 0);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isBetweenSeparators = function(node) {',
'  if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))',
'    return true;',
'',
'  if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))',
'    return true;',
'',
'  return false;',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.generateTmlTags = function(node) {',
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
'Tr8n.Tokenizers.Dom.prototype.getOption = function(name) {',
'  if (this.options[name]) {',
'    return this.options[name];',
'  }',
'  return Tr8n.Utils.hashValue(Tr8n.config.translator_options, name);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.debugTranslation = function(translation) {',
'  return this.getOption("debug_format").replace(\'{$0}\', translation);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isEmptyString = function(tml) {',
'  tml = tml.replace(/[\\s\\n\\r\\t\\0\\x0b\\xa0\\xc2]/g, \'\');',
'  return (tml == \'\');',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.resetContext = function() {',
'  this.tokens = [].concat(this.context);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isShortToken = function(token, value) {',
'  return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isOnlyChild = function(node) {',
'  if (node.parentNode == null) return false;',
'  return (node.parentNode.childNodes.length == 1);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.hasInlineOrTextSiblings = function(node) {',
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
'Tr8n.Tokenizers.Dom.prototype.isInlineNode = function(node) {',
'  return (',
'    node.nodeType == 1',
'    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1',
'    && !this.isOnlyChild(node)',
'  );',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isContainerNode = function(node) {',
'  return (node.nodeType == 1 && !this.isInlineNode(node));',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isSelfClosingNode = function(node) {',
'  return (node.firstChild == null);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isIgnoredNode = function(node) {',
'  if (node.nodeType != 1) return true;',
'  return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isValidTextNode = function(node) {',
'  if (node == null) return false;',
'  return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.isSeparatorNode = function(node) {',
'  if (node == null) return false;',
'  return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.sanitizeValue = function(value) {',
'  return value.replace(/^\\s+/,\'\');',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.replaceSpecialCharacters = function(text) {',
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
'Tr8n.Tokenizers.Dom.prototype.generateDataTokens = function(text) {',
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
'Tr8n.Tokenizers.Dom.prototype.generateHtmlToken = function(node, value) {',
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
'  var keys = Tr8n.Utils.keys(attributesHash);',
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
'Tr8n.Tokenizers.Dom.prototype.adjustName = function(node) {',
'  var name = node.tagName.toLowerCase();',
'  var map = this.getOption("name_mapping");',
'  name = (map[name] != null) ? map[name] : name;',
'  return name;',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.contextualize = function(name, context) {',
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
'Tr8n.Tokenizers.Dom.prototype.debug = function(doc) {',
'  this.doc = doc;',
'  this.debugTree(doc, 0);',
'};',
'',
'Tr8n.Tokenizers.Dom.prototype.debugTree = function(node, depth) {',
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
'Tr8n.Tokenizers.Dom.prototype.nodeInfo = function(node) {',
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
'Tr8n.Application = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.languages = [];',
'  for(var lang in (attrs.languages || [])) {',
'    this.languages.push(new Tr8n.Language(Tr8n.Utils.extend(lang, {application: this})));',
'  }',
'',
'  this.languages_by_locale = {};',
'};',
'',
'Tr8n.Application.prototype.getApiClient = function() {',
'  if (!this.api_client)',
'    this.api_client = new Tr8n.config.api_client_class(this);',
'  return this.api_client;',
'};',
'',
'Tr8n.Application.prototype.addLanguage = function(language) {',
'  language.application = this;',
'  this.languages_by_locale[language.attrs.locale] = language;',
'};',
'',
'Tr8n.Application.prototype.getLanguage = function(locale) {',
'  return this.languages_by_locale[locale || Tr8n.config.default_locale];',
'};',
'',
';',
'Tr8n.Source = function(attrs) {',
'  this.attrs = attrs;',
'};',
';',
'Tr8n.TranslationKey = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.key = this.key || Tr8n.Utils.generateKey(this.label, this.description);',
'',
'  if (!this.locale && this.application)',
'      this.locale = this.application.default_locale;',
'',
'  if (!this.language && this.application)',
'    this.language = this.application.language(this.locale);',
'',
'  this.addTranslations(attrs.translations || {});',
'};',
'',
'Tr8n.Application.prototype.addTranslation = function(translation) {',
'  if (this.translations == null)',
'    this.translations = {};',
'',
'  if (this.translations[translation.locale])',
'    this.translations[translation.locale] = [];',
'',
'  this.translations[translation.locale].push(',
'    new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))',
'  );',
'};',
'',
'Tr8n.Application.prototype.addTranslations = function(translations_by_locale) {',
'  for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {',
'    for(var translation in translations_by_locale[locale]) {',
'      this.addTranslation(translation);',
'    }',
'  }',
'};',
'',
'Tr8n.Application.prototype.translate = function(language, tokens, options) {',
'  if (Tr8n.config.isDisabled())',
'    return this.substituteTokens(this.label, tokens, language, options);',
'',
'',
'};',
'',
'Tr8n.Application.prototype.getDataTokens = function() {',
'  if (!this.data_tokens) {',
'    var tokenizer = new Tr8n.Tokenizers.Data(this.label);',
'    this.data_tokens = tokenizer.tokens();',
'  }',
'  return this.data_tokens;',
'};',
'',
'Tr8n.Application.prototype.getDataTokenNames = function() {',
'  if (!this.data_token_names) {',
'    this.data_token_names = [];',
'    for (var token in this.getDataTokens())',
'      this.data_token_names.push(token.full_name);',
'  }',
'  return this.data_token_names;',
'};',
'',
'Tr8n.Application.prototype.substituteTokens = function(label, tokens, language, options) {',
'  if (label.indexOf(\'{\') != -1) {',
'    var tokenizer = new Tr8n.Tokenizers.Data(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.dataTokens()}));',
'    label = tokenizer.substitute(language, options);',
'  }',
'',
'  if (label.indexOf(\'[\') != -1) {',
'    var tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.decorationTokens()}));',
'    label = tokenizer.substitute();',
'  }',
'  return label;',
'};',
'',
';',
'Tr8n.Translation = function(attrs) {',
'  this.attrs = attrs;',
'};',
';',
'Tr8n.Translator = function(attrs) {',
'  this.attrs = attrs;',
'};',
';',
'Tr8n.Language = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.contexts = {};',
'  for(var key in Tr8n.Utils.keys(attrs.contexts || {})) {',
'    this.contexts[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[key], {language: this}));',
'  }',
'',
'  this.cases = {};',
'  for(key in Tr8n.Utils.keys(attrs.cases || {})) {',
'    this.cases[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[key], {language: this}));',
'  }',
'};',
'',
'Tr8n.Language.prototype.getContextByKeyword = function(key) {',
'  return this.contexts[key];',
'};',
'',
'Tr8n.Language.prototype.getContextByTokenName = function(token_name) {',
'  for(var key in this.contexts) {',
'    if (this.contexts[key].isAppliedToToken(token_name))',
'      return this.contexts[key];',
'  }',
'',
'  return null;',
'};',
'',
'Tr8n.Language.prototype.getLanguageCaseByKeyword = function(key) {',
'  return this.cases[key];',
'};',
'',
'Tr8n.Language.prototype.translate = function(label, description, tokens, options) {',
'',
'',
'',
'',
'  return label;',
'};',
'',
'',
';',
'Tr8n.LanguageCase = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.rules = [];',
'  for(var rule in (attrs.rules || [])) {',
'    this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(rule, {language_case: this})));',
'  }',
'};',
';',
'Tr8n.LanguageCaseRule = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'};',
'',
'Tr8n.LanguageCaseRule.getConditionsExpression = function() {',
'  if (!this.conditions_expression)',
'    this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();',
'  return this.conditions_expression;',
'};',
'',
'Tr8n.LanguageCaseRule.getOperationsExpression = function() {',
'  if (!this.operations_expression)',
'    this.operations_expression = (new Tr8n.RulesEngine.Parser(this.operations)).parse();',
'  return this.operations_expression;',
'};',
'',
'Tr8n.LanguageCaseRule.getGenderVariables = function(object) {',
'  if (object == null)',
'    return {gender: \'unknown\'};',
'',
'  if (this.conditions.indexOf("@gender") == -1)',
'    return {};',
'',
'  var context = this.language_case.language.getContextByKeyword("gender");',
'',
'  if (context == null)',
'    return {gender: \'unknown\'};',
'',
'  return context.vars(object);',
'};',
'',
'Tr8n.LanguageCaseRule.evaluate = function(value, object) {',
'  if (this.attrs.conditions == null)',
'    return false;',
'',
'  var evaluator = new Tr8n.RulesEngine.Evaluator();',
'  evaluator.setVars(Tr8n.Utils.extend({value: value}, this.getGenderVariables(object)));',
'',
'  return evaluator.evaluate(this.getConditionsExpression());',
'};',
'',
'Tr8n.LanguageCaseRule.apply = function(value) {',
'  if (this.attrs.operations == null)',
'    return value;',
'',
'  var evaluator = new Tr8n.RulesEngine.Evaluator();',
'  evaluator.setVars({value: value});',
'',
'  return evaluator.evaluate(this.getOperationsExpression());',
'};',
'',
'',
';',
'Tr8n.LanguageContext = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.rules = {};',
'  for(var key in Tr8n.Utils.keys(attrs.rules || {})) {',
'    rules[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.rules[key], {language: this}));',
'  }',
'',
'};',
'',
'Tr8n.LanguageContext.isAppliedToToken = function(token) {',
'  return token.match(new RegExp(this.token_expression)) != null;',
'};',
'',
'Tr8n.LanguageContext.getFallbackRule = function() {',
'  if (!this.fallback_rule) {',
'    Object.keys(this.rules).forEach(function(key) {',
'      if (this.rules[key].isFallback()) {',
'        this.fallback_rule = rule;',
'      }',
'    }.bind(this));',
'  }',
'  return this.fallback_rule;',
'};',
'',
'Tr8n.LanguageContext.getVars = function(obj) {',
'  var vars = {};',
'  var config = Tr8n.config.getContextRules(this.keyword);',
'',
'  this.variables.forEach(function(key) {',
'    if (!config.variables || !config.variables[key]) {',
'      vars[key] = obj;',
'    } else {',
'      var method = config.variables[key];',
'      if (typeof method === "string") {',
'        if (obj.object) obj = obj.object;',
'        vars[key] = obj[method];',
'      } else if (typeof method === "function") {',
'        vars[key] = method(obj);',
'      } else {',
'        vars[key] = obj;',
'      }',
'    }',
'  });',
'',
'  return vars;',
'};',
'',
'Tr8n.LanguageContext.findMatchingRule = function(obj) {',
'  var token_vars = this.getVars(obj);',
'',
'  for (var key in Tr8n.Utils.keys(this.rules)) {',
'    var rule = this.rules[key];',
'    if (!rule.isFallback() && rule.evaluate(token_vars))',
'        return rule;',
'  }',
'',
'  return this.getFallbackRule();',
'};',
';',
'Tr8n.LanguageContextRule = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'};',
'',
'Tr8n.LanguageContextRule.isFallback = function() {',
'  return (this.keyword == "other");',
'};',
'',
'Tr8n.LanguageContextRule.getConditionsExpression = function() {',
'  if (!this.conditions_expression)',
'    this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();',
'  return this.conditions_expression;',
'};',
'',
'Tr8n.LanguageContextRule.evaluate = function(vars) {',
'  if (this.isFallback()) return true;',
'',
'  var evaluator = new Tr8n.RulesEngine.Evaluator();',
'  evaluator.setVars(vars || {});',
'',
'  return evaluator.evaluate(this.getConditionsExpression())',
'};',
'',
';',
'var program = require(\'commander\');',
'var fs = require("fs");',
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
'fs.readFile("./../config/languages/en-US.json", function (err, data) {',
'  if (err) throw err;',
'  Tr8n.config.currentLanguage = new Tr8n.Language(JSON.parse(data));',
'});',
'',
'',
'',
'exports.RulesEngine = Tr8n.RulesEngine;',
'exports.Tokenizers = Tr8n.Tokenizers;',
'exports.Tokens = Tr8n.Tokens;',
'exports.Decorators = Tr8n.Decorators;',
'exports.Utils = Tr8n.Utils;',
'exports.Language = Tr8n.Language;',
'exports.Application = Tr8n.Application;',
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
_$jscoverage['lib/tr8n.js'][831]=0;
_$jscoverage['lib/tr8n.js'][5]=0;
_$jscoverage['lib/tr8n.js'][4]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][835]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][9]=0;
_$jscoverage['lib/tr8n.js'][10]=0;
_$jscoverage['lib/tr8n.js'][8]=0;
_$jscoverage['lib/tr8n.js'][838]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][840]=0;
_$jscoverage['lib/tr8n.js'][18]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][844]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][20]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][25]=0;
_$jscoverage['lib/tr8n.js'][843]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][862]=0;
_$jscoverage['lib/tr8n.js'][50]=0;
_$jscoverage['lib/tr8n.js'][49]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][46]=0;
_$jscoverage['lib/tr8n.js'][44]=0;
_$jscoverage['lib/tr8n.js'][869]=0;
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
_$jscoverage['lib/tr8n.js'][866]=0;
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
_$jscoverage['lib/tr8n.js'][885]=0;
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
_$jscoverage['lib/tr8n.js'][880]=0;
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
_$jscoverage['lib/tr8n.js'][905]=0;
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
_$jscoverage['lib/tr8n.js'][911]=0;
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
_$jscoverage['lib/tr8n.js'][929]=0;
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
_$jscoverage['lib/tr8n.js'][940]=0;
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
_$jscoverage['lib/tr8n.js'][950]=0;
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
_$jscoverage['lib/tr8n.js'][967]=0;
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
_$jscoverage['lib/tr8n.js'][979]=0;
_$jscoverage['lib/tr8n.js'][256]=0;
_$jscoverage['lib/tr8n.js'][255]=0;
_$jscoverage['lib/tr8n.js'][250]=0;
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
_$jscoverage['lib/tr8n.js'][252]=0;
_$jscoverage['lib/tr8n.js'][251]=0;
_$jscoverage['lib/tr8n.js'][254]=0;
_$jscoverage['lib/tr8n.js'][222]=0;
_$jscoverage['lib/tr8n.js'][225]=0;
_$jscoverage['lib/tr8n.js'][229]=0;
_$jscoverage['lib/tr8n.js'][227]=0;
_$jscoverage['lib/tr8n.js'][995]=0;
_$jscoverage['lib/tr8n.js'][342]=0;
_$jscoverage['lib/tr8n.js'][257]=0;
_$jscoverage['lib/tr8n.js'][261]=0;
_$jscoverage['lib/tr8n.js'][260]=0;
_$jscoverage['lib/tr8n.js'][265]=0;
_$jscoverage['lib/tr8n.js'][264]=0;
_$jscoverage['lib/tr8n.js'][269]=0;
_$jscoverage['lib/tr8n.js'][270]=0;
_$jscoverage['lib/tr8n.js'][271]=0;
_$jscoverage['lib/tr8n.js'][272]=0;
_$jscoverage['lib/tr8n.js'][273]=0;
_$jscoverage['lib/tr8n.js'][268]=0;
_$jscoverage['lib/tr8n.js'][277]=0;
_$jscoverage['lib/tr8n.js'][276]=0;
_$jscoverage['lib/tr8n.js'][1004]=0;
_$jscoverage['lib/tr8n.js'][416]=0;
_$jscoverage['lib/tr8n.js'][415]=0;
_$jscoverage['lib/tr8n.js'][349]=0;
_$jscoverage['lib/tr8n.js'][349]=0;
_$jscoverage['lib/tr8n.js'][350]=0;
_$jscoverage['lib/tr8n.js'][351]=0;
_$jscoverage['lib/tr8n.js'][352]=0;
_$jscoverage['lib/tr8n.js'][348]=0;
_$jscoverage['lib/tr8n.js'][356]=0;
_$jscoverage['lib/tr8n.js'][355]=0;
_$jscoverage['lib/tr8n.js'][398]=0;
_$jscoverage['lib/tr8n.js'][400]=0;
_$jscoverage['lib/tr8n.js'][399]=0;
_$jscoverage['lib/tr8n.js'][402]=0;
_$jscoverage['lib/tr8n.js'][386]=0;
_$jscoverage['lib/tr8n.js'][385]=0;
_$jscoverage['lib/tr8n.js'][343]=0;
_$jscoverage['lib/tr8n.js'][343]=0;
_$jscoverage['lib/tr8n.js'][344]=0;
_$jscoverage['lib/tr8n.js'][344]=0;
_$jscoverage['lib/tr8n.js'][345]=0;
_$jscoverage['lib/tr8n.js'][1022]=0;
_$jscoverage['lib/tr8n.js'][454]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][452]=0;
_$jscoverage['lib/tr8n.js'][420]=0;
_$jscoverage['lib/tr8n.js'][419]=0;
_$jscoverage['lib/tr8n.js'][424]=0;
_$jscoverage['lib/tr8n.js'][423]=0;
_$jscoverage['lib/tr8n.js'][428]=0;
_$jscoverage['lib/tr8n.js'][429]=0;
_$jscoverage['lib/tr8n.js'][430]=0;
_$jscoverage['lib/tr8n.js'][427]=0;
_$jscoverage['lib/tr8n.js'][434]=0;
_$jscoverage['lib/tr8n.js'][435]=0;
_$jscoverage['lib/tr8n.js'][437]=0;
_$jscoverage['lib/tr8n.js'][438]=0;
_$jscoverage['lib/tr8n.js'][440]=0;
_$jscoverage['lib/tr8n.js'][442]=0;
_$jscoverage['lib/tr8n.js'][441]=0;
_$jscoverage['lib/tr8n.js'][445]=0;
_$jscoverage['lib/tr8n.js'][446]=0;
_$jscoverage['lib/tr8n.js'][448]=0;
_$jscoverage['lib/tr8n.js'][447]=0;
_$jscoverage['lib/tr8n.js'][433]=0;
_$jscoverage['lib/tr8n.js'][1037]=0;
_$jscoverage['lib/tr8n.js'][489]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][460]=0;
_$jscoverage['lib/tr8n.js'][475]=0;
_$jscoverage['lib/tr8n.js'][460]=0;
_$jscoverage['lib/tr8n.js'][462]=0;
_$jscoverage['lib/tr8n.js'][464]=0;
_$jscoverage['lib/tr8n.js'][463]=0;
_$jscoverage['lib/tr8n.js'][466]=0;
_$jscoverage['lib/tr8n.js'][459]=0;
_$jscoverage['lib/tr8n.js'][470]=0;
_$jscoverage['lib/tr8n.js'][471]=0;
_$jscoverage['lib/tr8n.js'][469]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][477]=0;
_$jscoverage['lib/tr8n.js'][480]=0;
_$jscoverage['lib/tr8n.js'][481]=0;
_$jscoverage['lib/tr8n.js'][484]=0;
_$jscoverage['lib/tr8n.js'][483]=0;
_$jscoverage['lib/tr8n.js'][487]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][1050]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][493]=0;
_$jscoverage['lib/tr8n.js'][492]=0;
_$jscoverage['lib/tr8n.js'][495]=0;
_$jscoverage['lib/tr8n.js'][501]=0;
_$jscoverage['lib/tr8n.js'][502]=0;
_$jscoverage['lib/tr8n.js'][503]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][506]=0;
_$jscoverage['lib/tr8n.js'][506]=0;
_$jscoverage['lib/tr8n.js'][508]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][512]=0;
_$jscoverage['lib/tr8n.js'][500]=0;
_$jscoverage['lib/tr8n.js'][518]=0;
_$jscoverage['lib/tr8n.js'][528]=0;
_$jscoverage['lib/tr8n.js'][529]=0;
_$jscoverage['lib/tr8n.js'][532]=0;
_$jscoverage['lib/tr8n.js'][531]=0;
_$jscoverage['lib/tr8n.js'][490]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][1070]=0;
_$jscoverage['lib/tr8n.js'][570]=0;
_$jscoverage['lib/tr8n.js'][569]=0;
_$jscoverage['lib/tr8n.js'][537]=0;
_$jscoverage['lib/tr8n.js'][540]=0;
_$jscoverage['lib/tr8n.js'][543]=0;
_$jscoverage['lib/tr8n.js'][545]=0;
_$jscoverage['lib/tr8n.js'][547]=0;
_$jscoverage['lib/tr8n.js'][544]=0;
_$jscoverage['lib/tr8n.js'][542]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][550]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][552]=0;
_$jscoverage['lib/tr8n.js'][556]=0;
_$jscoverage['lib/tr8n.js'][555]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][561]=0;
_$jscoverage['lib/tr8n.js'][563]=0;
_$jscoverage['lib/tr8n.js'][560]=0;
_$jscoverage['lib/tr8n.js'][565]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][548]=0;
_$jscoverage['lib/tr8n.js'][541]=0;
_$jscoverage['lib/tr8n.js'][535]=0;
_$jscoverage['lib/tr8n.js'][539]=0;
_$jscoverage['lib/tr8n.js'][538]=0;
_$jscoverage['lib/tr8n.js'][1088]=0;
_$jscoverage['lib/tr8n.js'][610]=0;
_$jscoverage['lib/tr8n.js'][573]=0;
_$jscoverage['lib/tr8n.js'][572]=0;
_$jscoverage['lib/tr8n.js'][575]=0;
_$jscoverage['lib/tr8n.js'][578]=0;
_$jscoverage['lib/tr8n.js'][579]=0;
_$jscoverage['lib/tr8n.js'][609]=0;
_$jscoverage['lib/tr8n.js'][577]=0;
_$jscoverage['lib/tr8n.js'][582]=0;
_$jscoverage['lib/tr8n.js'][583]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][586]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][591]=0;
_$jscoverage['lib/tr8n.js'][590]=0;
_$jscoverage['lib/tr8n.js'][592]=0;
_$jscoverage['lib/tr8n.js'][588]=0;
_$jscoverage['lib/tr8n.js'][595]=0;
_$jscoverage['lib/tr8n.js'][597]=0;
_$jscoverage['lib/tr8n.js'][598]=0;
_$jscoverage['lib/tr8n.js'][601]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][600]=0;
_$jscoverage['lib/tr8n.js'][605]=0;
_$jscoverage['lib/tr8n.js'][607]=0;
_$jscoverage['lib/tr8n.js'][608]=0;
_$jscoverage['lib/tr8n.js'][1112]=0;
_$jscoverage['lib/tr8n.js'][655]=0;
_$jscoverage['lib/tr8n.js'][654]=0;
_$jscoverage['lib/tr8n.js'][613]=0;
_$jscoverage['lib/tr8n.js'][614]=0;
_$jscoverage['lib/tr8n.js'][615]=0;
_$jscoverage['lib/tr8n.js'][651]=0;
_$jscoverage['lib/tr8n.js'][612]=0;
_$jscoverage['lib/tr8n.js'][618]=0;
_$jscoverage['lib/tr8n.js'][619]=0;
_$jscoverage['lib/tr8n.js'][623]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][627]=0;
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][626]=0;
_$jscoverage['lib/tr8n.js'][632]=0;
_$jscoverage['lib/tr8n.js'][631]=0;
_$jscoverage['lib/tr8n.js'][635]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][639]=0;
_$jscoverage['lib/tr8n.js'][638]=0;
_$jscoverage['lib/tr8n.js'][642]=0;
_$jscoverage['lib/tr8n.js'][622]=0;
_$jscoverage['lib/tr8n.js'][646]=0;
_$jscoverage['lib/tr8n.js'][647]=0;
_$jscoverage['lib/tr8n.js'][647]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][645]=0;
_$jscoverage['lib/tr8n.js'][652]=0;
_$jscoverage['lib/tr8n.js'][1143]=0;
_$jscoverage['lib/tr8n.js'][702]=0;
_$jscoverage['lib/tr8n.js'][660]=0;
_$jscoverage['lib/tr8n.js'][659]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][664]=0;
_$jscoverage['lib/tr8n.js'][668]=0;
_$jscoverage['lib/tr8n.js'][667]=0;
_$jscoverage['lib/tr8n.js'][672]=0;
_$jscoverage['lib/tr8n.js'][678]=0;
_$jscoverage['lib/tr8n.js'][685]=0;
_$jscoverage['lib/tr8n.js'][687]=0;
_$jscoverage['lib/tr8n.js'][687]=0;
_$jscoverage['lib/tr8n.js'][688]=0;
_$jscoverage['lib/tr8n.js'][689]=0;
_$jscoverage['lib/tr8n.js'][690]=0;
_$jscoverage['lib/tr8n.js'][686]=0;
_$jscoverage['lib/tr8n.js'][690]=0;
_$jscoverage['lib/tr8n.js'][684]=0;
_$jscoverage['lib/tr8n.js'][691]=0;
_$jscoverage['lib/tr8n.js'][691]=0;
_$jscoverage['lib/tr8n.js'][692]=0;
_$jscoverage['lib/tr8n.js'][693]=0;
_$jscoverage['lib/tr8n.js'][694]=0;
_$jscoverage['lib/tr8n.js'][696]=0;
_$jscoverage['lib/tr8n.js'][696]=0;
_$jscoverage['lib/tr8n.js'][698]=0;
_$jscoverage['lib/tr8n.js'][699]=0;
_$jscoverage['lib/tr8n.js'][700]=0;
_$jscoverage['lib/tr8n.js'][701]=0;
_$jscoverage['lib/tr8n.js'][1167]=0;
_$jscoverage['lib/tr8n.js'][752]=0;
_$jscoverage['lib/tr8n.js'][726]=0;
_$jscoverage['lib/tr8n.js'][703]=0;
_$jscoverage['lib/tr8n.js'][704]=0;
_$jscoverage['lib/tr8n.js'][705]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][707]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][709]=0;
_$jscoverage['lib/tr8n.js'][712]=0;
_$jscoverage['lib/tr8n.js'][714]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][716]=0;
_$jscoverage['lib/tr8n.js'][719]=0;
_$jscoverage['lib/tr8n.js'][721]=0;
_$jscoverage['lib/tr8n.js'][723]=0;
_$jscoverage['lib/tr8n.js'][728]=0;
_$jscoverage['lib/tr8n.js'][733]=0;
_$jscoverage['lib/tr8n.js'][732]=0;
_$jscoverage['lib/tr8n.js'][735]=0;
_$jscoverage['lib/tr8n.js'][740]=0;
_$jscoverage['lib/tr8n.js'][739]=0;
_$jscoverage['lib/tr8n.js'][743]=0;
_$jscoverage['lib/tr8n.js'][744]=0;
_$jscoverage['lib/tr8n.js'][748]=0;
_$jscoverage['lib/tr8n.js'][747]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][1188]=0;
_$jscoverage['lib/tr8n.js'][803]=0;
_$jscoverage['lib/tr8n.js'][800]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][802]=0;
_$jscoverage['lib/tr8n.js'][757]=0;
_$jscoverage['lib/tr8n.js'][756]=0;
_$jscoverage['lib/tr8n.js'][762]=0;
_$jscoverage['lib/tr8n.js'][766]=0;
_$jscoverage['lib/tr8n.js'][767]=0;
_$jscoverage['lib/tr8n.js'][767]=0;
_$jscoverage['lib/tr8n.js'][768]=0;
_$jscoverage['lib/tr8n.js'][768]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][771]=0;
_$jscoverage['lib/tr8n.js'][775]=0;
_$jscoverage['lib/tr8n.js'][777]=0;
_$jscoverage['lib/tr8n.js'][776]=0;
_$jscoverage['lib/tr8n.js'][778]=0;
_$jscoverage['lib/tr8n.js'][801]=0;
_$jscoverage['lib/tr8n.js'][779]=0;
_$jscoverage['lib/tr8n.js'][799]=0;
_$jscoverage['lib/tr8n.js'][760]=0;
_$jscoverage['lib/tr8n.js'][784]=0;
_$jscoverage['lib/tr8n.js'][790]=0;
_$jscoverage['lib/tr8n.js'][785]=0;
_$jscoverage['lib/tr8n.js'][791]=0;
_$jscoverage['lib/tr8n.js'][786]=0;
_$jscoverage['lib/tr8n.js'][783]=0;
_$jscoverage['lib/tr8n.js'][787]=0;
_$jscoverage['lib/tr8n.js'][1212]=0;
_$jscoverage['lib/tr8n.js'][853]=0;
_$jscoverage['lib/tr8n.js'][852]=0;
_$jscoverage['lib/tr8n.js'][809]=0;
_$jscoverage['lib/tr8n.js'][809]=0;
_$jscoverage['lib/tr8n.js'][810]=0;
_$jscoverage['lib/tr8n.js'][834]=0;
_$jscoverage['lib/tr8n.js'][808]=0;
_$jscoverage['lib/tr8n.js'][814]=0;
_$jscoverage['lib/tr8n.js'][816]=0;
_$jscoverage['lib/tr8n.js'][818]=0;
_$jscoverage['lib/tr8n.js'][839]=0;
_$jscoverage['lib/tr8n.js'][817]=0;
_$jscoverage['lib/tr8n.js'][815]=0;
_$jscoverage['lib/tr8n.js'][821]=0;
_$jscoverage['lib/tr8n.js'][813]=0;
_$jscoverage['lib/tr8n.js'][837]=0;
_$jscoverage['lib/tr8n.js'][824]=0;
_$jscoverage['lib/tr8n.js'][825]=0;
_$jscoverage['lib/tr8n.js'][826]=0;
_$jscoverage['lib/tr8n.js'][827]=0;
_$jscoverage['lib/tr8n.js'][828]=0;
_$jscoverage['lib/tr8n.js'][836]=0;
_$jscoverage['lib/tr8n.js'][829]=0;
_$jscoverage['lib/tr8n.js'][830]=0;
_$jscoverage['lib/tr8n.js'][832]=0;
_$jscoverage['lib/tr8n.js'][1231]=0;
_$jscoverage['lib/tr8n.js'][882]=0;
_$jscoverage['lib/tr8n.js'][857]=0;
_$jscoverage['lib/tr8n.js'][857]=0;
_$jscoverage['lib/tr8n.js'][858]=0;
_$jscoverage['lib/tr8n.js'][856]=0;
_$jscoverage['lib/tr8n.js'][862]=0;
_$jscoverage['lib/tr8n.js'][875]=0;
_$jscoverage['lib/tr8n.js'][863]=0;
_$jscoverage['lib/tr8n.js'][861]=0;
_$jscoverage['lib/tr8n.js'][867]=0;
_$jscoverage['lib/tr8n.js'][868]=0;
_$jscoverage['lib/tr8n.js'][871]=0;
_$jscoverage['lib/tr8n.js'][870]=0;
_$jscoverage['lib/tr8n.js'][872]=0;
_$jscoverage['lib/tr8n.js'][876]=0;
_$jscoverage['lib/tr8n.js'][878]=0;
_$jscoverage['lib/tr8n.js'][877]=0;
_$jscoverage['lib/tr8n.js'][881]=0;
_$jscoverage['lib/tr8n.js'][1236]=0;
_$jscoverage['lib/tr8n.js'][918]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][892]=0;
_$jscoverage['lib/tr8n.js'][891]=0;
_$jscoverage['lib/tr8n.js'][890]=0;
_$jscoverage['lib/tr8n.js'][888]=0;
_$jscoverage['lib/tr8n.js'][883]=0;
_$jscoverage['lib/tr8n.js'][896]=0;
_$jscoverage['lib/tr8n.js'][897]=0;
_$jscoverage['lib/tr8n.js'][901]=0;
_$jscoverage['lib/tr8n.js'][900]=0;
_$jscoverage['lib/tr8n.js'][884]=0;
_$jscoverage['lib/tr8n.js'][906]=0;
_$jscoverage['lib/tr8n.js'][906]=0;
_$jscoverage['lib/tr8n.js'][886]=0;
_$jscoverage['lib/tr8n.js'][908]=0;
_$jscoverage['lib/tr8n.js'][909]=0;
_$jscoverage['lib/tr8n.js'][912]=0;
_$jscoverage['lib/tr8n.js'][914]=0;
_$jscoverage['lib/tr8n.js'][913]=0;
_$jscoverage['lib/tr8n.js'][1264]=0;
_$jscoverage['lib/tr8n.js'][948]=0;
_$jscoverage['lib/tr8n.js'][922]=0;
_$jscoverage['lib/tr8n.js'][947]=0;
_$jscoverage['lib/tr8n.js'][922]=0;
_$jscoverage['lib/tr8n.js'][943]=0;
_$jscoverage['lib/tr8n.js'][923]=0;
_$jscoverage['lib/tr8n.js'][923]=0;
_$jscoverage['lib/tr8n.js'][925]=0;
_$jscoverage['lib/tr8n.js'][928]=0;
_$jscoverage['lib/tr8n.js'][932]=0;
_$jscoverage['lib/tr8n.js'][931]=0;
_$jscoverage['lib/tr8n.js'][935]=0;
_$jscoverage['lib/tr8n.js'][946]=0;
_$jscoverage['lib/tr8n.js'][934]=0;
_$jscoverage['lib/tr8n.js'][937]=0;
_$jscoverage['lib/tr8n.js'][927]=0;
_$jscoverage['lib/tr8n.js'][921]=0;
_$jscoverage['lib/tr8n.js'][944]=0;
_$jscoverage['lib/tr8n.js'][944]=0;
_$jscoverage['lib/tr8n.js'][1280]=0;
_$jscoverage['lib/tr8n.js'][977]=0;
_$jscoverage['lib/tr8n.js'][976]=0;
_$jscoverage['lib/tr8n.js'][949]=0;
_$jscoverage['lib/tr8n.js'][951]=0;
_$jscoverage['lib/tr8n.js'][953]=0;
_$jscoverage['lib/tr8n.js'][957]=0;
_$jscoverage['lib/tr8n.js'][956]=0;
_$jscoverage['lib/tr8n.js'][960]=0;
_$jscoverage['lib/tr8n.js'][961]=0;
_$jscoverage['lib/tr8n.js'][962]=0;
_$jscoverage['lib/tr8n.js'][965]=0;
_$jscoverage['lib/tr8n.js'][966]=0;
_$jscoverage['lib/tr8n.js'][968]=0;
_$jscoverage['lib/tr8n.js'][964]=0;
_$jscoverage['lib/tr8n.js'][972]=0;
_$jscoverage['lib/tr8n.js'][975]=0;
_$jscoverage['lib/tr8n.js'][971]=0;
_$jscoverage['lib/tr8n.js'][1291]=0;
_$jscoverage['lib/tr8n.js'][1007]=0;
_$jscoverage['lib/tr8n.js'][995]=0;
_$jscoverage['lib/tr8n.js'][994]=0;
_$jscoverage['lib/tr8n.js'][992]=0;
_$jscoverage['lib/tr8n.js'][988]=0;
_$jscoverage['lib/tr8n.js'][983]=0;
_$jscoverage['lib/tr8n.js'][982]=0;
_$jscoverage['lib/tr8n.js'][985]=0;
_$jscoverage['lib/tr8n.js'][1005]=0;
_$jscoverage['lib/tr8n.js'][986]=0;
_$jscoverage['lib/tr8n.js'][1003]=0;
_$jscoverage['lib/tr8n.js'][989]=0;
_$jscoverage['lib/tr8n.js'][993]=0;
_$jscoverage['lib/tr8n.js'][994]=0;
_$jscoverage['lib/tr8n.js'][996]=0;
_$jscoverage['lib/tr8n.js'][978]=0;
_$jscoverage['lib/tr8n.js'][997]=0;
_$jscoverage['lib/tr8n.js'][998]=0;
_$jscoverage['lib/tr8n.js'][1001]=0;
_$jscoverage['lib/tr8n.js'][1000]=0;
_$jscoverage['lib/tr8n.js'][1311]=0;
_$jscoverage['lib/tr8n.js'][1038]=0;
_$jscoverage['lib/tr8n.js'][1036]=0;
_$jscoverage['lib/tr8n.js'][1010]=0;
_$jscoverage['lib/tr8n.js'][1015]=0;
_$jscoverage['lib/tr8n.js'][1033]=0;
_$jscoverage['lib/tr8n.js'][1014]=0;
_$jscoverage['lib/tr8n.js'][1018]=0;
_$jscoverage['lib/tr8n.js'][1023]=0;
_$jscoverage['lib/tr8n.js'][1029]=0;
_$jscoverage['lib/tr8n.js'][1025]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1026]=0;
_$jscoverage['lib/tr8n.js'][1035]=0;
_$jscoverage['lib/tr8n.js'][1021]=0;
_$jscoverage['lib/tr8n.js'][1030]=0;
_$jscoverage['lib/tr8n.js'][1030]=0;
_$jscoverage['lib/tr8n.js'][1034]=0;
_$jscoverage['lib/tr8n.js'][1329]=0;
_$jscoverage['lib/tr8n.js'][1062]=0;
_$jscoverage['lib/tr8n.js'][1055]=0;
_$jscoverage['lib/tr8n.js'][1039]=0;
_$jscoverage['lib/tr8n.js'][1041]=0;
_$jscoverage['lib/tr8n.js'][1042]=0;
_$jscoverage['lib/tr8n.js'][1045]=0;
_$jscoverage['lib/tr8n.js'][1059]=0;
_$jscoverage['lib/tr8n.js'][1046]=0;
_$jscoverage['lib/tr8n.js'][1047]=0;
_$jscoverage['lib/tr8n.js'][1051]=0;
_$jscoverage['lib/tr8n.js'][1051]=0;
_$jscoverage['lib/tr8n.js'][1052]=0;
_$jscoverage['lib/tr8n.js'][1057]=0;
_$jscoverage['lib/tr8n.js'][1056]=0;
_$jscoverage['lib/tr8n.js'][1060]=0;
_$jscoverage['lib/tr8n.js'][1344]=0;
_$jscoverage['lib/tr8n.js'][1085]=0;
_$jscoverage['lib/tr8n.js'][1065]=0;
_$jscoverage['lib/tr8n.js'][1066]=0;
_$jscoverage['lib/tr8n.js'][1067]=0;
_$jscoverage['lib/tr8n.js'][1082]=0;
_$jscoverage['lib/tr8n.js'][1069]=0;
_$jscoverage['lib/tr8n.js'][1070]=0;
_$jscoverage['lib/tr8n.js'][1072]=0;
_$jscoverage['lib/tr8n.js'][1068]=0;
_$jscoverage['lib/tr8n.js'][1074]=0;
_$jscoverage['lib/tr8n.js'][1075]=0;
_$jscoverage['lib/tr8n.js'][1077]=0;
_$jscoverage['lib/tr8n.js'][1080]=0;
_$jscoverage['lib/tr8n.js'][1079]=0;
_$jscoverage['lib/tr8n.js'][1083]=0;
_$jscoverage['lib/tr8n.js'][1355]=0;
_$jscoverage['lib/tr8n.js'][1113]=0;
_$jscoverage['lib/tr8n.js'][1113]=0;
_$jscoverage['lib/tr8n.js'][1090]=0;
_$jscoverage['lib/tr8n.js'][1089]=0;
_$jscoverage['lib/tr8n.js'][1092]=0;
_$jscoverage['lib/tr8n.js'][1096]=0;
_$jscoverage['lib/tr8n.js'][1095]=0;
_$jscoverage['lib/tr8n.js'][1100]=0;
_$jscoverage['lib/tr8n.js'][1101]=0;
_$jscoverage['lib/tr8n.js'][1099]=0;
_$jscoverage['lib/tr8n.js'][1105]=0;
_$jscoverage['lib/tr8n.js'][1104]=0;
_$jscoverage['lib/tr8n.js'][1109]=0;
_$jscoverage['lib/tr8n.js'][1108]=0;
_$jscoverage['lib/tr8n.js'][1370]=0;
_$jscoverage['lib/tr8n.js'][1139]=0;
_$jscoverage['lib/tr8n.js'][1114]=0;
_$jscoverage['lib/tr8n.js'][1118]=0;
_$jscoverage['lib/tr8n.js'][1118]=0;
_$jscoverage['lib/tr8n.js'][1121]=0;
_$jscoverage['lib/tr8n.js'][1124]=0;
_$jscoverage['lib/tr8n.js'][1123]=0;
_$jscoverage['lib/tr8n.js'][1122]=0;
_$jscoverage['lib/tr8n.js'][1120]=0;
_$jscoverage['lib/tr8n.js'][1128]=0;
_$jscoverage['lib/tr8n.js'][1117]=0;
_$jscoverage['lib/tr8n.js'][1132]=0;
_$jscoverage['lib/tr8n.js'][1131]=0;
_$jscoverage['lib/tr8n.js'][1383]=0;
_$jscoverage['lib/tr8n.js'][1157]=0;
_$jscoverage['lib/tr8n.js'][1144]=0;
_$jscoverage['lib/tr8n.js'][1140]=0;
_$jscoverage['lib/tr8n.js'][1148]=0;
_$jscoverage['lib/tr8n.js'][1148]=0;
_$jscoverage['lib/tr8n.js'][1149]=0;
_$jscoverage['lib/tr8n.js'][1147]=0;
_$jscoverage['lib/tr8n.js'][1153]=0;
_$jscoverage['lib/tr8n.js'][1153]=0;
_$jscoverage['lib/tr8n.js'][1154]=0;
_$jscoverage['lib/tr8n.js'][1152]=0;
_$jscoverage['lib/tr8n.js'][1394]=0;
_$jscoverage['lib/tr8n.js'][1166]=0;
_$jscoverage['lib/tr8n.js'][1163]=0;
_$jscoverage['lib/tr8n.js'][1162]=0;
_$jscoverage['lib/tr8n.js'][1159]=0;
_$jscoverage['lib/tr8n.js'][1158]=0;
_$jscoverage['lib/tr8n.js'][1158]=0;
_$jscoverage['lib/tr8n.js'][1401]=0;
_$jscoverage['lib/tr8n.js'][1189]=0;
_$jscoverage['lib/tr8n.js'][1187]=0;
_$jscoverage['lib/tr8n.js'][1181]=0;
_$jscoverage['lib/tr8n.js'][1180]=0;
_$jscoverage['lib/tr8n.js'][1181]=0;
_$jscoverage['lib/tr8n.js'][1183]=0;
_$jscoverage['lib/tr8n.js'][1184]=0;
_$jscoverage['lib/tr8n.js'][1167]=0;
_$jscoverage['lib/tr8n.js'][1169]=0;
_$jscoverage['lib/tr8n.js'][1170]=0;
_$jscoverage['lib/tr8n.js'][1172]=0;
_$jscoverage['lib/tr8n.js'][1173]=0;
_$jscoverage['lib/tr8n.js'][1174]=0;
_$jscoverage['lib/tr8n.js'][1171]=0;
_$jscoverage['lib/tr8n.js'][1186]=0;
_$jscoverage['lib/tr8n.js'][1177]=0;
_$jscoverage['lib/tr8n.js'][1416]=0;
_$jscoverage['lib/tr8n.js'][1215]=0;
_$jscoverage['lib/tr8n.js'][1190]=0;
_$jscoverage['lib/tr8n.js'][1193]=0;
_$jscoverage['lib/tr8n.js'][1197]=0;
_$jscoverage['lib/tr8n.js'][1198]=0;
_$jscoverage['lib/tr8n.js'][1199]=0;
_$jscoverage['lib/tr8n.js'][1200]=0;
_$jscoverage['lib/tr8n.js'][1196]=0;
_$jscoverage['lib/tr8n.js'][1204]=0;
_$jscoverage['lib/tr8n.js'][1203]=0;
_$jscoverage['lib/tr8n.js'][1213]=0;
_$jscoverage['lib/tr8n.js'][1205]=0;
_$jscoverage['lib/tr8n.js'][1202]=0;
_$jscoverage['lib/tr8n.js'][1209]=0;
_$jscoverage['lib/tr8n.js'][1208]=0;
_$jscoverage['lib/tr8n.js'][1427]=0;
_$jscoverage['lib/tr8n.js'][1240]=0;
_$jscoverage['lib/tr8n.js'][1239]=0;
_$jscoverage['lib/tr8n.js'][1217]=0;
_$jscoverage['lib/tr8n.js'][1218]=0;
_$jscoverage['lib/tr8n.js'][1238]=0;
_$jscoverage['lib/tr8n.js'][1216]=0;
_$jscoverage['lib/tr8n.js'][1220]=0;
_$jscoverage['lib/tr8n.js'][1235]=0;
_$jscoverage['lib/tr8n.js'][1223]=0;
_$jscoverage['lib/tr8n.js'][1222]=0;
_$jscoverage['lib/tr8n.js'][1225]=0;
_$jscoverage['lib/tr8n.js'][1229]=0;
_$jscoverage['lib/tr8n.js'][1230]=0;
_$jscoverage['lib/tr8n.js'][1232]=0;
_$jscoverage['lib/tr8n.js'][1237]=0;
_$jscoverage['lib/tr8n.js'][1228]=0;
_$jscoverage['lib/tr8n.js'][1454]=0;
_$jscoverage['lib/tr8n.js'][1263]=0;
_$jscoverage['lib/tr8n.js'][1256]=0;
_$jscoverage['lib/tr8n.js'][1261]=0;
_$jscoverage['lib/tr8n.js'][1241]=0;
_$jscoverage['lib/tr8n.js'][1243]=0;
_$jscoverage['lib/tr8n.js'][1244]=0;
_$jscoverage['lib/tr8n.js'][1247]=0;
_$jscoverage['lib/tr8n.js'][1248]=0;
_$jscoverage['lib/tr8n.js'][1252]=0;
_$jscoverage['lib/tr8n.js'][1253]=0;
_$jscoverage['lib/tr8n.js'][1251]=0;
_$jscoverage['lib/tr8n.js'][1257]=0;
_$jscoverage['lib/tr8n.js'][1259]=0;
_$jscoverage['lib/tr8n.js'][1262]=0;
_$jscoverage['lib/tr8n.js'][1465]=0;
_$jscoverage['lib/tr8n.js'][1288]=0;
_$jscoverage['lib/tr8n.js'][1271]=0;
_$jscoverage['lib/tr8n.js'][1272]=0;
_$jscoverage['lib/tr8n.js'][1270]=0;
_$jscoverage['lib/tr8n.js'][1275]=0;
_$jscoverage['lib/tr8n.js'][1274]=0;
_$jscoverage['lib/tr8n.js'][1278]=0;
_$jscoverage['lib/tr8n.js'][1265]=0;
_$jscoverage['lib/tr8n.js'][1282]=0;
_$jscoverage['lib/tr8n.js'][1279]=0;
_$jscoverage['lib/tr8n.js'][1277]=0;
_$jscoverage['lib/tr8n.js'][1286]=0;
_$jscoverage['lib/tr8n.js'][1285]=0;
_$jscoverage['lib/tr8n.js'][1475]=0;
_$jscoverage['lib/tr8n.js'][1308]=0;
_$jscoverage['lib/tr8n.js'][1292]=0;
_$jscoverage['lib/tr8n.js'][1289]=0;
_$jscoverage['lib/tr8n.js'][1294]=0;
_$jscoverage['lib/tr8n.js'][1298]=0;
_$jscoverage['lib/tr8n.js'][1300]=0;
_$jscoverage['lib/tr8n.js'][1302]=0;
_$jscoverage['lib/tr8n.js'][1301]=0;
_$jscoverage['lib/tr8n.js'][1305]=0;
_$jscoverage['lib/tr8n.js'][1297]=0;
_$jscoverage['lib/tr8n.js'][1486]=0;
_$jscoverage['lib/tr8n.js'][1333]=0;
_$jscoverage['lib/tr8n.js'][1315]=0;
_$jscoverage['lib/tr8n.js'][1316]=0;
_$jscoverage['lib/tr8n.js'][1328]=0;
_$jscoverage['lib/tr8n.js'][1310]=0;
_$jscoverage['lib/tr8n.js'][1314]=0;
_$jscoverage['lib/tr8n.js'][1320]=0;
_$jscoverage['lib/tr8n.js'][1319]=0;
_$jscoverage['lib/tr8n.js'][1325]=0;
_$jscoverage['lib/tr8n.js'][1324]=0;
_$jscoverage['lib/tr8n.js'][1309]=0;
_$jscoverage['lib/tr8n.js'][1331]=0;
_$jscoverage['lib/tr8n.js'][1496]=0;
_$jscoverage['lib/tr8n.js'][1334]=0;
_$jscoverage['lib/tr8n.js'][1489]=0;
_$jscoverage['lib/tr8n.js'][1364]=0;
_$jscoverage['lib/tr8n.js'][1362]=0;
_$jscoverage['lib/tr8n.js'][1363]=0;
_$jscoverage['lib/tr8n.js'][1354]=0;
_$jscoverage['lib/tr8n.js'][1356]=0;
_$jscoverage['lib/tr8n.js'][1337]=0;
_$jscoverage['lib/tr8n.js'][1336]=0;
_$jscoverage['lib/tr8n.js'][1339]=0;
_$jscoverage['lib/tr8n.js'][1343]=0;
_$jscoverage['lib/tr8n.js'][1347]=0;
_$jscoverage['lib/tr8n.js'][1346]=0;
_$jscoverage['lib/tr8n.js'][1357]=0;
_$jscoverage['lib/tr8n.js'][1349]=0;
_$jscoverage['lib/tr8n.js'][1342]=0;
_$jscoverage['lib/tr8n.js'][1514]=0;
_$jscoverage['lib/tr8n.js'][1389]=0;
_$jscoverage['lib/tr8n.js'][1387]=0;
_$jscoverage['lib/tr8n.js'][1388]=0;
_$jscoverage['lib/tr8n.js'][1371]=0;
_$jscoverage['lib/tr8n.js'][1372]=0;
_$jscoverage['lib/tr8n.js'][1386]=0;
_$jscoverage['lib/tr8n.js'][1377]=0;
_$jscoverage['lib/tr8n.js'][1374]=0;
_$jscoverage['lib/tr8n.js'][1369]=0;
_$jscoverage['lib/tr8n.js'][1379]=0;
_$jscoverage['lib/tr8n.js'][1381]=0;
_$jscoverage['lib/tr8n.js'][1380]=0;
_$jscoverage['lib/tr8n.js'][1378]=0;
_$jscoverage['lib/tr8n.js'][1528]=0;
_$jscoverage['lib/tr8n.js'][1412]=0;
_$jscoverage['lib/tr8n.js'][1393]=0;
_$jscoverage['lib/tr8n.js'][1392]=0;
_$jscoverage['lib/tr8n.js'][1408]=0;
_$jscoverage['lib/tr8n.js'][1396]=0;
_$jscoverage['lib/tr8n.js'][1400]=0;
_$jscoverage['lib/tr8n.js'][1405]=0;
_$jscoverage['lib/tr8n.js'][1404]=0;
_$jscoverage['lib/tr8n.js'][1411]=0;
_$jscoverage['lib/tr8n.js'][1409]=0;
_$jscoverage['lib/tr8n.js'][1537]=0;
_$jscoverage['lib/tr8n.js'][1426]=0;
_$jscoverage['lib/tr8n.js'][1413]=0;
_$jscoverage['lib/tr8n.js'][1418]=0;
_$jscoverage['lib/tr8n.js'][1417]=0;
_$jscoverage['lib/tr8n.js'][1423]=0;
_$jscoverage['lib/tr8n.js'][1422]=0;
_$jscoverage['lib/tr8n.js'][1546]=0;
_$jscoverage['lib/tr8n.js'][1432]=0;
_$jscoverage['lib/tr8n.js'][1429]=0;
_$jscoverage['lib/tr8n.js'][1428]=0;
_$jscoverage['lib/tr8n.js'][1547]=0;
_$jscoverage['lib/tr8n.js'][1458]=0;
_$jscoverage['lib/tr8n.js'][1453]=0;
_$jscoverage['lib/tr8n.js'][1436]=0;
_$jscoverage['lib/tr8n.js'][1435]=0;
_$jscoverage['lib/tr8n.js'][1444]=0;
_$jscoverage['lib/tr8n.js'][1439]=0;
_$jscoverage['lib/tr8n.js'][1450]=0;
_$jscoverage['lib/tr8n.js'][1452]=0;
_$jscoverage['lib/tr8n.js'][1449]=0;
_$jscoverage['lib/tr8n.js'][1541]=0;
_$jscoverage['lib/tr8n.js'][1476]=0;
_$jscoverage['lib/tr8n.js'][1464]=0;
_$jscoverage['lib/tr8n.js'][1463]=0;
_$jscoverage['lib/tr8n.js'][1459]=0;
_$jscoverage['lib/tr8n.js'][1462]=0;
_$jscoverage['lib/tr8n.js'][1468]=0;
_$jscoverage['lib/tr8n.js'][1474]=0;
_$jscoverage['lib/tr8n.js'][1470]=0;
_$jscoverage['lib/tr8n.js'][1469]=0;
_$jscoverage['lib/tr8n.js'][1471]=0;
_$jscoverage['lib/tr8n.js'][1563]=0;
_$jscoverage['lib/tr8n.js'][1494]=0;
_$jscoverage['lib/tr8n.js'][1490]=0;
_$jscoverage['lib/tr8n.js'][1493]=0;
_$jscoverage['lib/tr8n.js'][1479]=0;
_$jscoverage['lib/tr8n.js'][1478]=0;
_$jscoverage['lib/tr8n.js'][1481]=0;
_$jscoverage['lib/tr8n.js'][1484]=0;
_$jscoverage['lib/tr8n.js'][1483]=0;
_$jscoverage['lib/tr8n.js'][1491]=0;
_$jscoverage['lib/tr8n.js'][1559]=0;
_$jscoverage['lib/tr8n.js'][1512]=0;
_$jscoverage['lib/tr8n.js'][1501]=0;
_$jscoverage['lib/tr8n.js'][1511]=0;
_$jscoverage['lib/tr8n.js'][1500]=0;
_$jscoverage['lib/tr8n.js'][1503]=0;
_$jscoverage['lib/tr8n.js'][1504]=0;
_$jscoverage['lib/tr8n.js'][1499]=0;
_$jscoverage['lib/tr8n.js'][1506]=0;
_$jscoverage['lib/tr8n.js'][1581]=0;
_$jscoverage['lib/tr8n.js'][1526]=0;
_$jscoverage['lib/tr8n.js'][1525]=0;
_$jscoverage['lib/tr8n.js'][1516]=0;
_$jscoverage['lib/tr8n.js'][1515]=0;
_$jscoverage['lib/tr8n.js'][1522]=0;
_$jscoverage['lib/tr8n.js'][1521]=0;
_$jscoverage['lib/tr8n.js'][1579]=0;
_$jscoverage['lib/tr8n.js'][1529]=0;
_$jscoverage['lib/tr8n.js'][1527]=0;
_$jscoverage['lib/tr8n.js'][1586]=0;
_$jscoverage['lib/tr8n.js'][1549]=0;
_$jscoverage['lib/tr8n.js'][1548]=0;
_$jscoverage['lib/tr8n.js'][1545]=0;
_$jscoverage['lib/tr8n.js'][1542]=0;
_$jscoverage['lib/tr8n.js'][1540]=0;
_$jscoverage['lib/tr8n.js'][1546]=0;
_$jscoverage['lib/tr8n.js'][1536]=0;
_$jscoverage['lib/tr8n.js'][1533]=0;
_$jscoverage['lib/tr8n.js'][1538]=0;
_$jscoverage['lib/tr8n.js'][1544]=0;
_$jscoverage['lib/tr8n.js'][1595]=0;
_$jscoverage['lib/tr8n.js'][1564]=0;
_$jscoverage['lib/tr8n.js'][1562]=0;
_$jscoverage['lib/tr8n.js'][1551]=0;
_$jscoverage['lib/tr8n.js'][1556]=0;
_$jscoverage['lib/tr8n.js'][1560]=0;
_$jscoverage['lib/tr8n.js'][1606]=0;
_$jscoverage['lib/tr8n.js'][1576]=0;
_$jscoverage['lib/tr8n.js'][1571]=0;
_$jscoverage['lib/tr8n.js'][1575]=0;
_$jscoverage['lib/tr8n.js'][1568]=0;
_$jscoverage['lib/tr8n.js'][1572]=0;
_$jscoverage['lib/tr8n.js'][1565]=0;
_$jscoverage['lib/tr8n.js'][1608]=0;
_$jscoverage['lib/tr8n.js'][1586]=0;
_$jscoverage['lib/tr8n.js'][1580]=0;
_$jscoverage['lib/tr8n.js'][1582]=0;
_$jscoverage['lib/tr8n.js'][1585]=0;
_$jscoverage['lib/tr8n.js'][1616]=0;
_$jscoverage['lib/tr8n.js'][1591]=0;
_$jscoverage['lib/tr8n.js'][1588]=0;
_$jscoverage['lib/tr8n.js'][1589]=0;
_$jscoverage['lib/tr8n.js'][1618]=0;
_$jscoverage['lib/tr8n.js'][1609]=0;
_$jscoverage['lib/tr8n.js'][1609]=0;
_$jscoverage['lib/tr8n.js'][1598]=0;
_$jscoverage['lib/tr8n.js'][1596]=0;
_$jscoverage['lib/tr8n.js'][1610]=0;
_$jscoverage['lib/tr8n.js'][1615]=0;
_$jscoverage['lib/tr8n.js'][1617]=0;
_$jscoverage['lib/tr8n.js'][1619]=0;
_$jscoverage['lib/tr8n.js'][1620]=0;
_$jscoverage['lib/tr8n.js'][1621]=0;
_$jscoverage['lib/tr8n.js'][1624]=0;
_$jscoverage['lib/tr8n.js'][1625]=0;
_$jscoverage['lib/tr8n.js'][1628]=0;
_$jscoverage['lib/tr8n.js'][1629]=0;
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
};;
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
};

_$jscoverage['lib/tr8n.js'][250]++;
Tr8n.Utils.clone = function(obj) {
  _$jscoverage['lib/tr8n.js'][251]++;
if(obj == null || typeof(obj) != 'object')
    {
_$jscoverage['lib/tr8n.js'][252]++;
return obj;}


  _$jscoverage['lib/tr8n.js'][254]++;
var temp = obj.constructor(); 
  _$jscoverage['lib/tr8n.js'][255]++;
for(var key in obj)
    {
_$jscoverage['lib/tr8n.js'][256]++;
temp[key] = Tr8n.Utils.clone(obj[key]);}

  _$jscoverage['lib/tr8n.js'][257]++;
return temp;
};

_$jscoverage['lib/tr8n.js'][260]++;
Tr8n.Utils.keys = function(obj) {
  _$jscoverage['lib/tr8n.js'][261]++;
return Object.keys(obj);
};

_$jscoverage['lib/tr8n.js'][264]++;
Tr8n.Utils.generateKey = function(label, description) {
  _$jscoverage['lib/tr8n.js'][265]++;
return MD5(label + ";;;" + description);
};
;
_$jscoverage['lib/tr8n.js'][268]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][269]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][270]++;
this.initTranslatorOptions();
  _$jscoverage['lib/tr8n.js'][271]++;
this.initContextRules();
  _$jscoverage['lib/tr8n.js'][272]++;
this.enabled = true;
  _$jscoverage['lib/tr8n.js'][273]++;
this.default_locale = "en-US";
};

_$jscoverage['lib/tr8n.js'][276]++;
Tr8n.Configuration.prototype.initDefaultTokens = function() {
  _$jscoverage['lib/tr8n.js'][277]++;
this.default_tokens = {
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

_$jscoverage['lib/tr8n.js'][342]++;
Tr8n.Configuration.prototype.getDefaultToken = function(token, type, format) {
  _$jscoverage['lib/tr8n.js'][343]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][343]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][344]++;
if (typeof this.default_tokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][344]++;
return null;}

  _$jscoverage['lib/tr8n.js'][345]++;
return new String(this.default_tokens[format][type][token]);
};

_$jscoverage['lib/tr8n.js'][348]++;
Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  _$jscoverage['lib/tr8n.js'][349]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][349]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][350]++;
this.default_tokens[format] = this.default_tokens[format] || {};
  _$jscoverage['lib/tr8n.js'][351]++;
this.default_tokens[format][type] = this.default_tokens[format][type] || {};
  _$jscoverage['lib/tr8n.js'][352]++;
this.default_tokens[format][type][token] = value;
};

_$jscoverage['lib/tr8n.js'][355]++;
Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  _$jscoverage['lib/tr8n.js'][356]++;
this.translator_options = {
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

_$jscoverage['lib/tr8n.js'][385]++;
Tr8n.Configuration.prototype.initContextRules = function() {
  _$jscoverage['lib/tr8n.js'][386]++;
this.context_rules = {
    number: {
      variables: {}
    },
    gender: {
      variables: {
        "@gender": "gender"
      }
    },
    genders: {
      variables: {
        "@genders": function(list) {
          _$jscoverage['lib/tr8n.js'][398]++;
var genders = [];
          _$jscoverage['lib/tr8n.js'][399]++;
list.forEach(function(obj) {
            _$jscoverage['lib/tr8n.js'][400]++;
genders.push(obj.gender);
          });
          _$jscoverage['lib/tr8n.js'][402]++;
return genders;
        }
      }
    },
    date: {
      variables: {}
    },
    time: {
      variables: {}
    }
  };
};

_$jscoverage['lib/tr8n.js'][415]++;
Tr8n.Configuration.prototype.getContextRules = function(key) {
  _$jscoverage['lib/tr8n.js'][416]++;
return this.context_rules[key] || {};
};

_$jscoverage['lib/tr8n.js'][419]++;
Tr8n.Configuration.prototype.isDisabled = function() {
  _$jscoverage['lib/tr8n.js'][420]++;
return !enabled;
};

_$jscoverage['lib/tr8n.js'][423]++;
Tr8n.Configuration.prototype.isEnabled = function() {
  _$jscoverage['lib/tr8n.js'][424]++;
return enabled;
};
;
_$jscoverage['lib/tr8n.js'][427]++;
Tr8n.Tokens.Data = function(name, label) {
  _$jscoverage['lib/tr8n.js'][428]++;
this.full_name = name;
  _$jscoverage['lib/tr8n.js'][429]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][430]++;
this.parseElements();
};

_$jscoverage['lib/tr8n.js'][433]++;
Tr8n.Tokens.Data.prototype.parseElements = function() {
  _$jscoverage['lib/tr8n.js'][434]++;
var name_without_parens = this.full_name.substring(1, this.full_name.length-1);
  _$jscoverage['lib/tr8n.js'][435]++;
var name_without_case_keys = name_without_parens.split('::')[0].trim();

  _$jscoverage['lib/tr8n.js'][437]++;
this.short_name = name_without_parens.split(':')[0].trim();
  _$jscoverage['lib/tr8n.js'][438]++;
this.case_keys = [];

  _$jscoverage['lib/tr8n.js'][440]++;
var keys = name_without_parens.match(/(::\s*\w+)/g) || [];
  _$jscoverage['lib/tr8n.js'][441]++;
for (var i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][442]++;
this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
  }

  _$jscoverage['lib/tr8n.js'][445]++;
this.context_keys = [];
  _$jscoverage['lib/tr8n.js'][446]++;
keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
  _$jscoverage['lib/tr8n.js'][447]++;
for (i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][448]++;
this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
  }
};

_$jscoverage['lib/tr8n.js'][452]++;
Tr8n.Tokens.Data.prototype.getContextForLanguage = function(language) {
  _$jscoverage['lib/tr8n.js'][453]++;
if (this.context_keys.length > 0)
    {
_$jscoverage['lib/tr8n.js'][454]++;
return language.getContextByKeyword(this.context_keys[0]);}


  _$jscoverage['lib/tr8n.js'][456]++;
return language.getContextByTokenName(this.short_name);
};

_$jscoverage['lib/tr8n.js'][459]++;
Tr8n.Tokens.Data.prototype.tokenObject = function(tokens, name) {
  _$jscoverage['lib/tr8n.js'][460]++;
if (tokens == null) {
_$jscoverage['lib/tr8n.js'][460]++;
return null;}


  _$jscoverage['lib/tr8n.js'][462]++;
var object = tokens[name];
  _$jscoverage['lib/tr8n.js'][463]++;
if (typeof object === 'array')
    {
_$jscoverage['lib/tr8n.js'][464]++;
return object[0];}


  _$jscoverage['lib/tr8n.js'][466]++;
return object.object || object;
};

_$jscoverage['lib/tr8n.js'][469]++;
Tr8n.Tokens.Data.prototype.error = function(msg) {
  _$jscoverage['lib/tr8n.js'][470]++;
console.log(this.full_name + " in \"" + this.label + "\" : " + msg);
  _$jscoverage['lib/tr8n.js'][471]++;
return this.full_name;
};


_$jscoverage['lib/tr8n.js'][475]++;
Tr8n.Tokens.Data.prototype.getTokenValueFromArrayParam = function(arr, language, options) {
  _$jscoverage['lib/tr8n.js'][476]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][477]++;
if (arr.lenght == 0)
    {
_$jscoverage['lib/tr8n.js'][478]++;
return this.error("Invalid number of params of an array");}


  _$jscoverage['lib/tr8n.js'][480]++;
var object = arr[0];
  _$jscoverage['lib/tr8n.js'][481]++;
var method = arr.lenght > 1 ? arr[1] : null;

  _$jscoverage['lib/tr8n.js'][483]++;
if (typeof object === "array")
    {
_$jscoverage['lib/tr8n.js'][484]++;
return this.getTokenValueFromArray(arr, language, options);}


  _$jscoverage['lib/tr8n.js'][486]++;
if (method == null)
    {
_$jscoverage['lib/tr8n.js'][487]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][489]++;
if (method.match(/^@@/))
    {
_$jscoverage['lib/tr8n.js'][490]++;
return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][492]++;
if (method.match(/^@/))
    {
_$jscoverage['lib/tr8n.js'][493]++;
return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][495]++;
return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
};



_$jscoverage['lib/tr8n.js'][500]++;
Tr8n.Tokens.Data.prototype.getTokenValueFromHashParam = function(hash, language, options) {
  _$jscoverage['lib/tr8n.js'][501]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][502]++;
var value = hash.value;
  _$jscoverage['lib/tr8n.js'][503]++;
var object = hash.object;

  _$jscoverage['lib/tr8n.js'][505]++;
if (value) {
_$jscoverage['lib/tr8n.js'][505]++;
return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));}

  _$jscoverage['lib/tr8n.js'][506]++;
if (!object) {
_$jscoverage['lib/tr8n.js'][506]++;
return this.error("No object or value are provided in the hash");}


  _$jscoverage['lib/tr8n.js'][508]++;
var attr = hash.attribute;

  _$jscoverage['lib/tr8n.js'][510]++;
if (!attr) {
_$jscoverage['lib/tr8n.js'][510]++;
return this.error("Missing value for hash token");}


  _$jscoverage['lib/tr8n.js'][512]++;
return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
};



_$jscoverage['lib/tr8n.js'][517]++;
Tr8n.Tokens.Data.prototype.getTokenValueFromArray = function(params, language, options) {
  _$jscoverage['lib/tr8n.js'][518]++;
var list_options = {
    description: "List joiner",
    limit: 4,
    separator: ", ",
    joiner: 'and',
    less: '{laquo} less',
    expandable: true,
    collapsable: true
  };

  _$jscoverage['lib/tr8n.js'][528]++;
var objects = params[0];
  _$jscoverage['lib/tr8n.js'][529]++;
var method = (params.length > 1 ? params[1] : null);

  _$jscoverage['lib/tr8n.js'][531]++;
if (params.length > 2)
    {
_$jscoverage['lib/tr8n.js'][532]++;
list_options = Tr8n.Utils.merge(list_options, params[2]);}


  _$jscoverage['lib/tr8n.js'][534]++;
if (options["skip_decorations"])
    {
_$jscoverage['lib/tr8n.js'][535]++;
list_options.expandable = false;}


  _$jscoverage['lib/tr8n.js'][537]++;
var values = [];
  _$jscoverage['lib/tr8n.js'][538]++;
for (var obj in objects) {
    _$jscoverage['lib/tr8n.js'][539]++;
if (method == null) {
      _$jscoverage['lib/tr8n.js'][540]++;
values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
    } else {
_$jscoverage['lib/tr8n.js'][541]++;
if (typeof method === "string") {
      _$jscoverage['lib/tr8n.js'][542]++;
if (method.match(/^@@/))
        {
_$jscoverage['lib/tr8n.js'][543]++;
values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else {
_$jscoverage['lib/tr8n.js'][544]++;
if (method.match(/^@/))
        {
_$jscoverage['lib/tr8n.js'][545]++;
values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else
        {
_$jscoverage['lib/tr8n.js'][547]++;
values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));}
}

    } else {
_$jscoverage['lib/tr8n.js'][548]++;
if (typeof method === "object") {
      _$jscoverage['lib/tr8n.js'][549]++;
var attribute = method.attribute;
      _$jscoverage['lib/tr8n.js'][550]++;
var value = method.value;

      _$jscoverage['lib/tr8n.js'][552]++;
if (attribute == null)
        {
_$jscoverage['lib/tr8n.js'][553]++;
return this.error("No attribute is provided for the hash object in the array");}


      _$jscoverage['lib/tr8n.js'][555]++;
if (!object[attribute])
        {
_$jscoverage['lib/tr8n.js'][556]++;
return this.error("Hash object in the array does not contain such attribute");}


      _$jscoverage['lib/tr8n.js'][558]++;
attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));

      _$jscoverage['lib/tr8n.js'][560]++;
if (value)
        {
_$jscoverage['lib/tr8n.js'][561]++;
values.push(value.replace("{$0}", attribute));}

      else
        {
_$jscoverage['lib/tr8n.js'][563]++;
values.push(attribute);}

    } else {
_$jscoverage['lib/tr8n.js'][564]++;
if (typeof method === "function") {
      _$jscoverage['lib/tr8n.js'][565]++;
values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
    }}
}
}

  }

  _$jscoverage['lib/tr8n.js'][569]++;
if (values.lenght == 1)
    {
_$jscoverage['lib/tr8n.js'][570]++;
return values[0];}


  _$jscoverage['lib/tr8n.js'][572]++;
if (!list_options.joiner || list_options.joiner == "")
    {
_$jscoverage['lib/tr8n.js'][573]++;
return values.join(list_options.separator);}


  _$jscoverage['lib/tr8n.js'][575]++;
var joiner = language.translate(list_options.joiner, list_options.description, {}, options);

  _$jscoverage['lib/tr8n.js'][577]++;
if (values.length <= list_options.limit) {
    _$jscoverage['lib/tr8n.js'][578]++;
var last = values.pop();
    _$jscoverage['lib/tr8n.js'][579]++;
return values.join(list_options.separator) + " " + joiner + " " + last;
  }

  _$jscoverage['lib/tr8n.js'][582]++;
var displayed_values = values.slice(0, list_options.limit);
  _$jscoverage['lib/tr8n.js'][583]++;
var remaining_values = values.slice(list_options.limit);

  _$jscoverage['lib/tr8n.js'][585]++;
var result = displayed_values.join(list_options.separator);
  _$jscoverage['lib/tr8n.js'][586]++;
var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);

  _$jscoverage['lib/tr8n.js'][588]++;
if (list_options.expandable) {
    _$jscoverage['lib/tr8n.js'][589]++;
result = result + " " + joiner + " ";
    _$jscoverage['lib/tr8n.js'][590]++;
if (list_options.remainder && typeof list_options.remainder === "function")
      {
_$jscoverage['lib/tr8n.js'][591]++;
return result + list_options.remainder(remaining_values);}

    _$jscoverage['lib/tr8n.js'][592]++;
return result + other_values;
  }

  _$jscoverage['lib/tr8n.js'][595]++;
var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));

  _$jscoverage['lib/tr8n.js'][597]++;
result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
  _$jscoverage['lib/tr8n.js'][598]++;
result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';

  _$jscoverage['lib/tr8n.js'][600]++;
if (list_options.remainder && typeof list_options.remainder === "function")
    {
_$jscoverage['lib/tr8n.js'][601]++;
result = result + list_options.remainder(remaining_values);}

  else
    {
_$jscoverage['lib/tr8n.js'][603]++;
result = result + other_values;}


  _$jscoverage['lib/tr8n.js'][605]++;
result = result + "</a></span>";

  _$jscoverage['lib/tr8n.js'][607]++;
result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + list_options.separator;
  _$jscoverage['lib/tr8n.js'][608]++;
var last_remaining = remaining_values.pop();
  _$jscoverage['lib/tr8n.js'][609]++;
result = result + remaining_values.join(list_options.separator);
  _$jscoverage['lib/tr8n.js'][610]++;
result = result + " " + joiner + " " + last_remaining;

  _$jscoverage['lib/tr8n.js'][612]++;
if (list_options.collapsable) {
    _$jscoverage['lib/tr8n.js'][613]++;
result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
    _$jscoverage['lib/tr8n.js'][614]++;
result = result + language.translate(list_options.less, list_options["description"], {}, options);
    _$jscoverage['lib/tr8n.js'][615]++;
result = result + "</a>";
  }

  _$jscoverage['lib/tr8n.js'][618]++;
result = result + "</span>";
  _$jscoverage['lib/tr8n.js'][619]++;
return result;
};

_$jscoverage['lib/tr8n.js'][622]++;
Tr8n.Tokens.Data.prototype.getTokenValue = function(tokens, language, options) {
  _$jscoverage['lib/tr8n.js'][623]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][624]++;
var object = null;

  _$jscoverage['lib/tr8n.js'][626]++;
if (tokens[this.short_name])
    {
_$jscoverage['lib/tr8n.js'][627]++;
object = tokens[this.short_name];}

  else
    {
_$jscoverage['lib/tr8n.js'][629]++;
object = Tr8n.config.getDefaultToken(this.short_name);}


  _$jscoverage['lib/tr8n.js'][631]++;
if (!object)
    {
_$jscoverage['lib/tr8n.js'][632]++;
return this.error("Missing token value");}


  _$jscoverage['lib/tr8n.js'][634]++;
if (typeof object === "array") {
    _$jscoverage['lib/tr8n.js'][635]++;
return this.getTokenValueFromArrayParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][638]++;
if (typeof object === "object") {
    _$jscoverage['lib/tr8n.js'][639]++;
return this.getTokenValueFromHashParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][642]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
};

_$jscoverage['lib/tr8n.js'][645]++;
Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][646]++;
var lcase = language.getLanguageCaseByKeyword(key);
  _$jscoverage['lib/tr8n.js'][647]++;
if (!lcase) {
_$jscoverage['lib/tr8n.js'][647]++;
return value;}

  _$jscoverage['lib/tr8n.js'][648]++;
return lcase.apply(value, object, options);
};

_$jscoverage['lib/tr8n.js'][651]++;
Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][652]++;
value = "" + value;

  _$jscoverage['lib/tr8n.js'][654]++;
if (!options.safe) {
        _$jscoverage['lib/tr8n.js'][655]++;
value = escape(value);
  }

  _$jscoverage['lib/tr8n.js'][658]++;
if (this.case_keys.length > 0) {
    _$jscoverage['lib/tr8n.js'][659]++;
for (var key in this.case_keys) {
      _$jscoverage['lib/tr8n.js'][660]++;
value = this.applyCase(key, value, object, language, options);
    }
  }

  _$jscoverage['lib/tr8n.js'][664]++;
return value;
};

_$jscoverage['lib/tr8n.js'][667]++;
Tr8n.Tokens.Data.prototype.substitute = function(label, tokens, language, options) {
  _$jscoverage['lib/tr8n.js'][668]++;
return label.replace(this.full_name, this.getTokenValue(tokens, language, options));
};

;
_$jscoverage['lib/tr8n.js'][672]++;
Tr8n.Tokens.Method = function() {

};


;
_$jscoverage['lib/tr8n.js'][678]++;
Tr8n.Tokens.Piped = function() {

};


;
_$jscoverage['lib/tr8n.js'][684]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][685]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][686]++;
this.ctx = ctx || {
    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][687]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][687]++;
return r; }.bind(this),
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][688]++;
return expr; }.bind(this),
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][689]++;
return list[1]; }.bind(this),
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][690]++;
list.shift(); _$jscoverage['lib/tr8n.js'][690]++;
return list; }.bind(this),
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][691]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][691]++;
return cell; }.bind(this),
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][692]++;
return (l == r); }.bind(this),
    'atom':     function(a)       { _$jscoverage['lib/tr8n.js'][693]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][694]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ _$jscoverage['lib/tr8n.js'][696]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][696]++;
return r; }.bind(this),

    '=':        function(args){ _$jscoverage['lib/tr8n.js'][698]++;
return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ _$jscoverage['lib/tr8n.js'][699]++;
return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ _$jscoverage['lib/tr8n.js'][700]++;
return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ _$jscoverage['lib/tr8n.js'][701]++;
return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ _$jscoverage['lib/tr8n.js'][702]++;
return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ _$jscoverage['lib/tr8n.js'][703]++;
return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ _$jscoverage['lib/tr8n.js'][704]++;
return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ _$jscoverage['lib/tr8n.js'][705]++;
return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ _$jscoverage['lib/tr8n.js'][706]++;
return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ _$jscoverage['lib/tr8n.js'][707]++;
return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      _$jscoverage['lib/tr8n.js'][709]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][710]++;
if (!this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][710]++;
return false;}

      }
      _$jscoverage['lib/tr8n.js'][712]++;
return true;
    }.bind(this),
    'and':      function(args){ _$jscoverage['lib/tr8n.js'][714]++;
return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      _$jscoverage['lib/tr8n.js'][716]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][717]++;
if (this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][717]++;
return true;}

      }
      _$jscoverage['lib/tr8n.js'][719]++;
return false;
    }.bind(this),
    'or':      function(args){ _$jscoverage['lib/tr8n.js'][721]++;
return this.ctx['||'](args); }.bind(this)
  };
  _$jscoverage['lib/tr8n.js'][723]++;
return this;
}

_$jscoverage['lib/tr8n.js'][726]++;
Tr8n.RulesEngine.Evaluator.prototype = {
  setVars: function(vars) {
    _$jscoverage['lib/tr8n.js'][728]++;
this.vars = vars;
  },

  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][732]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][733]++;
return this.ctx[fn](args);
    }
    _$jscoverage['lib/tr8n.js'][735]++;
return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    _$jscoverage['lib/tr8n.js'][739]++;
if (this.ctx['atom'](sexpr)) {
      _$jscoverage['lib/tr8n.js'][740]++;
return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    _$jscoverage['lib/tr8n.js'][743]++;
var fn = sexpr[0];
    _$jscoverage['lib/tr8n.js'][744]++;
var args = sexpr.slice(1);

    _$jscoverage['lib/tr8n.js'][746]++;
if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][747]++;
args = args.map(function(arg) {
        _$jscoverage['lib/tr8n.js'][748]++;
return this.evaluate(arg);
      }.bind(this));
    }

    _$jscoverage['lib/tr8n.js'][752]++;
return this.apply(fn, args);
  }
}
;
_$jscoverage['lib/tr8n.js'][756]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][757]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][760]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][762]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][766]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][767]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][767]++;
return;}

  	_$jscoverage['lib/tr8n.js'][768]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][768]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][769]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][769]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][770]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][770]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][771]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][775]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][776]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][777]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][778]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][779]++;
return list;
  }
}
;
_$jscoverage['lib/tr8n.js'][783]++;
Tr8n.Tokenizers.Data = function(label, context, options) {
  _$jscoverage['lib/tr8n.js'][784]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][785]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][786]++;
this.options = options || {};
  _$jscoverage['lib/tr8n.js'][787]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][790]++;
Tr8n.Tokenizers.Data.prototype.supportedTokens = function() {
  _$jscoverage['lib/tr8n.js'][791]++;
return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

_$jscoverage['lib/tr8n.js'][798]++;
Tr8n.Tokenizers.Data.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][799]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][800]++;
for (var tokenInfo in this.supportedTokens()) {
    _$jscoverage['lib/tr8n.js'][801]++;
var matches = this.label.match(tokenInfo[0]) || [];
    _$jscoverage['lib/tr8n.js'][802]++;
for (var i=0; i<matches.length; i++) {
        _$jscoverage['lib/tr8n.js'][803]++;
this.tokens.push(new tokenInfo[1](matches[i], this.label));
    }
  }
};

_$jscoverage['lib/tr8n.js'][808]++;
Tr8n.Tokenizers.Data.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][809]++;
if (this.options.allowed_tokens) {
_$jscoverage['lib/tr8n.js'][809]++;
return true;}

  _$jscoverage['lib/tr8n.js'][810]++;
return (this.options.allowed_tokens.indexOf(token.name) != -1);
};

_$jscoverage['lib/tr8n.js'][813]++;
Tr8n.Tokenizers.Data.prototype.substitute = function(language, options) {
  _$jscoverage['lib/tr8n.js'][814]++;
var label = this.label;
  _$jscoverage['lib/tr8n.js'][815]++;
for (var i=0; i<this.tokens.length; i++) {
    _$jscoverage['lib/tr8n.js'][816]++;
var token = this.tokens[i];
    _$jscoverage['lib/tr8n.js'][817]++;
if (this.isTokenAllowed(token)) {
      _$jscoverage['lib/tr8n.js'][818]++;
label = token.substitute(label, this.context, language, options);
    }
  }
  _$jscoverage['lib/tr8n.js'][821]++;
return label;
};
;
_$jscoverage['lib/tr8n.js'][824]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][825]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][826]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][827]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][828]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][829]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][830]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][831]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][832]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][834]++;
Tr8n.Tokenizers.Decoration = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][835]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][836]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][837]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][838]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][839]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][840]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][843]++;
Tr8n.Tokenizers.Decoration.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][844]++;
var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  _$jscoverage['lib/tr8n.js'][852]++;
this.fragments = this.label.match(expression);
  _$jscoverage['lib/tr8n.js'][853]++;
return this.fragments;
};

_$jscoverage['lib/tr8n.js'][856]++;
Tr8n.Tokenizers.Decoration.prototype.peek = function() {
  _$jscoverage['lib/tr8n.js'][857]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][857]++;
return null;}

  _$jscoverage['lib/tr8n.js'][858]++;
return this.fragments[0];
};

_$jscoverage['lib/tr8n.js'][861]++;
Tr8n.Tokenizers.Decoration.prototype.getNextFragment = function() {
  _$jscoverage['lib/tr8n.js'][862]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][862]++;
return null;}

  _$jscoverage['lib/tr8n.js'][863]++;
return this.fragments.shift();
};

_$jscoverage['lib/tr8n.js'][866]++;
Tr8n.Tokenizers.Decoration.prototype.parse = function() {
  _$jscoverage['lib/tr8n.js'][867]++;
var token = this.getNextFragment();
  _$jscoverage['lib/tr8n.js'][868]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][869]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

  _$jscoverage['lib/tr8n.js'][870]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][871]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

  _$jscoverage['lib/tr8n.js'][872]++;
return token;
};

_$jscoverage['lib/tr8n.js'][875]++;
Tr8n.Tokenizers.Decoration.prototype.parseTree = function(name, type) {
  _$jscoverage['lib/tr8n.js'][876]++;
var tree = [name];
  _$jscoverage['lib/tr8n.js'][877]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    {
_$jscoverage['lib/tr8n.js'][878]++;
this.tokens.push(name);}


  _$jscoverage['lib/tr8n.js'][880]++;
if (type == TOKEN_TYPE_SHORT) {
    _$jscoverage['lib/tr8n.js'][881]++;
var first = true;
    _$jscoverage['lib/tr8n.js'][882]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][883]++;
var value = this.parse();
      _$jscoverage['lib/tr8n.js'][884]++;
if (first && typeof value == "string") {
        _$jscoverage['lib/tr8n.js'][885]++;
value = value.replace(/^\s+/,'');
        _$jscoverage['lib/tr8n.js'][886]++;
first = false;
      }
      _$jscoverage['lib/tr8n.js'][888]++;
tree.push(value);
    }
  } else {
_$jscoverage['lib/tr8n.js'][890]++;
if (type == TOKEN_TYPE_LONG) {
    _$jscoverage['lib/tr8n.js'][891]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][892]++;
tree.push(this.parse());
    }
  }}


  _$jscoverage['lib/tr8n.js'][896]++;
this.getNextFragment();
  _$jscoverage['lib/tr8n.js'][897]++;
return tree;
};

_$jscoverage['lib/tr8n.js'][900]++;
Tr8n.Tokenizers.Decoration.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][901]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

_$jscoverage['lib/tr8n.js'][904]++;
Tr8n.Tokenizers.Decoration.prototype.getDefaultDecoration = function(token, value) {
  _$jscoverage['lib/tr8n.js'][905]++;
var default_decoration = Tr8n.config.getDefaultToken(token, "decoration");
  _$jscoverage['lib/tr8n.js'][906]++;
if (default_decoration == null) {
_$jscoverage['lib/tr8n.js'][906]++;
return value;}


  _$jscoverage['lib/tr8n.js'][908]++;
var decoration_token_values = this.context[token];
  _$jscoverage['lib/tr8n.js'][909]++;
default_decoration = default_decoration.replace(PLACEHOLDER, value);

  _$jscoverage['lib/tr8n.js'][911]++;
if (decoration_token_values instanceof Object) {
    _$jscoverage['lib/tr8n.js'][912]++;
var keys = Tr8n.Utils.keys(decoration_token_values);
    _$jscoverage['lib/tr8n.js'][913]++;
for (var i = 0; i < keys.length; i++) {
      _$jscoverage['lib/tr8n.js'][914]++;
default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);
    }
  }

  _$jscoverage['lib/tr8n.js'][918]++;
return default_decoration;
};

_$jscoverage['lib/tr8n.js'][921]++;
Tr8n.Tokenizers.Decoration.prototype.apply = function(token, value) {
  _$jscoverage['lib/tr8n.js'][922]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][922]++;
return value;}

  _$jscoverage['lib/tr8n.js'][923]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][923]++;
return value;}


  _$jscoverage['lib/tr8n.js'][925]++;
var method = this.context[token];

  _$jscoverage['lib/tr8n.js'][927]++;
if (method != null) {
    _$jscoverage['lib/tr8n.js'][928]++;
if (typeof method === 'string')
      {
_$jscoverage['lib/tr8n.js'][929]++;
return method.replace(PLACEHOLDER, value);}


    _$jscoverage['lib/tr8n.js'][931]++;
if (typeof method === 'function')
      {
_$jscoverage['lib/tr8n.js'][932]++;
return method(value);}


    _$jscoverage['lib/tr8n.js'][934]++;
if (typeof method === 'object')
      {
_$jscoverage['lib/tr8n.js'][935]++;
return this.getDefaultDecoration(token, value);}


    _$jscoverage['lib/tr8n.js'][937]++;
return value;
  }

  _$jscoverage['lib/tr8n.js'][940]++;
return this.getDefaultDecoration(token, value);
};

_$jscoverage['lib/tr8n.js'][943]++;
Tr8n.Tokenizers.Decoration.prototype.evaluate = function(expr) {
  _$jscoverage['lib/tr8n.js'][944]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][944]++;
return expr;}


  _$jscoverage['lib/tr8n.js'][946]++;
var token = expr[0];
  _$jscoverage['lib/tr8n.js'][947]++;
expr.shift();
  _$jscoverage['lib/tr8n.js'][948]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][949]++;
var value = [];
  _$jscoverage['lib/tr8n.js'][950]++;
expr.forEach(function(obj, index) {
    _$jscoverage['lib/tr8n.js'][951]++;
value.push(self.evaluate(obj));
  });
  _$jscoverage['lib/tr8n.js'][953]++;
return this.apply(token, value.join(''));
};

_$jscoverage['lib/tr8n.js'][956]++;
Tr8n.Tokenizers.Decoration.prototype.substitute = function(language, options) {
  _$jscoverage['lib/tr8n.js'][957]++;
return this.evaluate(this.parse());
};
;
_$jscoverage['lib/tr8n.js'][960]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][961]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][962]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][964]++;
Tr8n.Tokenizers.Dom = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][965]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][966]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][967]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][968]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][971]++;
Tr8n.Tokenizers.Dom.prototype.translate = function() {
  _$jscoverage['lib/tr8n.js'][972]++;
return this.translateTree(this.doc);
};

_$jscoverage['lib/tr8n.js'][975]++;
Tr8n.Tokenizers.Dom.prototype.translateTree = function(node) {
  _$jscoverage['lib/tr8n.js'][976]++;
if (this.isNonTranslatableNode(node)) {
    _$jscoverage['lib/tr8n.js'][977]++;
if (node.childNodes.length == 1)
      {
_$jscoverage['lib/tr8n.js'][978]++;
return node.childNodes[0].nodeValue;}

    _$jscoverage['lib/tr8n.js'][979]++;
return "";
  }

  _$jscoverage['lib/tr8n.js'][982]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][983]++;
return this.translateTml(node.nodeValue);}


  _$jscoverage['lib/tr8n.js'][985]++;
var html = "";
  _$jscoverage['lib/tr8n.js'][986]++;
var buffer = "";

  _$jscoverage['lib/tr8n.js'][988]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][989]++;
var child = node.childNodes[i];


    _$jscoverage['lib/tr8n.js'][992]++;
if (child.nodeType == 3) {
      _$jscoverage['lib/tr8n.js'][993]++;
buffer = buffer + child.nodeValue;
    } else {
_$jscoverage['lib/tr8n.js'][994]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        _$jscoverage['lib/tr8n.js'][994]++;
buffer = buffer + this.generateTmlTags(child);
    } else {
_$jscoverage['lib/tr8n.js'][995]++;
if (this.isSeparatorNode(child)) {          _$jscoverage['lib/tr8n.js'][995]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][996]++;
html = html + this.translateTml(buffer);}

      _$jscoverage['lib/tr8n.js'][997]++;
html = html + this.generateHtmlToken(child);
      _$jscoverage['lib/tr8n.js'][998]++;
buffer = "";
    } else {
      _$jscoverage['lib/tr8n.js'][1000]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][1001]++;
html = html + this.translateTml(buffer);}


      _$jscoverage['lib/tr8n.js'][1003]++;
var containerValue = this.translateTree(child);
      _$jscoverage['lib/tr8n.js'][1004]++;
if (this.isIgnoredNode(child)) {
        _$jscoverage['lib/tr8n.js'][1005]++;
html = html + containerValue;
      } else {
        _$jscoverage['lib/tr8n.js'][1007]++;
html = html + this.generateHtmlToken(child, containerValue);
      }

      _$jscoverage['lib/tr8n.js'][1010]++;
buffer = "";
    }}
}

  }

  _$jscoverage['lib/tr8n.js'][1014]++;
if (buffer != "") {
    _$jscoverage['lib/tr8n.js'][1015]++;
html = html + this.translateTml(buffer);
  }

  _$jscoverage['lib/tr8n.js'][1018]++;
return html;
};

_$jscoverage['lib/tr8n.js'][1021]++;
Tr8n.Tokenizers.Dom.prototype.isNonTranslatableNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1022]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    {
_$jscoverage['lib/tr8n.js'][1023]++;
return true;}

  _$jscoverage['lib/tr8n.js'][1024]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    {
_$jscoverage['lib/tr8n.js'][1025]++;
return true;}

  _$jscoverage['lib/tr8n.js'][1026]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1029]++;
Tr8n.Tokenizers.Dom.prototype.translateTml = function(tml) {
  _$jscoverage['lib/tr8n.js'][1030]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][1030]++;
return tml;}



  _$jscoverage['lib/tr8n.js'][1033]++;
if (this.getOption("split_sentences")) {
    _$jscoverage['lib/tr8n.js'][1034]++;
sentences = Tr8n.Utils.splitSentences(tml);
    _$jscoverage['lib/tr8n.js'][1035]++;
translation = tml;
    _$jscoverage['lib/tr8n.js'][1036]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1037]++;
sentences.forEach(function(sentence) {
      _$jscoverage['lib/tr8n.js'][1038]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      _$jscoverage['lib/tr8n.js'][1039]++;
translation = translation.replace(sentence, sentenceTranslation);
    });
    _$jscoverage['lib/tr8n.js'][1041]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][1042]++;
return translation;
  }

  _$jscoverage['lib/tr8n.js'][1045]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  _$jscoverage['lib/tr8n.js'][1046]++;
this.resetContext();
  _$jscoverage['lib/tr8n.js'][1047]++;
return translation;
};

_$jscoverage['lib/tr8n.js'][1050]++;
Tr8n.Tokenizers.Dom.prototype.hasChildNodes = function(node) {
  _$jscoverage['lib/tr8n.js'][1051]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][1051]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1052]++;
return (node.childNodes.length > 0);
};

_$jscoverage['lib/tr8n.js'][1055]++;
Tr8n.Tokenizers.Dom.prototype.isBetweenSeparators = function(node) {
  _$jscoverage['lib/tr8n.js'][1056]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    {
_$jscoverage['lib/tr8n.js'][1057]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1059]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    {
_$jscoverage['lib/tr8n.js'][1060]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1062]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1065]++;
Tr8n.Tokenizers.Dom.prototype.generateTmlTags = function(node) {
  _$jscoverage['lib/tr8n.js'][1066]++;
var buffer = "";
  _$jscoverage['lib/tr8n.js'][1067]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1068]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1069]++;
var child = node.childNodes[i];
    _$jscoverage['lib/tr8n.js'][1070]++;
if (child.nodeType == 3)                          {
_$jscoverage['lib/tr8n.js'][1070]++;
buffer = buffer + child.nodeValue;}

    else
      {
_$jscoverage['lib/tr8n.js'][1072]++;
buffer = buffer + self.generateTmlTags(child);}

  }
  _$jscoverage['lib/tr8n.js'][1074]++;
var tokenContext = self.generateHtmlToken(node);
  _$jscoverage['lib/tr8n.js'][1075]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

  _$jscoverage['lib/tr8n.js'][1077]++;
var value = this.sanitizeValue(buffer);

  _$jscoverage['lib/tr8n.js'][1079]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1080]++;
return '{' + token + '}';}


  _$jscoverage['lib/tr8n.js'][1082]++;
if (this.isShortToken(token, value))
    {
_$jscoverage['lib/tr8n.js'][1083]++;
return '[' + token + ': ' + value + ']';}


  _$jscoverage['lib/tr8n.js'][1085]++;
return '[' + token + ']' + value + '[/' + token + ']';
};

_$jscoverage['lib/tr8n.js'][1088]++;
Tr8n.Tokenizers.Dom.prototype.getOption = function(name) {
  _$jscoverage['lib/tr8n.js'][1089]++;
if (this.options[name]) {
    _$jscoverage['lib/tr8n.js'][1090]++;
return this.options[name];
  }
  _$jscoverage['lib/tr8n.js'][1092]++;
return Tr8n.Utils.hashValue(Tr8n.config.translator_options, name);
};

_$jscoverage['lib/tr8n.js'][1095]++;
Tr8n.Tokenizers.Dom.prototype.debugTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][1096]++;
return this.getOption("debug_format").replace('{$0}', translation);
};

_$jscoverage['lib/tr8n.js'][1099]++;
Tr8n.Tokenizers.Dom.prototype.isEmptyString = function(tml) {
  _$jscoverage['lib/tr8n.js'][1100]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  _$jscoverage['lib/tr8n.js'][1101]++;
return (tml == '');
};

_$jscoverage['lib/tr8n.js'][1104]++;
Tr8n.Tokenizers.Dom.prototype.resetContext = function() {
  _$jscoverage['lib/tr8n.js'][1105]++;
this.tokens = [].concat(this.context);
};

_$jscoverage['lib/tr8n.js'][1108]++;
Tr8n.Tokenizers.Dom.prototype.isShortToken = function(token, value) {
  _$jscoverage['lib/tr8n.js'][1109]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

_$jscoverage['lib/tr8n.js'][1112]++;
Tr8n.Tokenizers.Dom.prototype.isOnlyChild = function(node) {
  _$jscoverage['lib/tr8n.js'][1113]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1113]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1114]++;
return (node.parentNode.childNodes.length == 1);
};

_$jscoverage['lib/tr8n.js'][1117]++;
Tr8n.Tokenizers.Dom.prototype.hasInlineOrTextSiblings = function(node) {
  _$jscoverage['lib/tr8n.js'][1118]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1118]++;
return false;}


  _$jscoverage['lib/tr8n.js'][1120]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1121]++;
var child = node.parentNode.childNodes[i];
    _$jscoverage['lib/tr8n.js'][1122]++;
if (child != node) {
      _$jscoverage['lib/tr8n.js'][1123]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
        {
_$jscoverage['lib/tr8n.js'][1124]++;
return true;}

    }
  }

  _$jscoverage['lib/tr8n.js'][1128]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1131]++;
Tr8n.Tokenizers.Dom.prototype.isInlineNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1132]++;
return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

_$jscoverage['lib/tr8n.js'][1139]++;
Tr8n.Tokenizers.Dom.prototype.isContainerNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1140]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
};

_$jscoverage['lib/tr8n.js'][1143]++;
Tr8n.Tokenizers.Dom.prototype.isSelfClosingNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1144]++;
return (node.firstChild == null);
};

_$jscoverage['lib/tr8n.js'][1147]++;
Tr8n.Tokenizers.Dom.prototype.isIgnoredNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1148]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][1148]++;
return true;}

  _$jscoverage['lib/tr8n.js'][1149]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][1152]++;
Tr8n.Tokenizers.Dom.prototype.isValidTextNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1153]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1153]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1154]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

_$jscoverage['lib/tr8n.js'][1157]++;
Tr8n.Tokenizers.Dom.prototype.isSeparatorNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1158]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1158]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1159]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][1162]++;
Tr8n.Tokenizers.Dom.prototype.sanitizeValue = function(value) {
  _$jscoverage['lib/tr8n.js'][1163]++;
return value.replace(/^\s+/,'');
};

_$jscoverage['lib/tr8n.js'][1166]++;
Tr8n.Tokenizers.Dom.prototype.replaceSpecialCharacters = function(text) {
  _$jscoverage['lib/tr8n.js'][1167]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][1167]++;
return text;}


  _$jscoverage['lib/tr8n.js'][1169]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  _$jscoverage['lib/tr8n.js'][1170]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1171]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][1172]++;
token = match.substring(1, match.length - 2);
    _$jscoverage['lib/tr8n.js'][1173]++;
self.context[token] = match;
    _$jscoverage['lib/tr8n.js'][1174]++;
text = text.replace(match, "{" + token + "}");
  });

  _$jscoverage['lib/tr8n.js'][1177]++;
return text;
};

_$jscoverage['lib/tr8n.js'][1180]++;
Tr8n.Tokenizers.Dom.prototype.generateDataTokens = function(text) {
  _$jscoverage['lib/tr8n.js'][1181]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][1181]++;
return text;}


  _$jscoverage['lib/tr8n.js'][1183]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  _$jscoverage['lib/tr8n.js'][1184]++;
var tokenName = this.getOption("data_tokens.numeric_name");

  _$jscoverage['lib/tr8n.js'][1186]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1187]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][1188]++;
value = match.replace(/[,;]\s/, '');
    _$jscoverage['lib/tr8n.js'][1189]++;
token = self.contextualize(tokenName, value);
    _$jscoverage['lib/tr8n.js'][1190]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  _$jscoverage['lib/tr8n.js'][1193]++;
return text;
};

_$jscoverage['lib/tr8n.js'][1196]++;
Tr8n.Tokenizers.Dom.prototype.generateHtmlToken = function(node, value) {
  _$jscoverage['lib/tr8n.js'][1197]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][1198]++;
var attributes = node.attributes;
  _$jscoverage['lib/tr8n.js'][1199]++;
var attributesHash = {};
  _$jscoverage['lib/tr8n.js'][1200]++;
value = ((value == null) ? '{0}' : value);

  _$jscoverage['lib/tr8n.js'][1202]++;
if (attributes.length == 0) {
    _$jscoverage['lib/tr8n.js'][1203]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][1204]++;
return '<' + name + '/>';}

    _$jscoverage['lib/tr8n.js'][1205]++;
return '<' + name + '>' + value + '</' + name + '>';
  }

  _$jscoverage['lib/tr8n.js'][1208]++;
for(var i=0; i<attributes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1209]++;
attributesHash[attributes[i].name] = attributes[i].value;
  }

  _$jscoverage['lib/tr8n.js'][1212]++;
var keys = Tr8n.Utils.keys(attributesHash);
  _$jscoverage['lib/tr8n.js'][1213]++;
keys.sort();

  _$jscoverage['lib/tr8n.js'][1215]++;
var attr = [];
  _$jscoverage['lib/tr8n.js'][1216]++;
keys.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][1217]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    _$jscoverage['lib/tr8n.js'][1218]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  _$jscoverage['lib/tr8n.js'][1220]++;
attr = attr.join(' ');

  _$jscoverage['lib/tr8n.js'][1222]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1223]++;
return '<' + name + ' ' + attr + '/>';}


  _$jscoverage['lib/tr8n.js'][1225]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

_$jscoverage['lib/tr8n.js'][1228]++;
Tr8n.Tokenizers.Dom.prototype.adjustName = function(node) {
  _$jscoverage['lib/tr8n.js'][1229]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][1230]++;
var map = this.getOption("name_mapping");
  _$jscoverage['lib/tr8n.js'][1231]++;
name = (map[name] != null) ? map[name] : name;
  _$jscoverage['lib/tr8n.js'][1232]++;
return name;
};

_$jscoverage['lib/tr8n.js'][1235]++;
Tr8n.Tokenizers.Dom.prototype.contextualize = function(name, context) {
  _$jscoverage['lib/tr8n.js'][1236]++;
if (this.tokens[name] && this.tokens[name] != context) {
    _$jscoverage['lib/tr8n.js'][1237]++;
var index = 0;
    _$jscoverage['lib/tr8n.js'][1238]++;
var matches = name.match(/\d+$/);
    _$jscoverage['lib/tr8n.js'][1239]++;
if (matches && matches.length > 0) {
      _$jscoverage['lib/tr8n.js'][1240]++;
index = parseInt(matches[matches.length-1]);
      _$jscoverage['lib/tr8n.js'][1241]++;
name = name.replace("" + index, '');
    }
    _$jscoverage['lib/tr8n.js'][1243]++;
name = name + (index + 1);
    _$jscoverage['lib/tr8n.js'][1244]++;
return this.contextualize(name, context);
  }

  _$jscoverage['lib/tr8n.js'][1247]++;
this.tokens[name] = context;
  _$jscoverage['lib/tr8n.js'][1248]++;
return name;
};

_$jscoverage['lib/tr8n.js'][1251]++;
Tr8n.Tokenizers.Dom.prototype.debug = function(doc) {
  _$jscoverage['lib/tr8n.js'][1252]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][1253]++;
this.debugTree(doc, 0);
};

_$jscoverage['lib/tr8n.js'][1256]++;
Tr8n.Tokenizers.Dom.prototype.debugTree = function(node, depth) {
  _$jscoverage['lib/tr8n.js'][1257]++;
var padding = new Array(depth+1).join('=');

  _$jscoverage['lib/tr8n.js'][1259]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  _$jscoverage['lib/tr8n.js'][1261]++;
if (node.childNodes) {
    _$jscoverage['lib/tr8n.js'][1262]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1263]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1264]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][1265]++;
self.debugTree(child, depth+1);
    }
  }
};

_$jscoverage['lib/tr8n.js'][1270]++;
Tr8n.Tokenizers.Dom.prototype.nodeInfo = function(node) {
  _$jscoverage['lib/tr8n.js'][1271]++;
var info = [];
  _$jscoverage['lib/tr8n.js'][1272]++;
info.push(node.nodeType);

  _$jscoverage['lib/tr8n.js'][1274]++;
if (node.nodeType == 1)
    {
_$jscoverage['lib/tr8n.js'][1275]++;
info.push(node.tagName);}


  _$jscoverage['lib/tr8n.js'][1277]++;
if (this.isInlineNode(node)) {
    _$jscoverage['lib/tr8n.js'][1278]++;
info.push("inline");
    _$jscoverage['lib/tr8n.js'][1279]++;
if (this.hasInlineOrTextSiblings(node))
      {
_$jscoverage['lib/tr8n.js'][1280]++;
info.push("sentence");}

    else
      {
_$jscoverage['lib/tr8n.js'][1282]++;
info.push("only translatable");}

  }

  _$jscoverage['lib/tr8n.js'][1285]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1286]++;
info.push("self closing");}


  _$jscoverage['lib/tr8n.js'][1288]++;
if (this.isOnlyChild(node))
    {
_$jscoverage['lib/tr8n.js'][1289]++;
info.push("only child");}


  _$jscoverage['lib/tr8n.js'][1291]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][1292]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


  _$jscoverage['lib/tr8n.js'][1294]++;
return "[" + info.join(", ") + "]";
};
;;;;
_$jscoverage['lib/tr8n.js'][1297]++;
Tr8n.Application = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1298]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1300]++;
this.languages = [];
  _$jscoverage['lib/tr8n.js'][1301]++;
for(var lang in (attrs.languages || [])) {
    _$jscoverage['lib/tr8n.js'][1302]++;
this.languages.push(new Tr8n.Language(Tr8n.Utils.extend(lang, {application: this})));
  }

  _$jscoverage['lib/tr8n.js'][1305]++;
this.languages_by_locale = {};
};

_$jscoverage['lib/tr8n.js'][1308]++;
Tr8n.Application.prototype.getApiClient = function() {
  _$jscoverage['lib/tr8n.js'][1309]++;
if (!this.api_client)
    {
_$jscoverage['lib/tr8n.js'][1310]++;
this.api_client = new Tr8n.config.api_client_class(this);}

  _$jscoverage['lib/tr8n.js'][1311]++;
return this.api_client;
};

_$jscoverage['lib/tr8n.js'][1314]++;
Tr8n.Application.prototype.addLanguage = function(language) {
  _$jscoverage['lib/tr8n.js'][1315]++;
language.application = this;
  _$jscoverage['lib/tr8n.js'][1316]++;
this.languages_by_locale[language.attrs.locale] = language;
};

_$jscoverage['lib/tr8n.js'][1319]++;
Tr8n.Application.prototype.getLanguage = function(locale) {
  _$jscoverage['lib/tr8n.js'][1320]++;
return this.languages_by_locale[locale || Tr8n.config.default_locale];
};

;
_$jscoverage['lib/tr8n.js'][1324]++;
Tr8n.Source = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1325]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1328]++;
Tr8n.TranslationKey = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1329]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1331]++;
this.key = this.key || Tr8n.Utils.generateKey(this.label, this.description);

  _$jscoverage['lib/tr8n.js'][1333]++;
if (!this.locale && this.application)
      {
_$jscoverage['lib/tr8n.js'][1334]++;
this.locale = this.application.default_locale;}


  _$jscoverage['lib/tr8n.js'][1336]++;
if (!this.language && this.application)
    {
_$jscoverage['lib/tr8n.js'][1337]++;
this.language = this.application.language(this.locale);}


  _$jscoverage['lib/tr8n.js'][1339]++;
this.addTranslations(attrs.translations || {});
};

_$jscoverage['lib/tr8n.js'][1342]++;
Tr8n.Application.prototype.addTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][1343]++;
if (this.translations == null)
    {
_$jscoverage['lib/tr8n.js'][1344]++;
this.translations = {};}


  _$jscoverage['lib/tr8n.js'][1346]++;
if (this.translations[translation.locale])
    {
_$jscoverage['lib/tr8n.js'][1347]++;
this.translations[translation.locale] = [];}


  _$jscoverage['lib/tr8n.js'][1349]++;
this.translations[translation.locale].push(
    new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))
  );
};

_$jscoverage['lib/tr8n.js'][1354]++;
Tr8n.Application.prototype.addTranslations = function(translations_by_locale) {
  _$jscoverage['lib/tr8n.js'][1355]++;
for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {
    _$jscoverage['lib/tr8n.js'][1356]++;
for(var translation in translations_by_locale[locale]) {
      _$jscoverage['lib/tr8n.js'][1357]++;
this.addTranslation(translation);
    }
  }
};

_$jscoverage['lib/tr8n.js'][1362]++;
Tr8n.Application.prototype.translate = function(language, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1363]++;
if (Tr8n.config.isDisabled())
    {
_$jscoverage['lib/tr8n.js'][1364]++;
return this.substituteTokens(this.label, tokens, language, options);}



};

_$jscoverage['lib/tr8n.js'][1369]++;
Tr8n.Application.prototype.getDataTokens = function() {
  _$jscoverage['lib/tr8n.js'][1370]++;
if (!this.data_tokens) {
    _$jscoverage['lib/tr8n.js'][1371]++;
var tokenizer = new Tr8n.Tokenizers.Data(this.label);
    _$jscoverage['lib/tr8n.js'][1372]++;
this.data_tokens = tokenizer.tokens();
  }
  _$jscoverage['lib/tr8n.js'][1374]++;
return this.data_tokens;
};

_$jscoverage['lib/tr8n.js'][1377]++;
Tr8n.Application.prototype.getDataTokenNames = function() {
  _$jscoverage['lib/tr8n.js'][1378]++;
if (!this.data_token_names) {
    _$jscoverage['lib/tr8n.js'][1379]++;
this.data_token_names = [];
    _$jscoverage['lib/tr8n.js'][1380]++;
for (var token in this.getDataTokens())
      {
_$jscoverage['lib/tr8n.js'][1381]++;
this.data_token_names.push(token.full_name);}

  }
  _$jscoverage['lib/tr8n.js'][1383]++;
return this.data_token_names;
};

_$jscoverage['lib/tr8n.js'][1386]++;
Tr8n.Application.prototype.substituteTokens = function(label, tokens, language, options) {
  _$jscoverage['lib/tr8n.js'][1387]++;
if (label.indexOf('{') != -1) {
    _$jscoverage['lib/tr8n.js'][1388]++;
var tokenizer = new Tr8n.Tokenizers.Data(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.dataTokens()}));
    _$jscoverage['lib/tr8n.js'][1389]++;
label = tokenizer.substitute(language, options);
  }

  _$jscoverage['lib/tr8n.js'][1392]++;
if (label.indexOf('[') != -1) {
    _$jscoverage['lib/tr8n.js'][1393]++;
var tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.decorationTokens()}));
    _$jscoverage['lib/tr8n.js'][1394]++;
label = tokenizer.substitute();
  }
  _$jscoverage['lib/tr8n.js'][1396]++;
return label;
};

;
_$jscoverage['lib/tr8n.js'][1400]++;
Tr8n.Translation = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1401]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1404]++;
Tr8n.Translator = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1405]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1408]++;
Tr8n.Language = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1409]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1411]++;
this.contexts = {};
  _$jscoverage['lib/tr8n.js'][1412]++;
for(var key in Tr8n.Utils.keys(attrs.contexts || {})) {
    _$jscoverage['lib/tr8n.js'][1413]++;
this.contexts[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[key], {language: this}));
  }

  _$jscoverage['lib/tr8n.js'][1416]++;
this.cases = {};
  _$jscoverage['lib/tr8n.js'][1417]++;
for(key in Tr8n.Utils.keys(attrs.cases || {})) {
    _$jscoverage['lib/tr8n.js'][1418]++;
this.cases[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[key], {language: this}));
  }
};

_$jscoverage['lib/tr8n.js'][1422]++;
Tr8n.Language.prototype.getContextByKeyword = function(key) {
  _$jscoverage['lib/tr8n.js'][1423]++;
return this.contexts[key];
};

_$jscoverage['lib/tr8n.js'][1426]++;
Tr8n.Language.prototype.getContextByTokenName = function(token_name) {
  _$jscoverage['lib/tr8n.js'][1427]++;
for(var key in this.contexts) {
    _$jscoverage['lib/tr8n.js'][1428]++;
if (this.contexts[key].isAppliedToToken(token_name))
      {
_$jscoverage['lib/tr8n.js'][1429]++;
return this.contexts[key];}

  }

  _$jscoverage['lib/tr8n.js'][1432]++;
return null;
};

_$jscoverage['lib/tr8n.js'][1435]++;
Tr8n.Language.prototype.getLanguageCaseByKeyword = function(key) {
  _$jscoverage['lib/tr8n.js'][1436]++;
return this.cases[key];
};

_$jscoverage['lib/tr8n.js'][1439]++;
Tr8n.Language.prototype.translate = function(label, description, tokens, options) {




  _$jscoverage['lib/tr8n.js'][1444]++;
return label;
};


;
_$jscoverage['lib/tr8n.js'][1449]++;
Tr8n.LanguageCase = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1450]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1452]++;
this.rules = [];
  _$jscoverage['lib/tr8n.js'][1453]++;
for(var rule in (attrs.rules || [])) {
    _$jscoverage['lib/tr8n.js'][1454]++;
this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(rule, {language_case: this})));
  }
};
;
_$jscoverage['lib/tr8n.js'][1458]++;
Tr8n.LanguageCaseRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1459]++;
Tr8n.Utils.extend(this, attrs);
};

_$jscoverage['lib/tr8n.js'][1462]++;
Tr8n.LanguageCaseRule.getConditionsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1463]++;
if (!this.conditions_expression)
    {
_$jscoverage['lib/tr8n.js'][1464]++;
this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();}

  _$jscoverage['lib/tr8n.js'][1465]++;
return this.conditions_expression;
};

_$jscoverage['lib/tr8n.js'][1468]++;
Tr8n.LanguageCaseRule.getOperationsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1469]++;
if (!this.operations_expression)
    {
_$jscoverage['lib/tr8n.js'][1470]++;
this.operations_expression = (new Tr8n.RulesEngine.Parser(this.operations)).parse();}

  _$jscoverage['lib/tr8n.js'][1471]++;
return this.operations_expression;
};

_$jscoverage['lib/tr8n.js'][1474]++;
Tr8n.LanguageCaseRule.getGenderVariables = function(object) {
  _$jscoverage['lib/tr8n.js'][1475]++;
if (object == null)
    {
_$jscoverage['lib/tr8n.js'][1476]++;
return {gender: 'unknown'};}


  _$jscoverage['lib/tr8n.js'][1478]++;
if (this.conditions.indexOf("@gender") == -1)
    {
_$jscoverage['lib/tr8n.js'][1479]++;
return {};}


  _$jscoverage['lib/tr8n.js'][1481]++;
var context = this.language_case.language.getContextByKeyword("gender");

  _$jscoverage['lib/tr8n.js'][1483]++;
if (context == null)
    {
_$jscoverage['lib/tr8n.js'][1484]++;
return {gender: 'unknown'};}


  _$jscoverage['lib/tr8n.js'][1486]++;
return context.vars(object);
};

_$jscoverage['lib/tr8n.js'][1489]++;
Tr8n.LanguageCaseRule.evaluate = function(value, object) {
  _$jscoverage['lib/tr8n.js'][1490]++;
if (this.attrs.conditions == null)
    {
_$jscoverage['lib/tr8n.js'][1491]++;
return false;}


  _$jscoverage['lib/tr8n.js'][1493]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1494]++;
evaluator.setVars(Tr8n.Utils.extend({value: value}, this.getGenderVariables(object)));

  _$jscoverage['lib/tr8n.js'][1496]++;
return evaluator.evaluate(this.getConditionsExpression());
};

_$jscoverage['lib/tr8n.js'][1499]++;
Tr8n.LanguageCaseRule.apply = function(value) {
  _$jscoverage['lib/tr8n.js'][1500]++;
if (this.attrs.operations == null)
    {
_$jscoverage['lib/tr8n.js'][1501]++;
return value;}


  _$jscoverage['lib/tr8n.js'][1503]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1504]++;
evaluator.setVars({value: value});

  _$jscoverage['lib/tr8n.js'][1506]++;
return evaluator.evaluate(this.getOperationsExpression());
};


;
_$jscoverage['lib/tr8n.js'][1511]++;
Tr8n.LanguageContext = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1512]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1514]++;
this.rules = {};
  _$jscoverage['lib/tr8n.js'][1515]++;
for(var key in Tr8n.Utils.keys(attrs.rules || {})) {
    _$jscoverage['lib/tr8n.js'][1516]++;
rules[key] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.rules[key], {language: this}));
  }

};

_$jscoverage['lib/tr8n.js'][1521]++;
Tr8n.LanguageContext.isAppliedToToken = function(token) {
  _$jscoverage['lib/tr8n.js'][1522]++;
return token.match(new RegExp(this.token_expression)) != null;
};

_$jscoverage['lib/tr8n.js'][1525]++;
Tr8n.LanguageContext.getFallbackRule = function() {
  _$jscoverage['lib/tr8n.js'][1526]++;
if (!this.fallback_rule) {
    _$jscoverage['lib/tr8n.js'][1527]++;
Object.keys(this.rules).forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1528]++;
if (this.rules[key].isFallback()) {
        _$jscoverage['lib/tr8n.js'][1529]++;
this.fallback_rule = rule;
      }
    }.bind(this));
  }
  _$jscoverage['lib/tr8n.js'][1533]++;
return this.fallback_rule;
};

_$jscoverage['lib/tr8n.js'][1536]++;
Tr8n.LanguageContext.getVars = function(obj) {
  _$jscoverage['lib/tr8n.js'][1537]++;
var vars = {};
  _$jscoverage['lib/tr8n.js'][1538]++;
var config = Tr8n.config.getContextRules(this.keyword);

  _$jscoverage['lib/tr8n.js'][1540]++;
this.variables.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][1541]++;
if (!config.variables || !config.variables[key]) {
      _$jscoverage['lib/tr8n.js'][1542]++;
vars[key] = obj;
    } else {
      _$jscoverage['lib/tr8n.js'][1544]++;
var method = config.variables[key];
      _$jscoverage['lib/tr8n.js'][1545]++;
if (typeof method === "string") {
        _$jscoverage['lib/tr8n.js'][1546]++;
if (obj.object) {
_$jscoverage['lib/tr8n.js'][1546]++;
obj = obj.object;}

        _$jscoverage['lib/tr8n.js'][1547]++;
vars[key] = obj[method];
      } else {
_$jscoverage['lib/tr8n.js'][1548]++;
if (typeof method === "function") {
        _$jscoverage['lib/tr8n.js'][1549]++;
vars[key] = method(obj);
      } else {
        _$jscoverage['lib/tr8n.js'][1551]++;
vars[key] = obj;
      }}

    }
  });

  _$jscoverage['lib/tr8n.js'][1556]++;
return vars;
};

_$jscoverage['lib/tr8n.js'][1559]++;
Tr8n.LanguageContext.findMatchingRule = function(obj) {
  _$jscoverage['lib/tr8n.js'][1560]++;
var token_vars = this.getVars(obj);

  _$jscoverage['lib/tr8n.js'][1562]++;
for (var key in Tr8n.Utils.keys(this.rules)) {
    _$jscoverage['lib/tr8n.js'][1563]++;
var rule = this.rules[key];
    _$jscoverage['lib/tr8n.js'][1564]++;
if (!rule.isFallback() && rule.evaluate(token_vars))
        {
_$jscoverage['lib/tr8n.js'][1565]++;
return rule;}

  }

  _$jscoverage['lib/tr8n.js'][1568]++;
return this.getFallbackRule();
};
;
_$jscoverage['lib/tr8n.js'][1571]++;
Tr8n.LanguageContextRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1572]++;
Tr8n.Utils.extend(this, attrs);
};

_$jscoverage['lib/tr8n.js'][1575]++;
Tr8n.LanguageContextRule.isFallback = function() {
  _$jscoverage['lib/tr8n.js'][1576]++;
return (this.keyword == "other");
};

_$jscoverage['lib/tr8n.js'][1579]++;
Tr8n.LanguageContextRule.getConditionsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1580]++;
if (!this.conditions_expression)
    {
_$jscoverage['lib/tr8n.js'][1581]++;
this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();}

  _$jscoverage['lib/tr8n.js'][1582]++;
return this.conditions_expression;
};

_$jscoverage['lib/tr8n.js'][1585]++;
Tr8n.LanguageContextRule.evaluate = function(vars) {
  _$jscoverage['lib/tr8n.js'][1586]++;
if (this.isFallback()) {
_$jscoverage['lib/tr8n.js'][1586]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1588]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1589]++;
evaluator.setVars(vars || {});

  _$jscoverage['lib/tr8n.js'][1591]++;
return evaluator.evaluate(this.getConditionsExpression())
};

;
_$jscoverage['lib/tr8n.js'][1595]++;
var program = require('commander');
_$jscoverage['lib/tr8n.js'][1596]++;
var fs = require("fs");

_$jscoverage['lib/tr8n.js'][1598]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


_$jscoverage['lib/tr8n.js'][1606]++;
Tr8n.config = new Tr8n.Configuration();

_$jscoverage['lib/tr8n.js'][1608]++;
fs.readFile("./../config/languages/en-US.json", function (err, data) {
  _$jscoverage['lib/tr8n.js'][1609]++;
if (err) {
_$jscoverage['lib/tr8n.js'][1609]++;
throw err;}

  _$jscoverage['lib/tr8n.js'][1610]++;
Tr8n.config.currentLanguage = new Tr8n.Language(JSON.parse(data));
});



_$jscoverage['lib/tr8n.js'][1615]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][1616]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][1617]++;
exports.Tokens = Tr8n.Tokens;
_$jscoverage['lib/tr8n.js'][1618]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][1619]++;
exports.Utils = Tr8n.Utils;
_$jscoverage['lib/tr8n.js'][1620]++;
exports.Language = Tr8n.Language;
_$jscoverage['lib/tr8n.js'][1621]++;
exports.Application = Tr8n.Application;


_$jscoverage['lib/tr8n.js'][1624]++;
exports.configure = function(callback) {
  _$jscoverage['lib/tr8n.js'][1625]++;
callback(Tr8n.config);
};

_$jscoverage['lib/tr8n.js'][1628]++;
exports.tr = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1629]++;
return label;
};
