var Tr8n = require("../../lib/tr8n");
var assert = require("assert");

describe('Decoration', function(){
  describe('creation', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello World]");
      assert.deepEqual(['[tr8n]', '[bold:', ' Hello World', ']', '[/tr8n]'], tokenizer.fragments);
    });
  });

  describe('parsing', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new Tr8n.Tokenizers.Decoration("Hello World");
      assert.deepEqual(['[tr8n]', 'Hello World', '[/tr8n]'], tokenizer.fragments);
      assert.deepEqual(['tr8n', 'Hello World'], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello World]");
      assert.deepEqual(["[tr8n]", "[bold:", " Hello World", "]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold", "Hello World"]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello World");
      assert.deepEqual(["[tr8n]", "[bold:", " Hello World", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold", "Hello World"]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello [strong: World]]");
      assert.deepEqual(["[tr8n]", "[bold:", " Hello ", "[strong:", " World", "]", "]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold", "Hello ", ["strong", "World"]]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello [strong: World]");
      assert.deepEqual(["[tr8n]", "[bold:", " Hello ", "[strong:", " World", "]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold", "Hello ", ["strong", "World"]]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold1: Hello [strong22: World]]");
      assert.deepEqual(["[tr8n]", "[bold1:", " Hello ", "[strong22:", " World", "]", "]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold1", "Hello ", ["strong22", "World"]]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello, [strong: how] [weak: are] you?]");
      assert.deepEqual(["[tr8n]", "[bold:", " Hello, ", "[strong:", " how", "]", " ", "[weak:", " are", "]", " you?", "]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["bold", "Hello, ", ["strong", "how"], " ", ["weak", "are"], " you?"]], tokenizer.parse());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[link] you have [italic: [bold: {count}] messages] [light: in your mailbox] [/link]");
      assert.deepEqual(["[tr8n]", "[link]", " you have ", "[italic:", " ", "[bold:", " {count}", "]", " messages", "]", " ", "[light:", " in your mailbox", "]", " ", "[/link]", "[/tr8n]"], tokenizer.fragments);
      assert.deepEqual(["tr8n", ["link", " you have ", ["italic", "", ["bold", "{count}"], " messages"], " ", ["light", "in your mailbox"], " "]], tokenizer.parse());

    });
  });


  describe('substitution', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold: Hello World]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold]Hello World[/bold]");
      assert.deepEqual("<strong>Hello World</strong>", tokenizer.substitute());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[bold] Hello World [/bold]");
      assert.deepEqual("<strong> Hello World </strong>", tokenizer.substitute());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[p: Hello World]");
      assert.deepEqual("<p>Hello World</p>", tokenizer.substitute({p: '<p>{$0}</p>'}));

      var tokenizer = new Tr8n.Tokenizers.Decoration("[p: Hello World]");
      assert.deepEqual("<p>Hello World</p>", tokenizer.substitute({p: function(text) {
        return "<p>" + text + "</p>";
      }}));

      var tokenizer = new Tr8n.Tokenizers.Decoration("[link: you have 5 messages]");
      assert.deepEqual("<a href=\"http://mail.google.com\">you have 5 messages</a>", tokenizer.substitute({link: '<a href="http://mail.google.com">{$0}</a>'}));

      var tokenizer = new Tr8n.Tokenizers.Decoration("[link: you have 5 messages]");
      assert.deepEqual("<a href='http://www.google.com'>you have 5 messages</a>", tokenizer.substitute({link: {href: "http://www.google.com"}}));

      var tokenizer = new Tr8n.Tokenizers.Decoration("[link: you have {count || message}]");
      assert.deepEqual("<a href='http://www.google.com'>you have {count || message}</a>", tokenizer.substitute({link: {href: "http://www.google.com"}}));

      var tokenizer = new Tr8n.Tokenizers.Decoration("[custom: you have {count || message}]");
      assert.deepEqual("you have {count || message}", tokenizer.substitute());

      var tokenizer = new Tr8n.Tokenizers.Decoration("[custom: you have {count || message}]");
      assert.deepEqual("you have {count || message}", tokenizer.substitute({custom:1}));

    });
  });


});
