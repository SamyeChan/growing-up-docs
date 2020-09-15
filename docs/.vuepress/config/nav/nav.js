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
    ariaLabel: '基础',
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
    },
    {
      text: '计算机基础',
      items: [{
        text: '编译原理',
        link: '/basic/cs/'
      }, {
        text: '数据结构',
        link: '/basic/cs/'
      }, {
        text: '算法',
        link: '/basic/cs/'
      }, {
        text: '操作系统',
        link: '/basic/cs/'
      }, {
        text: '计算机网络',
        link: '/basic/cs/'
      }]
    }]
  },
  // --------------------------------- 框架 ------
  {
    text: '框架',
    ariaLabel: '框架',
    items: [{
      text: 'Vue',
      link: '/frame/vue/'
    }, {
      text: 'Vue_组件',
      link: '/frame/vue_cpn/'
    }, {
      text: 'React',
      link: '/frame/react/'
    }, {
      text: 'Node.js',
      link: '/frame/nodejs/'
    }]
  },
  // --------------------------------- 微信开发 ------
  {
    text: '微信开发',
    ariaLabel: '微信开发',
    items: [{
      text: '公众号开发',
      link: '/weapp/platform/'
    }, {
      text: '小程序开发',
      link: '/weapp/miniprogram/'
    }]
  },
  // --------------------------------- 工具库 ------
  {
    text: '工具库',
    ariaLabel: '工具库',
    items: [{
      text: 'Lodash',
      link: '/tools/'
    }, {
      text: 'momentjs',
      link: '/tools/'
    }, {
      text: '公共方法',
      link: '/common/'
    }]
  },
  {
    text: '更多',
    ariaLabel: '更多',
    // --------------------------------- 开发 ------
    items: [{
      text: '开发',
      items: [{
        text: '移动端开发',
        link: '/standard/mobile/'
      }, {
        text: 'PC端开发',
        link: '/standard/pc/'
      }, {
        text: '地图开发',
        link: '/standard/map/'
      }]
    },
    // --------------------------------- 阅读 ------
    {
      text: '阅读',
      items: [{
        text: '每日一题',
        link: 'https://github.com/Advanced-Frontend/Daily-Interview-Question'
      }, {
        text: '书·记',
        link: '/'
      }]
    },
    // --------------------------------- 记录life ------
    {
      text: '记录life',
      items: [{
        text: '阅读Melody',
        link: '/life/thinks/'
      }, {
        text: '运动Love',
        link: '/life/sports/'
      }, {
        text: '食在Cook',
        link: '/life/cook/'
      }, {
        text: '城市Walk',
        link: '/life/city/'
      }]
    }]
  }
]
