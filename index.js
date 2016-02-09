var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('staticfiles'));

var articles = [
  {title: "HOLOGRAPHY MAKES ULTRA-TOXIC FUSION GAMBIT SAFE FOR WORKERS, COMMUNITY, DOE REP ASSURES METHUEN PTA", body: "Kmartish plastic oil derricks all bobbing fellatially parade of lesbian folk singers deployed a sensitive-slash-pained expression my initial error in this latter regard. [1]  And nothing was perfunctory again let\'s for a second imagine transdermal motion-sickness prophylaxis feral hamster incursion experialist shuffle. [2]  Somebody else\'s ear-oil remarkable postcoital anecdote, a total unallergy to gazes crunchy, animal hair have retreated to the warm distance. Savagely and repeatedly wedgied when you come right down to it prima facie OK, near-Himalayan condescension, meta-stuff. Granted the mangled pieties of BusinessSpeak wearing neither sunglasses nor a look of Dickensian oppression, near an umbrella but not in the actual shade of the umbrella, combination thud and kertwang."},
  {title: "FED WORKERS PROTEST RANDOM FINGERNAIL-HYGIENE SCREENS", body: "Crunchy, animal hair lack the oracular foresight of Pynchon, ovaloid mammarial bags, espial mendacious pantomime. [3]  Unwittingly teratoid meta-stuff, too darn good to ablate type of thing on another, deeper level to recognize that it\'s total horseshit. Making A Statement granted experialist shuffle, feral hamster incursion the mangled pieties of BusinessSpeak. [4]  Feeling all ungenerous and greedy thoroughgoingly as is interpolatively demonstrated below spanked pink of the head of his thingie pericardium-piercer. Nonchalent verbal sangfroid and nothing was perfunctory again ideal time for a sneeze, empty apian drone of the dial tone oil derricks all bobbing fellatially."},
  {title: "FREAK STATUE OF LIBERTY ACCIDENT KILLS FED ENGINEER", body: "BRAVE MAN ON CRANE CRUSHED BY 5 TON CAST IRON BURGER"},
  {title: "ANOTHER LOVE CANAL?", body: "TOXIC HORROR ACCIDENTALLY UNCOVERED IN UPSTATE NEW HAMPSHIRE"}
];

app.get("/",function(req, res){
  res.render('index.ejs');
});

app.get("/about",function(req, res){
  res.render('site/about.ejs');
});

app.get("/contact",function(req, res){
  res.render('site/contact.ejs');
});

app.get("/articles",function(req, res){
  res.render('articles/index.ejs', {articles: articles});
});

app.post('/articles', function(req, res) {
	articles.push(req.body);
	res.redirect('/articles');
});

app.get("/articles/new",function(req, res){
  res.render('articles/new.ejs');
});

app.get('/articles/:id', function(req, res) {
	var articleId = parseInt(req.params.id);
	res.render('show.ejs', {article: articles[articleId]});
});

app.listen(3000);