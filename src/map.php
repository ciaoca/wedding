<?php
include 'config.php';
?>
<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title><?=$siteData['title']?></title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui">
<meta name="viewport" content="initial-scale=1.0, maximum-scale=1, user-scalable=no, minimal-ui" media="(device-height:568px)">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-touch-fullscreen" content="yes">
<meta name="format-detection" content="telephone=no">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<link rel="apple-touch-icon-precomposed" href="/img/touch-icon-iphone.png">
<link rel="stylesheet" href="css/inline-map.css?__inline">
<!-- build:js js/plugins.js -->
<script src="js/plugins/zepto.js"></script>
<script src="js/plugins/zepto-touch.js"></script>
<script src="js/plugins/WeixinApi.js"></script>
<!-- endbuild -->
</head>
<body>
<script src="js/inline-map.js?__inline=true"></script>
</body>
</html>