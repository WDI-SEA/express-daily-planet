//require needed modules
let express = require('express')
let db = require('./models')

//declare a new express app
let app = express()

//set the template language to ejs
app.set('view engine', 'ejs')

//tell express to use the static folder
app.use(express.static('static'))
app.use(express.urlencoded({extended: false}))

//import controller routes
app.use('/articles', require('./controllers/articles'))

//set route to home.ejs
app.get('/', (req, res) => {
	res.render('site/home.ejs')
})

//listen on port 3000
app.listen(3000)