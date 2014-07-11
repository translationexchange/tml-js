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
'};;',
'Tr8n.Configuration = function() {',
'  this.initDefaultTokens();',
'  this.initTranslatorOptions();',
'  this.initContextRules();',
'  this.currentLanguage = new Tr8n.Language({});',
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
'Tr8n.Configuration.prototype.initContextRules = function() {',
'  this.contextRules = {',
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
'};;',
'Tr8n.Tokens.Data = function(name, label) {',
'  this.fullName = name;',
'  this.label = label;',
'  this.parseElements();',
'};',
'',
'Tr8n.Tokens.Data.prototype.parseElements = function() {',
'  var nameWithoutParens = this.fullName.substring(1, this.fullName.length-1);',
'  var nameWithoutCaseKeys = nameWithoutParens.split(\'::\')[0].trim();',
'',
'  this.shortName = nameWithoutParens.split(\':\')[0].trim();',
'  this.caseKeys = [];',
'  (nameWithoutParens.match(/(::\\s*\\w+)/g) || []).forEach(function(key) {',
'    this.caseKeys.push(key.replace(/[:]/g, "").trim());',
'  }.bind(this));',
'  this.contextKeys = [];',
'  (nameWithoutCaseKeys.match(/(:\\s*\\w+)/g) || []).forEach(function(key) {',
'    this.contextKeys.push(key.replace(/[:]/g, "").trim());',
'  }.bind(this));',
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
'',
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
';;',
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
'Tr8n.Application = function(attrs) {',
'  this.attrs = attrs;',
'};',
'',
'Tr8n.Application.prototype.language = function(locale) {',
'  return null;',
'};;',
'Tr8n.Source = function(attrs) {',
'  this.attrs = attrs;',
'};',
';',
'Tr8n.TranslationKey = function(attrs) {',
'  this.attrs = attrs;',
'};',
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
'  this.attrs = attrs;',
'',
'  this.contexts = [];',
'  if (attrs.contexts) {',
'    Object.keys(attrs.contexts).forEach(function(key) {',
'      this.contexts.push(new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[key], {language: this})));',
'    }.bind(this));',
'  }',
'',
'  this.cases = [];',
'  if (attrs.cases) {',
'    Object.keys(attrs.cases).forEach(function(key) {',
'      this.cases.push(new Tr8n.LanguageCase(Tr8n.Utils.extend(attrs.cases[key], {language: this})));',
'    }.bind(this));',
'  }',
'};',
'',
'Tr8n.Language.prototype.translate = function(label, description, tokens, options) {',
'  return label;',
'};',
';',
'Tr8n.LanguageCase = function(attrs) {',
'  this.attrs = attrs;',
'',
'  this.rules = [];',
'  if (attrs.rules) {',
'    attrs.rules.forEach(function(rule) {',
'      this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(rule, {languageCase: this})));',
'    }.bind(this));',
'  }',
'};',
';',
'Tr8n.LanguageCaseRule = function(attrs) {',
'  this.attrs = attrs;',
'};',
'',
'Tr8n.LanguageCaseRule.conditionsExpression = function() {',
'  if (!this.attrs.conditions_expression)',
'    this.attrs.conditions_expression = (new Tr8n.RulesEngine.Parser(this.attrs.conditions)).parse();',
'  return this.attrs.conditions_expression;',
'};',
'',
'Tr8n.LanguageCaseRule.operationsExpression = function() {',
'  if (!this.attrs.operations_expression)',
'    this.attrs.operations_expression = (new Tr8n.RulesEngine.Parser(this.attrs.operations)).parse();',
'  return this.attrs.operations_expression;',
'};',
'',
'Tr8n.LanguageCaseRule.genderVariables = function(object) {',
'  if (object == null)',
'    return {gender: \'unknown\'};',
'',
'  if (this.attrs.conditions.indexOf("@gender") == -1)',
'    return {};',
'',
'  var context = this.languageCase.language.contextByKeyword("gender");',
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
'  evaluator.setVars(Tr8n.Utils.extend({value: value}, this.genderVariables(object)));',
'',
'  return evaluator.evaluate(this.conditionsExpression());',
'};',
'',
'Tr8n.LanguageCaseRule.apply = function(value) {',
'  if (this.attrs.operations == null)',
'    return value;',
'',
'  var evaluator = new Tr8n.RulesEngine.Evaluator();',
'  evaluator.setVars({value: value});',
'',
'  return evaluator.evaluate(this.operationsExpression());',
'};',
'',
'',
';',
'Tr8n.LanguageContext = function(attrs) {',
'  this.attrs = attrs;',
'',
'  this.rules = [];',
'  if (attrs.rules) {',
'    Object.keys(attrs.cases).forEach(function(key) {',
'      this.cases.push(new Tr8n.LanguageContextRule(Tr8n.Utils.extend(attrs.rules[key], {languageContext: this})));',
'    }.bind(this));',
'  }',
'};',
'',
'Tr8n.LanguageContext.isAppliedToToken = function(token) {',
'  return token.match(new RegExp(this.attrs.token_expression)) != null;',
'};',
'',
'Tr8n.LanguageContext.fallbackRule = function() {',
'  if (!this.fallbackRule) {',
'    Object.keys(this.rules).forEach(function(key) {',
'      if (this.rules[key].isFallback()) {',
'        this.fallbackRule = rule;',
'      }',
'    }.bind(this));',
'  }',
'  return this.fallbackRule;',
'};',
'',
'Tr8n.LanguageContext.vars = function(obj) {',
'  var vars = {};',
'  var config = Tr8n.config.contextRules[this.attrs.keyword] || {};',
'',
'  this.attrs.variables.forEach(function(key) {',
'    if (!config["variables"] || !config["variables"][key]) {',
'      vars[key] = obj;',
'    } else {',
'      var method = config["variables"][key];',
'      if (typeof method === "string") {',
'        if (obj["object"]) obj = obj["object"];',
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
'  var tokenVars = this.vars(obj);',
'',
'  for (var key in Object.keys(this.rules)) {',
'    var rule = this.rules[key];',
'    if (!rule.isFallback() && rule.evaluate(tokenVars))',
'        return rule;',
'  }',
'',
'  return this.fallbackRule();',
'};',
';',
'Tr8n.LanguageContextRule = function(attrs) {',
'  this.attrs = attrs;',
'};',
'',
'Tr8n.LanguageContextRule.isFallback = function() {',
'  return (this.attrs.keyword == "other");',
'};',
'',
'Tr8n.LanguageContextRule.conditionsExpression = function() {',
'  if (!this.attrs.conditions_expression)',
'    this.attrs.conditions_expression = (new Tr8n.RulesEngine.Parser(this.attrs.conditions)).parse();',
'  return this.attrs.conditions_expression;',
'};',
'',
'Tr8n.LanguageContextRule.evaluate = function(vars) {',
'  if (this.isFallback()) return true;',
'',
'  var evaluator = new Tr8n.RulesEngine.Evaluator();',
'  evaluator.setVars(vars || {});',
'',
'  return evaluator.evaluate(this.conditionsExpression())',
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
'fs.readFile("./../config/languages/en-US.json", function (err, data) {',
'  if (err) throw err;',
'  Tr8n.config.currentLanguage = new Tr8n.Language(data);',
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
_$jscoverage['lib/tr8n.js'][775]=0;
_$jscoverage['lib/tr8n.js'][5]=0;
_$jscoverage['lib/tr8n.js'][4]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][772]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][9]=0;
_$jscoverage['lib/tr8n.js'][10]=0;
_$jscoverage['lib/tr8n.js'][8]=0;
_$jscoverage['lib/tr8n.js'][783]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][782]=0;
_$jscoverage['lib/tr8n.js'][18]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][788]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][20]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][25]=0;
_$jscoverage['lib/tr8n.js'][790]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][799]=0;
_$jscoverage['lib/tr8n.js'][50]=0;
_$jscoverage['lib/tr8n.js'][49]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][46]=0;
_$jscoverage['lib/tr8n.js'][44]=0;
_$jscoverage['lib/tr8n.js'][804]=0;
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
_$jscoverage['lib/tr8n.js'][812]=0;
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
_$jscoverage['lib/tr8n.js'][827]=0;
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
_$jscoverage['lib/tr8n.js'][836]=0;
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
_$jscoverage['lib/tr8n.js'][844]=0;
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
_$jscoverage['lib/tr8n.js'][857]=0;
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
_$jscoverage['lib/tr8n.js'][864]=0;
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
_$jscoverage['lib/tr8n.js'][880]=0;
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
_$jscoverage['lib/tr8n.js'][895]=0;
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
_$jscoverage['lib/tr8n.js'][907]=0;
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
_$jscoverage['lib/tr8n.js'][919]=0;
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
_$jscoverage['lib/tr8n.js'][934]=0;
_$jscoverage['lib/tr8n.js'][342]=0;
_$jscoverage['lib/tr8n.js'][338]=0;
_$jscoverage['lib/tr8n.js'][257]=0;
_$jscoverage['lib/tr8n.js'][260]=0;
_$jscoverage['lib/tr8n.js'][261]=0;
_$jscoverage['lib/tr8n.js'][262]=0;
_$jscoverage['lib/tr8n.js'][263]=0;
_$jscoverage['lib/tr8n.js'][259]=0;
_$jscoverage['lib/tr8n.js'][267]=0;
_$jscoverage['lib/tr8n.js'][266]=0;
_$jscoverage['lib/tr8n.js'][333]=0;
_$jscoverage['lib/tr8n.js'][333]=0;
_$jscoverage['lib/tr8n.js'][334]=0;
_$jscoverage['lib/tr8n.js'][334]=0;
_$jscoverage['lib/tr8n.js'][335]=0;
_$jscoverage['lib/tr8n.js'][332]=0;
_$jscoverage['lib/tr8n.js'][339]=0;
_$jscoverage['lib/tr8n.js'][339]=0;
_$jscoverage['lib/tr8n.js'][340]=0;
_$jscoverage['lib/tr8n.js'][341]=0;
_$jscoverage['lib/tr8n.js'][950]=0;
_$jscoverage['lib/tr8n.js'][421]=0;
_$jscoverage['lib/tr8n.js'][410]=0;
_$jscoverage['lib/tr8n.js'][420]=0;
_$jscoverage['lib/tr8n.js'][346]=0;
_$jscoverage['lib/tr8n.js'][345]=0;
_$jscoverage['lib/tr8n.js'][388]=0;
_$jscoverage['lib/tr8n.js'][390]=0;
_$jscoverage['lib/tr8n.js'][389]=0;
_$jscoverage['lib/tr8n.js'][392]=0;
_$jscoverage['lib/tr8n.js'][376]=0;
_$jscoverage['lib/tr8n.js'][375]=0;
_$jscoverage['lib/tr8n.js'][405]=0;
_$jscoverage['lib/tr8n.js'][406]=0;
_$jscoverage['lib/tr8n.js'][407]=0;
_$jscoverage['lib/tr8n.js'][404]=0;
_$jscoverage['lib/tr8n.js'][411]=0;
_$jscoverage['lib/tr8n.js'][412]=0;
_$jscoverage['lib/tr8n.js'][414]=0;
_$jscoverage['lib/tr8n.js'][415]=0;
_$jscoverage['lib/tr8n.js'][417]=0;
_$jscoverage['lib/tr8n.js'][416]=0;
_$jscoverage['lib/tr8n.js'][419]=0;
_$jscoverage['lib/tr8n.js'][970]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][427]=0;
_$jscoverage['lib/tr8n.js'][426]=0;
_$jscoverage['lib/tr8n.js'][429]=0;
_$jscoverage['lib/tr8n.js'][425]=0;
_$jscoverage['lib/tr8n.js'][433]=0;
_$jscoverage['lib/tr8n.js'][433]=0;
_$jscoverage['lib/tr8n.js'][448]=0;
_$jscoverage['lib/tr8n.js'][435]=0;
_$jscoverage['lib/tr8n.js'][437]=0;
_$jscoverage['lib/tr8n.js'][436]=0;
_$jscoverage['lib/tr8n.js'][439]=0;
_$jscoverage['lib/tr8n.js'][432]=0;
_$jscoverage['lib/tr8n.js'][443]=0;
_$jscoverage['lib/tr8n.js'][444]=0;
_$jscoverage['lib/tr8n.js'][442]=0;
_$jscoverage['lib/tr8n.js'][449]=0;
_$jscoverage['lib/tr8n.js'][451]=0;
_$jscoverage['lib/tr8n.js'][450]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][454]=0;
_$jscoverage['lib/tr8n.js'][965]=0;
_$jscoverage['lib/tr8n.js'][504]=0;
_$jscoverage['lib/tr8n.js'][460]=0;
_$jscoverage['lib/tr8n.js'][459]=0;
_$jscoverage['lib/tr8n.js'][463]=0;
_$jscoverage['lib/tr8n.js'][462]=0;
_$jscoverage['lib/tr8n.js'][466]=0;
_$jscoverage['lib/tr8n.js'][465]=0;
_$jscoverage['lib/tr8n.js'][468]=0;
_$jscoverage['lib/tr8n.js'][474]=0;
_$jscoverage['lib/tr8n.js'][475]=0;
_$jscoverage['lib/tr8n.js'][476]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][481]=0;
_$jscoverage['lib/tr8n.js'][480]=0;
_$jscoverage['lib/tr8n.js'][483]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][485]=0;
_$jscoverage['lib/tr8n.js'][488]=0;
_$jscoverage['lib/tr8n.js'][473]=0;
_$jscoverage['lib/tr8n.js'][494]=0;
_$jscoverage['lib/tr8n.js'][457]=0;
_$jscoverage['lib/tr8n.js'][493]=0;
_$jscoverage['lib/tr8n.js'][1003]=0;
_$jscoverage['lib/tr8n.js'][540]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][515]=0;
_$jscoverage['lib/tr8n.js'][514]=0;
_$jscoverage['lib/tr8n.js'][524]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][508]=0;
_$jscoverage['lib/tr8n.js'][507]=0;
_$jscoverage['lib/tr8n.js'][511]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][513]=0;
_$jscoverage['lib/tr8n.js'][516]=0;
_$jscoverage['lib/tr8n.js'][519]=0;
_$jscoverage['lib/tr8n.js'][521]=0;
_$jscoverage['lib/tr8n.js'][523]=0;
_$jscoverage['lib/tr8n.js'][520]=0;
_$jscoverage['lib/tr8n.js'][518]=0;
_$jscoverage['lib/tr8n.js'][525]=0;
_$jscoverage['lib/tr8n.js'][526]=0;
_$jscoverage['lib/tr8n.js'][529]=0;
_$jscoverage['lib/tr8n.js'][528]=0;
_$jscoverage['lib/tr8n.js'][532]=0;
_$jscoverage['lib/tr8n.js'][531]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][537]=0;
_$jscoverage['lib/tr8n.js'][539]=0;
_$jscoverage['lib/tr8n.js'][536]=0;
_$jscoverage['lib/tr8n.js'][1002]=0;
_$jscoverage['lib/tr8n.js'][581]=0;
_$jscoverage['lib/tr8n.js'][546]=0;
_$jscoverage['lib/tr8n.js'][545]=0;
_$jscoverage['lib/tr8n.js'][549]=0;
_$jscoverage['lib/tr8n.js'][548]=0;
_$jscoverage['lib/tr8n.js'][551]=0;
_$jscoverage['lib/tr8n.js'][554]=0;
_$jscoverage['lib/tr8n.js'][555]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][541]=0;
_$jscoverage['lib/tr8n.js'][559]=0;
_$jscoverage['lib/tr8n.js'][561]=0;
_$jscoverage['lib/tr8n.js'][562]=0;
_$jscoverage['lib/tr8n.js'][565]=0;
_$jscoverage['lib/tr8n.js'][567]=0;
_$jscoverage['lib/tr8n.js'][566]=0;
_$jscoverage['lib/tr8n.js'][568]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][571]=0;
_$jscoverage['lib/tr8n.js'][573]=0;
_$jscoverage['lib/tr8n.js'][574]=0;
_$jscoverage['lib/tr8n.js'][577]=0;
_$jscoverage['lib/tr8n.js'][579]=0;
_$jscoverage['lib/tr8n.js'][576]=0;
_$jscoverage['lib/tr8n.js'][1042]=0;
_$jscoverage['lib/tr8n.js'][623]=0;
_$jscoverage['lib/tr8n.js'][623]=0;
_$jscoverage['lib/tr8n.js'][621]=0;
_$jscoverage['lib/tr8n.js'][583]=0;
_$jscoverage['lib/tr8n.js'][584]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][586]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][590]=0;
_$jscoverage['lib/tr8n.js'][591]=0;
_$jscoverage['lib/tr8n.js'][588]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][595]=0;
_$jscoverage['lib/tr8n.js'][599]=0;
_$jscoverage['lib/tr8n.js'][600]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][605]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][608]=0;
_$jscoverage['lib/tr8n.js'][607]=0;
_$jscoverage['lib/tr8n.js'][611]=0;
_$jscoverage['lib/tr8n.js'][610]=0;
_$jscoverage['lib/tr8n.js'][615]=0;
_$jscoverage['lib/tr8n.js'][614]=0;
_$jscoverage['lib/tr8n.js'][618]=0;
_$jscoverage['lib/tr8n.js'][598]=0;
_$jscoverage['lib/tr8n.js'][622]=0;
_$jscoverage['lib/tr8n.js'][1063]=0;
_$jscoverage['lib/tr8n.js'][665]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][628]=0;
_$jscoverage['lib/tr8n.js'][631]=0;
_$jscoverage['lib/tr8n.js'][630]=0;
_$jscoverage['lib/tr8n.js'][635]=0;
_$jscoverage['lib/tr8n.js'][637]=0;
_$jscoverage['lib/tr8n.js'][636]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][641]=0;
_$jscoverage['lib/tr8n.js'][627]=0;
_$jscoverage['lib/tr8n.js'][645]=0;
_$jscoverage['lib/tr8n.js'][646]=0;
_$jscoverage['lib/tr8n.js'][644]=0;
_$jscoverage['lib/tr8n.js'][649]=0;
_$jscoverage['lib/tr8n.js'][656]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][659]=0;
_$jscoverage['lib/tr8n.js'][660]=0;
_$jscoverage['lib/tr8n.js'][661]=0;
_$jscoverage['lib/tr8n.js'][661]=0;
_$jscoverage['lib/tr8n.js'][657]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][655]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][663]=0;
_$jscoverage['lib/tr8n.js'][664]=0;
_$jscoverage['lib/tr8n.js'][1086]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][667]=0;
_$jscoverage['lib/tr8n.js'][667]=0;
_$jscoverage['lib/tr8n.js'][669]=0;
_$jscoverage['lib/tr8n.js'][670]=0;
_$jscoverage['lib/tr8n.js'][671]=0;
_$jscoverage['lib/tr8n.js'][672]=0;
_$jscoverage['lib/tr8n.js'][673]=0;
_$jscoverage['lib/tr8n.js'][697]=0;
_$jscoverage['lib/tr8n.js'][674]=0;
_$jscoverage['lib/tr8n.js'][675]=0;
_$jscoverage['lib/tr8n.js'][676]=0;
_$jscoverage['lib/tr8n.js'][677]=0;
_$jscoverage['lib/tr8n.js'][678]=0;
_$jscoverage['lib/tr8n.js'][681]=0;
_$jscoverage['lib/tr8n.js'][681]=0;
_$jscoverage['lib/tr8n.js'][680]=0;
_$jscoverage['lib/tr8n.js'][683]=0;
_$jscoverage['lib/tr8n.js'][685]=0;
_$jscoverage['lib/tr8n.js'][688]=0;
_$jscoverage['lib/tr8n.js'][688]=0;
_$jscoverage['lib/tr8n.js'][687]=0;
_$jscoverage['lib/tr8n.js'][690]=0;
_$jscoverage['lib/tr8n.js'][692]=0;
_$jscoverage['lib/tr8n.js'][694]=0;
_$jscoverage['lib/tr8n.js'][699]=0;
_$jscoverage['lib/tr8n.js'][704]=0;
_$jscoverage['lib/tr8n.js'][703]=0;
_$jscoverage['lib/tr8n.js'][1112]=0;
_$jscoverage['lib/tr8n.js'][755]=0;
_$jscoverage['lib/tr8n.js'][711]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][754]=0;
_$jscoverage['lib/tr8n.js'][714]=0;
_$jscoverage['lib/tr8n.js'][715]=0;
_$jscoverage['lib/tr8n.js'][719]=0;
_$jscoverage['lib/tr8n.js'][718]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][723]=0;
_$jscoverage['lib/tr8n.js'][731]=0;
_$jscoverage['lib/tr8n.js'][728]=0;
_$jscoverage['lib/tr8n.js'][750]=0;
_$jscoverage['lib/tr8n.js'][727]=0;
_$jscoverage['lib/tr8n.js'][749]=0;
_$jscoverage['lib/tr8n.js'][733]=0;
_$jscoverage['lib/tr8n.js'][737]=0;
_$jscoverage['lib/tr8n.js'][747]=0;
_$jscoverage['lib/tr8n.js'][748]=0;
_$jscoverage['lib/tr8n.js'][738]=0;
_$jscoverage['lib/tr8n.js'][738]=0;
_$jscoverage['lib/tr8n.js'][739]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][739]=0;
_$jscoverage['lib/tr8n.js'][740]=0;
_$jscoverage['lib/tr8n.js'][740]=0;
_$jscoverage['lib/tr8n.js'][742]=0;
_$jscoverage['lib/tr8n.js'][741]=0;
_$jscoverage['lib/tr8n.js'][741]=0;
_$jscoverage['lib/tr8n.js'][1136]=0;
_$jscoverage['lib/tr8n.js'][802]=0;
_$jscoverage['lib/tr8n.js'][801]=0;
_$jscoverage['lib/tr8n.js'][756]=0;
_$jscoverage['lib/tr8n.js'][757]=0;
_$jscoverage['lib/tr8n.js'][758]=0;
_$jscoverage['lib/tr8n.js'][762]=0;
_$jscoverage['lib/tr8n.js'][761]=0;
_$jscoverage['lib/tr8n.js'][800]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][771]=0;
_$jscoverage['lib/tr8n.js'][773]=0;
_$jscoverage['lib/tr8n.js'][776]=0;
_$jscoverage['lib/tr8n.js'][774]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][783]=0;
_$jscoverage['lib/tr8n.js'][784]=0;
_$jscoverage['lib/tr8n.js'][789]=0;
_$jscoverage['lib/tr8n.js'][792]=0;
_$jscoverage['lib/tr8n.js'][791]=0;
_$jscoverage['lib/tr8n.js'][787]=0;
_$jscoverage['lib/tr8n.js'][795]=0;
_$jscoverage['lib/tr8n.js'][1139]=0;
_$jscoverage['lib/tr8n.js'][835]=0;
_$jscoverage['lib/tr8n.js'][803]=0;
_$jscoverage['lib/tr8n.js'][805]=0;
_$jscoverage['lib/tr8n.js'][806]=0;
_$jscoverage['lib/tr8n.js'][809]=0;
_$jscoverage['lib/tr8n.js'][810]=0;
_$jscoverage['lib/tr8n.js'][811]=0;
_$jscoverage['lib/tr8n.js'][813]=0;
_$jscoverage['lib/tr8n.js'][814]=0;
_$jscoverage['lib/tr8n.js'][808]=0;
_$jscoverage['lib/tr8n.js'][818]=0;
_$jscoverage['lib/tr8n.js'][826]=0;
_$jscoverage['lib/tr8n.js'][817]=0;
_$jscoverage['lib/tr8n.js'][831]=0;
_$jscoverage['lib/tr8n.js'][831]=0;
_$jscoverage['lib/tr8n.js'][832]=0;
_$jscoverage['lib/tr8n.js'][830]=0;
_$jscoverage['lib/tr8n.js'][1160]=0;
_$jscoverage['lib/tr8n.js'][866]=0;
_$jscoverage['lib/tr8n.js'][856]=0;
_$jscoverage['lib/tr8n.js'][854]=0;
_$jscoverage['lib/tr8n.js'][865]=0;
_$jscoverage['lib/tr8n.js'][841]=0;
_$jscoverage['lib/tr8n.js'][849]=0;
_$jscoverage['lib/tr8n.js'][843]=0;
_$jscoverage['lib/tr8n.js'][842]=0;
_$jscoverage['lib/tr8n.js'][845]=0;
_$jscoverage['lib/tr8n.js'][837]=0;
_$jscoverage['lib/tr8n.js'][862]=0;
_$jscoverage['lib/tr8n.js'][846]=0;
_$jscoverage['lib/tr8n.js'][840]=0;
_$jscoverage['lib/tr8n.js'][850]=0;
_$jscoverage['lib/tr8n.js'][852]=0;
_$jscoverage['lib/tr8n.js'][851]=0;
_$jscoverage['lib/tr8n.js'][855]=0;
_$jscoverage['lib/tr8n.js'][836]=0;
_$jscoverage['lib/tr8n.js'][859]=0;
_$jscoverage['lib/tr8n.js'][858]=0;
_$jscoverage['lib/tr8n.js'][860]=0;
_$jscoverage['lib/tr8n.js'][1182]=0;
_$jscoverage['lib/tr8n.js'][896]=0;
_$jscoverage['lib/tr8n.js'][870]=0;
_$jscoverage['lib/tr8n.js'][871]=0;
_$jscoverage['lib/tr8n.js'][875]=0;
_$jscoverage['lib/tr8n.js'][874]=0;
_$jscoverage['lib/tr8n.js'][879]=0;
_$jscoverage['lib/tr8n.js'][896]=0;
_$jscoverage['lib/tr8n.js'][880]=0;
_$jscoverage['lib/tr8n.js'][882]=0;
_$jscoverage['lib/tr8n.js'][883]=0;
_$jscoverage['lib/tr8n.js'][894]=0;
_$jscoverage['lib/tr8n.js'][887]=0;
_$jscoverage['lib/tr8n.js'][886]=0;
_$jscoverage['lib/tr8n.js'][895]=0;
_$jscoverage['lib/tr8n.js'][885]=0;
_$jscoverage['lib/tr8n.js'][891]=0;
_$jscoverage['lib/tr8n.js'][878]=0;
_$jscoverage['lib/tr8n.js'][1196]=0;
_$jscoverage['lib/tr8n.js'][924]=0;
_$jscoverage['lib/tr8n.js'][923]=0;
_$jscoverage['lib/tr8n.js'][916]=0;
_$jscoverage['lib/tr8n.js'][898]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][901]=0;
_$jscoverage['lib/tr8n.js'][922]=0;
_$jscoverage['lib/tr8n.js'][905]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][908]=0;
_$jscoverage['lib/tr8n.js'][910]=0;
_$jscoverage['lib/tr8n.js'][900]=0;
_$jscoverage['lib/tr8n.js'][913]=0;
_$jscoverage['lib/tr8n.js'][917]=0;
_$jscoverage['lib/tr8n.js'][917]=0;
_$jscoverage['lib/tr8n.js'][920]=0;
_$jscoverage['lib/tr8n.js'][921]=0;
_$jscoverage['lib/tr8n.js'][1210]=0;
_$jscoverage['lib/tr8n.js'][952]=0;
_$jscoverage['lib/tr8n.js'][949]=0;
_$jscoverage['lib/tr8n.js'][926]=0;
_$jscoverage['lib/tr8n.js'][930]=0;
_$jscoverage['lib/tr8n.js'][929]=0;
_$jscoverage['lib/tr8n.js'][933]=0;
_$jscoverage['lib/tr8n.js'][935]=0;
_$jscoverage['lib/tr8n.js'][938]=0;
_$jscoverage['lib/tr8n.js'][939]=0;
_$jscoverage['lib/tr8n.js'][940]=0;
_$jscoverage['lib/tr8n.js'][951]=0;
_$jscoverage['lib/tr8n.js'][941]=0;
_$jscoverage['lib/tr8n.js'][937]=0;
_$jscoverage['lib/tr8n.js'][945]=0;
_$jscoverage['lib/tr8n.js'][948]=0;
_$jscoverage['lib/tr8n.js'][944]=0;
_$jscoverage['lib/tr8n.js'][1221]=0;
_$jscoverage['lib/tr8n.js'][980]=0;
_$jscoverage['lib/tr8n.js'][977]=0;
_$jscoverage['lib/tr8n.js'][968]=0;
_$jscoverage['lib/tr8n.js'][967]=0;
_$jscoverage['lib/tr8n.js'][978]=0;
_$jscoverage['lib/tr8n.js'][961]=0;
_$jscoverage['lib/tr8n.js'][956]=0;
_$jscoverage['lib/tr8n.js'][955]=0;
_$jscoverage['lib/tr8n.js'][958]=0;
_$jscoverage['lib/tr8n.js'][976]=0;
_$jscoverage['lib/tr8n.js'][959]=0;
_$jscoverage['lib/tr8n.js'][962]=0;
_$jscoverage['lib/tr8n.js'][966]=0;
_$jscoverage['lib/tr8n.js'][967]=0;
_$jscoverage['lib/tr8n.js'][969]=0;
_$jscoverage['lib/tr8n.js'][968]=0;
_$jscoverage['lib/tr8n.js'][973]=0;
_$jscoverage['lib/tr8n.js'][971]=0;
_$jscoverage['lib/tr8n.js'][974]=0;
_$jscoverage['lib/tr8n.js'][1236]=0;
_$jscoverage['lib/tr8n.js'][1008]=0;
_$jscoverage['lib/tr8n.js'][983]=0;
_$jscoverage['lib/tr8n.js'][988]=0;
_$jscoverage['lib/tr8n.js'][987]=0;
_$jscoverage['lib/tr8n.js'][991]=0;
_$jscoverage['lib/tr8n.js'][996]=0;
_$jscoverage['lib/tr8n.js'][1006]=0;
_$jscoverage['lib/tr8n.js'][995]=0;
_$jscoverage['lib/tr8n.js'][998]=0;
_$jscoverage['lib/tr8n.js'][997]=0;
_$jscoverage['lib/tr8n.js'][1007]=0;
_$jscoverage['lib/tr8n.js'][999]=0;
_$jscoverage['lib/tr8n.js'][994]=0;
_$jscoverage['lib/tr8n.js'][1003]=0;
_$jscoverage['lib/tr8n.js'][1251]=0;
_$jscoverage['lib/tr8n.js'][1023]=0;
_$jscoverage['lib/tr8n.js'][1009]=0;
_$jscoverage['lib/tr8n.js'][1011]=0;
_$jscoverage['lib/tr8n.js'][1012]=0;
_$jscoverage['lib/tr8n.js'][1010]=0;
_$jscoverage['lib/tr8n.js'][1014]=0;
_$jscoverage['lib/tr8n.js'][1015]=0;
_$jscoverage['lib/tr8n.js'][1018]=0;
_$jscoverage['lib/tr8n.js'][1019]=0;
_$jscoverage['lib/tr8n.js'][1020]=0;
_$jscoverage['lib/tr8n.js'][1258]=0;
_$jscoverage['lib/tr8n.js'][1045]=0;
_$jscoverage['lib/tr8n.js'][1041]=0;
_$jscoverage['lib/tr8n.js'][1043]=0;
_$jscoverage['lib/tr8n.js'][1030]=0;
_$jscoverage['lib/tr8n.js'][1029]=0;
_$jscoverage['lib/tr8n.js'][1033]=0;
_$jscoverage['lib/tr8n.js'][1032]=0;
_$jscoverage['lib/tr8n.js'][1035]=0;
_$jscoverage['lib/tr8n.js'][1028]=0;
_$jscoverage['lib/tr8n.js'][1039]=0;
_$jscoverage['lib/tr8n.js'][1038]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1040]=0;
_$jscoverage['lib/tr8n.js'][1025]=0;
_$jscoverage['lib/tr8n.js'][1043]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1270]=0;
_$jscoverage['lib/tr8n.js'][1068]=0;
_$jscoverage['lib/tr8n.js'][1047]=0;
_$jscoverage['lib/tr8n.js'][1048]=0;
_$jscoverage['lib/tr8n.js'][1050]=0;
_$jscoverage['lib/tr8n.js'][1053]=0;
_$jscoverage['lib/tr8n.js'][1052]=0;
_$jscoverage['lib/tr8n.js'][1056]=0;
_$jscoverage['lib/tr8n.js'][1055]=0;
_$jscoverage['lib/tr8n.js'][1058]=0;
_$jscoverage['lib/tr8n.js'][1062]=0;
_$jscoverage['lib/tr8n.js'][1065]=0;
_$jscoverage['lib/tr8n.js'][1061]=0;
_$jscoverage['lib/tr8n.js'][1286]=0;
_$jscoverage['lib/tr8n.js'][1091]=0;
_$jscoverage['lib/tr8n.js'][1073]=0;
_$jscoverage['lib/tr8n.js'][1074]=0;
_$jscoverage['lib/tr8n.js'][1072]=0;
_$jscoverage['lib/tr8n.js'][1078]=0;
_$jscoverage['lib/tr8n.js'][1077]=0;
_$jscoverage['lib/tr8n.js'][1090]=0;
_$jscoverage['lib/tr8n.js'][1082]=0;
_$jscoverage['lib/tr8n.js'][1081]=0;
_$jscoverage['lib/tr8n.js'][1086]=0;
_$jscoverage['lib/tr8n.js'][1091]=0;
_$jscoverage['lib/tr8n.js'][1069]=0;
_$jscoverage['lib/tr8n.js'][1087]=0;
_$jscoverage['lib/tr8n.js'][1085]=0;
_$jscoverage['lib/tr8n.js'][1298]=0;
_$jscoverage['lib/tr8n.js'][1121]=0;
_$jscoverage['lib/tr8n.js'][1120]=0;
_$jscoverage['lib/tr8n.js'][1094]=0;
_$jscoverage['lib/tr8n.js'][1097]=0;
_$jscoverage['lib/tr8n.js'][1096]=0;
_$jscoverage['lib/tr8n.js'][1095]=0;
_$jscoverage['lib/tr8n.js'][1093]=0;
_$jscoverage['lib/tr8n.js'][1101]=0;
_$jscoverage['lib/tr8n.js'][1105]=0;
_$jscoverage['lib/tr8n.js'][1104]=0;
_$jscoverage['lib/tr8n.js'][1121]=0;
_$jscoverage['lib/tr8n.js'][1113]=0;
_$jscoverage['lib/tr8n.js'][1117]=0;
_$jscoverage['lib/tr8n.js'][1116]=0;
_$jscoverage['lib/tr8n.js'][1311]=0;
_$jscoverage['lib/tr8n.js'][1142]=0;
_$jscoverage['lib/tr8n.js'][1122]=0;
_$jscoverage['lib/tr8n.js'][1126]=0;
_$jscoverage['lib/tr8n.js'][1126]=0;
_$jscoverage['lib/tr8n.js'][1127]=0;
_$jscoverage['lib/tr8n.js'][1125]=0;
_$jscoverage['lib/tr8n.js'][1140]=0;
_$jscoverage['lib/tr8n.js'][1131]=0;
_$jscoverage['lib/tr8n.js'][1131]=0;
_$jscoverage['lib/tr8n.js'][1132]=0;
_$jscoverage['lib/tr8n.js'][1130]=0;
_$jscoverage['lib/tr8n.js'][1135]=0;
_$jscoverage['lib/tr8n.js'][1140]=0;
_$jscoverage['lib/tr8n.js'][1327]=0;
_$jscoverage['lib/tr8n.js'][1162]=0;
_$jscoverage['lib/tr8n.js'][1161]=0;
_$jscoverage['lib/tr8n.js'][1143]=0;
_$jscoverage['lib/tr8n.js'][1153]=0;
_$jscoverage['lib/tr8n.js'][1145]=0;
_$jscoverage['lib/tr8n.js'][1146]=0;
_$jscoverage['lib/tr8n.js'][1147]=0;
_$jscoverage['lib/tr8n.js'][1144]=0;
_$jscoverage['lib/tr8n.js'][1150]=0;
_$jscoverage['lib/tr8n.js'][1154]=0;
_$jscoverage['lib/tr8n.js'][1154]=0;
_$jscoverage['lib/tr8n.js'][1156]=0;
_$jscoverage['lib/tr8n.js'][1159]=0;
_$jscoverage['lib/tr8n.js'][1157]=0;
_$jscoverage['lib/tr8n.js'][1337]=0;
_$jscoverage['lib/tr8n.js'][1185]=0;
_$jscoverage['lib/tr8n.js'][1163]=0;
_$jscoverage['lib/tr8n.js'][1166]=0;
_$jscoverage['lib/tr8n.js'][1170]=0;
_$jscoverage['lib/tr8n.js'][1171]=0;
_$jscoverage['lib/tr8n.js'][1172]=0;
_$jscoverage['lib/tr8n.js'][1181]=0;
_$jscoverage['lib/tr8n.js'][1173]=0;
_$jscoverage['lib/tr8n.js'][1177]=0;
_$jscoverage['lib/tr8n.js'][1169]=0;
_$jscoverage['lib/tr8n.js'][1176]=0;
_$jscoverage['lib/tr8n.js'][1178]=0;
_$jscoverage['lib/tr8n.js'][1175]=0;
_$jscoverage['lib/tr8n.js'][1349]=0;
_$jscoverage['lib/tr8n.js'][1205]=0;
_$jscoverage['lib/tr8n.js'][1204]=0;
_$jscoverage['lib/tr8n.js'][1201]=0;
_$jscoverage['lib/tr8n.js'][1186]=0;
_$jscoverage['lib/tr8n.js'][1188]=0;
_$jscoverage['lib/tr8n.js'][1190]=0;
_$jscoverage['lib/tr8n.js'][1191]=0;
_$jscoverage['lib/tr8n.js'][1189]=0;
_$jscoverage['lib/tr8n.js'][1193]=0;
_$jscoverage['lib/tr8n.js'][1195]=0;
_$jscoverage['lib/tr8n.js'][1203]=0;
_$jscoverage['lib/tr8n.js'][1198]=0;
_$jscoverage['lib/tr8n.js'][1202]=0;
_$jscoverage['lib/tr8n.js'][1361]=0;
_$jscoverage['lib/tr8n.js'][1226]=0;
_$jscoverage['lib/tr8n.js'][1224]=0;
_$jscoverage['lib/tr8n.js'][1211]=0;
_$jscoverage['lib/tr8n.js'][1213]=0;
_$jscoverage['lib/tr8n.js'][1214]=0;
_$jscoverage['lib/tr8n.js'][1212]=0;
_$jscoverage['lib/tr8n.js'][1225]=0;
_$jscoverage['lib/tr8n.js'][1216]=0;
_$jscoverage['lib/tr8n.js'][1217]=0;
_$jscoverage['lib/tr8n.js'][1209]=0;
_$jscoverage['lib/tr8n.js'][1220]=0;
_$jscoverage['lib/tr8n.js'][1208]=0;
_$jscoverage['lib/tr8n.js'][1372]=0;
_$jscoverage['lib/tr8n.js'][1247]=0;
_$jscoverage['lib/tr8n.js'][1230]=0;
_$jscoverage['lib/tr8n.js'][1232]=0;
_$jscoverage['lib/tr8n.js'][1235]=0;
_$jscoverage['lib/tr8n.js'][1237]=0;
_$jscoverage['lib/tr8n.js'][1238]=0;
_$jscoverage['lib/tr8n.js'][1245]=0;
_$jscoverage['lib/tr8n.js'][1234]=0;
_$jscoverage['lib/tr8n.js'][1229]=0;
_$jscoverage['lib/tr8n.js'][1244]=0;
_$jscoverage['lib/tr8n.js'][1243]=0;
_$jscoverage['lib/tr8n.js'][1384]=0;
_$jscoverage['lib/tr8n.js'][1267]=0;
_$jscoverage['lib/tr8n.js'][1264]=0;
_$jscoverage['lib/tr8n.js'][1265]=0;
_$jscoverage['lib/tr8n.js'][1248]=0;
_$jscoverage['lib/tr8n.js'][1253]=0;
_$jscoverage['lib/tr8n.js'][1255]=0;
_$jscoverage['lib/tr8n.js'][1252]=0;
_$jscoverage['lib/tr8n.js'][1250]=0;
_$jscoverage['lib/tr8n.js'][1259]=0;
_$jscoverage['lib/tr8n.js'][1261]=0;
_$jscoverage['lib/tr8n.js'][1262]=0;
_$jscoverage['lib/tr8n.js'][1397]=0;
_$jscoverage['lib/tr8n.js'][1290]=0;
_$jscoverage['lib/tr8n.js'][1289]=0;
_$jscoverage['lib/tr8n.js'][1271]=0;
_$jscoverage['lib/tr8n.js'][1275]=0;
_$jscoverage['lib/tr8n.js'][1285]=0;
_$jscoverage['lib/tr8n.js'][1274]=0;
_$jscoverage['lib/tr8n.js'][1278]=0;
_$jscoverage['lib/tr8n.js'][1277]=0;
_$jscoverage['lib/tr8n.js'][1282]=0;
_$jscoverage['lib/tr8n.js'][1281]=0;
_$jscoverage['lib/tr8n.js'][1406]=0;
_$jscoverage['lib/tr8n.js'][1293]=0;
_$jscoverage['lib/tr8n.js'][1407]=0;
_$jscoverage['lib/tr8n.js'][1304]=0;
_$jscoverage['lib/tr8n.js'][1294]=0;
_$jscoverage['lib/tr8n.js'][1296]=0;
_$jscoverage['lib/tr8n.js'][1299]=0;
_$jscoverage['lib/tr8n.js'][1297]=0;
_$jscoverage['lib/tr8n.js'][1303]=0;
_$jscoverage['lib/tr8n.js'][1415]=0;
_$jscoverage['lib/tr8n.js'][1305]=0;
_$jscoverage['lib/tr8n.js'][1416]=0;
_$jscoverage['lib/tr8n.js'][1332]=0;
_$jscoverage['lib/tr8n.js'][1331]=0;
_$jscoverage['lib/tr8n.js'][1330]=0;
_$jscoverage['lib/tr8n.js'][1326]=0;
_$jscoverage['lib/tr8n.js'][1306]=0;
_$jscoverage['lib/tr8n.js'][1316]=0;
_$jscoverage['lib/tr8n.js'][1312]=0;
_$jscoverage['lib/tr8n.js'][1318]=0;
_$jscoverage['lib/tr8n.js'][1321]=0;
_$jscoverage['lib/tr8n.js'][1320]=0;
_$jscoverage['lib/tr8n.js'][1319]=0;
_$jscoverage['lib/tr8n.js'][1315]=0;
_$jscoverage['lib/tr8n.js'][1409]=0;
_$jscoverage['lib/tr8n.js'][1352]=0;
_$jscoverage['lib/tr8n.js'][1351]=0;
_$jscoverage['lib/tr8n.js'][1342]=0;
_$jscoverage['lib/tr8n.js'][1333]=0;
_$jscoverage['lib/tr8n.js'][1338]=0;
_$jscoverage['lib/tr8n.js'][1346]=0;
_$jscoverage['lib/tr8n.js'][1339]=0;
_$jscoverage['lib/tr8n.js'][1336]=0;
_$jscoverage['lib/tr8n.js'][1344]=0;
_$jscoverage['lib/tr8n.js'][1343]=0;
_$jscoverage['lib/tr8n.js'][1347]=0;
_$jscoverage['lib/tr8n.js'][1433]=0;
_$jscoverage['lib/tr8n.js'][1371]=0;
_$jscoverage['lib/tr8n.js'][1368]=0;
_$jscoverage['lib/tr8n.js'][1367]=0;
_$jscoverage['lib/tr8n.js'][1354]=0;
_$jscoverage['lib/tr8n.js'][1359]=0;
_$jscoverage['lib/tr8n.js'][1358]=0;
_$jscoverage['lib/tr8n.js'][1369]=0;
_$jscoverage['lib/tr8n.js'][1362]=0;
_$jscoverage['lib/tr8n.js'][1364]=0;
_$jscoverage['lib/tr8n.js'][1357]=0;
_$jscoverage['lib/tr8n.js'][1445]=0;
_$jscoverage['lib/tr8n.js'][1390]=0;
_$jscoverage['lib/tr8n.js'][1374]=0;
_$jscoverage['lib/tr8n.js'][1380]=0;
_$jscoverage['lib/tr8n.js'][1382]=0;
_$jscoverage['lib/tr8n.js'][1385]=0;
_$jscoverage['lib/tr8n.js'][1383]=0;
_$jscoverage['lib/tr8n.js'][1379]=0;
_$jscoverage['lib/tr8n.js'][1451]=0;
_$jscoverage['lib/tr8n.js'][1394]=0;
_$jscoverage['lib/tr8n.js'][1391]=0;
_$jscoverage['lib/tr8n.js'][1448]=0;
_$jscoverage['lib/tr8n.js'][1415]=0;
_$jscoverage['lib/tr8n.js'][1395]=0;
_$jscoverage['lib/tr8n.js'][1402]=0;
_$jscoverage['lib/tr8n.js'][1411]=0;
_$jscoverage['lib/tr8n.js'][1398]=0;
_$jscoverage['lib/tr8n.js'][1414]=0;
_$jscoverage['lib/tr8n.js'][1410]=0;
_$jscoverage['lib/tr8n.js'][1396]=0;
_$jscoverage['lib/tr8n.js'][1413]=0;
_$jscoverage['lib/tr8n.js'][1405]=0;
_$jscoverage['lib/tr8n.js'][1454]=0;
_$jscoverage['lib/tr8n.js'][1429]=0;
_$jscoverage['lib/tr8n.js'][1418]=0;
_$jscoverage['lib/tr8n.js'][1425]=0;
_$jscoverage['lib/tr8n.js'][1420]=0;
_$jscoverage['lib/tr8n.js'][1417]=0;
_$jscoverage['lib/tr8n.js'][1428]=0;
_$jscoverage['lib/tr8n.js'][1467]=0;
_$jscoverage['lib/tr8n.js'][1441]=0;
_$jscoverage['lib/tr8n.js'][1437]=0;
_$jscoverage['lib/tr8n.js'][1440]=0;
_$jscoverage['lib/tr8n.js'][1432]=0;
_$jscoverage['lib/tr8n.js'][1434]=0;
_$jscoverage['lib/tr8n.js'][1431]=0;
_$jscoverage['lib/tr8n.js'][1478]=0;
_$jscoverage['lib/tr8n.js'][1449]=0;
_$jscoverage['lib/tr8n.js'][1444]=0;
_$jscoverage['lib/tr8n.js'][1476]=0;
_$jscoverage['lib/tr8n.js'][1457]=0;
_$jscoverage['lib/tr8n.js'][1455]=0;
_$jscoverage['lib/tr8n.js'][1450]=0;
_$jscoverage['lib/tr8n.js'][1455]=0;
_$jscoverage['lib/tr8n.js'][1485]=0;
_$jscoverage['lib/tr8n.js'][1465]=0;
_$jscoverage['lib/tr8n.js'][1464]=0;
_$jscoverage['lib/tr8n.js'][1458]=0;
_$jscoverage['lib/tr8n.js'][1460]=0;
_$jscoverage['lib/tr8n.js'][1487]=0;
_$jscoverage['lib/tr8n.js'][1477]=0;
_$jscoverage['lib/tr8n.js'][1477]=0;
_$jscoverage['lib/tr8n.js'][1475]=0;
_$jscoverage['lib/tr8n.js'][1483]=0;
_$jscoverage['lib/tr8n.js'][1484]=0;
_$jscoverage['lib/tr8n.js'][1486]=0;
_$jscoverage['lib/tr8n.js'][1488]=0;
_$jscoverage['lib/tr8n.js'][1489]=0;
_$jscoverage['lib/tr8n.js'][1492]=0;
_$jscoverage['lib/tr8n.js'][1493]=0;
_$jscoverage['lib/tr8n.js'][1496]=0;
_$jscoverage['lib/tr8n.js'][1497]=0;
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
};;
_$jscoverage['lib/tr8n.js'][259]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][260]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][261]++;
this.initTranslatorOptions();
  _$jscoverage['lib/tr8n.js'][262]++;
