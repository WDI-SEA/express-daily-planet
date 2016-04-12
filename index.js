var express = require('express');
var bodyParser = require('body-parser')
var app = express();

var articles = [
  {title: 'Article title', body: 'this is the first article body'}, 
  {title: 'Article title', body: 'this is the second article body'}, 
  {title: 'Article title', body: 'this is the third article body'}, 
  {title: 'Article title', body: 'this is the fourth article body'}, 
  {title: 'Article title', body: 'this is the fifth article body'}, 
  {title: 'Article title', body: 'this is the sixth article body'}
];


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/about'));
app.use(express.static(__dirname + '/contact'));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended: false}) );

app.get('/',function(req,res){
  res.render('index');
});

app.post('/articles', function(req, res) {
  articles.push(req.body);

  res.redirect('/articles');
});

app.get('/articles', function(req, res) {
  res.render('articles/index', {eachArticle: articles});
});

app.get('/articles/:index', function(req, res) {
  var articleIndex = parseInt(req.params.index);

  res.render('articles/show', {myArticle: articles[articleIndex]});
});

app.get('/site/about'), function(req, res) {
  res.render('/site/about');
});




app.listen(3000);