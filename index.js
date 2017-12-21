var express = require("express");
var bodyParser = require("body-parser");
var ejsLayouts = require("express-ejs-layouts");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended:false }));

//--layouts
app.use(ejsLayouts);

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
