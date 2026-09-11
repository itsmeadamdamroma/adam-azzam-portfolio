<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize inputs.
    $name    = strip_tags(trim($_POST['FullName']));
    $email   = filter_var($_POST['EmailAddress'], FILTER_SANITIZE_EMAIL);
    $message = strip_tags(trim($_POST['textarea']));

    $to = "adamazzamroma2@gmail.com";
    $subject = "New Contact Message from " . $name;
    $body = "Name: $name\nEmail: $email\nMessage:\n$message";
    $headers = "From: no-reply@yourdomain.com\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Return a JSON response.
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Thank you for contacting us!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error sending message.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>
