//requires
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express(); //make my app

//set and use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

///////////////////ROUTES
//Home Page
app.get('/', function(req, res) {
  res.render('index.ejs');
});

///List of articles
app.get("/articles", function(req, res){
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  res.render("articles/index", {myArticles: data});
});

//form that users use to create a new article
app.get("/articles/new", function(req, res){
  res.render("articles/new",{});
});

//post created article to article JSON object
app.post("/articles", function(req, res){
  //read JSON
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  //Push Object from form
  data.push(req.body);
  //save to data.JSON
  fs.writeFileSync('./data.json', JSON.stringify(data));
  res.redirect('/articles');
});

/////////////////////ABOUT AND CONTACT PAGE!!!/////////////////////
app.get('/about', function(req, res) {
  res.sendFile('/about.ejs');
});
app.get('/contact', function(req, res) {
  res.sendFile('/contact.ejs');
});



///find an article by id in the array of articles and display it.
app.get("/articles/:id", function(req, res){
  //read JSON
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);

  res.render('articles/show', {myArticles: data[parseInt(req.params.id)]});

});


//listen
app.listen(3000);











