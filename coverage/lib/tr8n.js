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
'Tr8n.Utils = {',
'',
'  hashValue: function(hash, key, defaultValue) {',
'    defaultValue = defaultValue || null;',
'    var parts = key.split(".");',
'    for(var i=0; i<parts.length; i++) {',
'      var part = parts[i];',
'      if (typeof hash[part] === "undefined") return defaultValue;',
'      hash = hash[part];',
'    }',
'    return hash;',
'  },',
'  ',
'  stripTags: function(input, allowed) {',
'    allowed = (((allowed || \'\') + \'\')',
'      .toLowerCase()',
'      .match(/<[a-z][a-z0-9]*>/g) || [])',
'      .join(\'\');     var tags = /<\\/?([a-z][a-z0-9]*)\\b[^>]*>/gi,',
'      commentsAndPhpTags = /<!--[\\s\\S]*?-->|<\\?(?:php)?[\\s\\S]*?\\?>/gi;',
'    return input.replace(commentsAndPhpTags, \'\')',
'      .replace(tags, function($0, $1) {',
'        return allowed.indexOf(\'<\' + $1.toLowerCase() + \'>\') > -1 ? $0 : \'\';',
'      });',
'  },',
'  ',
'  splitSentences: function(text) {',
'    var sentenceRegex = /[^.!?\\s][^.!?]*(?:[.!?](?![\\\'"]?\\s|$)[^.!?]*)*[.!?]?[\\\'"]?(?=\\s|$)/g;',
'    return Tr8n.Utils.stripTags(text).match(sentenceRegex);',
'  },',
'  ',
'  unique: function(elements) {',
'    return elements.reverse().filter(function (e, i, arr) {',
'      return arr.indexOf(e, i+1) === -1;',
'    }).reverse();',
'  },',
'  ',
'  extend: function(destination, source) {',
'    for (var property in source)',
'      destination[property] = source[property];',
'    return destination;',
'  },',
'  ',
'  clone: function(obj) {',
'    if(obj == null || typeof(obj) != \'object\')',
'      return obj;',
'  ',
'    var temp = obj.constructor();   ',
'    for(var key in obj)',
'      temp[key] = clone(obj[key]);',
'    return temp;',
'  },',
'  ',
'  keys: function(obj) {',
'        return Object.keys(obj);',
'  },',
'  ',
'  generateKey: function(label, description) {',
'    return MD5(label + ";;;" + description);',
'  }',
'',
'};;',
'Tr8n.Configuration = function() {',
'  this.initDefaultTokens();',
'  this.initTranslatorOptions();',
'  this.initContextRules();',
'  this.enabled = true;',
'  this.default_locale = "en-US";',
'};',
'',
'Tr8n.Configuration.prototype = {',
'  initDefaultTokens: function() {',
'    this.default_tokens = {',
'        html : {',
'          data : {',
'            ndash  :  "&ndash;",                   mdash  :  "&mdash;",                   iexcl  :  "&iexcl;",                   iquest :  "&iquest;",                  quot   :  "&quot;",                    ldquo  :  "&ldquo;",                   rdquo  :  "&rdquo;",                   lsquo  :  "&lsquo;",                   rsquo  :  "&rsquo;",                   laquo  :  "&laquo;",                   raquo  :  "&raquo;",                   nbsp   :  "&nbsp;",                    lsaquo :  "&lsaquo;",                  rsaquo :  "&rsaquo;",                  br     :  "<br/>",                     lbrace :  "{",',
'            rbrace :  "}",',
'            trade  :  "&trade;"                 },',
'          decoration : {',
'            strong :  "<strong>{$0}</strong>",',
'            bold   :  "<strong>{$0}</strong>",',
'            b      :  "<strong>{$0}</strong>",',
'            em     :  "<em>{$0}</em>",',
'            italic :  "<i>{$0}</i>",',
'            i      :  "<i>{$0}</i>",',
'            link   :  "<a href=\'{$href}\'>{$0}</a>",',
'            br     :  "<br>{$0}",',
'            strike :  "<strike>{$0}</strike>",',
'            div    :  "<div id=\'{$id}\' class=\'{$class}\' style=\'{$style}\'>{$0}</div>",',
'            span   :  "<span id=\'{$id}\' class=\'{$class}\' style=\'{$style}\'>{$0}</span>",',
'            h1     :  "<h1>{$0}</h1>",',
'            h2     :  "<h2>{$0}</h2>",',
'            h3     :  "<h3>{$0}</h3>"',
'          }',
'        },',
'        text : {',
'          data : {',
'            ndash  :  "–",',
'            mdash  :  "-",',
'            iexcl  :  "¡",',
'            iquest :  "¿",',
'            quot   :  \'"\',',
'            ldquo  :  "“",',
'            rdquo  :  "”",',
'            lsquo  :  "‘",',
'            rsquo  :  "’",',
'            laquo  :  "«",',
'            raquo  :  "»",',
'            nbsp   :  " ",',
'            lsaquo :  "‹",',
'            rsaquo :  "›",',
'            br     :  "\\n",',
'            lbrace :  "{",',
'            rbrace :  "}",',
'            trade  :  "™"',
'          },',
'          decoration : {',
'            strong :  "{$0}",',
'            bold   :  "{$0}",',
'            b      :  "{$0}",',
'            em     :  "{$0}",',
'            italic :  "{$0}",',
'            i      :  "{$0}",',
'            link   :  "{$0}{$1}",',
'            br     :  "\\n{$0}",',
'            strike :  "{$0}",',
'            div    :  "{$0}",',
'            span   :  "{$0}",',
'            h1     :  "{$0}",',
'            h2     :  "{$0}",',
'            h3     :  "{$0}"',
'          }',
'        }',
'      };',
'',
'  },',
'',
'  getDefaultToken: function(token, type, format) {',
'    type = type || "data"; format = format || "html";',
'    if (typeof this.default_tokens[format][type][token] === \'undefined\') return null;',
'    return new String(this.default_tokens[format][type][token]);',
'  },',
'',
'  setDefaultToken: function(token, value, type, format) {',
'    type = type || "data"; format = format || "html";',
'    this.default_tokens[format] = this.default_tokens[format] || {};',
'    this.default_tokens[format][type] = this.default_tokens[format][type] || {};',
'    this.default_tokens[format][type][token] = value;',
'  },',
'',
'  initTranslatorOptions: function() {',
'    this.translator_options = {',
'      "debug": true,',
'      "debug_format_html": "<span style=\'font-size:20px;color:red;\'>{<\\/span> {$0} <span style=\'font-size:20px;color:red;\'>}<\\/span>",',
'      "debug_format": "{{{{$0}}}}",',
'      "split_sentences": false,',
'      "nodes": {',
'        "ignored":    [],',
'        "scripts":    ["style", "script"],',
'        "inline":     ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup"],',
'        "short":      ["i", "b"],',
'        "splitters":  ["br", "hr"]',
'      },',
'      "attributes": {',
'        "labels": ["title", "alt"]',
'      },',
'      "name_mapping": {',
'        "b": "bold",',
'        "i": "italic",',
'        "a": "link",',
'        "img": "picture"',
'      },',
'      "data_tokens": {',
'        "special": false,',
'        "numeric": false,',
'        "numeric_name": "num"',
'      }',
'    }',
'  },',
'',
'  initContextRules: function() {',
'    this.context_rules = {',
'      number: {',
'        variables: {}',
'      },',
'      gender: {',
'        variables: {',
'          "@gender": "gender"',
'        }',
'      },',
'      genders: {',
'        variables: {',
'          "@genders": function(list) {',
'            var genders = [];',
'            list.forEach(function(obj) {',
'              genders.push(obj.gender);',
'            });',
'            return genders;',
'          }',
'        }',
'      },',
'      date: {',
'        variables: {}',
'      },',
'      time: {',
'        variables: {}',
'      }',
'    };',
'  },',
'',
'  getContextRules: function(key) {',
'    return this.context_rules[key] || {};',
'  },',
'',
'  isDisabled: function() {',
'    return !enabled;',
'  },',
'',
'  isEnabled: function() {',
'    return enabled;',
'  },',
'',
'  getTokenObject: function(tokens, name) {',
'    if (tokens == null) return null;',
'',
'    var object = tokens[name];',
'    if (typeof object === \'array\')',
'      return object[0];',
'',
'    return object.object || object;',
'  },',
'',
'  getSupportedTokens: function() {',
'    return [',
'      [/(\\{[^_:][\\w]*(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Data],',
'      [/(\\{[^_:.][\\w]*(\\.[\\w]+)(:[\\w]+)*(::[\\w]+)*\\})/, Tr8n.Tokens.Method],',
'      [/(\\{[^_:|][\\w]*(:[\\w]+)*(::[\\w]+)*\\s*\\|\\|?[^{^}]+\\})/, Tr8n.Tokens.Piped]',
'    ];',
'  }',
'',
'};;',
'Tr8n.Tokens.Data = function(name, label) {',
'  this.full_name = name;',
'  this.label = label;',
'  this.parseElements();',
'};',
'',
'Tr8n.Tokens.Data.prototype = {',
'  parseElements: function() {',
'    var name_without_parens = this.full_name.substring(1, this.full_name.length-1);',
'    var name_without_case_keys = name_without_parens.split(\'::\')[0].trim();',
'  ',
'    this.short_name = name_without_parens.split(\':\')[0].trim();',
'    this.case_keys = [];',
'  ',
'    var keys = name_without_parens.match(/(::\\s*\\w+)/g) || [];',
'    for (var i=0; i<keys.length; i++) {',
'      this.case_keys.push(keys[i].replace(/[:]/g, "").trim());',
'    }',
'  ',
'    this.context_keys = [];',
'    keys = name_without_case_keys.match(/(:\\s*\\w+)/g) || [];',
'    for (i=0; i<keys.length; i++) {',
'      this.context_keys.push(keys[i].replace(/[:]/g, "").trim());',
'    }',
'  },',
'  ',
'  getContextForLanguage: function(language) {',
'    if (this.context_keys.length > 0)',
'      return language.getContextByKeyword(this.context_keys[0]);',
'  ',
'    return language.getContextByTokenName(this.short_name);',
'  },',
'  ',
'  tokenObject: function(tokens, name) {',
'    if (tokens == null) return null;',
'  ',
'    var object = tokens[name];',
'    if (typeof object === \'array\')',
'      return object[0];',
'  ',
'    return object.object || object;',
'  },',
'  ',
'  error: function(msg) {',
'    console.log(this.full_name + " in \\"" + this.label + "\\" : " + msg);',
'    return this.full_name;',
'  },',
'  ',
'    ',
'  getTokenValueFromArrayParam: function(arr, language, options) {',
'    options = options || {};',
'    if (arr.lenght == 0)',
'      return this.error("Invalid number of params of an array");',
'  ',
'    var object = arr[0];',
'    var method = arr.lenght > 1 ? arr[1] : null;',
'  ',
'    if (typeof object === "array")',
'      return this.getTokenValueFromArray(arr, language, options);',
'  ',
'    if (method == null)',
'      return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  ',
'    if (method.match(/^@@/))',
'      return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  ',
'    if (method.match(/^@/))',
'      return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  ',
'    return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));',
'  },',
'  ',
'  ',
'    ',
'  getTokenValueFromHashParam: function(hash, language, options) {',
'    options = options || {};',
'    var value = hash.value;',
'    var object = hash.object;',
'  ',
'    if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));',
'    if (!object) return this.error("No object or value are provided in the hash");',
'  ',
'    var attr = hash.attribute;',
'  ',
'    if (!attr) return this.error("Missing value for hash token");',
'  ',
'    return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  },',
'  ',
'  ',
'    ',
'  getTokenValueFromArray: function(params, language, options) {',
'    var list_options = {',
'      description: "List joiner",',
'      limit: 4,',
'      separator: ", ",',
'      joiner: \'and\',',
'      less: \'{laquo} less\',',
'      expandable: true,',
'      collapsable: true',
'    };',
'  ',
'    var objects = params[0];',
'    var method = (params.length > 1 ? params[1] : null);',
'  ',
'    if (params.length > 2)',
'      list_options = Tr8n.Utils.merge(list_options, params[2]);',
'  ',
'    if (options["skip_decorations"])',
'      list_options.expandable = false;',
'  ',
'    var values = [];',
'    for (var obj in objects) {',
'      if (method == null) {',
'        values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'      } else if (typeof method === "string") {',
'        if (method.match(/^@@/))',
'          values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'        else if (method.match(/^@/))',
'          values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));',
'        else',
'          values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));',
'      } else if (typeof method === "object") {',
'        var attribute = method.attribute;',
'        var value = method.value;',
'  ',
'        if (attribute == null)',
'          return this.error("No attribute is provided for the hash object in the array");',
'  ',
'        if (!object[attribute])',
'          return this.error("Hash object in the array does not contain such attribute");',
'  ',
'        attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  ',
'        if (value)',
'          values.push(value.replace("{$0}", attribute));',
'        else',
'          values.push(attribute);',
'      } else if (typeof method === "function") {',
'        values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));',
'      }',
'    }',
'  ',
'    if (values.lenght == 1)',
'      return values[0];',
'  ',
'    if (!list_options.joiner || list_options.joiner == "")',
'      return values.join(list_options.separator);',
'  ',
'    var joiner = language.translate(list_options.joiner, list_options.description, {}, options);',
'  ',
'    if (values.length <= list_options.limit) {',
'      var last = values.pop();',
'      return values.join(list_options.separator) + " " + joiner + " " + last;',
'    }',
'  ',
'    var displayed_values = values.slice(0, list_options.limit);',
'    var remaining_values = values.slice(list_options.limit);',
'  ',
'    var result = displayed_values.join(list_options.separator);',
'    var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);',
'  ',
'    if (list_options.expandable) {',
'      result = result + " " + joiner + " ";',
'      if (list_options.remainder && typeof list_options.remainder === "function")',
'        return result + list_options.remainder(remaining_values);',
'      return result + other_values;',
'    }',
'  ',
'    var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));',
'  ',
'    result = result + \'<span id="tr8n_other_link_\' + key + \'"> \' + joiner + \' \';',
'    result = result + \'<a href="#" class="tr8n_other_list_link" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'none\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'inline\'; return false;" + \'">\';',
'  ',
'    if (list_options.remainder && typeof list_options.remainder === "function")',
'      result = result + list_options.remainder(remaining_values);',
'    else',
'      result = result + other_values;',
'  ',
'    result = result + "</a></span>";',
'  ',
'    result = result + \'<span id="tr8n_other_elements_\' + key + \'" style="display:none">\' + list_options.separator;',
'    var last_remaining = remaining_values.pop();',
'    result = result + remaining_values.join(list_options.separator);',
'    result = result + " " + joiner + " " + last_remaining;',
'  ',
'    if (list_options.collapsable) {',
'      result = result + \' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="\' + "document.getElementById(\'tr8n_other_link_key\').style.display=\'inline\'; document.getElementById(\'tr8n_other_elements_key\').style.display=\'none\'; return false;" + \'">\';',
'      result = result + language.translate(list_options.less, list_options["description"], {}, options);',
'      result = result + "</a>";',
'    }',
'  ',
'    result = result + "</span>";',
'    return result;',
'  },',
'  ',
'  getTokenValue: function(tokens, language, options) {',
'    options = options || {};',
'    var object = null;',
'  ',
'    if (tokens[this.short_name])',
'      object = tokens[this.short_name];',
'    else',
'      object = Tr8n.config.getDefaultToken(this.short_name);',
'  ',
'    if (!object)',
'      return this.error("Missing token value");',
'  ',
'    if (typeof object === "array") {',
'      return this.getTokenValueFromArrayParam(object, language, options);',
'    }',
'  ',
'    if (typeof object === "object") {',
'      return this.getTokenValueFromHashParam(object, language, options);',
'    }',
'  ',
'    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));',
'  },',
'  ',
'  applyCase: function(key, value, object, language, options) {',
'    var lcase = language.getLanguageCaseByKeyword(key);',
'    if (!lcase) return value;',
'    return lcase.apply(value, object, options);',
'  },',
'  ',
'  sanitize: function(value, object, language, options) {',
'    value = "" + value;',
'  ',
'    if (!options.safe) {',
'      value = escape(value);',
'    }',
'  ',
'    if (this.case_keys.length > 0) {',
'      for (var i=0; i<this.case_keys.length; i++) {',
'        value = this.applyCase(this.case_keys[i], value, object, language, options);',
'      }',
'    }',
'  ',
'    return value;',
'  },',
'  ',
'  substitute: function(label, tokens, language, options) {',
'    return label.replace(this.full_name, this.getTokenValue(tokens, language, options));',
'  }',
'  ',
'};;',
'Tr8n.Tokens.Method = function() {',
'  Tr8n.Tokens.Data.apply(this, arguments);',
'};',
'',
'Tr8n.Tokens.Method.prototype = Tr8n.Tokens.Data.prototype;',
'Tr8n.Tokens.Method.prototype.constructor = Tr8n.Tokens.Data;',
'',
'Tr8n.Tokens.Method.prototype.initObject = function() {',
'  var parts = this.short_name.split(\'.\');',
'  this.object_name = parts[0];',
'  this.object_method = parts[1];',
'};',
'',
'Tr8n.Tokens.Method.prototype.getObjectName = function() {',
'  if (!this.object_name) {',
'    this.initObject();',
'  }',
'  return this.object_name;',
'};',
'',
'Tr8n.Tokens.Method.prototype.getObjectMethod = function() {',
'  if (!this.object_method) {',
'    this.initObject();',
'  }',
'  return this.object_method;',
'};',
'',
'Tr8n.Tokens.Method.prototype.substitute = function(label, tokens, language, options) {',
'  var name = this.getObjectName();',
'  var object = Tr8n.Utils.tokenObject(tokens, name);',
'  if (!object) return this.error("Missing value for token");',
'',
'  var method = this.getObjectMethod();',
'',
'  return label.replace(this.full_name,',
'    this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}))',
'  );',
'};',
'',
';',
'',
'',
'Tr8n.Tokens.Piped = function() {',
'  Tr8n.Tokens.Data.apply(this, arguments);',
'};',
'',
'Tr8n.Tokens.Piped.prototype = Tr8n.Tokens.Data.prototype;',
'Tr8n.Tokens.Piped.prototype.constructor = Tr8n.Tokens.Data;',
'',
'Tr8n.Tokens.Piped.prototype.parseElements = function() {',
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
'Tr8n.Tokens.Piped.prototype.isValueDisplayedInTranslation = function() {',
'  return (this.separator == \'||\');',
'};',
'',
'',
'Tr8n.Tokens.Piped.prototype.generateValueMapForContext = function(context) {',
'  var values = {};',
'',
'  if (this.parameters[0].indexOf(\':\') != -1) {',
'    for (var i=0; i<this.parameters.length; i++) {',
'      var name_value = this.parameters[i].split(":");',
'      values[name_value[0].trim()] = name_value[1].trim();',
'    }',
'    return values;',
'  }',
'',
'  var token_mapping = context.token_mapping;',
'',
'  if (!token_mapping) {',
'    this.error("The token context " + context.keyword + "does not support transformation for unnamed params");',
'    return null;',
'  }',
'',
'    if (typeof token_mapping == "string") {',
'    this.error("The token mapping " + token_mapping + " does not support the parameters.");',
'    return null;',
'  }',
'',
'    if (typeof token_mapping == "array") {',
'    if (this.parameters.length > token_mapping.length) {',
'      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");',
'      return null;',
'    }',
'',
'    token_mapping = token_mapping[this.parameters.length-1];',
'    if (typeof token_mapping == "string") {',
'      this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");',
'      return null;',
'    }',
'  }',
'',
'    var keys = Tr8n.Utils.keys(token_mapping);',
'  for (i=0; i<keys.length; i++) {',
'    var key = keys[i];',
'    var value = token_mapping[key];',
'    values[key] = value;',
'',
'        keys = value.match(/{\\$\\d(::[\\w]+)*\\}/g);',
'',
'    for (var j=0; j<keys.length; j++) {',
'      var token = keys[j];',
'      var token_without_parens = token.replace(/[\\{\\}]/g, \'\');',
'      var parts = token_without_parens.split(\'::\');',
'      var index = parseInt(parts[0].replace(/[$]/, \'\'));',
'',
'      if (this.parameters.length < index) {',
'        this.error("The index inside " + token_mapping + " is out of bound: " + this.full_name);',
'        return null;',
'      }',
'',
'      var val = this.parameters[index];',
'',
'      ',
'      parts.pop();',
'      for (var k=0; k<parts.length; k++) {',
'        var language_case = context.language.getLanguageCaseByKeyword(parts[k]);',
'        if (language_case) val = language_case.apply(val);',
'      }',
'',
'      values[key] = values[key].replace(tkey, val);',
'    }',
'  }',
'',
'  return values;',
'};',
'',
'Tr8n.Tokens.Piped.prototype.substitute = function(label, tokens, language, options) {',
'  if (!tokens[this.short_name]) {',
'    this.error("Missing value");',
'    return label;',
'  }',
'',
'  var object = this.tokenObject(tokens, this.short_name);',
'',
'  if (this.parameters.length == 0) {',
'    this.error("Piped params may not be empty");',
'    return label;',
'  }',
'',
'  var context = this.getContextForLanguage(language);',
'',
'  var piped_values = this.generateValueMapForContext(context);',
'',
'  if (!piped_values) return label;',
'',
'  var rule = context.findMatchingRule(object);',
'',
'  if (rule == null) return label;',
'',
'  var value = piped_values[rule.keyword];',
'  if (!value) {',
'    var fallback_rule = context.getFallbackRule();',
'    if (fallback_rule && piped_values[fallback_rule.keyword]) {',
'      value = piped_values[fallback_rule.keyword];',
'    } else {',
'      return label;',
'    }',
'  }',
'',
'  var token_value = [];',
'  if (this.isValueDisplayedInTranslation()) {',
'    token_value.push(this.tokenValue(tokens, language, options));',
'    token_value.push(" ");',
'  } else {',
'    value = value.replace("#" + this.short_name + "#", this.tokenValue(tokens, language, options));',
'  }',
'  token_value.push(value);',
'',
'  return label.replace(this.full_name, token_value.join(""));',
'};',
'',
'',
';',
'Tr8n.RulesEngine.Evaluator = function(ctx) {',
'  this.vars = {};',
'  this.ctx = ctx || {',
'',
'    \'label\'   : function(l, r)    { this.vars[l] = this.ctx[l] = r; return r; },',
'    \'quote\'   : function(expr)    { return expr; },',
'    \'car\'     : function(list)    { return list[1]; },',
'    \'cdr\'     : function(list)    { list.shift(); return list; },',
'    \'cons\'    : function(e, cell) { cell.unshift(e); return cell; },',
'    \'eq\'      : function(l, r)    { return (l == r); },',
'    \'atom\'    : function(a)       { return !(typeof a in {\'object\':1, \'array\':1, \'function\':1}); },',
'    \'cond\'    : function(c, t, f) { return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); },',
'  ',
'    \'set\'     : function(l, r){ this.vars[l] = this.ctx[l] = r; return r; },',
'',
'    \'=\'       : function(l, r)    {return l == r },                                                         \'!=\'      : function(l, r)    {return l != r },                                                         \'<\'       : function(l, r)    {return l < r },                                                          \'>\'       : function(l, r)    {return l > r },                                                          \'+\'       : function(l, r)    {return l + r },                                                          \'-\'       : function(l, r)    {return l - r },                                                          \'*\'       : function(l, r)    {return l * r },                                                          \'%\'       : function(l, r)    {return l % r },                                                          \'mod\'     : function(l, r)    {return l % r },                                                          \'/\'       : function(l, r)    {return (l * 1.0) / r },                                                  \'!\'       : function(expr)    {return !expr },                                                          \'not\'     : function(val)     {return !val },                                                       ',
'    \'&&\'      : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                \'and\'     : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                \'||\'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},      \'or\'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},  ',
'    \'if\'      : function(c,t,f)   {return this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)},          \'let\'     : function(l, r)    {return this.vars[l] = r },                                               \'true\'    : function()        {return true },                                                           \'false\'   : function()        {return false },                                                      ',
'    \'date\'    : function(date)    {return new Date(date) },                                                 \'today\'   : function()        {return new Date() },                                                     \'time\'    : function(expr)    {return new Date(expr) },                                                 \'now\'     : function()        {return Date.now() },                                                 ',
'    \'append\'  : function(l, r)    {return String(r) + String(l) },                                          \'prepend\' : function(l, r)    {return String(l) + String(r) },                                      ',
'    \'match\'   : function(search, subject) {                                                                   search = this._stringToRegexp(search);',
'      return !!subject.match(search);',
'    },',
'',
'    \'in\'      : function(values, search) {                                                                    var bounds, range = this._range;',
'      values = values',
'        .replace(/\\s/g,\'\')',
'        .replace(/(\\w+)\\.\\.(\\w+)/g, function(x,f,l){',
'          bounds = range(f,l);',
'          bounds.push(l);',
'          return bounds.join()',
'        });',
'      return values',
'        .split(\',\')',
'        .indexOf(String(search)) != -1;',
'    },',
'',
'    \'within\'  : function(values, search) {                                                                   var ',
'        bounds = values.split(\'..\').map(function(d){return parseInt(d)})',
'      return (bounds[0] <= search && search <= bounds[1])',
'    },',
'',
'    \'replace\' : function(search, replace, subject) {                                                        search = this._stringToRegexp(search);',
'      return subject.replace(search, replace);',
'    },',
'',
'    \'count\'   : function(list){                                                                             return (typeof(list) == "string" ? this.vars[list] : list).length',
'    },',
'',
'    \'all\'     : function(list, value) {                                                                     list = (typeof(list) == "string") ? this.vars[list] : list;',
'      return (list instanceof Array) ? list.every(function(e){return e == value}) : false;',
'    },',
'    ',
'    \'any\'     : function(list, value) {                                                                     list = (typeof(list) == "string") ? this.vars[list] : list;',
'      return (list instanceof Array) ? !!list.filter(function(e){return e == value}) : false;',
'    }',
'',
'  };',
'  return this;',
'};',
'',
'Tr8n.RulesEngine.Evaluator.prototype = {',
'',
'  _range: function(start, end) {',
'    var ',
'      range = [],',
'      is_string = !String(start).match(/^\\d+$/);',
'',
'    start = (is_string) ? start.charCodeAt(0) : parseInt(start);',
'    end   = (is_string) ? end.charCodeAt(0)   : parseInt(end);',
'',
'    while (end >= start) {',
'      range.push(is_string ? String.fromCharCode(start) : String(start));',
'      start += 1;',
'    }',
'',
'    return range;',
'  },',
'',
'  _stringToRegexp: function(str) {',
'    var re = new RegExp("^\\/","g");',
'    if(!str.match(re)) {',
'      return new RegExp(str,"g");',
'    }',
'    str = str.replace(re, \'\');',
'    if (str.match(/\\/i$/)) {',
'      str = str.replace(/\\/i$/g, \'\')',
'      return new RegExp(str,"ig")',
'    }',
'    str = str.replace(/\\/$/, \'\')',
'    return new RegExp(str,"g");',
'  },',
'',
'  setVars: function(vars) {',
'    this.vars = vars;',
'  },',
'',
'  getVars: function() {',
'    return this.vars;',
'  },',
'',
'  apply: function(fn, args) {',
'    if (typeof this.ctx[fn] == \'function\') {',
'      return this.ctx[fn].apply(this,args);',
'    }',
'    return this.ctx[fn]',
'  },',
'',
'  evaluate: function(expr) {',
'    if (this.ctx[\'atom\'].call(this, expr)) {',
'      if (typeof expr == "string" && this.vars[expr]) return this.vars[expr];',
'      return (expr in this.ctx ? this.ctx[expr] : expr);',
'    }',
'    var ',
'      fn    = expr[0],',
'      args  = expr.slice(1);',
'',
'    if([\'quote\',\'car\',\'cdr\',\'cond\',\'if\',\'&&\',\'||\',\'and\',\'or\',\'true\',\'false\',\'let\',\'count\',\'all\',\'any\'].indexOf(fn) == -1) {',
'      args = args.map(this.evaluate.bind(this))',
'    }',
'    return this.apply(fn,args)',
'  }',
'};',
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
'Tr8n.Tokenizers.Data.prototype = {',
'',
'  tokenize: function() {',
'    this.tokens = [];',
'    var tokens = Tr8n.config.getSupportedTokens();',
'    for (var i=0; i<tokens.length; i++) {',
'      var matches = this.label.match(tokens[i][0]) || [];',
'      for (var i=0; i<matches.length; i++) {',
'          this.tokens.push(new tokens[i][1](matches[i], this.label));',
'      }',
'    }',
'  },',
'',
'  isTokenAllowed: function(token) {',
'    if (this.options.allowed_tokens) return true;',
'    return (this.options.allowed_tokens.indexOf(token.name) != -1);',
'  },',
'',
'  substitute: function(language, options) {',
'    var label = this.label;',
'    for (var i=0; i<this.tokens.length; i++) {',
'      var token = this.tokens[i];',
'      if (this.isTokenAllowed(token)) {',
'        label = token.substitute(label, this.context, language, options);',
'      }',
'    }',
'    return label;',
'  }',
'',
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
'Tr8n.Tokenizers.Decoration.prototype = {',
'',
'  tokenize: function() {',
'    var expression = new RegExp([',
'      RE_SHORT_TOKEN_START,',
'      RE_SHORT_TOKEN_END,',
'      RE_LONG_TOKEN_START,',
'      RE_LONG_TOKEN_END,',
'      RE_TEXT',
'    ].join("|"), "g");',
'',
'    this.fragments = this.label.match(expression);',
'    return this.fragments;',
'  },',
'',
'  peek: function() {',
'    if (this.fragments.length == 0) return null;',
'    return this.fragments[0];',
'  },',
'',
'  getNextFragment: function() {',
'    if (this.fragments.length == 0) return null;',
'    return this.fragments.shift();',
'  },',
'',
'  parse: function() {',
'    var token = this.getNextFragment();',
'    if (token.match(new RegExp(RE_SHORT_TOKEN_START)))',
'      return this.parseTree(token.replace(/[\\[:]/g, \'\'), TOKEN_TYPE_SHORT);',
'    if (token.match(new RegExp(RE_LONG_TOKEN_START)))',
'      return this.parseTree(token.replace(/[\\[\\]]/g, \'\'), TOKEN_TYPE_LONG);',
'    return token;',
'  },',
'',
'  parseTree: function(name, type) {',
'    var tree = [name];',
'    if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)',
'      this.tokens.push(name);',
'',
'    if (type == TOKEN_TYPE_SHORT) {',
'      var first = true;',
'      while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {',
'        var value = this.parse();',
'        if (first && typeof value == "string") {',
'          value = value.replace(/^\\s+/,\'\');',
'          first = false;',
'        }',
'        tree.push(value);',
'      }',
'    } else if (type == TOKEN_TYPE_LONG) {',
'      while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {',
'        tree.push(this.parse());',
'      }',
'    }',
'',
'    this.getNextFragment();',
'    return tree;',
'  },',
'',
'  isTokenAllowed: function(token) {',
'    return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);',
'  },',
'',
'  getDefaultDecoration: function(token, value) {',
'    var default_decoration = Tr8n.config.getDefaultToken(token, "decoration");',
'    if (default_decoration == null) return value;',
'',
'    var decoration_token_values = this.context[token];',
'    default_decoration = default_decoration.replace(PLACEHOLDER, value);',
'',
'    if (decoration_token_values instanceof Object) {',
'      var keys = Tr8n.Utils.keys(decoration_token_values);',
'      for (var i = 0; i < keys.length; i++) {',
'        default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);',
'      }',
'    }',
'',
'    return default_decoration;',
'  },',
'',
'  apply: function(token, value) {',
'    if (token == RESERVED_TOKEN) return value;',
'    if (!this.isTokenAllowed(token)) return value;',
'',
'    var method = this.context[token];',
'',
'    if (method != null) {',
'      if (typeof method === \'string\')',
'        return method.replace(PLACEHOLDER, value);',
'',
'      if (typeof method === \'function\')',
'        return method(value);',
'',
'      if (typeof method === \'object\')',
'        return this.getDefaultDecoration(token, value);',
'',
'      return value;',
'    }',
'',
'    return this.getDefaultDecoration(token, value);',
'  },',
'',
'  evaluate: function(expr) {',
'    if (!(expr instanceof Array)) return expr;',
'',
'    var token = expr[0];',
'    expr.shift();',
'    var self = this;',
'    var value = [];',
'    expr.forEach(function(obj, index) {',
'      value.push(self.evaluate(obj));',
'    });',
'    return this.apply(token, value.join(\'\'));',
'  },',
'',
'  substitute: function(language, options) {',
'    return this.evaluate(this.parse());',
'  }',
'',
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
'Tr8n.Tokenizers.Dom.prototype = {',
'',
'  translate: function() {',
'    return this.translateTree(this.doc);',
'  },',
'',
'  translateTree: function(node) {',
'    if (this.isNonTranslatableNode(node)) {',
'      if (node.childNodes.length == 1)',
'        return node.childNodes[0].nodeValue;',
'      return "";',
'    }',
'',
'    if (node.nodeType == 3)',
'      return this.translateTml(node.nodeValue);',
'',
'    var html = "";',
'    var buffer = "";',
'',
'    for(var i=0; i<node.childNodes.length; i++) {',
'      var child = node.childNodes[i];',
'',
'  ',
'      if (child.nodeType == 3) {',
'        buffer = buffer + child.nodeValue;',
'      } else if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {          buffer = buffer + this.generateTmlTags(child);',
'      } else if (this.isSeparatorNode(child)) {            if (buffer != "")',
'          html = html + this.translateTml(buffer);',
'        html = html + this.generateHtmlToken(child);',
'        buffer = "";',
'      } else {',
'        if (buffer != "")',
'          html = html + this.translateTml(buffer);',
'',
'        var containerValue = this.translateTree(child);',
'        if (this.isIgnoredNode(child)) {',
'          html = html + containerValue;',
'        } else {',
'          html = html + this.generateHtmlToken(child, containerValue);',
'        }',
'',
'        buffer = "";',
'      }',
'    }',
'',
'    if (buffer != "") {',
'      html = html + this.translateTml(buffer);',
'    }',
'',
'    return html;',
'  },',
'',
'  isNonTranslatableNode: function(node) {',
'    if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)',
'      return true;',
'    if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")',
'      return true;',
'    return false;',
'  },',
'',
'  translateTml: function(tml) {',
'    if (this.isEmptyString(tml)) return tml;',
'',
'  ',
'    if (this.getOption("split_sentences")) {',
'      sentences = Tr8n.Utils.splitSentences(tml);',
'      translation = tml;',
'      var self = this;',
'      sentences.forEach(function(sentence) {',
'        var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);',
'        translation = translation.replace(sentence, sentenceTranslation);',
'      });',
'      this.resetContext();',
'      return translation;',
'    }',
'',
'    translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);',
'    this.resetContext();',
'    return translation;',
'  },',
'',
'  hasChildNodes: function(node) {',
'    if (!node.childNodes) return false;',
'    return (node.childNodes.length > 0);',
'  },',
'',
'  isBetweenSeparators: function(node) {',
'    if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))',
'      return true;',
'',
'    if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))',
'      return true;',
'',
'    return false;',
'  },',
'',
'  generateTmlTags: function(node) {',
'    var buffer = "";',
'    var self = this;',
'    for(var i=0; i<node.childNodes.length; i++) {',
'      var child = node.childNodes[i];',
'      if (child.nodeType == 3)                            buffer = buffer + child.nodeValue;',
'      else',
'        buffer = buffer + self.generateTmlTags(child);',
'    }',
'    var tokenContext = self.generateHtmlToken(node);',
'    var token = this.contextualize(this.adjustName(node), tokenContext);',
'',
'    var value = this.sanitizeValue(buffer);',
'',
'    if (this.isSelfClosingNode(node))',
'      return \'{\' + token + \'}\';',
'',
'    if (this.isShortToken(token, value))',
'      return \'[\' + token + \': \' + value + \']\';',
'',
'    return \'[\' + token + \']\' + value + \'[/\' + token + \']\';',
'  },',
'',
'  getOption: function(name) {',
'    if (this.options[name]) {',
'      return this.options[name];',
'    }',
'    return Tr8n.Utils.hashValue(Tr8n.config.translator_options, name);',
'  },',
'',
'  debugTranslation: function(translation) {',
'    return this.getOption("debug_format").replace(\'{$0}\', translation);',
'  },',
'',
'  isEmptyString: function(tml) {',
'      tml = tml.replace(/[\\s\\n\\r\\t\\0\\x0b\\xa0\\xc2]/g, \'\');',
'      return (tml == \'\');',
'  },',
'',
'  resetContext: function() {',
'    this.tokens = [].concat(this.context);',
'  },',
'',
'  isShortToken: function(token, value) {',
'    return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);',
'  },',
'',
'  isOnlyChild: function(node) {',
'    if (node.parentNode == null) return false;',
'    return (node.parentNode.childNodes.length == 1);',
'  },',
'',
'  hasInlineOrTextSiblings: function(node) {',
'    if (node.parentNode == null) return false;',
'',
'    for (var i=0; i < node.parentNode.childNodes.length; i++) {',
'      var child = node.parentNode.childNodes[i];',
'      if (child != node) {',
'        if (this.isInlineNode(child) || this.isValidTextNode(child))',
'          return true;',
'      }',
'    }',
'',
'    return false;',
'  },',
'',
'  isInlineNode: function(node) {',
'    return (',
'      node.nodeType == 1',
'      && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1',
'      && !this.isOnlyChild(node)',
'    );',
'  },',
'',
'  isContainerNode: function(node) {',
'    return (node.nodeType == 1 && !this.isInlineNode(node));',
'  },',
'',
'  isSelfClosingNode: function(node) {',
'    return (node.firstChild == null);',
'  },',
'',
'  isIgnoredNode: function(node) {',
'    if (node.nodeType != 1) return true;',
'    return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);',
'  },',
'',
'  isValidTextNode: function(node) {',
'    if (node == null) return false;',
'    return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));',
'  },',
'',
'  isSeparatorNode: function(node) {',
'    if (node == null) return false;',
'    return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);',
'  },',
'',
'  sanitizeValue: function(value) {',
'    return value.replace(/^\\s+/,\'\');',
'  },',
'',
'  replaceSpecialCharacters: function(text) {',
'    if (!this.getOption("data_tokens.special")) return text;',
'',
'    var matches = text.match(HTML_SPECIAL_CHAR_REGEX);',
'    var self = this;',
'    matches.forEach(function(match) {',
'      token = match.substring(1, match.length - 2);',
'      self.context[token] = match;',
'      text = text.replace(match, "{" + token + "}");',
'    });',
'',
'    return text;',
'  },',
'',
'  generateDataTokens: function(text) {',
'    if (!this.getOption("data_tokens.numeric")) return text;',
'',
'    var matches = text.match(INDEPENDENT_NUMBER_REGEX);',
'    var tokenName = this.getOption("data_tokens.numeric_name");',
'',
'    var self = this;',
'    matches.forEach(function(match) {',
'      value = match.replace(/[,;]\\s/, \'\');',
'      token = self.contextualize(tokenName, value);',
'      text = text.replace(match, match.replace(value, "{" + token + "}"));',
'    });',
'',
'    return text;',
'  },',
'',
'  generateHtmlToken: function(node, value) {',
'    var name = node.tagName.toLowerCase();',
'    var attributes = node.attributes;',
'    var attributesHash = {},',
'    value = ((value == null) ? \'{0}\' : value);',
'',
'    if (attributes.length == 0) {',
'      if (this.isSelfClosingNode(node))',
'        return \'<\' + name + \'/>\';',
'      return \'<\' + name + \'>\' + value + \'</\' + name + \'>\';',
'    }',
'',
'    for(var i=0; i<attributes.length; i++) {',
'      attributesHash[attributes[i].name] = attributes[i].value;',
'    }',
'',
'    var keys = Tr8n.Utils.keys(attributesHash);',
'    keys.sort();',
'',
'    var attr = [];',
'    keys.forEach(function(key) {',
'      var quote = (attributesHash[key].indexOf("\'") != -1 ? \'"\' : "\'");',
'      attr.push(key  + \'=\' + quote + attributesHash[key] + quote);',
'    });',
'    attr = attr.join(\' \');',
'',
'    if (this.isSelfClosingNode(node))',
'      return \'<\' + name + \' \' + attr + \'/>\';',
'',
'    return \'<\' + name + \' \' + attr + \'>\' + value + \'</\' + name + \'>\';',
'  },',
'',
'  adjustName: function(node) {',
'    var name = node.tagName.toLowerCase();',
'    var map = this.getOption("name_mapping");',
'    name = (map[name] != null) ? map[name] : name;',
'    return name;',
'  },',
'',
'  contextualize: function(name, context) {',
'    if (this.tokens[name] && this.tokens[name] != context) {',
'      var index = 0;',
'      var matches = name.match(/\\d+$/);',
'      if (matches && matches.length > 0) {',
'        index = parseInt(matches[matches.length-1]);',
'        name = name.replace("" + index, \'\');',
'      }',
'      name = name + (index + 1);',
'      return this.contextualize(name, context);',
'    }',
'',
'    this.tokens[name] = context;',
'    return name;',
'  },',
'',
'  debug: function(doc) {',
'    this.doc = doc;',
'    this.debugTree(doc, 0);',
'  },',
'',
'  debugTree: function(node, depth) {',
'    var padding = new Array(depth+1).join(\'=\');',
'',
'    console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));',
'',
'    if (node.childNodes) {',
'      var self = this;',
'      for(var i=0; i<node.childNodes.length; i++) {',
'        var child = node.childNodes[i];',
'        self.debugTree(child, depth+1);',
'      }',
'    }',
'  },',
'',
'  nodeInfo: function(node) {',
'    var info = [];',
'    info.push(node.nodeType);',
'',
'    if (node.nodeType == 1)',
'      info.push(node.tagName);',
'',
'    if (this.isInlineNode(node)) {',
'      info.push("inline");',
'      if (this.hasInlineOrTextSiblings(node))',
'        info.push("sentence");',
'      else',
'        info.push("only translatable");',
'    }',
'',
'    if (this.isSelfClosingNode(node))',
'      info.push("self closing");',
'',
'    if (this.isOnlyChild(node))',
'      info.push("only child");',
'',
'    if (node.nodeType == 3)',
'      return "[" + info.join(", ") + "]" + \': "\' + node.nodeValue + \'"\';',
'',
'    return "[" + info.join(", ") + "]";',
'  }',
'',
'};;',
'Tr8n.Decorators.Html = {',
'',
'  decorate: function(translated_label, translation_language, target_language, translation_key, options) {',
'    if (options.skip_decorations) return translated_label;',
'',
'    if (translation_key.language == target_language) return translated_label;',
'',
'    if (Tr8n.request && Tr8n.request.current_translator && Tr8n.request.current_translator.inline_mode) {',
'    } else return translated_label;',
'',
'    if (translation_key.locked && !Tr8n.request.current_translator.manager) return translated_label;',
'',
'    var element = \'tr8n:tr\';',
'    var classes = [\'tr8n_translatable\'];',
'',
'    if (translation_key.locked) {',
'      if (!Tr8n.request.current_translator.isFeatureEnabled("show_locked_keys"))',
'          return translated_label;',
'      classes.push(\'tr8n_locked\');',
'    } else if (translation_language == translation_key.language) {',
'      classes.push(\'tr8n_not_translated\');',
'    } else if (translation_language == target_language) {',
'      classes.push(\'tr8n_translated\');',
'    } else {',
'      classes.push(\'tr8n_fallback\');',
'    }',
'',
'    var html = [];',
'    html.push("<" + element + " class=\'" + classes.join(\' \') + "\' data-translation_key=\'" + translation_key.key + "\'>");',
'    html.push(translated_label);',
'    html.push("</" + element + ">");',
'    return html.join("");',
'  }',
'',
'};',
'',
'',
'',
'',
';',
'',
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
'Tr8n.Application.prototype = {',
'',
'  getApiClient: function() {',
'    return this.api_client;',
'  },',
'',
'  addLanguage: function(language) {',
'    language.application = this;',
'    this.languages_by_locale[language.attrs.locale] = language;',
'  },',
'',
'  getLanguage: function(locale) {',
'    return this.languages_by_locale[locale || Tr8n.config.default_locale];',
'  }',
'',
'};',
'',
';',
'Tr8n.Source = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
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
'Tr8n.TranslationKey.prototype = {',
'',
'  addTranslation: function(translation) {',
'    if (this.translations == null)',
'      this.translations = {};',
'',
'    if (this.translations[translation.locale])',
'      this.translations[translation.locale] = [];',
'',
'    this.translations[translation.locale].push(',
'      new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))',
'    );',
'  },',
'',
'  addTranslations: function(translations_by_locale) {',
'    for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {',
'      for(var translation in translations_by_locale[locale]) {',
'        this.addTranslation(translation);',
'      }',
'    }',
'  },',
'',
'  getTranslationsForLanguage: function(language) {',
'    if (!this.translations) return [];',
'    return (this.translations[language.locale] || []);',
'  },',
'',
'  findFirstValidTranslation: function(language, tokens) {',
'    var translations = this.getTranslationsForLanguage(language);',
'',
'    for(var i=0; i<translations.length; i++) {',
'      if (translations[i].isValidTranslation(tokens))',
'        return translations[i];',
'    }',
'',
'    return null;',
'  },',
'',
'  translate: function(language, tokens, options) {',
'    if (Tr8n.config.isDisabled())',
'      return this.substituteTokens(this.label, tokens, language, options);',
'',
'    var translation = this.findFirstValidTranslation(language, tokens);',
'    var decorator = Tr8n.Decorators.Html;',
'',
'    if (translation) {',
'      return decorator.decorate(',
'        this.substituteTokens(translation.label, tokens, translation.language, options),',
'        translation.language,',
'        this, options',
'      );',
'    }',
'',
'    return decorator.decorate(',
'      this.substituteTokens(this.label, tokens, this.language, options),',
'      this.language,',
'      this, options',
'    );',
'  },',
'',
'  getDataTokens: function() {',
'    if (!this.data_tokens) {',
'      var tokenizer = new Tr8n.Tokenizers.Data(this.label);',
'      this.data_tokens = tokenizer.tokens;',
'    }',
'    return this.data_tokens;',
'  },',
'',
'  getDataTokenNames: function() {',
'    if (!this.data_token_names) {',
'      this.data_token_names = [];',
'      for (var token in this.getDataTokens())',
'        this.data_token_names.push(token.full_name);',
'    }',
'    return this.data_token_names;',
'  },',
'',
'  getDecorationTokenNames: function() {',
'    if (!this.decoration_tokens) {',
'      var tokenizer = new Tr8n.Tokenizers.Decoration(this.label);',
'      this.decoration_tokens = tokenizer.tokens;',
'    }',
'    return this.decoration_tokens;',
'  },',
'',
'  substituteTokens: function(label, tokens, language, options) {',
'    if (label.indexOf(\'{\') != -1) {',
'      var tokenizer = new Tr8n.Tokenizers.Data(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDataTokenNames()}));',
'      label = tokenizer.substitute(language, options);',
'    }',
'',
'    if (label.indexOf(\'[\') != -1) {',
'      tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDecorationTokenNames()}));',
'      label = tokenizer.substitute(language, options);',
'    }',
'    return label;',
'  }',
'',
'};',
'',
';',
'Tr8n.Translation = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  if (this.locale && this.translation_key) {',
'    this.language = this.translation_key.application.getLanguage(this.locale);',
'  }',
'',
'};',
'',
'Tr8n.Translation.prototype = {',
'',
'  hasContextRules: function() {',
'    return (this.context && Tr8n.Utils.keys(this.context).length > 0);',
'  },',
'',
'  isValidTranslation: function(tokens) {',
'    if (this.hasContextRules())',
'      return true;',
'',
'    var token_names = Tr8n.Utils.keys(this.context);',
'    for(var i=0; i<token_names.length; i++) {',
'      var object = Tr8n.Configuration.prototype.tokenObject(tokens, token_names[i]);',
'      if (!object) return false;',
'',
'      var rule_keys = Tr8n.Utils.keys(this.context[token_names[i]]);',
'',
'      for(var j=0; j<rule_keys.length; j++) {',
'        if (rule_keys[j] != "other") {',
'          var context = this.language.getContextByKeyword(rule_keys[j]);',
'          if (context == null) return false; ',
'          var rule = context.findMatchingRule(object);',
'          if (!rule || rule.keyword != rule_keys[j])',
'            return false;',
'        }',
'      }',
'    }',
'',
'    return true;',
'  }',
'',
'};',
'',
'',
'',
';',
'Tr8n.Translator = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'};',
';',
'Tr8n.Language = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.contexts = {};',
'  var keys = Tr8n.Utils.keys(attrs.contexts || {});',
'  for (var i=0; i<keys.length; i++) {',
'    this.contexts[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[keys[i]], {language: this}));',
'  }',
'',
'  this.cases = {};',
'  keys = Tr8n.Utils.keys(attrs.cases || {});',
'  for (i=0; i<keys.length; i++) {',
'    this.cases[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[keys[i]], {language: this}));',
'  }',
'};',
'',
'Tr8n.Language.prototype = {',
'  getContextByKeyword: function(key) {',
'    return this.contexts[key];',
'  },',
'  ',
'  getContextByTokenName: function(token_name) {',
'    var keys = Tr8n.Utils.keys(attrs.contexts || {});',
'    for (var i=0; i<keys.length; i++) {',
'      if (this.contexts[keys[i]].isAppliedToToken(token_name))',
'        return this.contexts[keys[i]];',
'    }',
'    return null;',
'  },',
'  ',
'  getLanguageCaseByKeyword: function(key) {',
'    return this.cases[key];',
'  },',
'  ',
'  translate: function(label, description, tokens, options) {',
'  ',
'    var translation_key = new Tr8n.TranslationKey({',
'      label: label,',
'      description: description',
'    });',
'  ',
'      ',
'    return translation_key.translate(this, tokens, options);',
'  }',
'};',
'',
'',
';',
'Tr8n.LanguageCase = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.rules = [];',
'  attrs.rules = attrs.rules || [];',
'  for (var i=0; i<attrs.rules.length; i++) {',
'    this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(attrs.rules[i], {language_case: this})));',
'  }',
'};',
';',
'Tr8n.LanguageCaseRule = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'};',
'',
'Tr8n.LanguageCaseRule.prototype = {',
'',
'  getConditionsExpression: function() {',
'    if (!this.conditions_expression)',
'      this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();',
'    return this.conditions_expression;',
'  },',
'  ',
'  getOperationsExpression: function() {',
'    if (!this.operations_expression)',
'      this.operations_expression = (new Tr8n.RulesEngine.Parser(this.operations)).parse();',
'    return this.operations_expression;',
'  },',
'  ',
'  getGenderVariables: function(object) {',
'    if (this.conditions.indexOf("@gender") == -1)',
'      return {};',
'  ',
'    if (object == null)',
'      return {gender: \'unknown\'};',
'  ',
'    var context = this.language_case.language.getContextByKeyword("gender");',
'  ',
'    if (context == null)',
'      return {gender: \'unknown\'};',
'  ',
'    return context.getVars(object);',
'  },',
'  ',
'  evaluate: function(value, object) {',
'    if (this.attrs.conditions == null)',
'      return false;',
'  ',
'    var evaluator = new Tr8n.RulesEngine.Evaluator();',
'    evaluator.setVars(Tr8n.Utils.extend({value: value}, this.getGenderVariables(object)));',
'  ',
'    return evaluator.evaluate(this.getConditionsExpression());',
'  },',
'  ',
'  apply: function(value) {',
'    if (this.attrs.operations == null)',
'      return value;',
'  ',
'    var evaluator = new Tr8n.RulesEngine.Evaluator();',
'    evaluator.setVars({value: value});',
'  ',
'    return evaluator.evaluate(this.getOperationsExpression());',
'  }',
'',
'};',
'',
';',
'Tr8n.LanguageContext = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'',
'  this.rules = {};',
'',
'  var keys = Tr8n.Utils.keys(attrs.rules || {});',
'  for (var i=0; i<keys.length; i++) {',
'    this.rules[keys[i]] = new Tr8n.LanguageContextRule(Tr8n.Utils.extend(attrs.rules[keys[i]], {language_context: this}));',
'  }',
'',
'};',
'',
'Tr8n.LanguageContext.prototype = {',
'',
'  isAppliedToToken: function(token) {',
'    var expr = new RegExp(this.token_expression.substring(1,this.token_expression.length-2));',
'    return token.match(expr) != null;',
'  },',
'  ',
'  getFallbackRule: function() {',
'    if (!this.fallback_rule) {',
'      var keys = Tr8n.Utils.keys(this.rules);',
'      for (var i=0; i<keys.length; i++) {',
'        var key = keys[i];',
'        if (this.rules[key].isFallback())',
'          this.fallback_rule = this.rules[key];',
'      }',
'    }',
'    return this.fallback_rule;',
'  },',
'',
'  getConfig: function() {',
'    return Tr8n.config.getContextRules(this.keyword);',
'  },',
'',
'  getVars: function(obj) {',
'    var vars = {};',
'    var config = this.getConfig();',
'',
'    for (var i=0; i<this.variables.length; i++) {',
'      var key = this.variables[i];',
'      if (!config.variables || !config.variables[key]) {',
'        vars[key] = obj;',
'      } else {',
'        var method = config.variables[key];',
'        if (typeof method === "string") {',
'          if (obj.object) obj = obj.object;',
'          vars[key] = obj[method];',
'        } else if (typeof method === "function") {',
'          vars[key] = method(obj);',
'        } else {',
'          vars[key] = obj;',
'        }',
'      }',
'    }',
'  ',
'    return vars;',
'  },',
'  ',
'  findMatchingRule: function(obj) {',
'    var token_vars = this.getVars(obj);',
'  ',
'    var keys = Tr8n.Utils.keys(this.rules);',
'    for (var i=0; i<keys.length; i++) {',
'      var rule = this.rules[keys[i]];',
'      if (!rule.isFallback() && rule.evaluate(token_vars))',
'          return rule;',
'    }',
'  ',
'    return this.getFallbackRule();',
'  }',
'',
'};;',
'Tr8n.LanguageContextRule = function(attrs) {',
'  Tr8n.Utils.extend(this, attrs);',
'};',
'',
'Tr8n.LanguageContextRule.prototype = {',
'',
'  isFallback: function() {',
'    return (this.keyword == "other");',
'  },',
'  ',
'  getConditionsExpression: function() {',
'    if (!this.conditions_expression)',
'      this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();',
'    return this.conditions_expression;',
'  },',
'  ',
'  evaluate: function(vars) {',
'    if (this.isFallback()) return true;',
'  ',
'    var evaluator = new Tr8n.RulesEngine.Evaluator();',
'    evaluator.setVars(vars || {});',
'  ',
'    return evaluator.evaluate(this.getConditionsExpression())',
'  }',
'',
'};;',
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
'exports.Configuration = Tr8n.Configuration;',
'exports.RulesEngine = Tr8n.RulesEngine;',
'exports.Tokenizers = Tr8n.Tokenizers;',
'exports.Tokens = Tr8n.Tokens;',
'exports.Decorators = Tr8n.Decorators;',
'exports.Utils = Tr8n.Utils;',
'exports.Language = Tr8n.Language;',
'exports.LanguageContext = Tr8n.LanguageContext;',
'exports.LanguageContextRule = Tr8n.LanguageContextRule;',
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
_$jscoverage['lib/tr8n.js'][1089]=0;
_$jscoverage['lib/tr8n.js'][5]=0;
_$jscoverage['lib/tr8n.js'][4]=0;
_$jscoverage['lib/tr8n.js'][2]=0;
_$jscoverage['lib/tr8n.js'][1079]=0;
_$jscoverage['lib/tr8n.js'][11]=0;
_$jscoverage['lib/tr8n.js'][9]=0;
_$jscoverage['lib/tr8n.js'][10]=0;
_$jscoverage['lib/tr8n.js'][8]=0;
_$jscoverage['lib/tr8n.js'][1146]=0;
_$jscoverage['lib/tr8n.js'][15]=0;
_$jscoverage['lib/tr8n.js'][13]=0;
_$jscoverage['lib/tr8n.js'][12]=0;
_$jscoverage['lib/tr8n.js'][14]=0;
_$jscoverage['lib/tr8n.js'][1130]=0;
_$jscoverage['lib/tr8n.js'][18]=0;
_$jscoverage['lib/tr8n.js'][16]=0;
_$jscoverage['lib/tr8n.js'][1121]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][20]=0;
_$jscoverage['lib/tr8n.js'][29]=0;
_$jscoverage['lib/tr8n.js'][22]=0;
_$jscoverage['lib/tr8n.js'][19]=0;
_$jscoverage['lib/tr8n.js'][25]=0;
_$jscoverage['lib/tr8n.js'][798]=0;
_$jscoverage['lib/tr8n.js'][35]=0;
_$jscoverage['lib/tr8n.js'][34]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][30]=0;
_$jscoverage['lib/tr8n.js'][31]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][32]=0;
_$jscoverage['lib/tr8n.js'][833]=0;
_$jscoverage['lib/tr8n.js'][50]=0;
_$jscoverage['lib/tr8n.js'][49]=0;
_$jscoverage['lib/tr8n.js'][40]=0;
_$jscoverage['lib/tr8n.js'][41]=0;
_$jscoverage['lib/tr8n.js'][39]=0;
_$jscoverage['lib/tr8n.js'][45]=0;
_$jscoverage['lib/tr8n.js'][46]=0;
_$jscoverage['lib/tr8n.js'][36]=0;
_$jscoverage['lib/tr8n.js'][44]=0;
_$jscoverage['lib/tr8n.js'][1191]=0;
_$jscoverage['lib/tr8n.js'][62]=0;
_$jscoverage['lib/tr8n.js'][55]=0;
_$jscoverage['lib/tr8n.js'][56]=0;
_$jscoverage['lib/tr8n.js'][57]=0;
_$jscoverage['lib/tr8n.js'][58]=0;
_$jscoverage['lib/tr8n.js'][59]=0;
_$jscoverage['lib/tr8n.js'][51]=0;
_$jscoverage['lib/tr8n.js'][60]=0;
_$jscoverage['lib/tr8n.js'][61]=0;
_$jscoverage['lib/tr8n.js'][54]=0;
_$jscoverage['lib/tr8n.js'][1155]=0;
_$jscoverage['lib/tr8n.js'][74]=0;
_$jscoverage['lib/tr8n.js'][64]=0;
_$jscoverage['lib/tr8n.js'][73]=0;
_$jscoverage['lib/tr8n.js'][65]=0;
_$jscoverage['lib/tr8n.js'][66]=0;
_$jscoverage['lib/tr8n.js'][67]=0;
_$jscoverage['lib/tr8n.js'][63]=0;
_$jscoverage['lib/tr8n.js'][69]=0;
_$jscoverage['lib/tr8n.js'][70]=0;
_$jscoverage['lib/tr8n.js'][71]=0;
_$jscoverage['lib/tr8n.js'][72]=0;
_$jscoverage['lib/tr8n.js'][1194]=0;
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
_$jscoverage['lib/tr8n.js'][1224]=0;
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
_$jscoverage['lib/tr8n.js'][929]=0;
_$jscoverage['lib/tr8n.js'][144]=0;
_$jscoverage['lib/tr8n.js'][131]=0;
_$jscoverage['lib/tr8n.js'][132]=0;
_$jscoverage['lib/tr8n.js'][133]=0;
_$jscoverage['lib/tr8n.js'][134]=0;
_$jscoverage['lib/tr8n.js'][135]=0;
_$jscoverage['lib/tr8n.js'][136]=0;
_$jscoverage['lib/tr8n.js'][137]=0;
_$jscoverage['lib/tr8n.js'][138]=0;
_$jscoverage['lib/tr8n.js'][139]=0;
_$jscoverage['lib/tr8n.js'][130]=0;
_$jscoverage['lib/tr8n.js'][140]=0;
_$jscoverage['lib/tr8n.js'][141]=0;
_$jscoverage['lib/tr8n.js'][142]=0;
_$jscoverage['lib/tr8n.js'][143]=0;
_$jscoverage['lib/tr8n.js'][960]=0;
_$jscoverage['lib/tr8n.js'][160]=0;
_$jscoverage['lib/tr8n.js'][146]=0;
_$jscoverage['lib/tr8n.js'][147]=0;
_$jscoverage['lib/tr8n.js'][148]=0;
_$jscoverage['lib/tr8n.js'][149]=0;
_$jscoverage['lib/tr8n.js'][150]=0;
_$jscoverage['lib/tr8n.js'][151]=0;
_$jscoverage['lib/tr8n.js'][152]=0;
_$jscoverage['lib/tr8n.js'][153]=0;
_$jscoverage['lib/tr8n.js'][154]=0;
_$jscoverage['lib/tr8n.js'][145]=0;
_$jscoverage['lib/tr8n.js'][155]=0;
_$jscoverage['lib/tr8n.js'][156]=0;
_$jscoverage['lib/tr8n.js'][157]=0;
_$jscoverage['lib/tr8n.js'][158]=0;
_$jscoverage['lib/tr8n.js'][159]=0;
_$jscoverage['lib/tr8n.js'][1112]=0;
_$jscoverage['lib/tr8n.js'][177]=0;
_$jscoverage['lib/tr8n.js'][162]=0;
_$jscoverage['lib/tr8n.js'][163]=0;
_$jscoverage['lib/tr8n.js'][164]=0;
_$jscoverage['lib/tr8n.js'][165]=0;
_$jscoverage['lib/tr8n.js'][166]=0;
_$jscoverage['lib/tr8n.js'][167]=0;
_$jscoverage['lib/tr8n.js'][168]=0;
_$jscoverage['lib/tr8n.js'][169]=0;
_$jscoverage['lib/tr8n.js'][170]=0;
_$jscoverage['lib/tr8n.js'][161]=0;
_$jscoverage['lib/tr8n.js'][171]=0;
_$jscoverage['lib/tr8n.js'][172]=0;
_$jscoverage['lib/tr8n.js'][173]=0;
_$jscoverage['lib/tr8n.js'][174]=0;
_$jscoverage['lib/tr8n.js'][175]=0;
_$jscoverage['lib/tr8n.js'][176]=0;
_$jscoverage['lib/tr8n.js'][1126]=0;
_$jscoverage['lib/tr8n.js'][195]=0;
_$jscoverage['lib/tr8n.js'][179]=0;
_$jscoverage['lib/tr8n.js'][180]=0;
_$jscoverage['lib/tr8n.js'][193]=0;
_$jscoverage['lib/tr8n.js'][181]=0;
_$jscoverage['lib/tr8n.js'][182]=0;
_$jscoverage['lib/tr8n.js'][183]=0;
_$jscoverage['lib/tr8n.js'][184]=0;
_$jscoverage['lib/tr8n.js'][194]=0;
_$jscoverage['lib/tr8n.js'][185]=0;
_$jscoverage['lib/tr8n.js'][178]=0;
_$jscoverage['lib/tr8n.js'][186]=0;
_$jscoverage['lib/tr8n.js'][187]=0;
_$jscoverage['lib/tr8n.js'][188]=0;
_$jscoverage['lib/tr8n.js'][189]=0;
_$jscoverage['lib/tr8n.js'][190]=0;
_$jscoverage['lib/tr8n.js'][191]=0;
_$jscoverage['lib/tr8n.js'][192]=0;
_$jscoverage['lib/tr8n.js'][1142]=0;
_$jscoverage['lib/tr8n.js'][237]=0;
_$jscoverage['lib/tr8n.js'][198]=0;
_$jscoverage['lib/tr8n.js'][200]=0;
_$jscoverage['lib/tr8n.js'][202]=0;
_$jscoverage['lib/tr8n.js'][213]=0;
_$jscoverage['lib/tr8n.js'][214]=0;
_$jscoverage['lib/tr8n.js'][216]=0;
_$jscoverage['lib/tr8n.js'][217]=0;
_$jscoverage['lib/tr8n.js'][217]=0;
_$jscoverage['lib/tr8n.js'][218]=0;
_$jscoverage['lib/tr8n.js'][215]=0;
_$jscoverage['lib/tr8n.js'][220]=0;
_$jscoverage['lib/tr8n.js'][224]=0;
_$jscoverage['lib/tr8n.js'][210]=0;
_$jscoverage['lib/tr8n.js'][227]=0;
_$jscoverage['lib/tr8n.js'][231]=0;
_$jscoverage['lib/tr8n.js'][229]=0;
_$jscoverage['lib/tr8n.js'][236]=0;
_$jscoverage['lib/tr8n.js'][1160]=0;
_$jscoverage['lib/tr8n.js'][276]=0;
_$jscoverage['lib/tr8n.js'][241]=0;
_$jscoverage['lib/tr8n.js'][248]=0;
_$jscoverage['lib/tr8n.js'][247]=0;
_$jscoverage['lib/tr8n.js'][271]=0;
_$jscoverage['lib/tr8n.js'][249]=0;
_$jscoverage['lib/tr8n.js'][254]=0;
_$jscoverage['lib/tr8n.js'][242]=0;
_$jscoverage['lib/tr8n.js'][253]=0;
_$jscoverage['lib/tr8n.js'][256]=0;
_$jscoverage['lib/tr8n.js'][258]=0;
_$jscoverage['lib/tr8n.js'][257]=0;
_$jscoverage['lib/tr8n.js'][259]=0;
_$jscoverage['lib/tr8n.js'][263]=0;
_$jscoverage['lib/tr8n.js'][267]=0;
_$jscoverage['lib/tr8n.js'][272]=0;
_$jscoverage['lib/tr8n.js'][273]=0;
_$jscoverage['lib/tr8n.js'][274]=0;
_$jscoverage['lib/tr8n.js'][275]=0;
_$jscoverage['lib/tr8n.js'][1176]=0;
_$jscoverage['lib/tr8n.js'][424]=0;
_$jscoverage['lib/tr8n.js'][281]=0;
_$jscoverage['lib/tr8n.js'][347]=0;
_$jscoverage['lib/tr8n.js'][347]=0;
_$jscoverage['lib/tr8n.js'][348]=0;
_$jscoverage['lib/tr8n.js'][348]=0;
_$jscoverage['lib/tr8n.js'][349]=0;
_$jscoverage['lib/tr8n.js'][353]=0;
_$jscoverage['lib/tr8n.js'][279]=0;
_$jscoverage['lib/tr8n.js'][353]=0;
_$jscoverage['lib/tr8n.js'][354]=0;
_$jscoverage['lib/tr8n.js'][355]=0;
_$jscoverage['lib/tr8n.js'][356]=0;
_$jscoverage['lib/tr8n.js'][360]=0;
_$jscoverage['lib/tr8n.js'][402]=0;
_$jscoverage['lib/tr8n.js'][404]=0;
_$jscoverage['lib/tr8n.js'][403]=0;
_$jscoverage['lib/tr8n.js'][406]=0;
_$jscoverage['lib/tr8n.js'][390]=0;
_$jscoverage['lib/tr8n.js'][420]=0;
_$jscoverage['lib/tr8n.js'][434]=0;
_$jscoverage['lib/tr8n.js'][469]=0;
_$jscoverage['lib/tr8n.js'][432]=0;
_$jscoverage['lib/tr8n.js'][432]=0;
_$jscoverage['lib/tr8n.js'][428]=0;
_$jscoverage['lib/tr8n.js'][436]=0;
_$jscoverage['lib/tr8n.js'][435]=0;
_$jscoverage['lib/tr8n.js'][438]=0;
_$jscoverage['lib/tr8n.js'][442]=0;
_$jscoverage['lib/tr8n.js'][451]=0;
_$jscoverage['lib/tr8n.js'][452]=0;
_$jscoverage['lib/tr8n.js'][453]=0;
_$jscoverage['lib/tr8n.js'][450]=0;
_$jscoverage['lib/tr8n.js'][458]=0;
_$jscoverage['lib/tr8n.js'][459]=0;
_$jscoverage['lib/tr8n.js'][461]=0;
_$jscoverage['lib/tr8n.js'][462]=0;
_$jscoverage['lib/tr8n.js'][464]=0;
_$jscoverage['lib/tr8n.js'][466]=0;
_$jscoverage['lib/tr8n.js'][465]=0;
_$jscoverage['lib/tr8n.js'][456]=0;
_$jscoverage['lib/tr8n.js'][1207]=0;
_$jscoverage['lib/tr8n.js'][507]=0;
_$jscoverage['lib/tr8n.js'][472]=0;
_$jscoverage['lib/tr8n.js'][471]=0;
_$jscoverage['lib/tr8n.js'][470]=0;
_$jscoverage['lib/tr8n.js'][478]=0;
_$jscoverage['lib/tr8n.js'][477]=0;
_$jscoverage['lib/tr8n.js'][480]=0;
_$jscoverage['lib/tr8n.js'][484]=0;
_$jscoverage['lib/tr8n.js'][484]=0;
_$jscoverage['lib/tr8n.js'][486]=0;
_$jscoverage['lib/tr8n.js'][488]=0;
_$jscoverage['lib/tr8n.js'][487]=0;
_$jscoverage['lib/tr8n.js'][490]=0;
_$jscoverage['lib/tr8n.js'][494]=0;
_$jscoverage['lib/tr8n.js'][495]=0;
_$jscoverage['lib/tr8n.js'][500]=0;
_$jscoverage['lib/tr8n.js'][502]=0;
_$jscoverage['lib/tr8n.js'][501]=0;
_$jscoverage['lib/tr8n.js'][504]=0;
_$jscoverage['lib/tr8n.js'][505]=0;
_$jscoverage['lib/tr8n.js'][1220]=0;
_$jscoverage['lib/tr8n.js'][553]=0;
_$jscoverage['lib/tr8n.js'][510]=0;
_$jscoverage['lib/tr8n.js'][511]=0;
_$jscoverage['lib/tr8n.js'][514]=0;
_$jscoverage['lib/tr8n.js'][513]=0;
_$jscoverage['lib/tr8n.js'][517]=0;
_$jscoverage['lib/tr8n.js'][516]=0;
_$jscoverage['lib/tr8n.js'][519]=0;
_$jscoverage['lib/tr8n.js'][525]=0;
_$jscoverage['lib/tr8n.js'][526]=0;
_$jscoverage['lib/tr8n.js'][527]=0;
_$jscoverage['lib/tr8n.js'][529]=0;
_$jscoverage['lib/tr8n.js'][529]=0;
_$jscoverage['lib/tr8n.js'][530]=0;
_$jscoverage['lib/tr8n.js'][530]=0;
_$jscoverage['lib/tr8n.js'][532]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][534]=0;
_$jscoverage['lib/tr8n.js'][536]=0;
_$jscoverage['lib/tr8n.js'][542]=0;
_$jscoverage['lib/tr8n.js'][552]=0;
_$jscoverage['lib/tr8n.js'][508]=0;
_$jscoverage['lib/tr8n.js'][1252]=0;
_$jscoverage['lib/tr8n.js'][588]=0;
_$jscoverage['lib/tr8n.js'][565]=0;
_$jscoverage['lib/tr8n.js'][563]=0;
_$jscoverage['lib/tr8n.js'][562]=0;
_$jscoverage['lib/tr8n.js'][572]=0;
_$jscoverage['lib/tr8n.js'][556]=0;
_$jscoverage['lib/tr8n.js'][555]=0;
_$jscoverage['lib/tr8n.js'][559]=0;
_$jscoverage['lib/tr8n.js'][558]=0;
_$jscoverage['lib/tr8n.js'][561]=0;
_$jscoverage['lib/tr8n.js'][564]=0;
_$jscoverage['lib/tr8n.js'][567]=0;
_$jscoverage['lib/tr8n.js'][569]=0;
_$jscoverage['lib/tr8n.js'][571]=0;
_$jscoverage['lib/tr8n.js'][568]=0;
_$jscoverage['lib/tr8n.js'][566]=0;
_$jscoverage['lib/tr8n.js'][573]=0;
_$jscoverage['lib/tr8n.js'][574]=0;
_$jscoverage['lib/tr8n.js'][577]=0;
_$jscoverage['lib/tr8n.js'][576]=0;
_$jscoverage['lib/tr8n.js'][580]=0;
_$jscoverage['lib/tr8n.js'][579]=0;
_$jscoverage['lib/tr8n.js'][582]=0;
_$jscoverage['lib/tr8n.js'][585]=0;
_$jscoverage['lib/tr8n.js'][587]=0;
_$jscoverage['lib/tr8n.js'][584]=0;
_$jscoverage['lib/tr8n.js'][1252]=0;
_$jscoverage['lib/tr8n.js'][624]=0;
_$jscoverage['lib/tr8n.js'][594]=0;
_$jscoverage['lib/tr8n.js'][593]=0;
_$jscoverage['lib/tr8n.js'][597]=0;
_$jscoverage['lib/tr8n.js'][596]=0;
_$jscoverage['lib/tr8n.js'][599]=0;
_$jscoverage['lib/tr8n.js'][602]=0;
_$jscoverage['lib/tr8n.js'][603]=0;
_$jscoverage['lib/tr8n.js'][601]=0;
_$jscoverage['lib/tr8n.js'][606]=0;
_$jscoverage['lib/tr8n.js'][607]=0;
_$jscoverage['lib/tr8n.js'][609]=0;
_$jscoverage['lib/tr8n.js'][610]=0;
_$jscoverage['lib/tr8n.js'][613]=0;
_$jscoverage['lib/tr8n.js'][615]=0;
_$jscoverage['lib/tr8n.js'][614]=0;
_$jscoverage['lib/tr8n.js'][616]=0;
_$jscoverage['lib/tr8n.js'][612]=0;
_$jscoverage['lib/tr8n.js'][619]=0;
_$jscoverage['lib/tr8n.js'][621]=0;
_$jscoverage['lib/tr8n.js'][622]=0;
_$jscoverage['lib/tr8n.js'][589]=0;
_$jscoverage['lib/tr8n.js'][1288]=0;
_$jscoverage['lib/tr8n.js'][666]=0;
_$jscoverage['lib/tr8n.js'][629]=0;
_$jscoverage['lib/tr8n.js'][631]=0;
_$jscoverage['lib/tr8n.js'][632]=0;
_$jscoverage['lib/tr8n.js'][633]=0;
_$jscoverage['lib/tr8n.js'][634]=0;
_$jscoverage['lib/tr8n.js'][637]=0;
_$jscoverage['lib/tr8n.js'][638]=0;
_$jscoverage['lib/tr8n.js'][639]=0;
_$jscoverage['lib/tr8n.js'][636]=0;
_$jscoverage['lib/tr8n.js'][642]=0;
_$jscoverage['lib/tr8n.js'][643]=0;
_$jscoverage['lib/tr8n.js'][662]=0;
_$jscoverage['lib/tr8n.js'][647]=0;
_$jscoverage['lib/tr8n.js'][648]=0;
_$jscoverage['lib/tr8n.js'][651]=0;
_$jscoverage['lib/tr8n.js'][653]=0;
_$jscoverage['lib/tr8n.js'][650]=0;
_$jscoverage['lib/tr8n.js'][656]=0;
_$jscoverage['lib/tr8n.js'][655]=0;
_$jscoverage['lib/tr8n.js'][659]=0;
_$jscoverage['lib/tr8n.js'][658]=0;
_$jscoverage['lib/tr8n.js'][663]=0;
_$jscoverage['lib/tr8n.js'][625]=0;
_$jscoverage['lib/tr8n.js'][627]=0;
_$jscoverage['lib/tr8n.js'][1309]=0;
_$jscoverage['lib/tr8n.js'][718]=0;
_$jscoverage['lib/tr8n.js'][717]=0;
_$jscoverage['lib/tr8n.js'][716]=0;
_$jscoverage['lib/tr8n.js'][670]=0;
_$jscoverage['lib/tr8n.js'][671]=0;
_$jscoverage['lib/tr8n.js'][671]=0;
_$jscoverage['lib/tr8n.js'][672]=0;
_$jscoverage['lib/tr8n.js'][676]=0;
_$jscoverage['lib/tr8n.js'][679]=0;
_$jscoverage['lib/tr8n.js'][678]=0;
_$jscoverage['lib/tr8n.js'][684]=0;
_$jscoverage['lib/tr8n.js'][683]=0;
_$jscoverage['lib/tr8n.js'][682]=0;
_$jscoverage['lib/tr8n.js'][688]=0;
_$jscoverage['lib/tr8n.js'][692]=0;
_$jscoverage['lib/tr8n.js'][697]=0;
_$jscoverage['lib/tr8n.js'][696]=0;
_$jscoverage['lib/tr8n.js'][700]=0;
_$jscoverage['lib/tr8n.js'][701]=0;
_$jscoverage['lib/tr8n.js'][704]=0;
_$jscoverage['lib/tr8n.js'][705]=0;
_$jscoverage['lib/tr8n.js'][706]=0;
_$jscoverage['lib/tr8n.js'][703]=0;
_$jscoverage['lib/tr8n.js'][711]=0;
_$jscoverage['lib/tr8n.js'][710]=0;
_$jscoverage['lib/tr8n.js'][713]=0;
_$jscoverage['lib/tr8n.js'][709]=0;
_$jscoverage['lib/tr8n.js'][1326]=0;
_$jscoverage['lib/tr8n.js'][764]=0;
_$jscoverage['lib/tr8n.js'][720]=0;
_$jscoverage['lib/tr8n.js'][724]=0;
_$jscoverage['lib/tr8n.js'][725]=0;
_$jscoverage['lib/tr8n.js'][726]=0;
_$jscoverage['lib/tr8n.js'][726]=0;
_$jscoverage['lib/tr8n.js'][728]=0;
_$jscoverage['lib/tr8n.js'][730]=0;
_$jscoverage['lib/tr8n.js'][723]=0;
_$jscoverage['lib/tr8n.js'][739]=0;
_$jscoverage['lib/tr8n.js'][738]=0;
_$jscoverage['lib/tr8n.js'][742]=0;
_$jscoverage['lib/tr8n.js'][743]=0;
_$jscoverage['lib/tr8n.js'][746]=0;
_$jscoverage['lib/tr8n.js'][747]=0;
_$jscoverage['lib/tr8n.js'][749]=0;
_$jscoverage['lib/tr8n.js'][750]=0;
_$jscoverage['lib/tr8n.js'][752]=0;
_$jscoverage['lib/tr8n.js'][754]=0;
_$jscoverage['lib/tr8n.js'][753]=0;
_$jscoverage['lib/tr8n.js'][757]=0;
_$jscoverage['lib/tr8n.js'][758]=0;
_$jscoverage['lib/tr8n.js'][760]=0;
_$jscoverage['lib/tr8n.js'][759]=0;
_$jscoverage['lib/tr8n.js'][745]=0;
_$jscoverage['lib/tr8n.js'][1358]=0;
_$jscoverage['lib/tr8n.js'][811]=0;
_$jscoverage['lib/tr8n.js'][770]=0;
_$jscoverage['lib/tr8n.js'][774]=0;
_$jscoverage['lib/tr8n.js'][775]=0;
_$jscoverage['lib/tr8n.js'][773]=0;
_$jscoverage['lib/tr8n.js'][777]=0;
_$jscoverage['lib/tr8n.js'][772]=0;
_$jscoverage['lib/tr8n.js'][780]=0;
_$jscoverage['lib/tr8n.js'][783]=0;
_$jscoverage['lib/tr8n.js'][784]=0;
_$jscoverage['lib/tr8n.js'][782]=0;
_$jscoverage['lib/tr8n.js'][788]=0;
_$jscoverage['lib/tr8n.js'][789]=0;
_$jscoverage['lib/tr8n.js'][809]=0;
_$jscoverage['lib/tr8n.js'][787]=0;
_$jscoverage['lib/tr8n.js'][806]=0;
_$jscoverage['lib/tr8n.js'][794]=0;
_$jscoverage['lib/tr8n.js'][769]=0;
_$jscoverage['lib/tr8n.js'][795]=0;
_$jscoverage['lib/tr8n.js'][793]=0;
_$jscoverage['lib/tr8n.js'][765]=0;
_$jscoverage['lib/tr8n.js'][800]=0;
_$jscoverage['lib/tr8n.js'][801]=0;
_$jscoverage['lib/tr8n.js'][799]=0;
_$jscoverage['lib/tr8n.js'][792]=0;
_$jscoverage['lib/tr8n.js'][805]=0;
_$jscoverage['lib/tr8n.js'][807]=0;
_$jscoverage['lib/tr8n.js'][808]=0;
_$jscoverage['lib/tr8n.js'][1386]=0;
_$jscoverage['lib/tr8n.js'][857]=0;
_$jscoverage['lib/tr8n.js'][814]=0;
_$jscoverage['lib/tr8n.js'][815]=0;
_$jscoverage['lib/tr8n.js'][816]=0;
_$jscoverage['lib/tr8n.js'][817]=0;
_$jscoverage['lib/tr8n.js'][820]=0;
_$jscoverage['lib/tr8n.js'][821]=0;
_$jscoverage['lib/tr8n.js'][819]=0;
_$jscoverage['lib/tr8n.js'][824]=0;
_$jscoverage['lib/tr8n.js'][827]=0;
_$jscoverage['lib/tr8n.js'][829]=0;
_$jscoverage['lib/tr8n.js'][830]=0;
_$jscoverage['lib/tr8n.js'][830]=0;
_$jscoverage['lib/tr8n.js'][828]=0;
_$jscoverage['lib/tr8n.js'][813]=0;
_$jscoverage['lib/tr8n.js'][837]=0;
_$jscoverage['lib/tr8n.js'][840]=0;
_$jscoverage['lib/tr8n.js'][842]=0;
_$jscoverage['lib/tr8n.js'][843]=0;
_$jscoverage['lib/tr8n.js'][841]=0;
_$jscoverage['lib/tr8n.js'][846]=0;
_$jscoverage['lib/tr8n.js'][849]=0;
_$jscoverage['lib/tr8n.js'][850]=0;
_$jscoverage['lib/tr8n.js'][848]=0;
_$jscoverage['lib/tr8n.js'][853]=0;
_$jscoverage['lib/tr8n.js'][855]=0;
_$jscoverage['lib/tr8n.js'][857]=0;
_$jscoverage['lib/tr8n.js'][1425]=0;
_$jscoverage['lib/tr8n.js'][897]=0;
_$jscoverage['lib/tr8n.js'][859]=0;
_$jscoverage['lib/tr8n.js'][861]=0;
_$jscoverage['lib/tr8n.js'][861]=0;
_$jscoverage['lib/tr8n.js'][863]=0;
_$jscoverage['lib/tr8n.js'][865]=0;
_$jscoverage['lib/tr8n.js'][867]=0;
_$jscoverage['lib/tr8n.js'][869]=0;
_$jscoverage['lib/tr8n.js'][866]=0;
_$jscoverage['lib/tr8n.js'][864]=0;
_$jscoverage['lib/tr8n.js'][873]=0;
_$jscoverage['lib/tr8n.js'][875]=0;
_$jscoverage['lib/tr8n.js'][876]=0;
_$jscoverage['lib/tr8n.js'][878]=0;
_$jscoverage['lib/tr8n.js'][874]=0;
_$jscoverage['lib/tr8n.js'][880]=0;
_$jscoverage['lib/tr8n.js'][882]=0;
_$jscoverage['lib/tr8n.js'][888]=0;
_$jscoverage['lib/tr8n.js'][891]=0;
_$jscoverage['lib/tr8n.js'][891]=0;
_$jscoverage['lib/tr8n.js'][892]=0;
_$jscoverage['lib/tr8n.js'][893]=0;
_$jscoverage['lib/tr8n.js'][894]=0;
_$jscoverage['lib/tr8n.js'][896]=0;
_$jscoverage['lib/tr8n.js'][894]=0;
_$jscoverage['lib/tr8n.js'][895]=0;
_$jscoverage['lib/tr8n.js'][887]=0;
_$jscoverage['lib/tr8n.js'][889]=0;
_$jscoverage['lib/tr8n.js'][895]=0;
_$jscoverage['lib/tr8n.js'][1447]=0;
_$jscoverage['lib/tr8n.js'][907]=0;
_$jscoverage['lib/tr8n.js'][898]=0;
_$jscoverage['lib/tr8n.js'][900]=0;
_$jscoverage['lib/tr8n.js'][900]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][906]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][902]=0;
_$jscoverage['lib/tr8n.js'][903]=0;
_$jscoverage['lib/tr8n.js'][903]=0;
_$jscoverage['lib/tr8n.js'][906]=0;
_$jscoverage['lib/tr8n.js'][903]=0;
_$jscoverage['lib/tr8n.js'][905]=0;
_$jscoverage['lib/tr8n.js'][903]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][905]=0;
_$jscoverage['lib/tr8n.js'][904]=0;
_$jscoverage['lib/tr8n.js'][905]=0;
_$jscoverage['lib/tr8n.js'][1473]=0;
_$jscoverage['lib/tr8n.js'][967]=0;
_$jscoverage['lib/tr8n.js'][908]=0;
_$jscoverage['lib/tr8n.js'][911]=0;
_$jscoverage['lib/tr8n.js'][915]=0;
_$jscoverage['lib/tr8n.js'][916]=0;
_$jscoverage['lib/tr8n.js'][917]=0;
_$jscoverage['lib/tr8n.js'][912]=0;
_$jscoverage['lib/tr8n.js'][919]=0;
_$jscoverage['lib/tr8n.js'][925]=0;
_$jscoverage['lib/tr8n.js'][924]=0;
_$jscoverage['lib/tr8n.js'][926]=0;
_$jscoverage['lib/tr8n.js'][930]=0;
_$jscoverage['lib/tr8n.js'][933]=0;
_$jscoverage['lib/tr8n.js'][936]=0;
_$jscoverage['lib/tr8n.js'][937]=0;
_$jscoverage['lib/tr8n.js'][937]=0;
_$jscoverage['lib/tr8n.js'][940]=0;
_$jscoverage['lib/tr8n.js'][941]=0;
_$jscoverage['lib/tr8n.js'][941]=0;
_$jscoverage['lib/tr8n.js'][945]=0;
_$jscoverage['lib/tr8n.js'][951]=0;
_$jscoverage['lib/tr8n.js'][948]=0;
_$jscoverage['lib/tr8n.js'][955]=0;
_$jscoverage['lib/tr8n.js'][956]=0;
_$jscoverage['lib/tr8n.js'][959]=0;
_$jscoverage['lib/tr8n.js'][958]=0;
_$jscoverage['lib/tr8n.js'][963]=0;
_$jscoverage['lib/tr8n.js'][1498]=0;
_$jscoverage['lib/tr8n.js'][1022]=0;
_$jscoverage['lib/tr8n.js'][969]=0;
_$jscoverage['lib/tr8n.js'][968]=0;
_$jscoverage['lib/tr8n.js'][971]=0;
_$jscoverage['lib/tr8n.js'][973]=0;
_$jscoverage['lib/tr8n.js'][974]=0;
_$jscoverage['lib/tr8n.js'][972]=0;
_$jscoverage['lib/tr8n.js'][976]=0;
_$jscoverage['lib/tr8n.js'][977]=0;
_$jscoverage['lib/tr8n.js'][981]=0;
_$jscoverage['lib/tr8n.js'][985]=0;
_$jscoverage['lib/tr8n.js'][990]=0;
_$jscoverage['lib/tr8n.js'][1015]=0;
_$jscoverage['lib/tr8n.js'][989]=0;
_$jscoverage['lib/tr8n.js'][992]=0;
_$jscoverage['lib/tr8n.js'][997]=0;
_$jscoverage['lib/tr8n.js'][997]=0;
_$jscoverage['lib/tr8n.js'][998]=0;
_$jscoverage['lib/tr8n.js'][996]=0;
_$jscoverage['lib/tr8n.js'][1000]=0;
_$jscoverage['lib/tr8n.js'][1005]=0;
_$jscoverage['lib/tr8n.js'][1004]=0;
_$jscoverage['lib/tr8n.js'][1007]=0;
_$jscoverage['lib/tr8n.js'][1012]=0;
_$jscoverage['lib/tr8n.js'][1011]=0;
_$jscoverage['lib/tr8n.js'][1017]=0;
_$jscoverage['lib/tr8n.js'][1021]=0;
_$jscoverage['lib/tr8n.js'][1022]=0;
_$jscoverage['lib/tr8n.js'][1521]=0;
_$jscoverage['lib/tr8n.js'][1066]=0;
_$jscoverage['lib/tr8n.js'][1023]=0;
_$jscoverage['lib/tr8n.js'][1065]=0;
_$jscoverage['lib/tr8n.js'][1023]=0;
_$jscoverage['lib/tr8n.js'][1045]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1024]=0;
_$jscoverage['lib/tr8n.js'][1025]=0;
_$jscoverage['lib/tr8n.js'][1064]=0;
_$jscoverage['lib/tr8n.js'][1025]=0;
_$jscoverage['lib/tr8n.js'][1026]=0;
_$jscoverage['lib/tr8n.js'][1030]=0;
_$jscoverage['lib/tr8n.js'][1032]=0;
_$jscoverage['lib/tr8n.js'][1031]=0;
_$jscoverage['lib/tr8n.js'][1033]=0;
_$jscoverage['lib/tr8n.js'][1034]=0;
_$jscoverage['lib/tr8n.js'][1060]=0;
_$jscoverage['lib/tr8n.js'][1039]=0;
_$jscoverage['lib/tr8n.js'][1040]=0;
_$jscoverage['lib/tr8n.js'][1041]=0;
_$jscoverage['lib/tr8n.js'][1042]=0;
_$jscoverage['lib/tr8n.js'][1038]=0;
_$jscoverage['lib/tr8n.js'][1048]=0;
_$jscoverage['lib/tr8n.js'][1049]=0;
_$jscoverage['lib/tr8n.js'][1051]=0;
_$jscoverage['lib/tr8n.js'][1053]=0;
_$jscoverage['lib/tr8n.js'][1059]=0;
_$jscoverage['lib/tr8n.js'][1052]=0;
_$jscoverage['lib/tr8n.js'][1050]=0;
_$jscoverage['lib/tr8n.js'][1059]=0;
_$jscoverage['lib/tr8n.js'][1550]=0;
_$jscoverage['lib/tr8n.js'][1117]=0;
_$jscoverage['lib/tr8n.js'][1068]=0;
_$jscoverage['lib/tr8n.js'][1067]=0;
_$jscoverage['lib/tr8n.js'][1071]=0;
_$jscoverage['lib/tr8n.js'][1116]=0;
_$jscoverage['lib/tr8n.js'][1116]=0;
_$jscoverage['lib/tr8n.js'][1076]=0;
_$jscoverage['lib/tr8n.js'][1077]=0;
_$jscoverage['lib/tr8n.js'][1078]=0;
_$jscoverage['lib/tr8n.js'][1080]=0;
_$jscoverage['lib/tr8n.js'][1081]=0;
_$jscoverage['lib/tr8n.js'][1082]=0;
_$jscoverage['lib/tr8n.js'][1083]=0;
_$jscoverage['lib/tr8n.js'][1111]=0;
_$jscoverage['lib/tr8n.js'][1084]=0;
_$jscoverage['lib/tr8n.js'][1111]=0;
_$jscoverage['lib/tr8n.js'][1087]=0;
_$jscoverage['lib/tr8n.js'][1088]=0;
_$jscoverage['lib/tr8n.js'][1090]=0;
_$jscoverage['lib/tr8n.js'][1095]=0;
_$jscoverage['lib/tr8n.js'][1091]=0;
_$jscoverage['lib/tr8n.js'][1107]=0;
_$jscoverage['lib/tr8n.js'][1092]=0;
_$jscoverage['lib/tr8n.js'][1106]=0;
_$jscoverage['lib/tr8n.js'][1086]=0;
_$jscoverage['lib/tr8n.js'][1098]=0;
_$jscoverage['lib/tr8n.js'][1573]=0;
_$jscoverage['lib/tr8n.js'][1163]=0;
_$jscoverage['lib/tr8n.js'][1123]=0;
_$jscoverage['lib/tr8n.js'][1122]=0;
_$jscoverage['lib/tr8n.js'][1125]=0;
_$jscoverage['lib/tr8n.js'][1124]=0;
_$jscoverage['lib/tr8n.js'][1132]=0;
_$jscoverage['lib/tr8n.js'][1162]=0;
_$jscoverage['lib/tr8n.js'][1131]=0;
_$jscoverage['lib/tr8n.js'][1135]=0;
_$jscoverage['lib/tr8n.js'][1137]=0;
_$jscoverage['lib/tr8n.js'][1139]=0;
_$jscoverage['lib/tr8n.js'][1140]=0;
_$jscoverage['lib/tr8n.js'][1138]=0;
_$jscoverage['lib/tr8n.js'][1136]=0;
_$jscoverage['lib/tr8n.js'][1145]=0;
_$jscoverage['lib/tr8n.js'][1144]=0;
_$jscoverage['lib/tr8n.js'][1160]=0;
_$jscoverage['lib/tr8n.js'][1134]=0;
_$jscoverage['lib/tr8n.js'][1159]=0;
_$jscoverage['lib/tr8n.js'][1150]=0;
_$jscoverage['lib/tr8n.js'][1151]=0;
_$jscoverage['lib/tr8n.js'][1585]=0;
_$jscoverage['lib/tr8n.js'][1200]=0;
_$jscoverage['lib/tr8n.js'][1166]=0;
_$jscoverage['lib/tr8n.js'][1168]=0;
_$jscoverage['lib/tr8n.js'][1167]=0;
_$jscoverage['lib/tr8n.js'][1165]=0;
_$jscoverage['lib/tr8n.js'][1198]=0;
_$jscoverage['lib/tr8n.js'][1172]=0;
_$jscoverage['lib/tr8n.js'][1198]=0;
_$jscoverage['lib/tr8n.js'][1176]=0;
_$jscoverage['lib/tr8n.js'][1177]=0;
_$jscoverage['lib/tr8n.js'][1177]=0;
_$jscoverage['lib/tr8n.js'][1179]=0;
_$jscoverage['lib/tr8n.js'][1183]=0;
_$jscoverage['lib/tr8n.js'][1182]=0;
_$jscoverage['lib/tr8n.js'][1181]=0;
_$jscoverage['lib/tr8n.js'][1188]=0;
_$jscoverage['lib/tr8n.js'][1186]=0;
_$jscoverage['lib/tr8n.js'][1185]=0;
_$jscoverage['lib/tr8n.js'][1189]=0;
_$jscoverage['lib/tr8n.js'][1611]=0;
_$jscoverage['lib/tr8n.js'][1237]=0;
_$jscoverage['lib/tr8n.js'][1234]=0;
_$jscoverage['lib/tr8n.js'][1201]=0;
_$jscoverage['lib/tr8n.js'][1202]=0;
_$jscoverage['lib/tr8n.js'][1227]=0;
_$jscoverage['lib/tr8n.js'][1203]=0;
_$jscoverage['lib/tr8n.js'][1205]=0;
_$jscoverage['lib/tr8n.js'][1235]=0;
_$jscoverage['lib/tr8n.js'][1204]=0;
_$jscoverage['lib/tr8n.js'][1211]=0;
_$jscoverage['lib/tr8n.js'][1216]=0;
_$jscoverage['lib/tr8n.js'][1217]=0;
_$jscoverage['lib/tr8n.js'][1218]=0;
_$jscoverage['lib/tr8n.js'][1221]=0;
_$jscoverage['lib/tr8n.js'][1222]=0;
_$jscoverage['lib/tr8n.js'][1223]=0;
_$jscoverage['lib/tr8n.js'][1230]=0;
_$jscoverage['lib/tr8n.js'][1236]=0;
_$jscoverage['lib/tr8n.js'][1637]=0;
_$jscoverage['lib/tr8n.js'][1268]=0;
_$jscoverage['lib/tr8n.js'][1262]=0;
_$jscoverage['lib/tr8n.js'][1250]=0;
_$jscoverage['lib/tr8n.js'][1246]=0;
_$jscoverage['lib/tr8n.js'][1253]=0;
_$jscoverage['lib/tr8n.js'][1241]=0;
_$jscoverage['lib/tr8n.js'][1240]=0;
_$jscoverage['lib/tr8n.js'][1243]=0;
_$jscoverage['lib/tr8n.js'][1244]=0;
_$jscoverage['lib/tr8n.js'][1247]=0;
_$jscoverage['lib/tr8n.js'][1251]=0;
_$jscoverage['lib/tr8n.js'][1254]=0;
_$jscoverage['lib/tr8n.js'][1253]=0;
_$jscoverage['lib/tr8n.js'][1265]=0;
_$jscoverage['lib/tr8n.js'][1255]=0;
_$jscoverage['lib/tr8n.js'][1256]=0;
_$jscoverage['lib/tr8n.js'][1259]=0;
_$jscoverage['lib/tr8n.js'][1258]=0;
_$jscoverage['lib/tr8n.js'][1261]=0;
_$jscoverage['lib/tr8n.js'][1263]=0;
_$jscoverage['lib/tr8n.js'][1662]=0;
_$jscoverage['lib/tr8n.js'][1299]=0;
_$jscoverage['lib/tr8n.js'][1291]=0;
_$jscoverage['lib/tr8n.js'][1273]=0;
_$jscoverage['lib/tr8n.js'][1272]=0;
_$jscoverage['lib/tr8n.js'][1276]=0;
_$jscoverage['lib/tr8n.js'][1295]=0;
_$jscoverage['lib/tr8n.js'][1281]=0;
_$jscoverage['lib/tr8n.js'][1280]=0;
_$jscoverage['lib/tr8n.js'][1283]=0;
_$jscoverage['lib/tr8n.js'][1282]=0;
_$jscoverage['lib/tr8n.js'][1284]=0;
_$jscoverage['lib/tr8n.js'][1288]=0;
_$jscoverage['lib/tr8n.js'][1292]=0;
_$jscoverage['lib/tr8n.js'][1293]=0;
_$jscoverage['lib/tr8n.js'][1294]=0;
_$jscoverage['lib/tr8n.js'][1296]=0;
_$jscoverage['lib/tr8n.js'][1297]=0;
_$jscoverage['lib/tr8n.js'][1675]=0;
_$jscoverage['lib/tr8n.js'][1330]=0;
_$jscoverage['lib/tr8n.js'][1328]=0;
_$jscoverage['lib/tr8n.js'][1328]=0;
_$jscoverage['lib/tr8n.js'][1300]=0;
_$jscoverage['lib/tr8n.js'][1303]=0;
_$jscoverage['lib/tr8n.js'][1304]=0;
_$jscoverage['lib/tr8n.js'][1305]=0;
_$jscoverage['lib/tr8n.js'][1309]=0;
_$jscoverage['lib/tr8n.js'][1310]=0;
_$jscoverage['lib/tr8n.js'][1315]=0;
_$jscoverage['lib/tr8n.js'][1314]=0;
_$jscoverage['lib/tr8n.js'][1318]=0;
_$jscoverage['lib/tr8n.js'][1317]=0;
_$jscoverage['lib/tr8n.js'][1320]=0;
_$jscoverage['lib/tr8n.js'][1327]=0;
_$jscoverage['lib/tr8n.js'][1324]=0;
_$jscoverage['lib/tr8n.js'][1325]=0;
_$jscoverage['lib/tr8n.js'][1707]=0;
_$jscoverage['lib/tr8n.js'][1367]=0;
_$jscoverage['lib/tr8n.js'][1332]=0;
_$jscoverage['lib/tr8n.js'][1333]=0;
_$jscoverage['lib/tr8n.js'][1335]=0;
_$jscoverage['lib/tr8n.js'][1338]=0;
_$jscoverage['lib/tr8n.js'][1337]=0;
_$jscoverage['lib/tr8n.js'][1341]=0;
_$jscoverage['lib/tr8n.js'][1340]=0;
_$jscoverage['lib/tr8n.js'][1343]=0;
_$jscoverage['lib/tr8n.js'][1348]=0;
_$jscoverage['lib/tr8n.js'][1363]=0;
_$jscoverage['lib/tr8n.js'][1347]=0;
_$jscoverage['lib/tr8n.js'][1350]=0;
_$jscoverage['lib/tr8n.js'][1354]=0;
_$jscoverage['lib/tr8n.js'][1359]=0;
_$jscoverage['lib/tr8n.js'][1719]=0;
_$jscoverage['lib/tr8n.js'][1406]=0;
_$jscoverage['lib/tr8n.js'][1371]=0;
_$jscoverage['lib/tr8n.js'][1371]=0;
_$jscoverage['lib/tr8n.js'][1372]=0;
_$jscoverage['lib/tr8n.js'][1376]=0;
_$jscoverage['lib/tr8n.js'][1376]=0;
_$jscoverage['lib/tr8n.js'][1379]=0;
_$jscoverage['lib/tr8n.js'][1382]=0;
_$jscoverage['lib/tr8n.js'][1406]=0;
_$jscoverage['lib/tr8n.js'][1381]=0;
_$jscoverage['lib/tr8n.js'][1380]=0;
_$jscoverage['lib/tr8n.js'][1378]=0;
_$jscoverage['lib/tr8n.js'][1390]=0;
_$jscoverage['lib/tr8n.js'][1398]=0;
_$jscoverage['lib/tr8n.js'][1402]=0;
_$jscoverage['lib/tr8n.js'][1737]=0;
_$jscoverage['lib/tr8n.js'][1429]=0;
_$jscoverage['lib/tr8n.js'][1407]=0;
_$jscoverage['lib/tr8n.js'][1411]=0;
_$jscoverage['lib/tr8n.js'][1411]=0;
_$jscoverage['lib/tr8n.js'][1412]=0;
_$jscoverage['lib/tr8n.js'][1416]=0;
_$jscoverage['lib/tr8n.js'][1416]=0;
_$jscoverage['lib/tr8n.js'][1417]=0;
_$jscoverage['lib/tr8n.js'][1421]=0;
_$jscoverage['lib/tr8n.js'][1425]=0;
_$jscoverage['lib/tr8n.js'][1427]=0;
_$jscoverage['lib/tr8n.js'][1428]=0;
_$jscoverage['lib/tr8n.js'][1750]=0;
_$jscoverage['lib/tr8n.js'][1456]=0;
_$jscoverage['lib/tr8n.js'][1435]=0;
_$jscoverage['lib/tr8n.js'][1439]=0;
_$jscoverage['lib/tr8n.js'][1439]=0;
_$jscoverage['lib/tr8n.js'][1441]=0;
_$jscoverage['lib/tr8n.js'][1442]=0;
_$jscoverage['lib/tr8n.js'][1444]=0;
_$jscoverage['lib/tr8n.js'][1446]=0;
_$jscoverage['lib/tr8n.js'][1432]=0;
_$jscoverage['lib/tr8n.js'][1431]=0;
_$jscoverage['lib/tr8n.js'][1448]=0;
_$jscoverage['lib/tr8n.js'][1445]=0;
_$jscoverage['lib/tr8n.js'][1451]=0;
_$jscoverage['lib/tr8n.js'][1455]=0;
_$jscoverage['lib/tr8n.js'][1430]=0;
_$jscoverage['lib/tr8n.js'][1768]=0;
_$jscoverage['lib/tr8n.js'][1480]=0;
_$jscoverage['lib/tr8n.js'][1457]=0;
_$jscoverage['lib/tr8n.js'][1462]=0;
_$jscoverage['lib/tr8n.js'][1461]=0;
_$jscoverage['lib/tr8n.js'][1463]=0;
_$jscoverage['lib/tr8n.js'][1460]=0;
_$jscoverage['lib/tr8n.js'][1467]=0;
_$jscoverage['lib/tr8n.js'][1466]=0;
_$jscoverage['lib/tr8n.js'][1470]=0;
_$jscoverage['lib/tr8n.js'][1471]=0;
_$jscoverage['lib/tr8n.js'][1475]=0;
_$jscoverage['lib/tr8n.js'][1476]=0;
_$jscoverage['lib/tr8n.js'][1474]=0;
_$jscoverage['lib/tr8n.js'][1478]=0;
_$jscoverage['lib/tr8n.js'][1777]=0;
_$jscoverage['lib/tr8n.js'][1506]=0;
_$jscoverage['lib/tr8n.js'][1483]=0;
_$jscoverage['lib/tr8n.js'][1487]=0;
_$jscoverage['lib/tr8n.js'][1488]=0;
_$jscoverage['lib/tr8n.js'][1489]=0;
_$jscoverage['lib/tr8n.js'][1490]=0;
_$jscoverage['lib/tr8n.js'][1495]=0;
_$jscoverage['lib/tr8n.js'][1505]=0;
_$jscoverage['lib/tr8n.js'][1496]=0;
_$jscoverage['lib/tr8n.js'][1481]=0;
_$jscoverage['lib/tr8n.js'][1499]=0;
_$jscoverage['lib/tr8n.js'][1497]=0;
_$jscoverage['lib/tr8n.js'][1501]=0;
_$jscoverage['lib/tr8n.js'][1502]=0;
_$jscoverage['lib/tr8n.js'][1494]=0;
_$jscoverage['lib/tr8n.js'][1796]=0;
_$jscoverage['lib/tr8n.js'][1540]=0;
_$jscoverage['lib/tr8n.js'][1535]=0;
_$jscoverage['lib/tr8n.js'][1537]=0;
_$jscoverage['lib/tr8n.js'][1510]=0;
_$jscoverage['lib/tr8n.js'][1511]=0;
_$jscoverage['lib/tr8n.js'][1515]=0;
_$jscoverage['lib/tr8n.js'][1538]=0;
_$jscoverage['lib/tr8n.js'][1517]=0;
_$jscoverage['lib/tr8n.js'][1520]=0;
_$jscoverage['lib/tr8n.js'][1536]=0;
_$jscoverage['lib/tr8n.js'][1522]=0;
_$jscoverage['lib/tr8n.js'][1523]=0;
_$jscoverage['lib/tr8n.js'][1519]=0;
_$jscoverage['lib/tr8n.js'][1529]=0;
_$jscoverage['lib/tr8n.js'][1530]=0;
_$jscoverage['lib/tr8n.js'][1533]=0;
_$jscoverage['lib/tr8n.js'][1532]=0;
_$jscoverage['lib/tr8n.js'][1795]=0;
_$jscoverage['lib/tr8n.js'][1566]=0;
_$jscoverage['lib/tr8n.js'][1544]=0;
_$jscoverage['lib/tr8n.js'][1566]=0;
_$jscoverage['lib/tr8n.js'][1543]=0;
_$jscoverage['lib/tr8n.js'][1547]=0;
_$jscoverage['lib/tr8n.js'][1546]=0;
_$jscoverage['lib/tr8n.js'][1549]=0;
_$jscoverage['lib/tr8n.js'][1552]=0;
_$jscoverage['lib/tr8n.js'][1559]=0;
_$jscoverage['lib/tr8n.js'][1559]=0;
_$jscoverage['lib/tr8n.js'][1561]=0;
_$jscoverage['lib/tr8n.js'][1561]=0;
_$jscoverage['lib/tr8n.js'][1564]=0;
_$jscoverage['lib/tr8n.js'][1563]=0;
_$jscoverage['lib/tr8n.js'][1556]=0;
_$jscoverage['lib/tr8n.js'][1831]=0;
_$jscoverage['lib/tr8n.js'][1587]=0;
_$jscoverage['lib/tr8n.js'][1586]=0;
_$jscoverage['lib/tr8n.js'][1568]=0;
_$jscoverage['lib/tr8n.js'][1569]=0;
_$jscoverage['lib/tr8n.js'][1572]=0;
_$jscoverage['lib/tr8n.js'][1574]=0;
_$jscoverage['lib/tr8n.js'][1576]=0;
_$jscoverage['lib/tr8n.js'][1584]=0;
_$jscoverage['lib/tr8n.js'][1578]=0;
_$jscoverage['lib/tr8n.js'][1580]=0;
_$jscoverage['lib/tr8n.js'][1577]=0;
_$jscoverage['lib/tr8n.js'][1575]=0;
_$jscoverage['lib/tr8n.js'][1571]=0;
_$jscoverage['lib/tr8n.js'][1583]=0;
_$jscoverage['lib/tr8n.js'][1848]=0;
_$jscoverage['lib/tr8n.js'][1632]=0;
_$jscoverage['lib/tr8n.js'][1626]=0;
_$jscoverage['lib/tr8n.js'][1598]=0;
_$jscoverage['lib/tr8n.js'][1600]=0;
_$jscoverage['lib/tr8n.js'][1602]=0;
_$jscoverage['lib/tr8n.js'][1601]=0;
_$jscoverage['lib/tr8n.js'][1631]=0;
_$jscoverage['lib/tr8n.js'][1605]=0;
_$jscoverage['lib/tr8n.js'][1597]=0;
_$jscoverage['lib/tr8n.js'][1615]=0;
_$jscoverage['lib/tr8n.js'][1616]=0;
_$jscoverage['lib/tr8n.js'][1620]=0;
_$jscoverage['lib/tr8n.js'][1627]=0;
_$jscoverage['lib/tr8n.js'][1608]=0;
_$jscoverage['lib/tr8n.js'][1866]=0;
_$jscoverage['lib/tr8n.js'][1660]=0;
_$jscoverage['lib/tr8n.js'][1634]=0;
_$jscoverage['lib/tr8n.js'][1636]=0;
_$jscoverage['lib/tr8n.js'][1640]=0;
_$jscoverage['lib/tr8n.js'][1639]=0;
_$jscoverage['lib/tr8n.js'][1642]=0;
_$jscoverage['lib/tr8n.js'][1649]=0;
_$jscoverage['lib/tr8n.js'][1648]=0;
_$jscoverage['lib/tr8n.js'][1645]=0;
_$jscoverage['lib/tr8n.js'][1652]=0;
_$jscoverage['lib/tr8n.js'][1651]=0;
_$jscoverage['lib/tr8n.js'][1654]=0;
_$jscoverage['lib/tr8n.js'][1878]=0;
_$jscoverage['lib/tr8n.js'][1691]=0;
_$jscoverage['lib/tr8n.js'][1690]=0;
_$jscoverage['lib/tr8n.js'][1688]=0;
_$jscoverage['lib/tr8n.js'][1668]=0;
_$jscoverage['lib/tr8n.js'][1668]=0;
_$jscoverage['lib/tr8n.js'][1669]=0;
_$jscoverage['lib/tr8n.js'][1673]=0;
_$jscoverage['lib/tr8n.js'][1677]=0;
_$jscoverage['lib/tr8n.js'][1676]=0;
_$jscoverage['lib/tr8n.js'][1661]=0;
_$jscoverage['lib/tr8n.js'][1687]=0;
_$jscoverage['lib/tr8n.js'][1680]=0;
_$jscoverage['lib/tr8n.js'][1685]=0;
_$jscoverage['lib/tr8n.js'][1684]=0;
_$jscoverage['lib/tr8n.js'][1893]=0;
_$jscoverage['lib/tr8n.js'][1727]=0;
_$jscoverage['lib/tr8n.js'][1698]=0;
_$jscoverage['lib/tr8n.js'][1708]=0;
_$jscoverage['lib/tr8n.js'][1723]=0;
_$jscoverage['lib/tr8n.js'][1706]=0;
_$jscoverage['lib/tr8n.js'][1710]=0;
_$jscoverage['lib/tr8n.js'][1715]=0;
_$jscoverage['lib/tr8n.js'][1725]=0;
_$jscoverage['lib/tr8n.js'][1717]=0;
_$jscoverage['lib/tr8n.js'][1724]=0;
_$jscoverage['lib/tr8n.js'][1716]=0;
_$jscoverage['lib/tr8n.js'][1714]=0;
_$jscoverage['lib/tr8n.js'][1857]=0;
_$jscoverage['lib/tr8n.js'][1758]=0;
_$jscoverage['lib/tr8n.js'][1732]=0;
_$jscoverage['lib/tr8n.js'][1733]=0;
_$jscoverage['lib/tr8n.js'][1731]=0;
_$jscoverage['lib/tr8n.js'][1746]=0;
_$jscoverage['lib/tr8n.js'][1738]=0;
_$jscoverage['lib/tr8n.js'][1736]=0;
_$jscoverage['lib/tr8n.js'][1740]=0;
_$jscoverage['lib/tr8n.js'][1747]=0;
_$jscoverage['lib/tr8n.js'][1755]=0;
_$jscoverage['lib/tr8n.js'][1749]=0;
_$jscoverage['lib/tr8n.js'][1909]=0;
_$jscoverage['lib/tr8n.js'][1778]=0;
_$jscoverage['lib/tr8n.js'][1773]=0;
_$jscoverage['lib/tr8n.js'][1772]=0;
_$jscoverage['lib/tr8n.js'][1766]=0;
_$jscoverage['lib/tr8n.js'][1776]=0;
_$jscoverage['lib/tr8n.js'][1775]=0;
_$jscoverage['lib/tr8n.js'][1763]=0;
_$jscoverage['lib/tr8n.js'][1762]=0;
_$jscoverage['lib/tr8n.js'][1775]=0;
_$jscoverage['lib/tr8n.js'][1765]=0;
_$jscoverage['lib/tr8n.js'][1767]=0;
_$jscoverage['lib/tr8n.js'][1768]=0;
_$jscoverage['lib/tr8n.js'][1770]=0;
_$jscoverage['lib/tr8n.js'][1774]=0;
_$jscoverage['lib/tr8n.js'][1929]=0;
_$jscoverage['lib/tr8n.js'][1805]=0;
_$jscoverage['lib/tr8n.js'][1783]=0;
_$jscoverage['lib/tr8n.js'][1804]=0;
_$jscoverage['lib/tr8n.js'][1792]=0;
_$jscoverage['lib/tr8n.js'][1791]=0;
_$jscoverage['lib/tr8n.js'][1798]=0;
_$jscoverage['lib/tr8n.js'][1799]=0;
_$jscoverage['lib/tr8n.js'][1801]=0;
_$jscoverage['lib/tr8n.js'][1800]=0;
_$jscoverage['lib/tr8n.js'][1949]=0;
_$jscoverage['lib/tr8n.js'][1826]=0;
_$jscoverage['lib/tr8n.js'][1822]=0;
_$jscoverage['lib/tr8n.js'][1811]=0;
_$jscoverage['lib/tr8n.js'][1807]=0;
_$jscoverage['lib/tr8n.js'][1806]=0;
_$jscoverage['lib/tr8n.js'][1813]=0;
_$jscoverage['lib/tr8n.js'][1817]=0;
_$jscoverage['lib/tr8n.js'][1818]=0;
_$jscoverage['lib/tr8n.js'][1820]=0;
_$jscoverage['lib/tr8n.js'][1819]=0;
_$jscoverage['lib/tr8n.js'][1956]=0;
_$jscoverage['lib/tr8n.js'][1853]=0;
_$jscoverage['lib/tr8n.js'][1837]=0;
_$jscoverage['lib/tr8n.js'][1844]=0;
_$jscoverage['lib/tr8n.js'][1846]=0;
_$jscoverage['lib/tr8n.js'][1847]=0;
_$jscoverage['lib/tr8n.js'][1849]=0;
_$jscoverage['lib/tr8n.js'][1843]=0;
_$jscoverage['lib/tr8n.js'][1954]=0;
_$jscoverage['lib/tr8n.js'][1872]=0;
_$jscoverage['lib/tr8n.js'][1861]=0;
_$jscoverage['lib/tr8n.js'][1860]=0;
_$jscoverage['lib/tr8n.js'][1862]=0;
_$jscoverage['lib/tr8n.js'][1867]=0;
_$jscoverage['lib/tr8n.js'][1854]=0;
_$jscoverage['lib/tr8n.js'][1868]=0;
_$jscoverage['lib/tr8n.js'][1969]=0;
_$jscoverage['lib/tr8n.js'][1887]=0;
_$jscoverage['lib/tr8n.js'][1876]=0;
_$jscoverage['lib/tr8n.js'][1875]=0;
_$jscoverage['lib/tr8n.js'][1873]=0;
_$jscoverage['lib/tr8n.js'][1881]=0;
_$jscoverage['lib/tr8n.js'][1880]=0;
_$jscoverage['lib/tr8n.js'][1883]=0;
_$jscoverage['lib/tr8n.js'][1974]=0;
_$jscoverage['lib/tr8n.js'][1903]=0;
_$jscoverage['lib/tr8n.js'][1901]=0;
_$jscoverage['lib/tr8n.js'][1890]=0;
_$jscoverage['lib/tr8n.js'][1891]=0;
_$jscoverage['lib/tr8n.js'][1888]=0;
_$jscoverage['lib/tr8n.js'][1898]=0;
_$jscoverage['lib/tr8n.js'][1900]=0;
_$jscoverage['lib/tr8n.js'][1897]=0;
_$jscoverage['lib/tr8n.js'][1982]=0;
_$jscoverage['lib/tr8n.js'][1925]=0;
_$jscoverage['lib/tr8n.js'][1921]=0;
_$jscoverage['lib/tr8n.js'][1910]=0;
_$jscoverage['lib/tr8n.js'][1912]=0;
_$jscoverage['lib/tr8n.js'][1914]=0;
_$jscoverage['lib/tr8n.js'][1924]=0;
_$jscoverage['lib/tr8n.js'][1916]=0;
_$jscoverage['lib/tr8n.js'][1915]=0;
_$jscoverage['lib/tr8n.js'][1995]=0;
_$jscoverage['lib/tr8n.js'][1945]=0;
_$jscoverage['lib/tr8n.js'][1941]=0;
_$jscoverage['lib/tr8n.js'][1930]=0;
_$jscoverage['lib/tr8n.js'][1932]=0;
_$jscoverage['lib/tr8n.js'][1934]=0;
_$jscoverage['lib/tr8n.js'][1933]=0;
_$jscoverage['lib/tr8n.js'][1937]=0;
_$jscoverage['lib/tr8n.js'][1931]=0;
_$jscoverage['lib/tr8n.js'][2004]=0;
_$jscoverage['lib/tr8n.js'][1960]=0;
_$jscoverage['lib/tr8n.js'][1958]=0;
_$jscoverage['lib/tr8n.js'][1950]=0;
_$jscoverage['lib/tr8n.js'][1948]=0;
_$jscoverage['lib/tr8n.js'][1957]=0;
_$jscoverage['lib/tr8n.js'][1955]=0;
_$jscoverage['lib/tr8n.js'][1946]=0;
_$jscoverage['lib/tr8n.js'][1951]=0;
_$jscoverage['lib/tr8n.js'][1953]=0;
_$jscoverage['lib/tr8n.js'][1955]=0;
_$jscoverage['lib/tr8n.js'][2019]=0;
_$jscoverage['lib/tr8n.js'][1972]=0;
_$jscoverage['lib/tr8n.js'][1965]=0;
_$jscoverage['lib/tr8n.js'][1971]=0;
_$jscoverage['lib/tr8n.js'][2022]=0;
_$jscoverage['lib/tr8n.js'][1973]=0;
_$jscoverage['lib/tr8n.js'][2023]=0;
_$jscoverage['lib/tr8n.js'][1994]=0;
_$jscoverage['lib/tr8n.js'][1983]=0;
_$jscoverage['lib/tr8n.js'][1993]=0;
_$jscoverage['lib/tr8n.js'][1989]=0;
_$jscoverage['lib/tr8n.js'][1978]=0;
_$jscoverage['lib/tr8n.js'][1986]=0;
_$jscoverage['lib/tr8n.js'][1975]=0;
_$jscoverage['lib/tr8n.js'][2030]=0;
_$jscoverage['lib/tr8n.js'][2002]=0;
_$jscoverage['lib/tr8n.js'][1999]=0;
_$jscoverage['lib/tr8n.js'][1999]=0;
_$jscoverage['lib/tr8n.js'][2001]=0;
_$jscoverage['lib/tr8n.js'][2033]=0;
_$jscoverage['lib/tr8n.js'][2022]=0;
_$jscoverage['lib/tr8n.js'][2009]=0;
_$jscoverage['lib/tr8n.js'][2021]=0;
_$jscoverage['lib/tr8n.js'][2011]=0;
_$jscoverage['lib/tr8n.js'][2008]=0;
_$jscoverage['lib/tr8n.js'][2036]=0;
_$jscoverage['lib/tr8n.js'][2029]=0;
_$jscoverage['lib/tr8n.js'][2028]=0;
_$jscoverage['lib/tr8n.js'][2031]=0;
_$jscoverage['lib/tr8n.js'][2032]=0;
_$jscoverage['lib/tr8n.js'][2034]=0;
_$jscoverage['lib/tr8n.js'][2035]=0;
_$jscoverage['lib/tr8n.js'][2037]=0;
_$jscoverage['lib/tr8n.js'][2040]=0;
_$jscoverage['lib/tr8n.js'][2041]=0;
_$jscoverage['lib/tr8n.js'][2044]=0;
_$jscoverage['lib/tr8n.js'][2045]=0;
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
Tr8n.Utils = {

  hashValue: function(hash, key, defaultValue) {
    _$jscoverage['lib/tr8n.js'][213]++;
defaultValue = defaultValue || null;
    _$jscoverage['lib/tr8n.js'][214]++;
var parts = key.split(".");
    _$jscoverage['lib/tr8n.js'][215]++;
for(var i=0; i<parts.length; i++) {
      _$jscoverage['lib/tr8n.js'][216]++;
var part = parts[i];
      _$jscoverage['lib/tr8n.js'][217]++;
if (typeof hash[part] === "undefined") {
_$jscoverage['lib/tr8n.js'][217]++;
return defaultValue;}

      _$jscoverage['lib/tr8n.js'][218]++;
hash = hash[part];
    }
    _$jscoverage['lib/tr8n.js'][220]++;
return hash;
  },
  
  stripTags: function(input, allowed) {
    _$jscoverage['lib/tr8n.js'][224]++;
allowed = (((allowed || '') + '')
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join('');     _$jscoverage['lib/tr8n.js'][227]++;
var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    _$jscoverage['lib/tr8n.js'][229]++;
return input.replace(commentsAndPhpTags, '')
      .replace(tags, function($0, $1) {
        _$jscoverage['lib/tr8n.js'][231]++;
return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
  },
  
  splitSentences: function(text) {
    _$jscoverage['lib/tr8n.js'][236]++;
var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
    _$jscoverage['lib/tr8n.js'][237]++;
return Tr8n.Utils.stripTags(text).match(sentenceRegex);
  },
  
  unique: function(elements) {
    _$jscoverage['lib/tr8n.js'][241]++;
return elements.reverse().filter(function (e, i, arr) {
      _$jscoverage['lib/tr8n.js'][242]++;
return arr.indexOf(e, i+1) === -1;
    }).reverse();
  },
  
  extend: function(destination, source) {
    _$jscoverage['lib/tr8n.js'][247]++;
for (var property in source)
      {
_$jscoverage['lib/tr8n.js'][248]++;
destination[property] = source[property];}

    _$jscoverage['lib/tr8n.js'][249]++;
return destination;
  },
  
  clone: function(obj) {
    _$jscoverage['lib/tr8n.js'][253]++;
if(obj == null || typeof(obj) != 'object')
      {
_$jscoverage['lib/tr8n.js'][254]++;
return obj;}

  
    _$jscoverage['lib/tr8n.js'][256]++;
var temp = obj.constructor();   
    _$jscoverage['lib/tr8n.js'][257]++;
for(var key in obj)
      {
_$jscoverage['lib/tr8n.js'][258]++;
temp[key] = clone(obj[key]);}

    _$jscoverage['lib/tr8n.js'][259]++;
return temp;
  },
  
  keys: function(obj) {
        _$jscoverage['lib/tr8n.js'][263]++;
return Object.keys(obj);
  },
  
  generateKey: function(label, description) {
    _$jscoverage['lib/tr8n.js'][267]++;
return MD5(label + ";;;" + description);
  }

};;
_$jscoverage['lib/tr8n.js'][271]++;
Tr8n.Configuration = function() {
  _$jscoverage['lib/tr8n.js'][272]++;
this.initDefaultTokens();
  _$jscoverage['lib/tr8n.js'][273]++;
this.initTranslatorOptions();
  _$jscoverage['lib/tr8n.js'][274]++;
this.initContextRules();
  _$jscoverage['lib/tr8n.js'][275]++;
this.enabled = true;
  _$jscoverage['lib/tr8n.js'][276]++;
this.default_locale = "en-US";
};

_$jscoverage['lib/tr8n.js'][279]++;
Tr8n.Configuration.prototype = {
  initDefaultTokens: function() {
    _$jscoverage['lib/tr8n.js'][281]++;
this.default_tokens = {
        html : {
          data : {
            ndash  :  "&ndash;",                   mdash  :  "&mdash;",                   iexcl  :  "&iexcl;",                   iquest :  "&iquest;",                  quot   :  "&quot;",                    ldquo  :  "&ldquo;",                   rdquo  :  "&rdquo;",                   lsquo  :  "&lsquo;",                   rsquo  :  "&rsquo;",                   laquo  :  "&laquo;",                   raquo  :  "&raquo;",                   nbsp   :  "&nbsp;",                    lsaquo :  "&lsaquo;",                  rsaquo :  "&rsaquo;",                  br     :  "<br/>",                     lbrace :  "{",
            rbrace :  "}",
            trade  :  "&trade;"                 },
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

  },

  getDefaultToken: function(token, type, format) {
    _$jscoverage['lib/tr8n.js'][347]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][347]++;
format = format || "html";
    _$jscoverage['lib/tr8n.js'][348]++;
if (typeof this.default_tokens[format][type][token] === 'undefined') {
_$jscoverage['lib/tr8n.js'][348]++;
return null;}

    _$jscoverage['lib/tr8n.js'][349]++;
return new String(this.default_tokens[format][type][token]);
  },

  setDefaultToken: function(token, value, type, format) {
    _$jscoverage['lib/tr8n.js'][353]++;
type = type || "data"; _$jscoverage['lib/tr8n.js'][353]++;
format = format || "html";
    _$jscoverage['lib/tr8n.js'][354]++;
this.default_tokens[format] = this.default_tokens[format] || {};
    _$jscoverage['lib/tr8n.js'][355]++;
this.default_tokens[format][type] = this.default_tokens[format][type] || {};
    _$jscoverage['lib/tr8n.js'][356]++;
this.default_tokens[format][type][token] = value;
  },

  initTranslatorOptions: function() {
    _$jscoverage['lib/tr8n.js'][360]++;
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
  },

  initContextRules: function() {
    _$jscoverage['lib/tr8n.js'][390]++;
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
            _$jscoverage['lib/tr8n.js'][402]++;
var genders = [];
            _$jscoverage['lib/tr8n.js'][403]++;
list.forEach(function(obj) {
              _$jscoverage['lib/tr8n.js'][404]++;
genders.push(obj.gender);
            });
            _$jscoverage['lib/tr8n.js'][406]++;
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
  },

  getContextRules: function(key) {
    _$jscoverage['lib/tr8n.js'][420]++;
return this.context_rules[key] || {};
  },

  isDisabled: function() {
    _$jscoverage['lib/tr8n.js'][424]++;
return !enabled;
  },

  isEnabled: function() {
    _$jscoverage['lib/tr8n.js'][428]++;
return enabled;
  },

  getTokenObject: function(tokens, name) {
    _$jscoverage['lib/tr8n.js'][432]++;
if (tokens == null) {
_$jscoverage['lib/tr8n.js'][432]++;
return null;}


    _$jscoverage['lib/tr8n.js'][434]++;
var object = tokens[name];
    _$jscoverage['lib/tr8n.js'][435]++;
if (typeof object === 'array')
      {
_$jscoverage['lib/tr8n.js'][436]++;
return object[0];}


    _$jscoverage['lib/tr8n.js'][438]++;
return object.object || object;
  },

  getSupportedTokens: function() {
    _$jscoverage['lib/tr8n.js'][442]++;
return [
      [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
      [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
      [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
    ];
  }

};;
_$jscoverage['lib/tr8n.js'][450]++;
Tr8n.Tokens.Data = function(name, label) {
  _$jscoverage['lib/tr8n.js'][451]++;
this.full_name = name;
  _$jscoverage['lib/tr8n.js'][452]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][453]++;
this.parseElements();
};

_$jscoverage['lib/tr8n.js'][456]++;
Tr8n.Tokens.Data.prototype = {
  parseElements: function() {
    _$jscoverage['lib/tr8n.js'][458]++;
var name_without_parens = this.full_name.substring(1, this.full_name.length-1);
    _$jscoverage['lib/tr8n.js'][459]++;
var name_without_case_keys = name_without_parens.split('::')[0].trim();
  
    _$jscoverage['lib/tr8n.js'][461]++;
this.short_name = name_without_parens.split(':')[0].trim();
    _$jscoverage['lib/tr8n.js'][462]++;
this.case_keys = [];
  
    _$jscoverage['lib/tr8n.js'][464]++;
var keys = name_without_parens.match(/(::\s*\w+)/g) || [];
    _$jscoverage['lib/tr8n.js'][465]++;
for (var i=0; i<keys.length; i++) {
      _$jscoverage['lib/tr8n.js'][466]++;
this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
    }
  
    _$jscoverage['lib/tr8n.js'][469]++;
this.context_keys = [];
    _$jscoverage['lib/tr8n.js'][470]++;
keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
    _$jscoverage['lib/tr8n.js'][471]++;
for (i=0; i<keys.length; i++) {
      _$jscoverage['lib/tr8n.js'][472]++;
this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
    }
  },
  
  getContextForLanguage: function(language) {
    _$jscoverage['lib/tr8n.js'][477]++;
if (this.context_keys.length > 0)
      {
_$jscoverage['lib/tr8n.js'][478]++;
return language.getContextByKeyword(this.context_keys[0]);}

  
    _$jscoverage['lib/tr8n.js'][480]++;
return language.getContextByTokenName(this.short_name);
  },
  
  tokenObject: function(tokens, name) {
    _$jscoverage['lib/tr8n.js'][484]++;
if (tokens == null) {
_$jscoverage['lib/tr8n.js'][484]++;
return null;}

  
    _$jscoverage['lib/tr8n.js'][486]++;
var object = tokens[name];
    _$jscoverage['lib/tr8n.js'][487]++;
if (typeof object === 'array')
      {
_$jscoverage['lib/tr8n.js'][488]++;
return object[0];}

  
    _$jscoverage['lib/tr8n.js'][490]++;
return object.object || object;
  },
  
  error: function(msg) {
    _$jscoverage['lib/tr8n.js'][494]++;
console.log(this.full_name + " in \"" + this.label + "\" : " + msg);
    _$jscoverage['lib/tr8n.js'][495]++;
return this.full_name;
  },
  
    
  getTokenValueFromArrayParam: function(arr, language, options) {
    _$jscoverage['lib/tr8n.js'][500]++;
options = options || {};
    _$jscoverage['lib/tr8n.js'][501]++;
if (arr.lenght == 0)
      {
_$jscoverage['lib/tr8n.js'][502]++;
return this.error("Invalid number of params of an array");}

  
    _$jscoverage['lib/tr8n.js'][504]++;
var object = arr[0];
    _$jscoverage['lib/tr8n.js'][505]++;
var method = arr.lenght > 1 ? arr[1] : null;
  
    _$jscoverage['lib/tr8n.js'][507]++;
if (typeof object === "array")
      {
_$jscoverage['lib/tr8n.js'][508]++;
return this.getTokenValueFromArray(arr, language, options);}

  
    _$jscoverage['lib/tr8n.js'][510]++;
if (method == null)
      {
_$jscoverage['lib/tr8n.js'][511]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));}

  
    _$jscoverage['lib/tr8n.js'][513]++;
if (method.match(/^@@/))
      {
_$jscoverage['lib/tr8n.js'][514]++;
return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));}

  
    _$jscoverage['lib/tr8n.js'][516]++;
if (method.match(/^@/))
      {
_$jscoverage['lib/tr8n.js'][517]++;
return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));}

  
    _$jscoverage['lib/tr8n.js'][519]++;
return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
  },
  
  
    
  getTokenValueFromHashParam: function(hash, language, options) {
    _$jscoverage['lib/tr8n.js'][525]++;
options = options || {};
    _$jscoverage['lib/tr8n.js'][526]++;
var value = hash.value;
    _$jscoverage['lib/tr8n.js'][527]++;
var object = hash.object;
  
    _$jscoverage['lib/tr8n.js'][529]++;
if (value) {
_$jscoverage['lib/tr8n.js'][529]++;
return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));}

    _$jscoverage['lib/tr8n.js'][530]++;