this.initContextRules();
  _$jscoverage['lib/tr8n.js'][263]++;
this.currentLanguage = new Tr8n.Language({});
};

_$jscoverage['lib/tr8n.js'][266]++;
Tr8n.Configuration.prototype.initDefaultTokens = function() {
  _$jscoverage['lib/tr8n.js'][267]++;
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

_$jscoverage['lib/tr8n.js'][332]++;
Tr8n.Configuration.prototype.defaultToken = function(token, type, format) {
  _$jscoverage['lib/tr8n.js'][333]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][333]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][334]++;
if (typeof this.defaultTokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][334]++;
return null;}

  _$jscoverage['lib/tr8n.js'][335]++;
return new String(this.defaultTokens[format][type][token]);
};

_$jscoverage['lib/tr8n.js'][338]++;
Tr8n.Configuration.prototype.setDefaultToken = function(token, value, type, format) {
  _$jscoverage['lib/tr8n.js'][339]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][339]++;
format = format || "html";
  _$jscoverage['lib/tr8n.js'][340]++;
this.defaultTokens[format] = this.defaultTokens[format] || {};
  _$jscoverage['lib/tr8n.js'][341]++;
this.defaultTokens[format][type] = this.defaultTokens[format][type] || {};
  _$jscoverage['lib/tr8n.js'][342]++;
