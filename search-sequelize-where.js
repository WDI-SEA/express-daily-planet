app.get("/search/:query", function(req, res) {
  var q = req.params.query;

  db.article.findAll({where: {title: q}}, function(articles) {
    // will where use = or LIKE? is it case sensitive?
    res.render('search-results', {results: articles});
  });

});
