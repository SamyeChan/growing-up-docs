const { initList } = require('../methods')
/**
 * 侧边栏【框架】配置
 */
module.exports = [
  {
    title: 'Vue',
    collapsable: false,
    children: [
      '',
      '开发环境搭建/',
      '组件通信/',
      '前端路由/',
      '生命周期/',
      'vuecli3/',
      'v-for/',
      'set&delete/'
    ]
  },
  {
    title: '小插件',
    collapsable: false,
    children: initList('小插件/', [
      'vconsole/',
      'vuescroll/',
      'vuedraggable/',
      'vue-qr/'
    ])
  }
]
