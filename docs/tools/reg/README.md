---
sidebarDepth: 3
---

# Tool | 正则表达式

Regular Expression

## 前话 - 小栗子

**[需求]** - 在字符串中找到所有数字放入数组中

- 不用正则的方式：
```js
let str = 'huhsuih1112sa89ajskdjhiak8adsajjdkn00';

function getNumber (str) {
  let arr = [];
  let temp = '';
  for (let i = 0; i < str.length; i++) {
    // 判断是否为数字
    if (!isNaN(str[i])) {
      // 是数字 --> 加入临时字符串
      temp += str[i];
    } else {
      // 不是数字
      if (temp !== '') {
        // 将先前是数字的临时字符串 push 到数组 arr 中
        arr.push(parseInt(temp));
        // 临死字符串重新置空
        temp = '';
      }
    }
  }
  return arr;
}

console.log(getNumber(str)); // [1112, 89, 8]

/**
 * Oooooops! --- isNaN(0) ---> fasle!!!
 */
```
- 使用正则：
```js
let reg = /\d+/g;
let arr = str.match(reg);

console.log(arr); // ["1112", "89", "8", "00"]

/**
 * \d --> 匹配数字
 * +  --> 匹配多个
 * /g --> 贪婪模式
 * str.match(reg) --> 匹配
 */
```

## 正则创建

### 通过 字面量 创建
```js
let str = 'agdsygaaa';
let reg0 = /a/;
let reg1 = /a/g;
let reg2 = /a+/g;

console.log(str.match(reg0));
// ["a", index: 0, input: "agdsygaaa", groups: undefined]
console.log(str.match(reg1));
// ["a", "a", "a", "a"]
console.log(str.match(reg2));
// ["a", "aaa"]

/**
 * 正则式双杠线 /.../ 之间直接为字符串，而无需加引号 ‘’
 */
```
### 通过 构造函数 方式创建
```js
let str = 'agdsygaaa';
let reg0 = new RegExp('a');
let reg1 = new RegExp('a', 'g');

console.log(str.match(reg0));
console.log(str.match(reg1));

/**
 * 当正则式待匹配项是一个变量时，使用构造函数创建；
 * 但一般情况下使用字面量创建即可 ---> 构造函数有更多的开销；
 */
```
- `\b` ---> 非 `\w（数字/字母/下划线）`的就是边界；
- `\` ---> “转义“；

```js
let str = 'This is sc.';

let reg = /is/g;
let reg0 = /\bis\b/g;

console.log(str.match(reg)); // ["is", "is"]
console.log(str.match(reg0)); // ["is"]

let reg1 = new RegExp('is', 'g');
let reg2 = new RegExp('\\bis\\b', 'g'); // ---> 构造函数还需要一层转义

console.log(str.match(reg1)); // ["is", "is"]
console.log(str.match(reg2)); // ["is"]
```

## 正则的匹配方法

### 正则方法 - test / exec

```js
let str = 'adaudiouaiduoiq';
let reg = /\d+/;

console.log(reg.test(str)); 
// true ---> or false
console.log(reg.exec(str)); 
// ["12", index: 15, input: "adaudiouaiduoiq12s1", groups: undefined] --> or null 
// --> 不理会 /g，只匹配一次 ---> 『忽略全局匹配』
```

### 字符串方法 - split / replace / search /match

```js
let str = 'asdaa21hjha981xc800';
// 1- split
console.log(str.split(/\d+/)); // ["asdaa", "hjha", "xc", ""]
// 2- replace
console.log(str.replace(/\d/, '*')); // asdaa*1hjha981xc800
console.log(str.replace(/\d+/, '*')); // asdaa*hjha981xc800
console.log(str.replace(/\d+/g, '*')); // asdaa*hjha*xc*
console.log(str.replace(/\d+/g, function (arg) {
  let restr = '';
  for (let i = 0; i < arg.length; i++) {
    restr += '*';
  }
  return restr;
})); // asdaa**hjha***xc***

/**
 * str.replace ---> 可用于“敏感词过滤”
 */

// 3- search - 找到第一次出现的索引值 ---> 『忽略全局匹配』
let str1 = 'jljljo5afe';
console.log(str1.search('a')); // 7
console.log(str1.search(/\d/)); // 6
```

### 应用 | 敏感词汇过滤

```js
let news = '当地时间9月22 日，美国德克萨斯州休斯顿的足球场有约5万民众聚集，不是参加体育赛事、也不是摇滚音乐节，而是为了欢迎到访的印度总理莫迪。这场名为“你好·莫迪（Howdy Modi）”的活两位领导人首先在致辞中进行了一番“商业互捧”，大力称赞美印关系“进入了最好的时期（stronger than ever before）”；后就两国经济合作、边境安全和克什米尔等热点问题展开对话。特朗普在会议中宣布：美印武器销售协议预计很快签署；今年11月，两国将举行首次三军联合演习。但特朗普与莫迪两人“高调秀恩爱”，美媒和美国网民并不看好。CNN 22日发表评论，指责两位领导人都在国内外政策上“涉及对移民和有色人种的歧视”，称“这次集会并不值得欢呼”。《华盛顿邮报》则表示，特朗普”非同寻常“的举动是为赢得”当地印裔的选票“。';
let sens = /特朗普|莫迪/g;

news.replace(sens, function (arg) {
  if (arg.length === 2) {
    return '【莫阿三】'
  } else {
    return '【特阿川】';
  }
})
```

## 元字符

正则表达式中，拥有特殊含义的字母函数

- `.` - 匹配 \n(换行)\r(回车)\u2028(段落结束符)\u2029(段落结束符)
- `*` - 匹配0个或多个；
- `+` - 
- `?`
- `$` - 以什么作为结尾；`(...)$`；
- `^` - 以什么作为开头 --> `^(...)`；
- `|` - 或者；
- `\` - 转义；
- `()` - 分组；
- `[]` - 字符集合；
- `{}` - “出现几次”；

### 互为替代

```
. === [^\n\r]
\d === [0-9]
\w === [a-zA-Z_0-9]
```

/[0-20]/g ---> 全局替换 0-2 或 0

### RegExp.$1 --> 反向替代

[] 转换时间格式： 2019-09-24 ---> 2019/09/24
```js
let time = '2019-09-24';
let reg = /(\d{4})-(\d{1,2})-(\d{1,2})/g;

console.log(time.replace(reg, '2019/09/24'));
```
### 命名分租 --> `?<name>`

```js
let str = 'yuiyhu3ihsai11dyqhpoqw';
let reg = /(?<num>\d+)/;
let res = str.match(reg);
console.log(res.groups.num);
```

## 零宽断言：正向（后面）/负向（前面）


---

[常用正则式](https://juejin.im/post/5d8ac836518825090d61c569?utm_source=gold_browser_extension)