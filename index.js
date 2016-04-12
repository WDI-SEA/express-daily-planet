var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //initializes web server



app.set('view engine', 'ejs'); // EJS= embedded javascript
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}) );

var articles = [
  {title: 'Article Title', body: 'the first article'},
  {title: 'Article 2', body: 'the second article'},
];


//home page
app.get("/",function(req,res) {
  res.render('index.ejs');
});
//articles page
app.get("/articles", function(req, res) {
  res.render('articles/index', {myArticles: articles})
});
//submit article page
app.get("/articles/new", function(req, res) {
  res.render('articles/new');
});
app.post('/articles', function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});
//article index page
app.get("/articles/:index", function(req, res) {
   var articleIndex= parseInt(req.params.index);
   res.render('articles/show', {myArticle: articles[articleIndex]});
});
//about page
app.get("/about", function(req, res) {
  res.render('site/about');
});
// contact page
app.get("/contact", function(req, res) {
  res.render('site/contact');
});

app.listen(3000); 



