var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

var db = require("./models");

//"set" and "use" statements to set up middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname, '/public/'));

//Controllers
app.use('/articles', require('./controllers/articles'));

//Serve the homepage of your site.
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(3000);