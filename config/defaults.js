/**
 * Copyright (c) 2017 Translation Exchange, Inc.
 *
 *  _______                  _       _   _             ______          _
 * |__   __|                | |     | | (_)           |  ____|        | |
 *    | |_ __ __ _ _ __  ___| | __ _| |_ _  ___  _ __ | |__  __  _____| |__   __ _ _ __   __ _  ___
 *    | | '__/ _` | '_ \/ __| |/ _` | __| |/ _ \| '_ \|  __| \ \/ / __| '_ \ / _` | '_ \ / _` |/ _ \
 *    | | | | (_| | | | \__ \ | (_| | |_| | (_) | | | | |____ >  < (__| | | | (_| | | | | (_| |  __/
 *    |_|_|  \__,_|_| |_|___/_|\__,_|\__|_|\___/|_| |_|______/_/\_\___|_| |_|\__,_|_| |_|\__, |\___|
 *                                                                                        __/ |
 *                                                                                       |___/
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {

  enabled: true,
  default_locale: "en",
  source_separator: "@:@",
  delayed_flush: false,
  debug: false,

  default_tokens: {
    html: {
      data: {
        ndash: "&ndash;",
        mdash: "&mdash;",
        iexcl: "&iexcl;",
        iquest: "&iquest;",
        quot: "&quot;",
        ldquo: "&ldquo;",
        rdquo: "&rdquo;",
        lsquo: "&lsquo;",
        rsquo: "&rsquo;",
        laquo: "&laquo;",
        raquo: "&raquo;",
        nbsp: "&nbsp;",
        lsaquo: "&lsaquo;",
        rsaquo: "&rsaquo;",
        br: "<br/>",
        lbrace: "{",
        rbrace: "}",
        trade: "&trade;"
      },
      decoration: {
        anchor: "<a href=''>{$0}</a>",
        strong: "<strong>{$0}</strong>",
        bold: "<strong>{$0}</strong>",
        b: "<strong>{$0}</strong>",
        em: "<em>{$0}</em>",
        italic: "<i>{$0}</i>",
        i: "<i>{$0}</i>",
        link: "<a href='{$href}' class='{$class}' style='{$style}'>{$0}</a>",
        br: "<br>{$0}",
        strike: "<strike>{$0}</strike>",
        div: "<div id='{$id}' class='{$class}' style='{$style}'>{$0}</div>",
        span: "<span id='{$id}' class='{$class}' style='{$style}'>{$0}</span>",
        h1: "<h1>{$0}</h1>",
        h2: "<h2>{$0}</h2>",
        h3: "<h3>{$0}</h3>"
      }
    },
    text: {
      data: {
        ndash: "–",
        mdash: "-",
        iexcl: "¡",
        iquest: "¿",
        quot: "\"",
        ldquo: "“",
        rdquo: "”",
        lsquo: "‘",
        rsquo: "’",
        laquo: "«",
        raquo: "»",
        nbsp: " ",
        lsaquo: "‹",
        rsaquo: "›",
        br: "\n",
        lbrace: "{",
        rbrace: "}",
        trade: "™"
      },
      decoration: {
        strong: "{$0}",
        bold: "{$0}",
        b: "{$0}",
        em: "{$0}",
        italic: "{$0}",
        i: "{$0}",
        link: "{$0}{$1}",
        br: "\n{$0}",
        strike: "{$0}",
        div: "{$0}",
        span: "{$0}",
        h1: "{$0}",
        h2: "{$0}",
        h3: "{$0}"
      }
    }
  },

  localization: {
    default_day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    default_abbr_day_names: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    default_month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    default_abbr_month_names: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    custom_date_formats: {
      default: '%m/%d/%Y',            // 07/4/2008
      short_numeric: '%m/%d',               // 07/4
      short_numeric_year: '%m/%d/%y',            // 07/4/08
      long_numeric: '%m/%d/%Y',            // 07/4/2008
      verbose: '%A, %B %d, %Y',       // Friday, July  4, 2008
      monthname: '%B %d',               // July 4
      monthname_year: '%B %d, %Y',           // July 4, 2008
      monthname_abbr: '%b %d',               // Jul 4
      monthname_abbr_year: '%b %d, %Y',           // Jul 4, 2008
      date_time: '%m/%d/%Y at %H%M'     // 01/03/1010 at 530
    },
    token_mapping: {
      '%a': '{short_week_day_name}',
      '%A': '{week_day_name}',
      '%b': '{short_month_name}',
      '%B': '{month_name}',
      '%p': '{am_pm}',
      '%d': '{days}',
      '%e': '{day_of_month}',
      '%j': '{year_days}',
      '%m': '{months}',
      '%W': '{week_num}',
      '%w': '{week_days}',
      '%y': '{short_years}',
      '%Y': '{years}',
      '%l': '{trimed_hour}',
      '%H': '{full_hours}',
      '%I': '{short_hours}',
      '%M': '{minutes}',
      '%S': '{seconds}',
      '%s': '{since_epoch}'
    }
  },

  translator_options: {
    debug: false,
    debug_format_html: "<span style='font-size:20px;color:red;'>{<\/span> {$0} <span style='font-size:20px;color:red;'>}<\/span>",
    debug_format: "{{{{$0}}}}",
    split_sentences: true,
    decoration_token_format: "[]",
    ignore_elements: ['.notranslate'],
    translatable_elements: null,
    nodes: {
      ignored: [],
      scripts: ["iframe", "script", "noscript", "style", "audio", "video", "map", "object", "track", "embed", "ruby", "pre"],
      inline: ["a", "span", "i", "b", "img", "strong", "s", "em", "u", "sub", "sup", "var", "code"],
      short: ["i", "b"],
      splitters: ["br", "hr"]
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
        {
          enabled: true,
          name: 'phone',
          regex: /(\d{1}-)?\d{3}-\d{3}-\d{4}|\d?\(\d{3}\)\s*\d{3}-\d{4}|(\d.)?\d{3}.\d{3}.\d{4}/g
        },
        {
          enabled: true,
          name: 'email',
          regex: /[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|io|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?/g
        },
        {enabled: true, name: 'price', regex: /\$\d*(,\d*)*(\.\d*)?/g},
        {enabled: true, name: 'fraction', regex: /\d+\/\d+/g},
        {enabled: true, name: 'num', regex: /\b\d+(,\d*)*(\.\d*)?%?\b/g}
      ]
    }
  },

  xmessage: {
    decoration_tokens: ['anchor'],
    data_tokens: ['param', 'number'],
    choice_tokens: ['choice'],
    map_tokens: ['map'],
    context_rules: {
      number: {
        one: 'singular',
        few: 'few',
        many: 'many',
        other: 'plural'
      },
      gender: {
        male: 'male',
        female: 'female',
        neutral: 'neutral',
        other: 'other'
      },
      date: {
        future: 'future',
        present: 'present',
        past: 'past'
      }
    }
  },

  context_rules:
    {
      number: {
        variables: {}
      }
      ,
      gender: {
        variables: {
          "@gender":
            "gender"
        }
      }
      ,
      genders: {
        variables: {
          "@genders":

            function (list) {
              var genders = [];
              list.forEach(function (obj) {
                genders.push(obj.gender);
              });
              return genders;
            }
        }
      }
      ,
      date: {
        variables: {}
      }
      ,
      time: {
        variables: {}
      }
    }

}
;