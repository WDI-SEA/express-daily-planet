//Requires
var express = require("express"); 
var bodyParser = require("body-parser"); 
var multer = require('multer');
var fs = require("fs"); 
var ejsLayouts = require("express-ejs-layouts"); 


//Declare our app variable
var app = express();
var upload = multer(); // trying to use multer

//Use or Set statements
app.use(bodyParser.urlencoded({ extended: false})); 
app.set("view engine", "ejs"); 
app.use(ejsLayouts);
app.use(express.static('public'));

//Include any reference to external controllers (i.e., a file in your controllers/ folder) - where you define more routes
//I don't need any right now, maybe later
// can be useful if my index.js page is getting too big

// routes defined here

app.get('/', function(req, res) {
	//res.send('HELLO TACO!!!');

	res.render("index"); 

	var fileContents = fs.readFileSync('./package.json');
	var data = JSON.parse(fileContents);
});

app.get('/articles', function(req, res) {
	var articlesFromJson = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(articlesFromJson);
	res.render('articles/', { articles: parsedArticles });
});

app.post('/', function(req, res) {
	var fileContents = fs.readFileSync("./data.json");
	var parsedArticles = JSON.parse(fileContents);
	parsedArticles.push(req.body);
	fs.writeFileSync('./data.json', JSON.stringify(parsedArticles));
	res.redirect('/');
});


// app.get("/searchArticles", function(req, res){
// 	res.render("/articles");
	
// });

// app.post("/searchArticles/", function(req, res){ //action in form matches route in index.js
// 	res.send("You posted items == " + req.body.searchQuery);
// 	//res.redirect('articles?q=' + req.body.searchQuery);
// 	//res.send(req.body.searchQuery);
// }); 




// app.get('/articles/:queryString', function(req, res) {
//   res.send(req.params);
// });













// app.post('/articles', function(req, res){
// 	var searchQuery = req.search;
// 	res.send('worked!');
// });
// });
// 	function(error, response, body){
// 		if(!error && response.statusCode == 200){
// 			var movieData = JSON.parse(body);
// 			//res.send(movieData.Search); // <-- movieData is the variable we created in line above for parsed json data
// 			res.render("starwars", { movies: movieData.Search }); //always render when getting view
// 		}
// 		else {
// 			res.send("An error happened: " + error);
// 		}
// 	});
// });










app.get('/articles/new', function(req, res) {
	res.render('articles/new')
});

app.get('/articles/:id', function(req, res) {
	res.render('articles/show');
});


app.get('/about', function(req, res) {
	res.render('site/about');
});

app.get('/contact', function(req, res) {
	res.render('site/contact');
});





// wildcard - use: /article/:id (wildcard if you wanted several articles at once)
// then in get route? req.params.id
// id is index --> /article/0

//more hints!
// - tests:
// isNan() to check if id is number
// not less than 0, if trying to find -1
// not greater than length












//Listen on preferred port
app.listen(3000);
