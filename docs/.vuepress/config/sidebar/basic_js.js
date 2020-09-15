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
      '函数/',
      '异步编程/',
      '防抖与节流/',
      '校验/',
      '动画/',
      '异步/',
      '闭包/',
      'BOM/',
      'DOM/',
      'Class/',
      '事件/',
      'Node/',
      '面向对象/',
      '面向对象/面向对象编程/',
      'This/',
      'NaN/',
      '前后端交互/'
    ])
  }, {
    title: 'ES',
    collapsable: false,
    children: initList('ES/', [
      '',
      'ES6、7、8/',
      'ES6基础/',
      'ES6高阶/',
      '例子/百度音乐榜单/',
      '例子/学员列表/'
    ])
  }, {
    title: 'TS',
    collapsable: false,
    children: initList('ts/', [
      '',
    ])
  }, {
    title: 'Canvas',
    collapsable: false,
    children: initList('Canvas/', [
      '',
      '例子/射击行星/',
      '例子/鼠标彩球/'
    ])
  }
]
