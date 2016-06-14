// dependencies
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
// express app
var app = express();
// json Data to be transformed to be searched through
var data = require('./data.json');

// applying the views engine, ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));

// linking public static files (css)
app.use(express.static('public'));

// selects route and uses render engine to render the appropriate site
app.get('/', function(req, res) {
  res.render('site/index.ejs');
});

app.get('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);  
  res.render('articles/index.ejs', { articles: articles });
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

app.post('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.redirect('/articles');
});

app.get('/articles/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  var articleToShow = articles[req.params.idx];
  res.render('articles/show.ejs', { article: articleToShow });
});

app.get('/about', function(req, res) {
  res.render('site/about.ejs');
});

app.get('/contact', function(req, res) {
  res.render('site/contact.ejs');
});

var searchArticles = function(data, term){
  var term = term.toUpperCase();
  if(term === '') {
    results = data;
    return results;
  } else {
  var results = data.filter(function(entry) {
    return entry.title.toUpperCase() === term;
  });
  }
  return (results);
};

app.get('/search', function(req, res) {
  var term = req.query.search;
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  var results = searchArticles(articles, term);
  res.render('articles/search.ejs',  { results: results });
});


app.listen(3000);