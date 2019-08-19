---
sidebarDepth: 3
---

# Learn | 面向对象

## 一个栗子

#### 需求：实现多个选项卡

- 先实现一个选项卡；
- 将单个选项卡实现方式封装；

```js
/**
 * 封装 - 选项卡
 */
function Tab (btns, ps) {
  btns.forEach((item, index) => {
    item.onclick = function () {
      ps.forEach((it, idx) => {
        if (idx === index) {
          btns[idx].style.background = 'orange';
          ps[idx].style.display = 'block';
        } else {
          btns[idx].style.background = '';
          ps[idx].style.display = 'none';
        }
      })
    }
  })
}

// 获取元素
let btns = document.querySelectorAll('.div1 button');
let ps = document.querySelectorAll('.div1 p');
let btns2 = document.querySelectorAll('.div2 button');
let ps2 = document.querySelectorAll('.div2 p');
// 使用方法
Tab(btns, ps);
Tab(btns2, ps2);
```
效果：

![实现多个选项卡](./imgs/0101_democard.gif)

#### 需求变更：第一个选项卡实现点击切换下一页功能

- 点击按钮，第一个选项卡有下一页功能；

```js
/**
 * 封装 - 选项卡
 * 
 * btns - 选项卡按钮
 * ps - 选项卡内容
 * isNext - 是否含有下一页功能（true/false，无参数时默认 false）
 * （要实现第一个选项卡下一页切换，必须设置一个控制变量，否则会被后面的选项卡覆盖）
 */
function Tab (btns, ps, isNext = false) {
  btns.forEach((item, index) => {

    ...

    if (isNext) {
      // 有下一页功能
      let num = 0;
      document.querySelector('.nextBtn').onclick = function () {
        num++;
        num = num > (btns.length - 1) ? 0 : num;
        ps.forEach((it, idx) => {
          if (idx == num) {
            btns[idx].style.background = 'orange';
            ps[idx].style.display = 'block';
          } else {
            btns[idx].style.background = '';
            ps[idx].style.display = 'none';
          }
        })
      }
    }
  })
}
```
效果：

![第一个选项卡实现点击切换下一页功能](./imgs/0102_democard.gif)

- 如果直接在封装函数内进行下一页功能的编写，其实最终功能只会被赋予最后一个选项卡中；

#### 需求变更：第二个选项卡实现自动轮播

- 和前一个需求变更相同；
- 再添加一个参数来控制；

```js
if (isAutoPlay) {
  // 控制自动轮播
  let num = 0;
  document.querySelector('.autoPlayBtn').onclick = function () {
    setInterval(() => {
      num++;
      num = num > (btns.length - 1) ? 0 : num;
      psFor(num);
    }, 500)
  }
}
/**
 * 现在这个方法肯定有bug，
 * 比如不停地点，轮播速度会越来越快，
 * BUT，这就是个demo啊...
 * 莫啷个较真，我也就提醒一下，不要上来就复制代码
 */
```

效果：

![第二个选项卡实现自动轮播](./imgs/0103_democard.gif)

- 你看，这两个需求变更就让传入参数多了俩，但其实一般来说嘞，这种情况下的参数是会以 **对象** 的类型传入的咯～

#### 改造选项卡

- 上面虽然将功能实现了，但是实现方式不佳；
- 一般来说封装的方法中就不应该有一些非共性的东西存在；

```js
function Tab (btns, ps) {
  ...

  /**
   * 某个函数必须存在于封装函数内部，
   * 但其又具有一定的特殊性，
   * 那就可以向外返回这个函数啊，
   * 让它在封装函数外使用
   */
  return psFor;
}

/**
 * 在封装函数外的使用
 */
let btns = document.querySelectorAll('.div1 button');
let ps = document.querySelectorAll('.div1 p');
// 拿到的
let tab = Tab(btns, ps, true, false);
// 有下一页功能（单独处理了）
let num = 0;
document.querySelector('.nextBtn').onclick = function () {
  num++;
  num = num > (btns.length - 1) ? 0 : num;
  tab(num);
}
```

#### 需求变更：多个选项卡分别更改数量

- 函数内 `return` 一个对象，将外用函数、相关参数放置于内：

```js
function Tab (btns, ps) {
  ...
  return { psFor, TabNum: btns.length };
}
// 当 value & key 同名时，可合并书写噢
```
- 上面这个栗子，其实用的是『 工厂模式 』

## 工厂模式

基于上面的小栗子，写一个简单的工厂模式～

```js
/**
 * 工厂模式
 */
function Tab(btns, ps) {
  // 00 加原料
  let obj = {};
  // 01 加工原料
  obj.tabNum = 4;
  obj.psFor = function () {
    console.log('psFor');
  };
  // 02 出厂
  return obj;
}

let tab1 = Tab('参数1', '参数2')
// 自己的逻辑
tab1.psFor();
let tab2 = Tab('参数1', '参数2')
// 自己的逻辑
tab2.psFor();
```

