var express = require('express'); 
var bodyParser = require('body-parser');
var app = express(); 
var url = require('url'); //diff library

var articles = [
  {id: 0, title: 'BOOM', body: 'Boom shackalack hizzle my shizz platea the bizzle. Donec dapibizzle. Fo shizzle mah nizzle fo rizzle, mah home g-dizzle tellus urna, pretium boofron, we gonna chung ghetto, eleifend , nunc. Brizzle suscipizzle. Integizzle sempizzle dang sizzle purus.'},
  {id: 1, title: 'FUNKY', body: 'Crackalackin vitae turpis funky fresh you son of a bizzle bibendizzle stuff. Fo shizzle pulvinizzle away velizzle. Aliquam erat volutpizzle.'},
  {id: 2,title: 'MAMMASAY', body: 'Mammasay mammasa mamma oo sa for sure. Donizzle pizzle, est izzle mah nizzle aliquet, stuff sizzle ultricizzle sheezy, gangster ullamcorper urna the bizzle fizzle check it out.'},
  {id: 3,title: 'SAPIEN', body: 'Maecenas sapien pot, iaculizzle shizznit, cool sizzle, egestizzle tellivizzle, erizzle.'}
];


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

app.use(bodyParser.urlencoded({extended: false}) );

app.get('/',function(req,res){
  res.render('home.ejs');
});

app.get('/articles', function(req, res){ 
  if(!req.query.search) {
    res.render('articles/index.ejs', {myArticles: articles})
  }else {
    var query = req.query.search; // relates to name="search" in html form
    var results = [];
    for (var i =0; i < articles.length; i++) {
      if (articles[i].title.indexOf(query) !== -1 || articles[i].body.indexOf(query) !== -1) {
        results.push(articles[i]);
      }
    }
    res.render('articles/index', {myArticles: results});
  }
})

app.post('/articles', function(req,res){
  articles.push(req.body); //take the new obj and push in to animals array

  res.redirect('/articles') // to refresh the page - url
});

// app.get('/articles/new', function(req,res){
//   res.render('articles/new');
// });

app.get('/about', function(req,res){
  res.render('about');
})

app.get('/contact', function(req,res){
  res.render('contact');
})

//diff way to search using url lib
// app.get('/articles', function(req, res){
//   var url_parts = url.parse(req.url, true);
//   var query = url_parts.query;
//   var searchTerm = query.q;
//   var results = [];

//   if(!searchTerm) {
//     res.render('articles/index', {myArticles: articles});
//   } else {
//     articles.forEach(function(article) {
//     var isTitleMatch = articles.title.indexOf(searchTerm != -1;
//     var isContentMatch = articles.body.indexOf(searchTerm != -1;
//       if (isTitleMatch || isContentMatch) 
//       results.push(article);
//   } 
// });  
//     res.render("articles", {articles: results});
//  } 
// });











app.get('/articles/:index', function(req,res){
  var articleIndex = parseInt(req.params.index);
  console.log(articles, articleIndex);
  res.render('articles/show', {myArticles: articles[articleIndex]});
});




















app.listen(3000);