if (!object) {
_$jscoverage['lib/tr8n.js'][530]++;
return this.error("No object or value are provided in the hash");}

  
    _$jscoverage['lib/tr8n.js'][532]++;
var attr = hash.attribute;
  
    _$jscoverage['lib/tr8n.js'][534]++;
if (!attr) {
_$jscoverage['lib/tr8n.js'][534]++;
return this.error("Missing value for hash token");}

  
    _$jscoverage['lib/tr8n.js'][536]++;
return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
  },
  
  
    
  getTokenValueFromArray: function(params, language, options) {
    _$jscoverage['lib/tr8n.js'][542]++;
var list_options = {
      description: "List joiner",
      limit: 4,
      separator: ", ",
      joiner: 'and',
      less: '{laquo} less',
      expandable: true,
      collapsable: true
    };
  
    _$jscoverage['lib/tr8n.js'][552]++;
var objects = params[0];
    _$jscoverage['lib/tr8n.js'][553]++;
var method = (params.length > 1 ? params[1] : null);
  
    _$jscoverage['lib/tr8n.js'][555]++;
if (params.length > 2)
      {
_$jscoverage['lib/tr8n.js'][556]++;
list_options = Tr8n.Utils.merge(list_options, params[2]);}

  
    _$jscoverage['lib/tr8n.js'][558]++;
if (options["skip_decorations"])
      {
_$jscoverage['lib/tr8n.js'][559]++;
list_options.expandable = false;}

  
    _$jscoverage['lib/tr8n.js'][561]++;
var values = [];
    _$jscoverage['lib/tr8n.js'][562]++;
for (var obj in objects) {
      _$jscoverage['lib/tr8n.js'][563]++;
if (method == null) {
        _$jscoverage['lib/tr8n.js'][564]++;
values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
      } else {
_$jscoverage['lib/tr8n.js'][565]++;
if (typeof method === "string") {
        _$jscoverage['lib/tr8n.js'][566]++;
if (method.match(/^@@/))
          {
_$jscoverage['lib/tr8n.js'][567]++;
values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));}

        else {
_$jscoverage['lib/tr8n.js'][568]++;
if (method.match(/^@/))
          {
_$jscoverage['lib/tr8n.js'][569]++;
values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));}

        else
          {
_$jscoverage['lib/tr8n.js'][571]++;
values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));}
}

      } else {
_$jscoverage['lib/tr8n.js'][572]++;
if (typeof method === "object") {
        _$jscoverage['lib/tr8n.js'][573]++;
var attribute = method.attribute;
        _$jscoverage['lib/tr8n.js'][574]++;
var value = method.value;
  
        _$jscoverage['lib/tr8n.js'][576]++;
if (attribute == null)
          {
_$jscoverage['lib/tr8n.js'][577]++;
return this.error("No attribute is provided for the hash object in the array");}

  
        _$jscoverage['lib/tr8n.js'][579]++;
if (!object[attribute])
          {
_$jscoverage['lib/tr8n.js'][580]++;
return this.error("Hash object in the array does not contain such attribute");}

  
        _$jscoverage['lib/tr8n.js'][582]++;
attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));
  
        _$jscoverage['lib/tr8n.js'][584]++;
