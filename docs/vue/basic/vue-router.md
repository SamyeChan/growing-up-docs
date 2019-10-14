---
sidebarDepth: 3
---

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

## 导航守卫

全局、单个路由独享、组件级

### 全局前置守卫

`router.beforEach`

```js
const router = new VueRouter({ ... })
router.beforEach((to, from, next) => [
  // ...
])
/**
 * to   - 即将进入
 * from - 正要离开
 * next - “一定要调用该方法来 resolve 这个钩子“ 
 */
```
- 当一个导航触发时，全局前置守卫按照创建顺序调用

**确保要调用 next 方法，否则钩子就不会被 resolved**

### 全局解析守卫

`router.beforResolve` -  2.5.0+

- 在导航被确认之前，
- 在所有组件内守卫和异步路由组件被解析之后，
- 解析守卫就被调用。

### 全局后置钩子

`router.afterEach`

```js
router.afterEach((to, from) => {
  // ...
})
```

- 不会接受 next 函数；
- 不会改变导航本身；

### 路由独享的守卫

`beforeEnter` - 直接定义于路由配置中

```js
const router = new VueRouter({
  routes: [
    {
      path: '/sc',
      component: Sc,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫

- `beforeRouteEnter`
- `beforeRouteUpdate` - 2.2+
- `beforeRouteLeave`

```js
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

### 完整的导航解析过程

01. 导航被触发。
02. 在失活的组件里调用离开守卫。
03. 调用全局的 beforeEach 守卫。
04. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
05. 在路由配置里调用 beforeEnter。
06. 解析异步路由组件。
07. 在被激活的组件里调用 beforeRouteEnter。
08. 调用全局的 beforeResolve 守卫 (2.5+)。
09. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

---

## QUESTIONS

### 路由守卫的无限循环问题

要想结束路由守卫，整段代码逻辑必须由 `next()` 进行结尾；