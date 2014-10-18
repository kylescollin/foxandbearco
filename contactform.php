<?php
if($_POST)
{
	$to_email   	= "hello@foxandbearco.com";
	
	//check if its an ajax request, exit if not
    if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
		
		$output = json_encode(array( //create JSON data
			'type'=>'error', 
			'text' => 'Sorry Request must be Ajax POST'
		));
		die($output); //exit script outputting json data
    } 
	
	//Sanitize input data using PHP filter_var().
	$fullname		= filter_var($_POST["fullname"], FILTER_SANITIZE_STRING);
	$emailaddress	= filter_var($_POST["emailaddress"], FILTER_SANITIZE_EMAIL);
	$message		= filter_var($_POST["message"], FILTER_SANITIZE_STRING);
	
	//additional php validation
	if(strlen($fullname)<4){ // If length is less than 2 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Full name is too short or empty!'));
		die($output);
	}
	if(!filter_var($emailaddress, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email! - '.$emailaddress));
		die($output);
	}
	if(strlen($message)<10){ //check for valid numbers in phone number field
		$output = json_encode(array('type'=>'error', 'text' => 'Don\'t be shy! Write a little more.'));
		die($output);
	}

	//email body
	$message_body = $message;

	//subject
	$subject = "Message from: ".$fullname;
	
	//proceed with PHP email.
	$headers = 'From: '.$fullname . "\r\n" .
	'Reply-To: '.$emailaddress.'' . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	
	$send_mail = mail($to_email, $subject, $message_body, $headers);
	
	if(!$send_mail)
	{
		//If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
		$output = json_encode(array('type'=>'error', 'text' => 'Could not send mail!'));
		die($output);
	}else{
		$output = json_encode(array('type'=>'message', 'text' => 'Hi '.$firstname .' Thank you for your email'));
		die($output);
	}
}
?>