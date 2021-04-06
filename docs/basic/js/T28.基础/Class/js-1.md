# Class | 走入 JavaScript 的世界

## JavaScript 简介

- 脚本语言，广泛应用与 Web 应用开发，常用于为网页添加各类动态功能；
- 优：编程速度快，无需编译、简单、易学、易用、灵活性高；
- 缺：运行速度相对慢，运行时更消耗资源；

### Web中哪些时候需要用到？

- 行为交互 - 操作后就马上执行；
- 数据交互 - 搜索；
- 逻辑交互 - 选项相悖处；

### JavaScript 组成

- ECMAScript - JavaScript 语法和基本对象；
- DOM - 文档对象模型；
- BOM - 浏览器对象模型；

## JavaScript 放置位置

1. 行间 - 直接作用于当前元素 / 复用率低，结构不清晰，维护不方便；
2. 内部 - 代码分离、同页面易于维护复用 / 不同页面不易于维护、复用；
3. **外部** - 代码分离彻底、不同页面可复用、后期易维护 / 增加请求数、（推荐方式）；

### 标签属性 type

```html
<script type="text/javascript"></script>

<script></script>

<!-- 实际上，二者一致，是同一个东西 -->
```
- `type属性` 表示编写代码使用的脚本语言的内容类型 → 术语：MIME类型；
- 从 HTML5 开始，`type` 可以省略，`<script>` 默认 `text/javascript` → 同理 css；
- 若希望向下兼容低版本浏览器，建议加上；

### JavaScript 最适合的放置位置

- 代码是从上向下进行执行的；
- 页面读到 `<body>` 标签时开始解析页面，当页面结构未生成时，在 `<head>` 标签中的 js 代码若获取元素，将获取失败；

#### 2种解决方案

1. 将 `<head>` 标签中的 js 代码放置于 `window.onload = function () {...}` 事件中 → 不推荐；
2. 将 js 代码当置于 `</body>` 标签后，让 HTML 结构先行加载完成 → 推荐； 

**不推荐 1 的原因**：若 js 代码较庞大，则会需要较长的时间来读取，这会影响页面的加载，造成页面的长时间空白；
## 获取元素

### getElementById

```js
document.getElementById('...')

// 在当前文档中，通过 id 获取元素
```
- 若获取一个不存在元素，得到的结果为 `null`；
- `getElementById` 只有 `document` 有，且 id 是唯一的；
- 遇到第一个符合条件的元素，就返回第一个元素；
- js是区分大小写的!!!

### querySelector

```js
document/parent.querySelector('...') // . # div 等等

// 在当前文档中，通过元素选择器获取元素
```
- 这个 **选择器** 就是 css 中的选择器；
- 遇到第一个符合条件的元素，就返回第一个元素；
- 若获取一个不存在元素，得到的结果为 `null`；
- `document` / 指定父级；
- IE8 以下不可使用；

### 获取一组元素（类数组）

```js
parent.getElementsByTagName("标签名"); // 在父级下通过标签名获取一组元素
parent.getElementsByTagName("类名"); // 在父级下通过类名获取一组元素
parent.querySelectorAll("css selector"); // 在父级下通过css选择器获取一组元素
```
#### 类数组

- 一组元素不能直接操作，只能通过下标操作；
- 若需操作一组元素，可以使用循环；

#### 调试

```js
console.log(放置想要检查的元素) // F12 - Console控制台
```
- 元素获取完后建议 `console.log()` 检查一遍；

## 修改属性

```js
ele.style.属性 = "属性值" // 属性值外需要添加引号
```

## 变量

变量用于存储数据；

### 如何使用变量？

在使用变量之前，需要先创建变量；、

### 声明变量步骤

- 使用 **关键字** 声明变量（关键字：js 中定义好的有已定特殊含义的单词）→ 如 `var`；

  1. 准备一个变量名
  ```js
  var a;

  // var 只是让程序在解析的时候知道，这后面跟着的是一个变量名；
  ```
  2. 对变量进行赋值
  ```js
  a = 35;

  // 变量名 = 数据
  ```
- 合并声明和赋值两个步骤：
```js
var a = 35;

// var 变量名 = 赋值;
// 若想给已声明变量赋值，无需再次声明；
```
**当只声明变量，而没有赋值时，默认 `undefined`；**

#### 变量的好处

- 简化代码，增强可读性；
- 可复用；

### 变量命名规则

- 不允许数字开头；
- 不允许使用关键字和保留字；
- 允许字母、数字、下划线、美元符任意组合而成；

* **中文可以用来当作变量名，但不要那么秀，好好用全世界都认得的字母数字好吧...**

##### 若不符合规范会出现如下报错

<p style="color: red;">Uncaught SyntaxError: Invalid or unexpected token</P>
语法错误：标记无效或意外

### 关键字和保留字

- `关键字` - 当前语法中正在使用的单词；
- `保留字` - 将来可能在语法中使用的单词；

[MDN | 关键字](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Lexical_grammar#%E5%85%B3%E9%94%AE%E5%AD%97)

#### 保留关键字 - ES6

break | case | catch | class | const | continue
- | - | - | - | - | -
debugger | default | delete | do | else | export
extends | finally | for | function | if | import
in | instanceof | new | return | super | switch
this | throw | try | typeof | var | void
while | with | yield

#### 未来保留关键字

enum | implements | package | public | intetface
- | - | - | - | -
private | static | let | protected | await

**直接量 `null` 、`true` 、`false` 亦不可被当作标识使用；**

### 变量的命名风格

- 具有语义化 → 一看就知道是啥；
- 驼峰命名：
  1. 大驼峰 → `JavaScript`；
  2. 小驼峰 → `javaScript` → 多出现在 css：`fontSize`；

### 多变量的同时声明

使用英文逗号对变量名进行间隔，只需要一个关键字：
```js
var a = 19,
    b = 96,
    c = 35;
```

## 函数

### 什么是函数？

- 可重复使用的代码块

#### 如何使用函数

在使用函数之前，需要先创建函数；

#### 函数声明

- 有名函数；
- 匿名函数；

#### 函数声明步骤

- 使用关键字声明函数 → `function`

```js
// 有名函数
function fn() { ... }

// 匿名函数（不可直接创建）
function () { ... }
```

##### 匿名函数不可以直接定义，否则会报错

<p style="color: red;">Uncaught SyntaxError: Unexpected token</P>
语法错误：意外标记

#### 函数调用

- 函数创建完成后是需要调用的，否则不执行；

1. `函数名称();` → 有名函数；
2. 事件调用 → 匿名函数；

#### 标识符

- 变量名；
- 函数名（函数参数）；
- 属性名；


---

<div class="page-nav">
  <span class="prev">
    ←
    <a href="/js/class/" class="prev">Class |《JS高级工程师》</a>
  </span>
  <span class="next">
    <a href="/js/class/js-2.html" class="">Class | 玩转属性操作</a>
    →
  </span>
</div>