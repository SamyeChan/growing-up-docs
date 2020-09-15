const { initList } = require('../methods')
/**
 * 侧边栏【微信开发 > 小程序开发】配置
 */
module.exports = [
  {
    title: '小程序开发',
    collapsable: false,
    children: [
      '',
      '小程序贴士/'
    ]
  },
  {
    title: '小程序优化',
    collapsable: false,
    children: [
      '小程序优化/'
    ]
  },
  {
    title: 'DEMO',
    collapsable: false,
    children: initList('例子/', [
      '/电影imooc'
    ])
  }
]
