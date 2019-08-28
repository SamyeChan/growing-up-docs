# Learn | ES6 高阶

## defineProperty

- [MDN | Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

首先，我们来定义一个普通的对象：

![普通对象](./imgs/0002_defineProperty.png)

典型的 `属性+__proto__` 组合，如果要去劫持这个数据，好像无从下手啊...

酱紫的话，我们何不换一种方式去定义对象呢？

登登登登！ `definePeoperty` 出场！

```js
Object.definePeoperty(obj, prop, descriptor)
/**
 * obj - 需定义属性的对象
 *（也可以直接接受一个{}噢 - 不过这样的话，就会又新建一个新对象 - 还是建连接好～）
 * prop - 需定义/修改的属性名称
 * descriptor - 一个对象（“prop的描述符”）
 * 
 * 返回 - 对象
 */
```
一个使用小栗子：

```js
let obj = {}
/**
 * 直接使用 defineProperty() 对 obj 进行重构
 */
Object.defineProperty(obj, 'name', {
  get () {
    console.log('get - - - name');
    return 'samyechan';
  },
  set (newVal) {
    console.log('set - - - ' + newVal);
  }
})
Object.defineProperty(obj, 'age', {
  get () {
    console.log('get - - - age');
    return 22
  },
  set (newVal) {
    console.log('set - - - ' + newVal);
  }
})
console.log('- - - - - obj - - - - - - -');
console.log(obj);
obj.name;
obj.name = 'sc';
console.log('- - - - - - get/set - - - - - -');
console.log(obj);
console.log('- - - - - - for in - - - - - -');
for (let i in obj) {
  console.log(i);
}
```
输出：

![defineProperty](./imgs/0001_defineProperty.gif)

- `obj.name` 时，会执行内部 `get` 函数 - 这就拦截数据了呀；
- `obj.name = 'sc';` 时，会执行内部 `set` 函数 - 这也拦截数据了呀；
- 不可对对象进行遍历 - `undefined`；

### 属性 - configurable

- 属性是否可操作（默认false: 不可以对进行修改/删除）；

```js
let obj = {}
Object.defineProperty(obj, 'name', {
  configurable: true, // name可改
  get () {
    return 'samyechan';
  },
  set (newVal) {}
})
Object.defineProperty(obj, 'age', {
  get () {
    return 22
  },
  set (newVal) {}
})
console.log('- - - - - obj - - - - - - -');
console.log(obj);

delete obj.name;
delete obj.age;
console.log(obj);
```
输出：

![configurable](./imgs/0003_defineProperty.gif)
- 设置了 `configurable: true` 的 `name` 被删除，`age` 未被删除；

### 属性 - enumerable

- 属性是否可被循环（默认false）；

- 受影响方法（需要可枚举属性才可以哟）：
```js
// 01
for (let i in obj) {}
// 02
Object.keys();
// 03
JSON.stringfy();
// 04
Object.assign
```

## Proxy代理

vue2.0 --> defineProperty + 订阅
vue3.0 --> Proxy + TS

## 数据劫持

拦截数据后，进行某些操作

交换数据（传输数据） - xml、json；
js数据 - 对象数组

- 应用：双向绑定

## mvvm

数据驱动、数据优先

vue、angular

```js
// view model
let vm = new Vue({
  el: '#app',
  data: {
    message: '测试数据'
  }
})

```

## ES6 模块化

## AMD / CMD 模块化

## 小栗子

原生js + 面向对象思想的实现

### 插值表达式

### 双向绑定

### 指令