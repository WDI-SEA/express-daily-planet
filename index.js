//Modules and global vars
let express = require('express');
let app = express();
let ejsLayouts = require('express-ejs-layouts');
let bodyParser = require('body-parser');
let path = require('path');

//Set snd Use statements for middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);
 
app.use('/articles', require('./controllers/articles.js')); 
 
//Home route
app.get('/', (req,res)=>{
    res.render('index',{});
});

//About route
app.get('/about', (req, res)=>{
    //res.send('About');
    res.sendFile(path.join(__dirname+'/public/about.html'));
});
//Contact route
app.get('/contact', (req,res)=>{
    res.sendFile(path.join(__dirname+'/public/contact.html'));
})

//Listen on port 3003
app.listen(3003);
