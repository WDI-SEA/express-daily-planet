$(document).ready(function() {

  console.log("HOLLATCHABOY");

  // DELETE AN ARTICLE

  $('.delete-link').on('click', function(e) {
    e.preventDefault();

    var element = $(this);
    var url = element.attr('href');

    $.ajax({
      method: 'DELETE',
      url: url
    }).done(function(data) {
      window.location = '/articles';
    });

  });

  // EDITING AN ARTICLE

  $('#edit-form').on('submit', function(e){
    e.preventDefault();

    var element = $(this);
    var url = element.attr('action');
    var data = element.serialize();

    $.ajax({
      method: 'PUT',
      url: url,
      data: data
    }).done(function(data){
      window.location = '/articles';
    });

  });

});