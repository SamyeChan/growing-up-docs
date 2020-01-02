---
sidebarDepth: 3
---

# 面向对象

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
- 共性特征，放函数/类里；
- 少数（传参数配置）/个别特殊，返还单独处理；

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
### 与工厂模式类似

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
 *     简单数据类型都是新开辟地址，不涉及传值传参问题；
 */
```
- 每一个函数都会有一个 prototype；
- 一般 prototype 都写在函数外面，这样会更好区分；

### 构造函数版小栗子

```js
/**
 * 构造函数 - 在构造函数里写各种属性，一般不写方法
 * 
 * new的时候，只会执行构造函数中的内容，而不会执行原型链上的东西
 */
function Tab (btns, ps) {
  this.btns = btns;
  this.ps = ps;
  this.TabNum = btns.length;
  this.btnsFor(); // 在构造函数中就执行 - new的时候就给按钮赋上事件
}
/** 
 * prototype 是一个公共的空间 - 在原型上写各种方法（解约内存）
 * 
 * btnsFor - 点击按钮事件
 */
Tab.prototype.btnsFor = function () {
  this.btns.forEach((item, index) => {
    // let _this = this
    // item.onclick = function () {
    //   _this.psFor(index);
    //   // 这里的 this 是指向函数里面那个 this，谁创建指向谁，并不是构造函数中那个全局 this
    // }
    item.onclick = () => {
      this.psFor(index);
      // 箭头函数中的 this 就会跟随它前面的 this指向，此处就是指向全局 this
      // [ 箭头函数 this 指向外部 this ]
      //
      // 箭头函数好用，但不要滥用
    }
  })
}
/**
 * psFor - 改变按钮变化选中时的样式
 */
Tab.prototype.psFor = function (num) {
  this.ps.forEach((item, index) => {
    if (index == num) {
      this.btns[index].style.background = 'orange';
      this.ps[index].style.display = 'block';
    } else {
      this.btns[index].style.background = '';
      this.ps[index].style.display = 'none';
    }
  })
}
/**
 * getIndex - 获取当前按钮点击项
 */
  Tab.prototype.getIndex = function () {
  for (let i = 0; i < this.TabNum; i++) {
    if (this.btns[i].style.background == 'orange') {
      return i;
    }
  }
}

let btns = document.querySelectorAll('.div1 button');
let ps = document.querySelectorAll('.div1 p');
let tab1 = new Tab(btns, ps);
document.querySelector('.nextBtn').onclick = function () {
  let num = tab1.getIndex();
  num++;
  num = num > tab1.TabNum - 1 ? 0 : num;
  tab1.psFor(num);
}

let btns2 = document.querySelectorAll('.div2 button');
let ps2 = document.querySelectorAll('.div2 p');
let tab2 = new Tab(btns2, ps2);
document.querySelector('.autoPlayBtn').onclick = function () {
  setInterval(() => {
    let num2 = tab2.getIndex();
    num2++;
    num2 = num2 > tab2.TabNum - 1 ? 0 : num2;
    tab2.psFor(num2);
  }, 1000)
}
```

## 原型 prototype

- `obj._proto_ === Obj.prototype`；

```js
// 继续上例
console.log(tab1._proto_ === Tab1.prototype) // true
```
- 通过 new 实例化出来的对象，其属性和行为来自两个部分：
  1. 来自构造函数；
  2. 来自原型；
- 当声明一个函数时，同时也声明了一个原型；
- 原型本身就是一个对象；
- 对象属性方法查找规则：

#### 两种写法

- 基于上述栗子的比较（如果你不记得栗子了，那就跳过，直接看下一个代码）：

```js
// 01 最佳 - 不会弄丢 constructor
Tab2.prototype.hobby = function () {
  console.log('loves swimming');
}
// 02 原型又一个预定义属性：constructor，指向构造函数
cosnole.log(Tab2.prototype.constructor === Tab2); // true
// 如果像下面直接这样写，会把预定义的 constructor 弄丢(覆盖)噢
Tab2.prototype = {
  hobby() {
    console.log('loves swimming');
  }
}
// 所以如果要用 02 的方式写，得再加上 constructor 啊
Tab2.prototype = {
  constructor: Tab2,
  hobby() {
    console.log('loves swimming');
  }
}
```
- 简单总结：

```js
let prototype = {
  constructor: '构造函数' // 这看作 ---> 预定义（系统自己给我们写好的）
};
// 下面就像是在追加属性或方法咯
prototype.hobby = function () {
  console.log('喜欢篮球');
}
// 但如果你是酱紫写的话...
prototype = {
  hobby () {
    console.log('喜欢唱歌');
  }
}
/**
 * 是不是就直接把系统预定义的部分一并覆盖了啊～～～当然是
 * 所以当以上面这种覆盖的方法写的时候，要把预定义的部分也一并写一写噢
 */
