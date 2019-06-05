###基于vue的滚动条插件vuescroll

####特点
**1. 基本特点**
* 能够自定义滚动条样式
* 能够支持上拉-刷新，下拉-加载
* 支持轮播图
**2. 其他特点**
* 支持平滑地滚动，并且可以设置不同的滚动动画
* 支持检测内容大小发生变化并反馈给用户
* 支持typescript, SSR(服务端渲染)

####安装
**安装**
```
npm install vuescroll --save
```
**引入**
**1. 全局引入**
```javascript
  import Vue from 'vue'
  import vuescroll from 'vuescroll'

  // 可以在这里设置全局配置
  Vue.use(vuescroll, {
    ops: {}, // 在这里设置全局默认配置
    name: 'myScroll' // 自定义组件名字，默认为vueScroll
  });
```
**2. 局部引入**
```html
  <template>
    <vuescroll><!-- 你的内容 --></vuescroll>
  </template>
  <script>
    import vuescroll from 'vuescroll';
    export default {
      components: {
        vuescroll
      }
    }
  </script>
```
**3. 只引入需要的模式**

  只引入slide模式的特性：
  ```javascript
    import Vue from 'vue';
    import vuescroll from 'vuescroll/dist/vuescroll-slide';

    Vue.use(vuescroll);
  ```
  只引入native模式的特性
  ```javascript
    import Vue from 'vue';
    import vuescroll from 'vuescroll/dist/vuescroll-native';

    Vue.use(vuescroll);
  ```
####用法
> 把vuescroll放到parent-dom里面，child-dom外面即可。
警告: 如果你看不到滚动条，请打开dev-tool是否你的子元素尺寸超过了你的父元素尺寸。出现滚动条的条件与原生滚动条的相同，即：子元素的尺寸超出了父元素。
```html
  <template>
    <div class="parent-dom">
      <vue-scroll :ops="ops">
        <div class="child-dom"></div>
      </vue-scroll>
    </div>
  </template>
  <script>
    export default {
      data() {
        return {
          ops: {
            vuescroll: {},
            scrollPanel: {},
            rail: {},
            bar: {}
          }
        }
      }
    }
  </script>
```
未完待续......