var express = require('express');
var app = express();

app.get("/",function(req,res){
  res.render('index.ejs');
  res.send('All is well');
});

app.listen(3000);