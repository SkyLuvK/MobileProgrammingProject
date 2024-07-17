<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userId = $_GET['id'];
    $query = $db->prepare("SELECT id, name, email FROM users WHERE id = ?");
    $query->execute([$userId]);
    $user = $query->fetch(PDO::FETCH_ASSOC);
    
    if ($user) {
        echo json_encode(['success' => true, 'data' => $user]);
    } else {
        echo json_encode(['success' => false, 'message' => 'User not found']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $userId = $data['id'];
    $name = $data['name'];
    $email = $data['email'];
    
    $query = $db->prepare("UPDATE users SET name = ?, email = ? WHERE id = ?");
    $success = $query->execute([$name, $email, $userId]);
    echo json_encode(['success' => $success]);
}
?>
