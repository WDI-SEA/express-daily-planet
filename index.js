var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
// app.use(bodyParser.unlencoded({extended: false}));
app.use(ejsLayouts);
//controllers
app.use('/articles', require('.controller/articles'));

app.get('/', function(req, res) {
  res.render('home');
});
// app.get('/articles', function(req, res) {
//   res.render('index');
// });
// app.get('/views/articles', function(req, res) {
//   res.render('new');
// });
app.listen(3000)