if (value)
          {
_$jscoverage['lib/tr8n.js'][585]++;
values.push(value.replace("{$0}", attribute));}

        else
          {
_$jscoverage['lib/tr8n.js'][587]++;
values.push(attribute);}

      } else {
_$jscoverage['lib/tr8n.js'][588]++;
if (typeof method === "function") {
        _$jscoverage['lib/tr8n.js'][589]++;
values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
      }}
}
}

    }
  
    _$jscoverage['lib/tr8n.js'][593]++;
if (values.lenght == 1)
      {
_$jscoverage['lib/tr8n.js'][594]++;
return values[0];}

  
    _$jscoverage['lib/tr8n.js'][596]++;
if (!list_options.joiner || list_options.joiner == "")
      {
_$jscoverage['lib/tr8n.js'][597]++;
return values.join(list_options.separator);}

  
    _$jscoverage['lib/tr8n.js'][599]++;
var joiner = language.translate(list_options.joiner, list_options.description, {}, options);
  
    _$jscoverage['lib/tr8n.js'][601]++;
if (values.length <= list_options.limit) {
      _$jscoverage['lib/tr8n.js'][602]++;
var last = values.pop();
      _$jscoverage['lib/tr8n.js'][603]++;
return values.join(list_options.separator) + " " + joiner + " " + last;
    }
  
    _$jscoverage['lib/tr8n.js'][606]++;
