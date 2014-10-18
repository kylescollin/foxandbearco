$(document).ready(function(){
	$(".menu-link").click(function(){
	      $("#mobilenav").toggleClass("active");
	      $(".container").toggleClass("active");
	});
	// Close menu if window is resized
	$(window).resize(function() {
		if($(window).width() > 768){
			$("#mobilenav").removeClass("active");
	    	$(".container").removeClass("active");
		}
	});

	// Close side menu if container is clicked when menu is open
	$('.container').click(function(event){
		if(!$(event.target).is('div')){
			$("#mobilenav").removeClass("active");
	    	$(".container").removeClass("active");
		}
	});
});