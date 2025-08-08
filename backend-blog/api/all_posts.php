<?php
header("Content-type:application/json");
include "../connection.php";

$query = $mysqli->query(("select posts.id,posts.title,(select count(*)  from comments where comments.post_id = posts.id) as comment_count from posts order by posts.id desc; "));

if (!$query) {
    echo json_encode(["message" => "something is wrong in the query"]);
    exit();
}

$posts = [];
while ($row = $query->fetch_assoc()) {
    $posts[] = $row;
}

echo json_encode($posts);
exit();
