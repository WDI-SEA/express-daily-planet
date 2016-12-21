// requires
var express = require("express");
var fs = require('fs');
var bodyParser = require("body-parser");
var port = 3000;
var ejsLayouts = require("express-ejs-layouts");

// app variables
var app = express();

var getData = function(){
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  return data;
};
var saveData = function(data){
  fs.writeFileSync('./data.json', JSON.stringify(data));
};
// set/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

// Serve the homepage of your site.
app.get('/', function(req, res) {
  res.render("index", {data: getData()});
});

//displays a list of all articles
app.get('/articles', function(req, res) {
  var keyword = req.query.q;
  var data = getData();
  var id = 0;
  data.forEach(function(article) {
    article.id = id;
    id++;
  });

  if (keyword) {
    data = data.filter(function(article) {
      return article.title.includes(keyword) ||
        article.body.includes(keyword);
    });
  }

  res.render("articles/index", {data: data});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var data = getData();
  data.push(req.body);
  saveData(data);

  var path = '/articles';
  res.redirect(path);
});

app.get('/article/:id', function(req, res) {
  var data = getData()[req.params.id];
  res.render('articles/show', {data: data});
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

//displays a form that users use to create a new article

app.listen(port);
