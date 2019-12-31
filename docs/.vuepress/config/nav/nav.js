/**
 * 文档横向【版块】配置
 * 
 * 匹配 config.js --> nav 项
 */
module.exports = [
  {
    text: '起始',
    link: '/start/'
  },
  {
    text: '基础',
    ariaLabel: '基础',
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
    text: '框架',
    ariaLabel: '框架',
    items: [{
      text: 'Vue',
      link: '/frame/vue/'
    }, {
      text: 'React',
      link: '/frame/react/'
    }]
  },
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
  {
    text: '工具库',
    link: '/tools/'
  },
  {
    text: '记录life',
    link: '/life/'
  },
  {
    text: '更多',
    ariaLabel: '更多',
    items: [{
      text: '开发规范',
      items: [{
        text: '移动端开发',
        link: '/standard/mobile/'
      }, {
        text: 'PC端开发',
        link: '/standard/pc/'
      }]
    }, {
      text: '阅读',
      items: [{
        text: '每日一题',
        link: 'https://github.com/Advanced-Frontend/Daily-Interview-Question'
      }]
    }]
  }
]
