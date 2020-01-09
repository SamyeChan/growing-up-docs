# 定时器和日期对象

## 日期对象

```js
var date = new Date(); // 创建一个日期对象
console.log(date); // 获取的是计算机本地时间
var year = date.getFullYear(); // 获取年份
var month = date.getMonth() + 1; // 获取月份（0-11， 0代表1月份）
var data2 = date.getDate(); // 获取日期（1-31）
var hours = date.getHours(); // 获取小时（0-23）
var minutes = date.getMinutes(); // 获取分钟（0-59）
var second = date.getSecond(); // 获取秒钟（0-59）
var milliseconds = date.getMilliseconds(); // 获取毫秒
var day = date.getDay(); // 获取当前周几（0-6，0代表周日）
```

### 时间戳

```js
var date = new Date();
var time = date.getTime(); // 时间戳（距离1070年1月1日0时的国际标准时间 - 东八区：1970年1月1日8时）
var time1 = Date.now(); // 另一种获取时间戳的方法
```
转换：