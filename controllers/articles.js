let express = require('express');
let router = express.Router();
let db = require('../models');


// Render all the articles
router.get('/', (req, res)=>{
    db.article.findAll().then((articles)=>{
         res.render('../views/articles/index.ejs', {articles:articles});
    });
   
});

router.post('/', (req,res)=>{
  // res.send(req.body);
  db.article.create(req.body).then((createdArticle)=>{

res.redirect('/articles/' + createdArticle.id);

  }).catch((err)=>{
    res.send('Is Broke.', err);
  });


});

router.get('/new', (req,res)=>{
    // res.send('This is SPARTA!!');
    res.render('../views/articles/new.ejs', {});
});

router.get('/:id', (req, res)=>{
    db.article.findById(req.params.id).then((article)=>{
        res.render('../views/articles/singleArticle.ejs', {article:article});
    });
});



// db.article.create({
//     title: 'TEsting',
//     body: 'Testing'
// });

module.exports = router;