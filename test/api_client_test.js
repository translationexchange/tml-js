var Tr8n = require("../lib/tr8n");
var helper = require("./test_helper");
var assert = require("assert");

describe('Tr8n.ApiClient', function() {
  describe('access_token', function () {
    var application = new Tr8n.Application({
      key: "default",
      secret: "91ec952694f17cf3d",
      host: "http://localhost:3001"
    });

//    application.getApiClient().get("application", {definition: true}, function(error, data) {
//      console.log(data);
//    });

//    application.getApiClient().get("language", {locale: "ru", definition: true}, function(error, data) {
//      console.log(data);
//    });

  });
});