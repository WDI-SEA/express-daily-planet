console.log('js loaded');

$('.delete-link').on('click', function(e) {
  e.preventDefault();

  var element = $(this);
  var url = element.attr('href');

  $.ajax({
    method: 'DELETE',
    url: url
  }).done(function(data) {
    console.log(data);
    window.location = '/articles/';
  });

});

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
    console.log(data);
    window.location = '/articles/';
  });
});
