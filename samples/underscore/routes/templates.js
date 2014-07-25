var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/index.jst', function(req, res) {
  fs.readFile(__dirname + "/../templates/index.jst", "utf-8", function(err, data) {
    res.end(data);
  });
});


module.exports = router;
