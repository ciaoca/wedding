(function(){
	var app = {
		dom: {},
		map: {
			lat: '24.337293082',
			lng: '109.416222',
			zoom: '14',
			name: '京都宾馆',
			intro: '2014.11.29 Wu and Xiong\'s Wedding',
			poiUid: 'f2f15ffbf83a1291621c678f',
			icon: 'http://wedding.ciaoca.com/img/baidumap_location.png'
		},
		shareData: {
			link: location.href,
			title: 'Wu & Xiong\'s Wedding',
			intro: '婚宴酒店：京都宾馆\n电话：0772-2300508\n地址：柳州市柳北区跃进路40号',
			cover: 'http://wedding.ciaoca.com/img/touch-icon-iphone.png'
		}
	};
	
	app.init = function(){
		var _this = this;

		_this.dom.win = $(window);
		_this.dom.main = $('<div class="wrap"></div>').appendTo('body');

		_this.map.width = _this.dom.main.width() - 40;
		_this.map.height = _this.dom.win.height() - 200;
		
		if (_this.map.width > 500) {
			_this.map.width = 500;
		};
		if (_this.map.height > 500) {
			_this.map.height = 500;
		};
		
		if (typeof window.devicePixelRatio === 'number' && window.devicePixelRatio > 1) {
			_this.map.widthOriginal = parseInt(_this.map.width * window.devicePixelRatio, 10);
			_this.map.heightOriginal = parseInt(_this.map.height * window.devicePixelRatio, 10);
		} else {
			_this.map.widthOriginal = _this.map.width;
			_this.map.heightOriginal = _this.map.height;
		};

		var _html = '<h1>婚宴酒店</h1>'
			+ '<div class="hotel">'
			+ '<h2>京都宾馆</h2>'
			+ '<p>电话：<a href="tel:0772-2300508">0772-2300508</a></p>'
			+ '<p>地址：柳州市柳北区跃进路40号</p>'
			+ '<div class="map">'
			+ '<a href="http://api.map.baidu.com/marker?location=' + _this.map.lat + ',' + _this.map.lng + '&title=' + _this.map.name + '&content=' + _this.map.intro + '&output=html">'
			+ '<img src="http://api.map.baidu.com/staticimage?width=' + _this.map.widthOriginal + '&height=' + _this.map.heightOriginal + '&center=' + _this.map.lng + ',' + _this.map.lat + '&zoom=' + _this.map.zoom + '&markers=' + _this.map.lng + ',' + _this.map.lat + '&markerStyles=-1,' + _this.map.icon + '" width="' + _this.map.width + '" height="' + _this.map.height + '">'
			+ '</a>'
			+ '</div>'
			+ '</div>'
			+ '<div class="btns">'
			+ '<a href="http://api.map.baidu.com/marker?location=' + _this.map.lat + ',' + _this.map.lng + '&title=' + _this.map.name + '&content=' + _this.map.intro + '&output=html">线路导航</a>'
			+ '<a href="http://api.map.baidu.com/place/detail?uid=' + _this.map.poiUid + '&output=html">酒店详情</a>'
			+ '<a href="http://mp.weixin.qq.com/s?__biz=MzA3MDg0MTIyNg==&mid=201001745&idx=1&sn=4e815a716bd7dc8d158a751d94a0b108">关注微信</a>'
			+ '</div>';
			
		_this.dom.main.html(_html);

		WeixinApi.ready(function(Api){
			// 微信分享
			var _shareData = {
				link: _this.shareData.link,
				title: _this.shareData.title,
				desc: _this.shareData.intro,
				imgUrl: _this.shareData.cover
			};

			Api.shareToFriend(_shareData);
			Api.shareToTimeline(_shareData);
		});
	};

	setTimeout(function(){
		// 微信中错位修正
		document.body.scrollTop = 1;
		document.body.scrollTop = 0;

		app.init();
	}, 100);
})();