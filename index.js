//REQUIRES
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');


//APP VARIABLES
app = express();
var db = require('./models'); //boilerplate


//SET/USE STATEMENTS
app.set('view engine', 'ejs'); //boilerplate
app.use(ejsLayouts); //boilerplate
app.use(bodyParser.urlencoded({extended: false})); //boilerplate


//ROUTES

//goes to home page of site
app.get('/',function(req,res){
  res.render('home');
});

//goes to all articles
app.get('/articles', function(req,res){
  db.news.findAll().then(function(articles){
    res.render('articles',{articles:articles});
  });
});

//goes to article submission page
app.get('/articles/new', function(req,res){
  res.render('articlesNew');
});

//posts article to articles
app.post('/articles/new',function(req,res){
  console.log(req.body);
  db.news.create(req.body).then(function(article){
    res.redirect('/articles');
  });
});

app.get('/article/:id', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    res.render('article',{article:article});
  });
});




//LISTEN
app.listen(3000); //boilerplate
