<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

try {
    $mail = new PHPMailer(true);

    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'adamazzamroma2@gmail.com';
    $mail->Password   = 'kgvs dlxs nrex hzry';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    //Recipients
    $mail->setFrom('adamazzamroma2@gmail.com', 'Test');
    $mail->addAddress('adamazzamroma2@gmail.com');

    //Content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email';
    $mail->Body    = 'This is a test email to verify PHPMailer functionality';

    $mail->send();
    echo "Test email sent successfully!";
} catch (Exception $e) {
    echo "Error: {$mail->ErrorInfo}";
    error_log("PHPMailer Test Error: " . $e->getMessage());
} 