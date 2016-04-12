var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended: false}) );

var articles = [
  {title: 'Article title', body: 'this is the first article body'},
  {title: 'Second Article', body: 'this is the second article body'}
];

app.get("/",function(req,res){
  res.render('index');
});

app.get("/about",function(req,res){
  res.render('about');
});

app.get("/contact",function(req,res){
  res.render('contact');
});

app.get('/articles', function(req, res) {
  res.render('articles/index', {myArticles: articles});
});

app.get("/articles/new",function(req,res){
  res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
  var articleIndex = parseInt(req.params.index);

  res.render('articles/show', {myArticle: articles[articleIndex]});
});

app.post('/articles/new', function(req, res) {
  articles.push({title: req.body['title'], body: req.body['body']});

  res.redirect('/articles');
});

app.listen(3000);