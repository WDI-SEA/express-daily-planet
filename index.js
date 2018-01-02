var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var fs = require('fs');
var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

var articles = fs.readFileSync('./data.json');
articles = JSON.parse(articles);

app.get('/', function(req, res) {
  res.render('site/index.ejs');
});

app.get('/contact', function(req, res) {
  res.render('site/contact.ejs');
});

app.get('/about', function(req, res) {
  res.render('site/about.ejs');
});

app.get('/articles', function(req, res) {
  res.render('articles/index.ejs', {articles: articles});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs')
});

app.post('/articles', function(req, res) {
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.redirect('/articles');
});

app.get('/articles/:idx', function(req, res) {
  var articleIndex = parseInt(req.params.idx);
  res.render('articles/show', {articles: articles[articleIndex]});
});

app.listen(3000);