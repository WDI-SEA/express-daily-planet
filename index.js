var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

//gets site/index
app.get('/', function(req, res) {
  res.render('site/index');
});

//gets site/about
app.get('/about', function(req, res) {
  res.render('site/about');
});

//gets site/contact info
app.get('/contact', function(req, res) {
  res.render('site/contact');
});

//gets the /articles
app.get("/articles", function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render('articles/index', {articles: fileContents});
});

//gets the /articles/new page where you can build a new article
app.get('/articles/new', function(req, res) {
  res.render("articles/new");
});

//gets a specific article from url params
app.get("/articles/:idx", function(req, res) {
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  // get the array index from the url params
  var articleIndex = parseInt(req.params.idx);
  res.render('articles/show', {article: articles[articleIndex]});
});

//posts to articles from the new page
app.post("/articles", function(req, res){
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.send(req.body);
});

app.listen(3000);