var displayed_values = values.slice(0, list_options.limit);
    _$jscoverage['lib/tr8n.js'][607]++;
var remaining_values = values.slice(list_options.limit);
  
    _$jscoverage['lib/tr8n.js'][609]++;
var result = displayed_values.join(list_options.separator);
    _$jscoverage['lib/tr8n.js'][610]++;
var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);
  
    _$jscoverage['lib/tr8n.js'][612]++;
if (list_options.expandable) {
      _$jscoverage['lib/tr8n.js'][613]++;
result = result + " " + joiner + " ";
      _$jscoverage['lib/tr8n.js'][614]++;
if (list_options.remainder && typeof list_options.remainder === "function")
        {
_$jscoverage['lib/tr8n.js'][615]++;
return result + list_options.remainder(remaining_values);}

      _$jscoverage['lib/tr8n.js'][616]++;
return result + other_values;
    }
  
    _$jscoverage['lib/tr8n.js'][619]++;
var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));
  
    _$jscoverage['lib/tr8n.js'][621]++;
result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
    _$jscoverage['lib/tr8n.js'][622]++;
result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';
  
    _$jscoverage['lib/tr8n.js'][624]++;
if (list_options.remainder && typeof list_options.remainder === "function")
      {
_$jscoverage['lib/tr8n.js'][625]++;
result = result + list_options.remainder(remaining_values);}

    else
      {
_$jscoverage['lib/tr8n.js'][627]++;
result = result + other_values;}

  
    _$jscoverage['lib/tr8n.js'][629]++;
