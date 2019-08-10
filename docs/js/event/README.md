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

### 事件冒泡 vs 事件捕获

- 2种事件流：冒泡流 & 捕获流：
  1. 事件冒泡的执行顺序：由小到大；
  2. 事件捕获的执行顺序：由大到小；

### 默认事件

- 例如：a标签的href功能 - 浏览器给的功能，都是默认事件（默认行为）；
- 阻止a标签的默认行为 - 不要浏览器给的功能；

#### e 事件对象

- 存储了许多和该事件相关的属性；


```js
let a = document.querySelector('a');
a.addEventListener('click', function (e) {
  // e 事件对象
  console.log(e);

  // 阻止浏览器默认行为
  e.preventDefault();
})
```
- 阻止浏览器默认行为：`e.preventDefault()`；
```js
a.addEventListener('click', function (e) {
  e.preventDefault();
}, {
  passive: true // 酱紫的话，e.preventDefault()就失效啦，阻止失败哟
})
```

### 取消事件监听

### removeEventListener()

```js
removeEventListener(event, fn)

/**
 * event - 事件名称
 * fn - 绑定的事件函数『不能使用匿名函数，必须是命名函数』
 *      (需要去确定)
 */
```