var express = require("express");
var app = express();
var bodyParser = require("body-parser");


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(req, res){
	res.render("index.ejs");
});

app.post("/articles", function(req, res){
	articles.push(req.body);
	res.redirect("/articles");
});

app.use(express.static(__dirname + '/static'));

var articles = [
	{title : 'Article 1' , body: "Pour-over etsy tofu, before they sold out swag synth roof party chillwave schlitz. Slow-carb austin pabst tote bag authentic twee. Chicharrones cred etsy sustainable, craft beer flexitarian twee truffaut sriracha listicle. Kinfolk bespoke iPhone, salvia semiotics green juice food truck gochujang. Yr messenger bag flannel, affogato tilde lomo small batch church-key put a bird on it mixtape. Williamsburg pitchfork ugh raw denim. Locavore heirloom polaroid neutra, quinoa tousled listicle umami ethical bicycle rights pickled retro sriracha."},
	{title : 'Article 2' , body: "Pabst truffaut sartorial, jean shorts keytar locavore austin stumptown cred pour-over. Food truck four dollar toast whatever, heirloom lo-fi seitan knausgaard four loko letterpress artisan poutine pork belly fingerstache before they sold out. Dreamcatcher retro normcore, asymmetrical YOLO kogi small batch marfa ethical biodiesel. Gentrify skateboard kogi, four dollar toast meh quinoa hoodie kickstarter cred. Migas literally gentrify photo booth, lomo chia cliche tousled. Polaroid etsy messenger bag, hella taxidermy hammock tilde fingerstache yuccie affogato art party viral. Keffiyeh organic asymmetrical, marfa polaroid fap banjo umami salvia seitan post-ironic slow-carb."},
	{title : 'Article 3' , body: "Slow-carb cliche meh, man braid shoreditch fashion axe XOXO heirloom flexitarian selvage wayfarers offal pug. Health goth squid you probably haven't heard of them, blog fixie blue bottle scenester four loko. Everyday carry distillery retro synth, art party four loko chambray freegan next level yuccie craft beer mlkshk kitsch stumptown. Narwhal letterpress offal bitters ethical, pug actually four dollar toast selvage austin butcher trust fund. Street art dreamcatcher master cleanse put a bird on it. Craft beer umami keffiyeh, paleo shoreditch vinyl man bun franzen. Sriracha locavore gluten-free, literally butcher chambray plaid retro pinterest kogi fingerstache keytar bicycle rights drinking vinegar."},
	{title : 'Article 4' , body: "Chillwave poutine plaid keytar, art party shabby chic pork belly polaroid everyday carry occupy jean shorts taxidermy wolf. Post-ironic hoodie pop-up tote bag, skateboard normcore tacos try-hard synth tousled mustache letterpress. Tumblr gochujang slow-carb lumbersexual try-hard, salvia tilde plaid tacos echo park polaroid wolf austin farm-to-table. Kinfolk plaid poutine, portland gochujang echo park salvia affogato locavore hoodie. Shoreditch portland slow-carb, celiac brunch listicle before they sold out mixtape flexitarian bitters organic waistcoat brooklyn XOXO. Mustache venmo neutra cornhole cray, selfies dreamcatcher distillery vinyl. Everyday carry bitters polaroid, DIY truffaut yr bespoke 3 wolf moon."}
];

app.get("/articles", function(req, res){
	res.render("articles.ejs" , {articles: articles});
});

app.get("/articles/New", function(req, res){
	res.render("articlesNew.ejs");
});

app.get("/about", function(req, res){
	res.render("../static/about.ejs");
})

app.get("/contact", function(req, res){
	res.render("../static/contact.ejs");
})

app.get("/articles/:idx", function(req, res){
	var articlesIdx = parseInt(req.params.idx);
	if(articlesIdx >= 0 && articlesIdx < articles.length ){
		res.render("articlesShow.ejs",{
			articles: articles[articlesIdx]
		});
	}else {
		res.send("Error!");
	};
	// res.render("articlesShow.ejs" , {articles: articles[articlesIdx]});
});




app.listen(3000 , function(){
	console.log("MY APP IS RUNNING");
});
