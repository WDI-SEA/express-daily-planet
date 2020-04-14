// Important variables
var express = require("express")
var layouts = require("express-ejs-layouts")
var app = express()
let db = require('./models')
let path = require('path')
let op = require('sequelize').Op

// Make useful the things you brought in
app.set("view engine", "ejs")
app.use(express.static('static'))
app.use(layouts)
app.use(express.urlencoded({extended:false}))

/***************
 * ROUTES
 ***************/
// Home Page
app.get('/', (req,res) => {
    res.render('index')
})
// Display articles, filtered by search
app.get('/articles', (req,res) => {
    // Save the search term if there is one
    var query = req.query.q
    if(query === undefined) {query = ''}
    // Filter and render articles by the query (case sensitive)
    db.articles.findAll({
        where: {
            [op.or]: [
                {title: {[op.substring]:query}},
                {content: {[op.substring]:query}},
                {author: {[op.substring]:query}}
            ]
        }
    })
    .then(articles => {res.render('articles/index', {articles})})
    .catch(err => {console.log("Error: ", err)})
})
// Create a new article
app.get('/articles/new', (req,res) => {
    res.render('articles/new')
})
// Save a newly made article to the database
app.post('/articles', (req,res) => {
    db.articles.create(req.body)
    .then(newArticle => {res.redirect('/articles')})
    .catch(err => {res.send("Yeah, something went wrong")})
})
// Retrieve an article of specified ID
app.get('/articles/:idx', (req,res) => {
    db.articles.findAll({where: {id:req.params.idx}})
    .then(article => {
        article = article[0]
        res.render('articles/show', {article})
    })
    .catch(err => {console.log("Error: ", err)})
})
// Display the "About" HTML page
app.get('/about', (req,res) => {
    res.sendFile('about.html', {root: path.join(__dirname, 'static')})
})
// Display the "Contact" HTML page
app.get('/contact', (req,res) => {
    res.sendFile('contact.html', {root: path.join(__dirname, 'static')})
})
// If you try and be sneaky
app.get('*', (req,res) => {
    res.send("Yo, these are some 404 shenanigans you're up to.")
}) 

// LISTEN FOR THE PORT
app.listen(3000, () => {
    console.log("READY TO ROLL OUT")
})