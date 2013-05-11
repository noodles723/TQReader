<?php

function filled_out($form_vars){
    foreach($form_vars as $key => $value){
        if((!isset($key))||($value=='')){
            return false;
        }
    }
    return true;
}

function valid_email($address){
    if(ereg('^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$',$address)){
        return true;
    } else {
        return false;
    }
}

function register($username,$email,$password){
    $conn = db_connect();

    $result = $conn->query("select * from user where username = '".$username."'");
    if(!$result){
        //fuck suck
    }
    if($result->num_rows>0){
        // the name has been taken
    }

    $result = $conn->query("insert into user values
                           ('".$username."',sha1('".$password."'),'".$email."')");
    if(!$result){
        // connot register
    }

    return true;
}

function db_connect(){
    $result = new mysqli('localhost','bm_user','password','bookmarks');
    if(!$result){
        //connot connect
    } else {
        return $result;
    }
}
?>
