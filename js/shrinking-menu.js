$(window).on("scroll", function() {

	    if( $(this).width() > 768 && $(this).scrollTop()>=100 ) {
	        $("nav").removeClass("menu").addClass("menu__small");
	    }else {
	        $("nav").removeClass("menu__small").addClass("menu");
	    }
	});