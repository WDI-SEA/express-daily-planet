//requires
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var path = require('path');
//global variables
var app = express();
var db = require("./models");

//set /use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'static')));

//routes
//about
app.get("/about", function(req, res) {
    res.render("site/aboutInfo");
});
//contact
app.get("/contact", function(req, res) {
    res.render("site/contactInfo");
});
// home page
app.get("/", function(req, res) {
    // res.send('HELLO TACO!!!');
    res.render("site/index.ejs");
});

// gets all articles  db. is based on folder models name
app.get("/articles", function(req, res) {
    db.article.findAll().then(function(articles) {
        console.log(articles);
        res.render("articles/allArticles", {
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
        res.render("articles/oneArticle", {
            article: article
        });
    });
});

//get new article form
app.get("/articles/new", function(req, res) {
    res.render("articles/newArticle");
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
// delete articles and redirects to articles
app.delete("/article/:id", function(req, res) {
    db.article.findById(req.params.id).then(function(article) {
        article.destroy();
        console.log(req.params.id);
        res.send({
            message: 'success destroying'
        });
    });
});

//updates article with given id
app.put('/article/:id', function(req, res) {
    db.article.findById(req.params.id).then(function(article) {
        article.update(req.body);
        res.send({
            message: 'success putting'
        });
    });
});

//goes to edit form for article with id
app.get('/article/:id/edit', function(req, res) {
    db.news.findById(req.params.id).then(function(article) {
        res.render('articles/editArticle', {
            article: article
        });
    });
});

//listen
app.listen(3000);
