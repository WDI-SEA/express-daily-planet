var express = require('express');
var router = express.Router();
var db = require('../models');

db.article.create({
	title: 'Test title',
	body: 'body body body bod'
});

router.get('/', function(req, res){
	db.article.findAll().then(function(articles){
		res.render('articles/index', {results: articles});
	});
});

router.get('/new', function(req, res){
	res.render('articles/new');
});

router.post('/', function(req, res){
	res.render('articles/index');
});

router.get('/:id', function(req, res){
	db.article.findById(req.params.id).then(function(article){
		res.render('articles/show', {result: article});
	});
});

module.exports = router;
