module.exports = {

  enabled: true,
  default_locale: "en",
  source_separator: "@:@",
  delayed_flush: false,

  application: {
    access_token  : "YOUR_TOKEN"
  },

  cache: {
    adapter: "file",
    path: "./cache"
  },

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
    debug: true,
    debug_format_html: "<span style='font-size:20px;color:red;'>{<\/span> {$0} <span style='font-size:20px;color:red;'>}<\/span>",
    debug_format: "{{{{$0}}}}",
    split_sentences: false,
    nodes: {
      ignored:    [],
      scripts:    ["style", "script"],
      inline:     ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup"],
      short:      ["i", "b"],
      splitters:  ["br", "hr"]
    },
    attributes: {
      labels: ["title", "alt"]
    },
    name_mapping: {
      b: "bold",
      i: "italic",
      a: "link",
      img: "picture"
    },
    data_tokens: {
      special: false,
      numeric: false,
      numeric_name: "num"
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