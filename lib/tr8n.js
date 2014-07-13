
var MD5 = function (string) {
 
  function RotateLeft(lValue, iShiftBits) {
    return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
  }
 
  function AddUnsigned(lX,lY) {
    var lX4,lY4,lX8,lY8,lResult;
    lX8 = (lX & 0x80000000);
    lY8 = (lY & 0x80000000);
    lX4 = (lX & 0x40000000);
    lY4 = (lY & 0x40000000);
    lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
    if (lX4 & lY4) {
      return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
    }
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
      } else {
        return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
      }
    } else {
      return (lResult ^ lX8 ^ lY8);
    }
  }
 
  function F(x,y,z) { return (x & y) | ((~x) & z); }
  function G(x,y,z) { return (x & z) | (y & (~z)); }
  function H(x,y,z) { return (x ^ y ^ z); }
  function I(x,y,z) { return (y ^ (x | (~z))); }
 
  function FF(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
 
  function GG(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
 
  function HH(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
 
  function II(a,b,c,d,x,s,ac) {
    a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
    return AddUnsigned(RotateLeft(a, s), b);
  };
 
  function ConvertToWordArray(string) {
    var lWordCount;
    var lMessageLength = string.length;
    var lNumberOfWords_temp1=lMessageLength + 8;
    var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
    var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
    var lWordArray=Array(lNumberOfWords-1);
    var lBytePosition = 0;
    var lByteCount = 0;
    while ( lByteCount < lMessageLength ) {
      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
      lByteCount++;
    }
    lWordCount = (lByteCount-(lByteCount % 4))/4;
    lBytePosition = (lByteCount % 4)*8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
    lWordArray[lNumberOfWords-2] = lMessageLength<<3;
    lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
    return lWordArray;
  };
 
  function WordToHex(lValue) {
    var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
    for (lCount = 0;lCount<=3;lCount++) {
      lByte = (lValue>>>(lCount*8)) & 255;
      WordToHexValue_temp = "0" + lByte.toString(16);
      WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
    }
    return WordToHexValue;
  };
 
  function Utf8Encode(string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
 
    for (var n = 0; n < string.length; n++) {
 
      var c = string.charCodeAt(n);
 
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
 
    }
 
    return utftext;
  };
 
  var x=Array();
  var k,AA,BB,CC,DD,a,b,c,d;
  var S11=7, S12=12, S13=17, S14=22;
  var S21=5, S22=9 , S23=14, S24=20;
  var S31=4, S32=11, S33=16, S34=23;
  var S41=6, S42=10, S43=15, S44=21;
 
  string = Utf8Encode(string);
 
  x = ConvertToWordArray(string);
 
  a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
 
  for (k=0;k<x.length;k+=16) {
    AA=a; BB=b; CC=c; DD=d;
    a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
    d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
    c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
    b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
    a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
    d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
    c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
    b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
    a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
    d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
    c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
    b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
    a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
    d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
    c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
    b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
    a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
    d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
    c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
    b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
    a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
    d=GG(d,a,b,c,x[k+10],S22,0x2441453);
    c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
    b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
    a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
    d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
    c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
    b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
    a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
    d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
    c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
    b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
    a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
    d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
    c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
    b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
    a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
    d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
    c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
    b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
    a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
    d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
    c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
    b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
    a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
    d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
    c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
    b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
    a=II(a,b,c,d,x[k+0], S41,0xF4292244);
    d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
    c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
    b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
    a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
    d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
    c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
    b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
    a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
    d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
    c=II(c,d,a,b,x[k+6], S43,0xA3014314);
    b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
    a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
    d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
    c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
    b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
    a=AddUnsigned(a,AA);
    b=AddUnsigned(b,BB);
    c=AddUnsigned(c,CC);
    d=AddUnsigned(d,DD);
  }
 
  var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
 
  return temp.toLowerCase();
};;
var Tr8n = {
  "Tokenizers": {},
  "Tokens": {},
  "RulesEngine": {},
  "Decorators": {},
  "Utils": {}
}
;
Tr8n.Utils = {

  hashValue: function(hash, key, defaultValue) {
    defaultValue = defaultValue || null;
    var parts = key.split(".");
    for(var i=0; i<parts.length; i++) {
      var part = parts[i];
      if (typeof hash[part] === "undefined") return defaultValue;
      hash = hash[part];
    }
    return hash;
  },
  
  stripTags: function(input, allowed) {
    allowed = (((allowed || '') + '')
      .toLowerCase()
      .match(/<[a-z][a-z0-9]*>/g) || [])
      .join('');     var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '')
      .replace(tags, function($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
      });
  },
  
  splitSentences: function(text) {
    var sentenceRegex = /[^.!?\s][^.!?]*(?:[.!?](?![\'"]?\s|$)[^.!?]*)*[.!?]?[\'"]?(?=\s|$)/g;
    return Tr8n.Utils.stripTags(text).match(sentenceRegex);
  },
  
  unique: function(elements) {
    return elements.reverse().filter(function (e, i, arr) {
      return arr.indexOf(e, i+1) === -1;
    }).reverse();
  },
  
  extend: function(destination, source) {
    for (var property in source)
      destination[property] = source[property];
    return destination;
  },
  
  clone: function(obj) {
    if(obj == null || typeof(obj) != 'object')
      return obj;
  
    var temp = obj.constructor();   
    for(var key in obj)
      temp[key] = clone(obj[key]);
    return temp;
  },
  
  keys: function(obj) {
        return Object.keys(obj);
  },
  
  generateKey: function(label, description) {
    return MD5(label + ";;;" + description);
  }

};;
Tr8n.Configuration = function() {
  this.initDefaultTokens();
  this.initTranslatorOptions();
  this.initContextRules();
  this.enabled = true;
  this.default_locale = "en-US";
};

Tr8n.Configuration.prototype = {
  initDefaultTokens: function() {
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
    type = type || "data"; format = format || "html";
    if (typeof this.default_tokens[format][type][token] === 'undefined') return null;
    return new String(this.default_tokens[format][type][token]);
  },

  setDefaultToken: function(token, value, type, format) {
    type = type || "data"; format = format || "html";
    this.default_tokens[format] = this.default_tokens[format] || {};
    this.default_tokens[format][type] = this.default_tokens[format][type] || {};
    this.default_tokens[format][type][token] = value;
  },

  initTranslatorOptions: function() {
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
            var genders = [];
            list.forEach(function(obj) {
              genders.push(obj.gender);
            });
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
    return this.context_rules[key] || {};
  },

  isDisabled: function() {
    return !enabled;
  },

  isEnabled: function() {
    return enabled;
  },

  getTokenObject: function(tokens, name) {
    if (tokens == null) return null;

    var object = tokens[name];
    if (typeof object === 'array')
      return object[0];

    return object.object || object;
  },

  getSupportedTokens: function() {
    return [
      [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
      [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
      [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
    ];
  }

};;
Tr8n.Tokens.Data = function(name, label) {
  this.full_name = name;
  this.label = label;
  this.parseElements();
};

Tr8n.Tokens.Data.prototype = {
  parseElements: function() {
    var name_without_parens = this.full_name.substring(1, this.full_name.length-1);
    var name_without_case_keys = name_without_parens.split('::')[0].trim();
  
    this.short_name = name_without_parens.split(':')[0].trim();
    this.case_keys = [];
  
    var keys = name_without_parens.match(/(::\s*\w+)/g) || [];
    for (var i=0; i<keys.length; i++) {
      this.case_keys.push(keys[i].replace(/[:]/g, "").trim());
    }
  
    this.context_keys = [];
    keys = name_without_case_keys.match(/(:\s*\w+)/g) || [];
    for (i=0; i<keys.length; i++) {
      this.context_keys.push(keys[i].replace(/[:]/g, "").trim());
    }
  },
  
  getContextForLanguage: function(language) {
    if (this.context_keys.length > 0)
      return language.getContextByKeyword(this.context_keys[0]);
  
    return language.getContextByTokenName(this.short_name);
  },
  
  tokenObject: function(tokens, name) {
    if (tokens == null) return null;
  
    var object = tokens[name];
    if (typeof object === 'array')
      return object[0];
  
    return object.object || object;
  },
  
  error: function(msg) {
    console.log(this.full_name + " in \"" + this.label + "\" : " + msg);
    return this.full_name;
  },
  
    
  getTokenValueFromArrayParam: function(arr, language, options) {
    options = options || {};
    if (arr.lenght == 0)
      return this.error("Invalid number of params of an array");
  
    var object = arr[0];
    var method = arr.lenght > 1 ? arr[1] : null;
  
    if (typeof object === "array")
      return this.getTokenValueFromArray(arr, language, options);
  
    if (method == null)
      return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    if (method.match(/^@@/))
      return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    if (method.match(/^@/))
      return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));
  
    return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
  },
  
  
    
  getTokenValueFromHashParam: function(hash, language, options) {
    options = options || {};
    var value = hash.value;
    var object = hash.object;
  
    if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));
    if (!object) return this.error("No object or value are provided in the hash");
  
    var attr = hash.attribute;
  
    if (!attr) return this.error("Missing value for hash token");
  
    return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
  },
  
  
    
  getTokenValueFromArray: function(params, language, options) {
    var list_options = {
      description: "List joiner",
      limit: 4,
      separator: ", ",
      joiner: 'and',
      less: '{laquo} less',
      expandable: true,
      collapsable: true
    };
  
    var objects = params[0];
    var method = (params.length > 1 ? params[1] : null);
  
    if (params.length > 2)
      list_options = Tr8n.Utils.merge(list_options, params[2]);
  
    if (options["skip_decorations"])
      list_options.expandable = false;
  
    var values = [];
    for (var obj in objects) {
      if (method == null) {
        values.push(this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false})));
      } else if (typeof method === "string") {
        if (method.match(/^@@/))
          values.push(this.sanitize(obj[method](), obj, language, Tr8n.Utils.extend(options, {safe: false})));
        else if (method.match(/^@/))
          values.push(this.sanitize(obj[method], obj, language, Tr8n.Utils.extend(options, {safe: false})));
        else
          values.push(method.replace("{$0}", this.sanitize("" + obj, obj, language, Tr8n.Utils.extend(options, {safe: false}))));
      } else if (typeof method === "object") {
        var attribute = method.attribute;
        var value = method.value;
  
        if (attribute == null)
          return this.error("No attribute is provided for the hash object in the array");
  
        if (!object[attribute])
          return this.error("Hash object in the array does not contain such attribute");
  
        attribute = this.sanitize(object[attribute], object, language, Tr8n.Utils.extend(options, {safe: false}));
  
        if (value)
          values.push(value.replace("{$0}", attribute));
        else
          values.push(attribute);
      } else if (typeof method === "function") {
        values.push(this.sanitize(method(obj), obj, language, Tr8n.Utils.extend(options, {safe: true})));
      }
    }
  
    if (values.lenght == 1)
      return values[0];
  
    if (!list_options.joiner || list_options.joiner == "")
      return values.join(list_options.separator);
  
    var joiner = language.translate(list_options.joiner, list_options.description, {}, options);
  
    if (values.length <= list_options.limit) {
      var last = values.pop();
      return values.join(list_options.separator) + " " + joiner + " " + last;
    }
  
    var displayed_values = values.slice(0, list_options.limit);
    var remaining_values = values.slice(list_options.limit);
  
    var result = displayed_values.join(list_options.separator);
    var other_values = language.translate("{count||other}", list_options.description, {count: remaining_values.length}, options);
  
    if (list_options.expandable) {
      result = result + " " + joiner + " ";
      if (list_options.remainder && typeof list_options.remainder === "function")
        return result + list_options.remainder(remaining_values);
      return result + other_values;
    }
  
    var key = list_options.key ? list_options.key : Tr8n.Utils.generateKey(this.label, values.join(","));
  
    result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
    result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';
  
    if (list_options.remainder && typeof list_options.remainder === "function")
      result = result + list_options.remainder(remaining_values);
    else
      result = result + other_values;
  
    result = result + "</a></span>";
  
    result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + list_options.separator;
    var last_remaining = remaining_values.pop();
    result = result + remaining_values.join(list_options.separator);
    result = result + " " + joiner + " " + last_remaining;
  
    if (list_options.collapsable) {
      result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
      result = result + language.translate(list_options.less, list_options["description"], {}, options);
      result = result + "</a>";
    }
  
    result = result + "</span>";
    return result;
  },
  
  getTokenValue: function(tokens, language, options) {
    options = options || {};
    var object = null;
  
    if (tokens[this.short_name])
      object = tokens[this.short_name];
    else
      object = Tr8n.config.getDefaultToken(this.short_name);
  
    if (!object)
      return this.error("Missing token value");
  
    if (typeof object === "array") {
      return this.getTokenValueFromArrayParam(object, language, options);
    }
  
    if (typeof object === "object") {
      return this.getTokenValueFromHashParam(object, language, options);
    }
  
    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
  },
  
  applyCase: function(key, value, object, language, options) {
    var lcase = language.getLanguageCaseByKeyword(key);
    if (!lcase) return value;
    return lcase.apply(value, object, options);
  },
  
  sanitize: function(value, object, language, options) {
    value = "" + value;
  
    if (!options.safe) {
      value = escape(value);
    }
  
    if (this.case_keys.length > 0) {
      for (var i=0; i<this.case_keys.length; i++) {
        value = this.applyCase(this.case_keys[i], value, object, language, options);
      }
    }
  
    return value;
  },
  
  substitute: function(label, tokens, language, options) {
    return label.replace(this.full_name, this.getTokenValue(tokens, language, options));
  }
  
};;
Tr8n.Tokens.Method = function() {

};


