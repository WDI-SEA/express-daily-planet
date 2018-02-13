var express = require("express");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
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

app.get('/articles/:id', function(req, res) {
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  var articleIndex = parseInt(req.params.id);
  res.render('articles/show', { article : fileContents[articleIndex] });
});

app.delete('/articles/:id/destroy', function(req, res) {
  console.log("In the DELETE /articles/:idx/destroy route...");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  fileContents.splice(parseInt(req.params.id), 1);
  fileContents = JSON.stringify(fileContents);
  fs.writeFileSync('./data.json', fileContents);
  res.send({message: "success"});
})

app.get('/articles/:id/edit', function(req, res) {
  console.log("In the get /articles/:id/edit route...");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  var articleIndex = parseInt(req.params.id);
  res.render('articles/edit', { article : fileContents[articleIndex], id : req.params.id });
})

app.put('/articles/:id', function(req, res) {
  console.log("In the PUT /articles/:id route...");
  var fileContents = fs.readFileSync("./data.json");
  fileContents = JSON.parse(fileContents);
  fileContents.splice(req.params.id, 1, req.body);
  fileContents = JSON.stringify(fileContents);
  fs.writeFileSync('./data.json', fileContents);
  res.send({message: "success"});
})

app.listen(3000);


//