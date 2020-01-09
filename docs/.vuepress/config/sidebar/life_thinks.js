const { initList } = require('../methods')
/**
 * 侧边栏【记录life > 阅读Melody】配置
 */
module.exports = [
  {
    title: '阅读Melody',
    collapsable: false,
    children: [
      ''
    ]
  }, {
    title: 'Book海洋',
    collapsable: false,
    children: initList('book/', [
      ''
    ])
  }, {
    title: 'Movie人生',
    collapsable: false,
    children: initList('movie/', [
      '',
      '《想见你》/'
    ])
  }, {
    title: 'Music旋律',
    collapsable: false,
    children: initList('music/', [
      '',
      '理想三旬2019/'
    ])
  }
]
