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
  res.render('site/home');
});

//goes to all articles
app.get('/articles/index', function(req,res){
  db.news.findAll().then(function(articles){
    res.render('articles/index',{articles:articles});
  });
});

//goes to article submission page
app.get('/articles/new', function(req,res){
  res.render('articles/new');
});

//posts article to articles
app.post('/articles/new',function(req,res){
  console.log(req.body);
  db.news.create(req.body).then(function(article){
    res.redirect('index');
  });
});

app.get('/articles/show/:id', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    res.render('articles/show',{article:article});
  });
});

app.get('/about', function(req,res){
  res.render('site/about');
});

app.get('/contact', function(req,res){
  res.render('site/contact');
});


//LISTEN
app.listen(3000); //boilerplate
