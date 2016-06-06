
$('.menu-item').on('click', function(e) {
	if (!($(e.target).hasClass('active'))) {
		$('.menu-item').removeClass('active');
		$(e.target).addClass('active');
	}
	console.log('menu changed');
})
