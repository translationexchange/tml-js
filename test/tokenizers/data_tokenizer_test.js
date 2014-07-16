var Tr8n = require("../../lib/tr8n");
var assert = require("assert");

describe('Tokenizers.Data', function(){
  describe('creation', function(){
    it('should correctly split label into elements', function(){
      var tokenizer = new Tr8n.Tokenizers.Data("Hello {user}");
      assert.equal(1, tokenizer.tokens.length);
      assert.equal("{user}", tokenizer.tokens[0].full_name);
      assert.equal("user", tokenizer.tokens[0].short_name);
      assert.ok(tokenizer.isTokenAllowed("user", {allowed_tokens: ["user"]}));

      var tokenizer = new Tr8n.Tokenizers.Data("Hello {user}");
      assert.ok(tokenizer.isTokenAllowed("user", {allowed_tokens: ["user"]}));
      assert.ok(!tokenizer.isTokenAllowed("users", {allowed_tokens: ["user"]}));

      var tokenizer = new Tr8n.Tokenizers.Data("You have {count || message}", {}, {allowed_tokens: ["user"]});
      assert.equal(1, tokenizer.tokens.length);

    });
  });
});