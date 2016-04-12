var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
  {title: "'DODGY DAVE' GRILLED IN PARLIAMENT", body: 'this is the first article body'},
  {title: "These 8 Senate Races Are Shaping Up To Be Barnburners", body: 'this is the second article body'},
  {title: "John Oliver Explains Why Your Credit Report Is A Total Nightmare", body: 'this is the third article body'},
];

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/about',function(req, res){
  res.render('site/about.ejs')
});

app.get('/contact',function(req,res){
  res.render('site/contact.ejs')
});





app.get('/articles',function(req, res){
  res.render('articles/index.ejs', {myArticles: articles});
});

app.get('/articles/new',function(req, res){
  res.render('articles/new.ejs');
});

app.post('/articles',function(req, res){
  articles.push(req.body);
  res.redirect('/articles');
});

app.get('/articles/:index', function(req, res){
  var articleIndex = parseInt(req.params.index);
  res.render('articles/show', {myArticle: articles[articleIndex]});
});



app.listen(3000);