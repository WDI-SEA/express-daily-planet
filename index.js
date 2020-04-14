// Your code here
let express = require('express')
let layouts = require('express-ejs-layouts')

let app = express()

app.set('view engine', 'ejs')

app.use(express.static('static'))

app.use(layouts)

///////////////////////////////////////////////////////////
app.get('/', function(req, res) {
    res.render('index.ejs');
  });
app.get('/articles', function(req, res) {
    res.render('articles/index.ejs');
  });
app.get('/articles/new', function(req, res) {
    res.render('articles/new.ejs');
  });
  
  app.post('/faves', (req, res) => {
    db.Article.findAll()
    .then(farticles => {
  // TODO: Pass articles array to relevant EJS page
})
    .catch(err => {
        console.log('ERROR:', err)
        res.send('Uh oh!')
    })
})
  
app.get('/articles/:id', function(req, res) {
    res.render('articles/show.ejs');
});

  ////////////////////////////////////////////////////////////////


// app.get('/about', (req, res) = {
    
// })
// app.get('/contact', (req, res) = {

// })





// pick a port
app.listen(3000, () => {
    console.log('ready to 💪')
})