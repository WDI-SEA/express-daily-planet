// requires
var express = require("express");
var path = require('path');
var fs = require('fs');
var bodyParser = require("body-parser");
var port = 3000;
var ejsLayouts = require("express-ejs-layouts");

// app variables
var app = express();
app.use(express.static(path.join(__dirname, 'static')));

var getData = function(){
  var fileContents = fs.readFileSync('./data.json');
  var data = JSON.parse(fileContents);
  var id = 0;
  data.forEach(function(article) {
  	if (article !== null) {
	 		article.id = id;
  	}
  	id++;
  });
  return data;
};
var saveData = function(data){
  fs.writeFileSync('./data.json', JSON.stringify(data));
};
// set/use statements
app.set("view engine", "ejs");
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({extended: false}));

// Serve the homepage of your site.
app.get('/', function(req, res) {
  res.render("index", {data: getData()});
});

//displays a list of all articles
app.get('/articles', function(req, res) {
  var keyword = req.query.q;
  var data = getData();
   
  if (keyword) {
    data = data.filter(function(article) {
    	if(article === null){
    		return false;
    	}
    	keyword = keyword.toLowerCase();
    	article.title = article.title.toLowerCase();
   		article.body = article.body.toLowerCase();
      return article.title.includes(keyword) ||
        article.body.includes(keyword);
    });
  }
  res.render("articles/index", {data: data});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var data = getData();
  data.push(req.body);
  saveData(data);

  var path = '/articles';
  res.redirect(path);
});

app.get('/article/:id', function(req, res) {
  var data = getData()[req.params.id];
  res.render('articles/show', {data: data});
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

// Delete
app.delete('/article/:id', function(req, res) {
  var data = getData();

  // Set the index to null so every other position isn't screwed up.
  data[req.params.id] = null;
  saveData(data);

  res.send(req.body);
});

app.get('/article/:id/edit', function(req, res) {
  var data = getData()[req.params.id];
  data.id = req.params.id;
  res.render('articles/edit', {data: data});
});

app.put('/article/:id', function(req, res) {
  console.log("body:", req.body);

  var data = getData();
  data[req.params.id] = req.body;
  saveData(data);

  res.send(req.body);
});

app.listen(port);
