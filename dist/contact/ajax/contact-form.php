<?php
// Set headers for AJAX response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get form data
$fullName = isset($_POST['FullName']) ? trim($_POST['FullName']) : '';
$email = isset($_POST['Email']) ? trim($_POST['Email']) : '';
$message = isset($_POST['Message']) ? trim($_POST['Message']) : '';

// Validate inputs
if (empty($fullName) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill all required fields with valid data'
    ]);
    exit;
}

// Database connection
$dbSuccess = false;
$dbHost = 'localhost';
$dbUsername = 'root'; // Default XAMPP username
$dbPassword = ''; // Default XAMPP password is empty
$dbName = 'romartestudio'; // Use your database name here

// Connect to the database
$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if (!$conn->connect_error) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO contact_submissions (full_name, email, message, submission_date) VALUES (?, ?, ?, NOW())");
    
    if ($stmt) {
        $stmt->bind_param("sss", $fullName, $email, $message);
        
        // Execute the statement
        if ($stmt->execute()) {
            $dbSuccess = true;
        }
        
        $stmt->close();
    }
    
    $conn->close();
}

// Create email content
$to = "adamazzamroma2@gmail.com"; // Your email address
$subject = "New Contact Form Submission from $fullName";
$emailMessage = "
Contact Details:
---------------
Name: $fullName
Email: $email
Message: $message
";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$mailSent = mail($to, $subject, $emailMessage, $headers);

// Response handling
if ($mailSent || $dbSuccess) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been received.',
        'dbSaved' => $dbSuccess,
        'emailSent' => $mailSent
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error processing your message. Please try again.'
    ]);
}