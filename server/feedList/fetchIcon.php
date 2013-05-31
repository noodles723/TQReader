<?php

// 获取网站的icon
function fetchIcon($url){
    $searchUrl = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22".$url."%22and%20xpath%3D%22/html/head/link[@rel%3D'icon']%20|%20/html/head/link[@rel%3D'ICON']%20|%20/html/head/link[@rel%3D'shortcut%20icon']%20|%20/html/head/link[@rel%3D'SHORTCUT%20ICON']%22&format=json";
    $html = json_decode(file_get_contents($searchUrl));
    return $html->query->results->link[0]->href;
}

?>
