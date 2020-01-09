---
sidebarDepth: 3
---

# DOM

<!-- = = = = = = = = = = = = = = = = = = = -->

## DOM 树

```js
console.log(document);
```
## DOM 节点

```
├──【节点分类】
│   ├── 元素节点
│   │    └── 属性节点
│   ├── 文本节点
│   │    └── 注释节点
│   └── 文档节点：整个文档document
│
├──【节点类型】- nodeType
│   ├── 元素节点 - 1
│   │    └── 属性节点 - 2     --- 一般不查找
│   ├── 文本节点 - 3
│   │    └── 注释节点 - 8
│   ├── 文档节点 - 9
│   └── 文档声明 - 10
│
├──【节点名称】- nodeName
│   ├── 元素节点（标签同名）
│   ├── 属性节点（即属性的名称）  --- 一般不查找
│   ├── 文本节点（#text）
│   ├── 注释节点（#comment）
│   ├── 文档节点（#document）
│   └── 文档声明（html）
```

<!-- = = = = = = = = = = = = = = = = = = = -->

## DOM 关系

### 查找子级

#### childNodes 子节点

- 子节点（包含所有节点：文本节点、注释节点、元素节点）；
- 文档声明也是一个子节点；

```js
console.log(document.childNodes);

/** 
 * NodeList(2)
 * 0: html
 * 1: html.ng-scope
 */
```
- 一般关注元素节点，而非文本节点、注释节点，过滤一下：
```js
// 例子
let div = document.querySelector('#div');
let children = div.childNodes;
children = [...children].filter(item => item.nodeType == 1); // 过滤
```

#### children 子元素

- 只包含元素节点；

#### firstChild 第0个子节点

#### firstElementChild 第0个子元素

#### lastChild 最后一个子节点

#### lastElementChild 最后一个子元素

### 查找兄弟

#### nextSibling 下一个兄弟节点

#### nextElementSibling 下一个兄弟元素

#### previousSibling 上一个兄弟节点

#### previousElementSibling 上一个兄弟元素

### 查找父级

#### parentNode 父节点
#### parentElement 父节点
#### offsetParent 定位父级（元素根据定位的这个父级）

<!-- = = = = = = = = = = = = = = = = = = = -->

#### 节点 vs 元素

- 节点是包含元素节点在内的所有节点；
- 元素仅指元素节点；

### NodeList & HTMLCollection

- 获取到的是 NodeList：
  1. childNodes
  2. querySelectorAll
- 获取到的是 HTMLCollection：
  1. children
  2. getElementByTagName
  3. getElementByClassName

```
1. NodeList 有 forEach 方法，但 HTMLCollection 没有 forEach；
2. HTMLCollection 每次调用都会动态获取 - 结构变了会跟着更新；
3. NodeList 中 childNodes 可以动态更新，但 querySelectorAll 不会；
```

<!-- = = = = = = = = = = = = = = = = = = = -->

## DOM 属性操作

- ECMAScript 的2种属性操作方式：`.`、`[]`；
- 合法属性：w3c规定的元素的属性，都存在这个对象中； -------------

#### el.attributes

- 元素所有属性的集合（合法属性+自定义属性）；

```
NameNodeMap
```
- 只存了属性名，而没有属性值；

#### el.getAttribute('attr')

- 获取属性；

#### el.setAttribute('attr', 'val')

- 设置属性；

#### el.removeAttribute('attr')

- 移除属性；

#### el.hasAttribute('attr')

#### DOM属性操作 vs ECMAScript属性操作

1. ECMAScript属性操作，操作的是元素获取过后编译而成的对象，具体数据存在 **内存** 中；
2. DOM属性操作，只是存在文档中；
3. 对象中的数据类型无限制，但文档中只能存储字符串（其他类型也会被强制转换成字符串）；

- 只要操作了 innerHTML 元素的所有子元素上存在内存的事件和相关属性都会丢失；
- 若希望元素的某些属性在操作了父级的 innerHTML 之后还存在，就要将这个属性加在 DOM 中；

### data自定义属性

- HTML5新增属性自定义接口/规范；
- 在 html 标签中定义：
```html
<div id="box" data-xxx="xxxx">xxx</div>
```
- 使用 `dataset` 获取：
```js
let box = document.querySelector('#box');
console.log(box.dataset.xxx);
```
- 通过 `dataset` 修改：
```js
box.dataset.xxx = 'lalala';
```
- 通过 `dataset` 添加：
```js
box.dataset.anotherxxx = 'anotherxxxx';
```
- 同数据存入的文档之中，是一个字符串；

<!-- = = = = = = = = = = = = = = = = = = = -->

## 节点操作

### 创建节点

```js
document.createElement('tagName');

/**
 * tagName - 任意其实都会创建，但建议还是创建些合法的标签好吧...
 * 
 * 返回：创建好的节点
 */
```

### 向页面中添加节点

