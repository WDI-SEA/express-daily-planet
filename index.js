var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
var app = express();
//middleware
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(ejsLayouts);
//end
app.get('/', function(req, res){
  res.render('articles/index');
});
app.listen(3000);