//node modules
let express = require('express')
let layouts = require('express-ejs-layouts')
let db = require('./models')
let {Op} = require('sequelize')
//app instance
let app = express()

//template language to ejs
app.set('view engine', 'ejs')

//use layouts
app.use(layouts)

//setup static folder
app.use(express.static('static'))

//body parser
app.use(express.urlencoded({extended: false}))

//ROUTES
app.get('/', (req, res) => {
    res.render('site/home')
  })
  app.get('/about', (req, res) => {
    res.render('site/about')
  })
  app.get('/contact', (req, res) => {
    res.render('site/contact')
  })

//new article form
app.get('/articles/new', (req, res) => {
    res.render('articles/new')
})  

// articles index
app.get('/articles/index', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('articles/index', {articles})
    })
    .catch(err => {
        console.log('error!', err)
    })
})
app.get('/articles', (req, res) => {
    let searchTerm = req.query.search
    if (searchTerm == null) {
        res.render('articles/index')
    } else {
        db.articles.findAll({
            where: {
                content: {
                [Op.like]: `%${searchTerm}%`
                }
            }
        })
        .then(articles => {
            console.log(articles)
            res.render('articles/search', {articles})
        })
        .catch(err => {
            console.log('error error')
        })
    }
    
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
    db.articles.findByPk(index)
    .then(article => {
        console.log('this article!')
        res.render('articles/show', {article})
    })
    .catch(err => {
        console.log('bleh', err)
        res.send('bleh another error')
    })
    
})

//port to listen on
app.listen(3000, () => {
    console.log('woop woop! we in business')
})