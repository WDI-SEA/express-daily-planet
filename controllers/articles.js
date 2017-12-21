var express = require("express");
var router = express.Router();
db = require ("../models");

router.get("/", function(req, res){
	db.dailyplanet.findAll().then(function(headlines){
		res.render("articles/index", {results: headlines});
	});
});


router.get("/:id", function(req, res){
	db.dailyplanet.findById(req.params.id).then(function(article){
		res.render("articles/show", {result: article});
	});
});


module.exports = router;