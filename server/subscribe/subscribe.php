<?php
require('rss.php');
require('insertIntoDB.php');
//require('atom.php');

$feedUrl = $_POST['feedUrl'];
$status = 'failed';
$data = null;
$title = null;
$link = null;

// 查看RSS是否已经存在于数据库中
/*@ $db = new mysqli('localhost','reader','123','tqreader');
if(mysqli_connect_error()) {
    $status = 'failed';
    exit;
}
$query = 'select * from rss where xmlUrl="'.$feedUrl.'";';
$res = $db->query($query);

// 如果库中没有就从源获取
if($res->num_rows == 0) {*/
    $xmlDoc = new DOMDocument();
    $xmlDoc->load($feedUrl);

    if ($xmlDoc->firstChild){
        if($type = $xmlDoc->getElementsByTagName('channel')->item(0)){
            //deal with rss
            $title = $type->getElementsByTagName('title')->item(0)->childNodes->item(0)->nodeValue;
            if($link = $type->getElementsByTagName('link')->item(0)->firstChild) {
                $link = $link->nodeValue;
            } else {
                $link = $type->getElementsByTagName('link')->item(1)->firstChild->nodeValue;
            }
            // TODO 要解析命名空间
            $data = getRss($type);
            //$status = insertIntoRss($feedUrl,$link,$title,json_encode($data),$db);
	        //$status = insertIntoFeedlist();
            $status = 'success';
        } else if($type = $xmlDoc->getElementsByTagName('feed')->item(0)) {
            //deal with atom
            //$status = insertIntoRss($feedUrl,$link,$title,json_encode($data),$db);
	        //$status = insertIntoFeedlist();
        }
    } 
    // 地址不能被解析
    else {
        exit;
    }  
//} 
// 如果库中已经存在就直接从库中获取
/*else {
    $row = $res->fetch_object();
    $title = $row->title;
    $link = $row->htmlUrl;
    $data = json_decode($row->content);
    //$status = insertIntoFeedlist();
}*/

// TODO 获取icon

//return
echo json_encode(array('status'=>$status,'title'=>$title,'link'=>$link,'content'=>$data));
?>
