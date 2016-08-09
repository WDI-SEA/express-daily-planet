//Requires
var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();
var fileContents = fs.readFileSync('./data.json');
var data = JSON.parse(fileContents);

//Set/Use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

//Routes

//purpose: Serve the homepage of your site.
app.get("/", function(req, res){
  res.render("index");
});
//purpose: displays a list of all articles
app.get("/articles", function(req, res){
  //When rendering my articles view, pass the data along to it
  res.render("articles", {articles: data});
});
//purpose: displays a form that users use to create a new article
app.get("/articles/new",function(req, res){
  res.render("articles/new");
});
//purpose: creates a new article (adds to articles array and saves the file)
app.post('/articles/new', function(req, res){

  data.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles');
});
//static about and contact
app.get('/about', function(req, res){
  res.render('site/about');
});
app.get('/contact', function(req, res){
  res.render('site/contact');
});
//purpose: find an article by id in the array of articles and display it.
app.get('/articles/:id', function(req, res){
  var articleIndex = parseInt(req.params.id);
  res.render('articles/show', {myArticles: data[articleIndex]});
});

//Listen
app.listen(3000);