var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/articles', function(req, res) {
  // figure out how to get the articles
  var articles = fs.readFileSync('./data.json');
  // convert string to object
  articles = JSON.parse(articles);
  // send those articles to the EJS template
  res.render('articles/index.ejs', { articles: articles });
  
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new.ejs');
});

app.post('/articles', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  // convert string to object
  articles = JSON.parse(articles);

  articles.push(req.body);

  fs.writeFileSync('./data.json', JSON.stringify(articles));

  res.redirect('/articles');
});

app.get('/articles/:idx', function(req, res) {
  var articles = fs.readFileSync('./data.json');
  // convert string to object
  articles = JSON.parse(articles);

  var articlesToShow = articles[req.params.idx];
  res.render('articles/show.ejs', { articles: articlesToShow });
});

// app.get('/', function(req, res) {
//   res.render('about.ejs');
// });

app.get('/site/contact', function(req, res) {
  res.render('site/contact.ejs');
});

app.get('/site/about', function(req, res) {
  res.render('site/about.ejs');
});


// // A browser's default method is 'GET', so this
// // is the route that express uses when we visit
// // our site initially.
// app.get('/', function(req, res){
//   // The form's action is '/' and its method is 'POST',
//   // so the `app.post('/', ...` route will receive the
//   // result of our form
//   var html = '<form action="/" method="post">' +
//                'Enter your name:' +
//                '<input type="text" name="userName" placeholder="..." />' +
//                '<br>' +
//                '<button type="submit">Submit</button>' +
//             '</form>';
               
//   res.send(html);
// });

// // This route receives the posted form.
// // As explained above, usage of 'body-parser' means
// // that `req.body` will be filled in with the form elements
// app.post('/', function(req, res){
//   var userName = req.body.userName;
//   var html = 'Hello: ' + userName + '.<br>' +
//              '<a href="/">Try again.</a>';
//   res.send(html);
// });


app.listen(3000);
