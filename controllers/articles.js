let express = require('express');
let router = express.Router();
let db = require('../models');

router.get('/', (req, res)=>{
    res.send('yayayayayaya');
});

module.exports = router;