result = result + "</a></span>";
  
    _$jscoverage['lib/tr8n.js'][631]++;
result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + list_options.separator;
    _$jscoverage['lib/tr8n.js'][632]++;
var last_remaining = remaining_values.pop();
    _$jscoverage['lib/tr8n.js'][633]++;
result = result + remaining_values.join(list_options.separator);
    _$jscoverage['lib/tr8n.js'][634]++;
result = result + " " + joiner + " " + last_remaining;
  
    _$jscoverage['lib/tr8n.js'][636]++;
if (list_options.collapsable) {
      _$jscoverage['lib/tr8n.js'][637]++;
result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
      _$jscoverage['lib/tr8n.js'][638]++;
result = result + language.translate(list_options.less, list_options["description"], {}, options);
      _$jscoverage['lib/tr8n.js'][639]++;
result = result + "</a>";
    }
  
    _$jscoverage['lib/tr8n.js'][642]++;
result = result + "</span>";
    _$jscoverage['lib/tr8n.js'][643]++;
return result;
  },
  
  getTokenValue: function(tokens, language, options) {
    _$jscoverage['lib/tr8n.js'][647]++;
options = options || {};
    _$jscoverage['lib/tr8n.js'][648]++;
var object = null;
  
    _$jscoverage['lib/tr8n.js'][650]++;
if (tokens[this.short_name])
      {
_$jscoverage['lib/tr8n.js'][651]++;
object = tokens[this.short_name];}

    else
      {
_$jscoverage['lib/tr8n.js'][653]++;
object = Tr8n.config.getDefaultToken(this.short_name);}

  
    _$jscoverage['lib/tr8n.js'][655]++;
if (!object)
      {
_$jscoverage['lib/tr8n.js'][656]++;
return this.error("Missing token value");}

  
    _$jscoverage['lib/tr8n.js'][658]++;
if (typeof object === "array") {
      _$jscoverage['lib/tr8n.js'][659]++;
return this.getTokenValueFromArrayParam(object, language, options);
    }
  
    _$jscoverage['lib/tr8n.js'][662]++;
if (typeof object === "object") {
      _$jscoverage['lib/tr8n.js'][663]++;
return this.getTokenValueFromHashParam(object, language, options);
    }
  
    _$jscoverage['lib/tr8n.js'][666]++;
return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
  },
  
  applyCase: function(key, value, object, language, options) {
    _$jscoverage['lib/tr8n.js'][670]++;
var lcase = language.getLanguageCaseByKeyword(key);
    _$jscoverage['lib/tr8n.js'][671]++;
if (!lcase) {
_$jscoverage['lib/tr8n.js'][671]++;
return value;}

    _$jscoverage['lib/tr8n.js'][672]++;
return lcase.apply(value, object, options);
  },
  
  sanitize: function(value, object, language, options) {
    _$jscoverage['lib/tr8n.js'][676]++;
value = "" + value;
  
    _$jscoverage['lib/tr8n.js'][678]++;
if (!options.safe) {
      _$jscoverage['lib/tr8n.js'][679]++;
value = escape(value);
    }
  
    _$jscoverage['lib/tr8n.js'][682]++;
if (this.case_keys.length > 0) {
      _$jscoverage['lib/tr8n.js'][683]++;
for (var i=0; i<this.case_keys.length; i++) {
        _$jscoverage['lib/tr8n.js'][684]++;
value = this.applyCase(this.case_keys[i], value, object, language, options);
      }
    }
  
    _$jscoverage['lib/tr8n.js'][688]++;
return value;
  },
  
  substitute: function(label, tokens, language, options) {
    _$jscoverage['lib/tr8n.js'][692]++;
return label.replace(this.full_name, this.getTokenValue(tokens, language, options));
  }
  
};;
_$jscoverage['lib/tr8n.js'][696]++;
Tr8n.Tokens.Method = function() {
  _$jscoverage['lib/tr8n.js'][697]++;
Tr8n.Tokens.Data.apply(this, arguments);
};

