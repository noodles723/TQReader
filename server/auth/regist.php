<?php

$userName = trim($_POST['userName']);
$email = trim($_POST['regEmail']);
$passwd = $_POST['passwd'];

@ $userDB = new mysqli('localhost','reader','123','tqreader');

if(mysqli_connect_errno()){
    echo 'Error: cannot connect to database. Please try again later';
    exit;    
}

$query = 'select * from users where email="'.$email.'"';
$result = $userDB->query($query);

if($result->num_rows == 0){
    $query = 'insert into users (name,password,email) values ("'.$userName.'","'.$passwd.'","'.$email.'")';
    $result = $userDB->query($query);
    if ($result) {
        $result = 'success';
    } else {
        $result = 'failed';
    }
} else {
    $result = 'duplicate';
}

$res = array('status'=>$result);

echo json_encode($res);
?>