;
Tr8n.Tokens.Piped = function() {

};


;
Tr8n.RulesEngine.Evaluator = function(ctx) {
  this.vars = {};
  this.ctx = ctx || {

    'label'   : function(l, r)    { this.vars[l] = this.ctx[l] = r; return r; },
    'quote'   : function(expr)    { return expr; },
    'car'     : function(list)    { return list[1]; },
    'cdr'     : function(list)    { list.shift(); return list; },
    'cons'    : function(e, cell) { cell.unshift(e); return cell; },
    'eq'      : function(l, r)    { return (l == r); },
    'atom'    : function(a)       { return !(typeof a in {'object':1, 'array':1, 'function':1}); },
    'cond'    : function(c, t, f) { return (this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)); },
  
    'set'     : function(l, r){ this.vars[l] = this.ctx[l] = r; return r; },

    '='       : function(l, r)    {return l == r },                                                         '!='      : function(l, r)    {return l != r },                                                         '<'       : function(l, r)    {return l < r },                                                          '>'       : function(l, r)    {return l > r },                                                          '+'       : function(l, r)    {return l + r },                                                          '-'       : function(l, r)    {return l - r },                                                          '*'       : function(l, r)    {return l * r },                                                          '%'       : function(l, r)    {return l % r },                                                          'mod'     : function(l, r)    {return l % r },                                                          '/'       : function(l, r)    {return (l * 1.0) / r },                                                  '!'       : function(expr)    {return !expr },                                                          'not'     : function(val)     {return !val },                                                       
    '&&'      : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                'and'     : function()        {return Array.prototype.slice.call(arguments).every(this.evaluate.bind(this))},                '||'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},      'or'      : function()        {return !!Array.prototype.slice.call(arguments).filter(this.evaluate.bind(this)).length},  
    'if'      : function(c,t,f)   {return this.evaluate(c) ? this.evaluate(t) : this.evaluate(f)},          'let'     : function(l, r)    {return this.vars[l] = r },                                               'true'    : function()        {return true },                                                           'false'   : function()        {return false },                                                      
    'date'    : function(date)    {return new Date(date) },                       'today'   : function()        {return new Date() },                                                           'time'    : function(expr)    {return new Date(expr) },     'now'     : function()        {return Date.now() },                                                       
    'append'  : function(l, r)    {return String(r) + String(l) },                                          'prepend' : function(l, r)    {return String(l) + String(r) },                                      
    'match'   : function(search, subject) {                                                                   search = this._stringToRegexp(search);
      return !!subject.match(search);
    },

    'in'      : function(values, search) {                                                                    var bounds, range = this._range;
      values = values
        .replace(/\s/g,'')
        .replace(/(\w+)\.\.(\w+)/g, function(x,f,l){
          bounds = range(f,l);
          bounds.push(l);
          return bounds.join()
        })
      return values
        .split(',')
        .indexOf(String(search)) != -1;
    },

    'within'  : function(values, search) {                                                                   var 
        bounds = values.split('..').map(function(d){return parseInt(d)})
      return (bounds[0] <= search && search <= bounds[1])
    },

    'replace' : function(search, replace, subject) {                                                        search = this._stringToRegexp(search);
      return subject.replace(search, replace);
    },

    'count'   : function(list){                                                                             return (typeof(list) == "string" ? this.vars[list] : list).length
    },

    'all'     : function(list, value) {                                                                     list = (typeof(list) == "string") ? this.vars[list] : list;
      return (list instanceof Array) ? list.every(function(e){return e == value}) : false;
    },
    
    'any'     : function(list, value) {                                                                     list = (typeof(list) == "string") ? this.vars[list] : list;
      return (list instanceof Array) ? !!list.filter(function(e){return e == value}) : false;
    }

  };
  return this;
},

