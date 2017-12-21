var express = require('express');
var router = express.Router();

//About
router.get('/about', function(req,res){
	res.render('static/about');
});

//About
router.get('/contact', function(req,res){
	res.render('static/contact');
});


module.exports = router;