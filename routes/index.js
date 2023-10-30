var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Incapsula Iframe ', 
    hello : "Anh Hoang"
  });
});

module.exports = router;
