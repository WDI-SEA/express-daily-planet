var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
  {title: 'QUEEN BEY SLAYS', body: 'at superbowl 50 aka the beyonce concert'},
  {title: 'RELEASE GUCCI', body: 'BURRRR'},
  {title: 'CLOTH TALK FT. DJ KHALED', body: 'all we do is win, win, win'},
  {title: 'DAYMAN', body: 'the fighter of the night man'}
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));


app.get("/",function(req,res){
  res.render('index.ejs');
});

app.get("/articles", function(req, res){
  res.render('articles/index.ejs', {articles: articles});
});

app.post("/articles", function(req, res){
	// res.send(req.body);
	articles.push(req.body);
	console.log(articles);
	res.redirect('/articles');
});

app.get("/articles/new", function(req, res){
  res.render('articles/new.ejs');

});

app.get('/articles/:idx', function(req, res){
	var articleIdx = parseInt(req.params.idx);
	res.render('articles/show.ejs', {articles:articles[articleIdx]});

});



app.listen(3000);