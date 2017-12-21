//Require the stuff I need make global variables
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');

var app = express();

//Set and Use statements to set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded( { extended: false}));
app.use(ejsLayouts);

//controller call articles file and pull whats in it
app.use('/articles', require('./controllers/articles'));

//Routes
//home 
app.get('/', function(req, res) {
 
  res.render('index.ejs');
});

//listen on port 3000
app.listen(3000);