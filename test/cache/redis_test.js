var redis_mock = require('redis-mock');
var proxyquire =  require('proxyquire')

var assert = require("assert");

var RedisAdapter = proxyquire('../../lib/cache_adapters/redis', { 'redis': redis_mock });


describe('Redis', function(){
  describe('creation', function(){
    
    var adapter = new RedisAdapter({
      host: "localhost",
      port: 6379,
      version: 1,
      timeout: 3600
    });

    it('should create a client', function() {
      assert.ok(adapter.cache)
    });

    describe('fetch/store', function(){
      it('should correctly fetch/store a value', function(){



        adapter.store("test_key", "test_value")
        adapter.fetch("test_key", "default", function(err,val){
          assert.equal(val,"test_value") 
        })
      })
    })

    describe('remove', function(){
      it('should correctly remove a value', function(){

      })
    })
  });
});