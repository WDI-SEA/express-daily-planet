

//requires

var express = require("express");
var bodyParser = require("body-parser");
var fs = require('fs');

var app = express();

//sample code for below
//var fileContents = fs.readFileSync('./data.json');
//var data = JSON.parse(fileContents);
//fs.writeFileSync('./data.json', JSON.stringify(data));


// set and use statements
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));



//routes

//basic get to show index.ejs page
app.get('/', function(req, res) {
  //this doesn't refer to page, so it gets replaced, ref to index
  //res.send("Hello World");
  res.render("index");
});


//display list of all articles
app.get('/articles', function(req, res) {
  //get contents of data.json
  var fileContents = fs.readFileSync('./data.json');

  //parse the contents
  var data = JSON.parse(fileContents);

  //when rendering, pass data to it
  res.render('articles/index', {articles:data});
});


//post new articles, uses the form and text entries
app.post('/articles', function(req, res) {
  //console.log(req.body);
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);

  //console.log("post is called");

  data.push(req.body);

  //console.log(data);

  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('articles');
});


//find article by ID in the array of articles
app.get('/articles/:index', function(req, res) {
  var articlesIndex = parseInt(req.params.index);
  res.render('articles/index', {myArticle: articles[articleIndex]});
});



//listen
app.listen(3000);