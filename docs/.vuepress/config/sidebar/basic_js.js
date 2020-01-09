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
      '防抖与节流/',
      '校验/',
      '动画/',
      '异步/',
      '闭包/',
      '正则表达式/',
      'BOM/',
      'DOM/',
      'Class/',
      '事件/',
      'Node/',
      '面向对象/',
      'This/'
    ])
  }, {
    title: 'ES',
    collapsable: false,
    children: initList('ES/', [
      '',
      'ES6、7、8/'
    ])
  }, {
    title: 'TS',
    collapsable: false,
    children: initList('ts/', [
      '',
    ])
  }
]
