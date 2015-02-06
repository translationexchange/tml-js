var Base = require("../../lib/cache_adapters/base.js");

var helper = require("../test_helper");
var assert = require("assert");

describe('Browser Cache', function() {
  describe('init', function () {
    var cache = new Base();
    cache.initialize({
      namespace: 'abc'
    });

    assert.equal(cache.getVersionedKey("application"), "tml_abc_v0_application");
  });
});