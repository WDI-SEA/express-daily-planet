//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

//app vaiables
var app = express();
var db = require("./models");

//set/use statments
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

//routes
app.get("/", function(req, res){
  res.render("home");
});

//Get all articles
app.get("/index", function(req, res){
  res.render("articles/index");
});

//Get new articles
app.get("/article/new", function(req, res){
  res.render("articles/new");
});

//Create new article form
app.post("/new", function (req, res){
  console.log(req.body);
  db.article.create(req.body).then(function(article){
    res.redirect("/index");
  });
});

//post new article and redirects to articles


//listen
app.listen(3000);
