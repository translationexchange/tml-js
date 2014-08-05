var ApiClient = require("../lib/api_client.js");
var Application = require("../lib/application.js");

var helper = require("./test_helper");
var assert = require("assert");

describe('ApiClient', function() {
  describe('access_token', function () {
    var application = new Application({
      key: "default",
      secret: "91ec952694f17cf3d",
      host: "http://localhost:3001"
    });


    application.getApiClient().get("application", {definition: true}, function(error, data) {
      console.log("xxxxx",error);
    });

    application.getApiClient().get("language", {locale: "ru", definition: true}, function(error, data) {
      console.log(data);
    });

  });
});