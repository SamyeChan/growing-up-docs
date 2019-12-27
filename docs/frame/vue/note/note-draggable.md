# Note | 拖拽插件

###Installation `安装`

```
  yarn add vuedraggable
  npm i -S vuedraggable
```
典型用法：
```html
  <draggable v-model="myArray" :options="{group:'people'}" @start="drag=true" @end="drag=false">
    <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
  </draggable>
```
```javascript
  /* .vue file */
  import draggable from 'vuedraggable'
  ...
  export default {
    components: {
        draggable,
    },
  ...
```
###Props `属性`

####value 

Type: `Array` 

Required: `false` 

Default: `null` 

```html
<draggable v-model="myArray">
```
####list

Type: `Array`

Required: `false`

Default: `null`

注：替代value,list是一个与拖放同步的数组。两者的区别在于list由可拖动组件更新,而value不能更新

####options

Type: `object`

Required: `false`

```javascript
{
    /*常用配置*/

    group: "name"   // string or array; 分组，同一组的不同list可以相互拖动
    sort: true,   // Boolean; 定义列表内是否可以拖拽，不影响同一组间的拖动
    delay: 0,    // ms; 定义开始拖动的延迟时间
    animation: 150,   // ms; 拖动时动画移动的速度 
    disabled: false, // Boolean; 禁用拖动
    handle: ".my-handle",  // selector[css选择器的字符串]; 使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动 
    ghostClass: "sortable-ghost",   // string[css选择器的字符串,不带"."]; 当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class，我们可以通过这种方式来给影子元素进行编辑样式
    draggable: ".item",   // selector[css选择器的字符串]; 定义哪些列表单元可以进行拖放
    chosenClass: "sortable-chosen",   // string[css选择器的字符串,不带"."]; 目标被选中时添加
    dragClass: "sortable-drag",   // string[css选择器的字符串,不带"."]; 目标拖动过程中添加
    filter: ".ignoreore-elements",   // selector[css选择器的字符串]; 定义哪些列表单元不能进行拖放，可设置为多个选择器，中间用","分隔 
    preventOnFilter: true, // Boolean; 当拖动filter时是否触发event.preventDefault(),默认触发
    scroll: true, // Boolean; 当拖动的元素所在的容器是个可滚动的区域，拖放可以引起区域滚动
    scrollSpeed: 10, // px; 滚动的速度 


    /*不常用配置*/

    touchStartThreshold: 0, // px; (不知道) 
    store: null,  // (不知道)
    dataIdAttr: "data-id", // (不知道)
    forceFallback: false,   // Boolean; 如果设置为true时,将不使用原生的html5的拖放,可以修改一些拖放中元素的样式等
    fallbackClass: "sortable-fallback"   // string[css选择器的字符串,不带"."]; 使用forceFallback时克隆的DOM元素的类名 
    fallbackOnBody: false,   //Boolean; 将克隆的DOM元素追加到Document的Body 
    fallbackTolerance: 0, // (不知道)
    scrollFn: function(offsetX, offsetY, originalEvent, touchEvt, hoverTargetEl){ ... }, // 用于自定义滚动条的适配
    scrollSensitivity: 30, // px; 鼠标距离边缘多远才能开始滚动

    bubbleScroll: true, // Boolean; 将autoscroll应用于所有父元素，以便更轻松地移动
}
```
#####<font size=4>`group`</font> <font size=4 color="red">*</font>

要将元素从一个列表拖动到另一个列表，两个列表必须具有相同的group值。可以通过pull和put定义列表内和列表间移动的能力。

* name: `string`
* pull: `true | false | ["name1","name2"] | 'clone' | function`
  - `true|false`: true表示可以拖放到其它列表中;false表示不可以拖放到其它列表;但是不会影响列表内各单元拖放
  * `["name1","name2"]`: 数组中存放的是其它组名，表示可以拖放到组名为name1、name2所在的列表中
  - `clone`: clone表示当拖放元素时会复制一个副本，使其副本拖放到其它列表，原来的元素不变
  - `function`:
    ``` javascript
    <template>
      <draggable element="ul" :list="myList" :options="dragOptions">
        <transition-group type="transition" :name="'flip-list'">
          <li v-for="element in myList" :key="element.id" :index="element.id">{{element.name}}</li>
        </transition-group>
      </draggable>
    </template>

    <script>
      import draggable from 'vuedraggable'
      export default {
        components: {
          draggable
        },
        data () {
          return {
            myList: [{
              id: 1,
              name: 'beijing'
            },{
              id: 2,
              name: 'shanghai'
            },{
              id: 3,
              name: 'guangzhou'
            }]
          }
        },
        computed: {
          dragOptions () {
            return {
              group: {
                name: 'myList',
                pull: (to, from, item) => {
                    console.log(to)   /*移动到目标列表的容器*/
                    console.log(from) /*源列表的容器*/
                    console.log(item) /*被移动的单元*/
                }
              }
            }
          }
        }
      }
    </script>
    ```
