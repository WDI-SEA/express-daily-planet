//Requires
var express = require("express"); //the framework
var bodyParser = require("body-parser"); //enables us to read post variables
var fs = require("fs"); //enables us to read from and write to files
var ejsLayouts = require("express-ejs-layouts"); //enables us to use a layout

//Declare the app variable
var app = express();

//Use or Set statements
app.use(bodyParser.urlencoded({extended : false})); //enables us to read post variables from the req
app.set("view engine", "ejs");
app.use(ejsLayouts);

//Define your routes and paths

app.get("/", function(req, res){
	res.render('index.ejs');
});

app.get("/articles", function(req, res){
	//get the data from data.json
	var articlesFromJsonFile = fs.readFileSync("./data.json");
	//parse the data to an understandable format
	var parsedArticles = JSON.parse(articlesFromJsonFile);
		//rendering articles.ejs (inside layout.ejs) with the articles object passed to it
	res.render("articles", { articles: parsedArticles});
});

app.get("/articles/new", function(req, res){
	res.render('new.ejs');
});

app.post("/articles/new", function(req, res){
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
		res.send("Please search for an article from 0 to " + (parsedArticles.length - 1));
	} else {
	res.render("article", { article: parsedArticles[articleIndex]});
	}
});



//define where you app is listened for
app.listen(3000);