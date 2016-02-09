var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(__dirname + '/views'));

var articles = [
  {title: 'Article title 1', body: 'this is the first article body'},
  {title: 'Article title 2', body: 'this is the second article body'},
  {title: 'Article title 3', body: 'this is the third article body'},

];

app.get('/', function(req, res) {
	res.render('index.ejs');

});

//home page
app.get('/articles', function(req, res) {
	res.render('articles.ejs', {articles: articles});

});

app.post('/articles', function(req, res){
	// res.send(req.body);
	articles.push(req.body);
	res.redirect('/articles');
});

app.get('/articles/new', function(req, res) {
	res.render('partials/articlesNew.ejs');
});

app.get('/articles/:idx', function(req, res) {
	var articlesIdx = parseInt(req.params.idx);
	res.render('articlesShow.ejs', {article: articles[articlesIdx]});

});

app.get('/about', function(req, res) {
	res.render('../static/about.ejs');
});

app.get('/contact', function(req, res) {
	res.render('../static/contact.ejs')
})

app.listen(3000);