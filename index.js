var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);

app.use('/articles', require('./controllers/articles'));
app.use('/aboutus', require('./controllers/about'));
app.use('/contact', require('./controllers/contact'));

app.get('/',function(req,res){
	res.render('./site/home');
});

app.post('/articles',function(req,res){
	var articles = fs.readFileSyn
})

app.listen(3000);