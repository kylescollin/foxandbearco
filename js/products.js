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
	$('#cart').html('CART - ' + totalItems);
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

//Returns the number of different product types that have been added to the order form.
function getNumberOfProductTypes(){
	var numberofproducttypes = 0;
	$('.numbers :input').each(function(){
		if(parseInt($(this).val(), 10)>0){
			numberofproducttypes++;
		}
	});
	console.log("Total number of product types: " + numberofproducttypes);
	return numberofproducttypes;
}


$(document).ready(function(){
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
	})

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

	// Updates cart when users "add to cart" from the top section
	$('.flavors').submit(function(){
		var button = $(this).find('input[type=submit]');
		button.fadeOut('fast',function(){
			button.attr("value","Item Added").fadeIn('fast');
		});
		setTimeout(function() {
			button.fadeOut('fast',function(){
				button.attr("value","Add To Cart").fadeIn('fast');
			});
		}, 1500);
		// $('input[type=submit').attr("value","Item Added");
		// setTimeout(function() {
		// 	$('input[type=submit').attr("value","Add To Cart");
		// }, 1500);
		var unit = $(this).find("span").text().replace(/\s+/g, ''); // Get flavor name
		unit = $(this).attr('name').replace(/\s+/g, '') + "-" + unit; // Combine product name and flavor name
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

		//check for empty required fields
		$("#orderform input[required=true]").each(function(){
			$(this).css('box-shadow',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('box-shadow','inset 0 0 3px red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('box-shadow','inset 0 0 3px red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});
		//check if pickup time has been chosen
		var pickuptime = $('.selector2').find("span").text()
		if(pickuptime === "Select Pickup Time / Date"){
			$('.selector2').css('box-shadow','inset 0 0 3px red'); //change border color to red
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
			console.log("item1 + " + post_data.item1);
			//Ajax post data to server
            $.post('sendform.php', post_data, function(response){  
				if(response.type == 'error'){ //load json data from server and output message    
					output = '<div class="error">'+response.text+'</div>';
				}else{
				    output = '<div class="success">'+response.text+'</div>';
					//reset values in all input fields
					$("#orderform  input").val(''); 
				}
            }, 'json');
		}
	});

});			