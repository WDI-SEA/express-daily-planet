var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var url = require('url');
//middle wear
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}) );

var articles = [
	{title : 'bob', body: 'this is the body of bob, he is very bodily'},
	{title : 'hello bob', body: 'hello body of bob, I am saying hello to you this fine marrow'},
	{title : 'bye bob', body: 'goodbye body of bob, I am leaving you now bob'},
	{title : 'left', body: 'I am left handed... not left handed people are fools'}	
];


app.get("/",function(req,res){
  	res.render('index', {articles: articles});
});

app.get("/articles",function(req,res){
 	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	var results = [];
	var searchTerm = query.q;

	if (searchTerm) {	
		res.render("articles/index", {articles: results});
	} else {
		articles.forEach(function(article){
			
			var isTitleMatch = article.title.indexOf("searchTerm") != -1;
			var isBodyMatch = article.body.indexOf("searchTerm") != -1;
			if(isTitleMatch || isBodyMatch) {
				results.push(article);
			}
		});
		res.render("articles/index", {articles: results});
	} 
});

app.get('/articles/new', function(req, res) {
	res.render('articles/new');
});

app.post('/articles', function(req, res) {
	articles.push(req.body);
	res.redirect('/articles');
});

app.get('/site/about', function(req, res) {
	res.render('site/about');
});

app.get('/site/contact', function(req, res) {
	res.render('site/contact');
});

app.get('/articles/:index', function(req, res) {
	var index = parseInt(req.params.index);
	
	res.render('articles/show', {article: articles[index]});
});




app.listen(3000, function() {
	console.log('Listening for 3000');
});