# 小程序

## 界面渲染整体流程：

1. 在渲染层，宿主环境会把 WXML 转化成对应的 JS对象；
2. 将 JS对象 再次转成 真实DOM数，交由渲染层线程渲染；
3. 数据变化时，逻辑层提供最新的变化数据，JS对象发生变化比较进行 diff算法 对比；
4. 将最新变化的内容反映到真实的DOM树中，更新UI；

## 注册APP时可以做什么？

1. 判断小程序进入场景；
2. 监听生命周期；
3. 存放共享数据；

### 判断销程序进入场景

[文档 | 场景值](https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html)

在 onLaunch 或 onShow 时，通过回调options中的 scene 值可判断出进入场景：

```js
onShow (options) {
  console.log(options)
  switch (options.scene) {
    case 1001:
      break;
    case 1005: 
      break;
    ...
  }
}
```

### 监听生命周期

栗子： wx 获取用户信息

1. `wx.getUserInfo()` --> 可能将废弃（未来想让用户主动获取）；
2. button组件 --> open-type 设置为 getUserInfo，并绑定 bindGetUserInfo；
3. 使用 `<open-data></open-data>` 组件（仅展示用户信息）；
[文档 | open-data](https://developers.weixin.qq.com/miniprogram/dev/component/open-data.html)

### 存放共享数据