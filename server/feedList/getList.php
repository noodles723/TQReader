<?php

$usrId = $_POST['id'];
$status = 'failed';

@ $db = new mysqli('localhost','reader','123','tqreader');
if(mysqli_connect_error()) {
    $db->close();
    exit;
}

$query = 'select * from users where userId=1;';
$res = $db->query($query);

if($res) {
    $row = $res->fetch_object();
    $feedList = $row->feedList;
    $status = 'success';
}

echo json_encode(array('status'=>$userId,'feedList'=>$feedList)); 
?>
