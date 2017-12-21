var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");
//I added this
var path = require('path');

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:false }));

//--layouts
app.use(ejsLayouts);
//I changed this
app.use(express.static(path.join(__dirname, "/svg")));

//--controllers
app.use("/articles", require("./controllers/articles"));



app.get("/", function(req,res) {
   res.render("index.ejs");
});

app.get("/about", function(req,res) {
   res.render("about.ejs");
});

app.get("/contact", function(req,res) {
   res.render("contact.ejs");
});

app.listen(3000);
