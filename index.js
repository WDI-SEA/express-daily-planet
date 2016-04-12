var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')


var articles = [
{title: 'Lex Luthor strikes again!', byline: "Lois Lane", body: 'Why is he after us?'},
{title: 'Lex Luthor strikes!', byline: "Clark Kent", body: 'Is he partially lightning?'},
{title: 'Batman V Superman', byline: "Peter Parker", body: 'Actually a super boring fight'},
{title: 'Staff reporters wed!', byline: "Peter Parker", body: 'Lois Lane hospitalized with broken pelvis on honeymoon'},
{title: 'Spiderman?', byline: "Special Correspondent Bruce Wayne", body: 'At least we are not New York right?'},
{title: 'Kryptonite Taste Test', byline: "Clark Kent", body: 'Staff reporter Clark Kent gives them two thumbs down.'}];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));


//homepage
app.get("/",function(req,res){
  res.render('index.ejs');
});

//lists articles
app.get("/articles", function(req, res) {
  res.render('articles/index', {myArticles: articles});
});

//form for a new article
app.get("/articles/new", function(req, res) {
  res.render('articles/new');
});

//adds to articles array
app.post("/articles", function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

app.get("/articles/:id", function(req, res) {
  var articleId = parseInt(req.params.id);
  res.render('articles/show', {myArticles: articles[articleId]});
});

app.get("/about", function(req, res) {
  res.render('./site/about.ejs');
  console.log('All is well on the about page');
});

app.get("/contact", function(req, res) {
  res.render('./site/contact');
  console.log('All is well on the contact page');
});


app.listen(3000);