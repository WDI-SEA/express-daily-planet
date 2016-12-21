// REQUIRES
var express = require('express'); 
var bodyParser = require('body-parser'); 
var fs = require('fs'); 


// GLOBAL VARIABLES
var app = express();

// USE OR GET STATEMENTS
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');




// DEFINE ROUTES/PATHS
app.get('/', function(req, res) {
  res.render('index');
});
	

app.get('/articles', function (req, res) {
	var articlesFromJson = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJson);
	res.render("./articles", { articles: parsedArticles })
});

app.get('/articles/new', function (req, res) {
	res.render('./articles/new');
});
app.post("/articles", function(req, res) {
	var fileContents = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(fileContents);
	parsedArticles.push(req.body);
	fs.writeFileSync("./data.json", JSON.stringify(parsedArticles));
	res.redirect('./articles');
});

app.get('/articles/:id', function (req, res) {
	var articlesFromJson = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJson);
	var id = parseInt(req.params.id);

  if(isNaN(id)){
    res.send("Error, what are are you doing? Do numbers")
  } else if (id >= parsedArticles.length) {
    res.send("Error, this isn't a big newspaper, not that many articles")
  } else if (id < 0) {
    res.send("Error, no negative articles!")
  } 
  else { 
	res.render('./articles/show', { title: parsedArticles[id].title, body: parsedArticles[id].body});
	}
});

app.get('/about', function (req, res) {
	res.render('about');
});

app.get('/contact', function (req, res) {
	res.render('contact');
});
// LISTEN ON PORT 3000
app.listen(3000);