var express = require("express");	//the framework
var bodyParser = require("body-parser"); //enables us to read post variables
var fs = require("fs");	//enables us to read and write to files

var app = express();

app.use(bodyParser.urlencoded({ extended: false}));  //enables us to read post variables from the request
app.set("view engine", "ejs");

// app.use(express.static(''));

//=========================================//







app.get("/", function(req, res){
    res.render("index");

});


app.get('/articles', function(req, res){

	var articlesJson = fs.readFileSync('./data.json');
	var parsedArticles = JSON.parse(articlesJson);
	
	res.render("./articles/index", { articles: parsedArticles })
	

});


app.get('/articles/new', function(req, res){
  res.render('./articles/new');
});

app.post("/articles", function(req, res) {
    var articlesJson = fs.readFileSync("./data.json");
    var parsedArticles = JSON.parse(articlesJson);
    parsedArticles.push(req.body);
    fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));
    res.redirect('/articles');
});

app.get('/articles/:index', function(req, res){
    var articlesJson = fs.readFileSync("./data.json");
    var parsedArticles = JSON.parse(articlesJson);
   
    var id = parseInt(req.params.index);

    res.render('articles/show', { myArticle: parsedArticles[id]});
});


app.listen(3000);