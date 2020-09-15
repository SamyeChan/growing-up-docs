# HTML5 | Canvas

- [MDN | Canvas教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
- [一个少女心满满的例子带你入门canvas](https://blog.csdn.net/sunshine940326/article/details/76572850)

---

## 简述

- HTML5 新定义标签，旨在通过脚本（通常是 JavaScript）来绘制图形；
- 只是一个图形容器，一个画布，其本身没有绘图能力；
- 其所有绘制工作必须在 JavaScript 内部完成；
- 默认情况下，`canvas` 没有边框和内容，其默认大小为 300 * 150 → 新建 `<canvas>` 后应该设置宽高；
 
```
√ 可以通过 html 属性中的 width、height进行设置

× 绝对不能用 css 属性来设置
（→ 会使得 canvas 内的图像按照默认宽高 300*150 进行放大/缩小）
```
- 为在 `canvas` 上绘制图形，使用了一个 JavaScript 上下文对象，它能动态创建图像（creates graphics on the fly）；

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 基本用法

### `<canvas>` 元素

- 该标签只有两个属性： `width` 和 `height` → 初始 300 * 150；
- `canvas` 的大小可以通过 html 属性或 css 进行设置，但 css 会使绘制的图像按比例伸缩以适应其框架（300 * 150）→ **强推 html 设置**；

#### 替换内容

当浏览器不支持 `<canvas>` 时，就会显示替换内容：

```html
<canvas id="canvas" width="150" height="150">
  <!-- 替换内容（文字 / 图片等） -->
</canvas>
```

#### `</canvas>` 结束标签不可省

若结束标签不存在，则文档剩余部分均被认为是替代内容，将不会显现；

### 渲染上下文

`canvas` 起初是空白的，而为了展示，脚本首先需要找到渲染上下文，而后在上面绘制；
 
#### getContext()

- 用于获取渲染上下文及其绘画功能；
- `getContext()` 的参数只有一个，即上下文格式，且目前只有 `2d` 一个值；

```js
// 获取特定id的canvas绘图标签
let canvas = document.getElementById('canvas')
// 获取上下文环境
let ct = canvas.getContext('2D')
```
- `getContext('2d')` 对象是内建的 `HTML5` 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法；

### 检查支持性

通过简单检测 `getContext()` 方法是否存在，以检查编程支持性；

```js
let canvas = document.getElementById('canvas')
// 判断方法有无
if (canvas.getContext) {
  let ct = canvas.getContext('2D')
  // 效果代码
} else {
  // 替代内容
}
```

#### 简单例子：

```html
<html>
 <head>
  <script type="application/javascript">
    function draw() {
      var canvas = document.getElementById("canvas");
      if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

        ctx.fillStyle = "rgb(200,0,0)";
        ctx.fillRect (10, 10, 55, 50);

        ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
        ctx.fillRect (30, 30, 55, 50);
      }
    }
  </script>
 </head>
 <body onload="draw();">
   <canvas id="canvas" width="150" height="150"></canvas>
 </body>
</html>
```

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 绘制图形

- HTML 中的元素 canvas 只支持一种 **原生的图形绘制**：矩形；
- 所有除矩形外图形绘制都至少需要生成一条路径；

### Canvas Grid 画布栅格

![Canvas Grid 画布栅格](./imgs/canvas-grid.png)

- canvas 元素默认被网格覆盖；
- 通常，网格中的一个单元相当于 canvas 元素中 1px；
- 栅格起点：坐上角（0, 0）；
- 所有元素位置均相对于原点定位；

### 绘制矩形

canvas 提供了3种方法绘制矩形：

  1. `fillRect(x, y, width, height)` - 实心矩形；
  2. `strokeRect(x, y, width, height)` - 空心边框；
  3. `clearRect(x, y, width, height)` - 清除指定矩形区域，让清除部分完全透明；

以上的三个函数绘制之后会马上显现在 canvas 上，即时生效；

#### 添加矩形路径的绘制方法

`rect(x, y, width, height)`
- 当该方法执行时， `moveTo()` 方法自动设置坐标参数（0,0）；
- 即，当前笔触自动重置回默认坐标；

### 绘制路径

- 图形的基本元素是路径；
- 路径是通过不同颜色和宽度的线段或曲线相连形成的不同形状的点的集合；
- 一个路径，甚至一个子路径，都是 **闭合** 的；
- 涉及函数：
  1. `beginPath()` - 新建路径（图形绘制命令被指向到路径上，生成路径）；
  2. `closePath()` - 闭合路径（图形绘制命令重新指向到上下文中）；
  3. `stroke()` - 通过线条来绘制图形轮廓；
  4. `fill()` - 通过填充绘制实心图形；
- 绘制的基本步骤：
  1. 创建路径起始点 - `beginPath()`；
  2. 使用画图命令去画出路径 - `moveTo()`、`lineTo()`；
  3. 封闭路径 - `closePath()`；
  4. 通过描边或填充路径区域来渲染图形 - `stroke()`、`fill()`；

**注意**，`fill()` 函数会自闭合，`closePath()` 可省，但 `stroke()` 函数不自闭合，不可省

### 移动笔触 `moveTo()`

- 这个函数实际不能画出任何东西，但却十分有用；
- `moveTo(x, y)` - 将笔触移动到指定的坐标(x, y)上；

### 线 `lineTo()`

- `lineTo(x, y)` - 绘制一条从当前位置到指定x以及y位置的直线；

### 圆弧 `arc()`

- 绘制圆弧或者圆；
- `arc(x, y, radius, startAngle, endAngle, anticlockwise)` - 画一个以（x,y）为圆心的以 radius 为半径的圆弧（圆），从 startAngle 开始到 endAngle 结束，按照 anticlockwise 给定的方向（默认为顺时针）来生成；
- `arc()` 函数中表示角的单位是 **弧度**，而非角度 → `弧度=(Math.PI/180)*角度`；

### 二次贝塞尔曲线 及 三次贝塞尔曲线

- 用于绘制复杂有规律的图形；
- `quadraticCurveTo(cp1x, cp1y, x, y)` - 绘制二次贝塞尔曲线，(cp1x,cp1y) 为一个控制点，(x,y) 为结束点；
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` - 绘制三次贝塞尔曲线，(cp1x,cp1y) 为控制点一，(cp2x,cp2y) 为控制点二，(x,y)为结束点；

![贝塞尔曲线](./imgs/canvas-bezier-curve.png)

- 二次贝塞尔曲线有一个开始点（蓝色）、一个结束点（蓝色）以及一个控制点（红色）；
- 三次贝塞尔曲线有两个控制点；

### Path2D 对象 <badge text="x" type="error" />

- 用于缓存或记录绘画命令，已在新浏览器中支持使用；

#### 使用 SVG paths

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 使用样式 & 颜色

### 色彩 Color

- `fillStyle = color` - 填充色；
- `strokeStyle = color` - 轮廓色；
- 默认填充色、轮廓色均为黑色；
- 若需给每个图形上不同的颜色，则需重新设置 `fillStyle` 或 `strokeStyle` 的值；

### 透明度 Transparency

- `globalAlpha = transparencyValue` - 取值 [0.0, 1.0]，默认 1.0；
- `globalAlpha` 属性在需要绘制大量拥有相同透明度的图形时候相当高效；
- 透明度也可以使用 `fillStyle` 或 `strokeStyle` 使用 `rgba` 进行设置；

### 线型 Line Styles <badge text="x" type="error" />

属性 | 描述 | 值
- | -
lineWidth = value | 设置线条宽度 | /
lineCap = type | 设置线条末端样式 | butt(默认)、round、square
lineJoin = type | 设定线条与线条间接合处的样式 | miter(默认)、round、bevel
miterLimit = value | 限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度
getLineDash() | 返回一个包含当前虚线样式，长度为非负偶数的数组
setLineDash(segments) | 设置当前虚线样式
lineDashOffset = value | 设置虚线样式的起始偏移量

### 渐变 Gradients

#### 新建一个 `canvasGradient` 对象

- `createLinearGradient(x1, y1, x2, y2)` - 线性渐变 → 起点 (x1,y1) 及终点 (x2,y2)；
- `createRadialGradient(x1, y1, r1, x2, y2, r2)` - 径向渐变 → 定义一个以 (x1,y1) 为原点，半径为 r1 的圆，定义另一个以 (x2,y2) 为原点，半径为 r2 的圆；

#### 上色

`gradient.addColorStop(position, color)` - position 表渐变中颜色所在的相对位置（取值[0.0, 0.1]）；

### 图案样式 Patterns <badge text="x" type="error" />

### 阴影 Shadows <badge text="x" type="error" />

### Canvas 填充规则 <badge text="x" type="error" />



<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 绘制文本

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 使用图像

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 变形

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 合成 & 剪辑

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 基本动画

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 高级动画

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 像素处理

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 点击区域 & 无障碍访问

<!-- + + + + + + + + + + + + + + + + + + + + + -->

## 优化 Canvas

<!-- + + + + + + + + + + + + + + + + + + + + + -->