Tr8n.RulesEngine.Evaluator.prototype = {

  _range: function(start, end) {
    var 
      range = [],
      is_string = !String(start).match(/^\d+$/);

    start = (is_string) ? start.charCodeAt(0) : parseInt(start);
    end   = (is_string) ? end.charCodeAt(0)   : parseInt(end);

    while (end >= start) {
      range.push(is_string ? String.fromCharCode(start) : String(start));
      start += 1;
    }

    return range;
  },

  _stringToRegexp: function(str) {
    var re = new RegExp("^\/","g");
    if(!str.match(re)) {
      return new RegExp(str,"g");
    }
    str = str.replace(re, '');
    if (str.match(/\/i$/)) {
      str = str.replace(/\/i$/g, '')
      return new RegExp(str,"ig")
    }
    str = str.replace(/\/$/, '')
    return new RegExp(str,"g");
  },

  setVars: function(vars) {
    this.vars = vars;
  },

  apply: function(fn, args) {
    if (typeof this.ctx[fn] == 'function') {
      return this.ctx[fn].apply(this,args);
    }
    return this.ctx[fn]
  },

  evaluate: function(expr) {
    if (this.ctx['atom'].call(this, expr)) {
      return (expr in this.ctx ? this.ctx[expr] : expr);
    }
    var 
      fn    = expr[0],
      args  = expr.slice(1);

    if(['quote','car','cdr','cond','if','&&','||','and','or','true','false','let','count','all','any'].indexOf(fn) == -1) {
      args = args.map(this.evaluate.bind(this))
    }
    return this.apply(fn,args)
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
;
Tr8n.Tokenizers.Data = function(label, context, options) {
  this.label = label;
  this.context = context || {};
  this.options = options || {};
  this.tokenize();
};

Tr8n.Tokenizers.Data.prototype = {

  tokenize: function() {
    this.tokens = [];
    var tokens = Tr8n.config.getSupportedTokens();
    for (var i=0; i<tokens.length; i++) {
      var matches = this.label.match(tokens[i][0]) || [];
      for (var i=0; i<matches.length; i++) {
          this.tokens.push(new tokens[i][1](matches[i], this.label));
      }
    }
  },

  isTokenAllowed: function(token) {
    if (this.options.allowed_tokens) return true;
    return (this.options.allowed_tokens.indexOf(token.name) != -1);
  },

  substitute: function(language, options) {
    var label = this.label;
    for (var i=0; i<this.tokens.length; i++) {
      var token = this.tokens[i];
      if (this.isTokenAllowed(token)) {
        label = token.substitute(label, this.context, language, options);
      }
    }
    return label;
  }

};
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

Tr8n.Tokenizers.Decoration = function(label, context, opts) {
  this.label =  "[" + RESERVED_TOKEN + "]" + label + "[/" + RESERVED_TOKEN + "]";
  this.context = context || {};
  this.opts = opts || {};
  this.fragments = [];
  this.tokens = [];
  this.tokenize();
};

Tr8n.Tokenizers.Decoration.prototype = {

  tokenize: function() {
    var expression = new RegExp([
      RE_SHORT_TOKEN_START,
      RE_SHORT_TOKEN_END,
      RE_LONG_TOKEN_START,
      RE_LONG_TOKEN_END,
      RE_TEXT
    ].join("|"), "g");

    this.fragments = this.label.match(expression);
    return this.fragments;
  },

  peek: function() {
    if (this.fragments.length == 0) return null;
    return this.fragments[0];
  },

  getNextFragment: function() {
    if (this.fragments.length == 0) return null;
    return this.fragments.shift();
  },

  parse: function() {
    var token = this.getNextFragment();
    if (token.match(new RegExp(RE_SHORT_TOKEN_START)))
      return this.parseTree(token.replace(/[\[:]/g, ''), TOKEN_TYPE_SHORT);
    if (token.match(new RegExp(RE_LONG_TOKEN_START)))
      return this.parseTree(token.replace(/[\[\]]/g, ''), TOKEN_TYPE_LONG);
    return token;
  },

  parseTree: function(name, type) {
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

    this.getNextFragment();
    return tree;
  },

  isTokenAllowed: function(token) {
    return (this.opts["allowed_tokens"] == null || this.opts["allowed_tokens"].indexOf(token) != -1);
  },

  getDefaultDecoration: function(token, value) {
    var default_decoration = Tr8n.config.getDefaultToken(token, "decoration");
    if (default_decoration == null) return value;

    var decoration_token_values = this.context[token];
    default_decoration = default_decoration.replace(PLACEHOLDER, value);

    if (decoration_token_values instanceof Object) {
      var keys = Tr8n.Utils.keys(decoration_token_values);
      for (var i = 0; i < keys.length; i++) {
        default_decoration = default_decoration.replace("{$" + keys[i] + "}", decoration_token_values[keys[i]]);
      }
    }

    return default_decoration;
  },

  apply: function(token, value) {
    if (token == RESERVED_TOKEN) return value;
    if (!this.isTokenAllowed(token)) return value;

    var method = this.context[token];

    if (method != null) {
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
    expr.forEach(function(obj, index) {
      value.push(self.evaluate(obj));
    });
    return this.apply(token, value.join(''));
  },

  substitute: function(language, options) {
    return this.evaluate(this.parse());
  }

};
;
var HTML_SPECIAL_CHAR_REGEX = '/(&[^;]*;)/';
var INDEPENDENT_NUMBER_REGEX = '/^(\\d+)$|^(\\d+[,;\\s])|(\\s\\d+)$|(\\s\\d+[,;\\s])/';
var VERBOSE_DATE_REGEX = '/(((Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)|(January|February|March|April|May|June|July|August|September|October|November|December))\\s\\d+(,\\s\\d+)*(,*\\sat\\s\\d+:\\d+(\\sUTC))*)/';

Tr8n.Tokenizers.Dom = function(doc, context, options) {
  this.doc = doc;
  this.context = context || {};
  this.tokens = [];
  this.options = options || {};
};

Tr8n.Tokenizers.Dom.prototype = {

  translate: function() {
    return this.translateTree(this.doc);
  },

  translateTree: function(node) {
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
      } else if (this.isInlineNode(child) && this.hasInlineOrTextSiblings(child) && !this.isBetweenSeparators(child)) {          buffer = buffer + this.generateTmlTags(child);
      } else if (this.isSeparatorNode(child)) {            if (buffer != "")
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
  },

  isNonTranslatableNode: function(node) {
    if (node.nodeType == 1 && this.getOption("nodes.scripts").indexOf(node.nodeName.toLowerCase()) != -1)
      return true;
    if (node.nodeType == 1 && node.childNodes.length == 0 && node.nodeValue == "")
      return true;
    return false;
  },

  translateTml: function(tml) {
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
  },

  hasChildNodes: function(node) {
    if (!node.childNodes) return false;
    return (node.childNodes.length > 0);
  },

  isBetweenSeparators: function(node) {
    if (this.isSeparatorNode(node.previousSibling) && !this.isValidTextNode(node.nextSibling))
      return true;

    if (this.isSeparatorNode(node.nextSibling) && !this.isValidTextNode(node.previousSibling))
      return true;

    return false;
  },

  generateTmlTags: function(node) {
    var buffer = "";
    var self = this;
    for(var i=0; i<node.childNodes.length; i++) {
      var child = node.childNodes[i];
      if (child.nodeType == 3)                            buffer = buffer + child.nodeValue;
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
  },

  getOption: function(name) {
    if (this.options[name]) {
      return this.options[name];
    }
    return Tr8n.Utils.hashValue(Tr8n.config.translator_options, name);
  },

  debugTranslation: function(translation) {
    return this.getOption("debug_format").replace('{$0}', translation);
  },

  isEmptyString: function(tml) {
      tml = tml.replace(/[\s\n\r\t\0\x0b\xa0\xc2]/g, '');
      return (tml == '');
  },

  resetContext: function() {
    this.tokens = [].concat(this.context);
  },

  isShortToken: function(token, value) {
    return (this.getOption("nodes.short").indexOf(token.toLowerCase()) != -1 || value.length < 20);
  },

  isOnlyChild: function(node) {
    if (node.parentNode == null) return false;
    return (node.parentNode.childNodes.length == 1);
  },

  hasInlineOrTextSiblings: function(node) {
    if (node.parentNode == null) return false;

    for (var i=0; i < node.parentNode.childNodes.length; i++) {
      var child = node.parentNode.childNodes[i];
      if (child != node) {
        if (this.isInlineNode(child) || this.isValidTextNode(child))
          return true;
      }
    }

    return false;
  },

  isInlineNode: function(node) {
    return (
      node.nodeType == 1
      && this.getOption("nodes.inline").indexOf(node.tagName.toLowerCase()) != -1
      && !this.isOnlyChild(node)
    );
  },

  isContainerNode: function(node) {
    return (node.nodeType == 1 && !this.isInlineNode(node));
  },

  isSelfClosingNode: function(node) {
    return (node.firstChild == null);
  },

  isIgnoredNode: function(node) {
    if (node.nodeType != 1) return true;
    return (this.getOption("nodes.ignored").indexOf(node.tagName.toLowerCase()) != -1);
  },

  isValidTextNode: function(node) {
    if (node == null) return false;
    return (node.nodeType == 3 && !this.isEmptyString(node.nodeValue));
  },

  isSeparatorNode: function(node) {
    if (node == null) return false;
    return (node.nodeType == 1 && this.getOption("nodes.splitters").indexOf(node.tagName.toLowerCase()) != -1);
  },

  sanitizeValue: function(value) {
    return value.replace(/^\s+/,'');
  },

  replaceSpecialCharacters: function(text) {
    if (!this.getOption("data_tokens.special")) return text;

    var matches = text.match(HTML_SPECIAL_CHAR_REGEX);
    var self = this;
    matches.forEach(function(match) {
      token = match.substring(1, match.length - 2);
      self.context[token] = match;
      text = text.replace(match, "{" + token + "}");
    });

    return text;
  },

  generateDataTokens: function(text) {
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
  },

  generateHtmlToken: function(node, value) {
    var name = node.tagName.toLowerCase();
    var attributes = node.attributes;
    var attributesHash = {},
    value = ((value == null) ? '{0}' : value);

    if (attributes.length == 0) {
      if (this.isSelfClosingNode(node))
        return '<' + name + '/>';
      return '<' + name + '>' + value + '</' + name + '>';
    }

    for(var i=0; i<attributes.length; i++) {
      attributesHash[attributes[i].name] = attributes[i].value;
    }

    var keys = Tr8n.Utils.keys(attributesHash);
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
  },

  adjustName: function(node) {
    var name = node.tagName.toLowerCase();
    var map = this.getOption("name_mapping");
    name = (map[name] != null) ? map[name] : name;
    return name;
  },

  contextualize: function(name, context) {
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
  },

  debug: function(doc) {
    this.doc = doc;
    this.debugTree(doc, 0);
  },

  debugTree: function(node, depth) {
    var padding = new Array(depth+1).join('=');

    console.log(padding + "=> " + (typeof node) + ": " + this.nodeInfo(node));

    if (node.childNodes) {
      var self = this;
      for(var i=0; i<node.childNodes.length; i++) {
        var child = node.childNodes[i];
        self.debugTree(child, depth+1);
      }
    }
  },

  nodeInfo: function(node) {
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
  }

};;
Tr8n.Decorators.Html = {

  decorate: function(translated_label, translation_language, target_language, translation_key, options) {
    if (options.skip_decorations) return translated_label;

    if (translation_key.language == target_language) return translated_label;

    if (Tr8n.request && Tr8n.request.current_translator && Tr8n.request.current_translator.inline_mode) {
    } else return translated_label;

    if (translation_key.locked && !Tr8n.request.current_translator.manager) return translated_label;

    var element = 'tr8n:tr';
    var classes = ['tr8n_translatable'];

    if (translation_key.locked) {
      if (!Tr8n.request.current_translator.isFeatureEnabled("show_locked_keys"))
          return translated_label;
      classes.push('tr8n_locked');
    } else if (translation_language == translation_key.language) {
      classes.push('tr8n_not_translated');
    } else if (translation_language == target_language) {
      classes.push('tr8n_translated');
    } else {
      classes.push('tr8n_fallback');
    }

    var html = [];
    html.push("<" + element + " class='" + classes.join(' ') + "' data-translation_key='" + translation_key.key + "'>");
    html.push(translated_label);
    html.push("</" + element + ">");
    return html.join("");
  }

};




;
Tr8n.Application = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.languages = [];
  for(var lang in (attrs.languages || [])) {
    this.languages.push(new Tr8n.Language(Tr8n.Utils.extend(lang, {application: this})));
  }

  this.languages_by_locale = {};
};

Tr8n.Application.prototype = {

  getApiClient: function() {
    return this.api_client;
  },

  addLanguage: function(language) {
    language.application = this;
    this.languages_by_locale[language.attrs.locale] = language;
  },

  getLanguage: function(locale) {
    return this.languages_by_locale[locale || Tr8n.config.default_locale];
  }

};

;
Tr8n.Source = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

};
;
Tr8n.TranslationKey = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.key = this.key || Tr8n.Utils.generateKey(this.label, this.description);

  if (!this.locale && this.application)
      this.locale = this.application.default_locale;

  if (!this.language && this.application)
    this.language = this.application.language(this.locale);

  this.addTranslations(attrs.translations || {});
};

Tr8n.TranslationKey.prototype = {

  addTranslation: function(translation) {
    if (this.translations == null)
      this.translations = {};

    if (this.translations[translation.locale])
      this.translations[translation.locale] = [];

    this.translations[translation.locale].push(
      new Tr8n.Translation(Tr8n.Utils.merge(translation, {translation_key: this}))
    );
  },

  addTranslations: function(translations_by_locale) {
    for(var locale in Tr8n.Utils.keys(translations_by_locale || {})) {
      for(var translation in translations_by_locale[locale]) {
        this.addTranslation(translation);
      }
    }
  },

  getTranslationsForLanguage: function(language) {
    if (!this.translations) return [];
    return (this.translations[language.locale] || []);
  },

  findFirstValidTranslation: function(language, tokens) {
    var translations = this.getTranslationsForLanguage(language);

    for(var i=0; i<translations.length; i++) {
      if (translations[i].isValidTranslation(tokens))
        return translations[i];
    }

    return null;
  },

  translate: function(language, tokens, options) {
    if (Tr8n.config.isDisabled())
      return this.substituteTokens(this.label, tokens, language, options);

    var translation = this.findFirstValidTranslation(language, tokens);
    var decorator = Tr8n.Decorators.Html;

    if (translation) {
      return decorator.decorate(
        this.substituteTokens(translation.label, tokens, translation.language, options),
        translation.language,
        this, options
      );
    }

    return decorator.decorate(
      this.substituteTokens(this.label, tokens, this.language, options),
      this.language,
      this, options
    );
  },

  getDataTokens: function() {
    if (!this.data_tokens) {
      var tokenizer = new Tr8n.Tokenizers.Data(this.label);
      this.data_tokens = tokenizer.tokens;
    }
    return this.data_tokens;
  },

  getDataTokenNames: function() {
    if (!this.data_token_names) {
      this.data_token_names = [];
      for (var token in this.getDataTokens())
        this.data_token_names.push(token.full_name);
    }
    return this.data_token_names;
  },

  getDecorationTokenNames: function() {
    if (!this.decoration_tokens) {
      var tokenizer = new Tr8n.Tokenizers.Decoration(this.label);
      this.decoration_tokens = tokenizer.tokens;
    }
    return this.decoration_tokens;
  },

  substituteTokens: function(label, tokens, language, options) {
    if (label.indexOf('{') != -1) {
      var tokenizer = new Tr8n.Tokenizers.Data(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDataTokenNames()}));
      label = tokenizer.substitute(language, options);
    }

    if (label.indexOf('[') != -1) {
      tokenizer = new Tr8n.Tokenizers.Decoration(label, tokens, Tr8n.Utils.extend(options, {allowed_tokens: this.getDecorationTokenNames()}));
      label = tokenizer.substitute(language, options);
    }
    return label;
  }

};

