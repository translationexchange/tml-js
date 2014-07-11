
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
};
var Tr8n = {
  "Tokenizers": {},
  "Tokens": {},
  "RulesEngine": {},
  "Decorators": {},
  "Utils": {}
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

Tr8n.Utils.unique = function(elements) {
  return elements.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i+1) === -1;
  }).reverse();
};

Tr8n.Utils.extend = function(destination, source) {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};;
Tr8n.Configuration = function() {
  this.initDefaultTokens();
  this.initTranslatorOptions();
  this.currentLanguage = new Tr8n.Language();
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


;
Tr8n.Tokens.Data = function(name, label) {
  this.fullName = name;
  this.label = label;
  this.parseElements();
};

Tr8n.Tokens.Data.prototype.parseElements = function() {
  var nameWithoutParens = this.fullName.substring(1, this.fullName.length-1);
  var nameWithoutCaseKeys = nameWithoutParens.split('::')[0].trim();

  this.shortName = nameWithoutParens.split(':')[0].trim();
  this.caseKeys = [];
  (nameWithoutParens.match(/(::\s*\w+)/g) || []).forEach(function(key) {
    this.caseKeys.push(key.replace(/[:]/g, "").trim());
  }.bind(this));
  this.contextKeys = [];
  (nameWithoutCaseKeys.match(/(:\s*\w+)/g) || []).forEach(function(key) {
    this.contextKeys.push(key.replace(/[:]/g, "").trim());
  }.bind(this));
};

Tr8n.Tokens.Data.prototype.contextForLanguage = function(language, opts) {
  if (this.contextKeys.length > 0)
    return language.contextByKeyword(this.contextKeys[0]);

  return language.contextByTokenName(this.shortName);
};

Tr8n.Tokens.Data.prototype.tokenObject = function(tokenValues, tokenName) {
  if (tokenValues == null) return null;

  var tokenObject = tokenValues[tokenName];
  if (typeof tokeObject === 'array')
    return tokenObject[0];

  return tokenObject.object || tokenObject;
};

Tr8n.Tokens.Data.prototype.error = function(msg) {
  console.log(this.fullName + " in \"" + this.label + "\" : " + msg);
  return this.fullName;
};


Tr8n.Tokens.Data.prototype.tokenValueFromArrayParam = function(arr, language, options) {
  options = options || {};
  if (arr.lenght == 0)
    return this.error("Invalid number of params of an array");

  var object = arr[0];
  var method = arr.lenght > 1 ? arr[1] : null;

  if (typeof object === "array")
    return this.tokenValueFromArray(tokenValues, language, options);

  if (method == null)
    return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));

  if (method.match(/^@@/))
    return this.sanitize(object[method](), object, language, Tr8n.Utils.extend(options, {safe: false}));

  if (method.match(/^@/))
    return this.sanitize(object[method], object, language, Tr8n.Utils.extend(options, {safe: false}));

    return this.sanitize(method, object, language, Tr8n.Utils.extend(options, {safe: true}));
};



Tr8n.Tokens.Data.prototype.tokenValueFromHashParam = function(hash, language, options) {
  options = options || {};
  var value = hash.value;
  var object = hash.object;

  if (value) return this.sanitize(value, object || hash, language, Tr8n.Utils.extend(options, {safe: true}));

  if (object == null || typeof object === "undefined")
    return this.error("No object or value are provided in the hash");

  var attr = hash.attribute;

  if (attr == null || typeof attr === "undefined")
    return this.error("Missing value for hash token");

  return this.sanitize(object[attr], object, language, Tr8n.Utils.extend(options, {safe: false}));
};



