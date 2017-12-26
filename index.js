// Require the stuff needed, make global variables needed
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
// Include fs (short for filesystem) at the top
var fs = require('fs');

// middleware to set up static directory
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


// Set and use statements to set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
app.use(ejsLayouts);


// Controllers
app.use('/articles', require('./controllers/articles'));

// Routes
app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res){
    res.render('about');
  });

app.get('/contact', function(req, res){
    res.render('contact');
});

// Listen on port 3000
app.listen(3000);