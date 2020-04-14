// require needed modules
let express = require('express');
let db = require('./models')
let layouts = require('express-ejs-layouts')

// Declare a new express app
let app = express()

//serve static files
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))

// set the template language to ejs
app.set('view engine', 'ejs')

// Tell express to use the layouts module
app.use(layouts)

// declare routes
app.get('/', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('index', { articles })
    })
    .catch(err =>{
        console.log('Error')
        res.send('Woooooooow, nice try, old buddy old pal! A 404, just for you!')
    })
})

app.get('/articles', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('articles/index', { articles })
    })
    .catch(err =>{
        console.log('Error')
        res.send('We gonna rock down to electric boogaloo, and then a 404.')
    })
})

app.get('/articles/new', (req, res) => {
    res.render('articles/new')
})

app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newArticle =>{
        console.log(req.body)
        res.redirect('/articles')
    })
    .catch(err =>{
        console.log('Error', err)
        res.send('Now THAT is an ERROR')
    })
})

app.get('/search', (req, res) =>{
    console.log(req.query.query)
    let search = req.query.query
    db.articles.findAll()
    .then(articles => {
        res.render('articles/show', {search, articles})
    })
    .catch(err => {
        console.log('Error ', err)
        res.send('Oooof, BIG ERROR')
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
        res.send('The Consequences Will Never Be The Same!')
    })
})

app.get('/site/about', (req, res) => {
    res.render('site/about')
})

app.get('/site/contact', (req, res) => {
    res.render('site/contact')
})

app.get('*', (req, res) => {
    res.render('error')
})

// pick a port for it to listen to
app.listen(3000, () => {
    console.log('Ayyy, daayyyly planet worldwide! 🌎')
});
