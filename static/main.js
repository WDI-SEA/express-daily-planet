console.log("Hello???");
$('.delete-link').on('click', function(e) {
  e.preventDefault();
  var articleElement = $(this);
  var articleURL = articleElement.attr('href');
  $.ajax({
    method: 'DELETE',
    url: articleURL
  }).done(function(data) {
    console.log(data);
    window.location = '/articles';
  });
});

$('#edit-form').on('submit', function(e){
  e.preventDefault();

  var articleElement = $(this);
  var articleURL = articleElement.attr('action');
  var data = articleElement.serialize();

  $.ajax({
    method: 'PUT',
    url: articleURL,
    data: data
  }).done(function(data){
    console.log(data);
    window.location = '/articles/';
  });
});
