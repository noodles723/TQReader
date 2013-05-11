<?php
    //include function
require_once("bookmark_fns.php");

$email = $_POST['email'];
$username = $_POST['username'];
$passwd = $_POST['passwd'];
$passwd2 = $_POST['passwd2'];

session_start();
try{
    if(!filled_out($_POST)){
        //填满了没
    }
    if(!valid_email($email)){
        //email格式是否正确
    }
    if($passwd != $passwd2){
        //两次输入的密码不一样j
    }
    if((strlen($passwd)<6)||(strlen($passwd)>16)){
        //检查密码长度
    }
    register($username,$email,$password);
    $_SESSION['valid_user'] = $username;
?>
