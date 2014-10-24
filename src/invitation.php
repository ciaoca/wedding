<?
include 'config.php';
include 'public/invitees.php';

$name = $_GET['name'];
if (array_key_exists($name, $WEDDING_INVITEES)) {
	$name = $WEDDING_INVITEES[$name][0];
} else {
	header('Location:' . $siteData['homePage']);
};
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
<link rel="stylesheet" href="css/inline-invitation.css?__inline=true">
</head>
<body>
<div class="wrap">
	<div class="box">
		<div class="invitee">敬邀：<?=$name?></div>
		<div class="info">
			<p>2014年11月29日 星期六</p>
			<p>时间：17:30</p>
			<p>地点：广西柳州市跃进路40号</p>
			<p>京都宾馆三楼</p>
		</div>
		<div class="qrcode">
			<p class="title">点击或扫一扫</p>
			<p>幸福微信号：fensalir</p>
			<a class="pic" href="http://mp.weixin.qq.com/s?__biz=MzA3MDg0MTIyNg==&mid=201001745&idx=1&sn=4e815a716bd7dc8d158a751d94a0b108"></a>
			<p class="tip">关注我们的公众号<br>随时获取酒店导航，还有更多精彩互动。</p>
		</div>
	</div>
</div>
<!-- build:js js/plugins.js -->
<script src="js/plugins/zepto.js"></script>
<script src="js/plugins/zepto-touch.js"></script>
<script src="js/plugins/WeixinApi.js"></script>
<!-- endbuild -->
<script src="js/inline-invitation.js?__inline=true"></script>
</body>
</html>