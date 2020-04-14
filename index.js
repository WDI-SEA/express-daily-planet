//require all mods and create lets for them
let express = require('express')
let app = express()
let layouts = require('express-ejs-layouts')
let db = require('./models')
let router = express.Router()

//set ejs as view engine
app.set('view engine', 'ejs')
//use these apps
app.use(layouts)
app.use(express.static('static'))
//dont get this one
app.use(express.urlencoded({ extended: false }))



//trying to get home
app.get('/site/home', (req, res) => {
  res.render('/')
})

// get articles and render on index.ejs
app.get('/articles', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        console.log(articles)
    res.render('articles/index', {articles})
    })

    .catch(err => {
      console.log('oops')
      res.send('oops 404')
    })
})

//grab and render new page / form page
app.get('/articles/new', (req, res) => {
    res.render('articles/new')
})

//post articles
app.post('/articles', (req, res) => {
  //create in db
    db.articles.create(req.body)
    //create new post
    .then(newPost => {
        console.log('postingg')
        //send to articles page
        res.redirect('/articles')
    })
    .catch(err => {
      console.log('oops')
      res.send('oops 404')
    })
})

// create searchbar functions

// link for home about and contact info



//pick a port
app.listen(3000, () => {
  console.log('ready to rumble')
})
