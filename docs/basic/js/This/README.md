# Note | 判断this指向

阅读： [掘金 |《嗨，你真的懂this吗？》](https://juejin.im/post/5c96d0c751882511c832ff7b)

---

<!-- + + + + + + + + + + 小题目 + + + + + + + + + + -->

<a name="QUESTION"></a>

Question - 控制台打印出来的值是什么？

```js
var number = 5;
var obj = {
    number: 3,
    fn1: (function () {
        var number;
        this.number *= 2;
        number = number * 2;
        number = 3;
        return function () {
            var num = this.number;
            this.number *= 2;
            console.log(num);
            number *= 3;
            console.log(number);
        }
    })()
}
var fn1 = obj.fn1;
fn1.call(null);
obj.fn1();
console.log(window.number);
```
[→ 答案 +_+](#ANS)

---

<!-- + + + + + + + + + + 关于 this + + + + + + + + + + -->

- `this` 并非指向自身，它是一个指针，指向调用函数的对象；
- `this` 的绑定规则：

    1. 默认绑定；
    2. 隐式绑定；
    3. 硬绑定；
    4. new 绑定；

## 01 默认绑定

- 默认绑定：在不能应用其它绑定规则时使用的默认规则；
- 通常是一个独立函数的调用，如：

```js
function whoAreU () {
    console.log("I'm ", this.name);
    // 无指明的默认情况下，this 指向全局（非严格模式）
}
var name = 'SamyeChan';
whoAreU();

- - -
RUM → I'm SamyeChan
```

- 非严格模式下，this 指向全局对象；
- 严格模式（就是有很多hia严格hia挑剔的标准啦...）下，`this` 指向 `undefined`，而 `undefined` 上没有 `this` 对象，那就会抛出错误；


## 02 隐式绑定 <badge text="?" />

- 若函数的调用是在某个对象上触发的，则会调用位置上存在的上下文对象 → 典型形式：obj.fn()
```js
function whoAreU () {
    console.log("I'm ", this.name);
}
var person = {
    name: 'HelenaChan',
    // whoAreU 是一个函数变量
    whoAreU: whoAreU
    /* whoAreU 函数声明在了外部，严格而言不属于 person，
      但调用 whoAreU 时，调用位置会使用 person 的上下文来引用函数 - “家里找不到就到院子里面找找哇”
      隐式绑定会将函数调用中的 this 绑定到这个上下文中。
    */
}
var name = 'SamyeChan';
person.whoAreU(); // 直接调用 whoAreU 函数

- - -
RUM → I'm HelenaChan
```
- **对象属性链中只有最后一层会影响到调用位置**；
- Tips： 若obj.fn()前什么都没有，那么这肯定不是隐式绑定；

**隐式绑定大陷阱**：绑定容易丢失

```js
function whoAreU () {
    console.log("I'm ", this.name);
}
var person = {
    name: 'HelenaChan',
    // whoAreU 是一个函数变量
    whoAreU: whoAreU
}
var name = 'SamyeChan';
var who = person.whoAreU; // 直接指向 whoAreU 的引用
// 那么调用时和 person 就没啥关系了，故 this 会进行默认绑定
who()

- - -
RUM → I'm SamyeChan
```

## 03 硬/显式绑定

- 显式绑定：通过 `call`、`apply`、`bind` 的方式，显式指定 `this` 所指向对象；
- js中的每一个 `Function` 对象都有一个 `apply()` 方法和一个 `call()` 方法：
（调用一个对象的一个方法，用另一个对象替换当前对象）
```js
/* apply()方法 */
func.apply(thisObj[, argArray]);

/* call()方法 */
func.call(thisObj[, arg1[, arg2[, [,...argN]]]]);
```
- `bind()` 方法会创建一个新的函数，称为绑定函数, fun方法在 `this` 环境下调用：

```js
/* 该方法可传入两个参数，第一个作为this，第二个及以后参数则作为函数的参数调用 */
func.bind(this, arg1, arg2, ...);
```

## 04 new 绑定

- js中，构造函数只是使用 `new` 操作符时被调用的函数；
- 任何一个函数都可以使用 `new` 来调用，故不存在构造函数，而仅是对于函数的“构造调用”；
- 使用 `new` 来调用函数，会自动执行一下操作：
  1. 创建一个新对象；
  2. 将构造函数的作用域赋值给新对象，即：`this` 指向新对象；
  （前提：构造函数中没有返回对象或者是 `function` ，否则 `this` 指向这个对象或者是 `function`）
  3. 执行构造函数代码；
  4. 返回新对象；

## 绑定优先级

## 绑定例外

- 若将 `null` 或者是 `undefined` 作为 `this` 的绑定对象传入 `call`、 `apply` 或者是 `bind`，这些值在调用时会被忽略，实际应用的是默认绑定规则。

## 箭头函数

- 箭头函数是 ES6 中新增的，它和普通函数有一些区别，箭头函数没有自己的 `this`，它的 `this` 继承于外层代码库中的 `this`。
- 箭头函数在使用时，需要注意以下几点:
  1. 函数体内的 `this` 对象，继承的是外层代码块的 `this`；
  2. 不可以当作构造函数，也就是说，不可以使用 `new` 命令，否则会抛出一个错误；
  3. 不可以使用 `arguments` 对象，该对象在函数体内不存在。如果要用，可以用 `rest` 参数代替；
  4. 不可以使用 `yield` 命令，因此箭头函数不能用作 `Generator` 函数；
  5. 箭头函数没有自己的 `this`，所以不能用 `call()`、 `apply()`、 `bind()` 这些方法去改变 `this` 的指向；

**箭头函数没有自己的 `this`，箭头函数中的 `this` 继承于外层代码库中的 `this`**


<!-- + + + + + + + + + + 面试问答 + + + + + + + + + + -->

## QST - 如何正确判断this的指向？

**谁调用它，`this` 就指向它**

但很多时候并不能仅因这句话就准确的判断好 `this` 的指向，so...需要一些规则去帮助自己（按序哟～）：

### 01 全局环境中的 `this`

无论 **严格模式** 与否，

- 浏览器环境下的全局 `this` 都指向全局对象 `window`；
- 而 `node` 环境下的 `this` 均为空对象。

### 02  是否 `new` 绑定

若是 `new` 绑定，

- 构造函数中无返回 `function` 或 `object`，则 `this` 指向这个新对象；
- 构造函数中返回值是 `function` 或 `object`，则 `this` 指向返回对象；

### 03 函数是否通过 `call` 、 `apply` 调用，或使用了 `bind` 绑定

若满足上述情况，则 `this` 绑定了指定对象。

**特殊情况**：若上述情况传入的第一个参数值为 `undefined` 或 `null`，则：

1. 严格模式下， `this` 为传入值 `null` / `undefined`；
2. 非严格模式下， 应用默认绑定，`this` 指向全局对象（`node - global` / `浏览器 - window`）；

### 04 隐式绑定

函数的调用是在某个对象上触发的，即调用位置上存在上下文对象 - 典型的隐式调用为: xxx.fn()；

### 05 默认绑定

在不能应用其它绑定规则时使用的默认规则，通常是独立函数调用：

- 非严格模式： `node` 环境，执行全局对象 `global`，浏览器环境，执行全局对象 `window`；
- 严格模式：执行 `undefined`；

### 06 箭头函数

箭头函数没有自己的 `this`，继承外层上下文绑定的 `this`；

---

<!-- + + + + + + + + + + 答案 + + + + + + + + + + -->

<a name="ANS"></a>

=_= Answer：

```bash
10
9
3
27
20
undefined
```
[→ 题目 =_=](#QUESTION)