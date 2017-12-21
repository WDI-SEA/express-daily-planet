var express = require('express');
var bodyParser = require('body-parser'); 
var ejsLayouts = require('express-ejs-layouts');
var app = express();
var fs = require('fs');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Link to CSS
app.use(express.static('public'));

//Link to controller
app.use('/articles', require('./controllers/articles'));

// Declare routes 
app.get('/', function(req, res){
	res.render('site/home');
});

app.get('/about', function(req, res){
	res.render('site/about');
});

app.get('/contact', function(req, res){
	res.render('site/contact');
});



app.listen(3000);
