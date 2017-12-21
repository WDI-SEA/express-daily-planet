let express = require('express');
let router = express.Router();
let db = require('../models');


// Render all the articles
router.get('/', (req, res)=>{
    db.article.findAll().then((articles)=>{
         res.render('../views/articles/index.ejs', {articles:articles});
    })
   
});

router.get('/new', (req,res)=>{
    // res.send('This is SPARTA!!');
    res.render('../views/articles/new.ejs', {});
});

router.get('/:id', (req, res)=>{

});

// db.article.create({
//     title: 'Neue Deutsche Härte still angry?',
//     body: 'Hangry, we meant hangry.'
// });

module.exports = router;