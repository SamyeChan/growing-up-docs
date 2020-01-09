---
sidebarDepth: 3
---

# BOM

<!-- = = = = = = = = = = = = = = = = -->

## Window 对象

### window.innerWidth & window.innerHeight

- 可视区宽高；

### window.open

- 打开一个新窗口；

```js
window.open(URL, target, specs)

/**
  * URL - 新窗口链接
  * target - _blank(新窗口) / _self(当前窗口)
  * specs - 窗口规格设置（很多不兼容...比较freestyle）
  */

let win = window.open('');
console.log(win); // 子窗口的 Window对象

// 关闭新窗口
win.close();
```

<!-- = = = = = = = = = = = = = = = = -->

## 浏览器的各类弹窗（不再常用）

### alert

```js
alert();
```

### confirm

```js
comfirm('message');
```

### prompt

```js
prompt([msg], [defaultText]);
```

<!-- = = = = = = = = = = = = = = = = -->

## Window 常用事件

### resize 事件

- 监听窗口大小发生改变;

```js
window.onresize = function () {...}
```

### scroll 事件

- 监控滚动条位置发生变化

```js
window.onscroll = function () {
  /**
   * [ 范围：CHROME、FIREFOX、MOBILE ]
   * window.scrollY 获取纵向滚动条位置
   * window.scrollX 获取横向滚动条位置
   * window.scrollTo(x, y)
   * 
   * [ 兼容 IE ]
   * document.body.scrollLeft / document.body.scrollTop
   * 
   * [ 完全兼容 ]
   * var scrollT = document.documentElement.scrollTop || document.body.scrollTop;  - 获取
   * document.documentElement.scrollTop = document.body.scrollTop = 0  - 设置
   */
}
```

### 操作滚动条位置

<!-- = = = = = = = = = = = = = = = = -->

## location 对象

- location 地址：地址栏相关信息；

### host 

- 主机信息（域名+端口）；

### hostname 

- 主机地址 / 域名；

### href 

- 完整的地址；
- 可通过其获取，亦可设置； 

### port 

- 端口；

### pathname 

- 路径；

### protocol 

- http / https；

### search 

- 代表了 ? 后边跟随的内容（一般是 get 方式提交过来的数据）；

### replace()

- 作用与 `href` 类似；

### reload()

- 刷新页面；

### hash 

- 哈希值 - `#` 后所跟随的内容；
- 哈希值被多应用于路由领域；
- 路由(routing) - 一种分配规则，是指分组从源到目的地时，决定端到端路径的网络范围的进程 - 根据路径决定前端显示的视图；
- onhashchange 事件 - 监听 location 中得 hash 变化了
```js
window.onhashchange = function () {
  console.log(location.hash);
}
```
- 单页面应用时用的 `hash路由` 了解一下；

<!-- = = = = = = = = = = = = = = = = -->

## history 对象

- 历史记录；

### back()

- 回退到上一步；

### forward()

- 前进一步；

### go()

- 前进/回退几步；

```js
history.go(-2); // 回退至上两步

history.go(2); // 前进两步
```

##### 上面是 history 常用方法，下面是 history 路由实现原理

### state

### pushState

### popstate

<!-- = = = = = = = = = = = = = = = = -->

## navigator 对象

![Navigator](./imgs/navigator.png)

### online

- 是否在联网状态；

### userAgent

- 用户代理信息；

#### 判断当前是不是 PC

```js
function IsPC () {
  var userAgentInfo = navigator.userAgent;
  var Agents = ['Android', 'iPhone', 'SymbianOS',
                'Windows Phone', 'iPad', 'iPod']; // 移动端设备信息集合
  var flag = true;
  for (var v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}
```
#### 判断设备
```js
var ua = navigator.userAgent.toLowerCase();
if (/android|adr/gi.test(ua)) {
  // 安卓
  console.log('安卓');
} else if (/iPad/gi.test(ua)) {
  // ipad
  console.log('ipad');
} else if (/\(i[^;]+;( U;)? CPU.+Mac OS X/gi.test(ua)) {
  // 苹果
  console.log('苹果');
}
```
#### 判断不同客户端
```js
var ua = navigator.userAgent.toLowerCase();
if (ua.match(/weibo/i) == 'weibo') {
  // 新浪微博
  console.log('新浪微博');
} else if (ua.indexOf('qq/') != -1) {
  // QQ客户端
  console.log('QQ客户端');
} else if (ua.match(/MicroMessager/i) == 'micromessager') {
  var v_weixin = ua.split('micromessager')[1];
      v_weixin = v_weixin.substring(1, 6);
      v_weixin = v_weixin.split(' ')[0];
  if (v_weixin.split('.').length == 2) {
    v_weixin = v_weixin + '.0';
  }
  if (v_weixin < '6.0.2') {
    // 微信低版本（低于6.0.2）
    console.log('微信低版本（低于6.0.2）');
  } else {
    // 微信高版本（高于6.0.2）
    console.log('微信高版本（高于6.0.2）');
  }
} else {
  // 其他
  console.log('其他');
}
```
#### 区分各个浏览器
```js
var ua = navigator.userAgent.toLowerCase();
if (/msie/i.test(ua) && !/opera/.test(ua)) {
  // IE
  return ;
} else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
  // Chrome
  return ;
} else if (/opera/i.test(ua)) {
  // Opera
  return ;
} else if (/webkit/i.test(ua) && !!!!!!!!!!!!!!!) {
  // 
  return ;
}
```

### appName

## screen 对象

