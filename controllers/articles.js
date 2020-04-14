//node modules/variables for routers
let router = require('express').Router()
let db = require('../models')

//routes

router.get('/', (req, res) => {
	db.articles.findAll()
	.then(articles => {
		res.render('articles/index', {articles})
	})
})

router.post('/', (req, res) => {
	db.articles.create(req.body)
	.then(newArticle => {
		res.redirect('/articles')
	})
	.catch(err => {
		console.log('Error')
		res.send('Error')
	})
})

router.get('/new', (req, res) => {
	res.render('articles/new.ejs')
})


router.get('/:id', (req, res) => {
	db.articles.findById(req.body.id)
	.then(articles => {
		res.render('articles/new', {articles})
	})
})

//export
module.exports = router