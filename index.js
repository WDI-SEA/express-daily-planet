//Modules and global vars
let express = require('express');
let app = express();
let ejsLayouts = require('express-ejs-layouts');
let bodyParser = require('body-parser');

//Set snd Use statements for middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));
app.use(ejsLayouts);

//Home routels
app.get('/', (req,res)=>{
    res.render('index',{});
})



//Listen on port 3003
app.listen(3003);