prototype = {
  constructor: '构造函数',
  hobby () {
    console.log('喜欢唱歌');
  }
}
```
- 二者，一个是 **追加**，一个是 **覆盖**；
- 实例化的对象包含了**构造函数** & **原型**；
```js
// new一个对象
let obj = new Object();
obj.name = 'c';
obj.age = 22;
console.log(' - - - - - new 出来的 - - - - -');
console.log(obj);
// 直接加在了原型上
let obj2 = Object.create({
  name: 'cc',
  age: 18
});
console.log(' - - - - - create 出来的 - - - - -');
console.log(obj2);
```
输出：

![创建对象的两种方式差异](./imgs/0104_initObj.png)

- 前者直接赋值于实例化的对象，后者是将属性/方法添加到了原型之中；
- 相同的东西放在原型上对内存友好，能提高性能；
- 就虽说放构造函数中也能完成功能，但是没实例化一个对象，就会为这些“相同”的属性/方法开辟新的地方 ---> 你说浪不浪费空间，占不占内存啊？

## 面向对象和面向过程编程

#### 栗子 - 拖拽

- 面向过程 - 注重步骤，一步步地走

```js
/**
 * 面向过程 - 注重步骤，一步步走
 */
let div1 = document.querySelector('.div1');
let div2 = document.querySelector('.div2');
div1.onmousedown = function (e) {
  let ev = e || window.event; // 兼容
  let x = ev.clientX - div1.offsetLeft;
  let y = ev.clientY - div1.offsetTop;
  div1.onmousemove = function (e) {
    let ev = e || window.event; // 兼容
    let xx = ev.clientX;
    let yy = ev.clientY;
    div1.style.left = xx - x + 'px';
    div1.style.top = yy - y + 'px';
  }
  document.onmouseup = function () {
    div1.onmousemove = '';
  }
}
```
- 面向对象 - 将公共的东西抽象出来
```js
/**
 * 拖拽类
 */
function Drag (el) {
  this.el = el;
  this.downFn();
}
/**
 * 要避免过多的迭代 - 方法无论多小都要分开写 - 利于维护
 */
Drag.prototype.downFn = function () {
  this.el.onmousedown = e => {
    let ev = e || window.event; // 兼容
    let x = ev.clientX - this.el.offsetLeft;
    let y = ev.clientY - this.el.offsetTop;
    this.moveFn(x, y);
    this.upFn();
  }
}
Drag.prototype.moveFn = function (x, y) {
  this.el.onmousemove = e => {
    let ev = e || window.event; // 兼容
    let xx = ev.clientX;
    let yy = ev.clientY;
    this.setStyle(xx - x, yy - y);
  }
}
Drag.prototype.setStyle = function (leftNum, topNum) {
  this.el.style.left = leftNum + 'px';
  this.el.style.top = topNum + 'px';
}
Drag.prototype.upFn = function () {
  document.onmouseup = () => {
    this.el.onmousemove = '';
  }
}
let drag = new Drag(div1);
let drag2 = new Drag(div2);
```
### 构造函数继承

```js
function Dad () {
  this.name = 'Bingo';
  this.age = 50;
  this.money = '$12345678';
}
Dad.prototype.hobby = function () {
  console.log('喜欢下棋');
}
function Son () {
  Dad.call(this);
}

let dad = new Dad();
console.log(dad);
dad.hobby();
let son = new Son();
console.log(son);
son.hobby();
```
输出：

![](./imgs/0901_extends.png)

- 继承，只会继承到构造函数，原型方法，即 demo 中的 `hobby` 是拿不到的；
- 怎么拿到爸爸的原型方法？ --> easilest - 直接赋值；
```js
Son.prototype = Dad.prototype;
/**
 * 但这么简单粗暴的法子...当然是不好的哇哇哇～～～
 * 比如说，爸爸和儿砸的咋会一样嘞 -_-
 * 
 * 什么？让儿砸改？酱紫嘛？
 */
