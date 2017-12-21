var express = require("express");
var router = express.Router();
var db = require("../models");


router.get("/", function(req, res) {
   db.article.findAll().then( function(articleList) {
      res.render("articles/all", {articleList: articleList});
   });
});

router.get("/new", function(req, res) {
   res.render("articles/new");
});

router.post("/", function (req,res) {
   //--create new db post
   // console.log(req.body);
   //--the names of the fields match the db columns
   db.article.create(req.body).then( function(newArticle) {
      res.redirect("/articles/"+newArticle.id);
   }).catch(function(err) {
      res.send("Submit error:",err);
   });


});

router.get("/:id", function(req, res) {
   db.article.findById(req.params.id).then( function(article) {
      res.render("articles/singlepage", {article:article});
   });
});

module.exports = router;