_$jscoverage['lib/tr8n.js'][700]++;
Tr8n.Tokens.Method.prototype = Tr8n.Tokens.Data.prototype;
_$jscoverage['lib/tr8n.js'][701]++;
Tr8n.Tokens.Method.prototype.constructor = Tr8n.Tokens.Data;

_$jscoverage['lib/tr8n.js'][703]++;
Tr8n.Tokens.Method.prototype.initObject = function() {
  _$jscoverage['lib/tr8n.js'][704]++;
var parts = this.short_name.split('.');
  _$jscoverage['lib/tr8n.js'][705]++;
this.object_name = parts[0];
  _$jscoverage['lib/tr8n.js'][706]++;
this.object_method = parts[1];
};

_$jscoverage['lib/tr8n.js'][709]++;
Tr8n.Tokens.Method.prototype.getObjectName = function() {
  _$jscoverage['lib/tr8n.js'][710]++;
if (!this.object_name) {
    _$jscoverage['lib/tr8n.js'][711]++;
this.initObject();
  }
  _$jscoverage['lib/tr8n.js'][713]++;
return this.object_name;
};

_$jscoverage['lib/tr8n.js'][716]++;
Tr8n.Tokens.Method.prototype.getObjectMethod = function() {
  _$jscoverage['lib/tr8n.js'][717]++;
if (!this.object_method) {
    _$jscoverage['lib/tr8n.js'][718]++;
this.initObject();
  }
  _$jscoverage['lib/tr8n.js'][720]++;
return this.object_method;
};

_$jscoverage['lib/tr8n.js'][723]++;
Tr8n.Tokens.Method.prototype.substitute = function(label, tokens, language, options) {
  _$jscoverage['lib/tr8n.js'][724]++;
var name = this.getObjectName();
  _$jscoverage['lib/tr8n.js'][725]++;
var object = Tr8n.Utils.tokenObject(tokens, name);
  _$jscoverage['lib/tr8n.js'][726]++;
if (!object) {
_$jscoverage['lib/tr8n.js'][726]++;
return this.error("Missing value for token");}


  _$jscoverage['lib/tr8n.js'][728]++;
var method = this.getObjectMethod();

  _$jscoverage['lib/tr8n.js'][730]++;
return label.replace(this.full_name,
    this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}))
  );
};

;


_$jscoverage['lib/tr8n.js'][738]++;
Tr8n.Tokens.Piped = function() {
  _$jscoverage['lib/tr8n.js'][739]++;
Tr8n.Tokens.Data.apply(this, arguments);
};

_$jscoverage['lib/tr8n.js'][742]++;
Tr8n.Tokens.Piped.prototype = Tr8n.Tokens.Data.prototype;
_$jscoverage['lib/tr8n.js'][743]++;
Tr8n.Tokens.Piped.prototype.constructor = Tr8n.Tokens.Data;

_$jscoverage['lib/tr8n.js'][745]++;
Tr8n.Tokens.Piped.prototype.parseElements = function() {
  _$jscoverage['lib/tr8n.js'][746]++;
var name_without_parens = this.full_name.substring(1, this.full_name.length-1);
  _$jscoverage['lib/tr8n.js'][747]++;
var name_without_case_keys = name_without_parens.split('::')[0].trim();

  _$jscoverage['lib/tr8n.js'][749]++;
this.short_name = name_without_parens.split(':')[0].trim();
  _$jscoverage['lib/tr8n.js'][750]++;
this.case_keys = [];

  _$jscoverage['lib/tr8n.js'][752]++;
var keys = name_without_parens.match(/(::\s*\w+)/g) || [];
  _$jscoverage['lib/tr8n.js'][753]++;
for (var i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][754]++;
this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
  }

  _$jscoverage['lib/tr8n.js'][757]++;
this.context_keys = [];
  _$jscoverage['lib/tr8n.js'][758]++;
keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
  _$jscoverage['lib/tr8n.js'][759]++;
for (i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][760]++;
this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
  }
};

_$jscoverage['lib/tr8n.js'][764]++;
Tr8n.Tokens.Piped.prototype.isValueDisplayedInTranslation = function() {
  _$jscoverage['lib/tr8n.js'][765]++;
return (this.separator == '||');
};


_$jscoverage['lib/tr8n.js'][769]++;
Tr8n.Tokens.Piped.prototype.generateValueMapForContext = function(context) {
  _$jscoverage['lib/tr8n.js'][770]++;
var values = {};

  _$jscoverage['lib/tr8n.js'][772]++;
if (this.parameters[0].indexOf(':') != -1) {
    _$jscoverage['lib/tr8n.js'][773]++;
for (var i=0; i<this.parameters.length; i++) {
      _$jscoverage['lib/tr8n.js'][774]++;
var name_value = this.parameters[i].split(":");
      _$jscoverage['lib/tr8n.js'][775]++;
values[name_value[0].trim()] = name_value[1].trim();
    }
    _$jscoverage['lib/tr8n.js'][777]++;
return values;
  }

  _$jscoverage['lib/tr8n.js'][780]++;
var token_mapping = context.token_mapping;

  _$jscoverage['lib/tr8n.js'][782]++;
if (!token_mapping) {
    _$jscoverage['lib/tr8n.js'][783]++;
this.error("The token context " + context.keyword + "does not support transformation for unnamed params");
    _$jscoverage['lib/tr8n.js'][784]++;
return null;
  }

    _$jscoverage['lib/tr8n.js'][787]++;
if (typeof token_mapping == "string") {
    _$jscoverage['lib/tr8n.js'][788]++;
this.error("The token mapping " + token_mapping + " does not support the parameters.");
    _$jscoverage['lib/tr8n.js'][789]++;
return null;
  }

    _$jscoverage['lib/tr8n.js'][792]++;
if (typeof token_mapping == "array") {
    _$jscoverage['lib/tr8n.js'][793]++;
if (this.parameters.length > token_mapping.length) {
      _$jscoverage['lib/tr8n.js'][794]++;
this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      _$jscoverage['lib/tr8n.js'][795]++;
return null;
    }

    _$jscoverage['lib/tr8n.js'][798]++;
token_mapping = token_mapping[this.parameters.length-1];
    _$jscoverage['lib/tr8n.js'][799]++;
if (typeof token_mapping == "string") {
      _$jscoverage['lib/tr8n.js'][800]++;
this.error("The token mapping " + token_mapping + " does not support " + this.parameters.length + " parameters");
      _$jscoverage['lib/tr8n.js'][801]++;
return null;
    }
  }

    _$jscoverage['lib/tr8n.js'][805]++;
var keys = Tr8n.Utils.keys(token_mapping);
  _$jscoverage['lib/tr8n.js'][806]++;
for (i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][807]++;
var key = keys[i];
    _$jscoverage['lib/tr8n.js'][808]++;
var value = token_mapping[key];
    _$jscoverage['lib/tr8n.js'][809]++;
values[key] = value;

        _$jscoverage['lib/tr8n.js'][811]++;
keys = value.match(/{\$\d(::[\w]+)*\}/g);

    _$jscoverage['lib/tr8n.js'][813]++;
for (var j=0; j<keys.length; j++) {
      _$jscoverage['lib/tr8n.js'][814]++;
var token = keys[j];
      _$jscoverage['lib/tr8n.js'][815]++;
var token_without_parens = token.replace(/[\{\}]/g, '');
      _$jscoverage['lib/tr8n.js'][816]++;
var parts = token_without_parens.split('::');
      _$jscoverage['lib/tr8n.js'][817]++;
var index = parseInt(parts[0].replace(/[$]/, ''));

      _$jscoverage['lib/tr8n.js'][819]++;
if (this.parameters.length < index) {
        _$jscoverage['lib/tr8n.js'][820]++;
this.error("The index inside " + token_mapping + " is out of bound: " + this.full_name);
        _$jscoverage['lib/tr8n.js'][821]++;
return null;
      }

      _$jscoverage['lib/tr8n.js'][824]++;
var val = this.parameters[index];

      
      _$jscoverage['lib/tr8n.js'][827]++;
parts.pop();
      _$jscoverage['lib/tr8n.js'][828]++;
for (var k=0; k<parts.length; k++) {
        _$jscoverage['lib/tr8n.js'][829]++;
var language_case = context.language.getLanguageCaseByKeyword(parts[k]);
        _$jscoverage['lib/tr8n.js'][830]++;
if (language_case) {
_$jscoverage['lib/tr8n.js'][830]++;
val = language_case.apply(val);}

      }

      _$jscoverage['lib/tr8n.js'][833]++;
values[key] = values[key].replace(tkey, val);
    }
  }

  _$jscoverage['lib/tr8n.js'][837]++;
return values;
};

_$jscoverage['lib/tr8n.js'][840]++;
Tr8n.Tokens.Piped.prototype.substitute = function(label, tokens, language, options) {
  _$jscoverage['lib/tr8n.js'][841]++;
if (!tokens[this.short_name]) {
    _$jscoverage['lib/tr8n.js'][842]++;
this.error("Missing value");
    _$jscoverage['lib/tr8n.js'][843]++;
return label;
  }

  _$jscoverage['lib/tr8n.js'][846]++;
var object = this.tokenObject(tokens, this.short_name);

  _$jscoverage['lib/tr8n.js'][848]++;
if (this.parameters.length == 0) {
    _$jscoverage['lib/tr8n.js'][849]++;
this.error("Piped params may not be empty");
    _$jscoverage['lib/tr8n.js'][850]++;
return label;
  }

  _$jscoverage['lib/tr8n.js'][853]++;
var context = this.getContextForLanguage(language);

  _$jscoverage['lib/tr8n.js'][855]++;
var piped_values = this.generateValueMapForContext(context);

  _$jscoverage['lib/tr8n.js'][857]++;
if (!piped_values) {
_$jscoverage['lib/tr8n.js'][857]++;
return label;}


  _$jscoverage['lib/tr8n.js'][859]++;
var rule = context.findMatchingRule(object);

  _$jscoverage['lib/tr8n.js'][861]++;
if (rule == null) {
_$jscoverage['lib/tr8n.js'][861]++;
return label;}


  _$jscoverage['lib/tr8n.js'][863]++;
var value = piped_values[rule.keyword];
  _$jscoverage['lib/tr8n.js'][864]++;
if (!value) {
    _$jscoverage['lib/tr8n.js'][865]++;
var fallback_rule = context.getFallbackRule();
    _$jscoverage['lib/tr8n.js'][866]++;
if (fallback_rule && piped_values[fallback_rule.keyword]) {
      _$jscoverage['lib/tr8n.js'][867]++;
value = piped_values[fallback_rule.keyword];
    } else {
      _$jscoverage['lib/tr8n.js'][869]++;
return label;
    }
  }

  _$jscoverage['lib/tr8n.js'][873]++;
var token_value = [];
  _$jscoverage['lib/tr8n.js'][874]++;
if (this.isValueDisplayedInTranslation()) {
    _$jscoverage['lib/tr8n.js'][875]++;
token_value.push(this.tokenValue(tokens, language, options));
    _$jscoverage['lib/tr8n.js'][876]++;
token_value.push(" ");
  } else {
    _$jscoverage['lib/tr8n.js'][878]++;
value = value.replace("#" + this.short_name + "#", this.tokenValue(tokens, language, options));
  }
  _$jscoverage['lib/tr8n.js'][880]++;
token_value.push(value);

  _$jscoverage['lib/tr8n.js'][882]++;
return label.replace(this.full_name, token_value.join(""));
};


;
_$jscoverage['lib/tr8n.js'][887]++;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  _$jscoverage['lib/tr8n.js'][888]++;
this.vars = {};
  _$jscoverage['lib/tr8n.js'][889]++;
this.ctx = ctx || {

    'label'   : function(l, r)    { _$jscoverage['lib/tr8n.js'][891]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][891]++;
return r; },
    'quote'   : function(expr)    { _$jscoverage['lib/tr8n.js'][892]++;
return expr; },
    'car'     : function(list)    { _$jscoverage['lib/tr8n.js'][893]++;
return list[1]; },
    'cdr'     : function(list)    { _$jscoverage['lib/tr8n.js'][894]++;
list.shift(); _$jscoverage['lib/tr8n.js'][894]++;
return list; },
    'cons'    : function(e, cell) { _$jscoverage['lib/tr8n.js'][895]++;
cell.unshift(e); _$jscoverage['lib/tr8n.js'][895]++;
return cell; },
    'eq'      : function(l, r)    { _$jscoverage['lib/tr8n.js'][896]++;
return (l == r); },
    'atom'    : function(a)       { _$jscoverage['lib/tr8n.js'][897]++;
return !(typeof a in {'object':1, 'array':1, 'function':1}); },
    'cond'    : function(c, t, f) { _$jscoverage['lib/tr8n.js'][898]++;
return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); },
  
    'set'     : function(l, r){ _$jscoverage['lib/tr8n.js'][900]++;
this.vars[l] = this.ctx[l] = r; _$jscoverage['lib/tr8n.js'][900]++;
return r; },

    '='       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l == r },                                                         '!='      : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l != r },                                                         '<'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l < r },                                                          '>'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l > r },                                                          '+'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l + r },                                                          '-'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l - r },                                                          '*'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l * r },                                                          '%'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l % r },                                                          'mod'     : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return l % r },                                                          '/'       : function(l, r)    {_$jscoverage['lib/tr8n.js'][902]++;
return (l * 1.0) / r },                                                  '!'       : function(expr)    {_$jscoverage['lib/tr8n.js'][902]++;
return !expr },                                                          'not'     : function(val)     {_$jscoverage['lib/tr8n.js'][902]++;
return !val },                                                       
    '&&'      : function()        {_$jscoverage['lib/tr8n.js'][903]++;
return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                'and'     : function()        {_$jscoverage['lib/tr8n.js'][903]++;
return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                '||'      : function()        {_$jscoverage['lib/tr8n.js'][903]++;
return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},      'or'      : function()        {_$jscoverage['lib/tr8n.js'][903]++;
return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},  
    'if'      : function(c,t,f)   {_$jscoverage['lib/tr8n.js'][904]++;
return this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)},          'let'     : function(l, r)    {_$jscoverage['lib/tr8n.js'][904]++;
return this.vars[l] = r },                                               'true'    : function()        {_$jscoverage['lib/tr8n.js'][904]++;
return true },                                                           'false'   : function()        {_$jscoverage['lib/tr8n.js'][904]++;
return false },                                                      
    'date'    : function(date)    {_$jscoverage['lib/tr8n.js'][905]++;
return new Date(date) },                                                 'today'   : function()        {_$jscoverage['lib/tr8n.js'][905]++;
return new Date() },                                                     'time'    : function(expr)    {_$jscoverage['lib/tr8n.js'][905]++;
return new Date(expr) },                                                 'now'     : function()        {_$jscoverage['lib/tr8n.js'][905]++;
return Date.now() },                                                 
    'append'  : function(l, r)    {_$jscoverage['lib/tr8n.js'][906]++;
return String(r) + String(l) },                                          'prepend' : function(l, r)    {_$jscoverage['lib/tr8n.js'][906]++;
return String(l) + String(r) },                                      
    'match'   : function(search, subject) {                                                                   _$jscoverage['lib/tr8n.js'][907]++;
search = this._stringToRegexp(search);
      _$jscoverage['lib/tr8n.js'][908]++;
return !!subject.match(search);
    },

    'in'      : function(values, search) {                                                                    _$jscoverage['lib/tr8n.js'][911]++;
var bounds, range = this._range;
      _$jscoverage['lib/tr8n.js'][912]++;
values = values
        .replace(/\s/g,'')
        .replace(/(\w+)\.\.(\w+)/g, function(x,f,l){
          _$jscoverage['lib/tr8n.js'][915]++;
bounds = range(f,l);
          _$jscoverage['lib/tr8n.js'][916]++;
bounds.push(l);
          _$jscoverage['lib/tr8n.js'][917]++;
return bounds.join()
        });
      _$jscoverage['lib/tr8n.js'][919]++;
return values
        .split(',')
        .indexOf(String(search)) != -1;
    },

    'within'  : function(values, search) {                                                                   _$jscoverage['lib/tr8n.js'][924]++;
var 
        bounds = values.split('..').map(function(d){_$jscoverage['lib/tr8n.js'][925]++;
return parseInt(d)})
      _$jscoverage['lib/tr8n.js'][926]++;
return (bounds[0] <= search && search <= bounds[1])
    },

    'replace' : function(search, replace, subject) {                                                        _$jscoverage['lib/tr8n.js'][929]++;
search = this._stringToRegexp(search);
      _$jscoverage['lib/tr8n.js'][930]++;
return subject.replace(search, replace);
    },

    'count'   : function(list){                                                                             _$jscoverage['lib/tr8n.js'][933]++;
return (typeof(list) == "string" ? this.vars[list] : list).length
    },

    'all'     : function(list, value) {                                                                     _$jscoverage['lib/tr8n.js'][936]++;
list = (typeof(list) == "string") ? this.vars[list] : list;
      _$jscoverage['lib/tr8n.js'][937]++;
return (list instanceof Array) ? list.every(function(e){_$jscoverage['lib/tr8n.js'][937]++;
return e == value}) : false;
    },
    
    'any'     : function(list, value) {                                                                     _$jscoverage['lib/tr8n.js'][940]++;
list = (typeof(list) == "string") ? this.vars[list] : list;
      _$jscoverage['lib/tr8n.js'][941]++;
return (list instanceof Array) ? !!list.filter(function(e){_$jscoverage['lib/tr8n.js'][941]++;
return e == value}) : false;
    }

  };
  _$jscoverage['lib/tr8n.js'][945]++;
return this;
};

_$jscoverage['lib/tr8n.js'][948]++;
Tr8n.RulesEngine.Evaluator.prototype = {

  _range: function(start, end) {
    _$jscoverage['lib/tr8n.js'][951]++;
var 
      range = [],
      is_string = !String(start).match(/^\d+$/);

    _$jscoverage['lib/tr8n.js'][955]++;
start = (is_string) ? start.charCodeAt(0) : parseInt(start);
    _$jscoverage['lib/tr8n.js'][956]++;
end   = (is_string) ? end.charCodeAt(0)   : parseInt(end);

    _$jscoverage['lib/tr8n.js'][958]++;
while (end >= start) {
      _$jscoverage['lib/tr8n.js'][959]++;
range.push(is_string ? String.fromCharCode(start) : String(start));
      _$jscoverage['lib/tr8n.js'][960]++;
start += 1;
    }

    _$jscoverage['lib/tr8n.js'][963]++;
return range;
  },

  _stringToRegexp: function(str) {
    _$jscoverage['lib/tr8n.js'][967]++;
var re = new RegExp("^\/","g");
    _$jscoverage['lib/tr8n.js'][968]++;
if(!str.match(re)) {
      _$jscoverage['lib/tr8n.js'][969]++;
return new RegExp(str,"g");
    }
    _$jscoverage['lib/tr8n.js'][971]++;
str = str.replace(re, '');
    _$jscoverage['lib/tr8n.js'][972]++;
if (str.match(/\/i$/)) {
      _$jscoverage['lib/tr8n.js'][973]++;
str = str.replace(/\/i$/g, '')
      _$jscoverage['lib/tr8n.js'][974]++;
return new RegExp(str,"ig")
    }
    _$jscoverage['lib/tr8n.js'][976]++;
str = str.replace(/\/$/, '')
    _$jscoverage['lib/tr8n.js'][977]++;
return new RegExp(str,"g");
  },

  setVars: function(vars) {
    _$jscoverage['lib/tr8n.js'][981]++;
this.vars = vars;
  },

  getVars: function() {
    _$jscoverage['lib/tr8n.js'][985]++;
return this.vars;
  },

  apply: function(fn, args) {
    _$jscoverage['lib/tr8n.js'][989]++;
if (typeof this.ctx[fn] == 'function') {
      _$jscoverage['lib/tr8n.js'][990]++;
return this.ctx[fn].apply(this,args);
    }
    _$jscoverage['lib/tr8n.js'][992]++;
return this.ctx[fn]
  },

  evaluate: function(expr) {
    _$jscoverage['lib/tr8n.js'][996]++;
if (this.ctx['atom'].call(this, expr)) {
      _$jscoverage['lib/tr8n.js'][997]++;
if (typeof expr == "string" && this.vars[expr]) {
_$jscoverage['lib/tr8n.js'][997]++;
return this.vars[expr];}

      _$jscoverage['lib/tr8n.js'][998]++;
return (expr in this.ctx ? this.ctx[expr] : expr);
    }
    _$jscoverage['lib/tr8n.js'][1000]++;
var 
      fn    = expr[0],
      args  = expr.slice(1);

    _$jscoverage['lib/tr8n.js'][1004]++;
if(['quote','car','cdr','cond','if','&&','||','and','or','true','false','let','count','all','any'].indexOf(fn) == -1) {
      _$jscoverage['lib/tr8n.js'][1005]++;
args = args.map(this.evaluate.bind(this))
    }
    _$jscoverage['lib/tr8n.js'][1007]++;
return this.apply(fn,args)
  }
};
;
_$jscoverage['lib/tr8n.js'][1011]++;
Tr8n.RulesEngine.Parser = function(expression) {
  _$jscoverage['lib/tr8n.js'][1012]++;
this.tokenize(expression);
}

