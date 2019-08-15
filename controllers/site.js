var express = require('express');
var router = express.Router();

router.get('/about', function(req, res){
	res.render('site/about');
});

router.get('/contact', function(req, res){
	res.render('site/contact');
});

module.exports = router;