# Note | vue.set，vue.delete

#### 知识点之vue.set，vue.delete用法及应用场景
##### Vue.set
* 参数：
  * { Object | Array } target
  * { String | number } key
  * { any } value
* 返回值： 设置的值
* 用法：
向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为Vue无法探测普通的新增属性（比如：`this.myObject.newProperty = 'hi'`）。<font color="red">目标对象不能是vue实例或者vue根对象</font>
* 应用场景:
  1.  由于Javascript的限制，Vue**不能检测一下变动的数组：**
      * 当你利用索引直接设置一个项时，例如：vm.items[indexOfItem] = newValue
      * 当你修改数组的长度时，例如：vm.items.length = newLength
        ```javascript
          var vm = new Vue({
            data: {
              items: ['a', 'b', 'c']
            }
          })
          vm.items[1] = 'x' // 不是响应式的
          vm.items.length = 2 // 不是响应式的
        ```
      为了解决第一类问题，以下两种方式都可以实现和`vm.items[indexOfItem] = newValue`相同的效果，同时也将触发状态更新：
      ```javascript
      // Vue.set方式
      Vue.set(vm.items, indexOfItem, newValue) // 全局形式
      this.$set(vm.items, indexOfItem, newValue) // 组件内
      ```
      ```javascript
      // Array.prototype.splice方式
      vm.items.splice.(indexOfItem, 1, newValue)
      ```
      为了解决第二类问题，你可以使用`splice`：
      ```javascript
      vm.items.splice(newLength)
      ```
  2. 由于Javascript的限制，Vue**不能检测对象属性的添加或删除**
      ```javascript
        var vm = new Vue({
          data: {
            a: 1
          }
        })
        // 'vm.a'是响应式的
        vm.b = 2
        // 'vm.b'不是响应式的
      ```
      <font color="red">对于已经创建的实例，Vue不能动态添加根级别的响应式属性。但是，可以使用`Vue.set(object, key, value)`方法向嵌套对象添加响应式属性。</font>例如，对于：
      ```javascript
      var vm = new Vue({
        data: {
          userProfile: {
            name: 'xkl'
          }
        }
      })
      ```
      * Vue.set的方式
        ```javascript
          Vue.set(vm.userProfile, 'age', 27) // 全局形式
          this.$set(vm.userProfile, 'age', 27) // 组件内
        ```
      * Object.assign()的方式（适用于添加多个属性）<font color="red">*</font>
        ```javascript
          // 这种方式也是不响应的
          Object.assign(vm.userProfile, {
            age: 27,
            height: 183
          })
          // 应该这样写，才是响应的
          vm.userProfile = Object.assign({},vm.userProfile, {
            age: 27,
            height: 183
          })
        ```
##### Vue.delete
* 参数：
  * { Object | Array } target
  * { String | number } key/index
* 用法：
  删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。**这个方法主要用于避开Vue不能检测到属性被删除的限制**，但是应该很少使用它。<font color="red">同样地，目标对象不能是一个Vue实例或Vue实例的根数据对象。</font>
  ```javascript
    Vue.delete(vm.userProfile, 'name')
  ```