this.defaultTokens[format][type][token] = value;
};

_$jscoverage['lib/tr8n.js'][345]++;
Tr8n.Configuration.prototype.initTranslatorOptions = function() {
  _$jscoverage['lib/tr8n.js'][346]++;
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

_$jscoverage['lib/tr8n.js'][375]++;
Tr8n.Configuration.prototype.initContextRules = function() {
  _$jscoverage['lib/tr8n.js'][376]++;
this.contextRules = {
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
          _$jscoverage['lib/tr8n.js'][388]++;
var genders = [];
          _$jscoverage['lib/tr8n.js'][389]++;
list.forEach(function(obj) {
            _$jscoverage['lib/tr8n.js'][390]++;
genders.push(obj.gender);
          });
          _$jscoverage['lib/tr8n.js'][392]++;
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
};;
_$jscoverage['lib/tr8n.js'][404]++;
Tr8n.Tokens.Data = function(name, label) {
  _$jscoverage['lib/tr8n.js'][405]++;
this.fullName = name;
  _$jscoverage['lib/tr8n.js'][406]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][407]++;
this.parseElements();
};

_$jscoverage['lib/tr8n.js'][410]++;
Tr8n.Tokens.Data.prototype.parseElements = function() {
  _$jscoverage['lib/tr8n.js'][411]++;
var nameWithoutParens = this.fullName.substring(1, this.fullName.length-1);
  _$jscoverage['lib/tr8n.js'][412]++;
var nameWithoutCaseKeys = nameWithoutParens.split('::')[0].trim();

  _$jscoverage['lib/tr8n.js'][414]++;
this.shortName = nameWithoutParens.split(':')[0].trim();
  _$jscoverage['lib/tr8n.js'][415]++;
this.caseKeys = [];
  _$jscoverage['lib/tr8n.js'][416]++;
(nameWithoutParens.match(/(::\s*\w+)/g) || []).forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][417]++;
this.caseKeys.push(key.replace(/[:]/g, "").trim());
  }.bind(this));
  _$jscoverage['lib/tr8n.js'][419]++;
