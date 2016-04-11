var express = require('express');
var app = express();

var articles = [
{title: 'Lex Luthor strikes again!', body: 'Why is he after us?'},
{title: 'Lex Luthor strikes!', body: 'Is he partially lightning?'},
{title: 'Batman V Superman', body: 'Actually a super boring fight'},
{title: 'Staff reporters wed!', body: 'Lois Lane hospitalized with broken pelvis on honeymoon'},
{title: 'Spiderman?', body: 'At least we are not New York right?'},
{title: 'Kryptonite Taste Test', body: 'Staff reporter Clark Kent gives them two thumbs down.'}];

app.get("/",function(req,res){
  res.render('index.ejs');
  console.log('All is well');
});

app.get("/articles", function(req, res) {

});

app.listen(3000);