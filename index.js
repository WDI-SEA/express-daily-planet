var express = require("express"); //to be able to use express, eg. the Framework
var bodyParser = require("body-parser"); //to be able to use post - read post variables
var fs = require("fs"); //enable us to use fs to read and write to/from files
var ejsLayouts = require("express-ejs-layouts"); //enables us to use a layout
var fileContents = fs.readFileSync("./data.json");
var parsedArticles = JSON.parse(fileContents);

var app = express();

app.use(bodyParser.urlencoded({extended: false})); //enables us to read post variables from the req
app.set("view engine", "ejs");
app.use(ejsLayouts);

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get("/articles", function(req, res) {
  //Get data from data.json
  var articlesFromJsonFile = fs.readFileSync("./data.json");
  //parsing the data into a json format we can understand
  var parsedArticles = JSON.parse(articlesFromJsonFile); //need to read the JSON file
  //Render movies.ejs (inside layouts.js) with the movies object passed into it
  res.render("./articles", { articles: parsedArticles });
});

app.get("/articles/new", function(req, res) {
  res.render("./articles/new");
});

app.get("/about", function(req, res) {
  res.render("about.ejs");
});

app.get("/contact", function(req, res) {
  res.render("contact.ejs");
});

app.get("/articles/:id", function(req, res) {
  var id =  req.params.id - 1;

  if(isNaN(id)){
    res.send("error, not a number")
  } else if (id >= parsedArticles.length) {
    res.send("error, there is not that many articles")
  } else if (id < 0) {
    res.send("error, please enter a positive number")
  } 
  else { 
    res.render("articles/show", { title: parsedArticles[id].title, content: parsedArticles[id].body} );
  }
});

app.post("/articles", function (req, res){
  // console.log(req.body);
  // res.send("Success");
  var fileContents = fs.readFileSync("./data.json"); //Get the data in data.json
  //Parse it
  var parsedArticles = JSON.parse(fileContents);
  //Add our new movie to the data
  parsedArticles.push(req.body);
  //Write the new data back out (stringify)
  fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));
  //We need to send a response. In this case, redirect to / page
  res.redirect("./articles");
});


//Listen on preferred port
app.listen(3000);