let express = require('express')
let app = express()
let layouts = require('express-ejs-layouts')
let db = require('./models')
let methodOverride = require('method-override');

app.set('view engine', 'ejs')
app.use(layouts)
app.use(express.static('static'))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('site/home.ejs', { articles })
    })
    .catch(err =>{
        console.log('error')
        res.send('we got an error folks')
    })
})

app.get('/articles', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('articles/index.ejs', { articles })
    })
    .catch(err =>{
        console.log('error')
        res.send('we got an error folks')
    })
})

app.get('/articles/new', (req, res) => {
    res.render('articles/new.ejs')
})

app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newArticle =>{
        console.log(req.body)
        res.redirect('/articles')
    })
    .catch(err =>{
        console.log('error', err)
        res.send('oopsies')
    })
})

app.get('/search', (req, res) =>{
    console.log(req.query.query)
    let searchmatch = req.query.query
    db.articles.findAll()
    .then(articles => {
        res.render('articles/show', {searchmatch, articles})
    })
    .catch(err => {
        console.log('an error! ', err)
        res.send('error - check the logs')
    })
})

app.post('/delete', (req, res) => {
    console.log(req.body)
    db.articles.destroy({
        where: { id: req.body},
        truncate: true
    })
    .then(newArticle => {
        console.log(req.body)
        res.redirect('/articles')
    })
    .catch(err =>{
        console.log('error', err)
        res.send('oopsies')
    })
})


app.listen(3000)