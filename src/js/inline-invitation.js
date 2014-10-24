(function(){
	// 微信分享
	WeixinApi.ready(function(Api){
		Api.shareToFriend({
			link: location.href,
			title: '送呈<?=$name?>台启',
			desc: '谨定于2014年11月29日星期六，为伍周敏和熊秋云举办婚礼，恭请<?=$name?>光临。',
			imgUrl: 'http://wedding.ciaoca.com/wechat-img/invitation_share.png'
		});

		Api.shareToTimeline({
			link: 'http://wedding.ciaoca.com',
			title: 'Wu & Xiong\'s Wedding',
			desc: '七年我们终于修成正果，愿把我们点点滴滴的爱与你们分享，邀您一起见证。',
			imgUrl: 'http://wedding.ciaoca.com/img/touch-icon-iphone.png'
		});
	});
})();