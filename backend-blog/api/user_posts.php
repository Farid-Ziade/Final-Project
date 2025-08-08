<?php
header("Content-type: application/json");
include "../connection.php";

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (!isset($data["id"])) {
    http_response_code(400);
    echo json_encode(["message" => "are you sure you added an id?"]);
    exit();
}
$id = intval($data["id"]);

$query = $mysqli->prepare("select * from posts where user_id = ? limit 10;");
if (!$query) {
    echo json_encode(["message" => "something is wrong in the query"]);
    exit();
}
$query->bind_param("i", $id);
$query->execute();

$result = $query->get_result();
$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}
echo json_encode(["message" => $posts]);
exit();
