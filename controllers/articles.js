var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req,res){
	db.article.findAll().then(function(articles){
	res.render('articles/all', {results: articles});	
	});
});


module.exports = router;