$('.delete-link').on('click', function(e){
    e.preventDefault();
    var myUrl = $(this).attr('href');
    $.ajax({
        method:'DELETE',
        url:myUrl
    }).done(function(){
        //do stuff when the delete action is complete
        //redirect or update view
    });
});