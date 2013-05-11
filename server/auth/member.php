<?php

session_start();

$username = $_POST['username'];
$passwd = $_POST['passwd'];

if($username && $passwd){
    try{
        login($username,$passwd);
        $_SESSION['valid_user'] = $username;
    }
    catch (Exception $e){
        //...
    }
}

isset($_SESSION['valid_user'])

function login($username, $password){
    $conn = db_connect();

    $result = $conn->query("select * from user where username='".$username."' and passwd = sha1('".$password."')");
    if(!$result){
        //fuck suck
    }

    if($result->num_rows>0){
        return true;
    }else{
        //error
    }
}
?>
