var express = require('express');
var router = express.Router();
var db = require('../models');

router.get('/', function(req, res) {
	db.article.findAll().then(function(articles){
		res.render('articles/viewall', {results: articles});
	});
});

router.get('/:id', function(req, res) {
	db.article.findById(req.params.id).then(function(article){
		res.render('articles/single', {result: article});
	});	
});

// db.article.create({
// 	title: 'Daily Mercury',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Venus',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Earth',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Mars',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Jupiter',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Saturn',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Uranus',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Daily Neptune',
// 	body: 'pemdas',
// });

// db.article.create({
// 	title: 'Ummmm.....',
// 	body: 'Pluto, we\'ve gone over this...',
// });

module.exports = router;