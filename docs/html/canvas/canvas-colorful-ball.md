# Demo | 鼠标彩球

这是科室新的分享会规则下来后留下的第一份作业，突然想起三三。一年多前他就让我学 Canvas 了，然而我却畏难了。时间果然让人在不知不觉中就成长不少，如今再看这样的效果，不说一看就会，但我不再觉得是难的了。

但可惜，我错过了一年，在不难的这上面。

![演示](./imgs/canvas-colorful-ball.gif)

跟着隐藏在黑暗中的鼠标，划出一道道彩色的光线

---

<!-- + + + + + + + + + + + + + + + + + + + + + + + + + + + -->

## 分析

单从 demo 的效果动图，可以对这个小动画作出如下的描述：

- 彩球随着鼠标的移动不断生成；
- 彩球在鼠标移动处生成；
- 彩球在生成之时面积最大，而后就会不断变小，并且发生随机位移；
- 效果好像吐泡泡，泡泡最开始很大，然后慢慢缩小，最后消失；

综上，这个动画可能涉及如下知识点：

- `canvas` 基础绘图；
- `arc()` 方法绘制圆；
- `onmousemove事件` - 效果：鼠标移动一次，生成一个圆；
- 原型链、对象、类等概念；

→ [友情跳转 | JavaScript 之面向对象编程](../../js/js/js-face-to-object.md)

### 初始化 canvas 画布环境

```js
let canvas = document.getElementById('canvas');
// 设置画布框高
//（绝对不能在 css 属性中设置宽高 → 会在默认 300*150 比例下放大/缩小）
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
// 获取上下文环境
let ct = canvas.getContext('2d');
```

### 画一个圆

```js
// 例：空心圆

// 开始一条路径
ct.beginPath();
// 创建路径（arc() - 弧线、曲线、圆等）
ct.arc(100, 100, 50, 0, 2 * Math.PI);
// 设置边色
ct.strokeStyle = 'orange';
// 填充
ct.stroke();

// fill - 实心； stroke - 空心
```

![空心圆](./imgs/canvas-single-stroke-ball.png)

### 写一个通用圆的方法

```js
// 例：实心圆
function singleRound(x, y, r, color) {
  ct.beginPath();
  ct.arc(x, y, r, 0, 2 * Math.PI);
  ct.fillStyle = color;
  ct.fill();
}

singleRound(100, 100, 50, 'orange')
```
![单个圆](./imgs/canvas-single-round.png)

### 让圆动起来

让圆位置和鼠标相关联起来，鼠标移动一次就会触发一次圆的创建：

```js
// onmousemove - 当鼠标移动即触发，在函数内返回一个当前事件对象
canvas.onmousemove = function (e) {
  // e - 包含一些当前窗口坐标等信息
  singleRound(e.clientX, e.clientY, Math.random() * 100, 'orange')
};
```
![跟着鼠标移动](./imgs/canvas-move-ball.gif)

### 让圆舞动起来

这个效果的实现起初真不知道应该怎么做，要怎么知道哪个圆需要变动？该怎么变动？后来也还是在看了 demo 代码才慢慢恍然大悟，认识到两个重要的概念——类；

1. 首先，我们需要圆能自己在生成后慢慢变小，通常页面中多圆同存，酱紫就需要考虑将圆抽离成为一个类，它拥有自己的属性和方法：

```js
// 定义单个圆原型
  function SingleBall(x, y) {
    // 获取当前圆坐标(x, y)
    this.x = x;
    this.y = y;
    // 圆坐标需要的位移量
    this.dx = 1;
    this.dy = 1;
    // 圆半径
    this.r = 30;
    // 圆颜色
    this.color = 'orange';

    // 在鼠标为导向生成的多个圆效果中，该构造函数还应传入一个存储数组（详见完整代码）
  }
```
以上是对单个圆的简单类封装，包含了基础“外观”的设置（属性）；

而关于圆的“内涵”设置（方法），因为每实例化一个类都会重新创建一个构造函数，而方法实际都一样，所以其实直接在新建类原型链的上一层进行方法的定义即可，而不在构造函数中定义方法：

