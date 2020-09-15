# Learn | 面向对象编程

- JavaScript 对每个创建的对象都会设置一个原型，并指向其原型对象；
- 当使用 `obj.xxx` 访问一个对象时：
1. JavaScript 引擎先会在当前对象中寻找；
2. 若上一步未找到，就会在其原型对象上寻找；
3. 若上一步还未找到，就会一直追溯到 `Object.prototype对象`；
4. 最后还没找到，才会返回 `undefined`；

例如：
```js
// Array 的原型链：
arr ----> Array.prototype ----> Object.prototype ----> null

// Function 的原型链：
foo ----> Function.prototype ----> Object.prototype ----> null
```

## 构造函数

- 除了直接用 `{ ... }` 创建一个对象外，JavaScript 还可以用一种构造函数的方法来创建对象；

```js
function FE(name) {
  this.name = name
  this.hello = function () {
    alert('Hello, ' + this.name + '!')
  }
}
// 原型链 - var csy = new FE('samyechan')
csy ----> FE.prototype ----> Object.prototype ----> null
// 与普通函数一致，但当使用关键字 new 来调用该函数时，它就是一个构造函数了
```
- `new` - 默认返回 `this`，故无需在内 `return`；
- 用 `new FE()` 创建的对象还从原型上获得了一个 `constructor` 属性，它指向函数 FE 本身；
- 每 `new` 一个对象，都会重新构造一个内部函数，这其实是重复多余的 → 那就写在上一层原型链中呗；
- 构造函数首字母应当大写，而普通函数首字母应当小写；1
```js
function FE(name) {
  this.name = name
}
FE.prototype.hello = function () {
  alert('Hello, ' + this.name + '!')
}
```

## 原型继承 <badge text="X" type="error" />

- 继承实际上是类型的扩展；
- JavaScript 由于采用原型继承，故无法直接扩展一个 Class；
- JavaScript 的对象模型是基于原型实现的；

#### JavaScript的原型继承实现方式

1. 定义新的构造函数，并在内部用 `call()`调用希望“继承”的构造函数，并绑定this；
2. 借助中间函数 `F` 实现原型链继承，最好通过封装的 `inherits` 函数完成；
3. 继续在新的构造函数的原型上定义新方法；

## class 继承

- ES6 引入新关键字： `class`；
- 使得定义类更加简单；

```js
class 类名 {
  constructor(x, y) {
    this.x = x;
    ...
  }

  方法名() {
    ...
  }
}
```
- 用 `class` 定义类使得继承更方便；

```js
class 子类名 extends 父类名 {
  constructor(x, y, w) {
    // 调用父类构造函数
    super(x, y);
    this.w = w;
    ...
  }

  子类方法名() {
    ...
  }
}
```
- `extends` 表示子类原型链对象来自于父类；
- 子类的构造函数需要通过 `super([父类参数])` 来调用父类的构造函数，否则父类的属性无法正常初始化；
- [Babel](https://babeljs.io/) - 一个工具把 `class` 代码转换为传统的 `prototype` 代码；
##### ES6 引入的 `class` 和原有的 JavaScript 原型继承没啥本质区别，就是更好写更好懂了嘛

<!-- + + + + + + + + + + + + + + + + + + + + + -->
