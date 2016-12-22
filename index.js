var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");
var app = express();

var path = require('path');
// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static')));


app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', function(req, res) {
  res.render("index.ejs");
});


app.get("/about", function(req, res) {
  res.render("site/about.ejs");
});

app.get("/contact", function(req, res) {
  res.render("site/contact.ejs");
});


app.get("/articles", function(req, res) {
  db.article.findAll().then(function(articles) {
    res.render("articles/index.ejs", {articles: articles});
  });
});

app.get("/articles/new", function(req, res) {
  res.render("articles/new.ejs");
});


app.post("/articles/new", function(req, res) {
  db.article.create(req.body).then(function(article) {
    res.redirect("/articles");
  });
});

app.get("/articles/:id", function(req, res) {
  db.article.findById(req.params.id).then(function(article) {
    res.render("articles/show.ejs", {article: article});
  });
});

// Edit form for existing article
app.get('/articles/:id/edit', function(req, res) {
  db.article.findById(req.params.id).then(function(article) {
    res.render('./articles/edit.ejs', {article: article});
  });
});

// Submits the edit on existing article
app.put('/articles/:id', function(req, res) {
  db.article.update(req.body, {where: {id: req.params.id}}).then(function(article) {
    res.send({message: 'edit success'});
  });
});

app.delete('/articles/:id', function(req, res) {
  db.article.findById(req.params.id).then(function(article) {
    article.destroy();
    res.send({message: 'destroy success'});
  });
});


app.listen(3000);
