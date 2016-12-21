// REQUIRE ANY MODULES I NEED TO USE
var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var ejsLayouts = require("express-ejs-layouts"); ///enables us to use a layout

// DECLARE GLOBAL VARIABLES 
var app = express();

// ANY USE OR SET STATEMENTS THAT WE NEED
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(ejsLayouts);



app.get('/', function(req, res) {
  res.render('index.ejs');
});


//Routes defined here.
app.get("/articles", function(req, res){
	//Get the data from data.json
	var articlesFromJsonFile = fs.readFileSync("./data.json");

	//Parsing the data into a json format we can understand
	var parsedArticles = JSON.parse(articlesFromJsonFile);


	res.render("articles", { articles: parsedArticles });
});

app.get('/articles/new', function(req, res) {
  	res.render('new.ejs');
});


app.post("/", function(req, res){
	var articlesFromJsonFile = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJsonFile);
	parsedArticles.push(req.body);
	fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));
	res.redirect("/articles");
});

app.get("/articles/:id", function(req, res){
	var articlesFromJsonFile = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJsonFile);
	var articleIndex = parseInt(req.params.id);
	if (articleIndex < 0 || articleIndex > (parsedArticles.length - 1)) {
		res.send("Search for an article " + (parsedArticles.length - 1));
 	} else {
 	res.render("article", { article: parsedArticles[articleIndex]});
 	}
 });


// listen on port 30000
app.listen(3000);











