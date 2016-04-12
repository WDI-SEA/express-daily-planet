var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');
var app = express();

var articles = [
  {title: "'DODGY DAVE' GRILLED IN PARLIAMENT", body: "Occupy lo-fi fap, next level chia gentrify etsy beard microdosing meh flexitarian before they sold out man braid tattooed pug. Green juice ugh DIY, affogato VHS church-key viral godard humblebrag cray letterpress migas. Tousled blue bottle typewriter chicharrones tofu. Mlkshk fashion axe fanny pack, fingerstache seitan kitsch VHS DIY polaroid scenester. Mixtape YOLO pinterest mustache direct trade. Echo park vegan street art literally, cornhole fashion axe kombucha wolf shoreditch scenester craft beer typewriter. Gochujang chambray normcore, 3 wolf moon church-key skateboard chartreuse tattooed banh mi."},
  {title: "These 8 Senate Races Are Shaping Up To Be Barnburners", body: "Kickstarter ethical tote bag, taxidermy sriracha marfa whatever meh man bun you probably haven't heard of them gastropub organic. Twee meggings +1, biodiesel freegan kinfolk hoodie. Art party mumblecore asymmetrical distillery banjo irony. Ethical mumblecore church-key, gentrify waistcoat microdosing retro freegan. Kale chips tattooed ramps sriracha, direct trade distillery bicycle rights knausgaard intelligentsia deep v. Organic 90's celiac, hashtag try-hard sustainable narwhal semiotics put a bird on it distillery hammock pitchfork lumbersexual. Raw denim DIY neutra cardigan, craft beer austin freegan vinyl pug banjo direct trade kitsch helvetica before they sold out truffaut."},
  {title: "John Oliver Explains Why Your Credit Report Is A Total Nightmare", body: "Before they sold out pop-up tilde, vinyl umami portland jean shorts vice brunch four dollar toast messenger bag cliche mlkshk. Selvage narwhal yuccie chartreuse chambray roof party, shabby chic pinterest hashtag. Four dollar toast cliche sriracha leggings chillwave umami, ramps put a bird on it celiac scenester crucifix cronut 8-bit. Quinoa irony mixtape messenger bag, hoodie twee +1 biodiesel stumptown chia flannel VHS. VHS lo-fi irony celiac small batch, trust fund brooklyn XOXO ramps kombucha gochujang occupy wolf bitters etsy. Kombucha put a bird on it single-origin coffee raw denim, forage 90's tilde VHS. Cronut four dollar toast knausgaard portland, swag food truck cred pop-up gastropub."},
];

for (var i = 0; i <articles.length; i++){
  articles[i].id = i;
}

app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/about',function(req, res){
  res.render('site/about.ejs')
});

app.get('/contact',function(req,res){
  res.render('site/contact.ejs')
});





app.get('/articles',function(req, res){
  

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;


  var searchTerm = query.q;
  

  if (searchTerm){
    var results = [];
    articles.forEach(function(article){
      console.log("articles is " + articles);
      console.log("article is " + article);
      var isTitleMatch = article.title.indexOf(searchTerm) != -1;
      var isContentMatch = article.body.indexOf(searchTerm) != -1;
      console.log(isTitleMatch, isContentMatch);
      if (isTitleMatch || isContentMatch) {
        results.push(article);
      }
    });

    res.render('articles/index.ejs', {myArticles: results});
} else {
  res.render('articles/index.ejs', {myArticles: articles});
}  
});


app.get('/articles/new',function(req, res){
  res.render('articles/new.ejs');
  });

app.post('/articles',function(req, res){
  articles.push(req.body);
  res.redirect('/articles');
});

app.get('/articles/:index', function(req, res){
  var articleIndex = parseInt(req.params.index);
  res.render('articles/show', {myArticle: articles[articleIndex]});
});

// app.delete('/articles/:index', function(req, res){
//   var articleIndex = parseInt(req.params.index);
//   res.send('Deleted')
//   res.redirect('/articles');
// });


app.listen(3000);