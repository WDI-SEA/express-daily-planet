// Require - set globals
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var path = require('path');

var app = express();

//Set up and use statements to set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

// Create Public
app.use(express.static(path.join(__dirname, '/public')));

// Controller 
app.use('/articles', require('./controllers/articles'));
app.use('/static', require('./controllers/subpages'));


//Routes
app.get('/', function(req,res){
	res.render('index');
});


//Listen on port 3000
app.listen(3000);