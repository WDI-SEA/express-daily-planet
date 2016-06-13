var express = require("express");
// FS (file ssystem) provided by node by default
// FS used to read and write files (data.json)
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();

// set up ejs engine
app.set("view engine", "ejs");
// set up body-parser
app.use(bodyParser.urlencoded({ extended:false }));

// Below renders page
app.get("/", function(req, res) {
  res.render("index.ejs");
});

app.get("/site/about", function(req, res) {
  res.render("site/about.ejs");
});

app.get("/site/contact", function(req, res) {
  res.render("site/contact.ejs");
});

// Below creates connection to articles ejs page and 
// creates link to json obj data
app.get("/articles", function(req, res) {
  var articles = fs.readFileSync("./data.json");
  // data alwasys comes as a string, turn it back into an obj
  articles = JSON.parse(articles);
  res.render("articles/index.ejs", { articles: articles });
});

app.get("/articles/new", function (req, res) {
  res.render("articles/new.ejs");
})

app.post("/articles", function(req, res) {
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync("./data.json", JSON.stringify(articles));
  res.redirect("/articles");
});

app.get("/articles/:idx", function(req, res) {
  // get data to use
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  var articleView = articles[req.params.idx];
  res.render("articles/show.ejs", { articles: articleView});
});


app.listen(3000);