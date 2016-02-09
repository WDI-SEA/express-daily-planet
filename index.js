var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//array of articles
var articles = [
  {title: 'Article title', body: 'this is the first article body'}
];


// set view engine to index.ejs
app.set('view engine', 'ejs');

//serves the homepage of the site 
app.get("/",function(req,res){
  res.render('views/index.ejs');
});

//displays a list of all articles
app.get("/articles", function(req,res) {
	res.render('views/articles/index.ejs');
})

//displays a form that users use to create a new article
app.get("articles/new", function(req,res) {
	res.render('views/articles/new.ejs');
})

// listen
app.listen(3000, function() {
	console.log("the app is running!");
});