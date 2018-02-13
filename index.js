var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));




app.get('/', function(req, res) {
	res.render('site/index');
})

app.get('/articles', function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	fileContents = JSON.parse(fileContents);
	res.render('articles/index', {articles: fileContents});
})

app.get('/articles/new', function(req, res) {
	res.render('articles/new');
})

//this route needs to be above idx one, or new becomes a variable
app.post("/articles", function(req, res) {
   var articles = fs.readFileSync("./data.json");
   articles = JSON.parse(articles); //after you parse it, it is an array
   articles.push(req.body); //req.body specifically connects to form data. sending the data related to this submit button only
   fs.writeFileSync('./data.json', JSON.stringify(articles));
   res.redirect('/articles')
})

app.get("/articles/:idx", function(req, res) {  //http://localhost:3000/animals/2
	var fileContents = fs.readFileSync("./data.json");
	fileContents = JSON.parse(fileContents);
	//get the array index from URL parses
	var articleIndex = parseInt(req.params.idx);
	res.render('articles/show', {myArticle: fileContents[articleIndex]});
});


app.get('/about', function (req, res) {
	res. render('site/about');
})


app.get('/contact', function (req, res) {
	res. render('site/contact');
})

app.listen(3000);