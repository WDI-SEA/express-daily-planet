//require needed modules
let express = require('express')
let app = express()
app.use(express.urlencoded({extended: false})) 
let layouts = require('express-ejs-layouts')
let db = require('./models')
let {Op}=require('sequelize')

//setup template language
app.set('view engine', 'ejs')
app.use(layouts)

//routes
//homepage-------------------
app.get('/', (req, res) => {
    res.render('site/home')
})

//search results page--------------------
app.get('/articles', (req, res) => {
    if (req.query.search == null) {
        res.render('articles/index')
    }
    else {
        db.articles.findAll({
            where: {
                
                [Op.or]: [{content:{[Op.like]:`%${req.query.search}%`}},{title:{[Op.like]:`%${req.query.search}%`}},{author:{[Op.like]:`%${req.query.search}%`}}]
                
            }
        }).then(articles => {
            res.render('articles/results', { articles })
        })
    }
})


//new-----------------------------------------
app.get('/new', (req, res) => {
    res.render('articles/new')
})

//this is to display all articles
app.get('/articles/index', (req, res) => {
    db.articles.findAll()
    .then(articles => {
        res.render('articles/index', { articles })
    })
})

//this is to post from new article 
app.post('/articles', (req, res) => {
    db.articles.create(req.body)
    .then(newPost => {
        console.log('success')
        res.redirect('articles/index')
    }).catch(err => {
        res.send('error', err)
    })
})
//params-------------------------------------
app.get('/articles/:id', (req, res) => {
    let artIndex = parseInt(req.params.id)
    db.articles.findByPk(artIndex)
    .then(x => {
        res.render('articles/show', {x})
    }).catch(err => {
        res.send('error')
        console.log(err)
    })
})
//----------------------------------------params

//listen
app.listen(3000)

