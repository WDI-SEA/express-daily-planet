// - Were we supposed to be filling in text with DOM manipulation or refreshing pages?
// - Does ordering of routes in index.js matter? e.g., when i used /articles/:id
// and /articles/new was requested, it didnt recognize the "new" article.
// - Do we always need to send a response be it render or send data?
// - Added the .reverse() to order newest at the top!

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
