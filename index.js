//Requires
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
var data = [];
var fileContents = fs.readFileSync('./data.json');
data = JSON.parse(fileContents);
    
//Set/Use Statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

//Routes

//PURPOSE: Serve the homepage of your site.

app.get("/", function(req, res) {
  res.render('site/index');
});

//PURPOSE: displays a list of all articles.

app.get("/articles", function(req, res) {
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);

  res.render('articles/index', {articles: data});
});

//PURPOSE: displays a form that users use to create a new article.

app.get("/articles/new", function(req, res) {
  res.render('articles/new');
});

//PURPOSE: creates a new article 
//(adds to articles array and saves the file).


app.post('/articles', function(req, res) {
  //fileContents equals whatever is my json file.
  var fileContents = fs.readFileSync('./data.json');
  //converts the data in the json file into an array.
  var articles = JSON.parse(fileContents);
  //adding the form info to the json array (req.body contains form input)
  articles.push(req.body);
  //overrites the JSON info with the JSON info+ the form input.
  fs.writeFileSync('./data.json', JSON.stringify(articles));
  //directs you to the get request(articles page)
  res.redirect('/articles');
 });

//PURPOSE: redirect to about page

app.get("/about", function(req, res) {
  res.render('site/about');
});

//PURPOSE: redirect to about page

app.get("/contact", function(req, res) {
  res.render('site/contact');
});



//PURPOSE: find an article by id in the array
// of articles and display it.

app.get('/articles/:index', function(req, res) {
  res.render('articles/show', {myArticles: data[parseInt(req.params.index)]});
});



//Listen
app.listen(3000);


