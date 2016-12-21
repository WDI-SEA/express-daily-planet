/* REQUIRES */
var express = require("express");
var path = require('path');
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

/* APP VARIABLES */
var app = express();
var db = require("./models"); // the "." tells require to look in our own file system

/* SET/USE STATEMENTS */
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, "static")));

/* ROUTES */
// GET /
// view: views/index.ejs
// purpose: Serve the homepage of your site.
app.get("/", function(req, res) {
  res.render("site/home");
});

// GET /articles
// view: views/articles/index.ejs
// purpose: displays a list of all articles
app.get("/articles", function(req, res) {
  db.articles.findAll().then(function(articles) { // plural "articles" for grabbing all the articles
    console.log(articles);
    res.render("articles/index", {articles: articles});
  });
});

// GET /articles/new
// view: views/articles/new.ejs
// purpose: displays a form that users use to create a new article
app.get("/articles/new", function(req, res) {
  res.render("articles/new");
});

// POST /articles
// view: none (redirects to /articles after the article is created)
// purpose: creates a new article (adds to articles array and saves the file)
app.post("/articles/new", function(req, res) {
  console.log(req.body);
  db.articles.create(req.body).then(function(article) {
    res.redirect("/articles");
  });
});

// GET /articles/:id
// view: views/articles/show.ejs
// purpose: find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res) {
  db.articles.findById(req.params.id).then(function(article) {
    res.render("articles/show", {article: article});
  });
});

/* STATIC PAGES */
// GET /about
// serve a static about daily planet page.


// GET /contact
// serve a static contact page.


/* LISTEN */
var port = 3000;
app.listen(port);
