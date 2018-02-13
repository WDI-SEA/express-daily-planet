var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));


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

app.get('/articles/:idx', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  var dataIndex = parseInt(req.params.idx);
  res.render('articles/show', {articles: data[dataIndex]});
});

app.get('/articles/:idx/edit', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  var dataIndex = parseInt(req.params.idx);
  res.render('articles/edit', {article: data[dataIndex], id: dataIndex});
});

app.get('/about', function(req, res) {
  console.log('You are in the /about');
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  console.log('You are in the /contact');
  res.render('site/contact');
});

app.delete('/articles/:idx/destroy', function(req, res) {
  console.log('removing article route');
  //read from the file
  var fileContents = fs.readFileSync('./data.json');
  //parse the contents
  var data = JSON.parse(fileContents);
  var dataIndex = parseInt(req.params.idx);
  //splice the selected element out of the file contents
  data.splice(dataIndex, 1);
  // re-stringify the array and write it back to the file
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles')
});

app.put('/articles/:idx', function(req, res) {
  console.log('put /articles/idx');
  var articleToEdit = req.params.idx;
  // read the files
  var fileContents = fs.readFileSync('./data.json');
  //parse the contents
  var data = JSON.parse(fileContents);
  // find the item at the selected index and update it
  // var dataIndex = parseInt(req.params.idx);
  data.splice(articleToEdit, 1, req.body);
  //re-stringify the object and write to the file
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.send('Yeah dawg!');
});

app.listen(8000, function() {
  console.log('Server is now listening on port 8000....')
});
