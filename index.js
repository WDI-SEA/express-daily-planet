// Require the stuff needed, make global variables needed
var express = require('express');
var bodyParser = require('body-parser');
// var ejsLayouts = require('express-ejs-layouts');
var app = express();


// Set and use statements to set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false}));
// app.use(ejsLayouts);


// Controllers



// Setup Routes

app.get('/', function(req, res) {
  res.render('index.ejs');
  // res.send('HELLO TACO!!!');
});

// Listen on port 3000
app.listen(3000);