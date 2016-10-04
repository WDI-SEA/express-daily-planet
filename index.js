var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Define routes here
app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/articles", function(req, res) {
	var articlesFromJsonFile = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJsonFile);
	console.log(parsedArticles);
	res.render("./articles/index.ejs", { articles: parsedArticles });
});

app.get("/articles/new", function(req, res) {
	// title and body are the inputs of our form
	res.render("./articles/new.ejs");
});
// * `GET /articles/new`
//   * view: `views/articles/new.ejs`
//   * purpose: displays a form that users use to create a new article
// * `POST /articles`
//   * view: none (redirects to /articles after the article is created)
//   * purpose: creates a new article (adds to articles array and saves the file)
// * `GET /articles/:id`
//   * view: `views/articles/show.ejs`
//   * purpose: find an article by id in the array of `articles` and display it.

// #### Static Pages
// Create the following routes for static pages. You can use EJS with these pages, but you won't be passing any data.

// * `GET /about` serve a static about daily planet page.
// * `GET /contact` serve a static contact page.
app.listen(3000);