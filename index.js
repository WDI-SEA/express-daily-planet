var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/articles', function(req,res){
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  res.render('articles/index.ejs', { articles: articles})
});

app.get('/articles/new', function(req,res) {
  res.render('articles/new.ejs');
});

app.post('/articles', function(req,res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  articles.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(articles));

  res.redirect('/articles');
});

app.get('/articles/:idx', function(req,res) {
  var article = fs.readFileSync('./data.json');
  article = JSON.parse(article);

  var articleToShow = article[req.params.idx];

  res.render('articles/show.ejs', { article: articleToShow });
});

app.get('/about', function(req,res) {
  res.render('site/about.ejs')
})

app.get('/contact', function(req,res) {
  res.render('site/contact.ejs')
})

app.listen(3000);