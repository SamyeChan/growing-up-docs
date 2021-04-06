# 【Mate 属性】

阅读： [html 的 meta 总结，html 标签中 meta 属性使用介绍](https://my.oschina.net/Nealyang/blog/775563)

---

- meta 是 html 语言 head 中的一个辅助性标签；
- 作用：
  1. 搜索引擎优化（SEO）；
  2. 定义页面使用语言；
  3. 自动刷新并指向新页面；
  4. 实现网页转换时的动态效果；
  5. 控制页面缓冲；
  6. 网页定级评价；
  7. 控制网页显示的窗口；
  8. ......

## 组成

- 两个属性：
  1. http-equiv；
  2. name；
- 不同的属性又有不同的参数值，这些不同的参数值就实现了不同的网页功能；

### name 属性

- 主要用于描述网页；
- 与之对应的属性值为 content - content 中的内容主要是便于搜索引擎机器人查找信息和分类信息用的；

```html
<meta name="参数" content="具体的参数值" />
```

#### 参数 - keywords 关键字

- 用来告诉搜索引擎网页的关键字是什么；

```html
<meta name="keywords" content="meta总结,html meta,meta属性,meta跳转" />
```

#### 参数 - description 网站内容描述

- 用来告诉搜索引擎网站的主要内容；

```html
<meta name="description" content="haorooms博客,html的meta总结，meta是html语言head区的一个辅助性标签。" />
```
