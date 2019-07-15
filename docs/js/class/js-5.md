# ECMAScript 数据类型及类型转换

- JS 三大核心：
  1. ECMAScript - js的核心语法、数据类型...
  2. DOM - 文档对象模型；
  3. BOM - 浏览器对象模型；

## 数据类型

### 为什么要划分数据类型？

- 不同类型的数据会有相关的不同特征及不同的操作方法；

### 数据类型划分

两大类，7种：

1. 原始类型（基础类型 / 简单类型）- 6种
  - Number 数字；
  - String 字符串 - 在 js 中，一对引号之间 0 到 多个字符串；
  - Boolean 布尔值 - true / false；
  - null 空值（空对象）- 不要对空值进行属性操作，会报错；
  - undefined 未定义；
  - Symbol （ES6新增）；
2. 符合类型（复杂类型）- 1种
  - Object 对象：Array 数组，function 函数， element，elements， Object 对象{}
  【ps: json是字符串，不是对象】

### typeof 运算符

- 检测数据的类型；
- 注意，typeof 检测的结果和标准规定略有差异；
```js
var a = null;
console.log(a); // 结果为 object，但它不是一个对象
```
- 可检测 7 种：number、string、boolean、function、undefined、symbol、object

### 数据类型转换

- 把一种类型的数据，转换成另外一种；
[ 返回值类型：方法名称(参数1[,参数2])； ]
- 数据转为数字：
  1. `parseInt(data[,radix])` - 将数据转换成一个整数（number）
  ```
  参数：data - 要转换或取整的数据
  可选参数：radix - data的进制（是标明转换前是什么进值，而不是设定转换后的进值）；
  返回值：取整之后的结果（不会四舍五入，是直接截取的）；
  ```
  - 从左向右一位一位进行转换，若遇到非数字就停止，而后把之前的数字提取出来，转成一个完整的数字；
  - 若从第 0 位开始就不是数字，就会直接返回 NaN（Not A Number）；
  - 0x 是十六进值（0-f）的标识；
  - 若 parseInt 接收的是一个数字类型的数据，就只做取整，不看进制；
  - 若通过 parseInt 转换其他数据（除字符串）类型，会先转换成字符串，然后再执行 parseInt() ；

  2. `parseFloat(data)` - 将数据转换成浮点数（小数）- 只考虑十进制 / 不考虑从左至右的第二个小数点；
  - 小数不能进行进制转换；

    #### 在 js 中，小数的计算会有精度问题

    1. 数字转换成二进制；
    2. 计算；
    3. 转回十进制（产生精度问题）；

  3. `Number(val)` - 将数据转换成数字；
  - 字符串类型，规则如下：
    - 当整段字符串都符合数字规则时，转换为数字返回；
    - 空字符串，直接返回 0；
    - 其余情况，直接返回 NaN（有其中一项不符合就回返回）；
  - 布尔值类型，true 返回 1，false 返回 0；
  - null，返回 0；
  - undefined，返回 NaN；
  - 对象类型，调用对象的 toString() 方法，再依照前面字符串的转换规则进行转换；

#### NaN

- Number 类型中的一个特殊值；
- 特殊在它的类型上：NaN 不是一个数字，但其类型是数字（Number）；
- js中唯一一个不等于任何值，也不等于自己的东西 - NaN；
- 检测是不是 NaN：isNaN() - 若可转成合法数字，但回 false / 不能转换为合法数字，返回 true；

#### Boolean()

- 数字类型：非零合法数字转换为 true，0 代表 false，NaN 代表 fasle；
- 字符串类型：非空字符串转换为 true，非空字符串转换为 false；
- null：转换为 false；
- 对象： 转换为 true；

#### String()

- 转换成字符串；
- 数字类型：直接转换数据类型原样返回；
- undefined：直接返回字符串 undefined；
- null：直接返回字符串 null；
- 布尔值，直接返回字符串 true 或 false；
- 函数：直接把整个函数变成字符串返回；
- 对象：直接调用对象的 toString 方法：
  - {} [object, object]；
  - 元素对象 [object HTML标签名Element]；
  - [] 去掉方括号后将其中的值转换成字符串；
---

### 隐式类型转换

- 转换过程不受我们强制，js 偷偷自己转换；
```js
var a = 100;
var b = '100';
console.log(a == b); // true
```
