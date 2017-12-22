var express = require ('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.dailyplanet.findAll().then(function(articles){
		res.render('articles/index.ejs', {results: articles});
	});
});

router.get('/:id', function(req, res){
	db.dailyplanet.findById(req.params.id).then(function(article){
		res.render('articles/show.ejs', {result: articles});
	})
})

module.exports = router;