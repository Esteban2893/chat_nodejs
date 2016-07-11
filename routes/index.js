var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express Chat',
    welcome: 'Welcome to Express Chat build on Node.js + Express Framework',
  });
});

module.exports = router;
