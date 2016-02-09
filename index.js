var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/site')); //static pages still need work

var articles = [
	{title: 'Futurama', character: 'Bender', body: 'Bite my shiny metal ass!'},
	{title: 'Archer', character: 'Archer', body: 'Cry havoc and let slip the hogs of war.'},
	{title:'South Park', character:'Randy', body:'Oh, they would love it! A sport where safety is all that matters? How about we call it sarcastaball?!' },
	{title:'The Simpsons',  character:'Homer', body:'You tried your best and you failed miserably. The lesson is, Never try'}
];

// view: views/index.ejs
// purpose: Serve the homepage of your site.
app.get("/",function(req,res){
  res.render('index.ejs');
});

// get /articles
// view: views/articles/index.ejs
// purpose: displays a list of all articles
app.get('/articles', function(req, res) {
	res.render('articles/index.ejs', {articles: articles});
});

// get /articles/new
// view: views/articles/new.ejs
// purpose: displays a form that users use to create a new article
app.get('/articles/new', function(req, res){
	res.render('articles/new.ejs')
});

// post /articles
// view: none (redirects to /articles after the article is created)
// purpose: creates a new article (adds to articles array)
app.post('/articles', function(req, res) {
	articles.push(req.body);
	res.redirect('/articles');
});
// get /articles/:id
// view: views/articles/show.ejs
// purpose: find an article by id in the array of articles and display it.
app.get('/articles/:idx', function(req, res){
	var articleIdx = parseInt(req.params.idx);//what is parseInt and params
	res.render('articles/show.ejs', {article: articles[articleIdx]});
});

app.listen(3000)