# Learn | Vue Router

## 路由 & 前端路由

**路由** - 根据不同的 url 地址展示不同的内容或页面；

**前端路由** - 把不同路由对应不同的内容或页面的任务交给前端来做（之前是通过服务端根据 url 的不同返回不同的页面实现）；

结构不变，内容变的时候使用路由。

- 优点：用户体验好，无需每次都从服务器全部获取，快速展现给用户；

- 缺点：不利于 SEO / 使用浏览器的前进、后退时会重新发送请求，没有合理利用缓存 / 单页面无法记住之前滚动的位置，即无法在前进、后退时记住滚动位置。

## vue-router

使用 `vue-router` 来构建 SPA；

1. 路由跳转：`<router-link />` 或者 `this.$router.push({path: ''})`;
2. 路由渲染：`<router-view />`

## 动态路由匹配

模式 | 匹配路径 | $route.params
 - | - | - 
/usr/:usrname | /usr/samye | { usrname: 'samye'}
/usr/:usrname/post/:post_id | /usr/samye/post/35 | { usrname: 'samye', post_id: 35 }

`#` 路由哈希

## 嵌套路由

路由嵌套路由

注意：在配置路由时，只有一级路由的 `path` 是需要在路径前加 `/` 的。

## 编程式路由

通过 js 来实现页面的跳转：

```js
// 传字符串
$router.push('name')
// 传对象
$router.push({ path: 'name' })
// 带参（传递）
$router.push({ path: 'name?a=123' })
$router.push({ path: 'name', query: { a: 123 }})
// 带参（获取）
$route.query.a
// vue-router 就是对 history 的再次封装
$router.go(1)
```

## 命名路由和命名视图

给路由定义不同的名字，根据名字进行匹配；
给不同的 `router-view` 定义名字，通过名字进行对应组件的渲染；

`params` 路由的参数

命名视图：给 `router-view` 定义名字