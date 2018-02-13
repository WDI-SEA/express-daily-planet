var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, "css")));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  console.log("Does nodemon work?");
  res.render('site/index');
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.get("/articles", function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render('articles/index', {articles: fileContents});
});

app.get('/articles/new', function(req, res) {
  res.render("articles/new");
});

app.get("/articles/:idx", function(req, res) {
  console.log("In the get /articles/idx route..");
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  // get the array index from the url params
  var articleIndex = parseInt(req.params.idx);
  res.render('articles/show', {article: articles[articleIndex]});
});

app.post("/articles", function(req, res){
  console.log("in the post articles route...");
  // .body is how you use bodyParser
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.send(req.body);
});

app.listen(3000);
