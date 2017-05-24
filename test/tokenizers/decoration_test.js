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

var DecorationTokenizer = require("../../lib/tokenizers/decoration.js");
var assert = require("assert");

describe('Decoration', function(){
  describe('creation', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new DecorationTokenizer("[bold: Hello World]");
      assert.deepEqual(['[tml]', '[bold:', ' Hello World', ']', '[/tml]'], tokenizer.fragments);
    });
  });

  describe('parsing', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new DecorationTokenizer("Hello World");
      assert.deepEqual(['[tml]', 'Hello World', '[/tml]'], tokenizer.fragments);
      assert.deepEqual(['tml', 'Hello World'], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold: Hello World]");
      assert.deepEqual(["[tml]", "[bold:", " Hello World", "]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello World"]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold: Hello World");
      assert.deepEqual(["[tml]", "[bold:", " Hello World", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello World"]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold: Hello [strong: World]]");
      assert.deepEqual(["[tml]", "[bold:", " Hello ", "[strong:", " World", "]", "]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello ", ["strong", "World"]]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold: Hello [strong: World]");
      assert.deepEqual(["[tml]", "[bold:", " Hello ", "[strong:", " World", "]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello ", ["strong", "World"]]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold1: Hello [strong22: World]]");
      assert.deepEqual(["[tml]", "[bold1:", " Hello ", "[strong22:", " World", "]", "]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold1", "Hello ", ["strong22", "World"]]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[bold: Hello, [strong: how] [weak: are] you?]");
      assert.deepEqual(["[tml]", "[bold:", " Hello, ", "[strong:", " how", "]", " ", "[weak:", " are", "]", " you?", "]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello, ", ["strong", "how"], " ", ["weak", "are"], " you?"]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("<bold>Hello, <strong>how</strong> <weak>are</weak> you?</bold>");
      assert.deepEqual(["[tml]","<bold>","Hello, ","<strong>","how","</strong>"," ","<weak>","are","</weak>"," you?","</bold>", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello, ", ["strong", "how"], " ", ["weak", "are"], " you?"]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("<bold>Hello, [strong: how] <weak>are</weak> you?</bold>");
      assert.deepEqual(["[tml]","<bold>","Hello, ","[strong:"," how","]"," ","<weak>","are","</weak>"," you?","</bold>","[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["bold", "Hello, ", ["strong", "how"], " ", ["weak", "are"], " you?"]], tokenizer.parse());

      var tokenizer = new DecorationTokenizer("[link] you have [italic: [bold: {count}] messages] [light: in your mailbox] [/link]");
      assert.deepEqual(["[tml]", "[link]", " you have ", "[italic:", " ", "[bold:", " {count}", "]", " messages", "]", " ", "[light:", " in your mailbox", "]", " ", "[/link]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["link", " you have ", ["italic", "", ["bold", "{count}"], " messages"], " ", ["light", "in your mailbox"], " "]], tokenizer.parse());

    });
  });


  describe('substitution', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new DecorationTokenizer("[bold: Hello World]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("<bold>Hello World</bold>");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("<strong>Hello World</strong>");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("<super>Hello World</super>");
      assert.deepEqual("<super>Hello World</super>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("<link>Test</link>");
      assert.deepEqual("<a href=''>Test</a>", tokenizer.substitute({link: "<a href=''>{$0}</a>"}));

      var tokenizer = new DecorationTokenizer("<img src='images/1-stars.png' title='1 out of 5 stars'/> 2 Reviews");
      assert.deepEqual("<img src='images/1-stars.png' title='1 out of 5 stars'/> 2 Reviews", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("<test>Hello</test>");
      assert.deepEqual("<test>Hello</test>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[bold1: Hello World]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[my_bold11234: Hello World]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[bold]Hello World[/bold]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[bold] Hello World [/bold]");
      assert.deepEqual("<strong> Hello World </strong>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[p: Hello World]");
      assert.deepEqual("<p>Hello World</p>", tokenizer.substitute({p: '<p>{$0}</p>'}));

      var tokenizer = new DecorationTokenizer("[p: Hello World]");
      assert.deepEqual("<p>Hello World</p>", tokenizer.substitute({p: function(text) {
        return "<p>" + text + "</p>";
      }}));

      var tokenizer = new DecorationTokenizer("[link: you have 5 messages]");
      assert.deepEqual("<a href=\"http://mail.google.com\">you have 5 messages</a>", tokenizer.substitute({link: '<a href="http://mail.google.com">{$0}</a>'}));

      var tokenizer = new DecorationTokenizer("[link: you have 5 messages]");
      assert.deepEqual("<a href='http://www.google.com'>you have 5 messages</a>", tokenizer.substitute({link: {href: "http://www.google.com"}}));

      var tokenizer = new DecorationTokenizer("[link: you have {count || message}]");
      assert.deepEqual("<a href='http://www.google.com'>you have {count || message}</a>", tokenizer.substitute({link: {href: "http://www.google.com"}}));

      var tokenizer = new DecorationTokenizer("[custom: you have {count || message}]");
      assert.deepEqual("<custom>you have {count || message}</custom>", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[custom: you have {count || message}]");
      assert.deepEqual("you have {count || message}", tokenizer.substitute({custom:1}));

    });
  });


});
