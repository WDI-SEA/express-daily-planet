var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('view-engine', 'bodyParser');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);

  res.render('articles/index.ejs', { data: data } );
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

app.post('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  allArticles = JSON.parse(fileContents);
  
  allArticles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(allArticles));

  res.redirect('/articles');
});

app.get('/articles/:id', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  // console.log("HERE: ", articles);

  var articleToShow = articles[req.params.id]
  // console.log(articleToShow);
  res.render('articles/show.ejs', { article: articleToShow });
});



app.get('/about', function(req, res) {
  res.render('site/about.ejs');
})

app.get('/contact', function(req, res) {
  res.render('site/contact.ejs');
})

app.listen(3000);