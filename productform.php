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
	$firstname		= filter_var($_POST["firstname"], FILTER_SANITIZE_STRING);
	$lastname		= filter_var($_POST["lastname"], FILTER_SANITIZE_STRING);
	$emailaddress	= filter_var($_POST["emailaddress"], FILTER_SANITIZE_EMAIL);
	$phonenumber	= filter_var($_POST["phonenumber"], FILTER_SANITIZE_NUMBER_INT);
	$pickuptime		= filter_var($_POST["pickuptime"], FILTER_SANITIZE_STRING);
	$total			= $_POST["total"];

	$PicklesGarlic						= filter_var($_POST["Pickles-Garlic"], FILTER_SANITIZE_NUMBER_INT);
	$PicklesSpicy						= filter_var($_POST["Pickles-Spicy"], FILTER_SANITIZE_NUMBER_INT);
	$CookiesChocolateChip				= filter_var($_POST["Cookies-ChocolateChip"], FILTER_SANITIZE_NUMBER_INT);
	$CookiesSnickerdoodle				= filter_var($_POST["Cookies-Snickerdoodle"], FILTER_SANITIZE_NUMBER_INT);
	$CookiesWhiteChocolateandCranberry 	= filter_var($_POST["Cookies-WhiteChocolateandCranberry"], FILTER_SANITIZE_NUMBER_INT);
	$BananaLoafPlain					= filter_var($_POST["BananaLoaf-Plain"], FILTER_SANITIZE_NUMBER_INT);
	$BananaLoafChocolateChip			= filter_var($_POST["BananaLoaf-ChocolateChip"], FILTER_SANITIZE_NUMBER_INT);
	$BananaLoafWalnut					= filter_var($_POST["BananaLoaf-Walnut"], FILTER_SANITIZE_NUMBER_INT);
	$BreadPlain							= filter_var($_POST["Bread-Plain"], FILTER_SANITIZE_NUMBER_INT);
	$BreadGarlic						= filter_var($_POST["Bread-Garlic"], FILTER_SANITIZE_NUMBER_INT);
	$LotionLavender						= filter_var($_POST["Lotion-Lavender"], FILTER_SANITIZE_NUMBER_INT);
	$LotionRose							= filter_var($_POST["Lotion-Rose"], FILTER_SANITIZE_NUMBER_INT);
	$LotionCedar						= filter_var($_POST["Lotion-Cedar"], FILTER_SANITIZE_NUMBER_INT);
	$LotionCitronella					= filter_var($_POST["Lotion-Citronella"], FILTER_SANITIZE_NUMBER_INT);
	$LotionJasmine						= filter_var($_POST["Lotion-Jasmine"], FILTER_SANITIZE_NUMBER_INT);
	$LotionSpearmint					= filter_var($_POST["Lotion-Spearmint"], FILTER_SANITIZE_NUMBER_INT);
	
	//additional php validation
	if(strlen($firstname)<2){ // If length is less than 2 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'First name is too short or empty!'));
		die($output);
	}
	if(strlen($lastname)<2){ // If length is less than 2 it will output JSON error.
		$output = json_encode(array('type'=>'error', 'text' => 'Last name is too short or empty!'));
		die($output);
	}
	if(!filter_var($emailaddress, FILTER_VALIDATE_EMAIL)){ //email validation
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email! - '.$emailaddress));
		die($output);
	}
	if(strlen($phonenumber)>0 && strlen($phonenumber)<10){ //check for valid numbers in phone number field
		$output = json_encode(array('type'=>'error', 'text' => 'Please enter a full phone number, including area code'));
		die($output);
	}
	
	//include both email addresses
	$to_email .= ", ".$emailaddress;

	//email body
	$message_body = "Dear ".$firstname.",\r\n\r\n";

	$message_body .= "Thank you for placing your order at Fox & Bear Co.\r\n";
	$message_body .= "Your order has been received and we’re warming up our kitchen now.\r\n\r\n";

	$message_body .= "Please review your order below and the pick up time you selected. If you have any questions or need to change your pick up time, please don’t hesitate to email us at hello@foxandbearco.com or call us at 347.746.5896.\r\n\r\n";

	$message_body .= "Sold to:\r\n";
	$message_body .= $firstname." ".$lastname."\r\n";
	$message_body .= "Email: ".$emailaddress."\r\n";
	if($phonenumber != ""){
		$message_body .= "Phone Number: ".$phonenumber."\r\n";
	}
	$message_body .= "\r\n";

	//separate pickup time string
	list($date, $timelocation) = explode('  |  ', $pickuptime);
	list($time, $location) = explode('  —  ', $timelocation);

	$message_body .= "We’re excited to see you on Sunday, ".$date." between ".$time." at ".$location." St. in Williamsburg\r\n\r\n";

	$message_body .= "Order summary:\r\n";
	if($PicklesGarlic>0){
		$message_body .= "• Pickles - Garlic: ".$PicklesGarlic."\r\n";
	}
	if($PicklesSpicy>0){
		$message_body .= "• Pickles - Spicy: ".$PicklesSpicy."\r\n";
	}
	if($CookiesChocolateChip>0){
		$message_body .= "• Cookies - Chocolate Chip: ".$CookiesChocolateChip."\r\n";
	}
	if($CookiesSnickerdoodle>0){
		$message_body .= "• Cookies - Snickerdoodle: ".$CookiesSnickerdoodle."\r\n";
	}
	if($CookiesWhiteChocolateandCranberry>0){
		$message_body .= "• Cookies - White Chocolate and Cranberry: ".$CookiesWhiteChocolateandCranberry."\r\n";
	}
	if($BananaLoafPlain>0){
		$message_body .= "• BananaLoaf - Plain: ".$BananaLoafPlain."\r\n";
	}
	if($BananaLoafChocolateChip>0){
		$message_body .= "• BananaLoaf - Chocolate Chip: ".$BananaLoafChocolateChip."\r\n";
	}
	if($BananaLoafWalnut>0){
		$message_body .= "• BananaLoaf - Walnut: ".$BananaLoafWalnut."\r\n";
	}
	if($BreadPlain>0){
		$message_body .= "• Bread - Plain: ".$BreadPlain."\r\n";
	}
	if($BreadGarlic>0){
		$message_body .= "• Bread - Garlic: ".$BreadGarlic."\r\n";
	}
	if($LotionLavender>0){
		$message_body .= "• Lotion - Lavender: ".$LotionLavender."\r\n";
	}
	if($LotionRose>0){
		$message_body .= "• Lotion - Rose: ".$LotionRose."\r\n";
	}
	if($LotionCedar>0){
		$message_body .= "• Lotion - Cedar: ".$LotionCedar."\r\n";
	}
	if($LotionCitronella>0){
		$message_body .= "• Lotion - Citronella: ".$LotionCitronella."\r\n";
	}
	if($LotionJasmine>0){
		$message_body .= "• Lotion - Jasmine: ".$LotionJasmine."\r\n";
	}
	if($LotionSpearmint>0){
		$message_body .= "• Lotion - Spearmint: ".$LotionSpearmint."\r\n";
	}

	$message_body .= "\r\nTotal Due Upon Pickup: ".$total;

	$message_body .= "\r\n\r\nWe accept cash, and credit cards!\r\n\r\nThanks so much!\r\n- Fox & Bear";

	//subject
	$subject = "Thanks for your order ".$firstname." ".$lastname."!";
	
	//proceed with PHP email.
	//$headers = 'From: '.$firstname." ".$lastname.'' . "\r\n" .
	$headers = 'From: Fox & Bear Co. <hello@foxandbearco.com>'. "\r\n" .
	'Reply-To: hello@foxandbearco.com' . "\r\n" .
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