<?php
$endpoint = explode('/', $_SERVER['PATH_INFO'])[1];
if($endpoint=="start"){
    include("index.html");
    exit;
}

if($endpoint=="api"){
    // ここに処理を記述してください。
}
?>