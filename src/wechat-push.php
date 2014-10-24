<?php
include 'config.php';
include 'wechat-php-sdk/wechat.class.php';

$key = $_GET['key'];
$act = $_GET['act'];
$id = $_GET['id'];

if (strlen($siteData['getKey']) && $key !== $siteData['getKey']) {
	header('Location:' . $siteData['homePage']);
};

$options = array(
	'token' => $siteData['wechatToken'],
	'appid' => $siteData['wechatAppID'],
	'appsecret' => $siteData['wechatAppSecret']
);
$weObj = new Wechat($options);


// 查询菜单
if ($act === 'getMenu') {
	var_dump($weObj->getMenu());
	exit;
};

if ($act === 'createMenu') {
	$data = array(
		'button' => array(
			array(
				'type' => 'view',
				'name' => '伍 & 熊',
				'url' => 'http://wedding.ciaoca.com/'
			),
			array(
				'name' => '参加婚礼',
				'sub_button' => array(
					array(
						'type' => 'click',
						'name' => '我的喜帖',
						'key' => '喜帖'
					),
					array(
						'type' => 'click',
						'name' => '婚宴酒店',
						'key' => '地址'
					)
				),
			),
			array(
				'name' => '精彩互动',
				'sub_button' => array(
					array(
						'type' => 'view',
						'name' => '祝福新人',
						'url' => 'http://wedding.ciaoca.com/blessing.php'
					),
					array(
						'type' => 'click',
						'name' => '幸福瞬间',
						'key' => '照片分享'
					),
					array(
						'type' => 'pic_photo_or_album',
						'name' => '照片分享',
						'key' => 'photo_share'
					)
				),
			)
		)
	);

	$weObj->createMenu($data);
	exit;
};
?>