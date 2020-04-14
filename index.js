//node modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let db = require('./models')
//app instance
let app = express()

//template language to ejs
app.set('view engine', 'ejs')

//use layouts
app.use(layouts)

//body parser
app.use(express.urlencoded({extended: false}))

//ROUTES
app.get('/', (req, res) => {
    res.render('site/home')
  })

//new article form
app.get('/articles/new', (req, res) => {
    res.render('articles/new')
})  

//articles index
app.get('/articles/index', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('articles/index', {articles})
    })
    .catch(err => {
        console.log('error!', err)
    })
})

//article submission to database
app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newPost => {
        console.log('Success')
        res.redirect('articles/index')
    })
    .catch(err => {
        console.log('errors', err)
        res.send('booo it broke')
    })
})
//get specific article
app.get('/articles/:id', (req,res) => {
    var index = parseInt(req.params.id)
    console.log(index)
    res.render('articles/show', index)
})

//port to listen on
app.listen(3000, () => {
    console.log('woop woop! we in business')
})