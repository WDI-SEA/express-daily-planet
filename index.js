// ========
// REQUIRES
// ========
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


// // Reading JSON files
// var fileContents = fs.readFileSync('./data.json');
// var data = JSON.parse(fileContents);

// // Writing JS objects to JSON files
//fs.writeFileSync('./data.json', JSON.stringify(data));

// ========
// SET / USE STATEMENTS
// ========
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

// ========
// ROUTES
// ========


app.get('/', function(req, res) {
  res.render('./site/index');
});

app.get('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render('articles/index', {articles: data});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  data.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles');
});

app.get('/articles/:index', function(req, res){
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  var articleIndex = parseInt(req.params.index);
  res.render('articles/show', {articles: data[articleIndex]});
});

// ========
// LISTEN
// ========

app.listen(3000);



