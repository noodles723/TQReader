<?php

function insertIntoRss($xmlUrl,$htmlUrl,$title,$db) {
    //$query = 'insert into rss (xmlUrl,htmlUrl,title,content) values 
    //    ("'.$xmlUrl.'","'.$htmlUrl.'","'.$title.'","'.$content.'");';
    $query = 'insert into rss (xmlUrl,htmlUrl,title,cited) values ("'.$xmlUrl.'","'.$htmlUrl.'","'.$title.'",1);';
    
    $res = $db->query($query);
    if($res){
        return 'success';
    } else {
        return 'failed';
    }
}

function saveRssFile($id,$data) {
    $fp = fopen("../files/".$id.".txt",'wb+');

    if(!$fp) {
        fclose($fp);
        return;
    }
    flock($fp,LOCK_EX);
    //fwrite($fp,$data);
    file_put_contents('../files/'.$id.'.txt',var_export($data,true));
    flock($fp,LOCK_UN);
    fclose($fp);
    return;
}

function getContent($id) {
    $content = file_get_contents('../files/'.$id.'.txt');

    $data = eval('return '.$content.';');

    return $data;
}

function getRssId($link,$db){
    $query = 'select * from rss where htmlUrl="'.$link.'";';
    $res = $db->query($query);
    if($res) {
        $row = $res->fetch_object();
        return $row->rssId;
    } else {
        return false;
    }
}

?>
