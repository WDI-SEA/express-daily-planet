var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/site/about', function(req, res){

});

app.get('/site/contact', function(req, res){
  
});

app.get('/site/index', function(req, res){
  
});

app.get('/articles', function(req, res){
  var data = fs.readFileSync('./data.json');
  data = JSON.parse(data);

  res.render('articles/index', { data: data });
});

app.get('/articles/new', function(req, res){
  res.render('articles/new');
});

app.post('/articles', function(req, res){
  var data = fs.readFileSync('./data.json');
  data = JSON.parse(data);

  data.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(data))

  res.redirect('/articles/index');
});

app.get('/articles/:id', function(req, res){
  var data = fs.readFileSync('./data.json');
  data = JSON.parse(data);

  res.render('/articles/show');
});

app.listen(3000);