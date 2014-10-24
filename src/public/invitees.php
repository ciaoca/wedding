<?
/**
 * 被邀请人名单
 * 'tag' => array('Title'[, 'Key1' , 'Key2', ...])
 */
$WEDDING_INVITEES = array(
	/* Demo */
	'zs' => array('张三', '小张'),
	'lisi' => array('李四', '小李')
);

/* 测试重复项
$log = '<p>测试重复项：</p>';
$pinYin = array_keys($WEDDING_INVITEES);
$log .= '<p>原始项共计：' . count($pinYin) . '条</p>';

array_unique($pinYin);
$log .= '<p>过滤后剩余：' . count($pinYin) . '条</p>';

echo $log;
 */
?>