var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  console.log("Does nodemon work?");
  res.render("index");
});

app.get("/articles", function(req, res){
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render("articles/index", {articles: fileContents});
});

app.post("/articles", function(req, res){
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  var title = req.body.title
  var body = req.body.formBody
  var thing = {
    title: title,
    body: body
  }
  fileContents.push(thing);
  fs.writeFileSync('./data.json', JSON.stringify(fileContents));
  res.redirect("articles");
});

app.get('/articles/new', function(req, res){
  res.render('articles/new');
});

app.get('/articles/:id', function(req, res){
  var fileContents = fs.readFileSync('./data.json');
  fileContents = JSON.parse(fileContents);
  res.render('articles/show', {articles: fileContents[req.params.id]});
});

app.get('/about', function(req, res){
  res.render('site/about');
});

app.delete('/articles/:idx/destroy', function(req,res){
  console.log("In the DELETE /articles/:idx/destroy route...");
  // read from the file
  // parse the contents
  // splice the selected element out of the file contents
  // re-stringify the array and write it back to the file
res.send('blah"');
})

app.get('/articles/:id/edit', function(req, res) {
  console.log("In the GET /articles/:idx/edit route...")
  var fileContents = fs.readFileSync('./data.json');
  var index - req.params.idx;
  fileContents = JSON.parse(fileContents);
  res.render("articles/edit", {articles: fileContents[req.params.id]});

});

app.put('/articles/:idx', function(req, res){
  console.log("In the PUT /articles/:idx route");
  console.log(req.body);
  var articlesToEdit = req.params.idx;
  // read the fileContents
  // parse the fileContents
  // find the item at the selected index and update it
  // re-stringify the object and write to the fileContents
  res.send("yeah dawg!");
});

app.get('/contact', function(req, res){
  res.render('site/contact');
});





app.listen(3000);
