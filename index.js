// requires
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();

var fileContents = fs.readFileSync('data.json');
var data = [];
data = JSON.parse(fileContents);
//console.log(data);

//set and use statements
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.get("/", function(req, res){
  //res.send("hello");
  res.render("index", data);

});

app.get("/articles", function(req, res){
  res.render('articles/index', {myArticles: data});  
});

app.get("/articles/new", function(req, res){
  res.render('new');  
});

// POST 
app.post('/articles', function(req,res){
  //console.log(req.body);

  data.push(req.body);

  fs.writeFileSync('data.json', JSON.stringify(data));
  
  res.redirect('/articles');
});

//ABOUT
app.get("/site/about", function(req, res){
 
  res.render('about');  
});

// CONTACT
app.get("/site/contact", function(req, res){
 
  res.render('contact');  
});

app.get('/articles/:index', function(req, res){
  res.render('articles/show', {myArticles: data[parseInt(req.params.index)]});
});




// listen
app.listen(3000);







