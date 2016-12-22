//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app vaiables
var app = express();
var db = require("./models");

//set/use statments
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.get("/", function(req, res){
  res.render("home");
});

//Get all articles
app.get("/show", function(req,res){
  db.article.findAll().then(function(articles){
  console.log(articles);
  res.render("articles/index", {articles: articles});
  });
});

//Get new articles
app.get("/new", function(req, res){
  res.render("articles/new");
});

//Create new article form
app.post("/articles/new", function (req, res){
  console.log(req.body);
  db.article.create(req.body).then(function(article){
    res.redirect("/show");
  });
});

//finding article content
app.get('/articles/:id', function(req,res){
  db.article.findById(req.params.id).then(function(article){
    res.render('articles/show',{article:article});
  });
});

//Delete
app.delete('/articles/:id', function(req, res) {
  var articles = getArticles();

  // Set the index to undefined so every other position isn't screwed up.
  articles[req.params.id] = undefined;
  saveArticles(articles);

  res.send(req.body);
});

//listen
app.listen(3000);