- 优点：解决了代码复用的问题；
- 缺点：
  1. 没有解决对象识别的问题，即创建的所有实例都是 Object 类型；
  2. 没有原型，占用内存；

## new 运算符

```js
/*
 * new 运算符
 *
 * 功能： 1- (直接)执行函数
 *       2- 自动创建一个空对象；
 *       3- 把空对象指向另外一个对象；
 *       4- 将 this 绑定到这个空对象；
 *       5- 隐式返还 this；
 */
let obj = new Object();
```
#### (直接)执行函数

```js
function test () {
  console.log('test...');
}
test();
new test;
new test();
```
- 上述3种方式均可进行 test 函数中的正常打印；
- 其中，后2中 `new` 形式的对比，说明了 `new运算符` 的函数自执行性；

#### 自动创建一个空对象 & 把空对象指向另外一个对象
#### 将 this 绑定到这个空对象 & 隐式返还 this

```js
/**
 * 工厂模式 - 使用 new 运算符的话
 */
function Tab() {
  // 00 加原料
  // let obj = {}; ---> 将 this 绑定到这个空对象
  //（所以new的话，直接可以使用this 进行后续操作，而不需要）
  // 01 加工原料
  this.tabNum = 4;
  this.psFor = function () {
    console.log('psFor');
  };
  // 02 出厂
  // return obj; ---> new 可以隐式返还 this，故此处可以省略 return

  /**
   * 有 return 执行 return，没 return 就会把 this 返回来
   * 
   *（但一般不会自己返换，直接返回 this 就好啦）
   */
}
// new 实例化
// new 把空对象指向另外一个对象 ---> 所以方法中返回的 this 就指向了新的那个 tab
let tab = new Tab();
tab.psFor();
```
然后，我发现，用 new 改改改以后，这个栗子...变成了一个构造函数？？？

## 构造函数

- 相比之下，工厂模式用得少，构造函数用得多；
- 构造函数约定俗成首字母大写；
- 类似一个 `类` 的概念（ES6之前，这个构造函数都是模拟的一个类的概念，但它终究不是啊）；

```js
// 构造函数
function Tab () {
  this.tabNum = 4;
  this.psFor = function () {
    console.log('psFor');
  };
}
/**
 * 仿写 new 运算符（new 的运行原理）
 */
function myNew (constructor, ...arg) {
  let obj = {};
  constructor.call(obj, ...arg); // 改变传入函数指向新创建的对象
  obj._proto_ = constructor.prototype;
  return obj;
}
let tab = myNew(Tab);
tab.psFor();
```
### 构造函数与工厂模式类似；

#### 构造函数写法更简单

```js
/**
 * 工厂模式
 */
function Tab () {
  let obj = {};
  obj.name = 'samyechan';
  obj.hobby = function () {
    console.log(obj.name + ' loves running');
  }
  return obj;
}
let tab = Tab();
tab.hobby();

/**
 * 构造函数
 */
function Tab2 () {
  this.name = 'alexwww';
  this.hobby = function () {
    console.log(this.name + ' loves swimming');
  }
}
let tab2 = new Tab2();
tab2.hobby();
```
#### 构造函数性能更佳
```js
// 工厂模式
let tab001 = Tab();
let tab002 = Tab();
console.log(tab001.hobby === tab002.hobby); // false
console.log(tab001.hobby == tab002.hobby); // false
/**
 * tab001 和 tab002 在内存中是两个不同的空间
 * 虽然他们里面的东西一致，但实际他们的 this 是不同的
 * 
 * --- 一样的东西存在这么多，消耗内存啊 ---
 */

// 如果向上面那样写构造函数....
let tab1 = new Tab2();
let tab2 = new Tab2();
console.log(tab1.hobby === tab2.hobby); // false
console.log(tab1.hobby == tab2.hobby); // false
/**
 * tab1 和 tab2 还是两个不同的东西啊！！！！！！
 * 但构造函数中有方法去改变它～～
 * 
 * 提供了一个公共的空间（原型[原型也是个对象噢]） ---> 节约内存啊
 * 
 * 一个实例化对象 = 构造函数 + 原型
 */

// 这个时候，再酱紫写...
function Tab2 () {
  this.name = 'alexwww';
}
Tab2.prototype.hobby = function () {
  console.log('loves swimming');
}
let tab1 = new Tab2();
let tab2 = new Tab2();
console.log(tab1.hobby === tab2.hobby); // true
console.log(tab1.hobby == tab2.hobby); // true
/**
 * 都 true 了，有没有！！！
 * 
 * ps：对象比较 ---> 1.值一样； 2.地址一样；
 */
```


## 原型 prototype

## 面向对象和面向过程编程

## 类和对象