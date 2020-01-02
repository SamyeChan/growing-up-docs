# 异步处理

- Promise
- async
- await

## 同步 vs 异步

- 同步和异步是一种消息通知机制

#### 01 同步 - A调用B，B处理获得结果后，才返回A；

```js
/**
 * 用代码描述『同步』
 */
alert('事件1');
function fn() {
  console.log('事件2？！');
}
fn();
```

#### 02 异常 - A调用B，无需等待B的结果，B通过状态通知A或回调函数来处理；

```js
/**
 * 用代码描述『异步』
 */
setTimeout(function () {
  alert('- - - - 001 - - - - 延迟1s出来了')
}, 1000)
alert('- - - - 002 - - - - 我前面其实有个延迟的家伙');
```

## Promise

- ES6 - Promise对象；
- 一个构造函数，用于生成 Promise 实例；
- Promise对象代表了未来某个将要发生的事情（通常是一个**异步操作**）；
- **好处**：将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数；
- **3种状态**：pending（等待）、resolve（成功）、reject（失败）；

```js
// promise有两个参数：resolve、reject（
// (这两个参数名不是固定死的，但一般就用这默认的，别太秀好吧）
let p = new Promise((resolve, reject) => {
  // 成功的回调函数 - 加在成功的地方（进then）
  // resolve('成功');
  // 失败的回调函数 - 加在失败的地方（进catch）
  // reject('失败');
  // [catch是捕获then里所有的reject]

  // 模拟一个异步处理
  setTimeout(function () {
    resolve('resolve');
  }, 1000)
});
// then是在promise返回结果之后才执行的（FROM resolve）
p.then(info => {
  console.log(`我是从${info}到的then啦～`);
})
console.log(p);
```
```js
1. new Promise() - 帮助生成一个Promise实例；
2. 实例有3种状态：pending、resolve、reject；
3. pending没有值，仅显示Promise状态；
4. 成功与否取决于自身调用了哪个函数：resolv/reject；
```

#### then 可以传递2个函数
1. 成功时执行的函数；
2. 失败时执行的函数；
```js
// then是在promise返回结果之后才执行的
p.then(info => {
  console.log(`我是从${info}到的then啦～`); // 第一个参数（resolve）
}, info => {
  console.log(`我是从${info}到的then啦～`); // 第二个参数（reject）
})
```

- then 方法 & try/catch - 图片加载；
- then 返回值 - 会返回一个新的 Promise 对象，但其状态会有几种情况：
  1. 

![Promise-resolve](./imgs/promise.png)


## Async 函数和 await
## 链式动画

## await-to-js

- [简书 | JavaScript 如何优雅的处理 async/await 异常](https://www.jianshu.com/p/2935c0330dd2)
- [Github | await-to-js](https://github.com/scopsy/await-to-js)
