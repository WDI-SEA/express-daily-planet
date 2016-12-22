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

// UPDATE
app.get("/articles/:id/edit", function(req, res) {
  // var article = articles[req.params.id]; // {title: 'Bernie! Bernie!', body: '#feelthebern'}
  // article.id = req.params.id; // {id:0, title: 'Bernie! Bernie!', body: '#feelthebern'}
  db.articles.findById(req.params.id).then(function(article){
    res.render("articles/edit", {article: article});
  });
});

app.put("/articles/:id", function(req, res) {
  // console.log("putting");
  // articles[req.params.id] = req.body;

  res.send(req.body);
});

// DELETE
app.delete("/articles/:id", function(req, res) {
  // var articles_before_delete = articles;
  // articles_before_delete[req.params.id] = undefined;
  //
  // articles = articles_before_delete;

  res.send({message: 'success'});
});


// GET /articles/:id
// view: views/articles/show.ejs
// purpose: find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res) {
  db.articles.findById(req.params.id).then(function(article) {
    res.render("articles/show", {article: article});
  });
});

// Steps to implement search:
// 1. point form action attribute to “/search”
// 2. give input attribute name “query”
// 3. create server route for `app.get('/search', function(req, res) { … })`
// 4. obtain the users search query through the query string, not as something defined with a colon in our route
// 5. query the database with `db.article.findAll().then(function(articles) { … })`
// 6. access the attributes on our model with `.get()` function like `article.get('title')`

// GET /search/:query
app.get("/search", function(req, res) {
  console.log("search query:", req.query)
  var q = req.query.search;

  // this search logic is inefficient but robust and you know what's happening/can control it better

  function isMatch(article, q) {
    q = q.toLowerCase();
    var title = article.get('title').toLowerCase();
    var body = article.get('body').toLowerCase();
    var author = article.get('author').toLowerCase();
    if (title.indexOf(q) >= 0 || body.indexOf(q) >= 0 || author.indexOf(q) >= 0) {
      return true;
    }
    return false;
  }

  db.articles.findAll(function(articles){
    // findAll gives articles as an array like
    // [{id: 4, title:"", body:"", author:""}, {id: 67, title:"", body:"", author:""}]
    var searchResults = [];

    // filter results
    for (var i=0; i<articles.length; i++) {
      if (articles[i].body.indexOf(q)) {
        searchResults.push(articles[i]);
      }
    }
    // render site
    res.render("articles/search-results", {searchResults: searchResults});
  });
  // if no search results
  res.render("articles/search-results", {searchResults: []});
});


/* STATIC PAGES */
// GET /about
// serve a static about daily planet page.
app.get("/about", function(req, res) {
  res.render("site/about");
});

// GET /contact
// serve a static contact page.
app.get("/contact", function(req, res) {
  res.render("site/contact");
});

/* LISTEN */
var port = 3000;
app.listen(port);
