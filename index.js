var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

// GET about and contact files
app.use(express.static(__dirname + '/views/site'));

var articles = [
	// {title: 'Article title', body: 'this is the first article body'}
	{title: 'Christopher Reeve on Superman', subtitle: 'Why he thinks Superman is a hero...', body: '"What makes Superman a hero is not that he has power, but that he has the wisdom and the maturity to use the power wisely. From an acting point of view, that\'s how I approached the part."'},
	{title: 'Superman Returns!', subtitle: '...but not with Brandon Routh.', body: "Thank God."},
	{title: 'Take a tip from Superman, kids.', subtitle: 'Life lessons...', body: 'Superman says: "You\'re much stronger than you think you are. Trust me."'},
]

// GET homepage
app.get("/", function(req, res) {
	res.render('index.ejs');
});

// GET articles
app.get("/articles", function(req, res) {
	res.render('articles/articles.ejs', {articles: articles});
});

// GET articles/new
app.get("/articles/new", function(req, res) {
	res.render('articles/articlesNEW.ejs');
});

// POST articles
app.post('/articles', function(req, res) {
	articles.push(req.body);
	res.redirect('/articles');
});

// GET articles by id
app.get('/articles/:id', function(req, res) {
	var articleId= parseInt(req.params.id);

	res.render('articles/articlesShow.ejs', {articles: articles[articleId]});
});



app.listen(3000, function() {
	console.log("Daily Planet is working!");
});