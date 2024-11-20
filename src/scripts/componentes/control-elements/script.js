events.on('ready', function() {

	$('.magnet').each(function() {
		var _magnetClass = $(this).attr('magnetClass');
		var _order = $(this).attr('order');

		if( _order == "pre" ){
			$(this).prepend( $('.'+_magnetClass) );
		}else{
			$(this).append( $('.'+_magnetClass) );
		}

	});

});
