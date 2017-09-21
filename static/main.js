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

$('.edit-form').on('submit', function(e){
  e.preventDefault();

  var articleElement = $(this);
  var articleURL = articleElement.attr('action');
  var articleData = articleElement.serialize();
  console.log("element:",articleElement);
  console.log("url:",articleURL);
  console.log("data:",articleData);

  $.ajax({
    method:'PUT',
    url: articleURL,
    data: articleData
  }).done(function(data) {
    window.location = '/articles';
  });
});
