//Require the stuff I need, make any global variables I need
var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();
var db = require("./models");

//Set and use statements to set up middleware
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);

//Controller
app.use(express.static('public'));
app.use("/articles", require("./controllers/articles"));


//Routes
app.get("/", function(req, res) {
  res.render("site/home");
});

app.get("/about", function(req, res) {
  res.render("site/about");
});

app.get("/contact", function(req, res) {
  res.render("site/contact");
});

app.get("/articles", function(req, res) {
  res.render("articles/index");
});

app.get("/new", function(req, res) {
  res.render("articles/new");
});

// maybe works
app.post("/articles/:id", function(req, res) {
  db.article.create({
    title: req.body.title,
    body: req.body.body
  }).then(function() {
    res.redirect('/');
  });
});

//Listen on port 3000
app.listen(3000);