var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.Translation', function(){
  describe('creation', function(){
    it('should correctly create a key', function() {
      helper.fixtures.load("languages/en-US", function(data) {
        var language = new Tr8n.Language(data);



      });
    });
  });
});
