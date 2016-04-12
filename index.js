var express = require("express");
var bodyParser = require("body-parser");
var app = express();
 var path = require('path')

var articles = [
  {title: 'First Article', body: 'this is the first article body'},
  {title: 'Second Article', body: 'this is the second article body'},
  {title: 'Third Article', body: 'this is the third article body'},
  {title: 'Fourth Article', body: 'this is the fourth article body'},
  {title: 'Fifth Article', body: 'this is the fifth article body'},
  {title: 'Sixth Article', body: 'this is the sixth article body'},
  {title: 'Seventh Article', body: 'this is the seventh article body'},
];

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended: false}) );
// app.get("/",function(req,res){
//   res.send('HELLO TACO!!!');
// });

app.get("/",function(req,res){
  res.render('index.ejs');
});


app.get("/articles/", function(req, res) {
	res.render('articles/index.ejs', {myArticles: articles});
});

app.post("/articles/", function(req, res) {
	articles.push(req.body);

	res.redirect("/articles/");
});

app.get("/articles/new", function(req, res) {
	res.render('articles/new.ejs');
});

app.get("/articles/:index", function(req, res) {
	var articleIndex = parseInt(req.params.index);

	res.render("articles/show", {myArticles: articles[articleIndex]});
});


app.use(express.static('site'));
app.get("/about", function(req, res) {
	res.render("site/about");
});
app.get("/contact", function(req, res) {
	res.render("site/contact");
});

app.listen(3000);