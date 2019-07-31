---
sidebarDepth: 3
---

# Learn | ECAMScript 6

## 简介

- JavaScript 三大组成部分：
  1. ECMAScrpit - JS 中的数据类型及相关操作、流程控制、运算符及相关运算...；
  2. DOM - 文档对象模型；
  3. BOM - 浏览器对象模型；
- ECMAScrpit 发展史：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Language_Resources)

---

#### 练习

- [学员列表](./练习_学员列表.md)

<!-- + + + + + + + + + + + + + + + + +  -->

## let 和 const

### let 和 var 的差异

- var 可以重复声明，let 在同一作用域下不可重复声明；

```js
let a = 1;
let a = 2;

// Uncaught SyntaxError: Identifier 'a' has already been declared
```
- 作用域：var（全局作用域、函数作用域）、let（全局作用域、块级作用域{}）；

[一个花括号代表一个块级]

- var 有预解析机制，let 不会进行预解析；
- let 手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let)

### const

- 常量，只允许在声明是赋值，并且以后都不会再被改变了；
- 不能重复声明；
- 块级作用域；
- 不会被预解析；
- const手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const)

### 块级作用域

<!-- + + + + + + + + + + + + + + + + +  -->

## 解构赋值

- 对象的解构赋值；
- 数组的解构赋值；
- 字符串的解构赋值；
- 解构赋值手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

### 对象的解构赋值

```js
let obj = {
  a: 3,
  b: 5
};

// 给变量赋以对象中的值
let a = obj.a;
let b = obj.b;

// 使用“解构赋值”方式时
let {a, b} = obj;
```
- 解构：将对象结构解开；
- 赋值：以对象结构赋值；
- 变量名必须一一对应，一个反例：
```js
let {c, a} = obj;
console.log(c); // undefined
console.log(a); // 3
```
### 数组的解构赋值；

```js
let arr = ['c', 's', 'y'];
let [h, l] = arr;
console.log(h, l); // c s
```
- 按照数组顺序的一一对应；
- 一道经典面试题：
```js
let a = 0;
let b = 1;
// Q: 如何快速交互 a, b 的值？

[a, b] = [b, a]
```
### 字符串的解构赋值；

```js
let str = 'csy';
let [e, f, k, u] = str;
console.log(e, f, u, k);
```
- 和数组类似吧，按顺序的一一对应；

【QUESTION】 同理地，数字可以解构赋值吗？ - 我不同意咯。

```js
let nub = 731;
let [n, u, b] = nub;
console.log(n, u, b);

// nub is not iterable - nub 不是一个叠代器
```
- 一般地，可叠代对象都有解构赋值的写法；

#### 比较有用的解构赋值：数组、对象

## 展开运算符

