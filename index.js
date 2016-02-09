var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//array of articles
var articles = [
  {title: 'Cat eats loaf of bread', body: 'Its incredible'},
  {title: 'Man survives volcano', body: 'Invented sweet clothes'},
  {title: 'Bird saves baby from fire', body: 'Drops into arms of a policeman' }
];


// set view engine to index.ejs
app.set('view engine', 'ejs');

//use body parser
app.use(bodyParser.urlencoded({extended: false}));

//serves the homepage of the site 
app.get("/", function(req,res) {
  res.render('index.ejs');
});

//displays a list of all articles
app.get("/articles", function(req,res) {
	res.render('articles/index.ejs', {articles: articles});
});

//displays a form that users use to create a new article
app.get("/articles/new", function(req,res) {
	res.render('articles/new.ejs');
});

//creates a new article (adds to article array)
app.post('/articles', function (req,res) {
	articles.push(req.body);
	console.log(articles);
	res.redirect('/articles');

})

//find, by id, an article in the array, and displays the article.
app.get('/articles/:id', function(req,res) {
	res.render('articles/show.ejs');
});

//serves about page
app.get('/about', function(req,res) {
	res.render('site/about.ejs');
});

//serves contact page
app.get('/contact', function(req,res) {
	res.render('site/contact.ejs')
});

// listen
app.listen(3000, function() {
	console.log("the app is running!");
});