# ES6之异步流程的前世今生

[掘金 | ES6之异步流程的前世今生（上）](https://juejin.im/post/5d52b835f265da03af19c863?utm_source=gold_browser_extension)

[掘金 | ES6之异步流程的前世今生（下）](https://juejin.im/post/5d53bc06f265da03ab42461f)

---

**异步编程** - 执行一个指令不会马上返回结果而执行下一个任务，而是等到特定时间时间触发后，才能得到结果；

## 基础知识

- javascript 运行在浏览器中；
- google浏览器使用 v8引擎，包含：
  1. 内栈堆 - 内存分配发生的地方；
  2. 调用堆 - 代码执行的地方；
- 运行一个函数时，解析器把该函数添加到栈中并且执行这个函数:
Web APIs: DOM、AJAX、Timeout(setTimeout)

js是一门单线程的语言， 这意味这它只有一个调用栈。

当我们堆栈执行的函数需要大量时间时，浏览器会停止响应，幸运的是我们有异步回调。

javaScript引擎 运行在宿主环境中（浏览器或者 node），
CallbackQueue  and Event Loop

事件循环和回调队列
调用栈和回调队列，当栈为空时，它会调取出队列中的第一个事件，放到调用栈中执行;

常见的 macro-task（这个队列也被叫做 task queue） 比如： setTimeout、setInterval、 setImmediate、script（整体代码）、 I/O 操作、UI 渲染等。

常见的 micro-task 比如: process.nextTick、Promise、Object.observe、MutationObserver 等。

promise 永远会在队列尾部添加微观任务

为什么Promise的代码（microtask）会比setTimeout的代码（macrotask）更优先执行，因为它太机智了，竟然会插队！

## 常见异步编程方案

### 回调函数

#### 弊端

1. 代码书写顺序与执行顺序不一致，不利于维护；
2. 回调函数大多是匿名函数，bug 追踪困难；
3. 异步操作的代码变更，后期维护麻烦；

### 事件监听

- 采用了 **事件驱动模型**；
- 任务的执行不取决与代码的顺序，取决于某个事件是否发生；

### 发布/订阅

- 观察者模式；
- 存在一个任务中心，当某个事件完成后，发射状态信号，调度中心可通知订阅了该状态信号的其他任务；

### Promise对象
