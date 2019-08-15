---
sidebarDepth: 3
---
# Learn | Event

## 事件监听器

### 事件监听和事件绑定的区别

- 直接使用 onclick 类似的方式添加方法，最后的方法会覆盖掉其前面的方法 - 事件不可累加；
- 事件监听器就不会；
- 事件监听，事件名称不需要加“on”，且事件可累加，并不会相互覆盖；
```js
div.addEventListener(type, lisener[, options|useCapture])

/**
 * type - 事件名称
 * lisener - 事件方法
 * option - 如果是boolean（true：捕获执行 / false：不捕获执行）
 * useCapture - 传递对象；
 *            - 3种值： 1. capture(true/false) - 是否在捕获阶段执行；
 *                     2. once(true/false) - 是否只执行一次（只给元素绑定一次事件）；
 *                     3. passive(true/false) - 阻止取消默认事件；
 * 
 * [ 谁捕获执行，谁就优先执行啦 - 不需要的时候就不要开启捕获啦 ]
 */
```

### 事件冒泡

【js 事件流】

- js当中的一个特性：事件会冒泡；
- DOM树的由大到小关系，如： `html > body > div > ...`；
- 如果在执行子元素事件的同时，父元素也有相同的事件，那么也会一并执行父元素事件（事件冒泡）；
- 泡泡嘛，在水底会逐渐变大的哟，然后可以类比一下，点击的小 p，然后不断向上影响；

### 事件捕获

#### 事件冒泡 vs 事件捕获

- 2种事件流：冒泡流 & 捕获流：
  1. 事件冒泡的执行顺序：由小到大；
  2. 事件捕获的执行顺序：由大到小；

### 默认事件

- 例如：a标签的href功能 - 浏览器给的功能，都是默认事件（默认行为）；
- 阻止a标签的默认行为 - 不要浏览器给的功能；

```js
let a = document.querySelector('a');
a.addEventListener('click', function (e) {
  // e 事件对象
  console.log(e);
  // 阻止浏览器默认行为
  e.preventDefault();
})
```
#### 阻止浏览器默认行为：`e.preventDefault()`

```js
a.addEventListener('click', function (e) {
  e.preventDefault();
}, {
  passive: true // 酱紫的话，e.preventDefault()就失效啦，阻止失败哟
})
```

### 取消事件监听

- `removeEventListener()`

```js
removeEventListener(event, fn)

/**
 * event - 事件名称
 * fn - 绑定的事件函数『不能使用匿名函数，必须是命名函数』
 *      (需要去确定)
 */
```

## Event 事件对象

- 事件函数中有一个默认参数；
- 存储了许多和该事件相关的属性；

### 事件源

- `e.target` - 事件触发的目标元素（实际点的那个元素）；
- `e.currentTarget` - 获取事件绑定元素（该事件实际定义所在的那个元素）；

```js
let a = document.querySelector('a');
a.addEventListener('click', function (e) {
  // e 事件对象
  console.log(e);
  // 事件触发的目标元素
  console.log(e.target);
  // 获取事件绑定元素
  console.log(e.currentTarget);
  /**
   * 事件冒泡 - 点击子元素的同时也同样触发父元素啊
   */
})
```

### 事件委托（事件代理）

```js
// 事件委托
var ul = document.querySelector('ul');
ul.addEventListener('click', function (e) {
  // 给 ul（父级）添加事件，同时也给它的儿子们（li）一并加了事件
  alert('balabababa');
  // 获取事件源(点的是哪个就返回哪个)
  console.log(e.target);
  e.target.style.background = 'pink';
  /**
   * 如果ul内还有孙子（如<p>）
   * 那其实也只会响应点击的那个元素哟（具体效果自己看）
   */
  // 可利用 tagName 判断目标元素是否是自己想添加事件的元素 - 返回的是标签大写
  console.log(e.target.tagName);
  if (e.target.tagName === 'P') {
    alert('这是p，不是li');
  }
})
```

- 优点：
  1. 可减少需要添加事件绑定的元素；
  2. 可给新增 DOM 元素添加事件（在不刷新页面的情况下）；
- 缺点：
  1. 事件处理函数中需要判断事件源增加逻辑复杂度；
  2. 祖父级和事件源之间不能有阻止冒泡；