_$jscoverage['lib/tr8n.js'][1015]++;
Tr8n.RulesEngine.Parser.prototype = {
  tokenize: function(expression) {
	  _$jscoverage['lib/tr8n.js'][1017]++;
this.tokens = expression.match(/[()]|\w+|@\w+|[\+\-\!\|\=>&<\*\/%]+|\".*?\"|'.*?'/g);
  },

  parse: function() {
  	_$jscoverage['lib/tr8n.js'][1021]++;
token = this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][1022]++;
if (!token) {
_$jscoverage['lib/tr8n.js'][1022]++;
return;}

  	_$jscoverage['lib/tr8n.js'][1023]++;
if (token == "(") {
_$jscoverage['lib/tr8n.js'][1023]++;
return this.parseList();}

  	_$jscoverage['lib/tr8n.js'][1024]++;
if (token.match(/^['"].*/)) {
_$jscoverage['lib/tr8n.js'][1024]++;
return token.slice(1, -1);}

  	_$jscoverage['lib/tr8n.js'][1025]++;
if (token.match(/\d+/)) {
_$jscoverage['lib/tr8n.js'][1025]++;
return parseInt(token);}

  	_$jscoverage['lib/tr8n.js'][1026]++;
return String(token);
  },

  parseList: function() {
  	_$jscoverage['lib/tr8n.js'][1030]++;
var list = [];
  	_$jscoverage['lib/tr8n.js'][1031]++;
while (this.tokens.length > 0 && this.tokens[0] != ')')
  		{
_$jscoverage['lib/tr8n.js'][1032]++;
list.push(this.parse());}

  	_$jscoverage['lib/tr8n.js'][1033]++;
this.tokens.shift();
  	_$jscoverage['lib/tr8n.js'][1034]++;
return list;
  }
}
;
_$jscoverage['lib/tr8n.js'][1038]++;
Tr8n.Tokenizers.Data = function(label, context, options) {
  _$jscoverage['lib/tr8n.js'][1039]++;
this.label = label;
  _$jscoverage['lib/tr8n.js'][1040]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][1041]++;
this.options = options || {};
  _$jscoverage['lib/tr8n.js'][1042]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][1045]++;
Tr8n.Tokenizers.Data.prototype = {

  tokenize: function() {
    _$jscoverage['lib/tr8n.js'][1048]++;
this.tokens = [];
    _$jscoverage['lib/tr8n.js'][1049]++;
var tokens = Tr8n.config.getSupportedTokens();
    _$jscoverage['lib/tr8n.js'][1050]++;
for (var i=0; i<tokens.length; i++) {
      _$jscoverage['lib/tr8n.js'][1051]++;
var matches = this.label.match(tokens[i][0]) || [];
      _$jscoverage['lib/tr8n.js'][1052]++;
for (var i=0; i<matches.length; i++) {
          _$jscoverage['lib/tr8n.js'][1053]++;
this.tokens.push(new tokens[i][1](matches[i], this.label));
      }
    }
  },

  isTokenAllowed: function(token) {
    _$jscoverage['lib/tr8n.js'][1059]++;
if (this.options.allowed_tokens) {
_$jscoverage['lib/tr8n.js'][1059]++;
return true;}

    _$jscoverage['lib/tr8n.js'][1060]++;
return (this.options.allowed_tokens.indexOf(token.name) != -1);
  },

  substitute: function(language, options) {
    _$jscoverage['lib/tr8n.js'][1064]++;
var label = this.label;
    _$jscoverage['lib/tr8n.js'][1065]++;
for (var i=0; i<this.tokens.length; i++) {
      _$jscoverage['lib/tr8n.js'][1066]++;
var token = this.tokens[i];
      _$jscoverage['lib/tr8n.js'][1067]++;
if (this.isTokenAllowed(token)) {
        _$jscoverage['lib/tr8n.js'][1068]++;
label = token.substitute(label, this.context, language, options);
      }
    }
    _$jscoverage['lib/tr8n.js'][1071]++;
return label;
  }

};
;
_$jscoverage['lib/tr8n.js'][1076]++;
var RESERVED_TOKEN       = "tr8n";
_$jscoverage['lib/tr8n.js'][1077]++;
var RE_SHORT_TOKEN_START = "\\[[\\w]*:";
_$jscoverage['lib/tr8n.js'][1078]++;
var RE_SHORT_TOKEN_END   = "\\]";
_$jscoverage['lib/tr8n.js'][1079]++;
var RE_LONG_TOKEN_START  = "\\[[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][1080]++;
var RE_LONG_TOKEN_END    = "\\[\\/[\\w]*\\]";
_$jscoverage['lib/tr8n.js'][1081]++;
var RE_TEXT              = "[^\\[\\]]+";
_$jscoverage['lib/tr8n.js'][1082]++;
var TOKEN_TYPE_SHORT     = "short";
_$jscoverage['lib/tr8n.js'][1083]++;
var TOKEN_TYPE_LONG      = "long";
_$jscoverage['lib/tr8n.js'][1084]++;
var PLACEHOLDER          = "{$0}";

_$jscoverage['lib/tr8n.js'][1086]++;
Tr8n.Tokenizers.Decoration = function(label, context, opts) {
  _$jscoverage['lib/tr8n.js'][1087]++;
this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  _$jscoverage['lib/tr8n.js'][1088]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][1089]++;
this.opts = opts || {};
  _$jscoverage['lib/tr8n.js'][1090]++;
this.fragments = [];
  _$jscoverage['lib/tr8n.js'][1091]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][1092]++;
this.tokenize();
};

_$jscoverage['lib/tr8n.js'][1095]++;
Tr8n.Tokenizers.Decoration.prototype = {

  tokenize: function() {
    _$jscoverage['lib/tr8n.js'][1098]++;
var expression = new RegExp([
      RE_SHORT_TOKEN_START,
      RE_SHORT_TOKEN_END,
      RE_LONG_TOKEN_START,
      RE_LONG_TOKEN_END,
      RE_TEXT
    ].join("|"), "g");

    _$jscoverage['lib/tr8n.js'][1106]++;
this.fragments = this.label.match(expression);
    _$jscoverage['lib/tr8n.js'][1107]++;
return this.fragments;
  },

  peek: function() {
    _$jscoverage['lib/tr8n.js'][1111]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][1111]++;
return null;}

    _$jscoverage['lib/tr8n.js'][1112]++;
return this.fragments[0];
  },

  getNextFragment: function() {
    _$jscoverage['lib/tr8n.js'][1116]++;
if (this.fragments.length == 0) {
_$jscoverage['lib/tr8n.js'][1116]++;
return null;}

    _$jscoverage['lib/tr8n.js'][1117]++;
return this.fragments.shift();
  },

  parse: function() {
    _$jscoverage['lib/tr8n.js'][1121]++;
var token = this.getNextFragment();
    _$jscoverage['lib/tr8n.js'][1122]++;
if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
      {
_$jscoverage['lib/tr8n.js'][1123]++;
return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);}

    _$jscoverage['lib/tr8n.js'][1124]++;
if (token.match(new RegExp(RE_LONG_TOKEN_START)))
      {
_$jscoverage['lib/tr8n.js'][1125]++;
return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);}

    _$jscoverage['lib/tr8n.js'][1126]++;
return token;
  },

  parseTree: function(name, type) {
    _$jscoverage['lib/tr8n.js'][1130]++;
var tree = [name];
    _$jscoverage['lib/tr8n.js'][1131]++;
if (this.tokens.indexOf(name) == -1 && name != RESERVED_TOKEN)
      {
_$jscoverage['lib/tr8n.js'][1132]++;
this.tokens.push(name);}


    _$jscoverage['lib/tr8n.js'][1134]++;
if (type == TOKEN_TYPE_SHORT) {
      _$jscoverage['lib/tr8n.js'][1135]++;
var first = true;
      _$jscoverage['lib/tr8n.js'][1136]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_SHORT_TOKEN_END))) {
        _$jscoverage['lib/tr8n.js'][1137]++;
var value = this.parse();
        _$jscoverage['lib/tr8n.js'][1138]++;
if (first && typeof value == "string") {
          _$jscoverage['lib/tr8n.js'][1139]++;
value = value.replace(/^\s+/,'');
          _$jscoverage['lib/tr8n.js'][1140]++;
first = false;
        }
        _$jscoverage['lib/tr8n.js'][1142]++;
tree.push(value);
      }
    } else {
_$jscoverage['lib/tr8n.js'][1144]++;
if (type == TOKEN_TYPE_LONG) {
      _$jscoverage['lib/tr8n.js'][1145]++;
while (this.peek()!=null && !this.peek().match(new RegExp(RE_LONG_TOKEN_END))) {
        _$jscoverage['lib/tr8n.js'][1146]++;
tree.push(this.parse());
      }
    }}


    _$jscoverage['lib/tr8n.js'][1150]++;
this.getNextFragment();
    _$jscoverage['lib/tr8n.js'][1151]++;
return tree;
  },

  isTokenAllowed: function(token) {
    _$jscoverage['lib/tr8n.js'][1155]++;
return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
  },

  getDefaultDecoration: function(token, value) {
    _$jscoverage['lib/tr8n.js'][1159]++;
var default_decoration = Tr8n.config.getDefaultToken(token, "decoration");
    _$jscoverage['lib/tr8n.js'][1160]++;
if (default_decoration == null) {
_$jscoverage['lib/tr8n.js'][1160]++;
return value;}


    _$jscoverage['lib/tr8n.js'][1162]++;
var decoration_token_values = this.context[token];
    _$jscoverage['lib/tr8n.js'][1163]++;
default_decoration = default_decoration.replace(PLACEHOLDER, value);

    _$jscoverage['lib/tr8n.js'][1165]++;
if (decoration_token_values instanceof Object) {
      _$jscoverage['lib/tr8n.js'][1166]++;
var keys = Tr8n.Utils.keys(decoration_token_values);
      _$jscoverage['lib/tr8n.js'][1167]++;
for (var i = 0; i < keys.length; i++) {
        _$jscoverage['lib/tr8n.js'][1168]++;
default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);
      }
    }

    _$jscoverage['lib/tr8n.js'][1172]++;
return default_decoration;
  },

  apply: function(token, value) {
    _$jscoverage['lib/tr8n.js'][1176]++;
if (token == RESERVED_TOKEN) {
_$jscoverage['lib/tr8n.js'][1176]++;
return value;}

    _$jscoverage['lib/tr8n.js'][1177]++;
if (!this.isTokenAllowed(token)) {
_$jscoverage['lib/tr8n.js'][1177]++;
return value;}


    _$jscoverage['lib/tr8n.js'][1179]++;
var method = this.context[token];

    _$jscoverage['lib/tr8n.js'][1181]++;
if (method != null) {
      _$jscoverage['lib/tr8n.js'][1182]++;
if (typeof method === 'string')
        {
_$jscoverage['lib/tr8n.js'][1183]++;
return method.replace(PLACEHOLDER, value);}


      _$jscoverage['lib/tr8n.js'][1185]++;
if (typeof method === 'function')
        {
_$jscoverage['lib/tr8n.js'][1186]++;
return method(value);}


      _$jscoverage['lib/tr8n.js'][1188]++;
if (typeof method === 'object')
        {
_$jscoverage['lib/tr8n.js'][1189]++;
return this.getDefaultDecoration(token, value);}


      _$jscoverage['lib/tr8n.js'][1191]++;
return value;
    }

    _$jscoverage['lib/tr8n.js'][1194]++;
return this.getDefaultDecoration(token, value);
  },

  evaluate: function(expr) {
    _$jscoverage['lib/tr8n.js'][1198]++;
if (!(expr instanceof Array)) {
_$jscoverage['lib/tr8n.js'][1198]++;
return expr;}


    _$jscoverage['lib/tr8n.js'][1200]++;
var token = expr[0];
    _$jscoverage['lib/tr8n.js'][1201]++;
expr.shift();
    _$jscoverage['lib/tr8n.js'][1202]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1203]++;
var value = [];
    _$jscoverage['lib/tr8n.js'][1204]++;
expr.forEach(function(obj, index) {
      _$jscoverage['lib/tr8n.js'][1205]++;
value.push(self.evaluate(obj));
    });
    _$jscoverage['lib/tr8n.js'][1207]++;
return this.apply(token, value.join(''));
  },

  substitute: function(language, options) {
    _$jscoverage['lib/tr8n.js'][1211]++;
return this.evaluate(this.parse());
  }

};
;
_$jscoverage['lib/tr8n.js'][1216]++;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
_$jscoverage['lib/tr8n.js'][1217]++;
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
_$jscoverage['lib/tr8n.js'][1218]++;
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

_$jscoverage['lib/tr8n.js'][1220]++;
Tr8n.Tokenizers.Dom = function(doc, context, options) {
  _$jscoverage['lib/tr8n.js'][1221]++;
this.doc = doc;
  _$jscoverage['lib/tr8n.js'][1222]++;
this.context = context || {};
  _$jscoverage['lib/tr8n.js'][1223]++;
this.tokens = [];
  _$jscoverage['lib/tr8n.js'][1224]++;
this.options = options || {};
};

_$jscoverage['lib/tr8n.js'][1227]++;
Tr8n.Tokenizers.Dom.prototype = {

  translate: function() {
    _$jscoverage['lib/tr8n.js'][1230]++;
return this.translateTree(this.doc);
  },

  translateTree: function(node) {
    _$jscoverage['lib/tr8n.js'][1234]++;
if (this.isNonTranslatableNode(node)) {
      _$jscoverage['lib/tr8n.js'][1235]++;
if (node.childNodes.length == 1)
        {
_$jscoverage['lib/tr8n.js'][1236]++;
return node.childNodes[0].nodeValue;}

      _$jscoverage['lib/tr8n.js'][1237]++;
return "";
    }

    _$jscoverage['lib/tr8n.js'][1240]++;
if (node.nodeType == 3)
      {
_$jscoverage['lib/tr8n.js'][1241]++;
return this.translateTml(node.nodeValue);}


    _$jscoverage['lib/tr8n.js'][1243]++;
var html = "";
    _$jscoverage['lib/tr8n.js'][1244]++;
var buffer = "";

    _$jscoverage['lib/tr8n.js'][1246]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1247]++;
var child = node.childNodes[i];

  
      _$jscoverage['lib/tr8n.js'][1250]++;
if (child.nodeType == 3) {
        _$jscoverage['lib/tr8n.js'][1251]++;
buffer = buffer + child.nodeValue;
      } else {
_$jscoverage['lib/tr8n.js'][1252]++;
if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {          _$jscoverage['lib/tr8n.js'][1252]++;
buffer = buffer + this.generateTmlTags(child);
      } else {
_$jscoverage['lib/tr8n.js'][1253]++;
if (this.isSeparatorNode(child)) {            _$jscoverage['lib/tr8n.js'][1253]++;
if (buffer != "")
          {
_$jscoverage['lib/tr8n.js'][1254]++;
html = html + this.translateTml(buffer);}

        _$jscoverage['lib/tr8n.js'][1255]++;
html = html + this.generateHtmlToken(child);
        _$jscoverage['lib/tr8n.js'][1256]++;
buffer = "";
      } else {
        _$jscoverage['lib/tr8n.js'][1258]++;
if (buffer != "")
          {
_$jscoverage['lib/tr8n.js'][1259]++;
html = html + this.translateTml(buffer);}


        _$jscoverage['lib/tr8n.js'][1261]++;
var containerValue = this.translateTree(child);
        _$jscoverage['lib/tr8n.js'][1262]++;
if (this.isIgnoredNode(child)) {
          _$jscoverage['lib/tr8n.js'][1263]++;
html = html + containerValue;
        } else {
          _$jscoverage['lib/tr8n.js'][1265]++;
html = html + this.generateHtmlToken(child, containerValue);
        }

        _$jscoverage['lib/tr8n.js'][1268]++;
buffer = "";
      }}
}

    }

    _$jscoverage['lib/tr8n.js'][1272]++;
if (buffer != "") {
      _$jscoverage['lib/tr8n.js'][1273]++;
html = html + this.translateTml(buffer);
    }

    _$jscoverage['lib/tr8n.js'][1276]++;
return html;
  },

  isNonTranslatableNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1280]++;
if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
      {
_$jscoverage['lib/tr8n.js'][1281]++;
return true;}

    _$jscoverage['lib/tr8n.js'][1282]++;
if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
      {
_$jscoverage['lib/tr8n.js'][1283]++;
return true;}

    _$jscoverage['lib/tr8n.js'][1284]++;
return false;
  },

  translateTml: function(tml) {
    _$jscoverage['lib/tr8n.js'][1288]++;
if (this.isEmptyString(tml)) {
_$jscoverage['lib/tr8n.js'][1288]++;
return tml;}


  
    _$jscoverage['lib/tr8n.js'][1291]++;
if (this.getOption("split_sentences")) {
      _$jscoverage['lib/tr8n.js'][1292]++;
sentences = Tr8n.Utils.splitSentences(tml);
      _$jscoverage['lib/tr8n.js'][1293]++;
translation = tml;
      _$jscoverage['lib/tr8n.js'][1294]++;
var self = this;
      _$jscoverage['lib/tr8n.js'][1295]++;
sentences.forEach(function(sentence) {
        _$jscoverage['lib/tr8n.js'][1296]++;
var sentenceTranslation = self.getOption("debug") ? self.debugTranslation(sentence) : Tr8n.config.currentLanguage.translate(sentence, null, self.tokens, self.options);
        _$jscoverage['lib/tr8n.js'][1297]++;
translation = translation.replace(sentence, sentenceTranslation);
      });
      _$jscoverage['lib/tr8n.js'][1299]++;
this.resetContext();
      _$jscoverage['lib/tr8n.js'][1300]++;
return translation;
    }

    _$jscoverage['lib/tr8n.js'][1303]++;
translation = this.getOption("debug") ? this.debugTranslation(tml) : Tr8n.config.currentLanguage.translate(tml, null, this.tokens, this.options);
    _$jscoverage['lib/tr8n.js'][1304]++;
this.resetContext();
    _$jscoverage['lib/tr8n.js'][1305]++;
return translation;
  },

  hasChildNodes: function(node) {
    _$jscoverage['lib/tr8n.js'][1309]++;
if (!node.childNodes) {
_$jscoverage['lib/tr8n.js'][1309]++;
return false;}

    _$jscoverage['lib/tr8n.js'][1310]++;
return (node.childNodes.length > 0);
  },

  isBetweenSeparators: function(node) {
    _$jscoverage['lib/tr8n.js'][1314]++;
if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
      {
_$jscoverage['lib/tr8n.js'][1315]++;
return true;}


    _$jscoverage['lib/tr8n.js'][1317]++;
if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
      {
_$jscoverage['lib/tr8n.js'][1318]++;
return true;}


    _$jscoverage['lib/tr8n.js'][1320]++;
return false;
  },

  generateTmlTags: function(node) {
    _$jscoverage['lib/tr8n.js'][1324]++;
var buffer = "";
    _$jscoverage['lib/tr8n.js'][1325]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1326]++;
for(var i=0; i<node.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1327]++;
var child = node.childNodes[i];
      _$jscoverage['lib/tr8n.js'][1328]++;
if (child.nodeType == 3)                            {
_$jscoverage['lib/tr8n.js'][1328]++;
buffer = buffer + child.nodeValue;}

      else
        {
_$jscoverage['lib/tr8n.js'][1330]++;
buffer = buffer + self.generateTmlTags(child);}

    }
    _$jscoverage['lib/tr8n.js'][1332]++;
var tokenContext = self.generateHtmlToken(node);
    _$jscoverage['lib/tr8n.js'][1333]++;
var token = this.contextualize(this.adjustName(node), tokenContext);

    _$jscoverage['lib/tr8n.js'][1335]++;
var value = this.sanitizeValue(buffer);

    _$jscoverage['lib/tr8n.js'][1337]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][1338]++;
return '{' + token + '}';}


    _$jscoverage['lib/tr8n.js'][1340]++;
if (this.isShortToken(token, value))
      {
_$jscoverage['lib/tr8n.js'][1341]++;
return '[' + token + ': ' + value + ']';}


    _$jscoverage['lib/tr8n.js'][1343]++;
return '[' + token + ']' + value + '[/' + token + ']';
  },

  getOption: function(name) {
    _$jscoverage['lib/tr8n.js'][1347]++;
if (this.options[name]) {
      _$jscoverage['lib/tr8n.js'][1348]++;
return this.options[name];
    }
    _$jscoverage['lib/tr8n.js'][1350]++;
return Tr8n.Utils.hashValue(Tr8n.config.translator_options, name);
  },

  debugTranslation: function(translation) {
    _$jscoverage['lib/tr8n.js'][1354]++;
return this.getOption("debug_format").replace('{$0}', translation);
  },

  isEmptyString: function(tml) {
      _$jscoverage['lib/tr8n.js'][1358]++;
tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
      _$jscoverage['lib/tr8n.js'][1359]++;
return (tml == '');
  },

  resetContext: function() {
    _$jscoverage['lib/tr8n.js'][1363]++;
this.tokens = [].concat(this.context);
  },

  isShortToken: function(token, value) {
    _$jscoverage['lib/tr8n.js'][1367]++;
return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
  },

  isOnlyChild: function(node) {
    _$jscoverage['lib/tr8n.js'][1371]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1371]++;
return false;}

    _$jscoverage['lib/tr8n.js'][1372]++;
return (node.parentNode.childNodes.length == 1);
  },

  hasInlineOrTextSiblings: function(node) {
    _$jscoverage['lib/tr8n.js'][1376]++;
if (node.parentNode == null) {
_$jscoverage['lib/tr8n.js'][1376]++;
return false;}


    _$jscoverage['lib/tr8n.js'][1378]++;
for (var i=0; i < node.parentNode.childNodes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1379]++;
var child = node.parentNode.childNodes[i];
      _$jscoverage['lib/tr8n.js'][1380]++;
if (child != node) {
        _$jscoverage['lib/tr8n.js'][1381]++;
if (this.isInlineNode(child) || this.isValidTextNode(child))
          {
_$jscoverage['lib/tr8n.js'][1382]++;
return true;}

      }
    }

    _$jscoverage['lib/tr8n.js'][1386]++;
return false;
  },

  isInlineNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1390]++;
return (
      node.nodeType == 1
      && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
      && !this.isOnlyChild(node)
    );
  },

  isContainerNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1398]++;
return (node.nodeType == 1 && !this.isInlineNode(node));
  },

  isSelfClosingNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1402]++;
return (node.firstChild == null);
  },

  isIgnoredNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1406]++;
if (node.nodeType != 1) {
_$jscoverage['lib/tr8n.js'][1406]++;
return true;}

    _$jscoverage['lib/tr8n.js'][1407]++;
return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
  },

  isValidTextNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1411]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1411]++;
return false;}

    _$jscoverage['lib/tr8n.js'][1412]++;
return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
  },

  isSeparatorNode: function(node) {
    _$jscoverage['lib/tr8n.js'][1416]++;
if (node == null) {
_$jscoverage['lib/tr8n.js'][1416]++;
return false;}

    _$jscoverage['lib/tr8n.js'][1417]++;
return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
  },

  sanitizeValue: function(value) {
    _$jscoverage['lib/tr8n.js'][1421]++;
return value.replace(/^\s+/,'');
  },

  replaceSpecialCharacters: function(text) {
    _$jscoverage['lib/tr8n.js'][1425]++;
if (!this.getOption("data_tokens.special")) {
_$jscoverage['lib/tr8n.js'][1425]++;
return text;}


    _$jscoverage['lib/tr8n.js'][1427]++;
var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
    _$jscoverage['lib/tr8n.js'][1428]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1429]++;
matches.forEach(function(match) {
      _$jscoverage['lib/tr8n.js'][1430]++;
token = match.substring(1, match.length - 2);
      _$jscoverage['lib/tr8n.js'][1431]++;
self.context[token] = match;
      _$jscoverage['lib/tr8n.js'][1432]++;
text = text.replace(match, "{" + token + "}");
    });

    _$jscoverage['lib/tr8n.js'][1435]++;
return text;
  },

  generateDataTokens: function(text) {
    _$jscoverage['lib/tr8n.js'][1439]++;
if (!this.getOption("data_tokens.numeric")) {
_$jscoverage['lib/tr8n.js'][1439]++;
return text;}


    _$jscoverage['lib/tr8n.js'][1441]++;
var matches = text.match(INDEPENDENT_NUMBER_REGEX);
    _$jscoverage['lib/tr8n.js'][1442]++;
var tokenName = this.getOption("data_tokens.numeric_name");

    _$jscoverage['lib/tr8n.js'][1444]++;
var self = this;
    _$jscoverage['lib/tr8n.js'][1445]++;
matches.forEach(function(match) {
      _$jscoverage['lib/tr8n.js'][1446]++;
value = match.replace(/[,;]\s/, '');
      _$jscoverage['lib/tr8n.js'][1447]++;
token = self.contextualize(tokenName, value);
      _$jscoverage['lib/tr8n.js'][1448]++;
text = text.replace(match, match.replace(value, "{" + token + "}"));
    });

    _$jscoverage['lib/tr8n.js'][1451]++;
return text;
  },

  generateHtmlToken: function(node, value) {
    _$jscoverage['lib/tr8n.js'][1455]++;
var name = node.tagName.toLowerCase();
    _$jscoverage['lib/tr8n.js'][1456]++;
var attributes = node.attributes;
    _$jscoverage['lib/tr8n.js'][1457]++;
var attributesHash = {},
    value = ((value == null) ? '{0}' : value);

    _$jscoverage['lib/tr8n.js'][1460]++;
if (attributes.length == 0) {
      _$jscoverage['lib/tr8n.js'][1461]++;
if (this.isSelfClosingNode(node))
        {
_$jscoverage['lib/tr8n.js'][1462]++;
return '<' + name + '/>';}

      _$jscoverage['lib/tr8n.js'][1463]++;
return '<' + name + '>' + value + '</' + name + '>';
    }

    _$jscoverage['lib/tr8n.js'][1466]++;
for(var i=0; i<attributes.length; i++) {
      _$jscoverage['lib/tr8n.js'][1467]++;
attributesHash[attributes[i].name] = attributes[i].value;
    }

    _$jscoverage['lib/tr8n.js'][1470]++;
var keys = Tr8n.Utils.keys(attributesHash);
    _$jscoverage['lib/tr8n.js'][1471]++;
keys.sort();

    _$jscoverage['lib/tr8n.js'][1473]++;
var attr = [];
    _$jscoverage['lib/tr8n.js'][1474]++;
keys.forEach(function(key) {
      _$jscoverage['lib/tr8n.js'][1475]++;
var quote = (attributesHash[key].indexOf("'") != -1 ? '"' : "'");
      _$jscoverage['lib/tr8n.js'][1476]++;
attr.push(key  + '=' + quote + attributesHash[key] + quote);
    });
    _$jscoverage['lib/tr8n.js'][1478]++;
attr = attr.join(' ');

    _$jscoverage['lib/tr8n.js'][1480]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][1481]++;
return '<' + name + ' ' + attr + '/>';}


    _$jscoverage['lib/tr8n.js'][1483]++;
