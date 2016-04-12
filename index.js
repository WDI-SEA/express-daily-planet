var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path')


var articles = [
{title: 'Lex Luthor strikes again!', byline: "Lois Lane", body: 'Why is he after us? Youve found it. Now a chain-smoking, self-destructive alcoholic with a mean inferiority complex, Jones is the owner and sole employee of Alias Investigations - a small, private-investigative firm specializing in super-human cases. Abandoned by his mother, Matt Murdock was raised by his father, boxer Battling Jack Murdock, in Hells Kitchen. Iron Man, Thor, Captain America and the rest of Earths Mightiest Heroes unite to stand against the threats none can face alone.'},
{title: 'Lex Luthor strikes!', byline: "Clark Kent", body: 'Is he partially lightning?  Join Spider-Man and some of his Amazing friends as they tackle threats that only a mighty Marvel team-up can handle. Iron Man, Thor, Captain America and the rest of Earths Mightiest Heroes unite to stand against the threats none can face alone. Looking for the one superhero comic you just have to read. Thrust into the midst of a conspiracy that reaches the highest levels, has Jessica burned too many bridges to turn to old friends for help.'},
{title: 'Batman V Superman', byline: "Peter Parker", body: 'Actually a super boring fight. The instructors at Avengers Academy hope to steer these super-powered and highly-troubled teens in the right direction, but twists and turns abound. While others have described Thor as an over-muscled, oafish imbecile, hes quite smart and compassionate. Will they be the next generation of Earths Mightiest Heroes or the greatest threat to the Marvel Universe. The Avengers return.'},
{title: 'Staff reporters wed!', byline: "Peter Parker", body: 'Lois Lane hospitalized with broken pelvis on honeymoon. The Avengers return. Iron Man, Thor, Captain America and the rest of Earths Mightiest Heroes unite to stand against the threats none can face alone. Abandoned by his mother, Matt Murdock was raised by his father, boxer Battling Jack Murdock, in Hells Kitchen. Earths Mightiest Heroes reunite with their biggest guns at the forefront to take on familiar enemies and new threats alike.'},
{title: 'Spiderman?', byline: "Special Correspondent Bruce Wayne", body: 'At least we are not New York right? Cables the son of original X-Man Scott Summers and the clone of Jean Grey who grew up in a war-torn future ruled by Apocalypse. Amazing Spider-Man is the cornerstone of the Marvel Universe. The Odd Couple of the Marvel Universe, Cable is a soldier from the future, fighting for peace today while Deadpool is the wisecracking, gun-for-hire by-product of the military’s Weapon X program. This is where youll find all the big-time action, major storylines and iconic Spider-Man magic youd come to expect from the Wall-Crawler'},
{title: 'Kryptonite Taste Test', byline: "Clark Kent", body: 'Staff reporter Clark Kent gives them two thumbs down. At the dawn of the Heroic Age, the Avengers will assemble once again. Striker. Hazmat. Marvels mighty mutants go worldwide and beyond in this series following Cyclops, Wolverine, Beast, Emma Frost and more in their astonishing adventures.'}];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(path.join(__dirname, 'public')));


//homepage
app.get("/",function(req,res){
  res.render('index.ejs');
});

//lists articles
app.get("/articles", function(req, res) {
  res.render('articles/index', {myArticles: articles});
});

//lists articles
app.get("/articles?q=search+term", function(req, res) {
  var mySearch = "search+term";
  res.render('articles/search', {mySearch: articles.indexOf()});
});

//form for a new article
app.get("/articles/new", function(req, res) {
  res.render('articles/new');
});

//adds to articles array
app.post("/articles", function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

app.get("/articles/:id", function(req, res) {
  var articleId = parseInt(req.params.id);
  res.render('articles/show', {myArticles: articles[articleId]});
});

app.get("/about", function(req, res) {
  res.render('./site/about.ejs');
});

app.get("/contact", function(req, res) {
  res.render('./site/contact');
});


app.listen(3000);