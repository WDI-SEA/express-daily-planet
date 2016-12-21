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
app.use(express.static('public'))
app.use(express.static('files'))
app.use('/static', express.static('public'))


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
	console.log("Holla");
	db.article.findAll().then(function(article) {
		res.render("./articles/index", {article: article});
	});
});

// Find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res) {
	db.article.findById(req.params.id).then(function(article) {
		res.render("./articles/show", {article: article}); 
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


// LISTEN
app.listen(3000); // This is how it knows which localhost address to use for index page