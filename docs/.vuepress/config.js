module.exports = {
  themeConfig: {
    search: true, // 禁用内置搜索（内置搜索仅可对h2、h3构成索引）
    searchMaxSuggestions: 10, // 对内置搜索最多结果数量进行限制
    // navbar: false, // 禁用导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '快速跳转', items: [ // 下拉选项
        // { text: 'HTML', link: '/html/' },
        // { text: 'CSS', link: '/CSS/' },
        // { text: 'JavaScript', link: '/JavaScript/' },
        { text: 'Vue', link: '/vue/learn-basic.md' }
      ]}
    ],
    /* 侧边栏 */
    // sidebar: 'auto'
    sidebar: [
      {
        title: '起始',
        collapsable: true,
        children: [
          '/start/',
          '/start/list.md'
        ]
      },
      {
        title: 'Vue',
        collapsable: true,
        children: [
          // 基础部分
          '/vue/learn-basic.md',
          '/vue/learn-lifecycle.md',
          // 项目
          '/vue/proj-business-report.md',
          '/vue/proj-realtime-video.md',
          // 李西康分享
          '/vue/note-set_delete.md',
          '/vue/note-compress.md',
          '/vue/note-draggable.md',
          '/vue/note-md5.md',
          '/vue/note-qrcode.md',
          // 练习
          '/vue/demo-where-to-go.md',
          // 组件
          '/vue/component/'
        ]
      },
      {
        title: '小程序',
        collapsable: true,
        children: [
          // 基础部分
          '/weapp/learn-weapp-basic.md',
          '/weapp/learn-weapp-component.md',
          '/weapp/learn-weapp-api.md',
          '/weapp/learn-weapp-cloud.md',
          // 例子部分
          '/weapp/demo-imooc-movie.md'
        ]
      },
      {
        title: 'HTML',
        collapsable: true,
        children: [
          '/html/'
        ]
      },
      {
        title: 'CSS',
        collapsable: true,
        children: [
          '/css/',
          '/css/three-characteristic.md',
          '/read/2019-05/2019-05-17.md',
        ]
      },
      {
        title: 'JavaScript',
        collapsable: true,
        children: [
          '/js/',
          '/js/note-about-this.md'
        ]
      },
      {
        title: '阅读理解',
        collapsable: true,
        children: [
          // 面试题目
          '/topic/html5-semanticization.md'
        ]
      }, {
        title: '其他辅助',
        collapsable: true,
        children: [
          '/tools/git.md'
        ]
      }
    ]
  }
}
