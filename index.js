var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var articles = [
	{name: 'New Rugby Star', content: 'Ben Gustafson becomes newest member of US national rugby team.'},
	{name: 'Democracy Fails', content: 'GA students choose room 4 vs room 2.'},
	{name: 'Man-bun In Progress', content: 'Gus has not cut his hair in a year'},
];

app.set('view engine', 'ejs');

app.get("/",function(req,res){
  res.render('index.ejs');
});

app.get('')

// app.get("/",function(req,res){
//   res.send('HELLO TACO!!!');
// });

app.listen(3000);