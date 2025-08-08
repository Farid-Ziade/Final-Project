<?php
header("Content-type: application/json");
include "../connection.php";
$json = file_get_contents("php://input");
$data = json_decode($json, true);
if (!isset($data["id"], $data["content"])) {
    http_response_code(400);
    echo json_encode(["message" => "did you add an id and a comment ?"]);
    exit();
}
$id = intval($data["id"]);
$content = htmlspecialchars($data["content"]);
$query = $mysqli->prepare("update comments set content=? where id= ?");
if (!$query) {
    echo json_encode(["message" => "something is wrong in the query"]);
    exit();
}
$query->bind_param("si", $content, $id);
$query->execute();
echo json_encode(["message" => "contentupdated successfully"]);
exit();
