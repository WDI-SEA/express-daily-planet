//Requirements
var express = require("express");

//Global variable
var router = express.Router();

//Route definitions
router.get("/about", function(req, res){
	res.send("/about route from articles.js"); //change this
});

//Export
module.exports = router;