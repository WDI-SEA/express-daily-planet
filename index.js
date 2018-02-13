var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs'); //setting up ejs
app.use(bodyParser.urlencoded({extended: false})); //setting up body-parser
app.use(express.static('public'))

app.get('/', function(req, res) {
  console.log("Does nodemon know about this?");
  res.render("site/index");
});

app.get('/articles', function(req, res) {
  var fileContents = fs.readFileSync('./data.json'); //grab the contents
  fileContents = JSON.parse(fileContents); //parse that content data & store it for use
  res.render("articles/index", {articles: fileContents});
});

app.get('/articles/new', function(req, res) {
  res.render("articles/new");
});

app.post('/articles/new', function(req, res) {

  var fileContents = fs.readFileSync('./data.json'); //grab the contents
  fileContents = JSON.parse(fileContents);
  fileContents.push(req.body); //req.body is the form contents it's pulling out
  //var newArticle = res.send(req.body); //pull the data entered into the form, then show that data to the user back. it's holding it.
  fs.writeFileSync('./data.json', JSON.stringify(fileContents));
  res.redirect('/articles'); //add new article to data array from Sean
});

app.get('/about', function(req, res) {
  res.render("site/about"); //simply shows the about page when someone requests it
});

app.get('/articles/:idx', function(req, res) { //user is asking for a certain number
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents); //parse the data and overwrite that variable
  //get the array index from the url params up top
  var articleIndex = parseInt(req.params.idx); //this request comes in as a string, so we parse it
  res.render('articles/show', {myArticle: fileContents[articleIndex]});
});

app.get('/contact', function(req, res) {
  res.render("site/contact"); //simply shows the about page when someone requests it
});

//writing to a file. read the data, write the data, then stringify it all back.
//data.push then we stringify it
// var fileContents = fs.readFileSync('./data.json');
// var data = JSON.parse(fileContents);
// fs.writeFileSync('./data.json', JSON.stringify(data));

app.listen(3000);
