var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var db = require("./models");
var app = express();

app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render("index.ejs");
});

app.get("/articles", function(req, res) {
  db.article.findAll().then(function(articles) {
    res.render("articles/index.ejs", {articles: articles});
  });
});

app.get("/articles/new", function(req, res) {
  res.render("articles/new.ejs");
});

app.post("/articles", function(req, res) {
  res.redirect("/articles");
});

app.get("/articles/:id", function(req, res) {
  res.render("articles/show.ejs");
});

app.get("/about", function(req, res) {
  res.render("site/about.ejs");
});

app.get("/contact", function(req, res) {
  res.render("site/contact.ejs");
});

app.listen(3000);
