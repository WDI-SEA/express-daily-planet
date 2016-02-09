var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
  {title: 'Article 1', body: 'this is the first article body'},
  {title: 'Article 2', body: 'this is the second article body'},
  {title: 'Article 3', body: 'this is the third article body'},
  {title: 'Article 4', body: 'this is the fourth article body'},
  {title: 'Article 5', body: 'this is the fith article body'},
  {title: 'Article 6', body: 'this is the sixth article body'}
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/',function(req,res){
  res.render('index.ejs');
});

app.get('/articles', function(req, res){
	res.render('articles/index.ejs', {articles: articles});
});

app.get('/articles/new', function(req, res){
	res.render('articles/new.ejs');
});

app.get('/about', function(req, res){
	res.render('site/about.ejs');
});

/* - This was my attempt as making a static page
for the about page. I couldnt get it to work.
app.use('/about', express.static(__site/about.ejs + '/about'));
*/

app.get('/contact', function(req, res){
	res.render('site/contact.ejs');
});

/*- This was my attempt as making a static page
for the contact page. I couldnt get it to work.
app.use('/about', express.static(__site/contact.ejs + '/contact'));
*/

app.post('/articles', function(req, res){
	articles.push(req.body);
	res.redirect('/articles');
});

app.get('/articles/:idx', function(req, res) {
  var articleIdx = parseInt(req.params.idx);
  res.render('articles/show.ejs', {article: articles[articleIdx]});
});

app.listen(3000);