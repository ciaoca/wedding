#wedding
Wu &amp; Xiong's Wedding 基于微信公众号开发的微婚礼

没有使用任何数据库，所有涉及到的数据都使用文件保存，或在文件中手动设置。

##初始化
```
npm install
```

##项目打包
```
grunt build
```

##目录结构
```js
src
    ├─album             // 首页相册的大图
    │  ├─name1
    │  │  ├─1.jpg
    │  │  ├─2.jpg
    │  │  └─N.jpg
    │  ├─name2
    │  └─nameN
    │
    ├─public
    │  └─invitees.php   // 被邀请人名单
    │
    ├─wechat-img        // 微信消息推送使用的图片
    ├─wechat-log        // 微信消息日志
    ├─wechat-photo      //微信接收到的图片
    │
    ├─blessing.php      // 祝福墙
    ├─index.php         // 首页
    ├─invitation.php    // 喜帖
    ├─map.php           // 婚宴酒店地图
    ├─sign.php          // 现场签到
    ├─wechat-push.php   // 微信推送消息
    └─wechat.php        // 微信接收消息
```
