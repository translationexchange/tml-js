var ApiClient = require("../lib/api_client.js");
var Application = require("../lib/application.js");

var helper = require("./test_helper");
var assert = require("assert");

describe('ApiClient', function() {
  describe('access_token', function () {
    var application = new Application({
      key: "default",
      host: "http://localhost:3000"
    });


    application.getApiClient().get("applications/current", {definition: true}, function(error, data) {
      console.log("xxxxx", error);
    });

    application.getApiClient().get("languages/ru", {definition: true}, function(error, data) {
      console.log(data);
    });

  });
});