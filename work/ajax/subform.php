<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize the submitted email.
    $email = filter_var($_POST['cm-jthktkk-jthktkk'], FILTER_SANITIZE_EMAIL);
    
    // Email details.
    $to = "adamazzamroma2@gmail.com";
    $subject = "New Newsletter Subscription";
    $message = "A new user subscribed with the email: " . $email;
    // Change "no-reply@yourdomain.com" to an email associated with your domain.
    $headers = "From: no-reply@yourdomain.com\r\n" .
               "Reply-To: no-reply@yourdomain.com\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo "Subscription successful!";
    } else {
        echo "Error sending email.";
    }
} else {
    echo "Invalid request.";
}
?>
