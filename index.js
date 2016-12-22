// REQUIRES
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");


// APP VARIABLES
var app = express();
var db = require("./models"); 


// SET/USE STATEMENTS
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('static'))
app.use(express.static('files'))


//ROUTES

// Serve the homepage of your site.
app.get("/", function(req, res) {
 	res.render("index");
});

// Get about page
app.get("/about", function(req, res) {
	res.render("./site/about");
});

// Get contact page
app.get("/contact", function(req, res) {
	res.render("./site/contact");
});

// Displays a list of all articles
app.get("/articles", function(req, res) {
	db.article.findAll().then(function(article) {
		res.render("./articles/index", {article: article});
	});
});

// Get new article form
app.get("/articles/new", function(req, res) {
	res.render("./articles/new");
});

// Creates a new article (adds to articles array and saves the file)
app.post("/articles/new", function(req, res) {
	db.article.create(req.body).then(function(article) { 
		res.redirect("/articles"); 
	}); 
});

// Find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res) {
	db.article.findById(req.params.id).then(function(article) {
		res.render("./articles/show", {article: article}); 
	});
});

// Delete an article
app.delete('/articles/:id',function(req,res){
  	db.article.findById(req.params.id).then(function(article) {
    article.destroy();
    res.send({message:'successfully deleted'});
  });
});

// Submit edits on article
app.put('/articles/:id', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    article.update(req.body);
    res.send({message:'successfully edited'});
  });
});

// Get edit article form
app.get('/articles/:id/edit',function(req,res){
  	db.article.findById(req.params.id).then(function(article) {
    res.render("./articles/edit", {article: article});
  });
});


// LISTEN
app.listen(3000); // This is how it knows which localhost address to use for index page



// SEARCH BAR FUNCTIONALITY

// <form action="/search" method="GET">
// 	<input name="query"/>
// 	<input type="submit"/>
// <form>

// Steps to implement search:
// 1. point form action attribute to “/search”
// 2. give input attribute name “query”
// 3. create server route for `app.get('/search', function(req, res) { … })`
// 4. obtain the users search query through the query string, not as something defined with a colon in our route
// 5. query the database with `db.article.findAll().then(function(articles) { … })`
// 6. access the attributes on our model with `.get()` function like `article.get('title')`
