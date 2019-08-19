var express = require('express');
var router = express.Router();
var db = require('../models');


router.get('/', function(req, res) {
	db.article.findAll().then(function(articles){
		res.render('articles/index.ejs', {results: articles});
	});
});

router.get('/new', function(req, res) {
	res.render('articles/new.ejs');
});

router.get('/:id', function(req, res) {
	db.article.findById(req.params.id).then(function(article){
		res.render('articles/show.ejs', {results: article});
	});
});

router.post('/', function(req, res){
	db.article.create(req.body).then(function(newArticle){
		res.redirect('/articles/'+ newArticle.id);
	}).catch(function(err){
		res.send('Well that did not go as planned', err);
	});
});

module.exports = router;

// db.article.create({
// 	title: 'Daily Mercury',
// 	body: 'A very merry unbirthday to you!'
// });

// db.article.create({
// 	title: 'Daily Venus',
// 	body: 'Who run the world?'
// });

// db.article.create({
// 	title: 'Daily Earth',
// 	body: 'Tick Tock'
// });

// db.article.create({
// 	title: 'Daily Mars',
// 	body: 'WHO RUN THE WORLD?'
// });

// db.article.create({
// 	title: 'Daily Jupiter',
// 	body: 'Did you make it to the Milky Way to see the lights all faded, and that heaven is overrated?'
// });

// db.article.create({
// 	title: 'Daily Saturn',
// 	body: 'The only rings I want buried with me are the ones around my eyes.'
// });

// db.article.create({
// 	title: 'Daily Neptune',
// 	body: 'Where is my trident?'
// });

// db.article.create({
// 	title: 'Daily Pluto',
// 	body: 'Here at the Daily Planet, we care about diversity and inclusion.'
// });