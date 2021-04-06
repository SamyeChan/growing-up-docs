/**
 * 文档横向【版块】配置
 *
 * 匹配 config.js --> nav 项
 */
module.exports = [
  // --------------------------------- 起始 ------
  {
    text: '起始',
    link: '/start/'
  },
  // --------------------------------- 基础 ------
  {
    text: '基础',
    items: [{
      text: '前端三大块',
      items: [{
        text: 'HTML',
        link: '/basic/html/'
      }, {
        text: 'CSS',
        link: '/basic/css/'
      }, {
        text: 'JS',
        link: '/basic/js/'
      }]
    }, {
      text: '框架',
      items: [{
        text: 'Vue.js',
        link: '/frame/vue/'
      }]
    }]
  },
  // --------------------------------- 进阶 ------
  {
    text: '进阶',
    items: [{
      text: '提升',
      items: [{
        text: '正则表达式',
        link: '/advanced/reg/'
      },
      {
        text: 'ES',
        link: '/advanced/es/'
      },
      {
        text: 'TS',
        link: '/advanced/ts/'
      }]
    }, {
      text: '拓展',
      items: [{
        text: '设计模式',
        link: '/advanced/design-pattern/'
      },
      {
        text: '计算机网络',
        link: '/advanced/network/'
      },
      {
        text: '数据结构与算法',
        link: '/advanced/algorithm/'
      }]
    }]
  },
  // --------------------------------- 基础 ------
  {
    text: '辅助',
    items: [{
      text: '开发工具',
      items: [{
        text: 'vscode',
        link: '/tools/vscode/'
      }, {
        text: 'chrome',
        link: '/tools/chrome/'
      }, {
        text: 'git仓',
        link: '/tools/git-resposity/'
      }, {
        text: '规范化',
        link: '/tools/auxiliary/'
      }]
    },
    {
      text: '知识查找',
      items: [{
        text: '链接池',
        link: '/start/T00.初始/02.链接池/'
      }, {
        text: '问题记录',
        link: '/question/'
      }, {
        text: '其他',
        link: '/tools/others/'
      }]
    }]
  },
  // --------------------------------- 阅读 ------
  {
    text: '日积月累',
    items: [{
      text: '积少成多',
      items: [{
        text: '每日积累',
        link: '/daliy/daliyQ/'
      }, {
        text: '偶尔阅读',
        link: '/daliy/daliyS/'
      }]
    },
    {
      text: '生活纪录',
      items: [{
        text: '书·影',
        link: '/self-discipline/life/T00.书·影/'
      }, {
        text: 'HelloSamye',
        link: '/self-discipline/life/T01.HelloSamye/'
      },
      {
        text: '奇怪的知识',
        link: '/self-discipline/life/T02.奇怪的知识/'
      }]
    }
  ]
  }
]

// TODO 提取nav的link进行sidebar配置