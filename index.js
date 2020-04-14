// Your code here
let express = require('express')
let app = express();
var ejsLayouts = require('express-ejs-layouts')
var router = express.Router();

// Set the template language to EJS
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts)

let db = require('./models');

//Setting up routes 
app.get('/', (req, res) => {
    res.render('site/home')
})

app.get('/articles', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        console.log(articles)
    res.render('articles/index', {articles})
    })
    .catch(err => {
        console.log('Something went worong...')
        res.send('Something went wrong...')
    })
})

app.get('/articles/new', (req, res) => {
    res.render('articles/new')
})

app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newPost => {
        console.log('processing')
        res.redirect('/articles')
    })
    .catch(err => {
        console.log('Something went worong...')
        res.send('Something went wrong...')
    })
})

app.get('articles/id:', (req, res) => {
    res.send('')
})


app.listen(3000)