Tr8n.Tokens.Data.prototype.tokenValueFromArray = function(params, language, options) {
  var listOptions = {
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
    listOptions = Tr8n.Utils.merge(listOptions, params[2]);

  if (options["skip_decorations"])
    listOptions.expandable = false;

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

  if (!listOptions.joiner || listOptions.joiner == "")
    return values.join(listOptions.separator);

  var joiner = language.translate(listOptions.joiner, listOptions.description, {}, options);

  if (values.length <= listOptions.limit) {
    var last = values.pop();
    return values.join(listOptions.separator) + " " + joiner + " " + last;
  }

  var displayedValues = values.slice(0, listOptions.limit);
  var remainingValues = values.slice(listOptions.limit);

  var result = displayedValues.join(listOptions.separator);
  var otherValues = language.translate("{count||other}", listOptions.description, {count: remainingValues.length}, options);

  if (listOptions.expandable) {
    result = result + " " + joiner + " ";
    if (listOptions.remainder && typeof listOptions.remainder === "function")
      return result + listOptions.remainder(remainingValues);
    return result + otherValues;
  }

  var key = listOptions.key ? listOptions.key : Tr8n.Utils.generateKey(this.label, values.join(","));

  result = result + '<span id="tr8n_other_link_' + key + '"> ' + joiner + ' ';
  result = result + '<a href="#" class="tr8n_other_list_link" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='none'; document.getElementById('tr8n_other_elements_key').style.display='inline'; return false;" + '">';

  if (listOptions.remainder && typeof listOptions.remainder === "function")
    result = result + listOptions.remainder(remainingValues);
  else
    result = result + otherValues;

  result = result + "</a></span>";

  result = result + '<span id="tr8n_other_elements_' + key + '" style="display:none">' + listOptions.separator;
  var lastRemaining = remainingValues.pop();
  result = result + remainingValues.join(listOptions.separator);
  result = result + " " + joiner + " " + lastRemaining;

  if (listOptions.collapsable) {
    result = result + ' <a href="#" class="tr8n_other_less_link" style="font-size:smaller;white-space:nowrap" onClick="' + "document.getElementById('tr8n_other_link_key').style.display='inline'; document.getElementById('tr8n_other_elements_key').style.display='none'; return false;" + '">';
    result = result + language.translate(listOptions.less, listOptions["description"], {}, options);
    result = result + "</a>";
  }

  result = result + "</span>";
  return result;
};

Tr8n.Tokens.Data.prototype.tokenValue = function(tokenValues, language, options) {
  options = options || {};
  var object = null;

  if (tokenValues[this.shortName])
    object = tokenValues[this.shortName];
  else
    object = Tr8n.config.defaultToken(this.shortName);

  if (!object)
    return this.error("Missing token value");

  if (typeof object === "array") {
    return this.tokenValueFromArrayParam(object, language, options);
  }

  if (typeof object === "object") {
    return this.tokenValueFromHashParam(object, language, options);
  }

  return this.sanitize("" + object, object, language, Tr8n.Utils.extend(options, {safe: false}));
};

Tr8n.Tokens.Data.prototype.applyCase = function(key, value, object, language, options) {
  var lcase = language.languageCase(key);
  if (!lcase) return value;
  return lcase.apply(value, object, options);
};

Tr8n.Tokens.Data.prototype.sanitize = function(value, object, language, options) {
  value = "" . value;

  if (!options.safe) {
        value = htmlspecialchars(value);
  }

  if (this.caseKeys.length > 0) {
    var self = this;
    this.caseKeys.forEach(function(lcase) {
      value = self.applyCase(lcase, value, object, language, options);
    });
  }

  return value;
};

Tr8n.Tokens.Data.prototype.substitute = function(label, tokenValues, language, options) {
  var tokenValue = this.tokenValue(tokenValues, language, options);
  return label.replace(this.fullName, tokenValue);
};

;Tr8n.Tokens.Method = function() {

};


;;
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
;
Tr8n.Tokenizers.DataTokenizer = function(label, context, options) {
  this.label = label;
  this.context = context || {};
  this.options = options || {};
  this.tokens = [];
};

Tr8n.Tokenizers.DataTokenizer.prototype.supportedTokens = function() {
  return [
    [/(\{[^_:][\w]*(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Data],
    [/(\{[^_:.][\w]*(\.[\w]+)(:[\w]+)*(::[\w]+)*\})/, Tr8n.Tokens.Method],
    [/(\{[^_:|][\w]*(:[\w]+)*(::[\w]+)*\s*\|\|?[^{^}]+\})/, Tr8n.Tokens.Piped]
  ];
};

Tr8n.Tokenizers.DataTokenizer.prototype.tokenize = function() {
  var self = this;
  self.tokens = [];
  self.supportedTokens().forEach(function(tokenInfo) {
    var matches = self.label.match(tokensInfo[0]);
    if (matches) {
      Tr8n.Utils.unique(matches).forEach(function(match) {
        self.tokens.push(new tokenInfo[1](self.label, match));
      });
    }
  });
};

Tr8n.Tokenizers.DataTokenizer.prototype.isTokenAllowed = function(token) {
  if (this.options["allowed_tokens"] == null) return true;
  return (this.options["allowed_tokens"].indexOf(token.name) != -1);
};

Tr8n.Tokenizers.DataTokenizer.prototype.substitute = function(language, options) {
  var label = this.label;
  var self = this;
  self.tokens.forEach(function(token) {
    if (self.isTokenAllowed(token)) {
      label = token.substitute(label, self.context, language, options);
    }
  });
  return label;
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
  var padding = new Array(depth+1).join('=');

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
;;;;;;;;;
Tr8n.Language = function(attrs) {
  this.attrs = attrs;
};

Tr8n.Language.prototype.translate = function(label, description, tokens, options) {
  return label;
};
;;;;;var program = require('commander');

program.version('0.1.1')
  .option('-l, --label', 'Label to be translated')
  .option('-d, --description', 'Description of the label')
  .option('-t, --tokens', 'Tokens to be substituted')
  .option('-o, --options', 'Options')
  .parse(process.argv);


Tr8n.config = new Tr8n.Configuration();



exports.RulesEngine = Tr8n.RulesEngine;
exports.Tokenizers = Tr8n.Tokenizers;
exports.Tokens = Tr8n.Tokens;
exports.Decorators = Tr8n.Decorators;
exports.Utils = Tr8n.Utils;


exports.configure = function(callback) {
  callback(Tr8n.config);
};

exports.tr = function(label, description, tokens, options) {
  return label;
};