- 通常与解构赋值搭配使用；
- 展开运算符： `...`；
- 手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operator/Spread_syntax](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

### 数组展开

- 一个基本应用：
```js
let arr = [1, 2, 3, 4, 5]
let arr2 = [9, 8, 7, 6, 0]

// 就想再 arr2 的 6 & 0 之间插入 arr 啊...

let arr2 = [9, 8, 7, 6, ...arr, 0]
console.log(arr2) // [9, 8, 7, 6, 1, 2, 3, 4, 5, 0]
```
- 剩余参数处理：
```js
let arr = [1, 2, 3, 4, 5]
let [a, b, ...c] = arr;
console.log(a, b, c); // 1 2 [3, 4, 5]
```

### 对象展开
```js
let obj = {
  a: 1,
  b: 2
};
let obj2 = {
  ...obj,
  c: 3,
  d: 4
};
console.log(obj2); // {a: 1, b: 2, c: 3, d: 4}
```
- 解构剩余的东西：
```js
let { a, b, ...c} = obj2;
console.log(a, b, c); // 1 2 {c: 3, d: 4}
```

#### 注意

- 不建议直接将对象赋予一个变量 - 因为二者其一发生内部赋值会改变都会影响到另一个：
```js
let obj = { a: 1, b: 2 };
let obj2 = obj;
console.log(obj2); // { a: 1, b: 2 }
obj.a = 3;
console.log(obj2); // { a: 3, b: 2 }
```
- 解决这种相互影响的问题 - 将对象的解构赋值于新对象之中：
```js
let obj = { a: 1, b: 2 };
let obj2 = {...obj};
console.log(obj2); // { a: 1, b: 2 }
obj.a = 3;
console.log(obj2); // { a: 1, b: 2 }
```
<!-- + + + + + + + + + + + + + + + + +  -->

## Set 对象

- Set 对象的数据结构；
- Set 相关属性及方法：
  - size 属性；
  - clear()、delete()、get()、has()、add()
- 手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

### Set是一个函数

- 构造函数，用于构建某一类型的对象 - 对象构建过程：对象的实例化；
- 通过 `new` 来构建一个 `Set函数`；
```js
let s = new Set();
console.log(s); // Set(0) {}
```
- Set 中可传参：数组 / 类数组：
```js
let arr = [1, 2, 3, 4];
let s1 = new Set(arr);
console.log(s1); // Set(4) {1, 2, 3, 4}
```
- 参数会自动去重 - 可以利用 Set 来进行数组去重；
```js
let arr2 = [1, 2, 3, 4, 1, 3, 6];
let s2 = new Set(arr2);
console.log(s2); // Set(5) {1, 2, 3, 4, 6}
arr = [...s2];
console.log(arr); // [1, 2, 3, 4, 6] - 得到去重后的数组

// 保留第一次出现的值，而不会有什么给你排序的操作的啦
```

### Set属性 - size

- 相当于 String / Array 中的 length - 返回的是最终数值的个数（除重后哟）；
```js
let arr = [3, 3, 3, 3, 3, 3, 5];
let cs = new Set(arr);
console.log(cs.size); // 2
```

### Set方法 - clear()

- 清空所有项；
```js
cs.clear();
console.log(cs); // Set(0) {}

console.log(cs.clear()); // undefined
```
- 该方法含有一个返回值 `undefined`；

### Set方法 - delete(val)

- 删除具体的某个值；
- `val` - 需删除项；
```js
let arr = [2, 5, 2, 3, 9, 'c'];
let sss = new Set(arr);
console.log(sss); // Set(5) {2, 5, 3, 9, "c"}
sss.delete(2);
console.log(sss); // Set(4) {5, 3, 9, "c"}
```
- 该方法含有一个返回值：`true` / `false`（表示删除的成功与否）；

### Set方法 - add(val)

- 添加一项（该项不能与已存项重复）；
- `val` - 需添加项；
```js
sss.add(2);
console.log(sss); // Set(5) {2, 5, 3, 9, "c"}
sss.add(5);
console.log(sss); // Set(5) {2, 5, 3, 9, "c"}
```
- 该方法含有一个返回值：set对象本身 - 可以进行链式操作：
```js
sss.add(7).add(0).add(8);
```

### Set方法 - has(val)

- 查看是否包含某个值；
- `val` - 需查找项；
```js
console.log(sss.has('c')); // true
console.log(sss.has('s')); // false
```
- 该方法含有一个返回值：`true` / `false`（表示判断结果）；

### Set方法 - 

<!-- + + + + + + + + + + + + + + + + +  -->

## Map 对象

- Map 对象的数据结构；
- Map 相关属性及方法：
  - size 属性；
  - clear()、delete()、get()、has()、set()
- 手册：[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

```js
let arr = [ // 一个二维数组
  ['a', 1],
  ['b', 2],
  ['c', 3]
];
let s = new Map(arr); // 存成一种“键-值”结构
console.log(s); // Map(3) {"a" => 1, "b" => 2, "c" => 3}
```
### Map方法 - clear()

- 清空所有值；

### Map方法 - delete(key)

- 删除某一项；
- `key` - 数据的 key 值；
- 返回 `true` / `false`；

### Map方法 - get(key)

- 获取某一项具体值；
- `key` - 数据的 key 值；
- 返回 `key` 对应的 `value`；

### Map方法 - has(key)

- 是否包含某一项；
- `key` - 数据的 key 值；
- 返回 `true` / `false`；

### Map方法 - set(key, val)

- 设置一个值；
- `key` - 数据的 key 值，`val` - 数据的 value 值；
- 返回 Map对象 本身；

<!-- + + + + + + + + + + + + + + + + +  -->

## 函数新增扩展

- 箭头函数；
- rest 参数设置；
- 参数默认值设置；

### 箭头函数

- 对之前 function 的简写，对比如下：
```js
function fn() {
  return ;
}

let fn = () => {
  return ; 
};
fn();
```
#### 箭头函数基本写法
```js
* 形参 => 返回值
```
```js
let fn = nub => nub * 2;
console.log(fn(10)); // 20
```
```js
* (形参1, 形参2) => 返回值
```
```js
let fn2 = (nub, nub2) => nub * nub2;
console.log(fn2(3, 5)); // 15
```
```js
* () => 返回值

* () => { 执行语句 }
```
```js
let fn3 = () => console.log('balabababa');
fn3(); // balabababa
```
```js
* (形参1, 形参2) => { 执行语句 }
```
- 箭头函数必须将它存起来；

#### 箭头函数不定参

```js
function fn () {
  console.log(arguments);
}

fn(1, 2, 3, 4, 5) // Arguments(5) [1, 2, 3, 4, 5]

let fn1 = () => {
  console.log(arguments);
}

fn1(1, 2, 3, 4, 5) // ReferenceError: arguments is not defined
```
- 箭头函数没有不定参 `arguments`；

### rest 参数设置

- 可解决箭头函数没有不定参 `arguments`问题：
```js
let fn2 = (...arg) => {
  console.log(arg);
}

fn2(1, 2, 3, 4, 5) // [1, 2, 3, 4, 5]
```
- 其实就是之前所说的“扩展”原理，比如：
```js
let fn3 = (a, b, ...arg) => {
  console.log(a, b, arg);
}

fn3(1, 2, 3, 4, 5) // 1 2 [3, 4, 5]
```
- 这个 `arg` 被称为 `rest参数` 或 `剩余参数`；

### 箭头函数的 this

- 对比：
```js
document.onclick = function () {
  console.log(this); // #document
}

document.onclick = () => {
  console.log(this); // Window
}
```
- 综合例子：
```js
document.onclick = function () {
  let fn1 = () => {
    console.log(this); // #document
  };
  fn1();
  function fn2 () {
    console.log(this); // Window
  }
  fn2();
}
```
- 箭头函数本身没有 `this`，调用箭头函数的 `this` 时，调用的是声明该箭头函数时的 `this`；
```js
let fn;
let fn2 = function () {
  console.log(this);
  fn = () => {
    console.log(this);
  }
}
fn2(); // Window
fn(); // Window
```
```js
let fn3;
let fn4 = function () {
  console.log(this);
  fn3 = () => {
    console.log(this);
  }
}
fn4 = fn4.bind(document.body);
fn4(); // <body>...</body>
fn3(); // <body>...</body>
```
### 参数默认值设置

- 一个场景：
```js
let fn = (a, b) => {
  console.log(a*b);
}
fn(); // Identifier 'fn' has already been declared

// 期望是有默认值的，那么在忘记传参的时候就不会那么尴尬了...
```
- ES6 后的默认值：
```js
let fn2 = (a = 3, b = 5) => {
  console.log(a*b);
}
fn2(); // 15 - Nice!!!
```


<!-- + + + + + + + + + + + + + + + + +  -->

## 新增数组扩展

- 手册：

### Array.form()、Array.of()

### find()、findIndex()、includes()

### flat()、flatMap()


<!-- + + + + + + + + + + + + + + + + +  -->