var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/images'));
app.use(express.static(__dirname + '/css'));
app.use('/static', express.static(__dirname + '/public'));

var articles = [
  {title: 'Were-lizard Turns Into Man During Full Moon', body: 'Lizard-man bit by human struck with curse'},
	{title: 'Woman eaten by pet cats', body: 'Cat lady turned into cat food.  More news later.'},
	{title: 'Eating Bacon is Healthy!', body: 'Apparently cured/smoked meets are the secret to a long life. According to new academic studies.'}
];

//displays main page
app.get('/', function(req, res){
	res.render('index.ejs');
});

//displays all articles
app.get('/articles/', function(req, res){
	res.render('articles.ejs', {articles: articles});
})

//displays page where user can add new article
app.get('/articles/new', function(req, res){
	res.render('newArticle.ejs', {articles: articles});
})

//posts new article to articles page
app.post('/articles', function(req, res){
	articles.push(req.body);
	res.redirect('/articles')
})

//displays list of articles /showpage
app.get('/articles/:idx', function(req, res){
	var articleIdx = parseInt(req.params.idx);
	res.render('showArticle.ejs', {article: articles[articleIdx]});
});

//display contact page
app.get('/about/', function(req, res){
	res.render('about.ejs');
})

app.get('/contact', function(req, res){
	res.render('contact.ejs');
})

app.listen(3000);