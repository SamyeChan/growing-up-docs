---
sidebarDepth: 3
---

# Learn | BOM

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

## location 对象

- location 地址：地址栏相关信息；
-
