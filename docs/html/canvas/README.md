# HTML5 | Canvas

[一个少女心满满的例子带你入门canvas](https://blog.csdn.net/sunshine940326/article/details/76572850)

---

## 简述

- HTML5 新定义标签，旨在通过脚本（通常是 JavaScript）来绘制图形；
- 只是一个图形容器，一个画布，其本身没有绘图能力；
- 其所有绘制工作必须在 JavaScript 内部完成；
- 默认情况下，`canvas` 没有边框和内容 → 新建 `<canvas>` 后应该设置宽高；
 
 ```
 √ 可以通过 html 属性中的 width、height进行设置
 
 × 绝对不能用 css 属性来设置
 （→ 会使得 canvas 内的图像按照默认宽高 300*150 进行放大/缩小）
 ```

 ### getContext()

- `context` 是一个封装了很多绘图功能的对象；
- 在页面中创建一个 `canvas` 标签之后，首先要使用 `getContext()` 获取 `canvas` 的上下文环境；
- 目前 `getContext()` 的参数只有 `2d`；
- `getContext('2d')` 对象是内建的 `HTML5` 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法；

## 绘制图像

1. `fill()`

2. `stroke()`

### 绘制矩形

1. `fillRect(x, y, width, height)` - 实心
2. `strokeRect(x, y, width, height)` - 空心

#### 清除矩形区域

是根据设定的区域清除其中的画布

```js
clearRect(x, y, width, height)
```