return '<' + name + ' ' + attr + '>' + value + '</' + name + '>';
  },

  adjustName: function(node) {
    _$jscoverage['lib/tr8n.js'][1487]++;
var name = node.tagName.toLowerCase();
    _$jscoverage['lib/tr8n.js'][1488]++;
var map = this.getOption("name_mapping");
    _$jscoverage['lib/tr8n.js'][1489]++;
name = (map[name] != null) ? map[name] : name;
    _$jscoverage['lib/tr8n.js'][1490]++;
return name;
  },

  contextualize: function(name, context) {
    _$jscoverage['lib/tr8n.js'][1494]++;
if (this.tokens[name] && this.tokens[name] != context) {
      _$jscoverage['lib/tr8n.js'][1495]++;
var index = 0;
      _$jscoverage['lib/tr8n.js'][1496]++;
var matches = name.match(/\d+$/);
      _$jscoverage['lib/tr8n.js'][1497]++;
if (matches && matches.length > 0) {
        _$jscoverage['lib/tr8n.js'][1498]++;
index = parseInt(matches[matches.length-1]);
        _$jscoverage['lib/tr8n.js'][1499]++;
name = name.replace("" + index, '');
      }
      _$jscoverage['lib/tr8n.js'][1501]++;
name = name + (index + 1);
      _$jscoverage['lib/tr8n.js'][1502]++;
return this.contextualize(name, context);
    }

    _$jscoverage['lib/tr8n.js'][1505]++;
this.tokens[name] = context;
    _$jscoverage['lib/tr8n.js'][1506]++;
return name;
  },

  debug: function(doc) {
    _$jscoverage['lib/tr8n.js'][1510]++;
this.doc = doc;
    _$jscoverage['lib/tr8n.js'][1511]++;
this.debugTree(doc, 0);
  },

  debugTree: function(node, depth) {
    _$jscoverage['lib/tr8n.js'][1515]++;
var padding = new Array(depth+1).join('=');

    _$jscoverage['lib/tr8n.js'][1517]++;
console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

    _$jscoverage['lib/tr8n.js'][1519]++;
if (node.childNodes) {
      _$jscoverage['lib/tr8n.js'][1520]++;
var self = this;
      _$jscoverage['lib/tr8n.js'][1521]++;
for(var i=0; i<node.childNodes.length; i++) {
        _$jscoverage['lib/tr8n.js'][1522]++;
var child = node.childNodes[i];
        _$jscoverage['lib/tr8n.js'][1523]++;
self.debugTree(child, depth+1);
      }
    }
  },

  nodeInfo: function(node) {
    _$jscoverage['lib/tr8n.js'][1529]++;
var info = [];
    _$jscoverage['lib/tr8n.js'][1530]++;
info.push(node.nodeType);

    _$jscoverage['lib/tr8n.js'][1532]++;
if (node.nodeType == 1)
      {
_$jscoverage['lib/tr8n.js'][1533]++;
info.push(node.tagName);}


    _$jscoverage['lib/tr8n.js'][1535]++;
if (this.isInlineNode(node)) {
      _$jscoverage['lib/tr8n.js'][1536]++;
info.push("inline");
      _$jscoverage['lib/tr8n.js'][1537]++;
if (this.hasInlineOrTextSiblings(node))
        {
_$jscoverage['lib/tr8n.js'][1538]++;
info.push("sentence");}

      else
        {
_$jscoverage['lib/tr8n.js'][1540]++;
info.push("only translatable");}

    }

    _$jscoverage['lib/tr8n.js'][1543]++;
if (this.isSelfClosingNode(node))
      {
_$jscoverage['lib/tr8n.js'][1544]++;
info.push("self closing");}


    _$jscoverage['lib/tr8n.js'][1546]++;
if (this.isOnlyChild(node))
      {
_$jscoverage['lib/tr8n.js'][1547]++;
info.push("only child");}


    _$jscoverage['lib/tr8n.js'][1549]++;
if (node.nodeType == 3)
      {
_$jscoverage['lib/tr8n.js'][1550]++;
return "[" + info.join(", ") + "]" + ': "' + node.nodeValue + '"';}


    _$jscoverage['lib/tr8n.js'][1552]++;
return "[" + info.join(", ") + "]";
  }

};;
_$jscoverage['lib/tr8n.js'][1556]++;
Tr8n.Decorators.Html = {

  decorate: function(translated_label, translation_language, target_language, translation_key, options) {
    _$jscoverage['lib/tr8n.js'][1559]++;
if (options.skip_decorations) {
_$jscoverage['lib/tr8n.js'][1559]++;
return translated_label;}


    _$jscoverage['lib/tr8n.js'][1561]++;
if (translation_key.language == target_language) {
_$jscoverage['lib/tr8n.js'][1561]++;
return translated_label;}


    _$jscoverage['lib/tr8n.js'][1563]++;
if (Tr8n.request && Tr8n.request.current_translator && Tr8n.request.current_translator.inline_mode) {
    } else {
_$jscoverage['lib/tr8n.js'][1564]++;
return translated_label;}


    _$jscoverage['lib/tr8n.js'][1566]++;
if (translation_key.locked && !Tr8n.request.current_translator.manager) {
_$jscoverage['lib/tr8n.js'][1566]++;
return translated_label;}


    _$jscoverage['lib/tr8n.js'][1568]++;
var element = 'tr8n:tr';
    _$jscoverage['lib/tr8n.js'][1569]++;
var classes = ['tr8n_translatable'];

    _$jscoverage['lib/tr8n.js'][1571]++;
if (translation_key.locked) {
      _$jscoverage['lib/tr8n.js'][1572]++;
if (!Tr8n.request.current_translator.isFeatureEnabled("show_locked_keys"))
          {
_$jscoverage['lib/tr8n.js'][1573]++;
return translated_label;}

      _$jscoverage['lib/tr8n.js'][1574]++;
classes.push('tr8n_locked');
    } else {
_$jscoverage['lib/tr8n.js'][1575]++;
if (translation_language == translation_key.language) {
      _$jscoverage['lib/tr8n.js'][1576]++;
classes.push('tr8n_not_translated');
    } else {
_$jscoverage['lib/tr8n.js'][1577]++;
if (translation_language == target_language) {
      _$jscoverage['lib/tr8n.js'][1578]++;
classes.push('tr8n_translated');
    } else {
      _$jscoverage['lib/tr8n.js'][1580]++;
classes.push('tr8n_fallback');
    }}
}


    _$jscoverage['lib/tr8n.js'][1583]++;
var html = [];
    _$jscoverage['lib/tr8n.js'][1584]++;
html.push("<" + element + " class='" + classes.join(' ') + "' data-translation_key='" + translation_key.key + "'>");
    _$jscoverage['lib/tr8n.js'][1585]++;
html.push(translated_label);
    _$jscoverage['lib/tr8n.js'][1586]++;
html.push("</" + element + ">");
    _$jscoverage['lib/tr8n.js'][1587]++;
return html.join("");
  }

};




;

_$jscoverage['lib/tr8n.js'][1597]++;
Tr8n.Application = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1598]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1600]++;
this.languages = [];
  _$jscoverage['lib/tr8n.js'][1601]++;
for(var lang in (attrs.languages || [])) {
    _$jscoverage['lib/tr8n.js'][1602]++;
this.languages.push(new Tr8n.Language(Tr8n.Utils.extend(lang, {application: this})));
  }

  _$jscoverage['lib/tr8n.js'][1605]++;
this.languages_by_locale = {};
};

_$jscoverage['lib/tr8n.js'][1608]++;
Tr8n.Application.prototype = {

  getApiClient: function() {
    _$jscoverage['lib/tr8n.js'][1611]++;
return this.api_client;
  },

  addLanguage: function(language) {
    _$jscoverage['lib/tr8n.js'][1615]++;
language.application = this;
    _$jscoverage['lib/tr8n.js'][1616]++;
this.languages_by_locale[language.attrs.locale] = language;
  },

  getLanguage: function(locale) {
    _$jscoverage['lib/tr8n.js'][1620]++;
return this.languages_by_locale[locale || Tr8n.config.default_locale];
  }

};

;
_$jscoverage['lib/tr8n.js'][1626]++;
Tr8n.Source = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1627]++;
Tr8n.Utils.extend(this, attrs);

};
;
_$jscoverage['lib/tr8n.js'][1631]++;
Tr8n.TranslationKey = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1632]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1634]++;
this.key = this.key || Tr8n.Utils.generateKey(this.label, this.description);

  _$jscoverage['lib/tr8n.js'][1636]++;
if (!this.locale && this.application)
      {
_$jscoverage['lib/tr8n.js'][1637]++;
this.locale = this.application.default_locale;}


  _$jscoverage['lib/tr8n.js'][1639]++;
if (!this.language && this.application)
    {
_$jscoverage['lib/tr8n.js'][1640]++;
this.language = this.application.language(this.locale);}


  _$jscoverage['lib/tr8n.js'][1642]++;
this.addTranslations(attrs.translations || {});
};

_$jscoverage['lib/tr8n.js'][1645]++;
Tr8n.TranslationKey.prototype = {

  addTranslation: function(translation) {
    _$jscoverage['lib/tr8n.js'][1648]++;
if (this.translations == null)
      {
_$jscoverage['lib/tr8n.js'][1649]++;
this.translations = {};}


    _$jscoverage['lib/tr8n.js'][1651]++;
if (this.translations[translation.locale])
      {
_$jscoverage['lib/tr8n.js'][1652]++;
this.translations[translation.locale] = [];}


    _$jscoverage['lib/tr8n.js'][1654]++;
this.translations[translation.locale].push(
      new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))
    );
  },

  addTranslations: function(translations_by_locale) {
    _$jscoverage['lib/tr8n.js'][1660]++;
for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {
      _$jscoverage['lib/tr8n.js'][1661]++;
for(var translation in translations_by_locale[locale]) {
        _$jscoverage['lib/tr8n.js'][1662]++;
this.addTranslation(translation);
      }
    }
  },

  getTranslationsForLanguage: function(language) {
    _$jscoverage['lib/tr8n.js'][1668]++;
if (!this.translations) {
_$jscoverage['lib/tr8n.js'][1668]++;
return [];}

    _$jscoverage['lib/tr8n.js'][1669]++;
return (this.translations[language.locale] || []);
  },

  findFirstValidTranslation: function(language, tokens) {
    _$jscoverage['lib/tr8n.js'][1673]++;
var translations = this.getTranslationsForLanguage(language);

    _$jscoverage['lib/tr8n.js'][1675]++;
for(var i=0; i<translations.length; i++) {
      _$jscoverage['lib/tr8n.js'][1676]++;
if (translations[i].isValidTranslation(tokens))
        {
_$jscoverage['lib/tr8n.js'][1677]++;
return translations[i];}

    }

    _$jscoverage['lib/tr8n.js'][1680]++;
return null;
  },

  translate: function(language, tokens, options) {
    _$jscoverage['lib/tr8n.js'][1684]++;
if (Tr8n.config.isDisabled())
      {
_$jscoverage['lib/tr8n.js'][1685]++;
return this.substituteTokens(this.label, tokens, language, options);}


    _$jscoverage['lib/tr8n.js'][1687]++;
var translation = this.findFirstValidTranslation(language, tokens);
    _$jscoverage['lib/tr8n.js'][1688]++;
var decorator = Tr8n.Decorators.Html;

    _$jscoverage['lib/tr8n.js'][1690]++;
if (translation) {
      _$jscoverage['lib/tr8n.js'][1691]++;
return decorator.decorate(
        this.substituteTokens(translation.label, tokens, translation.language, options),
        translation.language,
        this, options
      );
    }

    _$jscoverage['lib/tr8n.js'][1698]++;
return decorator.decorate(
      this.substituteTokens(this.label, tokens, this.language, options),
      this.language,
      this, options
    );
  },

  getDataTokens: function() {
    _$jscoverage['lib/tr8n.js'][1706]++;
if (!this.data_tokens) {
      _$jscoverage['lib/tr8n.js'][1707]++;
var tokenizer = new Tr8n.Tokenizers.Data(this.label);
      _$jscoverage['lib/tr8n.js'][1708]++;
this.data_tokens = tokenizer.tokens;
    }
    _$jscoverage['lib/tr8n.js'][1710]++;
return this.data_tokens;
  },

  getDataTokenNames: function() {
    _$jscoverage['lib/tr8n.js'][1714]++;
if (!this.data_token_names) {
      _$jscoverage['lib/tr8n.js'][1715]++;
this.data_token_names = [];
      _$jscoverage['lib/tr8n.js'][1716]++;
for (var token in this.getDataTokens())
        {
_$jscoverage['lib/tr8n.js'][1717]++;
this.data_token_names.push(token.full_name);}

    }
    _$jscoverage['lib/tr8n.js'][1719]++;
return this.data_token_names;
  },

  getDecorationTokenNames: function() {
    _$jscoverage['lib/tr8n.js'][1723]++;
if (!this.decoration_tokens) {
      _$jscoverage['lib/tr8n.js'][1724]++;
var tokenizer = new Tr8n.Tokenizers.Decoration(this.label);
      _$jscoverage['lib/tr8n.js'][1725]++;
this.decoration_tokens = tokenizer.tokens;
    }
    _$jscoverage['lib/tr8n.js'][1727]++;
return this.decoration_tokens;
  },

  substituteTokens: function(label, tokens, language, options) {
    _$jscoverage['lib/tr8n.js'][1731]++;
if (label.indexOf('{') != -1) {
      _$jscoverage['lib/tr8n.js'][1732]++;
var tokenizer = new Tr8n.Tokenizers.Data(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDataTokenNames()}));
      _$jscoverage['lib/tr8n.js'][1733]++;
label = tokenizer.substitute(language, options);
    }

    _$jscoverage['lib/tr8n.js'][1736]++;
if (label.indexOf('[') != -1) {
      _$jscoverage['lib/tr8n.js'][1737]++;
tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDecorationTokenNames()}));
      _$jscoverage['lib/tr8n.js'][1738]++;
label = tokenizer.substitute(language, options);
    }
    _$jscoverage['lib/tr8n.js'][1740]++;
return label;
  }

};

;
_$jscoverage['lib/tr8n.js'][1746]++;
Tr8n.Translation = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1747]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1749]++;
if (this.locale && this.translation_key) {
    _$jscoverage['lib/tr8n.js'][1750]++;
this.language = this.translation_key.application.getLanguage(this.locale);
  }

};

_$jscoverage['lib/tr8n.js'][1755]++;
Tr8n.Translation.prototype = {

  hasContextRules: function() {
    _$jscoverage['lib/tr8n.js'][1758]++;
return (this.context && Tr8n.Utils.keys(this.context).length > 0);
  },

  isValidTranslation: function(tokens) {
    _$jscoverage['lib/tr8n.js'][1762]++;
if (this.hasContextRules())
      {
_$jscoverage['lib/tr8n.js'][1763]++;
return true;}


    _$jscoverage['lib/tr8n.js'][1765]++;
var token_names = Tr8n.Utils.keys(this.context);
    _$jscoverage['lib/tr8n.js'][1766]++;
for(var i=0; i<token_names.length; i++) {
      _$jscoverage['lib/tr8n.js'][1767]++;
var object = Tr8n.Configuration.prototype.tokenObject(tokens, token_names[i]);
      _$jscoverage['lib/tr8n.js'][1768]++;
if (!object) {
_$jscoverage['lib/tr8n.js'][1768]++;
return false;}


      _$jscoverage['lib/tr8n.js'][1770]++;
var rule_keys = Tr8n.Utils.keys(this.context[token_names[i]]);

      _$jscoverage['lib/tr8n.js'][1772]++;
for(var j=0; j<rule_keys.length; j++) {
        _$jscoverage['lib/tr8n.js'][1773]++;
if (rule_keys[j] != "other") {
          _$jscoverage['lib/tr8n.js'][1774]++;
var context = this.language.getContextByKeyword(rule_keys[j]);
          _$jscoverage['lib/tr8n.js'][1775]++;
if (context == null) {
_$jscoverage['lib/tr8n.js'][1775]++;
return false;}
 
          _$jscoverage['lib/tr8n.js'][1776]++;
var rule = context.findMatchingRule(object);
          _$jscoverage['lib/tr8n.js'][1777]++;
if (!rule || rule.keyword != rule_keys[j])
            {
_$jscoverage['lib/tr8n.js'][1778]++;
return false;}

        }
      }
    }

    _$jscoverage['lib/tr8n.js'][1783]++;
return true;
  }

};



;
_$jscoverage['lib/tr8n.js'][1791]++;
Tr8n.Translator = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1792]++;
Tr8n.Utils.extend(this, attrs);
};
;
_$jscoverage['lib/tr8n.js'][1795]++;
Tr8n.Language = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1796]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1798]++;
this.contexts = {};
  _$jscoverage['lib/tr8n.js'][1799]++;
var keys = Tr8n.Utils.keys(attrs.contexts || {});
  _$jscoverage['lib/tr8n.js'][1800]++;
for (var i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][1801]++;
this.contexts[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[keys[i]], {language: this}));
  }

  _$jscoverage['lib/tr8n.js'][1804]++;
this.cases = {};
  _$jscoverage['lib/tr8n.js'][1805]++;
keys = Tr8n.Utils.keys(attrs.cases || {});
  _$jscoverage['lib/tr8n.js'][1806]++;
for (i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][1807]++;
this.cases[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[keys[i]], {language: this}));
  }
};

_$jscoverage['lib/tr8n.js'][1811]++;
Tr8n.Language.prototype = {
  getContextByKeyword: function(key) {
    _$jscoverage['lib/tr8n.js'][1813]++;
return this.contexts[key];
  },
  
  getContextByTokenName: function(token_name) {
    _$jscoverage['lib/tr8n.js'][1817]++;
var keys = Tr8n.Utils.keys(attrs.contexts || {});
    _$jscoverage['lib/tr8n.js'][1818]++;
for (var i=0; i<keys.length; i++) {
      _$jscoverage['lib/tr8n.js'][1819]++;
if (this.contexts[keys[i]].isAppliedToToken(token_name))
        {
_$jscoverage['lib/tr8n.js'][1820]++;
return this.contexts[keys[i]];}

    }
    _$jscoverage['lib/tr8n.js'][1822]++;
return null;
  },
  
  getLanguageCaseByKeyword: function(key) {
    _$jscoverage['lib/tr8n.js'][1826]++;
return this.cases[key];
  },
  
  translate: function(label, description, tokens, options) {
  
    _$jscoverage['lib/tr8n.js'][1831]++;
var translation_key = new Tr8n.TranslationKey({
      label: label,
      description: description
    });
  
      
    _$jscoverage['lib/tr8n.js'][1837]++;
return translation_key.translate(this, tokens, options);
  }
};


;
_$jscoverage['lib/tr8n.js'][1843]++;
Tr8n.LanguageCase = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1844]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1846]++;
this.rules = [];
  _$jscoverage['lib/tr8n.js'][1847]++;
attrs.rules = attrs.rules || [];
  _$jscoverage['lib/tr8n.js'][1848]++;
for (var i=0; i<attrs.rules.length; i++) {
    _$jscoverage['lib/tr8n.js'][1849]++;
this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(attrs.rules[i], {language_case: this})));
  }
};
;
_$jscoverage['lib/tr8n.js'][1853]++;
Tr8n.LanguageCaseRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1854]++;
Tr8n.Utils.extend(this, attrs);
};

_$jscoverage['lib/tr8n.js'][1857]++;
Tr8n.LanguageCaseRule.prototype = {

  getConditionsExpression: function() {
    _$jscoverage['lib/tr8n.js'][1860]++;
if (!this.conditions_expression)
      {
_$jscoverage['lib/tr8n.js'][1861]++;
this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();}

    _$jscoverage['lib/tr8n.js'][1862]++;
return this.conditions_expression;
  },
  
  getOperationsExpression: function() {
    _$jscoverage['lib/tr8n.js'][1866]++;
if (!this.operations_expression)
      {
_$jscoverage['lib/tr8n.js'][1867]++;
this.operations_expression = (new Tr8n.RulesEngine.Parser(this.operations)).parse();}

    _$jscoverage['lib/tr8n.js'][1868]++;
return this.operations_expression;
  },
  
  getGenderVariables: function(object) {
    _$jscoverage['lib/tr8n.js'][1872]++;
if (this.conditions.indexOf("@gender") == -1)
      {
_$jscoverage['lib/tr8n.js'][1873]++;
return {};}

  
    _$jscoverage['lib/tr8n.js'][1875]++;
if (object == null)
      {
_$jscoverage['lib/tr8n.js'][1876]++;
return {gender: 'unknown'};}

  
    _$jscoverage['lib/tr8n.js'][1878]++;
var context = this.language_case.language.getContextByKeyword("gender");
  
    _$jscoverage['lib/tr8n.js'][1880]++;
if (context == null)
      {
_$jscoverage['lib/tr8n.js'][1881]++;
return {gender: 'unknown'};}

  
    _$jscoverage['lib/tr8n.js'][1883]++;
return context.getVars(object);
  },
  
  evaluate: function(value, object) {
    _$jscoverage['lib/tr8n.js'][1887]++;
if (this.attrs.conditions == null)
      {
_$jscoverage['lib/tr8n.js'][1888]++;
return false;}

  
    _$jscoverage['lib/tr8n.js'][1890]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
    _$jscoverage['lib/tr8n.js'][1891]++;
evaluator.setVars(Tr8n.Utils.extend({value: value}, this.getGenderVariables(object)));
  
    _$jscoverage['lib/tr8n.js'][1893]++;
return evaluator.evaluate(this.getConditionsExpression());
  },
  
  apply: function(value) {
    _$jscoverage['lib/tr8n.js'][1897]++;
if (this.attrs.operations == null)
      {
_$jscoverage['lib/tr8n.js'][1898]++;
return value;}

  
    _$jscoverage['lib/tr8n.js'][1900]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
    _$jscoverage['lib/tr8n.js'][1901]++;
evaluator.setVars({value: value});
  
    _$jscoverage['lib/tr8n.js'][1903]++;
return evaluator.evaluate(this.getOperationsExpression());
  }

};

;
_$jscoverage['lib/tr8n.js'][1909]++;
Tr8n.LanguageContext = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1910]++;
Tr8n.Utils.extend(this, attrs);

  _$jscoverage['lib/tr8n.js'][1912]++;
this.rules = {};

  _$jscoverage['lib/tr8n.js'][1914]++;
var keys = Tr8n.Utils.keys(attrs.rules || {});
  _$jscoverage['lib/tr8n.js'][1915]++;
for (var i=0; i<keys.length; i++) {
    _$jscoverage['lib/tr8n.js'][1916]++;
this.rules[keys[i]] = new Tr8n.LanguageContextRule(Tr8n.Utils.extend(attrs.rules[keys[i]], {language_context: this}));
  }

};

_$jscoverage['lib/tr8n.js'][1921]++;
Tr8n.LanguageContext.prototype = {

  isAppliedToToken: function(token) {
    _$jscoverage['lib/tr8n.js'][1924]++;
var expr = new RegExp(this.token_expression.substring(1,this.token_expression.length-2));
    _$jscoverage['lib/tr8n.js'][1925]++;
return token.match(expr) != null;
  },
  
  getFallbackRule: function() {
    _$jscoverage['lib/tr8n.js'][1929]++;
if (!this.fallback_rule) {
      _$jscoverage['lib/tr8n.js'][1930]++;
var keys = Tr8n.Utils.keys(this.rules);
      _$jscoverage['lib/tr8n.js'][1931]++;
for (var i=0; i<keys.length; i++) {
        _$jscoverage['lib/tr8n.js'][1932]++;
var key = keys[i];
        _$jscoverage['lib/tr8n.js'][1933]++;
if (this.rules[key].isFallback())
          {
_$jscoverage['lib/tr8n.js'][1934]++;
this.fallback_rule = this.rules[key];}

      }
    }
    _$jscoverage['lib/tr8n.js'][1937]++;
return this.fallback_rule;
  },

  getConfig: function() {
    _$jscoverage['lib/tr8n.js'][1941]++;
return Tr8n.config.getContextRules(this.keyword);
  },

  getVars: function(obj) {
    _$jscoverage['lib/tr8n.js'][1945]++;
var vars = {};
    _$jscoverage['lib/tr8n.js'][1946]++;
var config = this.getConfig();

    _$jscoverage['lib/tr8n.js'][1948]++;
for (var i=0; i<this.variables.length; i++) {
      _$jscoverage['lib/tr8n.js'][1949]++;
var key = this.variables[i];
      _$jscoverage['lib/tr8n.js'][1950]++;
if (!config.variables || !config.variables[key]) {
        _$jscoverage['lib/tr8n.js'][1951]++;
vars[key] = obj;
      } else {
        _$jscoverage['lib/tr8n.js'][1953]++;
var method = config.variables[key];
        _$jscoverage['lib/tr8n.js'][1954]++;
if (typeof method === "string") {
          _$jscoverage['lib/tr8n.js'][1955]++;
if (obj.object) {
_$jscoverage['lib/tr8n.js'][1955]++;
obj = obj.object;}

          _$jscoverage['lib/tr8n.js'][1956]++;
vars[key] = obj[method];
        } else {
_$jscoverage['lib/tr8n.js'][1957]++;
if (typeof method === "function") {
          _$jscoverage['lib/tr8n.js'][1958]++;
vars[key] = method(obj);
        } else {
          _$jscoverage['lib/tr8n.js'][1960]++;
vars[key] = obj;
        }}

      }
    }
  
    _$jscoverage['lib/tr8n.js'][1965]++;
return vars;
  },
  
  findMatchingRule: function(obj) {
    _$jscoverage['lib/tr8n.js'][1969]++;
var token_vars = this.getVars(obj);
  
    _$jscoverage['lib/tr8n.js'][1971]++;
var keys = Tr8n.Utils.keys(this.rules);
    _$jscoverage['lib/tr8n.js'][1972]++;
for (var i=0; i<keys.length; i++) {
      _$jscoverage['lib/tr8n.js'][1973]++;
var rule = this.rules[keys[i]];
      _$jscoverage['lib/tr8n.js'][1974]++;
if (!rule.isFallback() && rule.evaluate(token_vars))
          {
_$jscoverage['lib/tr8n.js'][1975]++;
return rule;}

    }
  
    _$jscoverage['lib/tr8n.js'][1978]++;
return this.getFallbackRule();
  }

};;
_$jscoverage['lib/tr8n.js'][1982]++;
Tr8n.LanguageContextRule = function(attrs) {
  _$jscoverage['lib/tr8n.js'][1983]++;
Tr8n.Utils.extend(this, attrs);
};

_$jscoverage['lib/tr8n.js'][1986]++;
Tr8n.LanguageContextRule.prototype = {

  isFallback: function() {
    _$jscoverage['lib/tr8n.js'][1989]++;
return (this.keyword == "other");
  },
  
  getConditionsExpression: function() {
    _$jscoverage['lib/tr8n.js'][1993]++;
if (!this.conditions_expression)
      {
_$jscoverage['lib/tr8n.js'][1994]++;
this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();}

    _$jscoverage['lib/tr8n.js'][1995]++;
return this.conditions_expression;
  },
  
  evaluate: function(vars) {
    _$jscoverage['lib/tr8n.js'][1999]++;
if (this.isFallback()) {
_$jscoverage['lib/tr8n.js'][1999]++;
return true;}

  
    _$jscoverage['lib/tr8n.js'][2001]++;
var evaluator = new Tr8n.RulesEngine.Evaluator();
    _$jscoverage['lib/tr8n.js'][2002]++;
evaluator.setVars(vars || {});
  
    _$jscoverage['lib/tr8n.js'][2004]++;
return evaluator.evaluate(this.getConditionsExpression())
  }

};;
_$jscoverage['lib/tr8n.js'][2008]++;
var program = require('commander');
_$jscoverage['lib/tr8n.js'][2009]++;
var fs = require("fs");

_$jscoverage['lib/tr8n.js'][2011]++;
program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


_$jscoverage['lib/tr8n.js'][2019]++;
Tr8n.config = new Tr8n.Configuration();

_$jscoverage['lib/tr8n.js'][2021]++;
fs.readFile("./../config/languages/en-US.json", function (err, data) {
  _$jscoverage['lib/tr8n.js'][2022]++;
if (err) {
_$jscoverage['lib/tr8n.js'][2022]++;
throw err;}

  _$jscoverage['lib/tr8n.js'][2023]++;
Tr8n.config.currentLanguage = new Tr8n.Language(JSON.parse(data));
});



_$jscoverage['lib/tr8n.js'][2028]++;
exports.Configuration = Tr8n.Configuration;
_$jscoverage['lib/tr8n.js'][2029]++;
exports.RulesEngine = Tr8n.RulesEngine;
_$jscoverage['lib/tr8n.js'][2030]++;
exports.Tokenizers = Tr8n.Tokenizers;
_$jscoverage['lib/tr8n.js'][2031]++;
exports.Tokens = Tr8n.Tokens;
_$jscoverage['lib/tr8n.js'][2032]++;
exports.Decorators = Tr8n.Decorators;
_$jscoverage['lib/tr8n.js'][2033]++;
exports.Utils = Tr8n.Utils;
_$jscoverage['lib/tr8n.js'][2034]++;
exports.Language = Tr8n.Language;
_$jscoverage['lib/tr8n.js'][2035]++;
exports.LanguageContext = Tr8n.LanguageContext;
_$jscoverage['lib/tr8n.js'][2036]++;
exports.LanguageContextRule = Tr8n.LanguageContextRule;
_$jscoverage['lib/tr8n.js'][2037]++;
exports.Application = Tr8n.Application;


_$jscoverage['lib/tr8n.js'][2040]++;
exports.configure = function(callback) {
  _$jscoverage['lib/tr8n.js'][2041]++;
callback(Tr8n.config);
};

_$jscoverage['lib/tr8n.js'][2044]++;
exports.tr = function(label, description, tokens, options) {
  _$jscoverage['lib/tr8n.js'][2045]++;
return label;
};
