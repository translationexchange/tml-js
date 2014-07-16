var Tr8n = require("../../lib/tr8n");
var assert = require("assert");
var helper = require("./../test_helper");

describe('Tr8n.Tokens.Method', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      var token = new Tr8n.Tokens.Method("{user.name}");
      assert.deepEqual("Michael", token.getTokenValue({user: {name: "Michael"}}));
    });
  });
});