<?php
require 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$newPassword = password_hash($data['newPassword'], PASSWORD_BCRYPT); // Hash the new password

$query = $db->prepare("UPDATE users SET password = ? WHERE email = ?");
$success = $query->execute([$newPassword, $email]);

echo json_encode(['success' => $success]);
?>