this.contextKeys = [];
  _$jscoverage['lib/tr8n.js'][420]++;
(nameWithoutCaseKeys.match(/(:\s*\w+)/g) || []).forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][421]++;
this.contextKeys.push(key.replace(/[:]/g, "").trim());
  }.bind(this));
};

_$jscoverage['lib/tr8n.js'][425]++;
Tr8n.Tokens.Data.prototype.contextForLanguage = function(language, opts) {
  _$jscoverage['lib/tr8n.js'][426]++;
if (this.contextKeys.length > 0)
    {
_$jscoverage['lib/tr8n.js'][427]++;
return language.contextByKeyword(this.contextKeys[0]);}


  _$jscoverage['lib/tr8n.js'][429]++;
return language.contextByTokenName(this.shortName);
};

_$jscoverage['lib/tr8n.js'][432]++;
Tr8n.Tokens.Data.prototype.tokenObject = function(tokenValues, tokenName) {
  _$jscoverage['lib/tr8n.js'][433]++;
if (tokenValues == null) {
_$jscoverage['lib/tr8n.js'][433]++;
return null;}


  _$jscoverage['lib/tr8n.js'][435]++;
var tokenObject = tokenValues[tokenName];
  _$jscoverage['lib/tr8n.js'][436]++;
if (typeof tokeObject === 'array')
    {
_$jscoverage['lib/tr8n.js'][437]++;
return tokenObject[0];}


  _$jscoverage['lib/tr8n.js'][439]++;
return tokenObject.object || tokenObject;
};

_$jscoverage['lib/tr8n.js'][442]++;
Tr8n.Tokens.Data.prototype.error = function(msg) {
  _$jscoverage['lib/tr8n.js'][443]++;
console.log(this.fullName + " in \"" + this.label + "\" : " + msg);
  _$jscoverage['lib/tr8n.js'][444]++;
return this.fullName;
};


_$jscoverage['lib/tr8n.js'][448]++;
Tr8n.Tokens.Data.prototype.tokenValueFromArrayParam = function(arr, language, options) {
  _$jscoverage['lib/tr8n.js'][449]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][450]++;
if (arr.lenght == 0)
    {
_$jscoverage['lib/tr8n.js'][451]++;
return this.error("Invalid number of params of an array");}


  _$jscoverage['lib/tr8n.js'][453]++;
var object = arr[0];
  _$jscoverage['lib/tr8n.js'][454]++;
