$(document).ready(function(){
	$('.bxslider').bxSlider();
});

// Updates the cart icon in the top right.
// Calculates total items based on numbers product list at the bottom of the page.
function updateCartItems(){
	var totalItems = 0;
	var productTotal = 0;
	$('.numbers :input').each(function(){
		productTotal += getPrice($(this).attr('id'),parseInt($(this).val(), 10));
		totalItems += parseInt($(this).val(), 10);
	});
	$('#total').html('$' + productTotal.toFixed(2));
	$('#cart').html('<img src="images/cart.svg" alt="cart" />' + totalItems);
	$('#sidecart').html('<img src="images/cart.svg" alt="cart" />' + totalItems);
}

// Calculates the total price of all items of a single product. 
// Takes in a product name and an amount.
function getPrice(product, amount){
	var price = 0;
	switch(product){
		case 'Pickles-Garlic': price = 10 * amount; break;
		case 'Pickles-Spicy': price = 10 * amount; break;
		case 'Cookies-ChocolateChip': price = 8 * amount; break;
		case 'Cookies-Snickerdoodle': price = 8 * amount; break;
		case 'Cookies-WhiteChocolateandCranberry': price = 8 * amount; break;
		case 'BananaLoaf-Plain': price = 8 * amount; break;
		case 'BananaLoaf-ChocolateChip': price = 8 * amount; break;
		case 'BananaLoaf-Walnut': price = 8 * amount; break;
		case 'Bread-Plain': price = 7 * amount; break;
		case 'Bread-Garlic': price = 7 * amount; break;
		case 'Lotion-Lavender': price = 8 * amount; break;
		case 'Lotion-Rose': price = 8 * amount; break;
		case 'Lotion-Cedar': price = 8 * amount; break;
		case 'Lotion-Citronella': price = 8 * amount; break;
		case 'Lotion-Jasmine': price = 8 * amount; break;
		case 'Lotion-Spearmint': price = 8 * amount; break;
	}
	return price;
}

function getNumberOfProducts(){
	var numberofproducts = 0;
	$('.numbers :input').each(function(){
		numberofproducts += parseInt($(this).val(), 10);
	});
	return numberofproducts;
}

//Returns the number of different product types that have been added to the order form.
function getNumberOfProductTypes(){
	var numberofproducttypes = 0;
	$('.numbers :input').each(function(){
		if(parseInt($(this).val(), 10)>0){
			numberofproducttypes++;
		}
	});
	return numberofproducttypes;
}

function resetForm(){
	$('#orderform')[0].reset();
	$('#cart').html('CART - 0');
	$('#total').html('$0.00');
	$('.selector2').find('span').text('Select Pickup Time / Date');
	$('.selector2').find('span').css('color','#999999');
}

var temp = false;

