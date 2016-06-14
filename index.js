var express = require('express');
var fs = require('fs');   // stands for 'file sysem'
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/articles', function(req, res) {
  
  var fileContents = fs.readFileSync('./data.json');
  var articles = JSON.parse(fileContents);      // var articles is an array. This variable is associated with the last "articles" in the line below

  res.render('articles/index', { articles: articles }); //the first "articles" refers to the first "articles" in line 7 of articles/index.ejs, before the .forEach. Its saying these two things are equal 
});  


app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

// POST /articles
// view: none (redirects to /articles after the article is created)
// purpose: creates a new article (adds to articles array and saves the file)
app.post('/articles', function(req, res) {
  //reading the file
  var fileContents = fs.readFileSync('./data.json');
  var articles = JSON.parse(fileContents);

  //pushing to array
  articles.push(req.body); //req.body is the object from the form. It's being added to the end of articles array from line 33 above

  // writing. Turn the array back into a string and add it to data.json
  fs.writeFileSync('./data.json', JSON.stringify(articles));

  res.redirect('/articles');

});

app.get('/articles/:idx', function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var articles = JSON.parse(fileContents);

  var articlesToShow = articles[req.params.idx];

  res.render('articles/show.ejs', { article: articlesToShow });

});



app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});



app.listen(3001);