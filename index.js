var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views/site'));

//data variable
var articles = [
  {title: 'Article title', body: 'this is the first article body'},
  {title: 'Ravens win!', body: 'Best team in football are the champs'},
  {title: 'The secret to Express', body: "It's not as fast as you'd think"},
  {title: 'Brian', body: 'A karaoke legend in the making'}
];

//home page
app.get("/",function(req,res){
  res.render('../views/index.ejs');
});

//GET /articles
app.get("/articles", function(req, res) {
  res.render('articles/index.ejs', {articles: articles});
});

//GET /articles/new
app.get('/articles/new', function(req, res){
  res.render('articles/new.ejs');
});

//POST /articles
app.post('/articles', function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

//GET /articles/:id
app.get('/articles/:id', function(req, res) {
  var articleIdx = parseInt(req.params.id);
  res.render('articles/show.ejs', {article: articles[articleIdx]});
});

//Static About page
app.get("/about", function(req, res) {
  res.render("site/about");
})

//Static Contact page
app.get("/contact", function(req, res) {
  res.render("site/contact");
});

app.listen(3000);