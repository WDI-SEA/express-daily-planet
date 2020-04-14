// Your code here
// Important variables
var express = require("express")
var layouts = require("express-ejs-layouts")
var app = express()
let db = require('./models')
let path = require('path')
//var cryptids = fs.readFileSync('./cryptids.json')

// Make useful the things you brought in
app.set("view engine", "ejs")
app.use(express.static('static'))
app.use(layouts)
app.use(express.urlencoded({extended:false}))

// Routes
app.get('/', (req,res) => {
    res.render('index')
})
app.get('/articles', (req,res) => {
    // Save the search term if there is one
    var query = req.query.q
    if(query) {query = ''}
    
    db.articles.findAll({
        where: {
            
        }
    })
    .then(articles => {res.render('articles/index', {articles})})
    .catch(err => {console.log("Error: ", err)})
})
app.get('/articles/new', (req,res) => {
    res.render('articles/new')
})
app.post('/articles', (req,res) => {
    console.log(req.body)
    db.articles.create(req.body)
    .then(newArticle => {res.redirect('/articles')})
    .catch(err => {res.send("Yeah, something went wrong")})
})
app.get('/articles/:idx', (req,res) => {
    db.articles.findAll({where: {id:req.params.idx}})
    .then(article => {
        article = article[0]
        res.render('articles/show', {article})
    })
    .catch(err => {console.log("Error: ", err)})
})
app.get('/about', (req,res) => {
    res.sendFile('about.html', {root: path.join(__dirname, 'static')})
})
app.get('/contact', (req,res) => {
    res.sendFile('contact.html', {root: path.join(__dirname, 'static')})
})

app.get('*', (req,res) => {
    res.send("Yo, these are some 404 shenanigans you're up to.")
}) 

// LISTEN FOR THE PORT
app.listen(3000, () => {
    console.log("READY TO ROLL OUT")
})