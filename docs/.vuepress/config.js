/* ========================= 模块 ============================ */

const FOLDER = 'menu-modules'
const MENU_VUE = require(`./${FOLDER}/vue`)
const MENU_REACT = require(`./${FOLDER}/react`)
const MENU_WEAPP = require(`./${FOLDER}/weapp`)
const MENU_HTML = require(`./${FOLDER}/html`)
const MENU_CSS = require(`./${FOLDER}/css`)
const MENU_JS = require(`./${FOLDER}/js`)
const MENU_TOOLS = require(`./${FOLDER}/tools`)

/* ========================= 配置 ============================ */

module.exports = {
  title: 'Hey, I\'m Front C',
  description: 'Just note all I know OR don\'t know',
  themeConfig: {
    search: true, // 禁用内置搜索（内置搜索仅可对h2、h3构成索引）
    searchMaxSuggestions: 10, // 对内置搜索最多结果数量进行限制
    // navbar: false, // 禁用导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '基础', link: '/'},
      { text: '工具库', link: '/'},
      { text: 'Vue', link: '/'},
      { text: '微信开发', link: '/'},
      { text: '文章', link: '/'}
    ],
    /* 侧边栏 */
    // sidebar: 'auto'
    sidebar: [
      {
        title: '起始',
        collapsable: true,
        children: [
          '/start/',
          '/start/basic-frame.md',
          '/start/list.md'
        ]
      },
      {
        title: 'Vue',
        collapsable: true,
        children: [ ...MENU_VUE ]
      },
      {
        title: 'React',
        collapsable: true,
        children: [ ...MENU_REACT ]
      },
      {
        title: '公众号/小程序',
        collapsable: true,
        children: [ ...MENU_WEAPP ]
      },
      {
        title: 'HTML',
        collapsable: true,
        children: [ ...MENU_HTML ]
      },
      {
        title: 'CSS',
        collapsable: true,
        children: [ ...MENU_CSS ]
      },
      {
        title: 'JavaScript',
        collapsable: true,
        children: [ ... MENU_JS ]
      },
      {
        title: '阅读理解',
        collapsable: true,
        children: [
          // 面试题目
          '/topic/html5-semanticization.md',
          '/topic/note-pay.md',
          '/read/2019-08/00 异步编程.md'
        ]
      }, {
        title: '其他辅助',
        collapsable: true,
        children: [ ...MENU_TOOLS ]
      },
      {
        title: '有点儿意思',
        collapsable: true,
        children: [
          '/hobby/',
          '/hobby/chemicalElement/'
        ]
      }
    ]
  }
}
