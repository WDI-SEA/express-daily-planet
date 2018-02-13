var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

//get for home
app.get('/', function(req, res) {
	res.render('index.ejs');
});

//get for /articles
app.get('/articles', function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	fileContents = JSON.parse(fileContents);
	res.render('articles/index', {articles: fileContents});
});


//get for /site/about STATIC
app.get('/site/about', function(req, res) {
	res.render('site/about');
});

//get for /site/contact STATIC
app.get('/site/contact', function(req, res) {
	res.render('site/contact');
});

//get for articles/new
app.get('/articles/new', function(req, res) {
	res.render('articles/new');
});

//displays new article info
app.post('/articles/new', function(req, res) {
	res.send(req.body);
});

//get for /articles/id
app.get('/articles/:idx', function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	fileContents = JSON.parse(fileContents);
	var articleIdx = parseInt(req.params.idx);
	res.render('articles/show', { thisArticle: fileContents[articleIdx]})
});


app.listen(3000);