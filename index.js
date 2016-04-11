var express = require('express');
var bodyParser = require('body-parser');
var app = express();

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

//homepage
app.get("/",function(req,res){
  res.render('index.ejs');
  console.log('All is well on index');
});

//lists articles
app.get("/articles", function(req, res) {
  res.render('articles/index', {myArticles: articles});
    console.log('All is well on articles index');
});

//form for a new article
app.get("/articles/new", function(req, res) {
  res.render('articles/new.ejs');
  console.log('All is well on the tip page');
  // res.redirect('articles');
});

//adds to articles array
app.post("/articles/new", function(req, res) {
  articles.push(req.body);
  console.log('All is well on adding an article');
  res.redirect('articles')
});

app.get("/articles/:id", function(req, res) {
  var articleId = parseInt(req.params.id);

  res.render('articles/show', {myArticles: articles[articleId]});
  });





app.listen(3000);