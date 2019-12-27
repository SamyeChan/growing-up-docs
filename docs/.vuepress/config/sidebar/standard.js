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
  }
]