;
Tr8n.Translation = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  if (this.locale && this.translation_key) {
    this.language = this.translation_key.application.getLanguage(this.locale);
  }

};

Tr8n.Translation.prototype = {

  hasContextRules: function() {
    return (this.context && Tr8n.Utils.keys(this.context).length > 0);
  },

  isValidTranslation: function(tokens) {
    if (this.hasContextRules())
      return true;

    var token_names = Tr8n.Utils.keys(this.context);
    for(var i=0; i<token_names.length; i++) {
      var object = Tr8n.Configuration.prototype.tokenObject(tokens, token_names[i]);
      if (!object) return false;

      var rule_keys = Tr8n.Utils.keys(this.context[token_names[i]]);

      for(var j=0; j<rule_keys.length; j++) {
        if (rule_keys[j] != "other") {
          var context = this.language.getContextByKeyword(rule_keys[j]);
          if (context == null) return false; 
          var rule = context.findMatchingRule(object);
          if (!rule || rule.keyword != rule_keys[j])
            return false;
        }
      }
    }

    return true;
  }

};



;
Tr8n.Translator = function(attrs) {
  Tr8n.Utils.extend(this, attrs);
};
;
Tr8n.Language = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.contexts = {};
  var keys = Tr8n.Utils.keys(attrs.contexts || {});
  for (var i=0; i<keys.length; i++) {
    this.contexts[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.contexts[keys[i]], {language: this}));
  }

  this.cases = {};
  keys = Tr8n.Utils.keys(attrs.cases || {});
  for (i=0; i<keys.length; i++) {
    this.cases[keys[i]] = new Tr8n.LanguageContext(Tr8n.Utils.extend(attrs.cases[keys[i]], {language: this}));
  }
};

