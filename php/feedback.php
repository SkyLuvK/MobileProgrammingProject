<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $feedback = $_POST['feedback'];
    $userId = $_POST['userId'];
    $photo = null;

    if (!empty($_FILES['photo']['name'])) {
        $photo = 'uploads/' . basename($_FILES['photo']['name']);
        move_uploaded_file($_FILES['photo']['tmp_name'], $photo);
    }

    $query = $db->prepare("INSERT INTO feedback (user_id, feedback, photo) VALUES (?, ?, ?)");
    $success = $query->execute([$userId, $feedback, $photo]);
    echo json_encode(['success' => $success]);
}
?>
