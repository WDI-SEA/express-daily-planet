var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'))

app.get('/', function(req, res) {
  res.render('site/index.ejs');
});

app.get("/articles", function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render("articles/index", {articles:fileContents})
});

app.get('/articles/new', function(req, res) {
  res.render("articles/new.ejs")
});

app.get("/articles/:id", function(req, res) {
	console.log("In the GET /articles/id route...");
	var articles = fs.readFileSync("./data.json");
	articles = JSON.parse(articles);
	var articleIndex = parseInt(req.params.id);
	res.render('articles/show', {article:articles[articleIndex]});
});

app.get('/about', function(req, res) {
  res.render("site/about");
});

app.get('/contact', function(req, res) {
  res.render("site/contact");
});

app.post('/articles/new', function(req, res) {
  var articles = fs.readFileSync("./data.json");
  articles = JSON.parse(articles);
  articles.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  res.redirect('/articles');
});

app.listen(3000, function() {
  console.log("In the root route...")
});
