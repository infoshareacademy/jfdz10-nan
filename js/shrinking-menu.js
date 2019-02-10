$(window).on("scroll", function shrinkingMenu() {

	if($(window).scrollTop()>100 && $(window).width() > 768) {
		$("nav").removeClass("menu").addClass("menu__small");
	} else {
		$("nav").removeClass("menu__small").addClass("menu");
	}
});