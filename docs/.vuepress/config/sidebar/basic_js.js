const { initList } = require('../methods')
/**
 * 侧边栏【基础 > JS】配置
 */
module.exports = [
  {
    title: 'JS',
    collapsable: false,
    children: initList('', [
      '',
      '异步编程/',
      '校验/',
      '动画/',
      '异步/',
      'bom/',
      'dom/',
      'class/',
      '事件/',
      'node/',
      '面向对象/'
    ])
  }, {
    title: 'ES',
    collapsable: false,
    children: initList('es6/', [
      '',
    ])
  }, {
    title: 'TS',
    collapsable: false,
    children: initList('ts/', [
      '',
    ])
  }
]
