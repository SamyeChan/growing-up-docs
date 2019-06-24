# Demo | 鼠标彩球

跟着隐藏在黑暗中的鼠标，划出一道道彩色的光线

![演示](./imgs/canvas-colorful-ball.gif)

这是科室新的分享会规则下来后留下的第一份作业，突然想起三三。一年多前他就让我学 Canvas 了，然而我却畏难了。时间果然让人在不知不觉中就成长不少，如今再看这样的效果，不说一看就会，但我不再觉得是难的了。

但可惜，我错过了一年，在不难的这上面。

---

## 分析

### 画一个圆

```js
let canvas = document.getElementById('canvas');
// 设置画布框高
//（绝对不能在 css 属性中设置宽高 → 会在默认 300*150 比例下放大/缩小）
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
// 获取上下文环境
let ct = canvas.getContext('2d');
ct.beginPath();
ct.arc(200, 200, 100, 0, 2 * Math.PI);
ct.stroke();
```

### 写一个通用圆的方法

### 让圆动起来

#### 涉及知识

- `canvas` 绘图 - `arc()` 方法；
- 原型链；

## 代码

