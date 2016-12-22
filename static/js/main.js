// - Were we supposed to be filling in text with DOM manipulation or refreshing pages?
// - Why does the first time it's loaded not work to refresh the page?
// - Do we always need to send a response be it render or send data?
// - Still need to add graceful failing page under 'clean it up' section

console.log('js loaded');

//AJAX for deleting a link
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

//AJAX for updating a link
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

//JS for toggling submission form
$('#toggle-add').click(function(){
  $('#add-form').toggle();
});