* put: `true | false | ["name3","name4"] | function`
  - `true|false`: true表示接受被拖放的单元; false表示不接受被拖放的单元;同样地,不会影响列表内各单元拖放
  - `["name3","name4"]`: 数组中存放的是其它组名，表示可以接受组名为name3、name4中被拖放单元
  - `function`: 与pull相同

<font color="red" face="微软雅黑" size=2>个人理解:</font> <font face="微软雅黑" size=2 color="#000">**当组名相同时，可以通过给pull/put赋值`true/false`达到控制列表间被拖放单元;而当组名不同时，可以通过给pull/put赋值`["name1","name2"]`达到控制列表间被拖放单元;**</font>

#####<font size=4>`sort`</font>

Type:`Boolean`

Required: `false`

Default: `true`

该属性定义是否可以在列表内进行拖放(不会影响列表间单元拖放;可以被disabled覆盖)

#####<font size=4>`delay`</font>

Type:`Number`

Required: `false`

Default: `0`

该属性定义开始拖动的延迟时间(单位:ms)

#####<font size=4>`animation`</font>

Type:`Number`

Required: `false`

Default: `0`

该属性定义拖动时动画移动的速度 (单位:ms)

#####<font size=4>`disabled`</font>

Type:`Boolean`

Required: `false`

Default: `false`

该属性可以禁用拖动(与sort属性在效果上有区别,当disabled设置为false时,sort将失效)

#####<font size=4>`handle`</font>

Type: `selector`

该属性使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动

```html
  template:

    <draggable element="ul" :list="myList" :options="dragOptions">
        <li><span class="myHandle">::</span>列表一</li>
        <li><span class="myHandle">::</span>列表二</li>
    </draggable>
```
```javascript
  script:
    dragOptions () {
      return {
        group: 'test'
        handle: '.myHandle'
      }
    }
```
```css
  style:
    .myHandle {
      cursor: move;
      cursor: -webkit-grabbing;
    }
  
```

#####<font size=4>`ghostClass`</font>

Type: `selector`

该属性是当拖动列表单元时会生成一个副本作为影子单元来模拟被拖动单元排序的情况，此配置项就是来给这个影子单元添加一个class，我们可以通过这种方式来给影子元素进行编辑样式。

```javascript
  script:
    dragOptions () {
      return {
        group: 'test',
        handle: '.myHandle',
        ghostClass: '.ghost'
      }
    }
```
```css
  style:
    .ghost {
      opacity: 0.4;
      background: #C8EBFB;
    }
```

#####<font size=4>`draggable`</font>

Type: `selector`

```html
html:

  <draggable :list="myList" :options="dragOptions">   
    <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
      <div v-for="i in myList" :key="i.id" :class="(i.id === 111)||(i.id === 222) ? 'drag' : ''">draggable测试{{i.id}}</div>
    </transition-group>
  </draggable>
```
```javascript
script:

  data () {
    return {
      myList: [{id:111},{id:222},{id:333},{id:444}]
    }
  },
  computed: {
    dragOptions () {
      return {
        group: 'test1',
        draggable: '.drag'
      }
    }
  }
```
该属性定义哪些列表单元可以进行拖放

####element

Type: `string`

Default: `div`

* 是`<draggable>`标签在渲染后展现出来的标签类型
* 也是包含拖动列表和插槽的外部标签
* 可以用来兼容UI组件
```html
html:
  <draggable element="ul" :list="myList" :options="dragOptions">
    <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
      <li v-for="i in myList" :key="i.id">{{i.name}}</li>
    </transition-group>
  </draggable>
```

####clone

Type: `Function`

Required: `false`

Default: `(original) => { return original;}`

当pull设置为`clone`时,触发此函数