Tr8n.Language.prototype = {
  getContextByKeyword: function(key) {
    return this.contexts[key];
  },
  
  getContextByTokenName: function(token_name) {
    var keys = Tr8n.Utils.keys(attrs.contexts || {});
    for (var i=0; i<keys.length; i++) {
      if (this.contexts[keys[i]].isAppliedToToken(token_name))
        return this.contexts[keys[i]];
    }
    return null;
  },
  
  getLanguageCaseByKeyword: function(key) {
    return this.cases[key];
  },
  
  translate: function(label, description, tokens, options) {
  
    var translation_key = new Tr8n.TranslationKey({
      label: label,
      description: description
    });
  
      
    return translation_key.translate(this, tokens, options);
  }
};


;
Tr8n.LanguageCase = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.rules = [];
  attrs.rules = attrs.rules || [];
  for (var i=0; i<attrs.rules.length; i++) {
    this.rules.push(new Tr8n.LanguageCaseRule(Tr8n.Utils.extend(attrs.rules[i], {language_case: this})));
  }
};
;
Tr8n.LanguageCaseRule = function(attrs) {
  Tr8n.Utils.extend(this, attrs);
};

Tr8n.LanguageCaseRule.prototype = {

  getConditionsExpression: function() {
    if (!this.conditions_expression)
      this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();
    return this.conditions_expression;
  },
  
  getOperationsExpression: function() {
    if (!this.operations_expression)
      this.operations_expression = (new Tr8n.RulesEngine.Parser(this.operations)).parse();
    return this.operations_expression;
  },
  
  getGenderVariables: function(object) {
    if (this.conditions.indexOf("@gender") == -1)
      return {};
  
    if (object == null)
      return {gender: 'unknown'};
  
    var context = this.language_case.language.getContextByKeyword("gender");
  
    if (context == null)
      return {gender: 'unknown'};
  
    return context.getVars(object);
  },
  
  evaluate: function(value, object) {
    if (this.attrs.conditions == null)
      return false;
  
    var evaluator = new Tr8n.RulesEngine.Evaluator();
    evaluator.setVars(Tr8n.Utils.extend({value: value}, this.getGenderVariables(object)));
  
    return evaluator.evaluate(this.getConditionsExpression());
  },
  
  apply: function(value) {
    if (this.attrs.operations == null)
      return value;
  
    var evaluator = new Tr8n.RulesEngine.Evaluator();
    evaluator.setVars({value: value});
  
    return evaluator.evaluate(this.getOperationsExpression());
  }

};

