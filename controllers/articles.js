let express = require('express');
let router = express.Router();
let db = require('../models');

router.get('/', (req, res)=>{
    res.send('yayayayayaya');
});

router.get('/new', (req,res)=>{
    res.send('This is SPARTA!!');
})

module.exports = router;