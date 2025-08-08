<?php
header("Content-type:application/json");
include "../connection.php";
$json = file_get_contents("php://input");
$data = json_decode($json, true);
if (!isset($data["id"])) {
    http_response_code(400);
    echo json_encode(["message" => "Are you sure you added an id?"]);
    exit();
}
$id = intval($data["id"]);
$query = $mysqli->prepare("select * from posts where id = ? limit 15");
if (!$query) {
    echo json_encode(["message" => "something is wrong in the query"]);
    exit();
}
$query->bind_param("i", $id);
$query->execute();
$result = $query->get_result();
$post = $result->fetch_assoc();
if (!$post) {
    echo json_encode(["message" => "Post not found"]);
    exit();
}
echo json_encode(["message" => $post]);
exit();
