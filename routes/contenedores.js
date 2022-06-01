var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contenedores', { title: 'Express' });
});

module.exports = router;