# VueCli | vue/cli3

Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。

- Vue CLI3包名称已由 `vue-cli` 改成了 `@vue/cli`；
- 若已全局安装了旧版本（1.x或2.x），需先通过 `npm uninstall vue-cli -g` 卸载；

## 安装

```bash
npm install -g @vue/cli

// 安装完成后，检查版本
vue --version
```

## 创建项目

```bash
// 命令行式
vue create 项目名
// 图形界面式
vue ui
```

#### 若想`vue-cli`、`vue/cli` 二者兼用...

因为 `vue-cli` 和 `vue/cli` 使用了相同的 `vue` 命令，故 `vue-cli` 被覆盖，导致 `vue init` 失效，可以全局安装一个桥接工具：

```bash
npm install -g @vue/cli-init
```

这样，`vue init` 的运行效果就会与 `vue-cli@2.x` 一致。

## 插件

- 在现有项目中安装擦插件： `vue add`

- 在项目中直接访问插件 API 而非创建一个完整插件，可在 `package.json` 中使用 `vuePlugins.service` 选项：

```json
{
  "vuePlugins": {
    "service": ["my-commands.js"]
  }
}
```

## 多页应用

- 不是每个应用都需要是一个单页应用；
- Vue CLI 支持使用 `vue.config.js` 中的 `pages` 选项构建一个多页面的应用；
- 构建好的应用将会在不同的入口之间高效共享通用的 chunk 以获得最佳的加载性能；

## 静态资源

1. 在 JavaScript 被导入，或在 template/CSS 中通过 **相对路径** 引用 → 会被 `webpack` 处理；
2. 放在 `public` 目录下，或通过 **绝对路径** 被引用 → 不会被 `webpack` 处理；

**推荐使用 `1.`，因为：**
- 脚本、样式被压缩打包，以避免额外的网络请求；
- 文件丢失错误会在编译时抛出，避免客户端的404错误；
- 最终文件名包含哈希，故可避免浏览器缓存；

**何时使用 `public` ？**

- 构建需输出指定的文件名；
- 大量图片时的动态引用；
- 引入不兼容 `webpack` 的外部库；

## CSS

生产环境中，Vue CLI会优化CSS并基于目标浏览器进行相应适应 → 无需设置浏览器前缀规则；