module.exports = {

  enabled: true,
  default_locale: "en",
  source_separator: "@:@",
  delayed_flush: false,
  debug: false,

  default_tokens: {
    html : {
      data : {
        ndash  :  "&ndash;",  
        mdash  :  "&mdash;",  
        iexcl  :  "&iexcl;",  
        iquest :  "&iquest;", 
        quot   :  "&quot;",   
        ldquo  :  "&ldquo;",  
        rdquo  :  "&rdquo;",  
        lsquo  :  "&lsquo;",  
        rsquo  :  "&rsquo;",  
        laquo  :  "&laquo;",  
        raquo  :  "&raquo;",  
        nbsp   :  "&nbsp;",   
        lsaquo :  "&lsaquo;", 
        rsaquo :  "&rsaquo;", 
        br     :  "<br/>",    
        lbrace :  "{",
        rbrace :  "}",
        trade  :  "&trade;"
      },
      decoration : {
        strong :  "<strong>{$0}</strong>",
        bold   :  "<strong>{$0}</strong>",
        b      :  "<strong>{$0}</strong>",
        em     :  "<em>{$0}</em>",
        italic :  "<i>{$0}</i>",
        i      :  "<i>{$0}</i>",
        link   :  "<a href='{$href}' class='{$class}' style='{$style}'>{$0}</a>",
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
        quot   :  "\"",
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
  },

  translator_options: {
    debug: false,
    debug_format_html: "<span style='font-size:20px;color:red;'>{<\/span> {$0} <span style='font-size:20px;color:red;'>}<\/span>",
    debug_format: "{{{{$0}}}}",
    split_sentences: true,
    decoration_token_format: "[]",
    ignore_elements: ['.notranslate'],
    nodes: {
      ignored:    [],
      scripts:    ["iframe", "script", "noscript", "style", "audio", "video", "map", "object", "track", "embed", "svg", "ruby", "pre"],
      inline:     ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup", "var", "code"],
      short:      ["i", "b"],
      splitters:  ["br", "hr"]
    },
    attributes: {
      labels: ["title", "alt", "placeholder"]
    },
    name_mapping: {
      b: "bold",
      i: "italic",
      a: "link",
      img: "picture"
    },
    data_tokens: {
      special: {
        enable: true,
        regex: /(&[^;]*;)/g
      },
      date: {
        enabled: true,
        formats: [
          [/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d+,\s+\d+/g, "{month} {day}, {year}"],
          [/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d+,\s+\d+/g, "{month} {day}, {year}"],
          [/\d+\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec),\s+\d+/g, "{day} {month}, {year}"],
          [/\d+\s+(January|February|March|April|May|June|July|August|September|October|November|December),\s+\d+/g, "{day} {month}, {year}"]
        ],
        name: 'date'
      },
      rules: [
        {enabled: true, name: 'phone',    regex: /(\d{1}-)?\d{3}-\d{3}-\d{4}|\d?\(\d{3}\)\s*\d{3}-\d{4}|(\d.)?\d{3}.\d{3}.\d{4}/g},
        {enabled: true, name: 'email',    regex: /[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|io|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?/g},
        {enabled: true, name: 'price',    regex: /\$\d*(,\d*)*(\.\d*)?/g},
        {enabled: true, name: 'fraction', regex: /\d+\/\d+/g},
        {enabled: true, name: 'num',      regex: /\b\d+(,\d*)*(\.\d*)?%?\b/g}
      ]
    }
  },

  context_rules: {
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
  }

};