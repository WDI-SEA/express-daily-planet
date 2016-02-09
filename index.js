var express = require('express');
var bodyParser = require('body-parser');
var app=express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static('views'));

var articles = [
  {title: 'What is Your position?', body: '...on the Bat Vigilante in Gotham'},
   {title: 'Civil Liberties are Being trampled upon', body: 'People are living in fear'},
   {title: 'Bat Brand of Justice', body: 'Branded by the Dark Knight'},
   {title: 'Superman Saves a cat', body: 'This is a puff piece editorial'}


];

app.get("/",function(req,res){
	res.render('index.ejs');
});

app.get("/articles",function(req,res){
	res.render('articles/index.ejs', {articles: articles});
});

app.post('/articles', function(req,res){
  articles.push(req.body);
  res.redirect('/articles');

});

app.get("/articles/new",function(req,res){
	res.render('articles/new.ejs')
});

app.get("/articles/:id",function(req,res){
	var artID = parseInt(req.params.id);
	res.render('articles/show.ejs', {article: articles[artID]});
});

app.get("/about", function(req,res){
  res.render('site/about.ejs');
});

app.get("/contact", function(req,res){
  res.render('site/contact.ejs');
});


app.listen (3000);