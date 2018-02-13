var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));


//Serve the homepage
app.get('/', function(req, res) {
  console.log('Does nodemon work?');
  res.render('site/index');
});

//Displays a list of articles
app.get('/articles', function(req, res) {
  var story = fs.readFileSync('./data.json');
  story = JSON.parse(story);
  res.render('articles/index', { articles: story });
});

//Displays a form that users use to create a new article
app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

//Creates a new article and saves the file in an array
app.post('/articles/new', function(req, res) {
  var newStory = req.body;
  newStory = [newStory];
  var data = fs.readFileSync('./data.json');
  data2 = JSON.parse(data);
  final = data2.concat(newStory);
  fs.writeFileSync('./data.json', JSON.stringify(final));
  res.redirect('/articles');
});

//Find an article by id from the array
app.get('/articles/:idx', function(req, res) {
  var story = fs.readFileSync('./data.json');
  story = JSON.parse(story);
  var storyIndex = parseInt(req.params.idx);
  res.render('articles/show', { thisStory: story[storyIndex] });
});

//Create an about page
app.get('/about', function(req, res) {
  res.render('site/about');
});

//Create a Contact Us page
app.get('/contact', function(req, res) {
  res.render('site/contact');
})


app.listen(3000);
