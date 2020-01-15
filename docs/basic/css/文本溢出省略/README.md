---
sidebarDepth: 3
---
# 文本溢出省略

[掘金 | 可能是最全的 “文本溢出截断省略” 方案合集](https://juejin.im/post/5dc15b35f265da4d432a3d10)

---

## 单行文本溢出省略

```css
.xxx {
  /* 文字单行显示（不可换行） */
  white-space: nowrap;
  /* 文本超出限定宽度，隐藏超出内容 */
  overflow: hidden;
  /* 文本溢出时，使用...来表示被隐藏部分 */
  text-overflow: ellipsis;
}
```

#### 优点

- 无兼容问题；
  1. Chrome：省略号为`...`
  2. FireFox：省略号为`···`

![单行文本溢出省略](./img/01-single.gif)

- 响应式截断；
  - 单行宽度无法容纳所有文字时自动省略；
  - 文本溢出才显示省略号(...)，否则不显示；

#### 缺点

- 仅适用于单行文本截断；

#### 应用场景

- 单行文本；

## 多行文本溢出省略（按行数）

### CSS方案

```css
.xxx {
  /* 用于限制块元素显示的文本行数 */
  -webkit-line-clamp: 2;
  /* 弹性伸缩盒子模型 */
  display: -webkit-box;
  /* 设置/检索弹性伸缩盒子对象模型显示 */
  -webkit-box-orient: vertical;
  /* 文本超出限定宽度，隐藏超出内容 */
  overflow: hidden;
  /* 文本溢出时，使用...来表示被隐藏部分 */
  text-overflow: ellipsis;
}
```

#### 优点

- 响应式截断；
  - 文本溢出才显示省略号(...)，否则不显示；

#### 缺点

- `-webkit-` - 仅兼容 WebKit 内核的浏览器；

![多行文本溢出省略（行数）](./img/02-multiple.gif)

#### 应用场景

- 移动端页面（移动设备浏览器多基于 WebKit 内核）；


## 多行文本溢出省略（按高度）

### JS方案

ummmmm...不想写了...
