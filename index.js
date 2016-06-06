var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
	{title: 'Article title', body: 'this is the first article body'},
	{title: 'Article title 2', body: 'this is the second article body'}
];

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}) );


app.get('/', function(req, res) {
	res.render('index.ejs');
})

app.get('/articles', function(req, res) {
	res.render('articles/index.ejs', {myArticles: articles});
	console.log(articles);
})

app.get('/articles/new', function(req, res) {
	res.render('articles/new.ejs', {myArticles: articles})
})

app.post('/articles', function(req, res) {
	articles.push(req.body);

	res.redirect('/articles');
})

app.get('/articles/:index', function(req, res) {
	var articleIndex = parseInt(req.params.index);
	res.render('articles/show.ejs', {myArticles: articles[articleIndex]});
})

app.get('/about', function(req, res) {
	res.render('about.ejs');
})

app.get('/contact', function(req, res) {
	res.render('contact.ejs');
})



app.listen(3000);