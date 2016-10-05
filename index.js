var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var ejsLayouts = require("express-ejs-layouts");

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");

app.use(ejsLayouts);

app.get("/", function(req, res) {
	res.render("sites/index");
});

app.get("/articles", function(req, res) {

	var articlesFromJSONFILE = fs.readFileSync("./data.json");

	var parsedArticles = JSON.parse(articlesFromJSONFILE);

	res.render("articles/index", {articlesFileObject : parsedArticles});
});

app.post("/articles/new", function(req, res) {

	var articlesFromJSONFILE = fs.readFileSync("./data.json");

	var parsedArticles = JSON.parse(articlesFromJSONFILE);

	parsedArticles.push(req.body);

	fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));

	res.redirect("/articles");

});

app.get("/articles/new", function(req, res) {
	res.render("articles/new");
});

app.get("/articles/show/:x", function(req,res) {

	var articlesFromJSONFILE = fs.readFileSync("./data.json");

	var parsedArticles = JSON.parse(articlesFromJSONFILE);

	var num = req.params.x

	if(!isNaN(num) && num >= 0 && num < parsedArticles.length) {
		res.send(parsedArticles[num]);

	} else {
		res.send("This is not a valid article number.");
	}
});

app.get("/sites/contact", function(req, res) {
	res.render("sites/contact");
});

app.get("/sites/about", function(req, res) {
	res.render("sites/about");
});















////

app.listen(3000);