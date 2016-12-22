app.get('/search/:query', function(req, res) {
  var q = req.params.query;
  q = sanitize(q); // fake sanitize function, used for example

  var sql = "SELECT * FROM articles " +
      "WHERE title LIKE '%" + q + "%' OR " +
      "WHERE body LIKE '%" + q + "%';"
    // BAD IDEA, ROOM FOR ERRORS/TYPOS AND SQL INJECTION, need to make a sanitize function
})
