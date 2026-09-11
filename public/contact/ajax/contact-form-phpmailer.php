<?php
// Set error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for AJAX response
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Include PHPMailer classes
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// Check for required files
$autoloadPath = '../../vendor/autoload.php';
if (!file_exists($autoloadPath)) {
    echo json_encode([
        'success' => false,
        'message' => 'PHPMailer autoload file not found',
        'path' => $autoloadPath
    ]);
    exit;
}

require $autoloadPath;

// Get form data
$fullName = isset($_POST['FullName']) ? trim($_POST['FullName']) : '';
$email = isset($_POST['Email']) ? trim($_POST['Email']) : '';
$message = isset($_POST['Message']) ? trim($_POST['Message']) : '';

// Debug: Log received data
error_log("Form data received - Name: $fullName, Email: $email");

// Validate inputs
if (empty($fullName) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill all required fields with valid data',
        'debug' => [
            'fullName' => $fullName,
            'email' => $email,
            'message' => strlen($message) . ' chars'
        ]
    ]);
    exit;
}

// Create a new PHPMailer instance
$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;     // Enable verbose debug output
    $mail->isSMTP();                           // Send using SMTP
    $mail->Host       = 'smtp.gmail.com';      // Gmail SMTP server
    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
    $mail->Username   = 'adamazzamroma2@gmail.com'; // Gmail account
    $mail->Password   = 'kgvs dlxs nrex hzry'; // App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Enable TLS encryption
    $mail->Port       = 587;                   // TCP port to connect to
    
    // Additional debug settings
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    // Recipients
    $mail->setFrom('adamazzamroma2@gmail.com', 'RomArte Design Studio');
    $mail->addAddress('adamazzamroma2@gmail.com');
    $mail->addReplyTo($email, $fullName);

    // Content
    $mail->isHTML(true);
    $mail->Subject = "New Contact Form Submission from $fullName";
    $mail->Body    = "
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> $fullName</p>
    <p><strong>Email:</strong> $email</p>
    <p><strong>Message:</strong><br>$message</p>
    ";
    $mail->AltBody = "
    New Contact Form Submission
    ---------------------------
    Name: $fullName
    Email: $email
    Message: $message
    ";

    // Attempt to send
    if (!$mail->send()) {
        throw new Exception('Mailer Error: ' . $mail->ErrorInfo);
    }

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been received.'
    ]);

} catch (Exception $e) {
    error_log("PHPMailer Error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Sorry, there was an error sending your message.',
        'debug' => [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]
    ]);
}
?> 
