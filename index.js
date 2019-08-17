//Require the stuff I need, make any global variables I need
var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

//Middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'));
//
//Controlla
app.use('/articles', require('./controllers/articles'));

//Route
app.get('/', function(req, res){
  res.render('index.ejs');
});


// listen
app.listen(3000);
