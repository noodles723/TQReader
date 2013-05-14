<?php

$email = trim($_POST['Email']);
$passwd = $_POST['Passwd'];

@ $userDB = new mysqli('localhost','reader','123','tqreader');

if(mysqli_connect_errno()){
    echo 'Error: cannot connect to database';
    exit;
}

$query = 'select * from users where email="'.$email.'"';
$result = $userDB->query($query);

if($result->num_rows == 0){
    $res = array('status'=>'noUser');
} else {
    $row = $result->fetch_object();
    if ($passwd == $row->password){
        $res = array('status'=>'success',
                     'email'=>$row->email,
                     'name'=>$row->name);
    } else {
        $res = array('status'=>'wrongPasswd');
    }
}

echo json_encode($res);
?>
