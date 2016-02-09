var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


var myArticles = [
	{title: "Broncos Win", body: "The Denver Broncos defeated the Carolina Panthers in Super Bowl 50."},
	{title: "Random article", body: "testing out my article maker"}

];

// function Article(title, body){
// 	this.title = title;
// 	this.body = body;
// 	myArticles.push(this);
// }

// var article1 = new Article("Broncos Win", "The Denver Broncos defeated the Carolina Panthers in Super Bowl 50.");
// var article2 = new Article("Random article", "testing out my article maker");
// var article3 = new Article("Marshawn Lynch Retires", "Seattle Seahawks player Lynch annouces retirement on twitter");
// var article4 = new Article("Random Title 4", "random body text");
// var article5 = new Article("Random Title 5", "random stuff");

app.get("/",function(req,res){
  res.render('index.ejs');
});

app.get('/articles', function(req, res){
    res.render('articles/index.ejs', {myArticles: myArticles});
});

app.get('/articles/new', function(req, res){
	res.render('articles/new.ejs');
});

app.post('/articles', function(req,res){
	myArticles.push(req.body);
	res.redirect('/articles');
});

app.get('/articles/:idx', function(req, res){
	var articleIdx = parseInt(req.params.idx);
	res.render('articles/show.ejs', {article: myArticles[articleIdx]});
});

app.get('/about', function(req, res){
	res.render('site/about.ejs');
});

app.get('/contact', function(req,res){
	res.render('site/contact.ejs');
})

app.listen(3000);