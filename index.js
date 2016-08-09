console.log("web page started");
//requires
var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');
var app = express();

var fileContents = fs.readFileSync('./data.json');
var data = JSON.parse(fileContents);


//set and use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.get("/", function(req, res){
  res.render("index", {articleList: data});
});

app.get("/articles", function(req, res){
  res.render("articles/index", {articleList: data});
});

app.get("/new", function(req,res){
  res.render("articles/new");
});

app.post("/articles", function(req, res){
  data.push(req.body);
  res.redirect("/articles");
});

app.get("/articles/:index", function(req, res){
  res.render("articles/show", {articleList: data[parseInt(req.params.index)]});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.post("/contact", function(req, res){
  res.render("index");
});

//Listen(!)
app.listen(3000);
