let router = require('express').Router()

//routes
router.get('/', (req, res) => {
    res.render('articles/index.ejs')
})

//export
module.exports = router