<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$securityAnswer = $data['securityAnswer']; // Receive security answer

// Check if email and security answer match
$query = $db->prepare("SELECT * FROM users WHERE email = ? AND security_answer = ?");
$query->execute([$email, $securityAnswer]);
$user = $query->fetch(PDO::FETCH_ASSOC);

if ($user) {
  echo json_encode(['success' => true, 'message' => 'Security answer matched']);
} else {
  echo json_encode(['success' => false, 'message' => 'Email or security answer is incorrect']);
}
?>