var method = arr.lenght > 1 ? arr[1] : null;

  _$jscoverage['lib/tr8n.js'][456]++;
if (typeof object === "array")
    {
_$jscoverage['lib/tr8n.js'][457]++;
return this.tokenValueFromArray(tokenValues, language, options);}


  _$jscoverage['lib/tr8n.js'][459]++;
if (method == null)
    {
_$jscoverage['lib/tr8n.js'][460]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][462]++;
if (method.match(/^@@/))
    {
_$jscoverage['lib/tr8n.js'][463]++;
return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));}


  _$jscoverage['lib/tr8n.js'][465]++;
if (method.match(/^@/))
    {
_$jscoverage['lib/tr8n.js'][466]++;
return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));}


    _$jscoverage['lib/tr8n.js'][468]++;
return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
};



_$jscoverage['lib/tr8n.js'][473]++;
Tr8n.Tokens.Data.prototype.tokenValueFromHashParam = function(hash, language, options) {
  _$jscoverage['lib/tr8n.js'][474]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][475]++;
var value = hash.value;
  _$jscoverage['lib/tr8n.js'][476]++;
var object = hash.object;

  _$jscoverage['lib/tr8n.js'][478]++;
if (value) {
_$jscoverage['lib/tr8n.js'][478]++;
return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));}


  _$jscoverage['lib/tr8n.js'][480]++;
if (object == null || typeof object === "undefined")
    {
_$jscoverage['lib/tr8n.js'][481]++;
return this.error("No object or value are provided in the hash");}


  _$jscoverage['lib/tr8n.js'][483]++;
var attr = hash.attribute;

  _$jscoverage['lib/tr8n.js'][485]++;
if (attr == null || typeof attr === "undefined")
    {
_$jscoverage['lib/tr8n.js'][486]++;
return this.error("Missing value for hash token");}


  _$jscoverage['lib/tr8n.js'][488]++;
return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
};



_$jscoverage['lib/tr8n.js'][493]++;
Tr8n.Tokens.Data.prototype.tokenValueFromArray = function(params, language, options) {
  _$jscoverage['lib/tr8n.js'][494]++;
var listOptions = {
    description: "List joiner",
    limit: 4,
    separator: ", ",
    joiner: 'and',
    less: '{laquo} less',
    expandable: true,
    collapsable: true
  };

  _$jscoverage['lib/tr8n.js'][504]++;
var objects = params[0];
  _$jscoverage['lib/tr8n.js'][505]++;
var method = (params.length > 1 ? params[1] : null);

  _$jscoverage['lib/tr8n.js'][507]++;
if (params.length > 2)
    {
_$jscoverage['lib/tr8n.js'][508]++;
listOptions = Tr8n.Utils.merge(listOptions, params[2]);}


  _$jscoverage['lib/tr8n.js'][510]++;
if (options["skip_decorations"])
    {
_$jscoverage['lib/tr8n.js'][511]++;
listOptions.expandable = false;}


  _$jscoverage['lib/tr8n.js'][513]++;
var values = [];
  _$jscoverage['lib/tr8n.js'][514]++;
for (var obj in objects) {
    _$jscoverage['lib/tr8n.js'][515]++;
if (method == null) {
      _$jscoverage['lib/tr8n.js'][516]++;
values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
    } else {
_$jscoverage['lib/tr8n.js'][517]++;
if (typeof method === "string") {
      _$jscoverage['lib/tr8n.js'][518]++;
if (method.match(/^@@/))
        {
_$jscoverage['lib/tr8n.js'][519]++;
values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else {
_$jscoverage['lib/tr8n.js'][520]++;
if (method.match(/^@/))
        {
_$jscoverage['lib/tr8n.js'][521]++;
values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));}

      else
        {
_$jscoverage['lib/tr8n.js'][523]++;
values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));}
}

    } else {
_$jscoverage['lib/tr8n.js'][524]++;
if (typeof method === "object") {
      _$jscoverage['lib/tr8n.js'][525]++;
var attribute = method.attribute;
      _$jscoverage['lib/tr8n.js'][526]++;
var value = method.value;

      _$jscoverage['lib/tr8n.js'][528]++;
if (attribute == null)
        {
_$jscoverage['lib/tr8n.js'][529]++;
return this.error("No attribute is provided for the hash object in the array");}


      _$jscoverage['lib/tr8n.js'][531]++;
if (!object[attribute])
        {
_$jscoverage['lib/tr8n.js'][532]++;
return this.error("Hash object in the array does not contain such attribute");}


      _$jscoverage['lib/tr8n.js'][534]++;
attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));

      _$jscoverage['lib/tr8n.js'][536]++;
if (value)
        {
_$jscoverage['lib/tr8n.js'][537]++;
values.push(value.replace("{$0}", attribute));}

      else
        {
_$jscoverage['lib/tr8n.js'][539]++;
values.push(attribute);}

    } else {
_$jscoverage['lib/tr8n.js'][540]++;
if (typeof method === "function") {
      _$jscoverage['lib/tr8n.js'][541]++;
values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
    }}
}
}

  }

  _$jscoverage['lib/tr8n.js'][545]++;
if (values.lenght == 1)
    {
_$jscoverage['lib/tr8n.js'][546]++;
return values[0];}


  _$jscoverage['lib/tr8n.js'][548]++;
if (!listOptions.joiner || listOptions.joiner == "")
    {
_$jscoverage['lib/tr8n.js'][549]++;
return values.join(listOptions.separator);}


  _$jscoverage['lib/tr8n.js'][551]++;
var joiner = language.translate(listOptions.joiner, listOptions.description, {}, options);

  _$jscoverage['lib/tr8n.js'][553]++;
if (values.length <= listOptions.limit) {
    _$jscoverage['lib/tr8n.js'][554]++;
var last = values.pop();
    _$jscoverage['lib/tr8n.js'][555]++;
return values.join(listOptions.separator) + " " + joiner + " " + last;
  }

  _$jscoverage['lib/tr8n.js'][558]++;
var displayedValues = values.slice(0, listOptions.limit);
  _$jscoverage['lib/tr8n.js'][559]++;
var remainingValues = values.slice(listOptions.limit);

  _$jscoverage['lib/tr8n.js'][561]++;
var result = displayedValues.join(listOptions.separator);
  _$jscoverage['lib/tr8n.js'][562]++;
var otherValues = language.translate("{count||other}", listOptions.description, {count: remainingValues.length}, options);

  _$jscoverage['lib/tr8n.js'][564]++;
if (listOptions.expandable) {
    _$jscoverage['lib/tr8n.js'][565]++;
result = result + " " + joiner + " ";
    _$jscoverage['lib/tr8n.js'][566]++;
if (listOptions.remainder && typeof listOptions.remainder === "function")
      {
_$jscoverage['lib/tr8n.js'][567]++;
return result + listOptions.remainder(remainingValues);}

    _$jscoverage['lib/tr8n.js'][568]++;
return result + otherValues;
  }

  _$jscoverage['lib/tr8n.js'][571]++;
var key = listOptions.key ? listOptions.key : Tr8n.Utils.generateKey(this.label, values.join(","));

  _$jscoverage['lib/tr8n.js'][573]++;
result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
  _$jscoverage['lib/tr8n.js'][574]++;
result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';

  _$jscoverage['lib/tr8n.js'][576]++;
if (listOptions.remainder && typeof listOptions.remainder === "function")
    {
_$jscoverage['lib/tr8n.js'][577]++;
result = result + listOptions.remainder(remainingValues);}

  else
    {
_$jscoverage['lib/tr8n.js'][579]++;
result = result + otherValues;}


  _$jscoverage['lib/tr8n.js'][581]++;
result = result + "</a></span>";

  _$jscoverage['lib/tr8n.js'][583]++;
result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + listOptions.separator;
  _$jscoverage['lib/tr8n.js'][584]++;
var lastRemaining = remainingValues.pop();
  _$jscoverage['lib/tr8n.js'][585]++;
result = result + remainingValues.join(listOptions.separator);
  _$jscoverage['lib/tr8n.js'][586]++;
result = result + " " + joiner + " " + lastRemaining;

  _$jscoverage['lib/tr8n.js'][588]++;
if (listOptions.collapsable) {
    _$jscoverage['lib/tr8n.js'][589]++;
result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
    _$jscoverage['lib/tr8n.js'][590]++;
result = result + language.translate(listOptions.less, listOptions["description"], {}, options);
    _$jscoverage['lib/tr8n.js'][591]++;
result = result + "</a>";
  }

  _$jscoverage['lib/tr8n.js'][594]++;
result = result + "</span>";
  _$jscoverage['lib/tr8n.js'][595]++;
return result;
};

_$jscoverage['lib/tr8n.js'][598]++;
Tr8n.Tokens.Data.prototype.tokenValue = function(tokenValues, language, options) {
  _$jscoverage['lib/tr8n.js'][599]++;
options = options || {};
  _$jscoverage['lib/tr8n.js'][600]++;
var object = null;

  _$jscoverage['lib/tr8n.js'][602]++;
if (tokenValues[this.shortName])
    {
_$jscoverage['lib/tr8n.js'][603]++;
object = tokenValues[this.shortName];}

  else
    {
_$jscoverage['lib/tr8n.js'][605]++;
object = Tr8n.config.defaultToken(this.shortName);}


  _$jscoverage['lib/tr8n.js'][607]++;
if (!object)
    {
_$jscoverage['lib/tr8n.js'][608]++;
return this.error("Missing token value");}


  _$jscoverage['lib/tr8n.js'][610]++;
if (typeof object === "array") {
    _$jscoverage['lib/tr8n.js'][611]++;
return this.tokenValueFromArrayParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][614]++;
if (typeof object === "object") {
    _$jscoverage['lib/tr8n.js'][615]++;
return this.tokenValueFromHashParam(object, language, options);
  }

  _$jscoverage['lib/tr8n.js'][618]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
};

_$jscoverage['lib/tr8n.js'][621]++;
Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][622]++;
var lcase = language.languageCase(key);
  _$jscoverage['lib/tr8n.js'][623]++;
if (!lcase) {
_$jscoverage['lib/tr8n.js'][623]++;
return value;}

  _$jscoverage['lib/tr8n.js'][624]++;
return lcase.apply(value, object, options);
};

_$jscoverage['lib/tr8n.js'][627]++;
Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {
  _$jscoverage['lib/tr8n.js'][628]++;
value = "" . value;

  _$jscoverage['lib/tr8n.js'][630]++;
if (!options.safe) {
        _$jscoverage['lib/tr8n.js'][631]++;
value = htmlspecialchars(value);
  }

  _$jscoverage['lib/tr8n.js'][634]++;
if (this.caseKeys.length > 0) {
    _$jscoverage['lib/tr8n.js'][635]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][636]++;
this.caseKeys.forEach(function(lcase) {
      _$jscoverage['lib/tr8n.js'][637]++;
value = self.applyCase(lcase, value, object, language, options);
    });
  }

  _$jscoverage['lib/tr8n.js'][641]++;
return value;
};

_$jscoverage['lib/tr8n.js'][644]++;
Tr8n.Tokens.Data.prototype.substitute = function(label, tokenValues, language, options) {
  _$jscoverage['lib/tr8n.js'][645]++;
var tokenValue = this.tokenValue(tokenValues, language, options);
  _$jscoverage['lib/tr8n.js'][646]++;
return label.replace(this.fullName, tokenValue);
};

;_$jscoverage['lib/tr8n.js'][649]++;
Tr8n.Tokens.Method = function() {

};


;;
_$jscoverage['lib/tr8n.js'][655]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][656]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][657]++;
this.ctx = ctx || {
    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][658]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][658]++;
return r; }.bind(this),
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][659]++;
return expr; }.bind(this),
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][660]++;
return list[1]; }.bind(this),
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][661]++;
list.shift(); _$jscoverage['lib/tr8n.js'][661]++;
return list; }.bind(this),
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][662]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][662]++;
return cell; }.bind(this),
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][663]++;
return (l == r); }.bind(this),
    'atom':     function(a)       { _$jscoverage['lib/tr8n.js'][664]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); }.bind(this),
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][665]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); }.bind(this),
  
    'set':      function(l, r){ _$jscoverage['lib/tr8n.js'][667]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][667]++;
return r; }.bind(this),

    '=':        function(args){ _$jscoverage['lib/tr8n.js'][669]++;
return (args[0] == args[1]); }.bind(this),
    '!=':       function(args){ _$jscoverage['lib/tr8n.js'][670]++;
return (args[0] != args[1]); }.bind(this),
    '<':        function(args){ _$jscoverage['lib/tr8n.js'][671]++;
return (args[0] < args[1]); }.bind(this),
    '>':        function(args){ _$jscoverage['lib/tr8n.js'][672]++;
return (args[0] > args[1]); }.bind(this),
    '+':        function(args){ _$jscoverage['lib/tr8n.js'][673]++;
return (args[0] + args[1]); }.bind(this),
    '-':        function(args){ _$jscoverage['lib/tr8n.js'][674]++;
return (args[0] - args[1]); }.bind(this),
    '*':        function(args){ _$jscoverage['lib/tr8n.js'][675]++;
return (args[0] * args[1]); }.bind(this),
    '/':        function(args){ _$jscoverage['lib/tr8n.js'][676]++;
return (args[0] / args[1]); }.bind(this),
    '!':        function(args){ _$jscoverage['lib/tr8n.js'][677]++;
return (("" + args) == "true" ? false : true); }.bind(this),
    'not':      function(args){ _$jscoverage['lib/tr8n.js'][678]++;
return this.ctx['!'](args); }.bind(this),
    '&&':       function(args){
      _$jscoverage['lib/tr8n.js'][680]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][681]++;
