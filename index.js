var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.post("/articles/index", function(req, res){
	articles.push(req.body);
	res.redirect("/articles");
});

var articles = [
 	{title : 'Article 1' , body: "Of all the friends I've had… you're the first. Now Fry, it's been a few years since medical school, so remind me. Disemboweling in your species: fatal or non-fatal? Ok, we'll go deliver this crate like professionals, and then we'll go ride the bumper cars."},
 	{title : 'Article 2' , body: "Hey, what kinda party is this? There's no booze and only one hooker. Incidentally, you have a dime up your nose. Have you ever tried just turning off the TV, sitting down with your children, and hitting them?"},
 	{title : 'Article 3' , body: "Ow, my spirit! Why yes! Thanks for noticing. I barely knew Philip, but as a clergyman I have no problem telling his most intimate friends all about him. Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!"},
 	{title : 'Article 4' , body: "Who am I making this out to? That's right, baby. I ain't your loverboy Flexo, the guy you love so much. You even love anyone pretending to be him! Is today's hectic lifestyle making you tense and impatient?"},
 	];

// home page
app.get("/",function(req,res){
  res.render('index');
});

// Articles page
app.get("/articles", function(req, res){
	res.render('articles/index', {articles: articles});
});

// New article page 
app.get("/articles/new", function(req, res) {
    res.render('articles/new');
});

// about page 
app.get("/about", function(req, res) {
    res.render('site/about');
});

// contact page
app.get("/contact", function(req, res) {
    res.render('site/contact');
});

app.get("/articles/:idx", function(req, res){
	var articlesIdx = parseInt(req.params.idx);
	res.render("articles/show.ejs" , {articles: articles[articlesIdx]});
});


app.listen(3000);