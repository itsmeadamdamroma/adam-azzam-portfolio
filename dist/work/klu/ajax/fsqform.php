<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve and sanitize inputs.
    $fullName    = strip_tags(trim($_POST['firstName']));
    $email       = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $desc        = isset($_POST['desc']) ? strip_tags(trim($_POST['desc'])) : '';

    // Assume that the ProjectType, Budget, and Duration are passed as extra fields
    // (e.g., appended via JavaScript). You can also add hidden inputs to the form.
    $projectType = isset($_POST['ProjectType']) ? strip_tags(trim($_POST['ProjectType'])) : '';
    $budget      = isset($_POST['Budget']) ? strip_tags(trim($_POST['Budget'])) : '';
    $duration    = isset($_POST['Duration']) ? strip_tags(trim($_POST['Duration'])) : '';

    $to = "adamazzamroma2@gmail.com";
    $subject = "New Project Inquiry from " . $fullName;
    $body = "Name: $fullName\nEmail: $email\nProject Type: $projectType\nBudget: $budget\nDuration: $duration\nAdditional Notes:\n$desc";
    $headers = "From: no-reply@yourdomain.com\r\n" .
               "Reply-To: $email\r\n" .
               "X-Mailer: PHP/" . phpversion();

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Your inquiry has been sent!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error sending inquiry.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
}
?>
