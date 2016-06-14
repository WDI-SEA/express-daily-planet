var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

// Creating search function

var data = require('./data.json');

// Creating link for public static file
app.use(express.static('public'));

function searchArticles(data, term) {
  var results;

  if (term === "") {
    results = data;
    return results;
  } else {
    term = term.toUpperCase();
    results = data.filter(function(entry) {
      return (entry.title.toUpperCase().indexOf(term) !== -1 || entry.body.toUpperCase().indexOf(term) !== -1);
    });
  }

  return results;
};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// Creating the homepage of our site
app.get('/', function(req, res) {
  res.render('site/index.ejs');
});

// Creating the Articles page, which lists all articles
app.get('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  res.render('articles/index.ejs', { articles: articles });
});

// Form that lets user create new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

// Creating new Articles
app.post('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  articles.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(articles));

  res.redirect('/articles');
});

// Find and display an article by it's id from the array of articles
app.get('/articles/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  var articleToShow = articles[req.params.idx];

  res.render('articles/show.ejs', { article: articleToShow });
});

// Creating Contact and About pages
app.get('/about', function(req, res) {
  res.render('site/about.ejs');
});

app.get('/contact', function(req, res) {
  res.render('site/contact.ejs');
});

app.get('/search', function(req, res) {
  var term = req.query.search;
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  var results = searchArticles(articles, term);
  res.render('articles/search.ejs', { results: results });
});

// Code above this line!
app.listen(3000);