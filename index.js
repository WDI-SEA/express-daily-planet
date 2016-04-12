var express = require('express');
// var bodyParser = require('body-parser');
var app = express();


var articles = [
	{title: 'Superman \'s Secret Identiy Revealed!', body: 'Superman, the lone survivor of the doomed planet Krypton and earth\'s most recognizable superhero, led a double life'},
	{title: 'Superman Fails to Capture Jem Theif', body: 'An armored truck carrying precious jewels approaches Monument Circle, on it\'s way to the Metropolis Jewelry Exchange. But a sorcerer supervillain called the Warlock is waiting.'},
	{title: 'Mystery Hero Saves Space Plane', body: 'An enigmatic and powerful new superhero emerged earlier today to the cheers of Metropolis\' citizens after saving the crew and passengers of the astroplane Constitution' }
];

app.get("/",function(req,res){
  res.render('index.ejs');
});

app.get("/articles", function (req, res){
	res.render('Articles/index.ejs', {myArticles: articles});
})


app.listen(3000);