if (!this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][681]++;
return false;}

      }
      _$jscoverage['lib/tr8n.js'][683]++;
return true;
    }.bind(this),
    'and':      function(args){ _$jscoverage['lib/tr8n.js'][685]++;
return this.ctx['&&'](args); }.bind(this),
    '||':       function(args){
      _$jscoverage['lib/tr8n.js'][687]++;
for (var index = 0; index < args.length; ++index) {
        _$jscoverage['lib/tr8n.js'][688]++;
if (this.evaluate(args[index])) {
_$jscoverage['lib/tr8n.js'][688]++;
return true;}

      }
      _$jscoverage['lib/tr8n.js'][690]++;
return false;
    }.bind(this),
    'or':      function(args){ _$jscoverage['lib/tr8n.js'][692]++;
return this.ctx['||'](args); }.bind(this)
  };
  _$jscoverage['lib/tr8n.js'][694]++;
return this;
}

_$jscoverage['lib/tr8n.js'][697]++;
Tr8n.RulesEngine.Evaluator.prototype = {
  setVars: function(vars) {
    _$jscoverage['lib/tr8n.js'][699]++;
this.vars = vars;
  },

  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][703]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][704]++;
return this.ctx[fn](args);
    }
    _$jscoverage['lib/tr8n.js'][706]++;
return this.ctx[fn];
  },

  evaluate: function(sexpr) {
    _$jscoverage['lib/tr8n.js'][710]++;
if (this.ctx['atom'](sexpr)) {
      _$jscoverage['lib/tr8n.js'][711]++;
return (sexpr in this.ctx ? this.ctx[sexpr] : sexpr);
    }

    _$jscoverage['lib/tr8n.js'][714]++;
var fn = sexpr[0];
    _$jscoverage['lib/tr8n.js'][715]++;
var args = sexpr.slice(1);

    _$jscoverage['lib/tr8n.js'][717]++;
if (["quote", "cdr", "cond", "if", "&&", "||", "and", "or", "true", "false", "let", "count", "all", "any"].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][718]++;
args = args.map(function(arg) {
        _$jscoverage['lib/tr8n.js'][719]++;
return this.evaluate(arg);
      }.bind(this));
    }

    _$jscoverage['lib/tr8n.js'][723]++;
return this.apply(fn, args);
  }
}
;
_$jscoverage['lib/tr8n.js'][727]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][728]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][731]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][733]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][737]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][738]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][738]++;
return;}

  	_$jscoverage['lib/tr8n.js'][739]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][739]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][740]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][740]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][741]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][741]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][742]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][746]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][747]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][748]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][749]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][750]++;
return list;
  }
}
;
_$jscoverage['lib/tr8n.js'][754]++;
Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {
  _$jscoverage['lib/tr8n.js'][755]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][756]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][757]++;
this.options = options || {};
  _$jscoverage['lib/tr8n.js'][758]++;
this.tokens = [];
};

_$jscoverage['lib/tr8n.js'][761]++;
Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {
  _$jscoverage['lib/tr8n.js'][762]++;
return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

_$jscoverage['lib/tr8n.js'][769]++;
Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][770]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][771]++;
self.tokens = [];
  _$jscoverage['lib/tr8n.js'][772]++;
self.supportedTokens().forEach(function(tokenInfo) {
    _$jscoverage['lib/tr8n.js'][773]++;
var matches = self.label.match(tokensInfo[0]);
    _$jscoverage['lib/tr8n.js'][774]++;
if (matches) {
      _$jscoverage['lib/tr8n.js'][775]++;
Tr8n.Utils.unique(matches).forEach(function(match) {
        _$jscoverage['lib/tr8n.js'][776]++;
self.tokens.push(new tokenInfo[1](self.label, match));
      });
    }
  });
};

_$jscoverage['lib/tr8n.js'][782]++;
Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][783]++;
if (this.options["allowed_tokens"] == null) {
_$jscoverage['lib/tr8n.js'][783]++;
return true;}

  _$jscoverage['lib/tr8n.js'][784]++;
return (this.options["allowed_tokens"].indexOf(token.name) != -1);
};

_$jscoverage['lib/tr8n.js'][787]++;
Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {
  _$jscoverage['lib/tr8n.js'][788]++;
var label = this.label;
  _$jscoverage['lib/tr8n.js'][789]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][790]++;
self.tokens.forEach(function(token) {
    _$jscoverage['lib/tr8n.js'][791]++;
if (self.isTokenAllowed(token)) {
      _$jscoverage['lib/tr8n.js'][792]++;
label = token.substitute(label, self.context, language, options);
    }
  });
  _$jscoverage['lib/tr8n.js'][795]++;
return label;
};
;
_$jscoverage['lib/tr8n.js'][798]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][799]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][800]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][801]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][802]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][803]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][804]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][805]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][806]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][808]++;
Tr8n.Tokenizers.DecorationTokenizer = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][809]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][810]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][811]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][812]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][813]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][814]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][817]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.tokenize = function() {
  _$jscoverage['lib/tr8n.js'][818]++;
var expression = new RegExp([
    RE_SHORT_TOKEN_START,
    RE_SHORT_TOKEN_END,
    RE_LONG_TOKEN_START,
    RE_LONG_TOKEN_END,
    RE_TEXT
  ].join("|"), "g");

  _$jscoverage['lib/tr8n.js'][826]++;
this.fragments = this.label.match(expression);
  _$jscoverage['lib/tr8n.js'][827]++;
return this.fragments;
};

_$jscoverage['lib/tr8n.js'][830]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.peek = function() {
  _$jscoverage['lib/tr8n.js'][831]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][831]++;
return null;}

  _$jscoverage['lib/tr8n.js'][832]++;
return this.fragments[0];
};

_$jscoverage['lib/tr8n.js'][835]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.nextFragment = function() {
  _$jscoverage['lib/tr8n.js'][836]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][836]++;
return null;}

  _$jscoverage['lib/tr8n.js'][837]++;
return this.fragments.shift();
};

_$jscoverage['lib/tr8n.js'][840]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parse = function() {
  _$jscoverage['lib/tr8n.js'][841]++;
var token = this.nextFragment();
  _$jscoverage['lib/tr8n.js'][842]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][843]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

  _$jscoverage['lib/tr8n.js'][844]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
    {
_$jscoverage['lib/tr8n.js'][845]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

  _$jscoverage['lib/tr8n.js'][846]++;
return token;
};

_$jscoverage['lib/tr8n.js'][849]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.parseTree = function(name, type) {
  _$jscoverage['lib/tr8n.js'][850]++;
var tree = [name];
  _$jscoverage['lib/tr8n.js'][851]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
    {
_$jscoverage['lib/tr8n.js'][852]++;
this.tokens.push(name);}


  _$jscoverage['lib/tr8n.js'][854]++;
if (type == TOKEN_TYPE_SHORT) {
    _$jscoverage['lib/tr8n.js'][855]++;
var first = true;
    _$jscoverage['lib/tr8n.js'][856]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][857]++;
var value = this.parse();
      _$jscoverage['lib/tr8n.js'][858]++;
if (first && typeof value == "string") {
        _$jscoverage['lib/tr8n.js'][859]++;
value = value.replace(/^\s+/,'');
        _$jscoverage['lib/tr8n.js'][860]++;
first = false;
      }
      _$jscoverage['lib/tr8n.js'][862]++;
tree.push(value);
    }
  } else {
_$jscoverage['lib/tr8n.js'][864]++;
if (type == TOKEN_TYPE_LONG) {
    _$jscoverage['lib/tr8n.js'][865]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
      _$jscoverage['lib/tr8n.js'][866]++;
tree.push(this.parse());
    }
  }}


  _$jscoverage['lib/tr8n.js'][870]++;
this.nextFragment();
  _$jscoverage['lib/tr8n.js'][871]++;
return tree;
};

_$jscoverage['lib/tr8n.js'][874]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.isTokenAllowed = function(token) {
  _$jscoverage['lib/tr8n.js'][875]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
};

_$jscoverage['lib/tr8n.js'][878]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.defaultDecoration = function(token, value) {
  _$jscoverage['lib/tr8n.js'][879]++;
var defaultDecoration = Tr8n.config.defaultToken(token, "decoration");
  _$jscoverage['lib/tr8n.js'][880]++;
if (defaultDecoration == null) {
_$jscoverage['lib/tr8n.js'][880]++;
return value;}


  _$jscoverage['lib/tr8n.js'][882]++;
var decorationTokenValues = this.context[token];
  _$jscoverage['lib/tr8n.js'][883]++;
defaultDecoration = defaultDecoration.replace(PLACEHOLDER, value);

  _$jscoverage['lib/tr8n.js'][885]++;
if (decorationTokenValues instanceof Object) {
    _$jscoverage['lib/tr8n.js'][886]++;
Object.keys(decorationTokenValues).forEach(function (key) {
      _$jscoverage['lib/tr8n.js'][887]++;
defaultDecoration = defaultDecoration.replace("{$" + key + "}", decorationTokenValues[key]);
    });
  }

  _$jscoverage['lib/tr8n.js'][891]++;
return defaultDecoration;
};

_$jscoverage['lib/tr8n.js'][894]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.apply = function(token, value) {
  _$jscoverage['lib/tr8n.js'][895]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][895]++;
return value;}

  _$jscoverage['lib/tr8n.js'][896]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][896]++;
return value;}


  _$jscoverage['lib/tr8n.js'][898]++;
var method = this.context[token];

  _$jscoverage['lib/tr8n.js'][900]++;
if (method != null) {
    _$jscoverage['lib/tr8n.js'][901]++;
if (typeof method === 'string')
      {
_$jscoverage['lib/tr8n.js'][902]++;
return method.replace(PLACEHOLDER, value);}


    _$jscoverage['lib/tr8n.js'][904]++;
if (typeof method === 'function')
      {
_$jscoverage['lib/tr8n.js'][905]++;
return method(value);}


    _$jscoverage['lib/tr8n.js'][907]++;
if (typeof method === 'object')
      {
_$jscoverage['lib/tr8n.js'][908]++;
return this.defaultDecoration(token, value);}


    _$jscoverage['lib/tr8n.js'][910]++;
return value;
  }

  _$jscoverage['lib/tr8n.js'][913]++;
return this.defaultDecoration(token, value);
};

_$jscoverage['lib/tr8n.js'][916]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.evaluate = function(expr) {
  _$jscoverage['lib/tr8n.js'][917]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][917]++;
return expr;}


  _$jscoverage['lib/tr8n.js'][919]++;
var token = expr[0];
  _$jscoverage['lib/tr8n.js'][920]++;
expr.shift();
  _$jscoverage['lib/tr8n.js'][921]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][922]++;
var value = [];
  _$jscoverage['lib/tr8n.js'][923]++;
expr.forEach(function(obj, index) {
    _$jscoverage['lib/tr8n.js'][924]++;
value.push(self.evaluate(obj));
  });
  _$jscoverage['lib/tr8n.js'][926]++;
return this.apply(token, value.join(''));
};

_$jscoverage['lib/tr8n.js'][929]++;
Tr8n.Tokenizers.DecorationTokenizer.prototype.substitute = function() {
  _$jscoverage['lib/tr8n.js'][930]++;
return this.evaluate(this.parse());
};
;
_$jscoverage['lib/tr8n.js'][933]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][934]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][935]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][937]++;
Tr8n.Tokenizers.DomTokenizer = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][938]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][939]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][940]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][941]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][944]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translate = function() {
  _$jscoverage['lib/tr8n.js'][945]++;
return this.translateTree(this.doc);
};

_$jscoverage['lib/tr8n.js'][948]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTree = function(node) {
  _$jscoverage['lib/tr8n.js'][949]++;
if (this.isNonTranslatableNode(node)) {
    _$jscoverage['lib/tr8n.js'][950]++;
if (node.childNodes.length == 1)
      {
_$jscoverage['lib/tr8n.js'][951]++;
return node.childNodes[0].nodeValue;}

    _$jscoverage['lib/tr8n.js'][952]++;
return "";
  }

  _$jscoverage['lib/tr8n.js'][955]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][956]++;
return this.translateTml(node.nodeValue);}


  _$jscoverage['lib/tr8n.js'][958]++;
var html = "";
  _$jscoverage['lib/tr8n.js'][959]++;
var buffer = "";

  _$jscoverage['lib/tr8n.js'][961]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][962]++;
var child = node.childNodes[i];


    _$jscoverage['lib/tr8n.js'][965]++;
if (child.nodeType == 3) {
      _$jscoverage['lib/tr8n.js'][966]++;
buffer = buffer + child.nodeValue;
    } else {
_$jscoverage['lib/tr8n.js'][967]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {        _$jscoverage['lib/tr8n.js'][967]++;
buffer = buffer + this.generateTmlTags(child);
    } else {
_$jscoverage['lib/tr8n.js'][968]++;
if (this.isSeparatorNode(child)) {          _$jscoverage['lib/tr8n.js'][968]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][969]++;
html = html + this.translateTml(buffer);}

      _$jscoverage['lib/tr8n.js'][970]++;
html = html + this.generateHtmlToken(child);
      _$jscoverage['lib/tr8n.js'][971]++;
buffer = "";
    } else {
      _$jscoverage['lib/tr8n.js'][973]++;
if (buffer != "")
        {
_$jscoverage['lib/tr8n.js'][974]++;
html = html + this.translateTml(buffer);}


      _$jscoverage['lib/tr8n.js'][976]++;
var containerValue = this.translateTree(child);
      _$jscoverage['lib/tr8n.js'][977]++;
if (this.isIgnoredNode(child)) {
        _$jscoverage['lib/tr8n.js'][978]++;
html = html + containerValue;
      } else {
        _$jscoverage['lib/tr8n.js'][980]++;
html = html + this.generateHtmlToken(child, containerValue);
      }

      _$jscoverage['lib/tr8n.js'][983]++;
buffer = "";
    }}
}

  }

  _$jscoverage['lib/tr8n.js'][987]++;
