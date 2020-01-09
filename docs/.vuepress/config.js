/* ========================= 配置 ============================ */

module.exports = {
  dest: './build', // 打包路径
  title: 'Hey, I\'m Front C',
  description: 'Just note all I know OR don\'t know',
  head: [ // 头部信息
    // ['link', { rel: 'icon', href: '/' }]
  ],
  themeConfig: {
    repo: 'SamyeChan/growing-up-docs',     // 仓库地址
    editLinks: true, // 编辑页连接
    editLinkText: '在 GitHub 上编辑此页',
    docsDir: 'packages/docs/docs', // TODO - 编辑文档链接
    lastUpdated: '上次编辑', // 设置了该属性就会自动获取上次编辑时间 --> 应该是获取的最近一次推向github的时间？？？  
    smoothScroll: true,
    search: true, // 禁用内置搜索（内置搜索仅可对h2、h3构成索引）
    searchMaxSuggestions: 10, // 对内置搜索最多结果数量进行限制
    // navbar: false, // 禁用导航栏
    nav: require('./config/nav/nav'),
    /* 侧边栏 --> 根据路径生成对应侧边栏sidebar */
    sidebar: {
      // 初始
      '/start/': require('./config/sidebar/start'),
      // 基础
      '/basic/html/': require('./config/sidebar/basic_html'),
      '/basic/css/': require('./config/sidebar/basic_css'),
      '/basic/js/': require('./config/sidebar/basic_js'),
      // 框架
      '/frame/vue/': require('./config/sidebar/frame_vue'),
      '/frame/react/': require('./config/sidebar/frame_react'),
      // 微信开发
      '/weapp/platform/': require('./config/sidebar/weapp_platform'),
      '/weapp/miniprogram/': require('./config/sidebar/weapp_miniprogram'),
      // 工具库
      '/tools/': require('./config/sidebar/tools'),
      // 记录life
      '/life/thinks/': require('./config/sidebar/life_thinks'),
      '/life/sports/': require('./config/sidebar/life_sports'),
      '/life/cook/': require('./config/sidebar/life_cook'),
      '/life/city/': require('./config/sidebar/life_city'),
      // 开发
      '/standard/': require('./config/sidebar/standard')
    }
  }
}