### 鼠标移入移出事件

- `mouseenter`、`mouseleave`

```js
/**
 * 若鼠标移入/移出子元素范围，mouseover/mouseout 都会被触发der
 * 
 * 如：鼠标移入子元素时，会先打印‘移出了’，然后再打印一次‘移入了’
 */
div.addEventListener('mouseover', function () {
  console.log('移入了');
})
div.addEventListener('mouseout', function () {
  console.log('移出了');
})

/**
 * mouseenter/mouseleave 不受子元素范围干扰
 * 
 * 如：鼠标移入子元素时，将不会再次触发事件
 */

div.addEventListener('mouseenter', function () {
  console.log('移入了');
})
div.addEventListener('mouseleave', function () {
  console.log('移出了');
})
```

### 取消冒泡事件

- 想要的实现的效果：父子元素上都有事件，且互不干扰；
- 若俩元素分别直接添加事件，那个子元素就会有“事件冒泡”的情况出现；
- 需要取消子元素事件中的冒泡事件：`e.stopPropagation()` & `e.cancelBubble`；

```js
p.addEventListener('click', function (e) {
  // 1. 一个旧方法 - ie先支持，后续chrome、firefox才又支持（兼容ok）
  e.cancelBubble = true;
  // 2. 真正 w3c 中规范的取消冒泡的方法哟
  e.stopPropagation();
  alert('p');
})
```

### 鼠标位置获取

- `e.clientX` & `e.clientX` - 鼠标点击位置（相对于显示区域左上角的位置）；
- `e.pageX` & `e.pageX` - 鼠标点击位置（相对于页面的位置）；
- 前者永远相对于视口左上角，而后者是相对于页面（在页面高度 > 可视区时，区别就明显啦）；
```js
/**
 * 效果：元素跟随鼠标走
 */
let div = document.querySelector('div');
document.addEventListener('mousemove', function (e) {
  // 注意：这个要设置以下 position 噢

  // div 可跟随鼠标变动，但出了可视区宽高就傻了吧
  div.style.left = e.clientX + 'px';
  div.style.top = e.clientY + 'px';

  // 所以此处需要用 pageX、pageY
  div.style.left = e.pageX + 'px';
  div.style.top = e.pageY + 'px';

  // 但其实走出最大那个元素的限定范围也还是有问题der，但...这就是个demo啊
})
```

### 鼠标右键事件

- `contextmenu`；
- 一般都会直接加在 document 上；
- [例子] 一个自定义的右键列表：

```js
let ul = document.querySelector('ul');

// contextmenu - “文本菜单”
document.addEventListener('contextmenu', function (e) {
  // 1. 自定义菜单跟随鼠标
  ul.style.display = 'block';
  let x = e.pageX;
  let y = e.pageY;
  ul.style.left = x + 'px';
  ul.style.top = y + 'px';

  // 2. 阻止浏览器默认行为(自带的右键菜单不要出来～)
  e.preventDefault();
})
```
- 阻止默认事件：
  1. `e.preventDefault()` - 标准方法，如上；
  2. `return false` - 在事件绑定的情况下会失效，主要用于 `on...` 类的方法下：
  ```js
  document.oncontextmenu = function (e) {
    ul.style.display = 'block';
    let x = e.pageX;
    let y = e.pageY;
    ul.style.left = x + 'px';
    ul.style.top = y + 'px';
    // 只能在直接添加事件的写法下使用（低版本友好系列 - 即，不怎么推荐）
    return false;
  }
  ```

### 键盘事件

- `keydown`、`keyup`
```js
document.addEventListener('keydown', function () {
  console.log('键盘按下');
})
document.addEventListener('keyup', function () {
  console.log('键盘抬起');
})
```
- 键盘事件对象（常用）：
  1. `e.keyCode` - 键码；
  2. `e.key` - 键值；
  3. `e.altKey` - 用于判断功能键“alt”是否按下；
  4. `e.ctrlKey` - 用于判断功能键“ctrl”是否按下；
  5. `e.shiftKey` - 用于判断功能键“shift”是否按下；
- 制作组合键

### 拖拽思路详解

