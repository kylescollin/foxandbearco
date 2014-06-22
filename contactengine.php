<?php

$to = "kscollin@gmail.com";

// Destroy Bots
$redherring = Trim(stripslashes($_POST['RedHerring']));
if ($redherring){
	print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}

// Handle Response
$name = Trim(stripslashes($_POST['Name']));

$subject = "[WEBMESSAGE] - " . $name;

$email = Trim(stripslashes($_POST['Email']));

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $headers = "From: " . $email . "\r\n";
	$headers .= "Reply-To: " . $email . "\r\n";
}

$message = Trim(stripslashes($_POST['Message']));

// send email 
$success = mail($to, $subject, $message, $headers);

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=contactthanks.php\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>