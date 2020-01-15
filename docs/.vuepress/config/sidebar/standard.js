const { initList } = require('../methods')
/**
 * 侧边栏【开发规范】配置
 */
module.exports = [
  {
    title: '移动端开发',
    collapsable: false,
    children: initList('mobile/', [
      '',
      '移动端适配/'
    ])
  },
  {
    title: 'PC端开发',
    collapsable: false,
    children: initList('pc/', [
      ''
    ])
  },
  {
    title: '地图开发',
    collapsable: false,
    children: initList('map/', [
      '',
      'TX/自定义覆盖物/',
      'TX/带箭头路线绘制/'
    ])
  }
]
