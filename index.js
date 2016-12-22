//REQUIRES
var express = require('express'); //boilerplate
var bodyParser = require('body-parser'); //boilerplate
var ejsLayouts = require('express-ejs-layouts'); //boilerplate
var path = require('path'); //boilerplate


//APP VARIABLES
app = express(); //boilerplate
var db = require('./models'); //boilerplate


//SET/USE STATEMENTS
app.set('view engine', 'ejs'); //boilerplate
app.use(ejsLayouts); //boilerplate
app.use(bodyParser.urlencoded({extended: false})); //boilerplate

// this sets a static directory for the views
app.use(express.static(path.join(__dirname, 'static'))); //boilerplate


//ROUTES
//goes to home page of site
app.get('/',function(req,res){
  res.render('site/home');
});

//goes to about page
app.get('/about', function(req,res){
  res.render('site/about');
});

//goes to contact page
app.get('/contact', function(req,res){
  res.render('site/contact');
});

//goes to all articles
app.get('/articles/', function(req,res){
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
    res.redirect('/articles/');
  });
});

//goes to specific article with id, id
app.get('/articles/:id', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    res.render('articles/show',{article:article});
  });
});

//deletes article and redirects to articles
app.delete('/articles/:id',function(req,res){
  db.news.findById(req.params.id).then(function(article){
    article.destroy();
    res.send({message:'success destroying'});
  });
});

//updates article with given id
app.put('/articles/:id', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    article.update(req.body);
    res.send({message:'success putting'});
  });
});

//goes to edit form for article with id
app.get('/articles/:id/edit', function(req,res){
  db.news.findById(req.params.id).then(function(article){
    res.render('articles/edit',{article:article});
  });
});

//returns search entries containing query string, not case sensitive
app.get('/search', function(req,res){

  q = req.query.searchArticles;
  console.log("query is: "+q);

  function isMatch(article,q){
    q = q.toLowerCase();
    var title = article.title.toLowerCase();
    var content = article.body.toLowerCase();
    if(title.indexOf(q)>=0||content.indexOf(q)>=0){
      return true;
    }
  }

  db.news.findAll().then(function(articles){
    var searchResults = [];

    //filter results
    for(var i=0; i<articles.length; i++){
      if(isMatch(articles[i],q)){
        searchResults.push(articles[i]);
      }
    }
    res.render('site/search',{searchResults:searchResults});
  });
});


//LISTEN
app.listen(3000); //boilerplate