- `mousedown`、`mousemove`、`mouseup`
- 拖拽公式：元素当前位置 = （鼠标当前位置 - 鼠标初始位置）+ 元素初始位置
- 拖拽问题修复
- 限制范围拖拽

### 鼠标滚动事件

#### mousewheel & e.wheelDelta

```js
/**
 *  mousewheel - 兼容Chrome & IE
 */
document.addEventListener('mousewheel', function (e) {
  /**
   * e.wheelDelta - 滚轮（上：120 / 下：-120）
   * 
   */
  console.log(e.wheelDelta);
})
```

#### DOMMouseScroll & e.detail

```js
/**
 * DOMMouseScroll - 兼容Firefox
 */
document.addEventListener('DOMMouseScroll', function (e) {
  /**
   * e.detail - 滚轮（上：-3 / 下：3）
   * 
   */
  console.log(e.detail);
})
```

#### 注意：

1. `mousewheel` 与 `DOMMouseScroll` [上、下]&[正、负]对应关系相反；
2. `mousewheel` & `DOMMouseScroll` - 各有所属，同存情况下互不影响；

#### 鼠标滚动事件的封装

```js
/**
 * el - 滚动的元素
 * downFn - 鼠标滚轮向下时执行的函数
 * upFn - 鼠标滚轮向上时执行的函数
 */
function toWheel (el, downFn, upFn) {
  /**
   * Chrome & IE
   */
  el.addEventListener('mousewheel', function (e) {
    if (e.wheelDelta > 0) {
      // 向上
      // upFn && upFn();
      upFn && upFn.call(el);  // 改变 this 指向 el 咯
    } else {
      // downFn && downFn();
      downFn && downFn.call(el);
    }
  })
  /**
   * FireFox
   */
  el.addEventListener('DOMMouseScroll', function (e) {
    if (e.detail < 0) {
      // 向上
      // upFn && upFn();
      upFn && upFn.call(el);
    } else {
      // downFn && downFn();
      downFn && downFn.call(el);
    }
  })
}
```
**使用：**
```js
toWheel(div, function () {
  console.log(this) 
  /**
   *  这里的this是指向window
   * （想要改变this指向，那么需要在封装函数里改变指向，令其指向el - call()）
   */
  h += 5;
  // div.style.height = h + 'px';
  this.style.height = h + 'px';
}, function () {
  h -= 5;
  // div.style.height = h + 'px';
  this.style.height = h + 'px';
})
```


### 其他常用事件

- `dblclick` - 双击事件：
```js
btn.addEventListener('dblclick', function () {
  alert('dblclick - 双击666');
})
```

- `focus` - 输入框获取焦点：
```js
ipt.addEventListener('focus', function () {
  console.log('focus - 获取焦点');
})
```

- `blur` - 输入框失去焦点：
```js
ipt.addEventListener('blur', function () {
  console.log('blur - 失去焦点');
})
```

- `change` - 输入框失去焦点时执行（内容发生变化才会执行）：
```js
ipt.addEventListener('change', function () {
  console.log('change - 内容改变');
})
```

- `input` - 输入框内容发生变化就会执行（灵敏度高）：
```js
ipt.addEventListener('input', function () {
  console.log('input - 内容变了了了了啦');
})
```

- `submit` - 表单提交
```js
form.addEventListener('submit', function (e) {
  // 去取默认行为（解决提交后页面抖动刷新问题）
  e.preventDefault();
  console.log('submit - 提交表单事件');
})
```

- `reset` - 表单项内容重置
```js
form.addEventListener('reset', function (e) {
  console.log('reset - 重置表单事件');
})
```

- 表单的其他放方法：blur()、focus()、select()

是 **方法**，不是事件噢～
```js
document.addEventListener('keydown', function (e) {
  // 查看按键键码
  console.log(e.keyCode);
  /**
   * 想实现效果 - 回车失焦，空格聚焦
   */
  if (e.keyCode == 13) {
    txt.blur(); // 失去焦点【方法】
  }
  if (e.keyCode == 32) {
    txt.focus(); // 获取焦点【方法】
  }
  /**
   * 想实现效果：shift选中文本框内容
   */
  if (e.shiftKey) {
    txt.select(); // 选中文本框内容
  }
})
```

## 小栗子

### 键盘LTRB的八个放向控制