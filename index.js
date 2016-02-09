var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var articles = [
	{title: "Hipsters" , body: "Godard cardigan messenger bag listicle, brunch fingerstache helvetica williamsburg food truck shoreditch squid vice jean shorts freegan tote bag. Ethical dreamcatcher cred man braid scenester. Put a bird on it DIY tofu tattooed semiotics whatever, PBR&B chambray everyday carry pop-up cardigan. Kinfolk pop-up food truck, health goth yr godard squid. Fanny pack cred pop-up, sriracha neutra slow-carb meggings. Pitchfork everyday carry readymade roof party. Chambray art party marfa, umami keytar neutra venmo slow-carb twee gastropub meditation hella 90's street art.  Tilde tumblr everyday carry, shabby chic health goth poutine hella bushwick you probably haven't heard of them chartreuse. Waistcoat hammock pickled master cleanse wolf irony. Pickled freegan yr kombucha. Selvage gochujang dreamcatcher 8-bit. Cred ramps master cleanse narwhal synth. Celiac hoodie lumbersexual, disrupt iPhone you probably haven't heard of them mixtape. Master cleanse next level trust fund brooklyn, tousled pitchfork keytar direct trade wayfarers cold-pressed single-origin coffee green juice fixie knausgaard readymade." },
	{title: "Cupcakes", body: "Cupcake ipsum dolor. Sit amet sweet roll lemon drops cheesecake lemon drops halvah I love. Jelly jelly-o brownie tart marzipan I love I love. Cupcake dragée muffin gummies candy canes gingerbread. Donut oat cake croissant toffee halvah croissant soufflé. Tart topping tiramisu cotton candy marzipan. Danish I love fruitcake I love sweet I love. Icing fruitcake apple pie. Cake jujubes sesame snaps tiramisu muffin bear claw pastry lollipop. Bonbon sugar plum danish chocolate cake topping jelly soufflé. Chupa chups sweet chocolate marshmallow gummies candy canes toffee. Carrot cake I love I love cotton candy sweet roll I love macaroon muffin. Macaroon gingerbread apple pie caramels powder dessert jujubes. Candy canes wafer lemon drops liquorice." },
	{title: "Bacon", body: "Bacon ipsum dolor amet shankle ground round pork belly andouille frankfurter pork loin. Pork chop meatball hamburger chuck rump, swine capicola short ribs jerky leberkas kevin. Landjaeger ham sirloin rump swine ground round pork loin bresaola pig filet mignon leberkas pancetta ribeye tri-tip pork belly. Prosciutto kielbasa jerky bresaola meatball ground round meatloaf doner bacon tail short loin capicola pastrami. Ham hock fatback pork loin kielbasa spare ribs. Venison boudin salami sausage picanha, pig bresaola tail sirloin ham swine kevin. Pork chop flank jowl picanha tenderloin turkey short loin capicola meatball beef cupim chicken short ribs." },
	{title: "Vegetables", body: "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic.  Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini. Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke."}
];

app.set("view engine", "ejs");
app.use(express.static(__dirname + '/site'));
app.use(bodyParser.urlencoded({extended: false}));


// Serve the homepage of site
app.get("/", function(req, res) {
	res.render("index.ejs");
});

// Displays a list of all articles
app.get("/articles", function(req, res) {
	res.render("articles/index.ejs", {articles: articles});
});

// Creates a new article (Adds new article to array)
app.post("/articles", function(req, res) {
	articles.push(req.body);
	res.redirect("/articles");
});

// Displays a form that users use to create a new article
app.get("/articles/new", function(req, res) {
	res.render("articles/new.ejs");
});

// Finds an article by the ID in the array of articles and display it
app.get("/articles/:id", function(req, res) {
	var articleId = parseInt(req.params.id);
	res.render("articles/show.ejs", {article: articles[articleId]});
});

// Displays About Page
app.get("/about", function(req, res) {
	res.render("site/about.ejs");
});

// Displays Contact Page
app.get("/contact", function(req, res) {
	res.render("site/contact.ejs");
});

app.listen(3000, function() {
	console.log("My Lab/HW is running!");
});
