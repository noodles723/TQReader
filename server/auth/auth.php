<?php
    $name = $_POST['name'];
    $password = $_POST['password'];

    //connect to mysql
    $mysql = mysqli_connect('localhost','webauth','webauth');
    if(!$mysql) {
        echo 'cannot connect to mysql';
        exit;
    }
    //select the appropriate database
    $selected = mysqli_select_db($mysql,'auth');
    if(!$selected){
        echo 'cannot select database';
        exit;
    }

    //query the database
    $query = "select count(*) from authorized_users where 
              name = '".$name."' and password = sha1('".$password."')";

    $result = mysqli_query($mysql,$query);
    if(!result){
        echo "cannot run query";
        exit;
    }

    $row = mysqli_fetch_row($result);
    $count = $row[0];

    if($count > 0){
        //correct
        
    } else {
        //wrong
    }

?>
