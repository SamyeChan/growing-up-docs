# Vue组件通信

## 组件关系

1. 父子；
2. 兄弟；
3. 隔（多）代；

## 01 `props` / `$emit`

### 适用 

- 父子组件；

### 使用

#### 父 - 子

- 父组件：`:bind` - 向子组件传递数据；
- 子组件：`props` - 向下传递数据给子组件；

```vue
```

#### 子 - 父

- 父组件： `@` - 定义事件接收子组件数据；
- 子组件： `$emit` - 定向父组件相关事件传递数据；

```vue
```

- 子组件通过 events 给父组件发送消息，实际：子组件将自己的数据发送给父组件；

## 02 `$emit` / `$on`

- 通过一个空的 Vue 实例作为中央事件总线（事件中心），用以触发事件和监听事件；

### 适用

- 父子、兄弟、跨级组件；
- 项目不算大时；

### 使用

1. 建立一个空的 Vue 实例：

```js
// 定义于文件 event.js 中

import Vue from 'vue'
export default new Vue()
```

2. 在需传递数据组件中利用 `$emit` 传递数据：

```js
import Even from 'event.js'
...
this.$emit('someData', data)
...
```

3. 在待获取数据的组件中利用 `$on` 取值：

```js
import Even from 'event.js'
...
this.$on('someData', (val) => {
    console.log(val)
})
...
```
- `$on` 定义了自定义事件，而有时不确定会何时触发，故一般会在 `mounted` 或 `created` 钩子中监听；

### 03 vuex