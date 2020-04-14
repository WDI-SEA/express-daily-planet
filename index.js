let express = require('express');
let db = require('./models')

let app = express();
app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('static'))

app.get('/', function(req, res) {
  res.render('site/index.ejs');
});

app.get("/articles", function(req, res) {
  res.render("articles/index", { articles })
});

app.get('/articles/new', function(req, res) {
  res.render("articles/new.ejs")
});

app.get("/articles/:id", function(req, res) {
  let articleIndex = parseInt(req.params.id);
  res.render('articles/show', { articles });
});

app.get('/about', function(req, res) {
  res.render("site/about");
});

app.get('/contact', function(req, res) {
  res.render("site/contact");
});

app.post('/articles/new', function(req, res) {
  res.redirect('/articles');
});

app.listen(3000, function() {
});