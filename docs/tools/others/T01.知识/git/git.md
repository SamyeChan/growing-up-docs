# Git

> Git is a free and open source distributed version control system.

安装：https://git-scm.com/
windows：安装选项 | Mac：一键

## 命令

- `git init` - 初始化创建仓库（创建一个隐藏的.git文件夹，存入所有操作历史）
- `git status` - 查看当前仓库所在目录文件状态（无论进行什么操作前，都查看一下文件状态吧）
- `git add` - 让文件加入追踪
- `git commit` - 提交 + 附属描述信息
- `git log` - 查看提交记录
```
git config --global user.email "xx@xx.com"
git config --global user.name "name"
```

## 文件状态

1. 已修改 --> 文件被修改
2. 已暂存 --> 文件等待被提交（stage）
3. 已提交 --> 文件被提交至本地仓库

- 未被git追踪的文件不参与以上状态 --> 为追踪状态：Untracked

[掘金 | 分享一些工作中常用的Git命令及特殊问题场景怎么解决](https://juejin.cn/post/6934487656873082887?utm_source=gold_browser_extension)