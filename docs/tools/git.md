# 托管 | Git 

## 碎碎念

`git` 呢，还是大学的时候通过三三才认识的，但当时并不懂得什么叫“版本管理”、“代码托管”的，总之觉得很高...大...上...

实习的时候还接触过 `svn`，夕阳类产品，照葫芦画瓢地使用，其实现在也已经忘得差不多了。工作后，部门培训倒也培训过 `git`，看着大家的一脸懵，还曾一丝得意，这东西我知道。

然而其实，一年了，每每还是从头学习，于是想把它记录下来了，愿不再遗忘。

## 什么是Git

- 分布式版本控制；
- 在 `Linux` 上开发的；

## 问题快速查找

01. [回退版本（上一个/指定版本）](#)
02. [拉取分支至本地](#)
03. [清除本地xxxx](#)
04. [](#)
05. [](#)
06. [](#)
07. [](#)
08. [](#)
09. [](#)
10. [](#)


## 安装

Linux系统无需安装，自带，故仅需进行如下配置：
d
```bash
git config --global usr.name "xxx"
git config --global usr.email "xx@xxx.com"
```

生成 `SSH` 密钥（Linux）：

```bash
ssh-keygen -t rsa -C "xxx@xxx.com"
```

将公钥的内容copy到gitlab用户设置里面的 `SSH Keys`：

- Windows: clip < ~/.ssh/id_rsa.pub
- Mac: pbcopy < ~/.ssh/id_rsa.pub
- GNU/Linux (requires xclip): xclip -sel clip < ~/.ssh/id_rsa.pub

测试 `SSH` 连接：

```bash
// 标准测试代码：ssh -T git@gitlab.com

ssh -T -p 55725 git@gitlab.domain.com  #修改过端口号的测试代码
```

###

```bash
git config --global http.sslVerify false
```

## 托管平台

- [GitHub](https://github.com/) - 面向开源及私有软件项目的托管平台
- [GitLab](https://gitlab.com/) - 基于Git实现的在线代码仓库托管软件
- [码云](https://gitee.com/) - 国内版gitHub

## 注解规范

昂...感觉自己有那么丢丢强迫症的，之前自己乱捣弄 github 的时候就总对 commit 时的注解规范老有不舒服的感觉，没有分类就憋得慌系列...so，终于用了迅速5分钟简单地归类了一下，希望自己能 “严格遵循”自己定的规范来，不然就白憋慌了...

使用情况 | 标记使用 | 使用频次级
- | - | -
初始化 | init - xxx | 中
新增(组件/方法) | create - xxx | 多
完成(组件/方法) | finish - xxx | 少
修改(组件/方法) | update - xxx | 多
解决(Bug/问题) | solve - xxx | 中
基础配置项修改 | basic - xxx | 少
引入第三方库操作 | import - xxx | 少
调整代码目录结构 | adjust - xxx | 少
合并冲突 | MERGE - xxx | 多
无需记录操作 | NO RECORD | 多























记得第一次自学的时候笔记做得是很 nice，但实际，自己其实真没有学懂太多。后来后来啊，去了林老师介绍的公司实习了，倒是接触到了另外一种和版本管理相关的工具，虽然已经老掉牙 ———— `svn`，也毕竟不是互联网企业。同样地照葫芦画瓢，我知道我常规应该怎么去用，但是，why？how to？再深入的就什么都不知道了。

然后毕业了，太过早的自我否定，过于佛系地选择工作，人就