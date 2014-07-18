var MethodToken = require("../../lib/tokens/method.js");

var assert = require("assert");


describe('Tokens.Method', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      var token = new MethodToken("{user.name}");
      assert.deepEqual("Michael", token.getTokenValue({user: {name: "Michael"}}));
    });
  });
});