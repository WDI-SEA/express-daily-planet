var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));  

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/about', function(req, res) {
  res.render('sites/about');
});

app.get('/contact', function(req, res) {
  res.render('sites/contact');
});

app.get('/article', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  res.render('article/index', { articles: articles }); 
});

app.get('/article/new', function(req, res) {
  res.render('article/new.ejs');
});

app.post('/article', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.redirect('/article');
});

app.get('/article/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  var articlesToShow = articles[req.params.idx];
  res.render('article/show.ejs', { article: articlesToShow });
})

app.listen(3000);


