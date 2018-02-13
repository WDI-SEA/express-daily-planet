var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  console.log('Does nodemon work?');
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render('site/index', {articles: data});
});

app.get('/articles', function(req, res) {
  console.log('You are in /articles');
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render('articles/index', {articles: data});
});

app.get('/articles/new', function(req, res) {
  console.log('You are in /articles/new');
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  data.unshift(req.body);
  //fileContents.push(req.body);
  console.log(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles');
});

app.get('/articles/:id', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  var dataIndex = parseInt(req.params.id);
  res.render('articles/show', {articles: data[dataIndex]});
});

app.get('/about', function(req, res) {
  console.log('You are in the /about');
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  console.log('You are in the /contact');
  res.render('site/contact');
});

app.listen(8000, function() {
  console.log('Server is now listening on port 8000....')
});
