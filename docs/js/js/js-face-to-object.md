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
- 构造函数首字母应当大写，而普通函数首字母应当小写；

```js
function FE(name) {
  this.name = name
}
FE.prototype.hello = function () {
  alert('Hello, ' + this.name + '!')
}
```

## 原型继承