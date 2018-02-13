var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));




app.get('/', function(req, res) {
	res.render('index.ejs');
})

app.get('/articles', function(req, res) {
	var fileContents = fs.readFileSync('./data.json');
	fileContents = JSON.parse(fileContents);
	res.render('articles/index', {articles: fileContents});
})

app.get('/articles/new', function(req, res) {
	res.render('articles/new');
})

app.post("/articles", function(req, res) {
	console.log("in the articles/new route");
	res.send(req.body); //it will read my form, grab the value of inputs
})

app.get("articles/:idx", function(req, res) {  //http://localhost:3000/animals/2
	var fileContents = fs.readFileSync("./data.json");
	fileContents = JSON.parse(fileContents);
	//get the array index from URL parses
	var articleIndex = parseInt(req.params.idx);
	res.render('/articles/new', {myArticle: articles[articleIndex]});
});


app.get('/about', function (req, res) {
	res. render('site/about');
})


app.get('/contact', function (req, res) {
	res. render('site/contact');
})

app.listen(3000);