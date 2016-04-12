var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended: false}) );

var articles = [
  {title: 'The world is dying.', body: 'this is the first article body'},
  {title: 'Locust are the new shrimp!', body: 'Don’t ‘sky prawns’ sound lovely? What if you have hundreds of thousands of small insubstantial insects outside, swarming all at once and eating your crops? And then you had a really big bucket, and an open mind to ‘new’ foods? Could it perhaps be a case of ‘lose one crop, gain another’?'},
  {title: 'Hakuna Matata', body: 'Just eat bugs! Dont worry about it, theres no time for worries. When I say theres no time, I mean that meat consumption is a huge contributor to global warming which is killing our planet.'},
  {title: 'Meat kills', body: 'Meat fuckin kills yo! Cows produce soooooooo much methane.'},
  {title: 'The hideous truth behind the McChicken', body: 'Do you even know whats in it? Chicken? Are you sure?'},
  {title: 'Don\'t be fooled by the government!', body: 'this is the first article body'},
];


app.get("/",function(req,res){
  res.render('index.ejs');
});

app.get('/articles', function(req, res) {
  // var url_parts = url.parse(req.url, true);
  // var query = url_parts.query;
  // var searchTerm = query.q;

  // if (searchTerm) {
  //   res.render('articles/index', {myArticles: articles});
  // } else {
  //   var results = [];
  //   articles.forEach(function(article) {
  //   var isTitleMatch = article.title.indexOf(searchTerm) != -1;
  //   var isContentMatch = article.body.indexOf(searchTerm) != -1;
  //   if(isTitleMatch || isContentMatch) {
  //     results.push(article)
  //   }
  // })
  //   res.render('articles/index', {myArticles: articles});
  // };
  res.render('articles/index', {myArticles: articles});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new')
});

app.post('/articles', function(req, res) {
  articles.push(req.body);

  res.redirect('/articles');
});

app.get('/articles/:index', function(req, res) {
  var articleIndex = parseInt(req.params.index);

  res.render('articles/show', {myArticle: articles[articleIndex]});
});

app.get('/site/about', function(req, res) {
  res.render('site/about');
})

app.get('/site/contact', function(req, res) {
  res.render('site/contact');
})



app.listen(3000);