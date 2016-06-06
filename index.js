var express = require('express');
var bodyParser = require('body-parser');
var app = express(); //initializes web server



app.set('view engine', 'ejs'); // EJS= embedded javascript
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}) );

var articles = [
  {title: 'Hipsum', body: 'Schlitz tousled drinking vinegar, asymmetrical chambray ethical waistcoat aute semiotics. Duis synth venmo accusamus, YOLO mollit meditation lumbersexual aesthetic. Fingerstache cronut blog intelligentsia echo park synth, mumblecore officia drinking vinegar XOXO hammock cliche. Distillery et accusamus vegan shabby chic delectus fugiat. Readymade heirloom pitchfork bitters jean shorts. Occaecat fashion axe slow-carb, scenester sustainable selfies shoreditch fap tacos pinterest single-origin coffee. Irure ut culpa put a bird on it.'},
  {title: 'Ipsum', body: 'VHS veniam narwhal, ex laboris squid direct trade sustainable gochujang. Cardigan organic ullamco magna, est chicharrones ad ramps you probably havent heard of them. Listicle ramps freegan eiusmod keffiyeh everyday carry plaid. Do chillwave seitan tousled church-key celiac. Cred salvia actually, kale chips distillery franzen chia leggings next level ullamco blue bottle esse. Cardigan viral try-hard dolore fashion axe. Franzen fixie portland, freegan nesciunt synth sapiente YOLO listicle semiotics taxidermy narwhal vegan.'},
];


//home page
app.get("/",function(req,res) {
  res.render('index.ejs');
});
//articles page
app.get("/articles", function(req, res) {
  res.render('articles/index', {myArticles: articles})
});
//submit article page
app.get("/articles/new", function(req, res) {
  res.render('articles/new');
});
app.post('/articles', function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});
//article index page
app.get("/articles/:index", function(req, res) {
   var articleIndex= parseInt(req.params.index);
   res.render('articles/show', {myArticle: articles[articleIndex]});
});
//about page
app.get("/about", function(req, res) {
  res.render('site/about');
});
// contact page
app.get("/contact", function(req, res) {
  res.render('site/contact');
});

app.listen(3000); 



