var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

var articles= [
	{title: 'WDI Students at High Risk for Anxiety Disorders', body: 'New study finds that students in this fast-paced learning environment suffer anxiety disorders at much higher rate than the rest of the population.'},
	{title: 'Seattle freeze deemed myth', body: 'New transplants confirm that the chilly nature of natives is highly exaggerated.'},
	{title: 'Node is pretty tough', body: 'Local WDI student confirms this technology is tough to understand.'},
	{title: 'Post-project 1 hibernation complete', body: 'WDI students awoke today from their 48 hour slumber following many sleepless nights spent coding their first projects.'}]

//initial test of server root path
// app.get("/",function(req,res){
//   res.send('HELLO TACO!!!');
// });

//Set root path to display homepage
app.get("/",function(req, res) {
  res.render('index');
});

//Render the articles index page
app.get("/articles", function(req, res) {
  res.render('./articles/index', {articles: articles});
});

//Post a new article
app.post("/articles", function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

//Post a new article
app.get('/articles/new', function(req, res) {
	res.render('./articles/new');
})

app.get("/articles/:idx", function(req, res) {
	var articleIdx = parseInt(req.params.idx);
	res.render('./articles/show', {article: articles[articleIdx]});
});



app.listen(3000);