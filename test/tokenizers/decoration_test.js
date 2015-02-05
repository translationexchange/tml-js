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

      var tokenizer = new DecorationTokenizer("[link] you have [italic: [bold: {count}] messages] [light: in your mailbox] [/link]");
      assert.deepEqual(["[tml]", "[link]", " you have ", "[italic:", " ", "[bold:", " {count}", "]", " messages", "]", " ", "[light:", " in your mailbox", "]", " ", "[/link]", "[/tml]"], tokenizer.fragments);
      assert.deepEqual(["tml", ["link", " you have ", ["italic", "", ["bold", "{count}"], " messages"], " ", ["light", "in your mailbox"], " "]], tokenizer.parse());

    });
  });


  describe('substitution', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new DecorationTokenizer("[bold: Hello World]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

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
      assert.deepEqual("you have {count || message}", tokenizer.substitute());

      var tokenizer = new DecorationTokenizer("[custom: you have {count || message}]");
      assert.deepEqual("you have {count || message}", tokenizer.substitute({custom:1}));

    });
  });


});