$(document).ready(function(){
	// Mobile Navigation Handler
	$(".menu-link").click(function(){
		$("#mobilenav").toggleClass("active");
		$(".container").toggleClass("active");
		$(".head").toggleClass("active");
	});
	// Close menu if window is resized
	$(window).resize(function() {
		if($(window).width() > 768){
			$("#mobilenav").removeClass("active");
	    	$(".container").removeClass("active");
	    	$(".head").removeClass("active");
		}
	});
	// Close side menu if container is clicked when menu is open
	$('.container, .head, #sidecart').click(function(event){
		if(!$(event.target).is('div')){
			$("#mobilenav").removeClass("active");
	    	$(".container").removeClass("active");
	    	$(".head").removeClass("active");
		}
	});

	// Close any open menus on off click
	$(document).click(function(event) {
	    if(!$(event.target).parents('.selector').length) {
	    	$('.selector').each(function(){
		        if($(this).find('ul').css('visibility') === 'visible') {
		            $(this).find('ul').css('visibility','hidden');
		        }
	        });
	    }
	    if(!$(event.target).closest('.selector2').length) {
	        if($('.selector2').find('ul').css('visibility') === 'visible') {
	            $('.selector2').find('ul').css('visibility','hidden');
	        }
	    }     
	});

	// Handles drop down menus.
	$('.selector').click(function(event) {
		var target = $(event.target);
		if(target.get(0).tagName != "SPAN" && !target.parent('.selector').length) {
			$(this).find("span").text(target.text());
			$(this).find('.hiddenFlavor').removeClass('hiddenFlavor');
			target.addClass('hiddenFlavor');
		}
		var openmenu = $(this).find('ul');
		if(openmenu.css('visibility') === 'hidden'){
			openmenu.css('visibility','visible');
		} else {
			openmenu.css('visibility','hidden');
		}
	});

	// Handles drop down menus.
	$('.selector2').click(function(event) {
		var target = $(event.target);
		if(target.get(0).tagName != "SPAN" && !target.parent('.selector2').length) {
			$(this).find("span").text(target.text());
			$(this).find("span").css('color','#000');
			$(this).css('box-shadow','');
		}
		var openmenu = $(this).find('ul');
		if(openmenu.css('visibility') === 'hidden'){
			openmenu.css('visibility','visible');
		} else {
			openmenu.css('visibility','hidden');
		}
	});
	
	// Populates Pickup Dates from textfile.
	var pickupdates = new Array();
	var tempdate = new Array();
	var tempdatedetails = new Array();

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth(); //January is 0!
	var yyyy = today.getFullYear();
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var dateindex = 0;

	$.get('pickup.txt', function(data) {
      	pickupdates = data.split('\n');
      	for(var i=0; i<pickupdates.length; i++){
      		tempdate = pickupdates[i].split('  |  ');
      		tempdatedetails = tempdate[0].split(' ');
      		if((mm == months.indexOf(tempdatedetails[0]) && dd+1 >= tempdatedetails[1]) || (mm > months.indexOf(tempdatedetails[0]))){
      			console.log(mm + " - " + months.indexOf(tempdatedetails[0]));
      			dateindex++;
      		}
      	}
		var num = dateindex + 3;
		if(pickupdates.length - dateindex < 3){
			num = pickupdates.length - dateindex;
			console.log(pickupdates.length);
			console.log(dateindex);
		}
		var finallist = '';
		for(var n = dateindex; n < num; n++){
		    finallist += '<li>'+pickupdates[n]+'</li>';
		}
		$('#pickuptimes').html(finallist);
    }, 'text');

	// Updates cart when users "add to cart" from the top section
	$('.flavors').submit(function(){
		// Flash "Item Added" on Button
		var button = $(this).find('input[type=submit]');
		button.fadeOut('fast',function(){
			button.attr("value","Item Added").fadeIn('fast');
		});
		setTimeout(function() {
			button.fadeOut('fast',function(){
				button.attr("value","Add To Cart").fadeIn('fast');
			});
		}, 1500);
		// Update carts
		var flavorname = $(this).find("span").text().replace(/\s+/g, ''); // Get flavor name
		var producttype = $(this).attr('name').replace(/\s+/g, ''); // Get product type
		var unit = producttype + "-" + flavorname; // Combine product type and flavor name
		ga('send', 'event', 'products - heros', 'add to cart', unit);
		var num = $('#'+ unit).val();
		num++;
		$('#'+ unit).val(num);
		updateCartItems();
		return false;
	});

	// Updates cart and total when users input numbers in bottom form
	$('.numbers :input').change(function(){
		updateCartItems();
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

		//check if pickup time has been chosen
		var pickuptime = $('.selector2').find("span").text()
		if(pickuptime === "Select Pickup Time / Date"){
			$('.selector2').css('box-shadow','inset 0 0 3px red'); //change border color to red
			proceed = false;
			$('#formerrors').text("Please select a pickup time");
			$('#formerrors').css('display','block');
		}

		var phone = $("#orderform input[name=phone_number]");
		if($.trim(phone.val()) && phone.val().length < 10){
			phone.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter a valid phone number or leave blank");
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

		var lastname = $("#orderform input[name=last_name]");
		if(lastname.val().length < 2){ //if this field is empty 
			lastname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter a valid last name");
			$('#formerrors').css('display','block');
		}
		if(!$.trim(lastname.val())){ //if this field is empty 
			lastname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter your last name");
			$('#formerrors').css('display','block');
		}

		var firstname = $("#orderform input[name=first_name]");
		if(firstname.val().length < 2){ //if this field is empty 
			firstname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter a valid first name");
			$('#formerrors').css('display','block');
		}
		if(!$.trim(firstname.val())){ //if this field is empty 
			firstname.css('box-shadow','inset 0 0 3px red');
			proceed = false;
			$('#formerrors').text("Please enter your first name");
			$('#formerrors').css('display','block');
		}
		if(getNumberOfProducts() < 1){
			proceed = false;
			$('#formerrors').text("Please add an item to your cart");
			$('#formerrors').css('display','block');
		}


		if(proceed) //everything looks good! proceed...
        {
			//get input field values data to be sent to server
            post_data = {
				'firstname'			: $('input[name=first_name]').val(), 
				'lastname'			: $('input[name=last_name]').val(), 
				'emailaddress'		: $('input[name=email]').val(), 
				'phonenumber'		: $('input[name=phone_number]').val(), 
				'pickuptime'		: $('.selector2').find("span").text(),
				'total'				: $('#total').text(),

				'Pickles-Garlic'					: $('input[id=Pickles-Garlic]').val(),
				'Pickles-Spicy'						: $('input[id=Pickles-Spicy]').val(),
				'Cookies-ChocolateChip'				: $('input[id=Cookies-ChocolateChip]').val(),
				'Cookies-Snickerdoodle'				: $('input[id=Cookies-Snickerdoodle]').val(),
				'Cookies-WhiteChocolateandCranberry': $('input[id=Cookies-WhiteChocolateandCranberry]').val(),
				'BananaLoaf-Plain'					: $('input[id=BananaLoaf-Plain]').val(),
				'BananaLoaf-ChocolateChip'			: $('input[id=BananaLoaf-ChocolateChip]').val(),
				'BananaLoaf-Walnut'					: $('input[id=BananaLoaf-Walnut]').val(),
				'Bread-Plain'						: $('input[id=Bread-Plain]').val(),
				'Bread-Garlic'						: $('input[id=Bread-Garlic]').val(),
				'Lotion-Lavender'					: $('input[id=Lotion-Lavender]').val(),
				'Lotion-Rose'						: $('input[id=Lotion-Rose]').val(),
				'Lotion-Cedar'						: $('input[id=Lotion-Cedar]').val(),
				'Lotion-Citronella'					: $('input[id=Lotion-Citronella]').val(),
				'Lotion-Jasmine'					: $('input[id=Lotion-Jasmine]').val(),
				'Lotion-Spearmint'					: $('input[id=Lotion-Spearmint]').val()
			};

			$('#submit').val('sending...');

			//Ajax post data to server
            $.post('productform.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message   
					$('#formerrors').text(response.text);
					$('#formerrors').css('display','block');
				}else{
					$('#submit').val('order placed');
					$('#submit').css('background','#2d2d2d url(images/check.svg) 4% center no-repeat');
					$('#submit').css('background-size', '30px 30px');
					$('#submit').css('color','#fff');
					resetForm();
				}
            }, 'json');
		}
	});

});			