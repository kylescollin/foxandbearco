function initialize() {
	var mapCanvas = document.getElementById('map_canvas');
	var mapOptions = {
		center: new google.maps.LatLng(40.7157225,-73.9537977),
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var center;
	function calculateCenter() {
		center = map.getCenter();
	}
	google.maps.event.addDomListener(map, 'idle', function() {
		calculateCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
}
google.maps.event.addDomListener(window, 'load', initialize);

$(document).ready(function(){
	// Mobile Navigation Handler
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
	$('.container, .head').click(function(event){
		if(!$(event.target).is('div')){
			$("#mobilenav").removeClass("active");
	    	$(".container").removeClass("active");
		}
	});
	// Disable default form submission
	$("#orderform").submit(function(e){
	    return false;
	});

	// Process order form submission
	$("#submit").click(function() {
		var proceed = true;

		//reset error red marks
		$("#orderform input").each(function(){
			$(this).css('box-shadow','');
		});
		$('#formerrors').css('display','none');

		var fullname = $("#orderform input[name=full_name]");
		if(fullname.val().length < 4){ //if this field is empty 
			fullname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter your full name");
			$('#formerrors').css('display','block');
		}
		if(!$.trim(fullname.val())){ //if this field is empty 
			fullname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter your first name");
			$('#formerrors').css('display','block');
		}

		var email = $("#orderform input[name=email]");
		if(!$.trim(email.val())){
			email.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter an email address");
			$('#formerrors').css('display','block');
		}
		var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
		if(!email_reg.test($.trim(email.val()))){
			email.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter a valid email address");
			$('#formerrors').css('display','block');
		}

		var message = $("#orderform textarea");
		if(message.val().length < 10){ //if this field is empty 
			message.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Don't be shy! Write a little more.");
			$('#formerrors').css('display','block');
		}
		if(!$.trim(message.val())){ //if this field is empty 
			message.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Go ahead, write us a message!");
			$('#formerrors').css('display','block');
		}


		if(proceed) //everything looks good! proceed...
	    {
			//get input field values data to be sent to server
	        post_data = {
				'fullname'			: $('input[name=full_name]').val(), 
				'emailaddress'		: $('input[name=email]').val(), 
				'message'			: $('textarea').val(), 
			};

			$('#submit').val('sending...');

			//Ajax post data to server
	        $.post('contactform.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message 
					console.log('here');   
					$('#formerrors').text(response.text);
					$('#formerrors').css('display','block');
				}else{
					$('#submit').val('message sent');
					$('#submit').css('background','#2d2d2d url(images/check.svg) 4% center no-repeat');
					$('#submit').css('background-size', '30px 30px');
					$('#submit').css('color','#fff');
					resetForm();
				}
	        }, 'json');
		}
	});	
});
