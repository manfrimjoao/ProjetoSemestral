<?php
session_start();

$response = array('loggedin' => false);

if (isset($_SESSION['user_id'])) {
    $response['loggedin'] = true;
    $response['user_id'] = $_SESSION['user_id'];
}

echo json_encode($response);
?>
