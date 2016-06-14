var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

var fileContents = fs.readFileSync('./data.json');
var data = JSON.parse(fileContents);
// setting the templeting language for express to use
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

//request and response
app.get('/', function(req, res) {
  res.render('./views/index.ejs');
});
//
app.get('/articles', function(req, res) {
  //  ./ = in current directory
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  res.render('articles/index', { articles: articles });
  // identafies what file the user will see and we can pass data into the file
});
// new is most likley a refrence for form
app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

app.post('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
//
  articles.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(articles));

  res.redirect('/articles');

  });

app.get('/articles/:idx', function(req, res) {
    var articles = fs.readFileSync('./data.json');
    articles = JSON.parse(articles);

    var articleToShow = articles[req.params.idx];

    res.render('articles/show.ejs', { article: articleToShow });

});



app.listen(3000);
