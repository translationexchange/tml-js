var redis = require("redis");

describe('Redis', function(){
  describe('creation', function(){
    it('should correctly create a token', function() {
      var client = redis.createClient("6379", "127.0.0.1", {
      });
      client.set("name", "Michael", redis.print);
      client.get("name1", function (err, reply) {
        console.log(reply);
      });
    });
  });
});