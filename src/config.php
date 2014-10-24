<?
// 网站信息配置
$siteData = array(
	'title' => 'Wu & Xiong\'s Wedding',
	'timezone' => 'Asia/Shanghai',
	'root' => $_SERVER['DOCUMENT_ROOT'],
	'host' => $_SERVER['HTTP_HOST'],
	'path' => '',
	'getKey' => '',
	'cookieTime' => 259200,
	'wechatToken' => 'token',
	'wechatAppID' => 'appid',
	'wechatAppSecret' => 'appsecret',
);
$siteData['root'] .= $siteData['path'];
$siteData['homePage'] = $siteData['path'] . '/';
$siteData['loginPage'] = $siteData['path'] . '/login';
$siteData['tipsPage'] = $siteData['path'] . '/tips';

date_default_timezone_set($siteData['timezone']);
session_start();
?>