```html
html:
  <draggable element="ul" :clone="cloneFun" :list="list11" :options="dragOptions11">
    <transition-group class="form-list-group" type="transition" :name="'flip-list'" tag="div">
      <li v-for="i in list11" :key="i.id">{{i.name}}</li>
    </transition-group>
  </draggable>
  <draggable element="ul" :list="list22" :options="dragOptions22" style="margin-top:30px;">
    <transition-group class="form-list-group" type="transition">
      <li v-for="i in list22" :key="i.key">{{i.val}}</li>
    </transition-group>
  </draggable>
```
```javascript
script:
  data () {
    return {
      list11: [{
        id: 1,
        name: 'beijing'
      },{
        id: 2,
        name: 'shanghai'
      },{
        id: 3,
        name: 'guangzhou'
      }],
      list22: [{
        key: 111,
        val: 'hello world'
      }]
    }
  }
  computed: {
    dragOptions11 () {
      return {
        group: 'test2',
        pull: 'clone'
      }
    },
    dragOptions22 () {
      return {
        group: 'test2'
      }
    }
  },
  methods: {
    cloneFun (original) {
      // 由于两个列表的数据结构不同，想要拖拽复制的话，需要提前转化数据
      const list = {        
        key: original.id,
        val: original.name
      }
      return list
    }
  }
```

####move

Type: `Function`

Required: `false`

Default: `null`

当拖动单元时触发该函数，这个函数会在移动过程中触发多次（遇到列表中的其它单元时触发）。

```javascript
  ...//省略
  methods: {
    moveFun (event, originalEvent) {
      // console.log(event.draggedContext.index)
      // console.log(event.relatedContext.index)
      return (evt.draggedContext.element.name!=='beijing')  // false可以使这次拖放失效
    }
  }
```
event对象具有与Sortable onMove事件相同的属性，以及3个其他属性：

* draggedContext：与拖动元素链接的上下文 <font color="red">*</font>
  - index: 拖动元素索引
  - element: 拖动元素基础视图模型元素
  - futureIndex: 如果接受放置操作，则拖动元素的潜在索引
* relatedContext：与当前拖动操作关联的上下文 <font color="red">*</font>
  - index: 目标元素索引
  - element: 目标元素视图模型元素
  - list: 目标列表
  - component: 目标VueComponent

####componentData

Type: `Object`

Required: `false`

Default: `null`

此属性用来结合UI组件的，可以理解为代理了UI组件的定制信息，包括：
 * props: 用来传递UI组件需要绑定的属性
 * on: 用来代理UI组件需要绑定的事件

```html
html:

  <draggable element="Collapse" :list="list111" :options="dragOptions111" :component-data="getComponentData()" style="width:300px;">
    <Panel name="item.id" v-for="item in list111" :key="item.id">
      {{item.title}}
      <p slot="content">{{item.content}}</p>
    </Panel>
  </draggable>
```
```javascript
script:

  data () {
    return {
      list111: [{
        id: 1,
        title: '测试一',
        content: '这是一个可拖动的卡片一'
      },{
        id: 2,
        title: '测试二',
        content: '这是一个可拖动的卡片二'
      }] 
    }
  },
  computed: {
    dragOptions111 () {
      return {
        group: 'test3'
      }
    }
  },
  methods: {  // 这里的方法没有明白有什么意义
    handleChange() {
      console.log('changed')
    },
    inputChanged(value) {
      this.activeNames = value
    },
    getComponentData() {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: this.activeNames
        }
      }
    }
  }
```
###Events `事件` 

有以下几种

`start, add, remove, update, end, choose, sort, filter, clone, change` 

参数带有如下属性：
  * add: 包含被添加到列表的元素
    - newIndex: 添加后的新索引
    - element: 被添加的元素
  * removed: 从列表中移除的元素
    - oldIndex: 移除前的索引
    - element: 被移除的元素
  * moved: 内部移动
    - newIndex: 改变后的索引
    - oldIndex: 改变前的索引
    - element: 被移动的元素

###Slots `插槽` 

* Header
```html
  <draggable v-model="myArray" :options="{draggable:'.item'}">
    <div v-for="element in myArray" :key="element.id" class="item">
      {{element.name}}
    </div>
    <button slot="header" @click="addPeople">Add</button>
  </draggable>
```

* Footer
```html
<draggable v-model="myArray" :options="{draggable:'.item'}">
    <div v-for="element in myArray" :key="element.id" class="item">
        {{element.name}}
    </div>
    <button slot="footer" @click="addPeople">Add</button>
</draggable>
```
