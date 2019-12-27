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
      'animation/',
      'async/',
      'bom/',
      'dom/',
      'class/',
      'es6/',
      'event/',
      'node/',
      'oop/'
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
