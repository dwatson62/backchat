var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pusherKey: process.env.key });
});

module.exports = router;
