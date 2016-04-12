var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
{title:'Bulls Get Number 1 Pick despite 2.3% Odds', body: 'Donec accumsan consectetur faucibus. YOLO, you only live once. '},
{title:'Todays Weather', body: 'Skate ipsum dolor sit amet, fastplant bank death box gap boned out. 180 hardware crooked grind rad boneless. Darkslide Steve Chumney frigid air cess slide half-cab shinner. '},
{title:'Primary Results', body: 'Lebowski ipsum when will you find these guys? I mean, do you have any promising leads? Hey, relax man.'}
]

app.set('view engine','ejs');
app.use(express.static(__dirname +'/views'));

app.use( bodyParser.urlencoded({extended: false }) );

app.get("/",function(req,res){
  res.render('index.ejs');
});

app.post('/articles', function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

app.get('/articles', function(req, res){
  res.render('articles/index', { myArticles : articles});
});

app.get('/articles/new', function(req, res){
  res.render('articles/new');
});

app.get('/articles/:id', function(req, res) {
  var articleId = parseInt(req.params.id);
  res.render('articles/show',{myArticle: articles[articleId]});
});

app.get('/aboutme', function(req, res){
  res.render('aboutme');
})

app.get('/contact', function(req, res){
  res.render('contact');
})



app.listen(3000);
