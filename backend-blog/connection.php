<?php
header("Content-type:application/json");

$localHost = "localhost";
$user = "root";
$password = "password";
$dataBase = "blog";

$mysqli = new mysqli($localHost, $user, $password, $dataBase);

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode([
        "message" => "Can't connect to database" . $mysqli->connect_error
    ]);
    exit();
}
