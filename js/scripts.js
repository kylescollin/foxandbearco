function IsEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

$(document).ready(function() {
    $("#submitbutton").click(function() { 

        var user_name       = $('input[name=name]').val(); 
        var user_email      = $('input[name=email]').val();
        var red_herring     = $('input[name=phone]').val();
        var user_message    = $('textarea[name=message]').val();
        
        var proceed = true;

        if(user_name=="" || user_name.length < 3) { 
            $('input[name=name]').css('border-color','red');
            output = '<div class="error">Please enter your full name.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        }

        if(user_email=="" && proceed==true) {
            $('input[name=email]').css('border-color','red');
            output = '<div class="error">Please enter your email.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        } else if(!IsEmail(user_email) && proceed==true) {
            $('input[name=email]').css('border-color','red');
            output = '<div class="error">Please enter a valid email address.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        }

        if(red_herring!="") {
            output = '<div class="error">Please do not fill out this field.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        }

        if(user_message=="" && proceed==true) {  
            $('textarea[name=message]').css('border-color','red');
            output = '<div class="error">Please fill out the questions/comments field.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        } else if(user_message.length < 5 && process==true) {
            $('textarea[name=message]').css('border-color','red');
            output = '<div class="error">Message too short! Please enter something.</div>';
            $("#alert").html(output).slideDown();
            proceed = false;
        }

        if(proceed) {

            $("#submitbutton").html('Sending...');

            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
            
            $.post('contact_me.php', post_data, function(response){  
 
				if(response.type == 'error') {
					output = '<div class="error">'+response.text+'</div>';
                    $("#alert").html(output).slideDown();
                    $("#submitbutton").html('Send Message');
				} else {
					$("#submitbutton").html('<img src="img/check.svg" />Message Sent!');
					$('#contactform input').val(''); 
					$('#contactform textarea').val(''); 
				}
            }, 'json');
			
        }
    });
    
    $("#contactform input, #contactform textarea").keyup(function() { 
        $("#contactform input, #contactform textarea").css('border-color',''); 
        $("#alert").slideUp();
    });
    
});