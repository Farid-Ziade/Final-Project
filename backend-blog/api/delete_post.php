<?php
header("Content-type: application/json");
include "../connection.php";
$json = file_get_contents("php://input");
$data = json_decode($json, true);
if (!isset($data["id"])) {
    http_response_code(400);
    echo json_encode(["message" => "Are you sure you added an id?"]);
    exit();
}
$id = intval($data["id"]);
$query = $mysqli->prepare("delete from posts where id = ?");
if (!$query) {
    echo json_encode(["message" => "something is wrong in the query"]);
    exit();
} else {
    $query->bind_param("i", $id);
    $query->execute();
    echo json_encode(["mesage" => "User deleted"]);
    exit();
}
