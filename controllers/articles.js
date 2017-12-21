var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res){
	db.article.findAll().then(function(articles){
		res.render('articles', {articles: articles});	
	});
});


router.post('/', function(req, res){
	db.article.create(req.body).then(function(createdArticle){
		res.redirect('/articles/' + createdArticle.id); 
	}).catch(function(err){
		res.send('uh oh', err); 
	});
});

router.get('/new', function(req, res){
	// res.send('form goes here') To test the route first before view created
	res.render('articles/new');
});

router.get('/:id', function(req, res){
	db.article.findById(req.params.id).then(function(article){
		res.render('articles/show', { article: article });
	});
});

module.exports = router;