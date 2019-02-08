$(document).on("scroll", function shrinkingMenu() {

	if($(document).scrollTop()>100) {
		$("nav").removeClass("menu").addClass("menu__small");
	} else {
		$("nav").removeClass("menu__small").addClass("menu");
	}
});