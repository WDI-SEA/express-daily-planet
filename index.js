var express = require('express');
// var url = require('url');
var bodyParser = require('body-parser')
var app = express();



var articles = [
  {title: 'SUPERMAN RETURNS!', body: "It's a bird! It's a plane! It's... Superman's highest profile gig in a long time? Starting next month, the Man of Steel will take up residence at USA Today, appearing in a beautiful new weekly strip."}, 
  {title: "SUPERMAN'S IDENTITY REVEALED", body: 'Man of Steel dwelt amoung us as Daily Planet Reporter Clark Kent'}, 
];


app.set('view engine', 'ejs');
app.use("/public",express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/about'));

app.use( bodyParser.urlencoded({extended: false}) );

app.get('/',function(req,res){
  res.render('index');
});

app.get('/site/about', function(req, res) {
  res.render('site/about');
});

app.post('/articles', function(req, res) {
  articles.push(req.body);

  res.redirect('/articles');
});


app.get('/articles', function(req, res) {
  res.render('articles/index', {eachArticle: articles});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

app.get('/articles/:index', function(req, res) {
  var articleIndex = parseInt(req.params.index);

  res.render('articles/show', {myArticle: articles[articleIndex]});
});

// app.get('/articles', function(req, res) {

//   var url_parts = url.parse(request.url, true)
//   var query = url_parts.query;
//   console.log(query);

//   res.render('articles', {articles:articles});
// });


app.listen(3000);