```js
// 球渲染函数 - 渲染之时判断
  SingleBall.prototype.render = function (ct) {
    // 判断小球大小，如果半径小于0就应该销毁
    if (this.r < 0) {
      this.destroy();
    } else {
      ct.beginPath();
      ct.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      // 实心圆
      ct.fillStyle = this.color
      ct.fill();
    }
  }

  // 球状态刷新函数 - 小球生成时为最大状态，而后逐渐减小，直至消失
  SingleBall.prototype.refresh = function () {
    // 位移小球，并不断减小其半径
    this.x += this.dx;
    this.y += this.dy;
    this.r--
  }

  // 球销毁函数
  SingleBall.prototype.destroy = function () {
    for (let i = 0; i < ballArr.length; i++) {
      if (ballArr[i] === this) {
        ballArr.splice(i, 1);
      }
    }
  }
```

#### ES6 - class版本

```js
class SingleBall {
  constructor(x, y, arr) {
    ...
  }

  render (ct, arr) {
    ...
  }

  refresh () {
    ...
  }

  destroy (arr) {
    ...
  }
}

// 使用、调用和第一种原型链方式一致
```

![单色动态变换圆](./imgs/canvas-singlecolor-ball.gif)

<!-- + + + + + + + + + + + + + + + + + + + + + + + + + + + -->

## 完整代码

完整代码中对小球的颜色、位移等都做了随机处理，一些细节部分也比上述的有所调整及完善：

```js
  function SingleBall(x, y, arr) {
    this.x = x;
    this.y = y;
    this.dx = parseInt(Math.random()*10 - 5);
    this.dy = parseInt(Math.random()*10 - 5);
    this.r = 30;
    this.color = `rgba(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256}, ${Math.random()})`;
    arr.push(this);
  }

  SingleBall.prototype.render = function (ct) {
    if (this.r < 0) {
      this.destroy();
    } else {
      ct.beginPath();
      ct.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ct.fillStyle = this.color;
      ct.fill();
    }
  }

  SingleBall.prototype.refresh = function () {
    this.x += this.dx;
    this.y += this.dy;
    this.r--
  }

  SingleBall.prototype.destroy = function () {
    for (let i = 0; i < ballArr.length; i++) {
      if (ballArr[i] === this) {
        ballArr.splice(i, 1);
      }
    }
  }

  /* - - - - - - - - - - 执行 - - - - - - - - - - */

  // 01. 当 html 中定义了 canvas，直接 js 获取元素 + + + + +
  let canvas = document.getElementById('canvas');
  // 02. 当 html 中未定义 canvas，需要 js 生成 canvas + + + + +
  let body = document.getElementsByTagName('body')[0];
  let canvas = document.createElement('canvas');
  body.appendChild(canvas);

  // 用下列方法设置 canvas 画布大小和在 css 中设置有天差地别的不同哇！！！
  canvas.width = document.documentElement.clientWidth;
  canvas.height = document.documentElement.clientHeight;
  // 确定上下文环境
  let ct = canvas.getContext('2d');

  // 显示中的小球数组
  let ballArr = [];
  // 当鼠标移动时，就自动生成一个小球 - 捕获一个 e 就等于生成了一个
  canvas.onmousemove = (e) => {
    new SingleBall(e.clientX, e.clientY, ballArr);
  }
  // 指定周期来调用函数
  setInterval(() => {
    // 清除画布
    ct.clearRect(0, 0, canvas.width, canvas.height)
    // 逐个刷新状态
    ballArr.forEach(item => {
      item.refresh();
      // item && item.render(ct);
      item.render(ct);
    })
  }, 25)
```

![随机色动态变换圆](./imgs/canvas-mycolorful-ball.gif)

![随机色动态变换空心圆](./imgs/canvas-mycolorful-strokeball.gif)

锵锵锵～好似天女散花儿 +_+

噢，对了，要想效果更好，记得屏蔽调小鼠标哟 → `cursor: none;`
