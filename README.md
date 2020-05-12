# VuePress 笔记

基于 VuePress 的 markdown 笔记整理

## 目录结构

```
├── docs
│   ├── .vuepress
│   │    ├── config           【文件夹 | 模块配置】
│   │    │    ├── nav          [ 顶部导航栏 ]
│   │    │    ├── sidebar      [ 侧边导航栏 ]
│   │    │    └── methods.js
│   │    ├── public           【文件夹 | 静态资源】
│   │    └── config.js        【文件 | 文档主配置文件】
│   ├── start                 【模块 | 起始】
│   ├── basic                 【模块 | 基础】
│   │    ├── html
│   │    ├── css
│   │    └── js
│   ├── frame                 【模块 | 框架】
│   │    ├── vue
│   │    ├── vue_cpn
│   │    └── react
│   └── weapp                 【模块 | 微信开发】  
│   │    ├── platform
│   │    └── miniprogram
│   ├── tools                 【模块 | 工具库】
│   └── life                  【模块 | 记录life】
│        ├── city
│        ├── cook
│        ├── sports
│        └── thinks
│             ├── book
│             ├── moive
│             └── music
├── package-lock.json
├── package.json
└── README.md
```
