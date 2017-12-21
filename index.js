//declare NODE mods
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

var hitCount = 0;

//middleware setup statements
//enable access to CSS and imgs
app.use(express.static(__dirname + '/'));
app.use(ejsLayouts);
app.set('view engine', 'ejs');

//Routes! 
//when you access index/articles, it runs the ./controllers/articles.js script
app.use('/articles', require('./controllers/articles'));
app.use('/nav', require('./controllers/nav'));

app.get('/', function(req,res){
  hitCount++;
  console.log('Visit number: ', hitCount);
  //renders file from /views/articles/index
  res.render('articles/index');
});


//run listener
app.listen(3000);