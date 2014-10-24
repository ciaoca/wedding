<?php
include 'config.php';
include 'wechat-php-sdk/wechat.class.php';
include 'public/fun.php';
include 'public/invitees.php';

$options = array(
	'token' => $siteData['wechatToken'],
	'appid' => $siteData['wechatAppID'],
	'appsecret' => $siteData['wechatAppSecret']
);
$weObj = new Wechat($options);
$weObj->valid();
$weObj->getRev();


/**
 * 自动回复
 */
function msgSend($key){
	Global $WEDDING_INVITEES;
	Global $weObj;

	$key = strtolower($key);

	switch($key) {
		case 'welcome':
			// 回复文字信息
			$weObj->text("欢迎关注")->reply();
			
			/* 回复图文信息
			$weObj->news(
				array(
					 '0' => array(
						'Title' => '标题',
						'PicUrl' => '图片地址',
						'Url' => '网址'
					)
				)
			)->reply();
			*/
			break;

		case 'test':
		case '测试':
			$weObj->text("收到消息")->reply();
			break;

		default:
			// 检测是否在被邀请人名单
			$alias = '';
			$name = '';
			foreach ($WEDDING_INVITEES as $n => $v) {
				if (in_array($key, $v)) {
					$alias = $n;
					$name = $v[0];
					break;
				};
			};
	
			if (strlen($alias) && strlen($name)) {
				$weObj->news(
					array(
						 '0' => array(
							'Title' => '送呈' . $name . '台启',
							'Description' => "谨定于X年X月X日星期X，为XXX和XXX举办婚礼，恭请" . $name . "光临。\r\n时间：X时X分\r\n地点：XXXXXXXXXX",
							'PicUrl' => '图片地址',
							'Url' => 'http://wedding.ciaoca.com/invitation.php?name=' . $alias
						)
					)
				)->reply();
			};
	}
};

$msgType = $weObj->getRevType();

switch($msgType) {
	// 收到事件消息
    case Wechat::MSGTYPE_EVENT:
		$msgEvent = $weObj->getRevEvent();
		
		// 关注自动回复
		if (strtolower($msgEvent['event']) === 'subscribe') {
			msgSend('welcome');

		} elseif (strtolower($msgEvent['event']) === 'click') {
			msgSend($msgEvent['key']);
		};
		break;

	// 收到文本消息
	case Wechat::MSGTYPE_TEXT:
		$msgKey = $weObj->getRevContent();

		if (strlen($msgKey) > 20) {
			exit;
		};

		msgSend($msgKey);
		break;

	// 收到图片消息
    case Wechat::MSGTYPE_IMAGE:
		$msgImage = $weObj->getRevPic();

		// 下载图片
		$fileData = xcurl($msgImage['picurl']);
		if (is_string($fileData) && substr($fileData, 0, 10) === 'curl_error') {
			exit;
		};

		// 写入图片
		$fileFolder = 'wechat-photo/';
		$fileName = date('Ymd-His') . '-' . $weObj->getRevID();

		file_put_contents($fileFolder . $fileName, $fileData);
		$fileInfo = getimagesize($fileFolder. $fileName);

		switch($fileInfo['mime']){
			case 'image/jpeg':
				rename($fileFolder. $fileName, $fileFolder. $fileName . '.jpg');
				break;
			case 'image/png':
				rename($fileFolder. $fileName, $fileFolder. $fileName . '.png');
				break;
			case 'image/gif':
				rename($fileFolder. $fileName, $fileFolder. $fileName . '.gif');
				break;
		};

		break;

	// 自动回复
    // not default:
};
?>