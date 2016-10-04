var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var articlesFromJsonFile = fs.readFileSync("./data.json");
var parsedArticles = JSON.parse(articlesFromJsonFile);

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Define routes here
app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/articles", function(req, res) {
	console.log(parsedArticles);
	res.render("./articles/index.ejs", { articles: parsedArticles });
});

app.get("/articles/new", function(req, res) {
	// title and body are the inputs of our form
	res.render("./articles/new.ejs");
});

app.post("/articles/new", function(req, res) {
	var articlesFromJsonFile = fs.readFileSync("./data.json");
	// add to our list of articles
	parsedArticles.push(req.body);
	fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));
	res.redirect("/articles/new");
});

app.get("/articles/:id", function(req, res) {
	// figure out how to make this a number if it looks like anumber
	var id = parseInt(req.params.id);

	if(typeof(id) != "number"){
		res.send("please input a number as an id");
	} else if(id >= parsedArticles.length) {
		res.send("please input an id number that is lees than " + parsedArticles.length);
	} else {
		res.render("./articles/show.ejs", { title: parsedArticles[id].title, body: parsedArticles[id].body });
	}

});

app.get("/about", function(req, res) {
	res.render("about");
});

app.get("/contact", function(req, res) {
	res.render("contact");
});

// #### Static Pages
// Create the following routes for static pages. You can use EJS with these pages, but you won't be passing any data.

// * `GET /about` serve a static about daily planet page.
// * `GET /contact` serve a static contact page.
app.listen(3000);