# NaN = Not A Number

- [个人 | NaN in JavaScript](https://dmitripavlutin.com/nan-in-javascript/)
- [掘金 | JavaScript 中的 NaN](https://juejin.im/post/5e1d934cf265da3e133fd9a5?utm_source=gold_browser_extension#heading-0)

---

![NaN in JavaScript](./static/title.jpg)

JavaScript 中的 2 个特殊数值：

1. `Infinity` - 无穷大；
2. `NaN` - Not A Number；

```js
const infinite = Infinity
const faulty = NaN

typeof infinite // => 'number'
typeof faulty // => 'number'
```

## NaN

- 数字类型；
- 不代表实数的值；
- 用于表示错误的数字运算；

### 举个栗子

1. 数字 \* `undefined` --> 非有效操作 ==> `NaN`；

```js
3 * undefined // => NaN
```

2. 解析无效的数字字符串 ==> `NaN`；

```js
parseInt('Samye', 10) // => NaN
```

## 检查 NaN 是否相等

- 即时使用 `NaN` 本身，其也不等于任何值：

```js
NaN === NaN // => false
```

- 通过内置函数检测 `NaN`：

```js
isNaN(NaN) // => true
isNaN(1) // => false

Number.isNaN(NaN) // => true
Number.isNaN(1) // => false
```

- `Number.isNaN()` 不会将其参数转换为数字；

```js
isNaN('Joker12') // => true
Number.isNaN('Joker12') // => false
```

## 导致 NaN 的运算

### 1. 解析数字

- 当字符串不能被转换为数字时，解析函数返回 NaN --> 解析失败；

```js
parseFloat('Samye3.5') // => NaN
parseInt('Samye35', 10) // => NaN
Number('Samye35') // => NaN
```

- 解析数字时，要先确认解析结果是否为 NaN：

```js
let inputToParse = 'Invalid10'
let number

number = parseInt(inputToParse, 10)
// 如果解析结果为 NaN，则赋予默认值为 0
if (isNaN(number)) {
  number = 0
}
```

### 2. undefined 作为操作数

- 把 undefined 用作加法、乘法等算术运算中的操作数会生成 NaN；
- 把缺少的属性或返回 undefined 的函数用作算术运算中的值时，将生成 NaN；
- 要确保 undefined 不会进行算术运算 --> 随时检查；

### 3. NaN 作为操作数

- 当算数运算的操作数为 NaN 时，也会生成 NaN；

```js
3 + NaN // => NaN
5 * NaN // => NaN
```

### 4. Indeterminate 形式

- 当算术运算采用不确定形式时，将会产生 NaN；

  1. 0/0 和 Infinity/Infinity 这样的的除法运算：

```js
0 / 0 // => NaN
Infinity / Infinity // => NaN
```

2. 0 和 Infinity 的乘法运算：

```js
0 * Infinity // => NaN
```

3. 带有不同符号的 Infinity 的加法：

```js
;-Infinity + Infinity // => NaN
```

### 5. 无效的数字函数参数

1. 负数的平方根：

```js
Math.pow(
  -2,
  0.5
)(
  // => NaN
  -2
) ** 0.5 // => NaN
```

2. 负数的对数：

```js
Math.log2(-2) // => NaN
```
