//require all mods and create lets for them
let express = require('express')
let app = express()
let layouts = require('express-ejs-layouts')
let db = require('./models')
let router = express.Router()
let method = require('method-override')
let {Op} = require('sequelize')

//set ejs as view engine
app.set('view engine', 'ejs')
//use these apps
app.use(layouts)
app.use(express.static('static'))
//dont get this one
app.use(express.urlencoded({ extended: false }))
app.use(method('_method'))


//trying to get home
app.get('/', (req, res) => {
  res.render('site/home')
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
app.get('/search', (req, res) => {
  db.articles.findAll({
    where: {title: {[Op.like]:`%${req.query.query}%` }}
  }).then(article => {
    res.render('articles/show', {article})
  }).catch(err => {
    console.log('error in search', err)
  })

})


//delete function
app.post('/delete', (req, res) => {
  db.articles.destroy({
    where: {id: req.body.id}
  })
  .then(newArticle => {
    console.log(req.body)
    res.redirect('/')
  }).catch(err => {
    console.log('error', err)
    res.send('delete is broke')
  })
} )
// link for home about and contact info



//pick a port
app.listen(3000, () => {
  console.log('ready to rumble')
})
