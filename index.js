var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var articles = [
	{title: 'Article Title', body: 'This is where the body of the article goes.'}
];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get("/",function(req,res){
  res.render('index.ejs');
});

app.listen(3000);