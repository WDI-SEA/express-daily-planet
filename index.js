// **require**
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var fileContents = fs.readFileSync('./data.json');
var data = JSON.parse(fileContents);

// **set/use statements**
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// **routes**
app.get('/', function(req, res){
  // res.send('hello world');
  res.render('site/index');
});

app.get('/articles', function(req, res){
  res.render('articles/index', {myArticles: data});
});

app.get('/articles/new', function(req, res){
  res.render('articles/new')
});


app.get('/articles/:index', function(req, res){
  var articleIndex = parseInt(req.params.index);
  res.render('articles/show', {myArticle: data[articleIndex]});
});


app.post('/articles', function(req, res){
  data.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles');
});

// **listen**
app.listen(3000);