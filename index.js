var express = require('express');
var bodyParser = require('body-parser');
var ejsLayOuts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayOuts);

app.use('/articles', require('./controllers/articles'));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(3000);
