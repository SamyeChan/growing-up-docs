---
sidebarDepth: 3
---

# Node.js

- 诞生于 2009；
- 底层语言：C++；
- 一个基于Chrome V8引擎的 javascript 运行环境；
- 使 js 运行脱离浏览器端 --> 用 js 写服务端代码；

[官网 | Node.js](http://nodejs.cn/)
[Mac | HomeBrew](https://brew.sh/)

LTS - 稳定版
Current - 最新版

- 查看版本：

```bash
node -v
```
### nodemore

- 小工具：热更新；

## 服务端 & 客户端

- js 文件的类型还是看其放在客户端执行，还是服务端执行；

### 模块化

- 2个文件间的打通通路：
```js
/**
 * 2个文件 - index.js / demo.js
 */

// index.js 文件
console.log('我是 index.js');
require('./demo'); // 是相对路径哟

// demo.js 文件
console.log('我是 demo.js');
```
运行 `index.js`：

![打通俩文件间的模块化](./imgs/0002_node.png)

- 文件中的模块按需导出：

```js
// index.js 文件

/**
 * 用一个对象来接收
 */
let demo = require('./demo');
console.log(demo);
console.log(demo.name);
let dc = new demo.Dancer();
dc.interested();

// demo.js 文件
let name = 'samyechan';
class Dancer {
  constructor () {
    this.name = 'samyechan';
  }
  interested () {
    console.log('LOCKING');
  }
}

/**
 * 将变量以对象形式导出
 */
module.exports = {
  name,
  Dancer
}

/**
 * exports 是 module.exports 的引用
 * 
 */
// exports.a = a;
// exports.Dancer = Dancer;
```
运行 `index.js`：

![文件中的模块按需导出](./imgs/0003_node.png)

- 三种模块引入方式：

1. 文件的形式 - `a.js`、`b.js`等（要`./`）- 自己写的；
2. 文件夹的形式 - 在文件夹内定义一个 `index.js`（要`./`）- 自己写的；
2. `node_modules`的形式 - 专门管理第三方模块（不用`./`）- 别人写的；

### 第三方模块管理 `node_modules`

- `package.json`（json形式定义）- 描述性文件：

```json
{
  "name": "moudel_name", // 模块名称
  "varsion": "1.0", // 版本
  "main": "main.js" // 定义入口文件
}
```

### npm包管理器

[官网 | npm](https://www.npmjs.com/)

#### 内置模块 - 无需自己定义/下载

- 如：`reuire('http')`；

#### 自定义模块 - 自己写的模块

#### 第三方模块 - 引用他人代码

- 放在 `node_moudels` 中；
- 它会一层一层地去找，直到全局根目录：
```bash
npm root -g
```

#### npm 安装

```bash
npm install xxx / npm i xxx
// 全局安装
npm install xxx -g
// 按版本精确安装
npm install xxx@1.1.1
// 运行依赖（dependencies）
npm install --save / npm i -S
// 开发依赖（devDependencies）
npm install --save-dev / npm i -D
```
#### npm 删除

```bash
npm uninstall xxx
```

#### 创建一个 `package.json`

```bash
npm init
```

### 一个手敲的简单服务

```js
const http = require('http');
const server = http.createServer((req, res) => {
  res.write('hello c');
  res.end();
})
server.listen(3000);
```
效果：

![一个手敲的简单服务](./imgs/0001_node.png)

## commonjs规范

## fs模块

- 内置模块；
- 文件操作模块；
- 所有文件操作都有同步和异步之分；
- 特点是同步会加上 `Sync`，如：异步读取文件 `readFile`，同步读取文件 `readFileSync`；

## stream

## buffer


## 问题

1- `sudo:npm 找不到命令` 
