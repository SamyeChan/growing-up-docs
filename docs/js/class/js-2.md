# Class | 玩转属性操作

## JS 属性操作

### 什么是属性？

- 属性：人类对于一个物体抽象方面的刻画；

### 属性操作

- 点 `.`
- 方括号 `[]`

**方括号中可以填入需要计算的东西，或者不符合标识符规范的；**

```js
var a = document.getElementById('a');
// 点
box.onclick = function() {
  box.style.width = '350px';
}
// 方括号（其中会进行一定的计算）
box['onclick'] = function() {
  box['style']['width'] = '350px';
}
// 两种方法一起使用
box['on' + 'click'] = function() {
  box['style'].width = '350px';
}

// 注意：此处的 .style 仅仅可取行间定义的样式
```

### JS 的读与写操作

```js
ele.style.color; // 读
ele.style.color = 'orange'; // 写
```

### 常用属性

- `id`；
- `className` → 类名，不可使用关键字 `class` 获取；
- `value` → 主要出现在表单标签中；
- `style`；
  - `background`；
  - `color`；
  - `width`；
  - `height`；
  - `cssText` → 集中处理样式属性操作；
- `innerHTML`；
- `href` → 链接（返回的是绝对路径）；
- `src` → 资源路径（返回的是绝对路径）；
- `tagName` → 当前标签使用的是什么标签；

```html
<img id='a' src="..." />
```
```js
var temp = document.getElementById('a');
console.log(temp.tagName) // IMG

// tagName 返会当前标签名，并为大写
```

#### 属性操作时的注意事项及常见问题

- `href` 值和 `scr` 值获取到的是绝对路径；
- `style` 是行间属性；
- `cssText` 会替换掉当前所有的行间属性；
- `class` 是关键字，需改成 `className`；
- `tagName` 获取到的是大写字母；

## 字符串

- 由一对双引号或单引号包起来的0个或多个字符组成的串；

### typeof 检测数据是不是字符串

```js
var a = '731';
console.log(typeof a); // string
```
### 简易计算器

### 加号的作用

1. 数学运算 - 做数字相加运算 → 两侧必须都是数字，否则会变成字符串连接；
2. 字符串连接 - 将加号左右两边的内容拼接，然后返出；

- 在页面中通过 id 、 class 等等获取到的元素都是 `string`，对其做加法，只会得到字符串拼接后的结果；

---

<div class="page-nav">
  <span class="prev">
    ←
    <a href="/js/class/js-1.html" class="prev">Class | 走入 JavaScript 的世界</a>
  </span>
  <span class="next">
    <a href="/js/class/js-3.html" class="">Class | if 语句和布尔值</a>
    →
  </span>
</div>