if (buffer != "") {
    _$jscoverage['lib/tr8n.js'][988]++;
html = html + this.translateTml(buffer);
  }

  _$jscoverage['lib/tr8n.js'][991]++;
return html;
};

_$jscoverage['lib/tr8n.js'][994]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isNonTranslatableNode = function(node) {
  _$jscoverage['lib/tr8n.js'][995]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
    {
_$jscoverage['lib/tr8n.js'][996]++;
return true;}

  _$jscoverage['lib/tr8n.js'][997]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
    {
_$jscoverage['lib/tr8n.js'][998]++;
return true;}

  _$jscoverage['lib/tr8n.js'][999]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1002]++;
Tr8n.Tokenizers.DomTokenizer.prototype.translateTml = function(tml) {
  _$jscoverage['lib/tr8n.js'][1003]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][1003]++;
return tml;}



  _$jscoverage['lib/tr8n.js'][1006]++;
if (this.getOption("split_sentences")) {
    _$jscoverage['lib/tr8n.js'][1007]++;
sentences = Tr8n.Utils.splitSentences(tml);
    _$jscoverage['lib/tr8n.js'][1008]++;
translation = tml;
    _$jscoverage['lib/tr8n.js'][1009]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1010]++;
sentences.forEach(function(sentence) {
      _$jscoverage['lib/tr8n.js'][1011]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
      _$jscoverage['lib/tr8n.js'][1012]++;
translation = translation.replace(sentence, sentenceTranslation);
    });
    _$jscoverage['lib/tr8n.js'][1014]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][1015]++;
return translation;
  }

  _$jscoverage['lib/tr8n.js'][1018]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
  _$jscoverage['lib/tr8n.js'][1019]++;
this.resetContext();
  _$jscoverage['lib/tr8n.js'][1020]++;
return translation;
};

_$jscoverage['lib/tr8n.js'][1023]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasChildNodes = function(node) {
  _$jscoverage['lib/tr8n.js'][1024]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][1024]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1025]++;
return (node.childNodes.length > 0);
};

_$jscoverage['lib/tr8n.js'][1028]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isBetweenSeparators = function(node) {
  _$jscoverage['lib/tr8n.js'][1029]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
    {
_$jscoverage['lib/tr8n.js'][1030]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1032]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
    {
_$jscoverage['lib/tr8n.js'][1033]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1035]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1038]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateTmlTags = function(node) {
  _$jscoverage['lib/tr8n.js'][1039]++;
var buffer = "";
  _$jscoverage['lib/tr8n.js'][1040]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1041]++;
for(var i=0; i<node.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1042]++;
var child = node.childNodes[i];
    _$jscoverage['lib/tr8n.js'][1043]++;
if (child.nodeType == 3)                          {
_$jscoverage['lib/tr8n.js'][1043]++;
buffer = buffer + child.nodeValue;}

    else
      {
_$jscoverage['lib/tr8n.js'][1045]++;
buffer = buffer + self.generateTmlTags(child);}

  }
  _$jscoverage['lib/tr8n.js'][1047]++;
var tokenContext = self.generateHtmlToken(node);
  _$jscoverage['lib/tr8n.js'][1048]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

  _$jscoverage['lib/tr8n.js'][1050]++;
var value = this.sanitizeValue(buffer);

  _$jscoverage['lib/tr8n.js'][1052]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1053]++;
return '{' + token + '}';}


  _$jscoverage['lib/tr8n.js'][1055]++;
if (this.isShortToken(token, value))
    {
_$jscoverage['lib/tr8n.js'][1056]++;
return '[' + token + ': ' + value + ']';}


  _$jscoverage['lib/tr8n.js'][1058]++;
return '[' + token + ']' + value + '[/' + token + ']';
};

_$jscoverage['lib/tr8n.js'][1061]++;
Tr8n.Tokenizers.DomTokenizer.prototype.getOption = function(name) {
  _$jscoverage['lib/tr8n.js'][1062]++;
if (this.options[name]) {
    _$jscoverage['lib/tr8n.js'][1063]++;
return this.options[name];
  }
  _$jscoverage['lib/tr8n.js'][1065]++;
return Tr8n.Utils.hashValue(Tr8n.config.translatorOptions, name);
};

_$jscoverage['lib/tr8n.js'][1068]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTranslation = function(translation) {
  _$jscoverage['lib/tr8n.js'][1069]++;
return this.getOption("debug_format").replace('{$0}', translation);
};

_$jscoverage['lib/tr8n.js'][1072]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isEmptyString = function(tml) {
  _$jscoverage['lib/tr8n.js'][1073]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
  _$jscoverage['lib/tr8n.js'][1074]++;
return (tml == '');
};

_$jscoverage['lib/tr8n.js'][1077]++;
Tr8n.Tokenizers.DomTokenizer.prototype.resetContext = function() {
  _$jscoverage['lib/tr8n.js'][1078]++;
this.tokens = [].concat(this.context);
};

_$jscoverage['lib/tr8n.js'][1081]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isShortToken = function(token, value) {
  _$jscoverage['lib/tr8n.js'][1082]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
};

_$jscoverage['lib/tr8n.js'][1085]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isOnlyChild = function(node) {
  _$jscoverage['lib/tr8n.js'][1086]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1086]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1087]++;
return (node.parentNode.childNodes.length == 1);
};

_$jscoverage['lib/tr8n.js'][1090]++;
Tr8n.Tokenizers.DomTokenizer.prototype.hasInlineOrTextSiblings = function(node) {
  _$jscoverage['lib/tr8n.js'][1091]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1091]++;
return false;}


  _$jscoverage['lib/tr8n.js'][1093]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1094]++;
var child = node.parentNode.childNodes[i];
    _$jscoverage['lib/tr8n.js'][1095]++;
if (child != node) {
      _$jscoverage['lib/tr8n.js'][1096]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
        {
_$jscoverage['lib/tr8n.js'][1097]++;
return true;}

    }
  }

  _$jscoverage['lib/tr8n.js'][1101]++;
return false;
};

_$jscoverage['lib/tr8n.js'][1104]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isInlineNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1105]++;
return (
    node.nodeType == 1
    && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
    && !this.isOnlyChild(node)
  );
};

_$jscoverage['lib/tr8n.js'][1112]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isContainerNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1113]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
};

_$jscoverage['lib/tr8n.js'][1116]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSelfClosingNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1117]++;
return (node.firstChild == null);
};

_$jscoverage['lib/tr8n.js'][1120]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isIgnoredNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1121]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][1121]++;
return true;}

  _$jscoverage['lib/tr8n.js'][1122]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][1125]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isValidTextNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1126]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1126]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1127]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
};

_$jscoverage['lib/tr8n.js'][1130]++;
Tr8n.Tokenizers.DomTokenizer.prototype.isSeparatorNode = function(node) {
  _$jscoverage['lib/tr8n.js'][1131]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1131]++;
return false;}

  _$jscoverage['lib/tr8n.js'][1132]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
};

_$jscoverage['lib/tr8n.js'][1135]++;
Tr8n.Tokenizers.DomTokenizer.prototype.sanitizeValue = function(value) {
  _$jscoverage['lib/tr8n.js'][1136]++;
return value.replace(/^\s+/,'');
};

_$jscoverage['lib/tr8n.js'][1139]++;
Tr8n.Tokenizers.DomTokenizer.prototype.replaceSpecialCharacters = function(text) {
  _$jscoverage['lib/tr8n.js'][1140]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][1140]++;
return text;}


  _$jscoverage['lib/tr8n.js'][1142]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
  _$jscoverage['lib/tr8n.js'][1143]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1144]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][1145]++;
token = match.substring(1, match.length - 2);
    _$jscoverage['lib/tr8n.js'][1146]++;
self.context[token] = match;
    _$jscoverage['lib/tr8n.js'][1147]++;
text = text.replace(match, "{" + token + "}");
  });

  _$jscoverage['lib/tr8n.js'][1150]++;
return text;
};

_$jscoverage['lib/tr8n.js'][1153]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateDataTokens = function(text) {
  _$jscoverage['lib/tr8n.js'][1154]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][1154]++;
return text;}


  _$jscoverage['lib/tr8n.js'][1156]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
  _$jscoverage['lib/tr8n.js'][1157]++;
var tokenName = this.getOption("data_tokens.numeric_name");

  _$jscoverage['lib/tr8n.js'][1159]++;
var self = this;
  _$jscoverage['lib/tr8n.js'][1160]++;
matches.forEach(function(match) {
    _$jscoverage['lib/tr8n.js'][1161]++;
value = match.replace(/[,;]\s/, '');
    _$jscoverage['lib/tr8n.js'][1162]++;
token = self.contextualize(tokenName, value);
    _$jscoverage['lib/tr8n.js'][1163]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
  });

  _$jscoverage['lib/tr8n.js'][1166]++;
return text;
};

_$jscoverage['lib/tr8n.js'][1169]++;
Tr8n.Tokenizers.DomTokenizer.prototype.generateHtmlToken = function(node, value) {
  _$jscoverage['lib/tr8n.js'][1170]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][1171]++;
var attributes = node.attributes;
  _$jscoverage['lib/tr8n.js'][1172]++;
var attributesHash = {};
  _$jscoverage['lib/tr8n.js'][1173]++;
value = ((value == null) ? '{0}' : value);

  _$jscoverage['lib/tr8n.js'][1175]++;
if (attributes.length == 0) {
    _$jscoverage['lib/tr8n.js'][1176]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][1177]++;
return '<' + name + '/>';}

    _$jscoverage['lib/tr8n.js'][1178]++;
return '<' + name + '>' + value + '</' + name + '>';
  }

  _$jscoverage['lib/tr8n.js'][1181]++;
for(var i=0; i<attributes.length; i++) {
    _$jscoverage['lib/tr8n.js'][1182]++;
attributesHash[attributes[i].name] = attributes[i].value;
  }

  _$jscoverage['lib/tr8n.js'][1185]++;
var keys = Object.keys(attributesHash);
  _$jscoverage['lib/tr8n.js'][1186]++;
keys.sort();

  _$jscoverage['lib/tr8n.js'][1188]++;
var attr = [];
  _$jscoverage['lib/tr8n.js'][1189]++;
keys.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][1190]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
    _$jscoverage['lib/tr8n.js'][1191]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
  });
  _$jscoverage['lib/tr8n.js'][1193]++;
attr = attr.join(' ');

  _$jscoverage['lib/tr8n.js'][1195]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1196]++;
return '<' + name + ' ' + attr + '/>';}


  _$jscoverage['lib/tr8n.js'][1198]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
};

_$jscoverage['lib/tr8n.js'][1201]++;
Tr8n.Tokenizers.DomTokenizer.prototype.adjustName = function(node) {
  _$jscoverage['lib/tr8n.js'][1202]++;
var name = node.tagName.toLowerCase();
  _$jscoverage['lib/tr8n.js'][1203]++;
var map = this.getOption("name_mapping");
  _$jscoverage['lib/tr8n.js'][1204]++;
name = (map[name] != null) ? map[name] : name;
  _$jscoverage['lib/tr8n.js'][1205]++;
return name;
};

_$jscoverage['lib/tr8n.js'][1208]++;
Tr8n.Tokenizers.DomTokenizer.prototype.contextualize = function(name, context) {
  _$jscoverage['lib/tr8n.js'][1209]++;
if (this.tokens[name] && this.tokens[name] != context) {
    _$jscoverage['lib/tr8n.js'][1210]++;
var index = 0;
    _$jscoverage['lib/tr8n.js'][1211]++;
var matches = name.match(/\d+$/);
    _$jscoverage['lib/tr8n.js'][1212]++;
if (matches && matches.length > 0) {
      _$jscoverage['lib/tr8n.js'][1213]++;
index = parseInt(matches[matches.length-1]);
      _$jscoverage['lib/tr8n.js'][1214]++;
name = name.replace("" + index, '');
    }
    _$jscoverage['lib/tr8n.js'][1216]++;
name = name + (index + 1);
    _$jscoverage['lib/tr8n.js'][1217]++;
return this.contextualize(name, context);
  }

  _$jscoverage['lib/tr8n.js'][1220]++;
this.tokens[name] = context;
  _$jscoverage['lib/tr8n.js'][1221]++;
return name;
};

_$jscoverage['lib/tr8n.js'][1224]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debug = function(doc) {
  _$jscoverage['lib/tr8n.js'][1225]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][1226]++;
this.debugTree(doc, 0);
};

_$jscoverage['lib/tr8n.js'][1229]++;
Tr8n.Tokenizers.DomTokenizer.prototype.debugTree = function(node, depth) {
  _$jscoverage['lib/tr8n.js'][1230]++;
var padding = new Array(depth+1).join('=');

  _$jscoverage['lib/tr8n.js'][1232]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

  _$jscoverage['lib/tr8n.js'][1234]++;
if (node.childNodes) {
    _$jscoverage['lib/tr8n.js'][1235]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1236]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1237]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][1238]++;
self.debugTree(child, depth+1);
    }
  }
};

