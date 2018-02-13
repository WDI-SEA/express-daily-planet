var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('site/index');
});

app.get('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render('articles/index', {articles: fileContents});
});

app.get('/articles/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  //get array index from URL params
  var articleIndex = parseInt(req.params.idx);
  res.render('articles/show', {myArticle: articles[articleIndex]});
});

app.get('/new', function(req, res) {
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  fileContents.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(fileContents));
  res.redirect('/articles');
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.listen(3000);
