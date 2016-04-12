var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));

var articles = [
  {title: 'Article title', body: 'this is the first article body'},
  {title: 'Article title', body: 'this is the first article body'}
];

//static
app.get('/', function(req, res) {
	res.render('index', {articles: articles});
});

app.get('/site/about', function(req, res) {
	res.render('site/about');
});

app.get('/site/contact', function(req, res) {
	res.render('site/contact');
});
//end static

app.get('/articles', function(req, res) {
	res.render('articles/index', {articles: articles});
});

app.get('/articles/new', function(req, res) {
	res.render('articles/new');
});

app.post('/articles', function(req, res) {
	console.log(req.body);
	articles.push(req.body);
	res.redirect('/articles');
});

app.get('/articles/:index', function(req, res) {
	var index = parseInt(req.params.index);
	res.render('articles/show', {article: articles[index]});
});

app.listen(3000, function() {
	console.log('listening to port 3000');
});