Son.prototype.hobby = function () {
  console.log('我明明喜欢打游戏');
} 
/** 
 * 接着，相信儿砸就会被打了...
 * 因为他竟然篡改了爸爸的爱好，爸爸当然很生气啊
 * （修改的是同一个地址上的东东啊 - 【 名字虽不一，但地址同一个 】）
 * 
 * 所以，这个故事告诉我们：不能直接拿爸爸的东西噢，要自己创造嘛～
 */

/**
 * 复习一下 --> 简单数据类型 - 传值；复杂数据类型 - 传址
 */
```
- 好的继承原型方法 - 

**[栗子]** 实现某一个 div 限定拖拽范围

```js
/**
 * 第一个拖拽限定范围 - 使用“继承”实现
 */
function LimtDrag (el) {
  Drag.call(this, el);
}
LimtDrag.prototype = deepCopy(Drag.prototype);
// 指明其构造函数是哪个
LimtDrag.prototype.constructor = LimtDrag;
// 重写样式设置
LimtDrag.prototype.setStyle = function (leftNum, topNum) {
  // 限定区域
  (leftNum < 0) && (leftNum = 0);
  (topNum < 0) && (topNum = 0);
  this.el.style.left = leftNum + 'px';
  this.el.style.top = topNum + 'px';
}

let drag = new LimtDrag(div1);
let drag2 = new Drag(div2);
```

### 组合继承

```js
function Dad () {
  this.age = 50;
}
Dad.prototype.fn = function () {
  console.log(1);
}
function Son () {
  Dad.call(this);
}
let Link = function () {}
Link.prototype = Dad.prototype;
Son.prototype = new Link();
Son.prototype.constructor = Son;

// 其实就是要切断他们之间的联系 --> 就是不能让他们指向相同的地址
```

## 类和对象

- 类 - 笼统，共性；
- 对象 - 具体的某一个；

## 原型的深拷贝继承

### 传值和传址问题

- 基本数据类型：`Number`、`String`、`Boolean`、`Null`、`Undefined`；
- 复杂数据类型/引用数据类型：`Array`、`Date`、`Math`、`RegExp`、`Object`、`Function`等；

```js
let proto = {
  name: 'c'
};
let copy_proto = proto;
console.log(proto, copy_proto);
copy_proto.name = 'cs';
console.log(proto, copy_proto);
```
输出：

![传值和传址问题](./imgs/1001_deliver.png)

  1. 直接赋值，会使得 **同一地址有俩门牌**；
  2. 网上购物的时候，写两个门牌之一，都会送到一致的地址里面；
  3. 谁向地址进行操作，都会一致影响地址；

解决: **JSON 序列化** （简单解决版 - 也就是不怎么好的法子）

```js
let proto = {
  name: 'c'
};
/**
 * 深拷贝 - JSON 序列化
 */
