//  set up express
var express = require('express');
//  set up require file system
var fs = require('fs');
//  set up bodyParser
var bodyParser = require('body-parser');
//  run express function
var app = express();

app.use(express.static('public'));


//  set up view engine to view ejs files
app.set('view engine', 'ejs');
//  set up bodyParser
app.use(bodyParser.urlencoded({ extended: false }));

//  render the index.ejs file
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/articles', function(req, res) {
//  make an array variable of all the objects in json
  var articles = fs.readFileSync('./data.json');
//  parse the json
  articles = JSON.parse(articles);

//  first articles is what you want to name the key, 
//  second coorisponds with articles 
//  from variable defined in lines above 
  res.render('articles/index.ejs', { articles: articles });
});

// render articles/new page
app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

//  post the new title entry to the articles array and page
app.post('/articles', function(req, res) {
//  get articles array of data.json
  var articles = fs.readFileSync('./data.json');
// parse the json
  articles = JSON.parse(articles);
//  push the new article to the array
  articles.push(req.body);
//  re-write the file and stringify it
  fs.writeFileSync('./data.json', JSON.stringify(articles));
//  redirect to the articles page
  res.redirect('/articles');
});

//  animal by index
app.get('/articles/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);

  var articleToShow = articles[req.params.idx];
  res.render('articles/show.ejs', {articles: articleToShow});
});

app.get('/about', function(req, res) {
  res.render('about.ejs');
});

app.get('/contact', function(req, res) {
  res.render('contact.ejs');
})

//  listener for particular port
app.listen(3100);