#### el.appendChild(node)

- 向元素末尾添加一个子级；
- 同级插入；

#### el.insertBefore(newNode, oldNode)

- 在 oldNode 前边添加入 newNode；
- 同级插入；

##### 在使用 `appendChild` 和 `insertBefore` 时，若添加的是页面上已存在节点，则会先从原位置将其删除，而后将节点添加到新位置；

#### 关于 append()

- 它是 node 节点上的方法，但浏览器兼容有问题，尽量不要使用

```
ParentNode.append 方法在 ParentNode的最后一个子节点之后插入一组 Node 对象或 DOMString 对象；
被插入的 DOMString 对象等价为 Text 节点；
```
- [一个实验性方法 | MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/append)

### 替换节点

#### parent.replaceChild(newNode, oldNode)

```js
/**
 * 返回 oldNode
 */
```

##### 在使用 `replaceChild` 时，若替换的是页面上已存在节点，则会先从原位置将其删除，而后将节点添加到新位置；


### 删除节点


#### remove()

```js
node.remove();

/**
 * 描述：将 node 从 DOM 中删除；
 * 返回：undefined；
 * 问题：不怎么兼容？！？！？！
 */
```
#### removeChild()

- 删除掉某个子元素；

```js
parent.removeChild(node);

/**
 * 描述：在 parent 下删除掉 node 节点；
 * 返回：undefined；
 */
```

### 克隆节点

- node.cloneNode(deep)
```js
/**
 * deep - 代表深度克隆还是浅克隆
 *      - fasle（只克隆元素本身及其属性）[默认]
 *      - true（克隆元素及属性，以及元素内容、后代）
 */
```
- 克隆本身并不会克隆事件，只克隆内容；

#### createDocumentFragment 文档碎片

- 只要用于做优化；
```
不建议：直接在 innerHTML 中直接 `+=` 的（这样的性能会很差，数量很多的时候可能就会添加一个渲染一次哟）；

建议：先用字符串将 元素数据 加一起，最后再使用 innerHTML 进行赋值（这样就只会往页面添加一次咯）；
```
- 比较：
```js
// 直接每次更新 innerHTML
let box = document.querySelector('#box');
console.time(1);
for (var i = 0; i < 1000; i++) {
  box.innerHTML = `<div>${i}</div>`;
}
console.timeEnd(1);

// 一次性更新 innerHTML
let box = document.querySelector('#box');
console.time(1);
let inner = '';
for (var i = 0; i < 1000; i++) {
  inner = `<div>${i}</div>`;
}
console.timeEnd(1);
box.innerHTML = inner;

// 操作 DOM
let box = document.querySelector('#box');
console.time(1);
for (var i = 0; i < 1000; i++) {
  let div = document.createElement('div');
  div.innerHTML = i;
  box.appendChild(div);
}
console.timeEnd(1);

// 文档碎片方式
let box = document.querySelector('#box');
console.time(1);
let fragment = document.createDocumentFragment();
for (var i = 0; i < 1000; i++) {
  let div = document.createElement('div');
  div.innerHTML = i;
  fragment.appendChild(div);
}
box.appendChild(fragment);
console.timeEnd(1);
// 文档碎片充当了一个容器
```
<!-- = = = = = = = = = = = = = = = = = = = -->

## 尺寸相关

### offset

- 若无绝对定位的情况下，元素的定为父级就是其父级；

#### offsetWidth、offsetHeight

- 可视宽高

```
offsetWidth/offsetHeight = width/height + padding + border；
```

#### offsetTop、offsetLeft

- 元素距离定为父级左上角的距离；

### client

#### clientWidth、clientHeight

- 可视宽高（border）；
```
clientWidth/clientHeight = width/height + padding；
```
#### clientTop、clientLeft

- 上边框/左边框宽度；

### scroll

#### scrollWidth、scrollHeight

- 内容宽高；
- `scrollHeight` - 若内容高度比元素高度高，那么它就是内容高度，否则就是元素高度（同理 `scrollWidth`，记得可能还会有一个滚动条宽度噢）

#### scrollTop、scrollLeft

- 上下/左右滚动距离；

#### onscroll 事件

### 元素相对可视区的位置

- getBoundingClientRect()

![getBoundingClientRect()](./imgs/getBoundingClientRect.png)

#### left/top/right/bottom

- `left/right` - 元素左侧距离可视区左/右侧的距离；
- `top/bottom` - 元素顶/底部，相对于可视区顶部的距离；

#### width/height

- 元素可视宽高；

## 表格操作

```js
table.tHead - 获取 thead
table.tBodies - 获取 tbody（HTMLCollection）
table.tFoot - 获取 tfoot（不常用了）
rows - 获取行（tr - HTMLCollection）
cells - 获取单元格（th、td - HTMLCollection）
```

## 案例

### 动态文件夹创建

### 学生管理系统（含上移下移）
