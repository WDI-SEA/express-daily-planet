var express = require('express');
// var ejsLayouts = require('express-ejs-layouts');
var router = express.Router();
var db = require('../models');

var app = express();

db.article.create({
  title: 'The Big Score',
  body: 'lorem ippy day ya'
});

router.get('/', function(req,res){
  db.article.findAll().then(function(articles){
    res.render('articles/articles', {result: articles});   
  });
});

module.exports = router;