/*
 * @Author: SamyeChan
 * @Date: 2021-04-01 21:33:08
 * @LastEditTime: 2021-04-01 22:01:28
 * @FilePath: \caicai-up\docs\.vuepress\config.js
 */
/**
 * Vuepress基础配置
 *
 * 匹配 config.js --> nav 项
 */

const { getChildren } = require('./auto-siderbar')
/* ========================= 配置 ============================ */

module.exports = {
  // theme: 'reco',
  dest: './build', // 打包路径
  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'Hey, I\'m Front C',
      description: 'Just note all I know OR don\'t know',
    }
  },
  markdown: {
    lineNumbers: true, // 代码块显示行数
  },
  head: [ // 头部信息
    // ['link', { rel: 'icon', href: '/' }]
  ],
  themeConfig: {
    repo: 'SamyeChan/caicai-up',     // 仓库地址
    editLinks: true, // 编辑页连接
    editLinkText: '在 Gitee 上编辑此页',
    docsDir: 'docs', // TODO - 编辑文档链接
    lastUpdated: '上次编辑', // 设置了该属性就会自动获取上次编辑时间 --> 应该是获取的最近一次推向git仓的时间？？？
    smoothScroll: true,
    search: true, // 禁用内置搜索（内置搜索仅可对h2、h3构成索引）
    searchMaxSuggestions: 10, // 对内置搜索最多结果数量进行限制
    // navbar: false, // 禁用导航栏
    nav: require('./nav'),
    /**
     * 侧边栏配置 --> 分顶部导航栏模块，根据【路径】生成对应【侧边栏sidebar】
     */
    sidebar:
    {
      // 初始
      '/start/': readFolder('start'),
      // 基础 - 前端三大块
      '/basic/html/':  readFolder('basic/html'),
      '/basic/css/':  readFolder('basic/css'),
      '/basic/js/':  readFolder('basic/js'),
      // 基础 - 框架
      '/frame/vue/': readFolder('frame/vue'),
      // 进阶 - 提升
      '/advanced/reg/':  readFolder('advanced/reg'),
      '/advanced/es/':  readFolder('advanced/es'),
      '/advanced/ts/':  readFolder('advanced/ts'),
      // 进阶 - 拓展
      '/advanced/design-pattern/':  readFolder('advanced/design-pattern'),
      '/advanced/algorithm/':  readFolder('advanced/algorithm'),
      '/advanced/network/':  readFolder('advanced/network'),
      // 辅助 - 开发工具
      '/tools/vscode/': readFolder('tools/vscode'),
      '/tools/chrome/': readFolder('tools/chrome'),
      '/tools/git-resposity/': readFolder('tools/git-resposity'),
      '/tools/auxiliary/': readFolder('tools/auxiliary'),
      // 辅助 - 知识查找
      '/question/': readFolder('question'),
      '/tools/others/': readFolder('tools/others'),
      // 日积月累 - 积少成多
      '/daliy/daliyQ/': readFolder('daliy/daliyQ'),
      '/daliy/daliyS/': readFolder('daliy/daliyS'),
      '/period/course/': readFolder('period/course'),
      '/period/summary/': readFolder('period/summary'),
      // 生活记录
      '/self-discipline/life/': readFolder('self-discipline/life')
    },
    sidebarDepth: 3
  }
}

/**
 * siderbar读取的文件夹（置于docs下的文件夹或文件夹路径）
 *
 * @param {String} dir
 * @returns
 */
function readFolder(dir) {
  return getChildren(`docs/${dir}`)
}