(function(){
	var app = {
		dom: {},
		files: [
			{id: 'bg', src: 'img/home/bg.png'},
			{id: 'logo', src: 'img/home/banner_logo.png'},
			{id: 'date', src: 'img/home/banner_date.png'},
			{id: 'name', src: 'img/home/banner_name.png'},
			{id: 'frame', src: 'img/home/photo_frame.png'}
		],
		album: {
			path: 'http://wedding.ciaoca.com/album',
			list: {
				'wedding': 4,
				'happiness': 9,
				'happy': 5,
				'hangzhou': 3,
				'expo': 9,
				'graduate': 9,
				'express': 5
			}
		},
		photos: {},
		magnificPhotos: {},
		shareData: {
			link: location.href,
			title: 'Wu & Xiong\'s Wedding',
			intro: '七年我们终于修成正果，愿把我们点点滴滴的爱与你们分享，邀您一起见证。',
			cover: 'http://wedding.ciaoca.com/img/touch-icon-iphone.png'
		}
	};

	app.init = function(){
		var _this = this;

		_this.dom.win = $(window);
		_this.dom.main = $('<div class="wrap wed_main"></div>');
		_this.dom.loadLock = $('<div class="loader_lock"></div>');
		_this.dom.loadWifi = $('<div class="loader_wifi"></div>');
		_this.dom.loadQrcode = $('<div class="loader_qrcode"></div>');
		_this.dom.loadBox = $('<div class="loader" title="加载中"></div>').appendTo(_this.dom.loadLock);
		_this.dom.loadPer = $('<i></i>').appendTo(_this.dom.loadBox);
		_this.dom.loadLock.css('height', _this.dom.win.height()).appendTo('body');
		_this.dom.shareTip = $('<div class="share_tip"></div>');

		// PC or 移动端检测，只允许在移动端访问
		if (!navigator.userAgent.match(/(iPhone|iPod|Android|ios|windows mobile|Windows Phone|ucweb|rv:1.2.3.4|midp|SymbianOS)/i)) {
			_this.dom.loadBox.remove();
			_this.dom.loadQrcode.appendTo(_this.dom.loadLock);
			return;
		};

		// 是否在微信中运行
		_this.inWechat = false;

		/*
		 * 加载状态：
		 * 0: 未加载
		 * 1: 加载完成
		 * 2: 加载中
		 * 3: 异常（如：处于非 WIFI 状态下）
		 */
		_this.loadStatus = 0;

		_this.loadNow = 0;
		_this.loadProgress = 0;

		_this.loadLoop = setInterval(function(){
			if (_this.loadNow < _this.loadProgress) {
				_this.loadNow++;
				_this.dom.loadBox.attr('title', _this.loadNow + '%');
				_this.dom.loadPer.css('height', _this.loadNow + '%');
			};
		}, 100);

		_this.dom.loadWifi.on('tap', function(){
			_this.dom.loadWifi.remove();
			_this.loadStatus = 0;
			_this.loadFile();
		});

		WeixinApi.ready(function(Api){
			_this.inWechat = true;

			// 微信分享
			var _shareData = {
				link: _this.shareData.link,
				title: _this.shareData.title,
				desc: _this.shareData.intro,
				imgUrl: _this.shareData.cover
			};

			Api.shareToFriend(_shareData);
			Api.shareToTimeline(_shareData);
			
			// 非 WIFI 网络环境下访问时进行提示
			Api.getNetworkType(function(status){
				if (status === 'network_type:wifi') {
					_this.loadFile();
				} else {
					if (_this.loadStatus === 0) {
						_this.loadStatus = 3;
						_this.dom.loadWifi.appendTo(_this.dom.loadLock);
					};
				};
			});
		});

		setTimeout(function(){
			_this.loadFile();
		}, 2000);
	};

	app.loadFile = function(){
		var _this = this;

		if (_this.loadStatus !== 0) {return};
		_this.loadStatus = 2;

		_this.loader = new createjs.LoadQueue(false);
		_this.loaderError = [];

		_this.loader.on('complete', function(){
			/*
			if (_this.loaderError.length) {
				console.log(_this.loaderError.join('\r\n'));
			};
			*/

			_this.loadStatus = 1;
			_this.build();
		});

		_this.loader.on('progress', function(o){
			_this.loadProgress = Math.round(_this.loader.progress * 100);
		});

		_this.loader.on('error', function(o){
			if (o.item && o.item.src) {
				_this.loaderError.push('Error: File "' + o.item.src + '" failed to load.');
			};
		});

		if (_this.files.length) {
			_this.loader.loadManifest(_this.files);
		} else {
			_this.loadStatus = 1;
			_this.build();
		};
	};
	
	app.build = function(){
		var _this = this;
		var _template = '<div class="inbox">'
			+ '<div class="wed_banner">'
				+ '<div class="logo"></div>'
				+ '<div class="date"></div>'
				+ '<div class="name"></div>'
			+ '</div>'
			+ '<div class="wed_timeline">'
				+ '<div class="item wedding"><a class="photo" href="javascript://" rel="album" rev="wedding"></a><div class="info"><h2>今年</h2><h3>我們結婚吧</h3></div></div>'
				+ '<div class="item happiness"><a class="photo" href="javascript://" rel="album" rev="happiness"></a><div class="info"><h2>小小的幸福</h2><p>每年都一起去旅游；<br>每年生日都会准备礼物；<br>每天都希望看到妳的笑脸。</p></div></div>'
				+ '<div class="item happy"><a class="photo" href="javascript://" rel="album" rev="happy"></a><div class="info"><h2>快楽的時光</h2><p>今天没吃药，感觉萌萌哒。</p></div></div>'
				+ '<div class="item hangzhou"><a class="photo" href="javascript://" rel="album" rev="hangzhou"></a><div class="info"><h2>2011年</h2><p>为了梦想，我离开了家乡，<br>来到了杭州。<br>妳，也跟随着我，<br>一起来到这个美丽的城市。<br>谢谢妳，一路陪我走过。</p></div></div>'
				+ '<div class="item expo"><a class="photo" href="javascript://" rel="album" rev="expo"></a><div class="info"><h2>2010年</h2><p>第一次长途旅游,<br>第一次乘坐飞机，<br>去参观世博会，<br>现在回想起来，<br>那时候有点傻天真，<br>但是和妳在一起很开心。</p></div></div>'
				+ '<div class="item graduate"><a class="photo" href="javascript://" rel="album" rev="graduate"></a><div class="info"><h2>2008年7月</h2><p>我毕业了，<br>妳送我出了校园，<br>感觉到你有些不安。<br>但我相信，来年的今天，<br>我会回来迎接妳毕业。</p></div></div>'
				+ '<div class="item express"><a class="photo" href="javascript://" rel="album" rev="express"></a><div class="info"><h2>2008年1月</h2><p>那天，山上下了雪，<br>我约着妳去山上看雪，<br>我们玩得非常开心。<br>晚上，我向妳表白，<br>妳接受了。<br>妳不知道那晚我有多兴奋，<br>我想，<br>也许妳和我一样兴奋。</p></div></div>'
				+ '<div class="follow"><p>点击关注<br>体验更多互动</p><a class="qrcode" href="http://mp.weixin.qq.com/s?__biz=MzA3MDg0MTIyNg==&mid=201001745&idx=1&sn=4e815a716bd7dc8d158a751d94a0b108"></a></div>'
				+ '<a class="share" href="javascript://" rel="share" rev="wechat"></a>'
				+ '<span class="tail"></span>'
			+ '</div>'
		+ '</div>';

		clearInterval(_this.loadLoop);

		_this.dom.loadBox.addClass('end');
		_this.dom.main.html(_template).appendTo('body');

		// 预留 1s 的动画时间
		setTimeout(function(){
			_this.dom.loadLock.remove();
			_this.showTime();
		}, 1000);
	};

	app.showTime = function(){
		var _this = this;

		_this.dom.main.addClass('coming');

		// 滚动到底部，向上浏览
		// _this.dom.win.scrollTop(document.body.clientHeight);

		// 统计照片
		$.each(_this.album.list, function(i, v){
			_this.photos[i] = [];
			_this.magnificPhotos[i] = [];
			for (var j = 1; j <= v; j++) {
				_this.photos[i].push(_this.album.path + '/' + i +'/' + j + '.jpg');
				_this.magnificPhotos[i].push({src: _this.album.path + '/' + i +'/' + j + '.jpg'});
			};
		});

		if (_this.inWechat) {
			// 微信图片浏览器
			WeixinApi.ready(function(Api){
				_this.dom.main.on('tap', 'a', function(){
					var _rel = this.rel;
					var _rev = this.rev;
					
					if (_rel === 'album' && _rev && _rev.length && Array.isArray(_this.photos[_rev])) {
						Api.imagePreview(_this.photos[_rev][0], _this.photos[_rev]);

					} else if (_rel === 'share' && _rev === 'wechat') {
						_this.dom.shareTip.appendTo('body');
					};
				});
			});

		} else {
			$('<link/>', {rel: 'stylesheet', href: 'css/magnific-popup.css'}).appendTo('body');
			$('<script/>', {src: 'js/magnific-popup.min.js'}).appendTo('body');

			_this.dom.main.on('tap', 'a', function(){
				var _rel = this.rel;
				var _rev = this.rev;

				if (_rel === 'album' && _rev && _rev.length && Array.isArray(_this.magnificPhotos[_rev])) {
					$.magnificPopup.open({
						items: _this.magnificPhotos[_rev],
						gallery: {
							enabled: true
						},
						type: 'image'
					});

				} else if (_rel === 'share' && _rev === 'wechat') {
					_this.dom.shareTip.appendTo('body');
				};
			});
		};

		_this.dom.shareTip.on('tap', function(){
			_this.dom.shareTip.remove();
		});
	};

	app.init();

})();
