var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');

var app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);
app.use('/articles', require('./controllers/articles'));


app.get('/', function( req,res ){
	res.render('site/home');
});

app.listen(3000);