#### 实践总结之v-for
> 当vue.js用`v-for`正在更新已渲染过的元素列表时，它默认用“**就地复用**”策略。**如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是简单复用此处每个元素，并且确保它在特定的索引下显示已被渲染过的每个元素。**</br>
这个默认的模式是高效的，但是只适用于**不依赖子组件状态或临时DOM状态（例如：表单输入值）的列表渲染输出。**</br>
为了给vue一个提示，以便它能跟踪每个节点的身份，从而重用或重新排序现有元素，你需要为每项提供一个唯一`key`属性。理想的`key`值是每项都有的唯一id。
```html
  <div v-for="item in items" :key="item.id">
    <!-- 内容 -->
  </div>
```
建议尽可能在使用`v-for`时提供`key`，除非遍历输出的DOM内容非常简单，或者可以依赖默认行为以提升性能上的提升。<font color="red">key</font>是Vue识别节点的一个通用机制。
> <font color="red">不要使用对象或数组之类的非原始类型值作为`v-for`的`key`。用字符串或数类型的值取而代之。</font>

####实践例子
```html
  <div v-for="file in fileList"
      :key="file.id"
      class="img-list">
    <uploader-preview :file="file"
                      :uploadingFile="uploadingFile"
                      :error="error"
                      @delete="deleteImg"></uploader-preview>
  </div>
```
```javascript
  <script>
    export default {
      data () {
        return {
          fileList: [{
            directory: 'http://123.jpg'
            identifier: "bdf3bf1da3405725be763540d6601144"
            realName: "Hydrangeas.jpg"
            sequence: 0
            totalSize: 595284
            type: 1
          }]
        }
      },
      // ... 省略
      methods: {
        modifyFileList () {
          this.fileList.forEach((item, index) => {
            Object.assign(item, {
              id: (new Date()).getTime() + index // 时间戳 + 索引
            })
          })
        }
      }
    }
  </script>
```

**总结：**
```
  1. 遇到的问题
    当v-for遍历自定义的组件uploader-preview时，改变遍历列表fileList(删除一项，又重新添加该项)，自定义组件uploader-preview并不会重新渲染。
  2. 跟踪原因
    vue官方文档：v-for采用了`就地复用`的策略。当fileList删除一项时，对应渲染出来的uploader-preview并不会被销毁，而是供下次被添加时，DOM直接进行复用。
    `就地复用`的策略并不适用于存在依赖的组件！！！（一般需要进行销毁）
  3. 解决方法
    （1）v-if 进行销毁
    （2）通过改变key值
        也就是说某一项改变前后的key值需要是不同的，这样vue就会重新渲染，并销毁原先的组件。
```

