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
          '/start/basic-frame.md',
          '/start/list.md'
        ]
      },
      {
        title: 'Vue',
        collapsable: true,
        children: [
          // 基础部分
          '/vue/basic/learn-basic.md',
          '/vue/basic/learn-lifecycle.md',
          '/vue/basic/vue-cli-3.md',
          '/vue/basic/vue-router.md',
          // 项目 & 练习
          '/vue/proj/proj-business-report.md',
          '/vue/proj/proj-realtime-video.md',
          '/vue/proj/demo-where-to-go.md',
          // 李西康分享
          '/vue/note/note-set_delete.md',
          '/vue/note/note-compress.md',
          '/vue/note/note-draggable.md',
          '/vue/note/note-md5.md',
          '/vue/note/note-qrcode.md',
          // 组件
          '/vue/component/'
        ]
      },
      {
        title: '公众号/小程序',
        collapsable: true,
        children: [
          '/weapp/wechat.md',
          // 基础部分
          '/weapp/basic/learn-weapp-basic.md',
          '/weapp/basic/learn-weapp-component.md',
          '/weapp/basic/learn-weapp-api.md',
          '/weapp/basic/learn-weapp-cloud.md',
          // 例子部分
          '/weapp/proj/demo-imooc-movie.md'
        ]
      },
      {
        title: 'HTML',
        collapsable: true,
        children: [
          '/html/',
          '/html/canvas/',
          '/html/canvas/canvas-colorful-ball.md',
          '/html/canvas/canvas-asteroids.md'
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
          // javascript
          '/js/js/',
          '/js/js/js-function.md',
          '/js/js/js-face-to-object.md',
          '/js/note-about-this.md',
          '/js/note-js-es6.md',
          // ECMAScript
          '/js/es6/',
          '/js/ts/',
          '/js/note-useful-function.md',
          // 阅读 | 你不知道的JavaScript
          '/js/js/uDontKnowJS/book-1.md',
          // 课程 | JavaScript高级工程师
          '/js/class/'
        ]
      },
      {
        title: '阅读理解',
        collapsable: true,
        children: [
          // 面试题目
          '/topic/html5-semanticization.md',
          '/topic/note-pay.md'
        ]
      }, {
        title: '其他辅助',
        collapsable: true,
        children: [
          '/tools/git.md',
          '/tools/nginx.md',
          '/tools/http.md',
          '/tools/eslint.md',
          '/tools/python.md'
        ]
      }
    ]
  }
}
