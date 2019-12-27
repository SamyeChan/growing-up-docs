# Function 详解

## 全局作用域

1. 声明在任何函数以外的变量或者函数体 - 全局变量/全局函数;
2. wndow (在浏览器 window 本身和作用域有合并) 的属性;
3. 在浏览器中,默认不写 var，浏览器就会认为是要给 window 的属性;

## 函数作用域

1. 声明在函数内部的数据，作用范围只在函数内容 - 函数的局部变量;
2. 变量、函数的参数、声明在函数内部函数；

## 作用域链
1. 作用域链：数据的一种查找规则；
2. 当我们调用数据时，会在当前作用域进行查找，若找不到就会向上查找父作用域，直到 window

## 修改 this 指向

### function.call()

- 调用函数，并修改函数中的 this 指向；
- 执行函数的 call 方法，会调用该函数，并修改函数中的 this 指向；

```js
function.call( this指向谁, 参数1, 参数2, ...)
```
- call 中第 0 个参数代表当前执行时，函数中的 this 指向谁；
- call 中其余参数就和普通方法的参数一样了；

### function.apply()

- 调用函数，并修改函数中的 this 指向；
- 执行函数的 apply 方法，会调用该函数，并修改函数中的 this 指向；
- call 允许传入无限个参数；

```js
function.apply( this指向谁, [参数1, 参数2, ...])
```
- apply 中第 0 个参数代表当前执行时，函数中的 this 指向谁；
- apply 中第 1 个参数是一个数组，数组中代表了我们要往函数中串传递的参数；
- apply 仅允许两个参数；

### call 和 apply 的应用 ？？？

### function.bind()

- 调用函数的 bind 方法，会返回一个绑定了 this 指向的新函数；

```js
function.bind( this指向谁, 参数1, 参数2, ...)
```
- bind 中第 0 个参数，就是 bind 返回的新函数的 this 指向；
- bind 的其余参数将作为新函数的参数供调用时使用；
- bind 是个”bug“式存在；
- 返回一个与原函数一模一样的函数，只是 this 指向不同；
- bind 返回的新函数，不能再进行绑定；

**只要是 function 声明的函数体，都有 arguments**

### 自己实现一个 bind 方法

### bind 原理分析

- bind: ECMAScrip 5.1 出来的；
- 旧版本支持 - 自己写方法实现 bind；
```js
function bind(fn, _this) {
  return function () {
    fn.call(_this);
  }
}
// 返回一个新函数 - 一个已经改变了 this 指向的函数
```
- fn.bind() - 调用函数的 bind 的方法，会返回一个新函数，在新函数中 this 会绑定成我们希望它指向的内容；
- bind 返回的新函数 this 指向，

## 严格模式下 function 的 this 指向

- 在函数内部，this 的值取决于函数被调用的方式；
- js 代码最上方添加 `use scrict`；
- 必须按照规范写代码；
- 在严格模式下，function 如果不是当作对象的属性进行调用，this 就指向 undefined；
- 严格模式体现了 JavaScript 更合理、更安全、更严谨的发展方向；
