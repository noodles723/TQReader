<?php

// TODO 有命名空间的问题
function getRss($type) {
    $NC_CONTENT = 'http://purl.org/rss/1.0/modules/content/';
    $items = $type->getElementsByTagName('item');
    $data = array();
    
    for($i=0;$i<$items->length;$i++){
        $title = $items->item($i)->getElementsByTagName('title')->item(0)->firstChild->nodeValue;
        $link = $items->item($i)->getElementsByTagName('link')->item(0)->firstChild->nodeValue;
        if ($description = $items->item($i)->getElementsByTagNameNS($NC_CONTENT,'encoded')->item(0)){
            $description = $description->firstChild->nodeValue;
        } else {
            $description = $items->item($i)->getElementsByTagName('description')->item(0)->firstChild->nodeValue;
        }
        $pubDate = $items->item($i)->getElementsByTagName('pubDate')->item(0)->firstChild->nodeValue;
        $creator = $items->item($i)->getElementsByTagName('creator')->item(0)->firstChild->nodeValue;
        array_push($data,array('title'=>$title,
                          'link'=>$link,
                          'description'=>$description,
                          'pubDate'=>$pubDate,
                          'creator'=>$creator));
    }

    return $data;
}

?>
