var express = require('express');
var bodyParser = require('body-parser'); 
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

//Link to controller
app.use('/articles', require('./controllers/articles'));

// Declare routes 
app.get('/', function(req, res){
	res.render('index');
});

app.listen(3000);
