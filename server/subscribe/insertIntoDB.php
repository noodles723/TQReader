<?php

function insertIntoRss($xmlUrl,$htmlUrl,$title,$content,$db) {
    $query = 'insert into rss (xmlUrl,htmlUrl,title,content) values 
        ("'.$xmlUrl.'","'.$htmlUrl.'","'.$title.'","'.$content.'");';
    $res = $db->query($query);
    if($res){
        return 'success';
    } else {
        return 'failed';
    }
}

function insertIntoFeedlist($userId,$xmlUrl,$parentFolderName,$db) {
    $query = 'select * from rss where xmlUrl="'.$xmlUrl.'";';
    $res = $db->query($query);
    if($res) {
	    $rssId = $res->fetch_object()->rssId;
	    $unread = $res->fetch_object()->itemNum;

	    $query = 'select * from feedList where userId='.$userId.' and folderName="'.$parentFolderName.'";';
	    $res = $db->query($query);
	    if($res){
	        $parent = $res->fetch_object()->feedId;
	    } else {
	        $parent = 0;
	    }

	    $query = 'insert into feedList (rssId,userId,parent,unread) values ('.$rssId.','.$userId.','.$parent.','.$unread.');';
	    $res = $db->query($query);
	    if($res){
	        //$query = 'select * from feedList where userId='.$userId.' and rssId='$rssId';';
	        //$res = $db->query($query);
	        //return $res->fetch_onbject()->feedId;	
	        return 'success';
	    }
    }
    return 'failed';
}

?>
