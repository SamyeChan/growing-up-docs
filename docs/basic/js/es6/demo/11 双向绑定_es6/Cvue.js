class Cvue extends EventTarget {
  constructor (options) {
    super();
    this.options = options;
    this.compile();
    this.observer(this.options.data);
  }
  // 对数据进行监听
  observer (data) {
    let _this = this;
    this.options.data = new Proxy(data, {
      get (target, key) {
        console.log('get...');
        return target[key];
      },
      set (target, key, value) {
        console.log('set...');
        let event = new CustomEvent(key, {
          detail: value
        })
        _this.dispatchEvent(event);
        target[key] = value;
        return true; // Proxy 在严格模式下需要一个返回值，虽然这里也不是严格模式，但就是一个坑啊...
      }
    })
  }
  // 找到 {{}}
  compile () {
    // 找到挂载点dom
    let els = document.querySelector(this.options.el);
    // 存储其下的子节点（每次遍历一层返回一个数组）
    let childNodes = els.childNodes;
    //
    this.compileNodes(childNodes);
  }
  compileNodes (childNodes) {
    childNodes.forEach(node => {
      if (node.nodeType == 1) {
        // 元素
        console.log('- - - 元素 - - -');
        console.log(node);
        // 【【【 指令 】】】
        let attrs = node.attributes;
        console.log(attrs);
        [...attrs].forEach(attr => {
          let attrName = attr.name;
          let attrValue = attr.value;
          attrName = attrName.substr(2);
          if (attrName === 'html') {
            node.innerHTML = this.options.data[attrName];
          } else if (attrName === 'model') {
            node.value = this.options.data[attrName];
            node.addEventListener('input', e => {
              this.options.data[attrValue] = e.target.value;
            })
          }
        })
        /**
         * 如果元素节点下还有子节点，再执行一次本函数（递归再找）
         */
        if (node.childNodes.length > 0) {
          this.compileNodes(node.childNodes);
        }
      } else if (node.nodeType == 3) {
        // 文本
        console.log('- - - 文本 - - -');
        console.log(node);
        // !【正则】好好回去复习 - - - - - - - -
        let reg = /\{\{\s*(\S+)\s*\}\}/g;
        /**
         * textContent - 拿到【文本】节点上的内容 --> “{{变量名}}”
         */
        let textContent = node.textContent;
        console.log(textContent);
        /**
         * reg.test(...) - 文本节点内容是否含有 {{}} --> 返回 boolean
         */
        let test = reg.test(textContent);
        if (test) {
          /**
           * RegExp.$1 - 符合 {{}} 格式的文本内含部分 --> MDN:仅允许9位（$1-$9）
           * 
           * [ 初次渲染 ]
           */
          let $1 = RegExp.$1;
          console.log('- - - - $1 - - - -');
          console.log($1);
          // 文本节点重新赋值
          // node.textContent = this.options.data[$1];
          node.textContent = textContent.replace(reg, this.options.data[$1]);
          
          // 更新渲染视图
          this.addEventListener($1, e => {
            console.log('值：' + e.detail);
            let newVal = e.detail;
            let oldVal = this.options.data[$1];
            // 全局匹配 oldVal 变量值，并将其替换为新值
            let reg = new RegExp(oldVal, 'g');
            node.textContent = node.textContent.replace(reg, newVal);
          })
        }
      }
    });
  }
}
