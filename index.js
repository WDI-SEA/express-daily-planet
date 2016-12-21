//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
//global variables
var app = express();
var db = require("./models");

//set /use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
    extended: false
}));

//routes
// home page
app.get("/", function(req, res) {
    // res.send('HELLO TACO!!!');
    res.render("home");
});

// gets all articles  db. is based on folder models name
app.get("/articles", function(req, res) {
    db.article.findAll().then(function(articles) {
        console.log(articles);
        res.render("allArticles", {
            articles: articles
        });
    });
    // res.send("/articles is working");
});

//get single article by ID
app.get("/article/:id", function(req, res) {
    // res.send("article by id works");
    // console.log(req.params.id);
    db.article.findById(req.params.id).then(function(article) {
        res.render("oneArticle", {
            article: article
        });
    });
});

//get new article form
app.get("/articles/new", function(req, res) {
    res.render("newArticle");
    // res.send("hi");
});

// create a new article
app.post("/articles/new", function(req, res) {
    // res.send("post route works");
    db.article.create(req.body).then(function(article) {
        res.redirect("/articles");
        // console.log(req.body);
    });
});

//listen
app.listen(3000);
