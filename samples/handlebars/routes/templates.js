var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/*.hjs', function(req, res) {
  var parts = req.url.split("/");
  var file = parts[parts.length-1];
  fs.readFile(__dirname + "/../templates/" + file, "utf-8", function(err, data) {
    res.end(data);
  });
});

module.exports = router;
