<?php
    session_start();

$old_passwd = $_POST['old_passwd'];
$new_passwd = $_POST['new_passwd'];
$new_passwd2 = $_POST['new_passwd2'];

try{
    isset($_SESSION['valid_user']);
}

change_password($_SESSION['valid_user'],$old_passwd,$new_passwd);

function change_password($name,$old,$new){
    login($name,$old);
    $conn = db_connect();
    //update user set passwd = new where username = name
};

?>
