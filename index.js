var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: false}));
 
app.get('/', function(req, res) {
  res.render('index');
});

// app.get('/articles', function(req, res) {
//   var fileContents = fs.readFileSync("./data.json");
//   fileContents = JSON.parse(fileContents);
//   res.render('articles/index', {articles: fileContents});
// });

app.get('/articles', function(req, res) {
    var search = req.query.search;
    var fileContents = fs.readFileSync("./data.json");
    fileContents = JSON.parse(fileContents);
    if (search) {
        fileContents = fileContents.filter(function(article) {
            if (article.title.search(search) !== -1 || article.body.search(search) !== -1) {
                return true;
            } else {
                return false;
            }
        });
    };
  res.render('articles/index', {articles: fileContents});
});

app.get('/about', function(req, res) {
  res.render('site/about');
});

app.get('/contact', function(req, res) {
  res.render('site/contact');
});

app.get('/new', function(req, res) {
  res.render('articles/new');
});

app.post('/articles', function(req, res) {
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  fileContents.push(req.body);
  fs.writeFileSync('./data.json', JSON.stringify(fileContents));
  res.render('articles/index', {articles: fileContents});
});

app.get('/show/:id', function(req, res) {
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  var articleIndex = parseInt(req.params.id);
  res.render('articles/show', { article : fileContents[articleIndex] });
});

app.listen(3000);


//