;
Tr8n.LanguageContext = function(attrs) {
  Tr8n.Utils.extend(this, attrs);

  this.rules = {};

  var keys = Tr8n.Utils.keys(attrs.rules || {});
  for (i=0; i<keys.length; i++) {
    rules[keys[i]] = new Tr8n.LanguageContextRule(Tr8n.Utils.extend(attrs.rules[keys[i]], {language: this}));
  }

};

Tr8n.LanguageContext.prototype = {

  isAppliedToToken: function(token) {
    return token.match(new RegExp(this.token_expression)) != null;
  },
  
  getFallbackRule: function() {
    if (!this.fallback_rule) {
      var keys = Tr8n.Utils.keys(this.rules);
      for (var i=0; i<keys.length; i++) {
        var key = keys[i];
        if (this.rules[key].isFallback()) {
          this.fallback_rule = rule;
        }
      }
    }
    return this.fallback_rule;
  },
  
  getVars: function(obj) {
    var vars = {};
    var config = Tr8n.config.getContextRules(this.keyword);
  
    for (var i=0; i<this.variables.length; i++) {
      var key = this.variables[i];
      if (!config.variables || !config.variables[key]) {
        vars[key] = obj;
      } else {
        var method = config.variables[key];
        if (typeof method === "string") {
          if (obj.object) obj = obj.object;
          vars[key] = obj[method];
        } else if (typeof method === "function") {
          vars[key] = method(obj);
        } else {
          vars[key] = obj;
        }
      }
    }
  
    return vars;
  },
  
  findMatchingRule: function(obj) {
    var token_vars = this.getVars(obj);
  
    var keys = Tr8n.Utils.keys(this.rules);
    for (var i=0; i<keys.length; i++) {
      var rule = this.rules[keys[i]];
      if (!rule.isFallback() && rule.evaluate(token_vars))
          return rule;
    }
  
    return this.getFallbackRule();
  }

};;
Tr8n.LanguageContextRule = function(attrs) {
  Tr8n.Utils.extend(this, attrs);
};

Tr8n.LanguageContextRule.prototype = {

  isFallback: function() {
    return (this.keyword == "other");
  },
  
  getConditionsExpression: function() {
    if (!this.conditions_expression)
      this.conditions_expression = (new Tr8n.RulesEngine.Parser(this.conditions)).parse();
    return this.conditions_expression;
  },
  
  evaluate: function(vars) {
    if (this.isFallback()) return true;
  
    var evaluator = new Tr8n.RulesEngine.Evaluator();
    evaluator.setVars(vars || {});
  
    return evaluator.evaluate(this.getConditionsExpression())
  }

};;
var program = require('commander');
var fs = require("fs");

program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


Tr8n.config = new Tr8n.Configuration();

fs.readFile("./../config/languages/en-US.json", function (err, data) {
  if (err) throw err;
  Tr8n.config.currentLanguage = new Tr8n.Language(JSON.parse(data));
});



exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Tokens = Tr8n.Tokens;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;
exports.Language = Tr8n.Language;
exports.Application = Tr8n.Application;


exports.configure = function(callback) {
  callback(Tr8n.config);
};

exports.tr = function(label, description, tokens, options) {
  return label;
};