let copy_proto = JSON.parse(JSON.stringify(proto));
copy_proto.name = 'cs';
console.log(proto, copy_proto);
```

### JSON 序列化的不足

- 若拷贝对象包含函数，或 undefined 等值，此方法就会出问题；

```js
let p = {
  c: 'chen',
  s: 'sheng',
  y: 'yi',
  test1: null,
  test2: undefined,
  fn: () => { console.log("it's fn"); }
}
let copy_p = JSON.parse(JSON.stringify(p));
copy_p.c = 'chan';
console.log(p, copy_p);
```
输出：

![JSON 序列化的不足](./imgs/1002_deliver.png)

问题：如图，属性，`undefined` 和 `fn` 都不见了哇...但 `null` 还在 +_+
（JSON 序列化不待见他们，就自动将他们去掉了...）
（视实际情况使用，别一杆子打死）

解决：自己写个深拷贝呗～

```js
// 递归深拷贝
function deepCopy (obj) {
  // 判断是对象还是数组
  let newObj = Array.isArray(obj) ? [] : {};
  // 【 for...in 会循环原型上的东西，但这些东西又不一定要啊 】
  for (let key in obj) {
    // 判断是否是自身的属性
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] == 'object') {
        // 如果对象下的属性还是一个对象，再调用处理
        newObj[key] = deepCopy(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

let p = {
  c: 'chen',
  test1: null,
  test2: undefined,
  fn: () => { console.log("it's fn"); },
  obj: {}
}
let copy_p = deepCopy(p);
copy_p.c = 'chan';
console.log(p, copy_p);
```
输出：

![JSON 序列化的不足](./imgs/1002_deliver.png)

问题：

噗，哈哈哈哈哈，那个 `null` 变成了空对象啊 `{}`；

#### for...in 会循环原型上的东西：

```js
let test = {
  test: 'test'
};
test.__proto__.t = 'proto_t';
for (let i in test) {
  console.log(test[i]);
}

// 输出
test
proto_t
```

#### 判断实例属于哪个构造函数

```js
// 下面这深拷贝的方式其实是一种“覆盖”
Son.prototype = deepCopy(Dad.prototype);
// 需要将自己的构造函数也加进来噢
Son.prototype.constructor = Son;
// 可判断实例是属于哪个构造函数的
console.log(son.constructor);
```
- 应用 - 判断系统预定义的对象：

```js
let str = 'csy';
console.log(str.constructor);
console.log(String);
console.log(str.constructor === String); // true
```

## 原型链

- 一层一层向上找，先找最接近自己的，没有就会继续找它上层的：

```js
// 自己有，把自己的输出
function Person () {
  this.name = 'csy';
}
Person.prototype.name = 'ccc';
let p = new Person();

console.log(p.name); // csy
console.log(p.__proto__.name); // ccc
```
```js
// 自己没有，找上层的输出
function Person () {
}
Person.prototype.name = 'ccc';
let p = new Person();

console.log(p.name); // ccc
console.log(p.__proto__.name); // ccc
```
- 查找顺序： 属性&方法 --> Function 的属性&方法 --> object 的属性&方法 --> undefined

#### 最顶层的 `Object.prototype` 是没有原型的咯

### instanceof 函数

- 判断对象在原型链上是否有关系（其实还是有问题，不准确）

```js
let arr = [];
let obj = {};

console.log(arr instanceof Array); // true
console.log(obj instanceof Object); // true
console.log(arr instanceof Object); // true - 数组也是对象啊（原型链向上找）

// 基础数据类型不行啊...
let str = '123';
console.log(str instanceof String); // false

/**
 * 精确判断数据类型 - toString ********************
 */
let res = Object.prototype.toString.call(arr);
let res2 = Object.prototype.toString.call(obj);
let res3 = Object.prototype.toString.call(str);
console.log(res);
// 判断
console.log(res === '[object Array]'); // true
console.log(res2 === '[object Object]'); // true
console.log(res3 === '[object String]'); // true
```

## 包装对象

- 除开 null、undefined，基本类型都有自己对应的包装对象；
- 包装对象把所有的属性和方法给了基本类型，然后包装对象就消失了；

```js
/**
 * 一些数据类型啊，string/number/boolean
 * 没有用 new 的方式创建的话，输出也就是一个字符串/数字/布尔值
 * 但!是!你在后续的使用中，又可以以“.”的方式使用它相对应提供的方法诶
 */
let str = 'c,s,y';
console.log(str); // c,s,y
let str_arr = str.split(',');
console.log(str_arr); // ["c", "s", "y"]

// 当你是 new 出来的时候
let str2 = new String('c,s,y');
console.log(str2); // 老多方法了。。。
```

![包装对象](./imgs/1401_oop.gif)

- 当需要使用到一些自带方法的时候，系统会自动生成一个 **包装对象**（可生成包装对象的数据类型：String、Number、Boolean）；

```js
/** 系统可能就大概像酱紫做了些处理
 * 
 * str - 字符串
 * method - 方法
 * arg - 通过什么切割
 */
function mySplit (str, method, arg) {
  // 创建临时对象（代码完成就会自动销毁的了）
  let temp = new String(str);
  // 包装
  return temp[method](arg);
}

let str = 'c,s,y';
console.log(mySplit(str, 'split', ',')); // ["c", "s", "y"] 
```

## 常用方法

### hasOwnProperty()

看是不是对象自身底下的属性

### constructor

查看对象的构造函数 - 可用于做判断

### instanceof

对象与构造函数是否在原型链上有关系

### toString()

判断类型 - 转换字符串，进制转换
