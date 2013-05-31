<?php

$listData = $_POST['list'];
$userId = $_POST['userId'];
$status = 'failed';

@ $db = new mysqli('localhost','reader','123','tqreader');
if(mysqli_connect_error()) {
    $db->close();
    echo "cannot connect to database";
    exit;
}

$listData = $db->real_escape_string($listData);
$query = 'update users set feedList="'.$listData.'" where userId='.$userId.';';
$res = $db->query($query);
 
if($res) {
    $status = 'success';
}

echo json_encode(array('status'=>$status));
?>
