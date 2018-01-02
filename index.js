var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var fs = require('fs');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  articles = JSON.parse(articles);
  res.render('articles/index.ejs', {articles: articles});
});

app.listen(3000);