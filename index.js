var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get("/",function(req,res){
  res.send('HELLO TACO!!!');
});



app.listen(3000);