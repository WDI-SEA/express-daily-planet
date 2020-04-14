//require needed modules
let express = require('express')
let app = express()
app.use(express.urlencoded({extended: false})) 
let layouts = require('express-ejs-layouts')
let db = require('./models')

//setup template language
app.set('view engine', 'ejs')

app.use(layouts)

//routes
app.get('/', (req, res) => {
    res.render('articles/site/home')
})

app.get('/index', (req, res) => {
    .then(articles => {
        res.render('articles/index', {articles})
    })
})

app.get('/new', (req, res) => {
    res.render('articles/new')
    
})

app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newArticle => {
        console.log('yo')
        res.redirect('/index')
        
    })
})

// app.get('/show', (req, res) => {
//     res.render('articles/show')
// })

app.get('/articles/:id', (req, res) => {
    let artIdx = parseInt(req.params.id)
    db.articles.findByPk(artIdx)
    .then(x => {
        res.render('articles/show', {x})
    })
})

//listen
app.listen(3000)

//no views.index.ejs

//vies/site/home 

//read form data - converts to form to we can submit into db directly

//app.use(urlencoded: false)