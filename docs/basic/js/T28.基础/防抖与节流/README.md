---
sidebarDepth: 3
---

# 防抖与节流

[掘金 | 如何全面出色的回答面试官防抖与节流提问？](https://juejin.im/post/5e1216485188253a9c440b72?utm_source=gold_browser_extension)

---

## 防抖

`debounce(fn, threshhold)`

- `fn` - 稳定状态下执行；
- `threshhold` - 恢复稳定所需间隔时；
- 在 `threshhold` 间隔内 `fn` 无论被触发多少次，都不会被响应；

```js
function debounce (fn, threshhold) {
  // 判断执行是否为函数
  if(!fn instanceof Function) {
    throw new TypeError('Expected a function')
  }
  // 设置定时器
  let timer = null
  return function () {
    clearTimeout(timer)
    // 在间隔时的区间内触发会不响应
    timer = setTimeout(() => {
      // 当度过恢复稳定所需间隔时 --> 执行后续触发
      fn.apply(this)
    }, threshhold)
  }
}
```
### 应用场景

- 表单元素校验；
- 部分搜索功能的联想结果实现；


## 节流

`throttle(fn, threshhold)`

- `fn` - 稳定状态下执行；
- `threshhold` - 限流时间间隔段；
- 限制一段时间内的 `fn` 响应次数；

### 情形1：间隔内 fn 多次触发

```js
function throttle1 (fn, threshhold) {
  // 判断执行是否为函数
  if(!fn instanceof Function) {
    throw new TypeError('Expected a function')
  }
  // 节流阀标志位 --> 模拟是否需要节流（首次默认不限流）
  let limited = false
  let start = Date.now()
  threshhold = threshhold || 500 // 含默认间隔段
  return function (...args) {
    let current = Date.now()
    // 当前时间 & 开始时间之间的时间间隔 --> 小于限流间隔段（限流），反之（不限流）
    limited = limited && current- start < threshhold
    if(!limited) {
      fn.apply(this, args)
      limited = true
      start = Date.now()
    }
  }
}
```
- 一个 `threshhold` 间隔内多次促发，`fn` 只会被执行一次，最后一次并不会进入下一个周期执行；
- 例如：连续1秒内平A了5次超过限度（节流）5次，第六次并不会说下一秒自动平A，而是直接舍去；

### 情形2：fn 触发时间点不在间隔内

```js
function throttle2(fun, threshhold) {
  // 判断执行是否为函数
  if(!fun instanceof Function) {
      throw new TypeError('Expected a function')
  }
  // 节流阀标志位 --> 模拟是否需要节流（首次默认不限流）
  let limited = false
  let timer = null
  let start = Date.now()
  threshhold = threshhold || 500 // 含默认间隔段
  return function (...args) {
    let current = Date.now()
    limited = limited && current- start < threshhold
    if (limited) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        limited = true
        start = Date.now()
        fun.apply(this, args)
      }, threshhold)
    }else {
      limited = true
      start = Date.now()
      fun.apply(this,args)
    }
  }
}
```
- 一个 `threshhold` 间隔内多次促发，`fn` 总共会执行两次，注意第二次会进入下一个`threshhold` 周期执行；

### 应用场景

- 一些鼠标跟随动画实现；
- scroll，resize, touchmove, mousemove等极易持续性促发事件的相关动画问题，降低频率；

## 二者区别

### 相同点

- 其实本质上都是为了节省程序的性能（防止高频函数调用）；
- 借助了闭包的特性来缓存变量（状态）；
- 都可以使用 setTimeout 实现；

### 区别点

- 使用防抖，可能 n 个 `threshhold` 时间间隔之后fn也没执行，但是使用节流触发的 `threshhold` 间隔内有且只执行一次；
- 同样 `threshhold` 间隔内连续触发，防抖只执行一次，而节流会执行两次，只是在不同的 `threshhold` 周期内；
- 侧重点不同，防抖侧重于稳定只能执行一次，而节流强调限周期内次数，即执行频率，不限制所有时间内的总次数；

---

## 移动端

# 移动端

1. 函数防抖和函数节流的区别？
- &&防抖：所谓防抖，就是指触发事件后在n秒内函数只能执行一次，如果在n秒内又触发了事件，则会重新计算函数执行时间。【比如人的眨眼睛，就是一定时间内眨一次】
  &&举个栗子：滚动scroll事件，不停滑动滚轮会连续触发多次滚动事件，从而调用绑定的回调函数，我们希望当我们停止滚动的时候，才触发一次回调，这时可以使用函数防抖。
  &&节流：所谓节流，就是指连续触发事件但是在n秒中只执行一次函数。节流会稀释函数的执行频率。【就是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车。只有别人没刷卡了，司机才开车】
  &&举个栗子：还是以scroll滚动事件来说吧，滚动事件是及其消耗浏览器性能的，不停触发。比如移动端通过scroll实现分页，不断滚动，我们不希望不断发送请求，只有当达到某个条件，比如，距离手机窗口底部150px才发送一个请求，接下来就是战士新页面的请求，不停滚动，如此反复；这个时候就得用到函数节流了。

  2.函数防抖的应用场景？
 给按钮加函数防抖防止表单多次提交；
 对于输入框连续输入进行AJAX验证时，用函数防抖能有效减少请求次数；函数防抖和函数节流的区别？
 判断scroll是否滑到底部，滚动事件+函数防抖；
 window的resize事件避免频繁被加载；

 3.函数节流的应用场景？
 节流可以将一些事件降低触发频率。比如懒加载时要监听计算滚动条的位置，但不必每次滑动都触发，可以降低计算的频率，而不必去浪费资源；另外还有做商品预览图的放大镜效果时，不必每次鼠标移动都计算位置。

 4.如何使用定时器实现防抖和节流？
   节流思路：每两秒允许触发一次计数时间，设置一个计数变量'timeout',每次执行加法的时候判断timeout是否为0；
            如果为0，则执行加法，将timeout变为2000，设置计数时间，在两秒后置零timeout;否则因为timeout没有置零，什么都不做，干等着就行了。
   防抖思路：冷却事件不够，就重新计算冷却时间，直至冷却时间够了再调用。
