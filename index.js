var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  console.log("Does nodemon work?");
  res.render("index");
});

app.get('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render('articles/index', {articles: fileContents});
});

app.get('/articles/new', function(req, res) {
  console.log("In the POST /new route...");
  res.render('articles/new');
});

app.post('/articles/new', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  fileContents.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(fileContents));
  res.redirect('/articles');
});

app.get('/articles/:id', function(req, res) {
  console.log("in the GET /articles/id route...");
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  var articleIndex = parseInt(req.params.id);
  res.render('articles/show', {article: fileContents[articleIndex]});
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.listen(3000);
