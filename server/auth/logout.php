<?php

require_once('bookmark_fns.php');
session_start();
$old_user = $_SESSION['valid_user'];

unset($_SESSION['valid_user']);
$result_dest = session_destroy();

if(!empty($old_user)){
    if($result_dest){
        //logout
    }else{
        //cannot logout
    }
}else{
    //not login
}

?>
