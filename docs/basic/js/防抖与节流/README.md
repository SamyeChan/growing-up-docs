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
