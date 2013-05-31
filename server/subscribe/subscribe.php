<?php
require('rss.php');
require('../database/insertIntoDB.php');
require('../feedList/fetchIcon.php');

$feedUrl = $_POST['feedUrl'];
$status = 'failed';
$data = null;
$title = null;
$link = null;


// 查看RSS是否已经存在于数据库中
@ $db = new mysqli('localhost','reader','123','tqreader');
if(mysqli_connect_error()) {
    $status = 'failed';
    $db->close();
    echo "can't connect db";
    exit;
}
$query = 'select * from rss where xmlUrl="'.$feedUrl.'";';
$res = $db->query($query);

// 如果库中没有feed
if($res->num_rows == 0) {

    $xmlDoc = new DOMDocument();
    $xmlDoc->load($feedUrl);

    // 检查feed是否可读
    if ($xmlDoc->firstChild){

        // for rss 从源获取
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

            $status = 'success';
        } 
        // TODO for atom 从源获取
        else if($type = $xmlDoc->getElementsByTagName('feed')->item(0)) {
            
        }
        else{
            // 未知格式的feed
            $db->close();
            echo 'unknown feedUrl';
            exit;
        }
        
        // 将post写入DB 
        $status = insertIntoRss($feedUrl,$link,$title,$db);
        
        // 获取rssId
        $rssId = getRssId($link,$db);

        // 存储xml
        saveRssFile($rssId,$data);
    } 
    // 地址不能被解析
    else {
        $db->close();
        echo 'bad feedUrl';
        exit;
    }  
} 
// 如果库中已经存在就直接从库中获取
else {
    $row = $res->fetch_object();
    $title = $row->title;
    $link = $row->htmlUrl;
    $status = 'success';
    $rssId = $row->rssId;
    $data = getContent($rssId);
}

// 获取icon
//$iconUrl = fetchIcon($link);

echo json_encode(array('status'=>$status,'title'=>$title,'link'=>$link,'content'=>$data,'rssId'=>$rssId));

?>
