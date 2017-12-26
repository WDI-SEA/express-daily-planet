var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('layout');
});

app.use('/articles', require('./controllers/articles'));
app.use('/site', require('./controllers/site'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(ejsLayouts);

app.listen(3000);