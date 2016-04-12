///////////
// Dependencies
///////////
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
  {title: 'Daily Planet Opens in Tacoma', body: 'The world\'s formost news service opens offices in the South Sound\'s hippest city.'},
];

//////////
// Middleware
//////////
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


//////////
// Routs (URLs)
//////////
app.get('/', function(req, res) {
  res.render('index.ejs', {articles: articles});
});

app.get('/articles', function(req, res) {
  res.render('articles/index.ejs', {articles: articles});
});

// page that lets you submit a new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

// Process req.body and display some acknowledgement or new page
app.post('/articles/new', function(req, res) {
  console.log(req.body);
  articles.push(req.body);
  res.redirect('/articles');
});

// View a single article by id
app.get('/articles/:i', function(req, res) {
  res.render('articles/single-article.ejs', {articles: articles, i: parseInt(req.params.i)});
});

app.get('/site/about', function(req, res) {
  res.render('site/about.ejs');
});

app.get('/site/contact', function(req, res) {
  res.render('site/contact.ejs');
});




//////////
// Start Server
//////////
app.listen(3000)