var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
  res.render("site/index");
});

app.get("/about", function(req, res){
  res.render("site/about");
});

app.get("/articles", function(req, res){
  var fileContents = fs.readFileSync("./data.json");
  var articles = JSON.parse(fileContents);
  res.render("articles/index", {articles: articles});
});

app.get("/articles/:index", function(req, res){
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  var articleIndex = parseInt(req.params.index);
  res.render("articles/show", {myArticle: articles[articleIndex]});
});

app.get("/new", function(req, res){
  res.render("articles/new")
});
app.post("/new", function(req, res){
  var fileContents = fs.readFileSync("./data.json");
  var articles = JSON.parse(fileContents);
  articles.push(req.body);
  fs.writeFileSync("./data.json", JSON.stringify(articles));
  res.redirect("/articles");
});

app.listen(5000);
