<?php
// Set headers for AJAX response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get form data
$fullName = isset($_POST['firstName']) ? trim(strip_tags($_POST['firstName'])) : '';
$email = isset($_POST['email']) ? filter_var($_POST['email'], FILTER_SANITIZE_EMAIL) : '';
$description = isset($_POST['desc']) ? trim(strip_tags($_POST['desc'])) : '';
$projectType = isset($_POST['ProjectType']) ? trim(strip_tags($_POST['ProjectType'])) : '';
$budget = isset($_POST['Budget']) ? trim(strip_tags($_POST['Budget'])) : '';
$duration = isset($_POST['Duration']) ? trim(strip_tags($_POST['Duration'])) : '';

// Validate inputs
if (empty($fullName) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please provide your name and a valid email address.'
    ]);
    exit;
}

// Create email content
$to = "adamazzamroma2@gmail.com";
$subject = "New Project Inquiry from $fullName";
$emailMessage = "
Project Inquiry Details:
------------------------
Name: $fullName
Email: $email
Project Type: $projectType
Budget: $budget
Duration: $duration

Additional Notes:
$description
";

// Set proper email headers
$headers = "From: noreply@" . $_SERVER['HTTP_HOST'] . "\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email and log attempt
$mailSent = mail($to, $subject, $emailMessage, $headers);
$logMessage = date('Y-m-d H:i:s') . " - Mail to $to: " . ($mailSent ? "SENT" : "FAILED") . "\n";
file_put_contents('mail_log.txt', $logMessage, FILE_APPEND);

// Return JSON response
if($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your project inquiry has been sent successfully.'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your inquiry. Please try again later.'
    ]);
}