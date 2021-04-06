// fs 模块可用于与文件系统进行交互
const fs = require('fs')
const path = require('path')

var prefixBasePath = ''

// 获取sidebar配置
function getChildren(path) {
  const root = []

  prefixBasePath = path
  readDirSync(path, root)

  console.log([
    {
      title: '',
      collapsable: false,
      children: ['']
    },
    ...root
  ])

  console.log(' ========= ')

  return [
    {
      title: '',
      collapsable: false,
      children: ['']
    },
    ...root
  ]
}

/**
 * 读取文件夹子项目
 * 
 * @param {*} path 侧边栏顶级路径
 * @param {*} root 
 */
function readDirSync(path, root) {
  // 获取文件夹子项
  let pa = fs.readdirSync(path)

  pa.forEach(ele=> {
    // 获取文件夹子项信息
    let info = fs.statSync(`${path}/${ele}`)

    // 子项是否为目录 - yes：继续获取目录
    if(info.isDirectory()) {
      // 若满足Txx.结构，则视作 siderbar 的专题
      if (/^T[0-9][0-9].*/.test(ele)) {
        const title = ele.split('.')[1]

        root.push({
          title,
          collapsable: false,
          children: []
        })
      }
      
      // 如果子项是静态文件目录（static），则不再向下读取
      if (ele === 'static') {
        return
      }

      readDirSync(`${path}/${ele}`, root)
    } else if (checkFileTypeIsMarkdown(ele)) {
      if (path.includes('/T')) {
        const idx = Number(path.split('/T')[1].split('.')[0])

        root[idx].children && root[idx].children.push(prefixPath(path, ele))
      }
    }
  })
}

/**
 * 检查文件类型：是否为md
 * 
 * @param {String} path
 * @returns {Boolean}
 */
function checkFileTypeIsMarkdown(path) {

  return path.includes('.md')
}

/**
 * 设置siderbar子级路径
 * @param {*} basePath 
 * @param {*} dirPath 
 * @returns 
 */
function prefixPath(basePath, dirPath) {
  // 去除一级目录地址
  basePath = basePath.split(`${prefixBasePath}/`)[1]

  // replace用于处理windows电脑的路径用\表示的问题
  return dirPath === 'README.md'
    ? path.join(basePath, '/').replace(/\\/g,'/')
    : path.join(basePath, dirPath).replace(/\\/g,'/')
}

module.exports = { 
  getChildren
}