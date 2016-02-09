var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

var articles = [
	{title: 'Article Title', body: 'This is where the body of the article goes.'},
	{title: 'Rabid Clows on the Loose', body: 'Police are urging the public to stay indoors tonight...'}
];
// home page
app.get("/", function(req,res) {
  res.render('index.ejs');
});
// list of all articles
app.get("/articles", function(req,res) {
  res.render('articles/index.ejs', {articles: articles});
});
// submit form for new stories
app.get("/articles/new", function(req,res) {
  res.render('articles/new.ejs');
});
app.post("/articles", function(req,res) {
  articles.push(req.body);
  res.redirect('/articles');
});
// individual pages by article index
app.get("/articles/:idx", function(req,res) {
  var articleIdx = parseInt(req.params.idx);
  res.render("articles/show.ejs", {article: articles[articleIdx]});
});
// about page
app.get("/about", function(req,res) {
  res.render('site/about.ejs');
});
// contact page
app.get("/contact", function(req,res) {
  res.render('site/contact.ejs');
});

app.listen(3000);