_$jscoverage['lib/tr8n.js'][1243]++;
Tr8n.Tokenizers.DomTokenizer.prototype.nodeInfo = function(node) {
  _$jscoverage['lib/tr8n.js'][1244]++;
var info = [];
  _$jscoverage['lib/tr8n.js'][1245]++;
info.push(node.nodeType);

  _$jscoverage['lib/tr8n.js'][1247]++;
if (node.nodeType == 1)
    {
_$jscoverage['lib/tr8n.js'][1248]++;
info.push(node.tagName);}


  _$jscoverage['lib/tr8n.js'][1250]++;
if (this.isInlineNode(node)) {
    _$jscoverage['lib/tr8n.js'][1251]++;
info.push("inline");
    _$jscoverage['lib/tr8n.js'][1252]++;
if (this.hasInlineOrTextSiblings(node))
      {
_$jscoverage['lib/tr8n.js'][1253]++;
info.push("sentence");}

    else
      {
_$jscoverage['lib/tr8n.js'][1255]++;
info.push("only translatable");}

  }

  _$jscoverage['lib/tr8n.js'][1258]++;
if (this.isSelfClosingNode(node))
    {
_$jscoverage['lib/tr8n.js'][1259]++;
info.push("self closing");}


  _$jscoverage['lib/tr8n.js'][1261]++;
if (this.isOnlyChild(node))
    {
_$jscoverage['lib/tr8n.js'][1262]++;
info.push("only child");}


  _$jscoverage['lib/tr8n.js'][1264]++;
if (node.nodeType == 3)
    {
_$jscoverage['lib/tr8n.js'][1265]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


  _$jscoverage['lib/tr8n.js'][1267]++;
return "[" + info.join(", ") + "]";
};
;;;;
_$jscoverage['lib/tr8n.js'][1270]++;
Tr8n.Application = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1271]++;
this.attrs = attrs;
};

_$jscoverage['lib/tr8n.js'][1274]++;
Tr8n.Application.prototype.language = function(locale) {
  _$jscoverage['lib/tr8n.js'][1275]++;
return null;
};;
_$jscoverage['lib/tr8n.js'][1277]++;
Tr8n.Source = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1278]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1281]++;
Tr8n.TranslationKey = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1282]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1285]++;
Tr8n.Translation = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1286]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1289]++;
Tr8n.Translator = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1290]++;
this.attrs = attrs;
};
;
_$jscoverage['lib/tr8n.js'][1293]++;
Tr8n.Language = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1294]++;
this.attrs = attrs;

  _$jscoverage['lib/tr8n.js'][1296]++;
this.contexts = [];
  _$jscoverage['lib/tr8n.js'][1297]++;
if (attrs.contexts) {
    _$jscoverage['lib/tr8n.js'][1298]++;
Object.keys(attrs.contexts).forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1299]++;
this.contexts.push(new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[key], {language: this})));
    }.bind(this));
  }

  _$jscoverage['lib/tr8n.js'][1303]++;
this.cases = [];
  _$jscoverage['lib/tr8n.js'][1304]++;
if (attrs.cases) {
    _$jscoverage['lib/tr8n.js'][1305]++;
Object.keys(attrs.cases).forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1306]++;
this.cases.push(new Tr8n.LanguageCase(Tr8n.Utils.extend(attrs.cases[key], {language: this})));
    }.bind(this));
  }
};

_$jscoverage['lib/tr8n.js'][1311]++;
Tr8n.Language.prototype.translate = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1312]++;
return label;
};
;
_$jscoverage['lib/tr8n.js'][1315]++;
Tr8n.LanguageCase = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1316]++;
this.attrs = attrs;

  _$jscoverage['lib/tr8n.js'][1318]++;
this.rules = [];
  _$jscoverage['lib/tr8n.js'][1319]++;
if (attrs.rules) {
    _$jscoverage['lib/tr8n.js'][1320]++;
attrs.rules.forEach(function(rule) {
      _$jscoverage['lib/tr8n.js'][1321]++;
this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(rule, {languageCase: this})));
    }.bind(this));
  }
};
;
_$jscoverage['lib/tr8n.js'][1326]++;
Tr8n.LanguageCaseRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1327]++;
this.attrs = attrs;
};

_$jscoverage['lib/tr8n.js'][1330]++;
Tr8n.LanguageCaseRule.conditionsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1331]++;
if (!this.attrs.conditions_expression)
    {
_$jscoverage['lib/tr8n.js'][1332]++;
this.attrs.conditions_expression = (new Tr8n.RulesEngine.Parser(this.attrs.conditions)).parse();}

  _$jscoverage['lib/tr8n.js'][1333]++;
return this.attrs.conditions_expression;
};

_$jscoverage['lib/tr8n.js'][1336]++;
Tr8n.LanguageCaseRule.operationsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1337]++;
if (!this.attrs.operations_expression)
    {
_$jscoverage['lib/tr8n.js'][1338]++;
this.attrs.operations_expression = (new Tr8n.RulesEngine.Parser(this.attrs.operations)).parse();}

  _$jscoverage['lib/tr8n.js'][1339]++;
return this.attrs.operations_expression;
};

_$jscoverage['lib/tr8n.js'][1342]++;
Tr8n.LanguageCaseRule.genderVariables = function(object) {
  _$jscoverage['lib/tr8n.js'][1343]++;
if (object == null)
    {
_$jscoverage['lib/tr8n.js'][1344]++;
return {gender: 'unknown'};}


  _$jscoverage['lib/tr8n.js'][1346]++;
if (this.attrs.conditions.indexOf("@gender") == -1)
    {
_$jscoverage['lib/tr8n.js'][1347]++;
return {};}


  _$jscoverage['lib/tr8n.js'][1349]++;
var context = this.languageCase.language.contextByKeyword("gender");

  _$jscoverage['lib/tr8n.js'][1351]++;
if (context == null)
    {
_$jscoverage['lib/tr8n.js'][1352]++;
return {gender: 'unknown'};}


  _$jscoverage['lib/tr8n.js'][1354]++;
return context.vars(object);
};

_$jscoverage['lib/tr8n.js'][1357]++;
Tr8n.LanguageCaseRule.evaluate = function(value, object) {
  _$jscoverage['lib/tr8n.js'][1358]++;
if (this.attrs.conditions == null)
    {
_$jscoverage['lib/tr8n.js'][1359]++;
return false;}


  _$jscoverage['lib/tr8n.js'][1361]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1362]++;
evaluator.setVars(Tr8n.Utils.extend({value: value}, this.genderVariables(object)));

  _$jscoverage['lib/tr8n.js'][1364]++;
return evaluator.evaluate(this.conditionsExpression());
};

_$jscoverage['lib/tr8n.js'][1367]++;
Tr8n.LanguageCaseRule.apply = function(value) {
  _$jscoverage['lib/tr8n.js'][1368]++;
if (this.attrs.operations == null)
    {
_$jscoverage['lib/tr8n.js'][1369]++;
return value;}


  _$jscoverage['lib/tr8n.js'][1371]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1372]++;
evaluator.setVars({value: value});

  _$jscoverage['lib/tr8n.js'][1374]++;
return evaluator.evaluate(this.operationsExpression());
};


;
_$jscoverage['lib/tr8n.js'][1379]++;
Tr8n.LanguageContext = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1380]++;
this.attrs = attrs;

  _$jscoverage['lib/tr8n.js'][1382]++;
this.rules = [];
  _$jscoverage['lib/tr8n.js'][1383]++;
if (attrs.rules) {
    _$jscoverage['lib/tr8n.js'][1384]++;
Object.keys(attrs.cases).forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1385]++;
this.cases.push(new Tr8n.LanguageContextRule(Tr8n.Utils.extend(attrs.rules[key], {languageContext: this})));
    }.bind(this));
  }
};

_$jscoverage['lib/tr8n.js'][1390]++;
Tr8n.LanguageContext.isAppliedToToken = function(token) {
  _$jscoverage['lib/tr8n.js'][1391]++;
return token.match(new RegExp(this.attrs.token_expression)) != null;
};

_$jscoverage['lib/tr8n.js'][1394]++;
Tr8n.LanguageContext.fallbackRule = function() {
  _$jscoverage['lib/tr8n.js'][1395]++;
if (!this.fallbackRule) {
    _$jscoverage['lib/tr8n.js'][1396]++;
Object.keys(this.rules).forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1397]++;
if (this.rules[key].isFallback()) {
        _$jscoverage['lib/tr8n.js'][1398]++;
this.fallbackRule = rule;
      }
    }.bind(this));
  }
  _$jscoverage['lib/tr8n.js'][1402]++;
return this.fallbackRule;
};

_$jscoverage['lib/tr8n.js'][1405]++;
Tr8n.LanguageContext.vars = function(obj) {
  _$jscoverage['lib/tr8n.js'][1406]++;
var vars = {};
  _$jscoverage['lib/tr8n.js'][1407]++;
var config = Tr8n.config.contextRules[this.attrs.keyword] || {};

  _$jscoverage['lib/tr8n.js'][1409]++;
this.attrs.variables.forEach(function(key) {
    _$jscoverage['lib/tr8n.js'][1410]++;
if (!config["variables"] || !config["variables"][key]) {
      _$jscoverage['lib/tr8n.js'][1411]++;
vars[key] = obj;
    } else {
      _$jscoverage['lib/tr8n.js'][1413]++;
var method = config["variables"][key];
      _$jscoverage['lib/tr8n.js'][1414]++;
if (typeof method === "string") {
        _$jscoverage['lib/tr8n.js'][1415]++;
if (obj["object"]) {
_$jscoverage['lib/tr8n.js'][1415]++;
obj = obj["object"];}

        _$jscoverage['lib/tr8n.js'][1416]++;
vars[key] = obj[method];
      } else {
_$jscoverage['lib/tr8n.js'][1417]++;
if (typeof method === "function") {
        _$jscoverage['lib/tr8n.js'][1418]++;
vars[key] = method(obj);
      } else {
        _$jscoverage['lib/tr8n.js'][1420]++;
vars[key] = obj;
      }}

    }
  });

  _$jscoverage['lib/tr8n.js'][1425]++;
return vars;
};

_$jscoverage['lib/tr8n.js'][1428]++;
Tr8n.LanguageContext.findMatchingRule = function(obj) {
  _$jscoverage['lib/tr8n.js'][1429]++;
var tokenVars = this.vars(obj);

  _$jscoverage['lib/tr8n.js'][1431]++;
for (var key in Object.keys(this.rules)) {
    _$jscoverage['lib/tr8n.js'][1432]++;
var rule = this.rules[key];
    _$jscoverage['lib/tr8n.js'][1433]++;
if (!rule.isFallback() && rule.evaluate(tokenVars))
        {
_$jscoverage['lib/tr8n.js'][1434]++;
return rule;}

  }

  _$jscoverage['lib/tr8n.js'][1437]++;
return this.fallbackRule();
};
;
_$jscoverage['lib/tr8n.js'][1440]++;
Tr8n.LanguageContextRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1441]++;
this.attrs = attrs;
};

_$jscoverage['lib/tr8n.js'][1444]++;
Tr8n.LanguageContextRule.isFallback = function() {
  _$jscoverage['lib/tr8n.js'][1445]++;
return (this.attrs.keyword == "other");
};

_$jscoverage['lib/tr8n.js'][1448]++;
Tr8n.LanguageContextRule.conditionsExpression = function() {
  _$jscoverage['lib/tr8n.js'][1449]++;
if (!this.attrs.conditions_expression)
    {
_$jscoverage['lib/tr8n.js'][1450]++;
this.attrs.conditions_expression = (new Tr8n.RulesEngine.Parser(this.attrs.conditions)).parse();}

  _$jscoverage['lib/tr8n.js'][1451]++;
return this.attrs.conditions_expression;
};

_$jscoverage['lib/tr8n.js'][1454]++;
Tr8n.LanguageContextRule.evaluate = function(vars) {
  _$jscoverage['lib/tr8n.js'][1455]++;
if (this.isFallback()) {
_$jscoverage['lib/tr8n.js'][1455]++;
return true;}


  _$jscoverage['lib/tr8n.js'][1457]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
  _$jscoverage['lib/tr8n.js'][1458]++;
evaluator.setVars(vars || {});

  _$jscoverage['lib/tr8n.js'][1460]++;
return evaluator.evaluate(this.conditionsExpression())
};

;
_$jscoverage['lib/tr8n.js'][1464]++;
var program = require('commander');
_$jscoverage['lib/tr8n.js'][1465]++;
var fs = require("fs");

_$jscoverage['lib/tr8n.js'][1467]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


_$jscoverage['lib/tr8n.js'][1475]++;
Tr8n.config = new Tr8n.Configuration();
_$jscoverage['lib/tr8n.js'][1476]++;
fs.readFile("./../config/languages/en-US.json", function (err, data) {
  _$jscoverage['lib/tr8n.js'][1477]++;
if (err) {
_$jscoverage['lib/tr8n.js'][1477]++;
throw err;}

  _$jscoverage['lib/tr8n.js'][1478]++;
Tr8n.config.currentLanguage = new Tr8n.Language(data);
});



_$jscoverage['lib/tr8n.js'][1483]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][1484]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][1485]++;
exports.Tokens = Tr8n.Tokens;
_$jscoverage['lib/tr8n.js'][1486]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][1487]++;
exports.Utils = Tr8n.Utils;
_$jscoverage['lib/tr8n.js'][1488]++;
exports.Language = Tr8n.Language;
_$jscoverage['lib/tr8n.js'][1489]++;
exports.Application = Tr8n.Application;


_$jscoverage['lib/tr8n.js'][1492]++;
exports.configure = function(callback) {
  _$jscoverage['lib/tr8n.js'][1493]++;
callback(Tr8n.config);
};

_$jscoverage['lib/tr8n.js'][1496]++;
exports.tr = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][1497]++;
return label;
};
