
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();



app.set('view engine', 'ejs');


app.get('/', function(req, res) {
  res.render('index.ejs');
});




app.listen(3000);