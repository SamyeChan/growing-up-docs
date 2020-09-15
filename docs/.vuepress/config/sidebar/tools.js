const { initList } = require('../methods')
/**
 * 侧边栏【工具库】配置
 */
module.exports = [
  {
    title: '工具库',
    collapsable: false,
    children: [
      '',
      '校验/',
      '调试/',
      'mock/',
      'nginx/',
      'git/',
      'http/',
      'hosts/',
      'security/',
      '禅道/'
    ]
  },
  {
    title: '地图',
    collapsable: false,
    children: initList('地图/', [
      '',
      '坐标转换/'
    ])
  }
]
