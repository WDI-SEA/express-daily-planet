'use strict';
//requires
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

//Set use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));


//Routes

//GET /views/index.ejs
app.get("/", function(req, res) {
    // res.send("hello world!");
    res.render('index');
});

//GET /views/articles/index.ejs
app.get('/articles', function(req, res) {
    var articles = fs.readFileSync('./data.json');
    articles = JSON.parse(articles);
    res.render('articles/index', { myArticles: articles });
});

//GET /views/articles/new.ejs
app.get('/articles/:new', function(req, res) {

    var articles = fs.readFileSync('./data.json');
    articles = JSON.parse(articles);

    var articlesIndex = parseInt(req.params.new);

    res.render('articles/new', { myArticles: articles[articlesIndex] });
});

//POST /articles
app.post('/articles', function(req, res) {
    var articles = fs.readFileSync('./data.json');
    articles = JSON.parse(articles);

    console.log(req.body);
    articles.push(req.body);

    fs.writeFileSync('./data.json', JSON.stringify(articles));

    res.redirect('/articles');
});

//GET /articles/:id
app.get('/articles/:id', function(req, res) {
    var articles = fs.readFileSync('./data.json');
    articles = JSON.parse(articles);

    var idFilter = req.query.idFilter;

    if(idFilter) {
      articles = articles.filter(function(articles){

        return articles.id;
      });
    } 

    res.render('articles/', {myArticles: articles});


});
app.use('/static', express.static('public'));
app.use(express.static(__dirname + 'site/about'));
app.use(express.static(__dirname + 'site/contact'));

//Listen
app.listen(3000);
