//require dependencies
const express = require('express');
const ejslayouts = require('express-ejs-layouts');
const bodyParser = require("body-parser");
const app = express();

//middleware
app.set('view engine', 'ejs');
app.use(ejslayouts);
app.set('layout', 'index.ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public/'));

//controllers
app.use('/articles', require('./controllers/articles.js'));

//testing home route
app.get('/', function(req, res){
	res.render('site/home.ejs');
});

app.get('/about', function(req, res){
	res.render('site/about.ejs');
});

app.get('/contact', function(req, res){
	res.render('site/contact.ejs');
});

//Listen on port 3000
app.listen(3000);